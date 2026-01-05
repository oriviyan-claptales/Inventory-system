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

// Update product details with Audit Log



export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    // 1️⃣ Purana data nikalo
    const oldProduct = await Product.findById(productId);
    if (!oldProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ Comparison Logic: Pata lagao kya-kya badla hai
    let changes = [];
    
    for (let key in updateData) {
      // Sirf un fields ko pakdo jo sach mein badle hain
      if (oldProduct[key] !== undefined && String(oldProduct[key]) !== String(updateData[key])) {
        changes.push(`${key}: (${oldProduct[key]} ➔ ${updateData[key]})`);
      }
    }

    // 3️⃣ Database update karo
    const updated = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    // 4️⃣ Logging (Detailed version)
    if (changes.length > 0) {
      try {
        const detailMessage = `Updated Product: ${oldProduct.name}. Changes: ${changes.join(", ")}`;
        
        await logActivity(
          req, 
          "PRODUCT_UPDATE", 
          detailMessage
        );
      } catch (logError) {
        console.log("Log failed:", logError.message);
      }
    }

    res.json(updated);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(400).json({ message: "Update failed" });
  }
};
// export const updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const updateData = req.body;

//     // 1️⃣ Pehle purana data dhoondo (Taaki pata chale edit kya ho raha hai)
//     const oldProduct = await Product.findById(productId);

//     if (!oldProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // 2️⃣ Database update karo
//     const updated = await Product.findByIdAndUpdate(
//       productId,
//       updateData,
//       { new: true } // Updated data return karega
//     );

//     // 3️⃣ Audit Log add karo
//     // Hum details mein batayenge ki kis product ko update kiya gaya
//     try {
//       await logActivity(
//         req, 
//         "PRODUCT_UPDATE", 
//         `Updated Product: ${oldProduct.name} (SKU: ${oldProduct.sku}). Fields changed: ${Object.keys(updateData).join(", ")}`
//       );
//     } catch (logError) {
//       console.log("Log failed but product updated:", logError.message);
//     }

//     res.json(updated);
//   } catch (error) {
//     console.error("Update Error:", error);
//     res.status(400).json({ message: "Update failed" });
//   }
// };


// export const updateProduct = async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: "Product not found" });

//     res.json(updated);
//   } catch (error) {
//     res.status(400).json({ message: "Update failed" });
//   }
// };

// Delete product



// Delete product with Audit Log
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // 1️⃣ Pehle Product ko dhoondo (Taaki details mil sake)
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ Ab Log Create karo (Delete hone se pehle)
    // Try-Catch isliye lagaya taaki agar Log fail ho, tab bhi product delete ho jaye
    try {
      await logActivity(
        req, 
        "PRODUCT_DELETE", 
        `Deleted Product: ${product.name} (SKU: ${product.sku})`
      );
    } catch (logError) {
      console.log("Product delete log failed:", logError.message);
    }

    // 3️⃣ Aakhri me Product ko Database se uda do
    await Product.findByIdAndDelete(productId);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};
// export const deleteProduct = async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Product not found" });

//     res.json({ message: "Product deleted" });
//   } catch (error) {
//     res.status(400).json({ message: "Delete failed" });
//   }
// };
