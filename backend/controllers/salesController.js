// import Sale from "../models/Sale.js";

// // 🔥 UPDATE SALE QUANTITY (Recalculates Amount & Profit)
// export const updateSaleQuantity = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { newQty } = req.body;

//     if (newQty < 0) {
//       return res.status(400).json({ message: "Quantity cannot be negative" });
//     }

//     // 1. Pehle purana sale data find karein
//     const sale = await Sale.findById(id);
//     if (!sale) {
//       return res.status(404).json({ message: "Sale record not found" });
//     }

//     // 2. Nayi calculations karein
//     const updatedTotalAmount = sale.sellingPrice * newQty;
//     const updatedTotalCost = sale.costPrice * newQty;
//     const updatedProfit = updatedTotalAmount - updatedTotalCost;

//     // 3. DB mein update karein
//     const updatedSale = await Sale.findByIdAndUpdate(
//       id,
//       {
//         quantity: newQty,
//         totalAmount: updatedTotalAmount,
//         profit: updatedProfit,
//       },
//       { new: true } // updated document wapas mangne ke liye
//     );

//     res.json({ message: "Sale updated successfully", updatedSale });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getAllSales = async (req, res) => {
//   try {
//     const sales = await Sale.find().sort({ createdAt: -1 });
//     res.json(sales);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 Sales Summary
// export const getSalesDashboard = async (req, res) => {
//   try {
//     const data = await Sale.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalUnits: { $sum: "$quantity" },
//           totalRevenue: { $sum: "$totalAmount" },
//           totalProfit: { $sum: "$profit" }
//         }
//       }
//     ]);

//     res.json(data[0] || { totalUnits: 0, totalRevenue: 0, totalProfit: 0 });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 SKU Wise Report
// export const getSkuWiseSales = async (req, res) => {
//   try {
//     const data = await Sale.aggregate([
//       {
//         $group: {
//           _id: "$sku",
//           productName: { $first: "$productName" },
//           totalSold: { $sum: "$quantity" },
//           revenue: { $sum: "$totalAmount" },
//           profit: { $sum: "$profit" }
//         }
//       },
//       { $sort: { totalSold: -1 } }
//     ]);

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };











import Sale from "../models/Sale.js";

// 🔥 UPDATE SALE QUANTITY (Recalculates Amount & Profit)
// export const updateSaleQuantity = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { newQty } = req.body;

//     if (newQty < 0) {
//       return res.status(400).json({ message: "Quantity cannot be negative" });
//     }

//     const sale = await Sale.findById(id);
//     if (!sale) {
//       return res.status(404).json({ message: "Sale record not found" });
//     }

//     const updatedTotalAmount = sale.sellingPrice * newQty;
//     const updatedTotalCost = sale.costPrice * newQty;
//     const updatedProfit = updatedTotalAmount - updatedTotalCost;

//     const updatedSale = await Sale.findByIdAndUpdate(
//       id,
//       {
//         quantity: newQty,
//         totalAmount: updatedTotalAmount,
//         profit: updatedProfit,
//       },
//       { new: true } 
//     );

//     res.json({ message: "Sale updated successfully", updatedSale });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };








// // 🔥 UPDATE SALE QUANTITY (Final Fix)
// export const updateSaleQuantity = async (req, res) => {
//   try {
//     const { id } = req.params; // Ye ab ek perfect MongoDB ID hai (e.g. 699586aeda881fd4a6c1532d)
//     const { newQty } = req.body;

//     if (newQty < 0) {
//       return res.status(400).json({ message: "Quantity cannot be negative" });
//     }

//     // 1. Wapas findById lagayenge kyunki id ek MongoDB ObjectId hai
//     const sale = await Sale.findById(id);
    
//     if (!sale) {
//       return res.status(404).json({ message: "Sale record not found" });
//     }

//     // 2. Nayi calculations karein
//     const updatedTotalAmount = sale.sellingPrice * newQty;
//     const updatedTotalCost = sale.costPrice * newQty;
//     const updatedProfit = updatedTotalAmount - updatedTotalCost;

//     // 3. Database mein update karein
//     const updatedSale = await Sale.findByIdAndUpdate(
//       id, 
//       {
//         quantity: newQty,
//         totalAmount: updatedTotalAmount,
//         profit: updatedProfit,
//       },
//       { new: true } 
//     );

//     res.json({ message: "Sale updated successfully", updatedSale });
//   } catch (err) {
//     console.error("Update Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 DELETE SALE ENTRY
// export const deleteSale = async (req, res) => {
//   try {
//     const { id } = req.params; // Ye MongoDB ki _id hogi
    
//     const deletedSale = await Sale.findByIdAndDelete(id);
    
//     if (!deletedSale) {
//       return res.status(404).json({ message: "Sale record not found" });
//     }

//     res.json({ message: "Sale deleted successfully" });
//   } catch (err) {
//     console.error("Delete Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getAllSales = async (req, res) => {
//   try {
//     const sales = await Sale.find().sort({ createdAt: -1 });
//     res.json(sales);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 Sales Summary
// export const getSalesDashboard = async (req, res) => {
//   try {
//     const data = await Sale.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalUnits: { $sum: "$quantity" },
//           totalRevenue: { $sum: "$totalAmount" },
//           totalProfit: { $sum: "$profit" }
//         }
//       }
//     ]);

//     res.json(data[0] || { totalUnits: 0, totalRevenue: 0, totalProfit: 0 });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 SKU Wise Report (FIXED: Added originalId)
// export const getSkuWiseSales = async (req, res) => {
//   try {
//     const data = await Sale.aggregate([
//       {
//         $group: {
//           _id: "$sku",
//           productName: { $first: "$productName" },
//           totalSold: { $sum: "$quantity" },
//           revenue: { $sum: "$totalAmount" },
//           profit: { $sum: "$profit" },
//           originalId: { $first: "$_id" } // ✅ YE MISSING THA! Iske bina update nahi hoga
//         }
//       },
//       { $sort: { totalSold: -1 } }
//     ]);

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


















// // import Sale from "../models/Sale.js";
// import Product from "../models/Product.js";

// const ORIGIN_STATE = "Haryana"; // 👉 Apni state yahan likh dena

// // 🔥 NEW: MANUAL SALE ENTRY (Frontend ke modal se yahan aayega)
// export const createManualSale = async (req, res) => {
//   try {
//     const {
//       sku, removeQty, customSellingPrice, shop, orderNumber,
//       paymentMethod, customerName, billingAddress, shippingAddress
//     } = req.body;

//     const product = await Product.findOne({ sku });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found! Check SKU." });
//     }

//     const quantity = Number(removeQty);
//     const mrp = product.price || 0;
    
//     // Agar custom price nahi daala (mrp use kar raha hai), toh mrp hi selling price ban jayega
//     const sellingPrice = customSellingPrice !== null ? Number(customSellingPrice) : mrp;
    
//     const totalAmount = sellingPrice * quantity;
//     const totalCostPrice = (product.costing_price || 0) * quantity;
//     const profit = totalAmount - totalCostPrice;

//     // 👉 Discount Calculation
//     let discountPercent = 0;
//     if (mrp > sellingPrice) {
//       discountPercent = ((mrp - sellingPrice) / mrp) * 100;
//     }

//     // --- 🟢 GST CALCULATION LOGIC 🟢 ---
//     const gstPercent = product.gst || 0;
//     const totalTaxAmount = totalAmount - (totalAmount / (1 + (gstPercent / 100)));
//     let igst = 0, cgst = 0, sgst = 0;

//     const destinationState = shippingAddress?.province || billingAddress?.province || "";
    
//     if (destinationState.toLowerCase() === ORIGIN_STATE.toLowerCase()) {
//       cgst = totalTaxAmount / 2;
//       sgst = totalTaxAmount / 2;
//     } else {
//       igst = totalTaxAmount;
//     }

//     // Create Sale Entry
//     const newSale = new Sale({
//       orderNumber: orderNumber,
//       companyName: "Claptales",
//       paymentMethod: paymentMethod,
//       customerName: customerName,
//       billingAddress: billingAddress,
//       shippingAddress: shippingAddress,
      
//       sku: product.sku,
//       productName: product.name,
//       category: product.category,
//       quantity: quantity,
//       unit: "pcs",
      
//       mrp: mrp,
//       sellingPrice: sellingPrice,
//       discountPercentage: parseFloat(discountPercent.toFixed(2)),
//       totalAmount: totalAmount,
//       costPrice: totalCostPrice,
//       profit: profit,

//       gstPercentage: gstPercent,
//       igst: parseFloat(igst.toFixed(2)),
//       cgst: parseFloat(cgst.toFixed(2)),
//       sgst: parseFloat(sgst.toFixed(2)),

//       shop: shop || "Manual Entry"
//     });

//     await newSale.save();

//     // Deduct Stock
//     product.Qty = product.Qty - quantity;
//     await product.save();

//     res.status(201).json({ message: "Manual sale added successfully!", sale: newSale });
//   } catch (err) {
//     console.error("Manual Sale Error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };


// // 🔥 UPDATE SALE QUANTITY (Purana wala same rahega)
// export const updateSaleQuantity = async (req, res) => {
//   try {
//     const { id } = req.params; 
//     const { newQty } = req.body;

//     if (newQty < 0) return res.status(400).json({ message: "Quantity cannot be negative" });

//     const sale = await Sale.findById(id);
//     if (!sale) return res.status(404).json({ message: "Sale record not found" });

//     const updatedTotalAmount = sale.sellingPrice * newQty;
//     const updatedTotalCost = sale.costPrice * newQty;
//     const updatedProfit = updatedTotalAmount - updatedTotalCost;

//     const updatedSale = await Sale.findByIdAndUpdate(
//       id, 
//       { quantity: newQty, totalAmount: updatedTotalAmount, profit: updatedProfit },
//       { new: true } 
//     );

//     res.json({ message: "Sale updated successfully", updatedSale });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 DELETE SALE ENTRY
// export const deleteSale = async (req, res) => {
//   try {
//     const { id } = req.params; 
//     const deletedSale = await Sale.findByIdAndDelete(id);
//     if (!deletedSale) return res.status(404).json({ message: "Sale record not found" });
//     res.json({ message: "Sale deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getAllSales = async (req, res) => {
//   try {
//     const sales = await Sale.find().sort({ createdAt: -1 });
//     res.json(sales);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 Sales Summary
// export const getSalesDashboard = async (req, res) => {
//   try {
//     const data = await Sale.aggregate([
//       { $group: { _id: null, totalUnits: { $sum: "$quantity" }, totalRevenue: { $sum: "$totalAmount" }, totalProfit: { $sum: "$profit" } } }
//     ]);
//     res.json(data[0] || { totalUnits: 0, totalRevenue: 0, totalProfit: 0 });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 SKU Wise Report
// export const getSkuWiseSales = async (req, res) => {
//   try {
//     const data = await Sale.aggregate([
//       { $group: { _id: "$sku", productName: { $first: "$productName" }, totalSold: { $sum: "$quantity" }, revenue: { $sum: "$totalAmount" }, profit: { $sum: "$profit" }, originalId: { $first: "$_id" } } },
//       { $sort: { totalSold: -1 } }
//     ]);
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

















// // import Sale from "../models/Sale.js";
// import Product from "../models/Product.js";
// import PackZone from "../models/PackZone.js"; // 👉 Import karna zaroori hai
// import InventoryLog from "../models/InventoryLog.js"; // 👉 Log maintain karne ke liye

// const ORIGIN_STATE = "Haryana"; // Apni state

// export const createManualSale = async (req, res) => {
//   try {
//     const {
//       sku, removeQty, customSellingPrice, shop, orderNumber,
//       paymentMethod, customerName, billingAddress, shippingAddress,
//       actorName, userId // Frontend se bheja hua data logs ke liye
//     } = req.body;

//     const product = await Product.findOne({ sku });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found! Check SKU." });
//     }

//     const quantity = Number(removeQty);

//     if (quantity > product.Qty) {
//         return res.status(400).json({ message: "Remove quantity cannot be greater than current stock" });
//     }

//     const mrp = product.price || 0;
//     const sellingPrice = customSellingPrice !== null ? Number(customSellingPrice) : mrp;
    
//     const totalAmount = sellingPrice * quantity;
//     const totalCostPrice = (product.costing_price || 0) * quantity;
//     const profit = totalAmount - totalCostPrice;

//     // 👉 Discount Calculation
//     let discountPercent = 0;
//     if (mrp > sellingPrice) {
//       discountPercent = ((mrp - sellingPrice) / mrp) * 100;
//     }

//     // --- 🟢 GST CALCULATION LOGIC 🟢 ---
//     const gstPercent = product.gst || 0;
//     const totalTaxAmount = totalAmount - (totalAmount / (1 + (gstPercent / 100)));
//     let igst = 0, cgst = 0, sgst = 0;

//     const destinationState = shippingAddress?.province || billingAddress?.province || "";
    
//     if (destinationState.toLowerCase() === ORIGIN_STATE.toLowerCase()) {
//       cgst = totalTaxAmount / 2;
//       sgst = totalTaxAmount / 2;
//     } else {
//       igst = totalTaxAmount;
//     }

//     // 1️⃣ Create Sale Entry
//     const newSale = new Sale({
//       orderNumber: orderNumber,
//       companyName: "Claptales",
//       paymentMethod: paymentMethod,
//       customerName: customerName,
//       billingAddress: billingAddress,
//       shippingAddress: shippingAddress,
      
//       sku: product.sku,
//       productName: product.name,
//       category: product.category,
//       itemImage:product.img,
//       quantity: quantity,
//       unit: "pcs",
      
//       mrp: mrp,
//       sellingPrice: sellingPrice,
//       discountPercentage: parseFloat(discountPercent.toFixed(2)),
//       totalAmount: totalAmount,
//       costPrice: totalCostPrice,
//       profit: profit,

//       gstPercentage: gstPercent,
//       igst: parseFloat(igst.toFixed(2)),
//       cgst: parseFloat(cgst.toFixed(2)),
//       sgst: parseFloat(sgst.toFixed(2)),

//       shop: shop || "Manual Entry"
//     });

//     await newSale.save();

//     // 2️⃣ Deduct Main Product Stock
//     let oldQty = product.Qty;
//     product.Qty -= quantity;
//     await product.save();

//     // 3️⃣ 🔥 THE EXACT PACKAGING MATERIAL LOGIC 🔥 (From your old code)
//     const packagingSkus = [
//       product.brand_box_sku,
//       product.corrugated_box_sku,
//       product.tag_1_sku,
//       product.tag_2_sku,
//       product.tag_3_sku,
//       product.other_material_sku
//     ].filter(Boolean); // Removes null/empty strings

//     if (packagingSkus.length > 0) {
//       await PackZone.updateMany(
//         { item_sku: { $in: packagingSkus } },
//         { $inc: { qty: -quantity } } // Jitne product bike, utne hi boxes/tags ek sath minus honge!
//       );
//       console.log(`✅ Deducted packaging materials for sale: ${packagingSkus.join(', ')}`);
//     }

//     // 4️⃣ ✅ Create Inventory Log
//     await InventoryLog.create({
//       sku: product.sku,
//       productName: product.name,
//       type: "SALE",
//       quantityChange: -quantity,
//       previousStock: oldQty,
//       newStock: product.Qty,
//       referenceId: newSale._id
//     });

//     // Option: Yahan low stock mail wala code bhi add kar sakta hai agar zaroorat ho.

//     res.status(201).json({ message: "Manual sale added & packaging stock updated successfully!", sale: newSale });

//   } catch (err) {
//     console.error("Manual Sale Error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };


// // 🔥 UPDATE SALE QUANTITY (Purana wala same rahega)
// export const updateSaleQuantity = async (req, res) => {
//   try {
//     const { id } = req.params; 
//     const { newQty } = req.body;

//     if (newQty < 0) return res.status(400).json({ message: "Quantity cannot be negative" });

//     const sale = await Sale.findById(id);
//     if (!sale) return res.status(404).json({ message: "Sale record not found" });

//     const updatedTotalAmount = sale.sellingPrice * newQty;
//     const updatedTotalCost = sale.costPrice * newQty;
//     const updatedProfit = updatedTotalAmount - updatedTotalCost;

//     const updatedSale = await Sale.findByIdAndUpdate(
//       id, 
//       { quantity: newQty, totalAmount: updatedTotalAmount, profit: updatedProfit },
//       { new: true } 
//     );

//     res.json({ message: "Sale updated successfully", updatedSale });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 DELETE SALE ENTRY
// export const deleteSale = async (req, res) => {
//   try {
//     const { id } = req.params; 
//     const deletedSale = await Sale.findByIdAndDelete(id);
//     if (!deletedSale) return res.status(404).json({ message: "Sale record not found" });
//     res.json({ message: "Sale deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getAllSales = async (req, res) => {
//   try {
//     const sales = await Sale.find().sort({ createdAt: -1 });
//     res.json(sales);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 Sales Summary
// export const getSalesDashboard = async (req, res) => {
//   try {
//     const data = await Sale.aggregate([
//       { $group: { _id: null, totalUnits: { $sum: "$quantity" }, totalRevenue: { $sum: "$totalAmount" }, totalProfit: { $sum: "$profit" } } }
//     ]);
//     res.json(data[0] || { totalUnits: 0, totalRevenue: 0, totalProfit: 0 });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔥 SKU Wise Report
// export const getSkuWiseSales = async (req, res) => {
//   try {
//     const data = await Sale.aggregate([
//       { $group: { _id: "$sku", productName: { $first: "$productName" }, totalSold: { $sum: "$quantity" }, revenue: { $sum: "$totalAmount" }, profit: { $sum: "$profit" }, originalId: { $first: "$_id" } } },
//       { $sort: { totalSold: -1 } }
//     ]);
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




























// import Sale from "../models/Sale.js"; // 👉 Uncommented this so code doesn't crash
import Product from "../models/Product.js";
import PackZone from "../models/PackZone.js"; // 👉 Import karna zaroori hai
import InventoryLog from "../models/InventoryLog.js"; // 👉 Log maintain karne ke liye
import { logActivity } from "../utils/logger.js"; // 👉 Log activity import kiya

const ORIGIN_STATE = "Haryana"; // Apni state

export const createManualSale = async (req, res) => {
  try {
    const {
      sku, removeQty, customSellingPrice, shop, orderNumber,
      paymentMethod, customerName, billingAddress, shippingAddress,
      actorName, userId // Frontend se bheja hua data logs ke liye
    } = req.body;

    const product = await Product.findOne({ sku });
    if (!product) {
      return res.status(404).json({ message: "Product not found! Check SKU." });
    }

    const quantity = Number(removeQty);

    if (quantity > product.Qty) {
        return res.status(400).json({ message: "Remove quantity cannot be greater than current stock" });
    }

    const mrp = product.price || 0;
    const sellingPrice = customSellingPrice !== null ? Number(customSellingPrice) : mrp;
    
    const totalAmount = sellingPrice * quantity;
    const totalCostPrice = (product.costing_price || 0) * quantity;
    const profit = totalAmount - totalCostPrice;

    // 👉 Discount Calculation
    let discountPercent = 0;
    if (mrp > sellingPrice) {
      discountPercent = ((mrp - sellingPrice) / mrp) * 100;
    }

    // --- 🟢 GST CALCULATION LOGIC 🟢 ---
    const gstPercent = product.gst || 0;
    const totalTaxAmount = totalAmount - (totalAmount / (1 + (gstPercent / 100)));
    let igst = 0, cgst = 0, sgst = 0;

    const destinationState = shippingAddress?.province || billingAddress?.province || "";
    
    if (destinationState.toLowerCase() === ORIGIN_STATE.toLowerCase()) {
      cgst = totalTaxAmount / 2;
      sgst = totalTaxAmount / 2;
    } else {
      igst = totalTaxAmount;
    }

    // 1️⃣ Create Sale Entry
    const newSale = new Sale({
      orderNumber: orderNumber,
      companyName: "Claptales",
      paymentMethod: paymentMethod,
      customerName: customerName,
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
      
      sku: product.sku,
      productName: product.name,
      category: product.category,
      itemImage:product.img,
      quantity: quantity,
      unit: "pcs",
      
      mrp: mrp,
      sellingPrice: sellingPrice,
      discountPercentage: parseFloat(discountPercent.toFixed(2)),
      totalAmount: totalAmount,
      costPrice: totalCostPrice,
      profit: profit,

      gstPercentage: gstPercent,
      igst: parseFloat(igst.toFixed(2)),
      cgst: parseFloat(cgst.toFixed(2)),
      sgst: parseFloat(sgst.toFixed(2)),

      shop: shop || "Manual Entry"
    });

    await newSale.save();

    // 2️⃣ Deduct Main Product Stock
    let oldQty = product.Qty;
    product.Qty -= quantity;
    await product.save();

    // 3️⃣ 🔥 THE EXACT PACKAGING MATERIAL LOGIC 🔥 (From your old code)
    const packagingSkus = [
      product.brand_box_sku,
      product.corrugated_box_sku,
      product.tag_1_sku,
      product.tag_2_sku,
      product.tag_3_sku,
      product.other_material_sku
    ].filter(Boolean); // Removes null/empty strings

    if (packagingSkus.length > 0) {
      await PackZone.updateMany(
        { item_sku: { $in: packagingSkus } },
        { $inc: { qty: -quantity } } // Jitne product bike, utne hi boxes/tags ek sath minus honge!
      );
      console.log(`✅ Deducted packaging materials for sale: ${packagingSkus.join(', ')}`);
    }

    // 4️⃣ ✅ Create Inventory Log
    await InventoryLog.create({
      sku: product.sku,
      productName: product.name,
      type: "SALE",
      quantityChange: -quantity,
      previousStock: oldQty,
      newStock: product.Qty,
      referenceId: newSale._id
    });

    // ✅ ADDED AUDIT LOG HERE
    try {
      await logActivity(
        req,
        "SALE_CREATED",
        `Manual sale created for SKU: ${product.sku}, Qty: ${quantity}`
      );
    } catch (logError) {
      console.log("Create sale log failed:", logError.message);
    }

    // Option: Yahan low stock mail wala code bhi add kar sakta hai agar zaroorat ho.

    res.status(201).json({ message: "Manual sale added & packaging stock updated successfully!", sale: newSale });

  } catch (err) {
    console.error("Manual Sale Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// 🔥 UPDATE SALE QUANTITY (Purana wala same rahega)
export const updateSaleQuantity = async (req, res) => {
  try {
    const { id } = req.params; 
    const { newQty } = req.body;

    if (newQty < 0) return res.status(400).json({ message: "Quantity cannot be negative" });

    const sale = await Sale.findById(id);
    if (!sale) return res.status(404).json({ message: "Sale record not found" });

    const updatedTotalAmount = sale.sellingPrice * newQty;
    const updatedTotalCost = sale.costPrice * newQty;
    const updatedProfit = updatedTotalAmount - updatedTotalCost;

    const updatedSale = await Sale.findByIdAndUpdate(
      id, 
      { quantity: newQty, totalAmount: updatedTotalAmount, profit: updatedProfit },
      { new: true } 
    );

    // ✅ ADDED AUDIT LOG HERE
    try {
      await logActivity(
        req,
        "SALE_UPDATED",
        `Sale quantity updated for SKU: ${sale.sku}. New Qty: ${newQty}`
      );
    } catch (logError) {
      console.log("Update sale log failed:", logError.message);
    }

    res.json({ message: "Sale updated successfully", updatedSale });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 DELETE SALE ENTRY
export const deleteSale = async (req, res) => {
  try {
    const { id } = req.params; 
    
    // Log create karne ke liye pehle sale find kar lete hain taaki details log me save kar sakein
    const saleToDelete = await Sale.findById(id);
    if (!saleToDelete) return res.status(404).json({ message: "Sale record not found" });

    const deletedSale = await Sale.findByIdAndDelete(id);

    // ✅ ADDED AUDIT LOG HERE
    try {
      await logActivity(
        req,
        "SALE_DELETED",
        `Deleted sale record for SKU: ${saleToDelete.sku}, Qty: ${saleToDelete.quantity}`
      );
    } catch (logError) {
      console.log("Delete sale log failed:", logError.message);
    }

    res.json({ message: "Sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 Sales Summary
export const getSalesDashboard = async (req, res) => {
  try {
    const data = await Sale.aggregate([
      { $group: { _id: null, totalUnits: { $sum: "$quantity" }, totalRevenue: { $sum: "$totalAmount" }, totalProfit: { $sum: "$profit" } } }
    ]);
    res.json(data[0] || { totalUnits: 0, totalRevenue: 0, totalProfit: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 SKU Wise Report
export const getSkuWiseSales = async (req, res) => {
  try {
    const data = await Sale.aggregate([
      { $group: { _id: "$sku", productName: { $first: "$productName" }, totalSold: { $sum: "$quantity" }, revenue: { $sum: "$totalAmount" }, profit: { $sum: "$profit" }, originalId: { $first: "$_id" } } },
      { $sort: { totalSold: -1 } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};