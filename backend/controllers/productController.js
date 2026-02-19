// // controllers/productController.js
// import Product from "../models/Product.js";
// import { generateSKU } from "../utils/skuGenerator.js";
// import { generateAndUploadBarcode } from "../utils/barcodeGenerator.js";
// import { logActivity } from "../utils/logger.js";

// // Get all products
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get product by SKU
// export const getProductBySKU = async (req, res) => {
//   try {
//     const { sku } = req.params;
//     if (!sku) return res.status(400).json({ message: "SKU is required" });

//     const product = await Product.findOne({ sku });
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // Update product quantity by SKU (ADD or REMOVE)
// export const updateQtyBySKU = async (req, res) => {
//   try {
//     const { sku, addedQty, removeQty } = req.body;

//     if (!sku) {
//       return res.status(400).json({ message: "SKU is required" });
//     }

//     const product = await Product.findOne({ sku });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found with this SKU" });
//     }

//     // ADD QTY
//     if (addedQty != null) {
//       const add = Number(addedQty);
//       if (isNaN(add) || add <= 0) {
//         return res.status(400).json({ message: "Invalid quantity to add" });
//       }

//       product.Qty += add;
//     }

//     // REMOVE QTY
//     if (removeQty != null) {
//       const remove = Number(removeQty);
//       if (isNaN(remove) || remove <= 0) {
//         return res.status(400).json({ message: "Invalid quantity to remove" });
//       }

//       if (remove > product.Qty) {
//         return res
//           .status(400)
//           .json({ message: "Remove quantity cannot be greater than current stock" });
//       }

//       product.Qty -= remove;
//     }

//     await product.save();


//     // 👇 LOG
//     const actionType = addedQty ? "STOCK_ADD" : "STOCK_REMOVE";
//     const qtyChange = addedQty || removeQty;
//     await logActivity(req, actionType, `SKU: ${sku}, Qty: ${qtyChange}`);


//     res.json(product);
//   } catch (error) {
//     console.error("Qty Update Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get product by ID
// export const getProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (error) {
//     res.status(400).json({ message: "Invalid ID" });
//   }
// };

// export const createProduct = async (req, res) => {
//   try {
//     const { name, category, color, size } = req.body;
    
//     // SKU generate logic (jo tumhara pehle se tha)
//     const sku = await generateSKU({ name, category, color, size });

//     const newProduct = new Product({ ...req.body, sku });
//     const savedProduct = await newProduct.save();

    
//     // 👇 LOG
//     await logActivity(req, "PRODUCT_CREATE", `Added Product: ${savedProduct.name} (SKU: ${savedProduct.sku})`);


//     // Sirf product return karo, barcode abhi nahi bana
//     res.status(201).json(savedProduct); 
//   } catch (error) {
//     res.status(400).json({ message: "Product creation failed" });
//   }
// };

// // 2. NEW FUNCTION: Generate Barcode & Update Product
// export const generateBarcodeForProduct = async (req, res) => {
//   try {
//     const { sku } = req.params; // URL se SKU lenge

//     // Barcode Utility call karo
//     const barcodeUrl = await generateAndUploadBarcode(sku);

//     if (!barcodeUrl) {
//       return res.status(500).json({ message: "Barcode generation failed" });
//     }

//     // Product find karo aur update karo
//     const updatedProduct = await Product.findOneAndUpdate(
//       { sku: sku },
//       { barcodeImg: barcodeUrl }, // Field ka naam model se match karna
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(updatedProduct); // Updated product with image URL bhejo
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Update product details

// // Update product details with Audit Log



// export const updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const updateData = req.body;

//     // 1️⃣ Purana data nikalo
//     const oldProduct = await Product.findById(productId);
//     if (!oldProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // 2️⃣ Comparison Logic: Pata lagao kya-kya badla hai
//     let changes = [];
    
//     for (let key in updateData) {
//       // Sirf un fields ko pakdo jo sach mein badle hain
//       if (oldProduct[key] !== undefined && String(oldProduct[key]) !== String(updateData[key])) {
//         changes.push(`${key}: (${oldProduct[key]} ➔ ${updateData[key]})`);
//       }
//     }

//     // 3️⃣ Database update karo
//     const updated = await Product.findByIdAndUpdate(productId, updateData, { new: true });

//     // 4️⃣ Logging (Detailed version)
//     if (changes.length > 0) {
//       try {
//         const detailMessage = `Updated Product: ${oldProduct.name}. Changes: ${changes.join(", ")}`;
        
//         await logActivity(
//           req, 
//           "PRODUCT_UPDATE", 
//           detailMessage
//         );
//       } catch (logError) {
//         console.log("Log failed:", logError.message);
//       }
//     }

//     res.json(updated);
//   } catch (error) {
//     console.error("Update Error:", error);
//     res.status(400).json({ message: "Update failed" });
//   }
// };
// // export const updateProduct = async (req, res) => {
// //   try {
// //     const productId = req.params.id;
// //     const updateData = req.body;

// //     // 1️⃣ Pehle purana data dhoondo (Taaki pata chale edit kya ho raha hai)
// //     const oldProduct = await Product.findById(productId);

// //     if (!oldProduct) {
// //       return res.status(404).json({ message: "Product not found" });
// //     }

// //     // 2️⃣ Database update karo
// //     const updated = await Product.findByIdAndUpdate(
// //       productId,
// //       updateData,
// //       { new: true } // Updated data return karega
// //     );

// //     // 3️⃣ Audit Log add karo
// //     // Hum details mein batayenge ki kis product ko update kiya gaya
// //     try {
// //       await logActivity(
// //         req, 
// //         "PRODUCT_UPDATE", 
// //         `Updated Product: ${oldProduct.name} (SKU: ${oldProduct.sku}). Fields changed: ${Object.keys(updateData).join(", ")}`
// //       );
// //     } catch (logError) {
// //       console.log("Log failed but product updated:", logError.message);
// //     }

// //     res.json(updated);
// //   } catch (error) {
// //     console.error("Update Error:", error);
// //     res.status(400).json({ message: "Update failed" });
// //   }
// // };


// // export const updateProduct = async (req, res) => {
// //   try {
// //     const updated = await Product.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );

// //     if (!updated) return res.status(404).json({ message: "Product not found" });

// //     res.json(updated);
// //   } catch (error) {
// //     res.status(400).json({ message: "Update failed" });
// //   }
// // };

// // Delete product



// // Delete product with Audit Log
// export const deleteProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;

//     // 1️⃣ Pehle Product ko dhoondo (Taaki details mil sake)
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // 2️⃣ Ab Log Create karo (Delete hone se pehle)
//     // Try-Catch isliye lagaya taaki agar Log fail ho, tab bhi product delete ho jaye
//     try {
//       await logActivity(
//         req, 
//         "PRODUCT_DELETE", 
//         `Deleted Product: ${product.name} (SKU: ${product.sku})`
//       );
//     } catch (logError) {
//       console.log("Product delete log failed:", logError.message);
//     }

//     // 3️⃣ Aakhri me Product ko Database se uda do
//     await Product.findByIdAndDelete(productId);

//     res.json({ message: "Product deleted successfully" });

//   } catch (error) {
//     console.error("Delete Product Error:", error);
//     res.status(500).json({ message: "Delete failed" });
//   }
// };
// // export const deleteProduct = async (req, res) => {
// //   try {
// //     const deleted = await Product.findByIdAndDelete(req.params.id);
// //     if (!deleted) return res.status(404).json({ message: "Product not found" });

// //     res.json({ message: "Product deleted" });
// //   } catch (error) {
// //     res.status(400).json({ message: "Delete failed" });
// //   }
// // };














import Product from "../models/Product.js";
import { generateSKU } from "../utils/skuGenerator.js";
import { generateAndUploadBarcode } from "../utils/barcodeGenerator.js";
import { logActivity } from "../utils/logger.js";
export const importProducts = async (req, res) => {
  try {
    const productsData = req.body;

    if (!Array.isArray(productsData) || productsData.length === 0) {
      return res.status(400).json({ message: "No products found to import" });
    }

    const validationErrors = [];

    // Allowed Columns
    const ALLOWED_COLUMNS = [
      "name", "description", "category", "color", "size", 
      "price", "costing_price", "gst", "Qty", "qty", 
      "Supplier_name", "img", "img_url"
    ];

    // ==========================================
    // 🛑 ROUND 1: STRICT VALIDATION
    // ==========================================
    console.log("Starting Strict Validation Round...");

    for (const [index, item] of productsData.entries()) {
      const rowNum = `Row ${index + 2}`;
      const errors = [];

      // 1. Extra Column Check
      const itemColumns = Object.keys(item);
      const invalidColumns = itemColumns.filter(col => !ALLOWED_COLUMNS.includes(col));
      if (invalidColumns.length > 0) {
        errors.push(`Unknown Column(s): ${invalidColumns.join(", ")}`);
      }

      // 2. Supplier Name Check (No Numbers)
      if (item.Supplier_name && /\d/.test(item.Supplier_name)) {
        errors.push("Supplier Name cannot contain numbers");
      }

      // 3. Image Check
      if (!item.img && !item.img_url) {
        errors.push("Image URL is missing");
      }

      // 👇 4. COLOR VALIDATION (NEW ADDED)
      if (item.color) {
        const firstChar = item.color.charAt(0);
        if (firstChar !== firstChar.toUpperCase()) {
           errors.push(`Color '${item.color}' must start with a Capital Letter (e.g. 'Black')`);
        }
      }

      // 5. Size Logic Check (Updated)
      let finalSize = String(item.size || "").trim();

      // Case A: Die-cast & Remote Control (Strict 1:xx format)
      if (item.category === "Die-cast" || item.category === "Remote Control") {
         if (!finalSize.includes(":") && !/^\d+$/.test(finalSize)) {
             errors.push(`Invalid Size format for ${item.category}. Use '1:32' or '32'.`);
         } else if (/^\d+$/.test(finalSize)) {
             finalSize = `1:${finalSize}`;
         }
      } 
      
      // Case B: Gun, Soft Toy, Board Game (Must be Value + Unit, e.g., "25 cm")
      // 👇 Yahan maine "Gun" add kar diya hai validation ke liye
      else if (["Gun", "Soft Toy", "Board Game"].includes(item.category)) {
         if (!finalSize) {
             errors.push(`Size is required for ${item.category} (e.g., '25 cm' or '10 inch')`);
         }
         // Optional: Check karein ki size mein number hai ya nahi
         else if (!/\d/.test(finalSize)) {
             errors.push(`Size must contain a number for ${item.category}`);
         }
      }

      // 6. Mongoose Schema Check
      const tempProduct = new Product({
        name: item.name,
        category: item.category,
        color: item.color,
        size: finalSize,
        price: item.price,
        costing_price: item.costing_price,
        Supplier_name: item.Supplier_name,
        gst: item.gst,
        Qty: item.Qty || item.qty || 0,
        img: item.img || item.img_url || "temp_check",
      });

      const mongooseError = tempProduct.validateSync();
      if (mongooseError) {
        Object.values(mongooseError.errors).forEach(e => errors.push(e.message));
      }

      // Collect Errors
      if (errors.length > 0) {
        validationErrors.push({
          name: item.name || rowNum,
          reason: errors.join(" | ")
        });
      }
    }

    // Stop if errors found
    if (validationErrors.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Validation Failed. Please fix errors.",
        failedCount: validationErrors.length,
        failedProducts: validationErrors
      });
    }

    // ==========================================
    // 🚀 ROUND 2: IMPORT
    // ==========================================
    console.log("Validation Passed. Starting Import...");
    const successfulProducts = [];

    for (const item of productsData) {
      let finalSize = String(item.size || "").trim();
      if ((item.category === "Die-cast" || item.category === "Remote Control") && !finalSize.includes(":")) {
         finalSize = `1:${finalSize}`;
      }

      const sku = await generateSKU({
        name: item.name,
        category: item.category,
        color: item.color || "Black",
        size: finalSize
      });

      const barcodeImg = await generateAndUploadBarcode(sku);

      successfulProducts.push({
        name: item.name,
        description: item.description,
        category: item.category,
        color: item.color, // Ab ye valid hai
        size: finalSize,
        price: item.price,
        costing_price: item.costing_price,
        Supplier_name: item.Supplier_name,
        img: item.img || item.img_url,
        gst: item.gst || 18,
        Qty: item.Qty || item.qty || 0,
        sku: sku,
        barcodeImg: barcodeImg
      });
    }

    await Product.insertMany(successfulProducts);
    await logActivity(req, "BULK_IMPORT", `Imported ${successfulProducts.length} products.`);

    res.status(201).json({
      success: true,
      message: `Success! ${successfulProducts.length} products imported.`,
      failedCount: 0,
      failedProducts: []
    });

  } catch (error) {
    console.error("Import Error:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};


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


// // Update product quantity by SKU (ADD or REMOVE)
// export const updateQtyBySKU = async (req, res) => {
//   try {
//     const { sku, addedQty, removeQty } = req.body;

//     if (!sku) {
//       return res.status(400).json({ message: "SKU is required" });
//     }

//     const product = await Product.findOne({ sku });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found with this SKU" });
//     }

//     // ADD QTY
//     if (addedQty != null) {
//       const add = Number(addedQty);
//       if (isNaN(add) || add <= 0) {
//         return res.status(400).json({ message: "Invalid quantity to add" });
//       }

//       product.Qty += add;
//     }

//     // REMOVE QTY
//     if (removeQty != null) {
//       const remove = Number(removeQty);
//       if (isNaN(remove) || remove <= 0) {
//         return res.status(400).json({ message: "Invalid quantity to remove" });
//       }

//       if (remove > product.Qty) {
//         return res
//           .status(400)
//           .json({ message: "Remove quantity cannot be greater than current stock" });
//       }

//       product.Qty -= remove;
//     }

//     await product.save();


//     // 👇 LOG
//     const actionType = addedQty ? "STOCK_ADD" : "STOCK_REMOVE";
//     const qtyChange = addedQty || removeQty;
//     await logActivity(req, actionType, `SKU: ${sku}, Qty: ${qtyChange}`);


//     res.json(product);
//   } catch (error) {
//     console.error("Qty Update Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



import axios from "axios";
import ShopifyTokenModel from "../models/ShopifyToken.js";

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

    if (addedQty != null) {
      const add = Number(addedQty);
      if (isNaN(add) || add <= 0) {
        return res.status(400).json({ message: "Invalid quantity to add" });
      }
      product.Qty += add;
    }

    if (removeQty != null) {
      const remove = Number(removeQty);
      if (isNaN(remove) || remove <= 0) {
        return res.status(400).json({ message: "Invalid quantity to remove" });
      }

      if (remove > product.Qty) {
        return res.status(400).json({
          message: "Remove quantity cannot be greater than current stock",
        });
      }

      product.Qty -= remove;
    }

    await product.save();

    // 🔥 ===============================
    // 🔥 AUTO SHOPIFY SYNC START
    // 🔥 ===============================

    const shopData = await ShopifyTokenModel.findOne();
    if (!shopData) {
      console.log("Shopify token not found");
      return res.json(product);
    }

    const accessToken = shopData.accessToken;
    const shopName = shopData.shop;

    // Find Shopify variant by SKU
    const shopifyResp = await axios.get(
      `https://${shopName}/admin/api/2026-01/variants.json?sku=${sku}`,
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );

    const variant = shopifyResp.data.variants[0];
    if (!variant) {
      console.log("Shopify product not found");
      return res.json(product);
    }

    const inventoryItemId = variant.inventory_item_id;

    await axios.post(
      `https://${shopName}/admin/api/2026-01/inventory_levels/set.json`,
      {
        location_id: process.env.SHOPIFY_LOCATION_ID,
        inventory_item_id: inventoryItemId,
        available: product.Qty,
      },
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );

    console.log("✅ Shopify Inventory Synced");

    // 🔥 ===============================
    // 🔥 AUTO SHOPIFY SYNC END
    // 🔥 ===============================

    res.json(product);
  } catch (error) {
    console.error("Qty Update Error:", error.response?.data || error.message);
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
