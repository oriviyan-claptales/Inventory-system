// // import axios from "axios";

// import axios from "axios";
// import Product from "../models/Product.js";
// import ShopifyTokenModel from "../models/ShopifyToken.js"; // model jisme shop + accessToken save hai


// const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
// const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;




// export const updateQtyBySKU = async (req, res) => {
//   const { sku, newQty } = req.body;

//   try {
//     // 1️⃣ Update in your own DB
//     const product = await Product.findOne({ sku });
//     if (!product) return res.status(404).json({ error: "Product not found" });

//     product.quantity = newQty;
//     await product.save();

//     // 2️⃣ Get Shopify access token
//     const shopData = await ShopifyTokenModel.findOne({ shop: product.shop });
//     if (!shopData) return res.status(400).json({ error: "Shopify token not found" });

//     const accessToken = shopData.accessToken;
//     const shopName = product.shop; // e.g., claptales.myshopify.com

//     // 3️⃣ Get product from Shopify by SKU
//     const shopifyResp = await axios.get(
//       `https://${shopName}/admin/api/2026-01/products.json?sku=${sku}`,
//       { headers: { "X-Shopify-Access-Token": accessToken } }
//     );

//     const shopifyProduct = shopifyResp.data.products[0];
//     if (!shopifyProduct) return res.status(404).json({ error: "Shopify product not found" });

//     const inventoryItemId = shopifyProduct.variants[0].inventory_item_id;

//     // 4️⃣ Update Shopify inventory
//     await axios.post(
//       `https://${shopName}/admin/api/2026-01/inventory_levels/set.json`,
//       {
//         location_id: process.env.SHOPIFY_LOCATION_ID,
//         inventory_item_id: inventoryItemId,
//         available: newQty
//       },
//       { headers: { "X-Shopify-Access-Token": accessToken } }
//     );

//     res.json({ success: true, product });
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     res.status(500).json({ error: "Update failed" });
//   }
// };



// // ShopifyController.js
// // const accessToken = tokenResponse.data.access_token;
// const accessToken = tokenResponse.data.accessToken;

// // ✅ Save in DB against shop name for later use
// await ShopifyTokenModel.findOneAndUpdate(
//   { shop },
//   { accessToken },
//   { upsert: true }
// );



// export const shopifyAuth = (req, res) => {
//   const shop = req.query.shop;
//   if (!shop) return res.status(400).send("Missing shop parameter");

//   const redirectUri = `${process.env.BACKEND_URL}/shopify/auth/callback`;
//   const scopes = "read_products,write_products,read_inventory,write_inventory,read_locations";

//   const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}&state=nonce123&grant_options[]=per-user`;

//   res.redirect(installUrl);
// };

// export const shopifyCallback = async (req, res) => {
//   const { shop, code } = req.query;
//   if (!shop || !code) return res.status(400).send("Missing shop or code");

//   const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
//   const accessTokenPayload = {
//     client_id: CLIENT_ID,
//     client_secret: CLIENT_SECRET,
//     code,
//   };

//   try {
//     const tokenResponse = await axios.post(accessTokenRequestUrl, accessTokenPayload);
//     const accessToken = tokenResponse.data.access_token;

//     console.log("Shopify Access Token:", accessToken);

//     // Optional: save in DB for later API calls
//     res.send("Shopify app installed successfully!");
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     res.status(500).send("Error fetching access token");
//   }
// };




















import axios from "axios";
import Product from "../models/Product.js";
import ShopifyTokenModel from "../models/ShopifyToken.js";

const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

/* ===========================
   SHOPIFY OAUTH
=========================== */

export const shopifyAuth = (req, res) => {
  const shop = req.query.shop;
  if (!shop) return res.status(400).send("Missing shop parameter");

  const redirectUri = `${process.env.BACKEND_URL}/shopify/auth/callback`;
  const scopes =
    "read_products,write_products,read_inventory,write_inventory,read_locations";

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}&state=nonce123`;

  res.redirect(installUrl);
};

export const shopifyCallback = async (req, res) => {
  const { shop, code } = req.query;
  if (!shop || !code)
    return res.status(400).send("Missing shop or code");

  try {
    const response = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }
    );

    const accessToken = response.data.access_token;

    // ✅ SAVE TOKEN IN DB
    await ShopifyTokenModel.findOneAndUpdate(
      { shop },
      { shop, accessToken },
      { upsert: true, new: true }
    );

    console.log("✅ Shopify Token Saved");

    res.send("Shopify app installed successfully!");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Error fetching access token");
  }
};

/* ===========================
   AUTO INVENTORY SYNC
=========================== */

export const updateQtyBySKU = async (req, res) => {
  const { sku, newQty } = req.body;

  try {
    const product = await Product.findOne({ sku });
    if (!product)
      return res.status(404).json({ error: "Product not found" });

    product.quantity = newQty;
    await product.save();

    const shopData = await ShopifyTokenModel.findOne({
      shop: product.shop,
    });

    if (!shopData)
      return res.status(400).json({ error: "Shopify token not found" });

    const accessToken = shopData.accessToken;
    const shopName = product.shop;

    // 🔹 Find product by SKU properly (variant search required)
    const shopifyResp = await axios.get(
      `https://${shopName}/admin/api/2026-01/variants.json?sku=${sku}`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );

    const variant = shopifyResp.data.variants[0];
    if (!variant)
      return res
        .status(404)
        .json({ error: "Shopify product not found" });

    const inventoryItemId = variant.inventory_item_id;

    await axios.post(
      `https://${shopName}/admin/api/2026-01/inventory_levels/set.json`,
      {
        location_id: process.env.SHOPIFY_LOCATION_ID,
        inventory_item_id: inventoryItemId,
        available: newQty,
      },
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );

    res.json({ success: true, product });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Update failed" });
  }
};













// import Sale from "../models/Sale.js";
// import Product from "../models/Product.js";

// // 👉 APNI COMPANY KA STATE YAHAN DAAL
// // Agar 'Haryana' se bahar ship hoga toh IGST lagega, warna CGST/SGST.
// const ORIGIN_STATE = "Haryana"; 

// export const createShopifyOrder = async (req, res) => {
//   try {
//     const orderData = req.body;

//     // 1. Duplicate Check
//     const existingSale = await Sale.findOne({ shopifyOrderId: String(orderData.id) });
//     if (existingSale) {
//       console.log("Order pehle hi process ho chuka hai.");
//       return res.status(200).send("Already processed");
//     }

//     // 2. Extract General Order Info
//     const orderNumber = orderData.name; // Gives #1024
//     const paymentMethod = orderData.gateway || orderData.financial_status; 
//     const customerName = orderData.customer ? `${orderData.customer.first_name} ${orderData.customer.last_name}` : "Guest";
    
//     // Addresses
//     const billingAddress = orderData.billing_address || {};
//     const shippingAddress = orderData.shipping_address || {};

//     const lineItems = orderData.line_items;

//     // 3. Process Each Toy/Item in the Order
//     for (let item of lineItems) {
//       if (!item.sku) continue;

//       const product = await Product.findOne({ sku: item.sku });

//       if (product) {
//         // Basic Pricing
//         const sellingPrice = parseFloat(item.price);
//         const quantity = item.quantity;
//         const totalAmount = sellingPrice * quantity;
        
//         const costPricePerUnit = product.costing_price || 0;
//         const totalCostPrice = costPricePerUnit * quantity;
//         const profit = totalAmount - totalCostPrice;

//         // --- 🟢 GST CALCULATION LOGIC 🟢 ---
//         const gstPercent = product.gst || 0;
        
//         // Formula assumes Total Amount includes GST (Inclusive Tax)
//         // Tax Amount = Total - (Total / (1 + (GST / 100)))
//         const totalTaxAmount = totalAmount - (totalAmount / (1 + (gstPercent / 100)));
        
//         let igst = 0, cgst = 0, sgst = 0;
        
//         // Ship To State check karte hain
//         const destinationState = shippingAddress.province || billingAddress.province || "";
        
//         if (destinationState.toLowerCase() === ORIGIN_STATE.toLowerCase()) {
//           // Same State (CGST + SGST)
//           cgst = totalTaxAmount / 2;
//           sgst = totalTaxAmount / 2;
//         } else {
//           // Other State (IGST)
//           igst = totalTaxAmount;
//         }

//         // 4. Create Full Sale Entry
//         const newSale = new Sale({
//           shopifyOrderId: String(orderData.id),
//           orderNumber: orderNumber,
//           companyName: "Claptales",
//           paymentMethod: paymentMethod,
          
//           customerName: customerName,
//           billingAddress: {
//             first_name: billingAddress.first_name,
//             last_name: billingAddress.last_name,
//             address1: billingAddress.address1,
//             address2: billingAddress.address2,
//             city: billingAddress.city,
//             province: billingAddress.province, // State
//             zip: billingAddress.zip,           // Pincode
//             country: billingAddress.country
//           },
//           shippingAddress: {
//             first_name: shippingAddress.first_name,
//             last_name: shippingAddress.last_name,
//             address1: shippingAddress.address1,
//             address2: shippingAddress.address2,
//             city: shippingAddress.city,
//             province: shippingAddress.province, // State
//             zip: shippingAddress.zip,           // Pincode
//             country: shippingAddress.country
//           },

//           sku: item.sku,
//           productName: product.name,
//           category: product.category,
//           quantity: quantity,
//           unit: "pcs",
          
//           sellingPrice: sellingPrice,
//           totalAmount: totalAmount,
//           costPrice: totalCostPrice,
//           profit: profit,

//           // Tax Data Saved
//           gstPercentage: gstPercent,
//           igst: parseFloat(igst.toFixed(2)),
//           cgst: parseFloat(cgst.toFixed(2)),
//           sgst: parseFloat(sgst.toFixed(2)),

//           shop: product.shop || "Shopify"
//         });

//         await newSale.save();

//         // 5. Deduct Inventory Stock
//         product.Qty = product.Qty - quantity;
//         await product.save();
        
//         console.log(`✅ SKU: ${item.sku} saved! Order: ${orderNumber}, Customer: ${customerName}, Pincode: ${shippingAddress.zip}`);
//       } else {
//         console.log(`⚠️ SKU: ${item.sku} system mein nahi mila.`);
//       }
//     }

//     res.status(200).send("Webhook processed successfully with tax info");

//   } catch (error) {
//     console.error("Webhook Error: ", error);
//     res.status(500).send("Server Error");
//   }
// };