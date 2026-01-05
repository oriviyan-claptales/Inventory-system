// controllers/productController.js
import Product from "../models/Product.js";
import { generateSKU } from "../utils/skuGenerator.js";
import { generateAndUploadBarcode } from "../utils/barcodeGenerator.js";
import { logActivity } from "../utils/logger.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by SKU
export const getProductBySKU = async (req, res) => {
  try {
    const { sku } = req.params;
    if (!sku) return res.status(400).json({ message: "SKU is required" });

    const product = await Product.findOne({ sku });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update product quantity by SKU (ADD or REMOVE)
export const updateQtyBySKU = async (req, res) => {
  try {
    const { sku, addedQty, removeQty } = req.body;

    if (!sku) {
      return res.status(400).json({ message: "SKU is required" });
    }

    const product = await Product.findOne({ sku });
    if (!product) {
      return res.status(404).json({ message: "Product not found with this SKU" });
    }

    // ADD QTY
    if (addedQty != null) {
      const add = Number(addedQty);
      if (isNaN(add) || add <= 0) {
        return res.status(400).json({ message: "Invalid quantity to add" });
      }

      product.Qty += add;
    }

    // REMOVE QTY
    if (removeQty != null) {
      const remove = Number(removeQty);
      if (isNaN(remove) || remove <= 0) {
        return res.status(400).json({ message: "Invalid quantity to remove" });
      }

      if (remove > product.Qty) {
        return res
          .status(400)
          .json({ message: "Remove quantity cannot be greater than current stock" });
      }

      product.Qty -= remove;
    }

    await product.save();


    // 👇 LOG
    const actionType = addedQty ? "STOCK_ADD" : "STOCK_REMOVE";
    const qtyChange = addedQty || removeQty;
    await logActivity(req, actionType, `SKU: ${sku}, Qty: ${qtyChange}`);


    res.json(product);
  } catch (error) {
    console.error("Qty Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, color, size } = req.body;
    
    // SKU generate logic (jo tumhara pehle se tha)
    const sku = await generateSKU({ name, category, color, size });

    const newProduct = new Product({ ...req.body, sku });
    const savedProduct = await newProduct.save();

    
    // 👇 LOG
    await logActivity(req, "PRODUCT_CREATE", `Added Product: ${savedProduct.name} (SKU: ${savedProduct.sku})`);


    // Sirf product return karo, barcode abhi nahi bana
    res.status(201).json(savedProduct); 
  } catch (error) {
    res.status(400).json({ message: "Product creation failed" });
  }
};

// 2. NEW FUNCTION: Generate Barcode & Update Product
export const generateBarcodeForProduct = async (req, res) => {
  try {
    const { sku } = req.params; // URL se SKU lenge

    // Barcode Utility call karo
    const barcodeUrl = await generateAndUploadBarcode(sku);

    if (!barcodeUrl) {
      return res.status(500).json({ message: "Barcode generation failed" });
    }

    // Product find karo aur update karo
    const updatedProduct = await Product.findOneAndUpdate(
      { sku: sku },
      { barcodeImg: barcodeUrl }, // Field ka naam model se match karna
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct); // Updated product with image URL bhejo
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update product details
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed" });
  }
};
