// import axios from "axios";

import axios from "axios";
import Product from "../models/Product.js";
import ShopifyTokenModel from "../models/ShopifyToken.js"; // model jisme shop + accessToken save hai


const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;




export const updateQtyBySKU = async (req, res) => {
  const { sku, newQty } = req.body;

  try {
    // 1️⃣ Update in your own DB
    const product = await Product.findOne({ sku });
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.quantity = newQty;
    await product.save();

    // 2️⃣ Get Shopify access token
    const shopData = await ShopifyTokenModel.findOne({ shop: product.shop });
    if (!shopData) return res.status(400).json({ error: "Shopify token not found" });

    const accessToken = shopData.accessToken;
    const shopName = product.shop; // e.g., claptales.myshopify.com

    // 3️⃣ Get product from Shopify by SKU
    const shopifyResp = await axios.get(
      `https://${shopName}/admin/api/2026-01/products.json?sku=${sku}`,
      { headers: { "X-Shopify-Access-Token": accessToken } }
    );

    const shopifyProduct = shopifyResp.data.products[0];
    if (!shopifyProduct) return res.status(404).json({ error: "Shopify product not found" });

    const inventoryItemId = shopifyProduct.variants[0].inventory_item_id;

    // 4️⃣ Update Shopify inventory
    await axios.post(
      `https://${shopName}/admin/api/2026-01/inventory_levels/set.json`,
      {
        location_id: process.env.SHOPIFY_LOCATION_ID,
        inventory_item_id: inventoryItemId,
        available: newQty
      },
      { headers: { "X-Shopify-Access-Token": accessToken } }
    );

    res.json({ success: true, product });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Update failed" });
  }
};



// ShopifyController.js
const accessToken = tokenResponse.data.access_token;

// ✅ Save in DB against shop name for later use
await ShopifyTokenModel.findOneAndUpdate(
  { shop },
  { accessToken },
  { upsert: true }
);



export const shopifyAuth = (req, res) => {
  const shop = req.query.shop;
  if (!shop) return res.status(400).send("Missing shop parameter");

  const redirectUri = `${process.env.BACKEND_URL}/shopify/auth/callback`;
  const scopes = "read_products,write_products,read_inventory,write_inventory,read_locations";

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}&state=nonce123&grant_options[]=per-user`;

  res.redirect(installUrl);
};

export const shopifyCallback = async (req, res) => {
  const { shop, code } = req.query;
  if (!shop || !code) return res.status(400).send("Missing shop or code");

  const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
  const accessTokenPayload = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
  };

  try {
    const tokenResponse = await axios.post(accessTokenRequestUrl, accessTokenPayload);
    const accessToken = tokenResponse.data.access_token;

    console.log("Shopify Access Token:", accessToken);

    // Optional: save in DB for later API calls
    res.send("Shopify app installed successfully!");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Error fetching access token");
  }
};


