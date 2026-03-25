// // import PackZone from "../models/PackZone.js";
// // import PackZoneLog from "../models/PackZoneLog.js";
// // import { logActivity } from "../utils/logger.js";

// // // ==================== GET ALL ITEMS ====================
// // export const getAllPackZoneItems = async (req, res) => {
// //   try {
// //     const { category, subCategory, status, search } = req.query;

// //     let filter = {};
    
// //     if (category) {
// //       filter.category = category;
// //     }
    
// //     if (subCategory) {
// //       filter.subCategory = subCategory;
// //     }
    
// //     if (status) {
// //       filter.status = status;
// //     }
    
// //     if (search) {
// //       filter.$or = [
// //         { itemName: { $regex: search, $options: "i" } },
// //         { description: { $regex: search, $options: "i" } },
// //         { size: { $regex: search, $options: "i" } }
// //       ];
// //     }

// //     const items = await PackZone.find(filter)
// //       .populate("createdBy", "name email username")
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       count: items.length,
// //       items
// //     });
// //   } catch (error) {
// //     console.error("Get PackZone Items Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch items",
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== GET SINGLE ITEM ====================
// // export const getPackZoneItemById = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const item = await PackZone.findById(id)
// //       .populate("createdBy", "name email username");

// //     if (!item) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Item not found"
// //       });
// //     }

// //     const recentLogs = await PackZoneLog.find({ packZone: id })
// //       .populate("performedBy", "name username")
// //       .sort({ createdAt: -1 })
// //       .limit(10);

// //     res.status(200).json({
// //       success: true,
// //       item,
// //       recentLogs
// //     });
// //   } catch (error) {
// //     console.error("Get PackZone Item Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch item",
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== CREATE ITEM ====================
// // export const createPackZoneItem = async (req, res) => {
// //   try {
// //     const {
// //       itemName,
// //       size,
// //       category,
// //       subCategory,
// //       qty,
// //       unit,
// //       minimumStock,
// //       status,
// //       description
// //     } = req.body;

// //     // Check if item already exists
// //     const existingItem = await PackZone.findOne({ itemName, size });
// //     if (existingItem) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Item with this name and size already exists"
// //       });
// //     }

// //     const item = await PackZone.create({
// //       itemName,
// //       size,
// //       category,
// //       subCategory,
// //       qty: qty || 0,
// //       unit,
// //       minimumStock: minimumStock || 50,
// //       status: status || "Active",
// //       description,
// //       createdBy: req.user._id
// //     });

// //     // Create initial log
// //     await PackZoneLog.create({
// //       packZone: item._id,
// //       actionType: "ADD",
// //       quantity: qty || 0,
// //       qtyBefore: 0,
// //       qtyAfter: qty || 0,
// //       reason: "Initial stock",
// //       performedBy: req.user._id,
// //       performedByName: req.user.name || req.user.username
// //     });

// //     await logActivity(
// //       req,
// //       "PACKZONE_ITEM_CREATED",
// //       `Created PackZone item: ${itemName} (${category} - ${subCategory}) - Qty: ${qty || 0}`
// //     );

// //     res.status(201).json({
// //       success: true,
// //       message: "Item created successfully",
// //       item
// //     });
// //   } catch (error) {
// //     console.error("Create PackZone Item Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to create item",
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== UPDATE ITEM ====================
// // export const updatePackZoneItem = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const updateData = req.body;

// //     const item = await PackZone.findById(id);

// //     if (!item) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Item not found"
// //       });
// //     }

// //     // Don't allow direct qty update through this endpoint
// //     delete updateData.qty;

// //     const updatedItem = await PackZone.findByIdAndUpdate(
// //       id,
// //       updateData,
// //       { new: true, runValidators: true }
// //     ).populate("createdBy", "name email username");

// //     await logActivity(
// //       req,
// //       "PACKZONE_ITEM_UPDATED",
// //       `Updated PackZone item: ${updatedItem.itemName}`
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Item updated successfully",
// //       item: updatedItem
// //     });
// //   } catch (error) {
// //     console.error("Update PackZone Item Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to update item",
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== DELETE ITEM ====================
// // export const deletePackZoneItem = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const item = await PackZone.findById(id);

// //     if (!item) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Item not found"
// //       });
// //     }

// //     const itemName = item.itemName;

// //     await PackZoneLog.deleteMany({ packZone: id });
// //     await PackZone.findByIdAndDelete(id);

// //     await logActivity(
// //       req,
// //       "PACKZONE_ITEM_DELETED",
// //       `Deleted PackZone item: ${itemName}`
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Item deleted successfully"
// //     });
// //   } catch (error) {
// //     console.error("Delete PackZone Item Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to delete item",
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== ADD STOCK ====================
// // export const addStock = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { quantity, reason } = req.body;

// //     if (!quantity || quantity <= 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid quantity"
// //       });
// //     }

// //     const item = await PackZone.findById(id);

// //     if (!item) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Item not found"
// //       });
// //     }

// //     const qtyBefore = item.qty;
// //     await item.addStock(quantity);
// //     const qtyAfter = item.qty;

// //     await PackZoneLog.create({
// //       packZone: id,
// //       actionType: "ADD",
// //       quantity,
// //       qtyBefore,
// //       qtyAfter,
// //       reason: reason || "Stock added",
// //       performedBy: req.user._id,
// //       performedByName: req.user.name || req.user.username
// //     });

// //     await logActivity(
// //       req,
// //       "PACKZONE_STOCK_ADDED",
// //       `Added ${quantity} ${item.unit} to ${item.itemName}. Qty: ${qtyBefore} → ${qtyAfter}`
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Stock added successfully",
// //       item
// //     });
// //   } catch (error) {
// //     console.error("Add Stock Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to add stock",
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== USE STOCK ====================
// // export const useStock = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { quantity, reason } = req.body;

// //     if (!quantity || quantity <= 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid quantity"
// //       });
// //     }

// //     const item = await PackZone.findById(id);

// //     if (!item) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Item not found"
// //       });
// //     }

// //     if (item.qty < quantity) {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Insufficient stock. Available: ${item.qty} ${item.unit}, Requested: ${quantity} ${item.unit}`
// //       });
// //     }

// //     const qtyBefore = item.qty;
// //     await item.reduceStock(quantity);
// //     const qtyAfter = item.qty;

// //     await PackZoneLog.create({
// //       packZone: id,
// //       actionType: "USE",
// //       quantity,
// //       qtyBefore,
// //       qtyAfter,
// //       reason: reason || "Stock used",
// //       performedBy: req.user._id,
// //       performedByName: req.user.name || req.user.username
// //     });

// //     await logActivity(
// //       req,
// //       "PACKZONE_STOCK_USED",
// //       `Used ${quantity} ${item.unit} of ${item.itemName}. Qty: ${qtyBefore} → ${qtyAfter}`
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Stock reduced successfully",
// //       item
// //     });
// //   } catch (error) {
// //     console.error("Use Stock Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: error.message || "Failed to use stock",
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== ADJUST STOCK ====================
// // export const adjustStock = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { newQuantity, reason } = req.body;

// //     if (newQuantity === undefined || newQuantity < 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid quantity"
// //       });
// //     }

// //     const item = await PackZone.findById(id);

// //     if (!item) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Item not found"
// //       });
// //     }

// //     const qtyBefore = item.qty;
// //     const difference = newQuantity - qtyBefore;
    
// //     await item.adjustStock(newQuantity);

// //     await PackZoneLog.create({
// //       packZone: id,
// //       actionType: "ADJUST",
// //       quantity: Math.abs(difference),
// //       qtyBefore,
// //       qtyAfter: newQuantity,
// //       reason: reason || "Manual adjustment",
// //       performedBy: req.user._id,
// //       performedByName: req.user.name || req.user.username
// //     });

// //     await logActivity(
// //       req,
// //       "PACKZONE_STOCK_ADJUSTED",
// //       `Adjusted stock for ${item.itemName}. Qty: ${qtyBefore} → ${newQuantity} (${difference >= 0 ? '+' : ''}${difference})`
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Stock adjusted successfully",
// //       item
// //     });
// //   } catch (error) {
// //     console.error("Adjust Stock Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to adjust stock",
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== GET LOGS ====================
// // export const getItemLogs = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { limit = 50, actionType } = req.query;

// //     let filter = { packZone: id };
    
// //     if (actionType) {
// //       filter.actionType = actionType;
// //     }

// //     const logs = await PackZoneLog.find(filter)
// //       .populate("performedBy", "name username email")
// //       .sort({ createdAt: -1 })
// //       .limit(parseInt(limit));

// //     res.status(200).json({
// //       success: true,
// //       count: logs.length,
// //       logs
// //     });
// //   } catch (error) {
// //     console.error("Get Logs Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch logs",
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== GET STATISTICS ====================
// // export const getPackZoneStats = async (req, res) => {
// //   try {
// //     const totalItems = await PackZone.countDocuments();
// //     const activeItems = await PackZone.countDocuments({ status: "Active" });
// //     const lowStockItems = await PackZone.countDocuments({ isLowStock: true });

// //     // By Category
// //     const itemsByCategory = await PackZone.aggregate([
// //       {
// //         $group: {
// //           _id: "$category",
// //           count: { $sum: 1 },
// //           totalQty: { $sum: "$qty" },
// //           lowStockCount: {
// //             $sum: { $cond: ["$isLowStock", 1, 0] }
// //           }
// //         }
// //       }
// //     ]);

// //     // By Sub-Category
// //     const itemsBySubCategory = await PackZone.aggregate([
// //       {
// //         $group: {
// //           _id: {
// //             category: "$category",
// //             subCategory: "$subCategory"
// //           },
// //           count: { $sum: 1 },
// //           totalQty: { $sum: "$qty" }
// //         }
// //       },
// //       {
// //         $sort: { "_id.category": 1, "_id.subCategory": 1 }
// //       }
// //     ]);

// //     // Low stock items list
// //     const lowStockList = await PackZone.find({ isLowStock: true })
// //       .select("itemName category subCategory qty minimumStock unit")
// //       .limit(10);

// //     // Recent activity (last 7 days)
// //     const sevenDaysAgo = new Date();
// //     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

// //     const recentActivity = await PackZoneLog.aggregate([
// //       {
// //         $match: {
// //           createdAt: { $gte: sevenDaysAgo }
// //         }
// //       },
// //       {
// //         $group: {
// //           _id: "$actionType",
// //           count: { $sum: 1 },
// //           totalQuantity: { $sum: "$quantity" }
// //         }
// //       }
// //     ]);

// //     res.status(200).json({
// //       success: true,
// //       stats: {
// //         total: totalItems,
// //         active: activeItems,
// //         lowStock: lowStockItems,
// //         byCategory: itemsByCategory,
// //         bySubCategory: itemsBySubCategory,
// //         lowStockList,
// //         recentActivity
// //       }
// //     });
// //   } catch (error) {
// //     console.error("Get Stats Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch statistics",
// //       error: error.message
// //     });
// //   }
// // };

// // // ==================== TOGGLE STATUS ====================
// // export const toggleStatus = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const item = await PackZone.findById(id);

// //     if (!item) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Item not found"
// //       });
// //     }

// //     item.status = item.status === "Active" ? "Inactive" : "Active";
// //     await item.save();

// //     await logActivity(
// //       req,
// //       "PACKZONE_STATUS_CHANGED",
// //       `${item.status === 'Active' ? 'Activated' : 'Deactivated'} item: ${item.itemName}`
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: `Item ${item.status === 'Active' ? 'activated' : 'deactivated'} successfully`,
// //       item
// //     });
// //   } catch (error) {
// //     console.error("Toggle Status Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to toggle status",
// //       error: error.message
// //     });
// //   }
// // };





// import PackZone from "../models/PackZone.js";
// import PackZoneLog from "../models/PackZoneLog.js"; // Keeping logs for history
// import { logActivity } from "../utils/logger.js";

// // ==================== GET ALL ITEMS ====================
// export const getAllPackZoneItems = async (req, res) => {
//   try {
//     const { category, search } = req.query; // Removed subCategory & status filters

//     let filter = {};
    
//     if (category) {
//       filter.category = category;
//     }
    
//     if (search) {
//       filter.$or = [
//         { itemName: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } }
//       ];
//     }

//     const items = await PackZone.find(filter)
//       .populate("createdBy", "name username")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: items.length,
//       items
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



// // // ==================== ADD STOCK ====================
// export const addStock = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity, reason } = req.body;

//     if (!quantity || quantity <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid quantity"
//       });
//     }

//     const item = await PackZone.findById(id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found"
//       });
//     }

//     const qtyBefore = item.qty;
//     await item.addStock(quantity);
//     const qtyAfter = item.qty;

//     await PackZoneLog.create({
//       packZone: id,
//       actionType: "ADD",
//       quantity,
//       qtyBefore,
//       qtyAfter,
//       reason: reason || "Stock added",
//       performedBy: req.user._id,
//       performedByName: req.user.name || req.user.username
//     });

//     await logActivity(
//       req,
//       "PACKZONE_STOCK_ADDED",
//       `Added ${quantity} ${item.unit} to ${item.itemName}. Qty: ${qtyBefore} → ${qtyAfter}`
//     );

//     res.status(200).json({
//       success: true,
//       message: "Stock added successfully",
//       item
//     });
//   } catch (error) {
//     console.error("Add Stock Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to add stock",
//       error: error.message
//     });
//   }
// };


// // ==================== CREATE ITEM ====================
// export const createPackZoneItem = async (req, res) => {
//   try {
//     const {
//       itemName,
//       length, width, height, dimensionUnit, // Split size fields
//       category,
//       qty,
//       unit,
//       minimumStock,
//       description
//     } = req.body;

//     // Validation for duplicates (Name + Dimensions check)
//     const existingItem = await PackZone.findOne({ 
//         itemName, length, width, height, dimensionUnit 
//     });
    
//     if (existingItem) {
//       return res.status(400).json({
//         success: false,
//         message: "Item with these exact details already exists"
//       });
//     }

//     const item = await PackZone.create({
//       itemName,
//       length, width, height, dimensionUnit,
//       category,
//       qty: qty || 0,
//       unit,
//       minimumStock: minimumStock || 50,
//       description,
//       createdBy: req.user._id
//     });

//     // Initial Log
//     await PackZoneLog.create({
//       packZone: item._id,
//       actionType: "ADD",
//       quantity: qty || 0,
//       qtyBefore: 0,
//       qtyAfter: qty || 0,
//       reason: "Initial Entry",
//       performedBy: req.user._id,
//       performedByName: req.user.name
//     });

//     res.status(201).json({ success: true, message: "Item created", item });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== UPDATE ITEM ====================
// export const updatePackZoneItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     // Prevent direct qty update here (must use stock actions)
//     delete updateData.qty; 

//     const item = await PackZone.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!item) return res.status(404).json({ success: false, message: "Item not found" });

//     res.status(200).json({ success: true, message: "Item updated", item });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== DELETE ITEM ====================
// export const deletePackZoneItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const item = await PackZone.findByIdAndDelete(id);
    
//     if (!item) return res.status(404).json({ success: false, message: "Item not found" });

//     // Clean up logs
//     await PackZoneLog.deleteMany({ packZone: id });

//     res.status(200).json({ success: true, message: "Item deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== STATS ====================
// export const getPackZoneStats = async (req, res) => {
//   try {
//     const totalItems = await PackZone.countDocuments();
//     const lowStockItems = await PackZone.countDocuments({ isLowStock: true });

//     const itemsByCategory = await PackZone.aggregate([
//       {
//         $group: {
//           _id: "$category",
//           count: { $sum: 1 },
//           totalQty: { $sum: "$qty" }
//         }
//       }
//     ]);

//     const lowStockList = await PackZone.find({ isLowStock: true })
//       .select("itemName category qty minimumStock unit")
//       .limit(10);

//     res.status(200).json({
//       success: true,
//       stats: {
//         total: totalItems,
//         lowStock: lowStockItems,
//         byCategory: itemsByCategory,
//         lowStockList
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Note: addStock, useStock, adjustStock, getLogs remain same as before
// // Just ensure you export them or include them in this file.






























// import PackZone from "../models/PackZone.js";
// import PackZoneLog from "../models/PackZoneLog.js";
// import { logActivity } from "../utils/logger.js";

// // ==================== GET ALL ITEMS ====================
// export const getAllPackZoneItems = async (req, res) => {
//   try {
//     const { category, search } = req.query;

//     let filter = {};
    
//     // Filter by Category
//     if (category) {
//       filter.category = category;
//     }
    
//     // Search (Name or Description)
//     if (search) {
//       filter.$or = [
//         { itemName: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } }
//       ];
//     }

//     const items = await PackZone.find(filter)
//       .populate("createdBy", "name email username")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: items.length,
//       items
//     });
//   } catch (error) {
//     console.error("Get PackZone Items Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch items",
//       error: error.message
//     });
//   }
// };

// // ==================== GET SINGLE ITEM ====================
// export const getPackZoneItemById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const item = await PackZone.findById(id)
//       .populate("createdBy", "name email username");

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found"
//       });
//     }

//     const recentLogs = await PackZoneLog.find({ packZone: id })
//       .populate("performedBy", "name username")
//       .sort({ createdAt: -1 })
//       .limit(10);

//     res.status(200).json({
//       success: true,
//       item,
//       recentLogs
//     });
//   } catch (error) {
//     console.error("Get PackZone Item Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch item",
//       error: error.message
//     });
//   }
// };

// // ==================== CREATE ITEM ====================


// // ==================== CREATE ITEM ====================
// export const createPackZoneItem = async (req, res) => {
//   try {
//     const {
//       itemName,
//       size,
//       category,
//       qty,
//       costing,
//       unit,
//       minimumStock,
//       description,
//       vendor,
//       itemImage
//     } = req.body;

//     // Check if SKU already exists
//     const generatedSku = `${itemName}-${size}`.replace(/\s+/g, '-').toLowerCase();
//     const existingItem = await PackZone.findOne({ item_sku: generatedSku });

//     if (existingItem) {
//       return res.status(400).json({
//         success: false,
//         message: "Item with this Name and Size already exists (SKU Conflict)"
//       });
//     }

//     const item = await PackZone.create({
//       itemName,
//       size,
//       category,
//       qty: qty || 0,
//       costing: costing || 0,
//       unit: unit || "Piece",
//       minimumStock: minimumStock || 10,
//       description,
//       vendor,
//       createdBy: req.user._id,
//       itemImage: itemImage || ""
//     });

//     // Create initial log
//     await PackZoneLog.create({
//       packZone: item._id,
//       actionType: "ADD",
//       quantity: qty || 0,
//       qtyBefore: 0,
//       qtyAfter: qty || 0,
//       reason: "Initial stock entry from Excel/Form",
//       performedBy: req.user._id,
//       performedByName: req.user.name || req.user.username
//     });

//     await logActivity(
//       req,
//       "PACKZONE_ITEM_CREATED",
//       `Created: ${itemName} [SKU: ${item.item_sku}]`
//     );

//     res.status(201).json({
//       success: true,
//       message: "Item created successfully",
//       item
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== UPDATE ITEM ====================
// export const updatePackZoneItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     // Prevent direct qty update through this endpoint (Use stock actions instead)
//     delete updateData.qty;

//     const item = await PackZone.findById(id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found"
//       });
//     }

//     const updatedItem = await PackZone.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate("createdBy", "name email username");

//     await logActivity(
//       req,
//       "PACKZONE_ITEM_UPDATED",
//       `Updated PackZone item: ${updatedItem.itemName}`
//     );

//     res.status(200).json({
//       success: true,
//       message: "Item updated successfully",
//       item: updatedItem
//     });
//   } catch (error) {
//     console.error("Update PackZone Item Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update item",
//       error: error.message
//     });
//   }
// };

// // ==================== DELETE ITEM ====================
// export const deletePackZoneItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const item = await PackZone.findById(id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found"
//       });
//     }

//     const itemName = item.itemName;

//     // Delete all associated logs first
//     await PackZoneLog.deleteMany({ packZone: id });
    
//     // Delete the item
//     await PackZone.findByIdAndDelete(id);

//     await logActivity(
//       req,
//       "PACKZONE_ITEM_DELETED",
//       `Deleted PackZone item: ${itemName}`
//     );

//     res.status(200).json({
//       success: true,
//       message: "Item deleted successfully"
//     });
//   } catch (error) {
//     console.error("Delete PackZone Item Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete item",
//       error: error.message
//     });
//   }
// };

// // ==================== ADD STOCK ====================
// export const addStock = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity, reason } = req.body;

//     if (!quantity || quantity <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid quantity"
//       });
//     }

//     const item = await PackZone.findById(id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found"
//       });
//     }

//     const qtyBefore = item.qty;
//     await item.addStock(quantity); // Using method from Model
//     const qtyAfter = item.qty;

//     await PackZoneLog.create({
//       packZone: id,
//       actionType: "ADD",
//       quantity,
//       qtyBefore,
//       qtyAfter,
//       reason: reason || "Stock added",
//       performedBy: req.user._id,
//       performedByName: req.user.name || req.user.username
//     });

//     await logActivity(
//       req,
//       "PACKZONE_STOCK_ADDED",
//       `Added ${quantity} ${item.unit} to ${item.itemName}`
//     );

//     res.status(200).json({
//       success: true,
//       message: "Stock added successfully",
//       item
//     });
//   } catch (error) {
//     console.error("Add Stock Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to add stock",
//       error: error.message
//     });
//   }
// };

// // ==================== USE STOCK ====================
// export const useStock = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity, reason } = req.body;

//     if (!quantity || quantity <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid quantity"
//       });
//     }

//     const item = await PackZone.findById(id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found"
//       });
//     }

//     if (item.qty < quantity) {
//       return res.status(400).json({
//         success: false,
//         message: `Insufficient stock. Available: ${item.qty} ${item.unit}`
//       });
//     }

//     const qtyBefore = item.qty;
//     await item.reduceStock(quantity); // Using method from Model
//     const qtyAfter = item.qty;

//     await PackZoneLog.create({
//       packZone: id,
//       actionType: "USE",
//       quantity,
//       qtyBefore,
//       qtyAfter,
//       reason: reason || "Stock used",
//       performedBy: req.user._id,
//       performedByName: req.user.name || req.user.username
//     });

//     await logActivity(
//       req,
//       "PACKZONE_STOCK_USED",
//       `Used ${quantity} ${item.unit} of ${item.itemName}`
//     );

//     res.status(200).json({
//       success: true,
//       message: "Stock reduced successfully",
//       item
//     });
//   } catch (error) {
//     console.error("Use Stock Error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to use stock",
//       error: error.message
//     });
//   }
// };

// // ==================== ADJUST STOCK ====================
// export const adjustStock = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { newQuantity, reason } = req.body;

//     if (newQuantity === undefined || newQuantity < 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid quantity"
//       });
//     }

//     const item = await PackZone.findById(id);

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found"
//       });
//     }

//     const qtyBefore = item.qty;
//     const difference = newQuantity - qtyBefore;
    
//     await item.adjustStock(newQuantity); // Using method from Model

//     await PackZoneLog.create({
//       packZone: id,
//       actionType: "ADJUST",
//       quantity: Math.abs(difference),
//       qtyBefore,
//       qtyAfter: newQuantity,
//       reason: reason || "Manual adjustment",
//       performedBy: req.user._id,
//       performedByName: req.user.name || req.user.username
//     });

//     await logActivity(
//       req,
//       "PACKZONE_STOCK_ADJUSTED",
//       `Adjusted stock for ${item.itemName} to ${newQuantity}`
//     );

//     res.status(200).json({
//       success: true,
//       message: "Stock adjusted successfully",
//       item
//     });
//   } catch (error) {
//     console.error("Adjust Stock Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to adjust stock",
//       error: error.message
//     });
//   }
// };

// // ==================== GET LOGS ====================
// export const getItemLogs = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { limit = 50 } = req.query;

//     const logs = await PackZoneLog.find({ packZone: id })
//       .populate("performedBy", "name username email")
//       .sort({ createdAt: -1 })
//       .limit(parseInt(limit));

//     res.status(200).json({
//       success: true,
//       count: logs.length,
//       logs
//     });
//   } catch (error) {
//     console.error("Get Logs Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch logs",
//       error: error.message
//     });
//   }
// };

// // ==================== GET STATISTICS ====================
// export const getPackZoneStats = async (req, res) => {
//   try {
//     const totalItems = await PackZone.countDocuments();
//     const lowStockItems = await PackZone.countDocuments({ isLowStock: true });

//     // Group by Category only (Removed sub-category grouping)
//     const itemsByCategory = await PackZone.aggregate([
//       {
//         $group: {
//           _id: "$category",
//           count: { $sum: 1 },
//           totalQty: { $sum: "$qty" },
//           lowStockCount: {
//             $sum: { $cond: ["$isLowStock", 1, 0] }
//           }
//         }
//       }
//     ]);

//     // Low stock items list (Top 10)
//     const lowStockList = await PackZone.find({ isLowStock: true })
//       .select("itemName length width height dimensionUnit category qty minimumStock unit")
//       .limit(10);

//     // Recent activity (Last 7 days)
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     const recentActivity = await PackZoneLog.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: sevenDaysAgo }
//         }
//       },
//       {
//         $group: {
//           _id: "$actionType",
//           count: { $sum: 1 },
//           totalQuantity: { $sum: "$quantity" }
//         }
//       }
//     ]);

//     res.status(200).json({
//       success: true,
//       stats: {
//         total: totalItems,
//         lowStock: lowStockItems,
//         byCategory: itemsByCategory,
//         lowStockList,
//         recentActivity
//       }
//     });
//   } catch (error) {
//     console.error("Get Stats Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch statistics",
//       error: error.message
//     });
//   }
// };



























import PackZone from "../models/PackZone.js";
import PackZoneLog from "../models/PackZoneLog.js";
import { logActivity } from "../utils/logger.js";

// ==================== GET ALL ITEMS ====================
export const getAllPackZoneItems = async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};
    
    // Filter by Category
    if (category) {
      filter.category = category;
    }
    
    // Search (Name or Description)
    if (search) {
      filter.$or = [
        { itemName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const items = await PackZone.find(filter)
      .populate("createdBy", "name email username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items
    });
  } catch (error) {
    console.error("Get PackZone Items Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch items",
      error: error.message
    });
  }
};

// ==================== GET SINGLE ITEM ====================
export const getPackZoneItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await PackZone.findById(id)
      .populate("createdBy", "name email username");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    const recentLogs = await PackZoneLog.find({ packZone: id })
      .populate("performedBy", "name username")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      item,
      recentLogs
    });
  } catch (error) {
    console.error("Get PackZone Item Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch item",
      error: error.message
    });
  }
};

// ==================== CREATE ITEM ====================
export const createPackZoneItem = async (req, res) => {
  try {
    const {
      itemName,
      size,
      category,
      qty,
      costing,
      unit,
      minimumStock,
      description,
      vendor,
      itemImage
    } = req.body;

    // Check if SKU already exists
    const generatedSku = `${itemName}-${size}`.replace(/\s+/g, '-').toLowerCase();
    const existingItem = await PackZone.findOne({ item_sku: generatedSku });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: "Item with this Name and Size already exists (SKU Conflict)"
      });
    }

    const item = await PackZone.create({
      itemName,
      size,
      category,
      qty: qty || 0,
      costing: costing || 0,
      unit: unit || "Piece",
      minimumStock: minimumStock || 10,
      description,
      vendor,
      createdBy: req.user._id,
      itemImage: itemImage || ""
    });

    // Create initial log
    await PackZoneLog.create({
      packZone: item._id,
      actionType: "ADD",
      quantity: qty || 0,
      qtyBefore: 0,
      qtyAfter: qty || 0,
      reason: "Initial stock entry from Excel/Form",
      performedBy: req.user._id,
      performedByName: req.user.name || req.user.username
    });

    // ✅ Wrapped in try-catch
    try {
      await logActivity(
        req,
        "PACKZONE_ITEM_CREATED",
        `Created: ${itemName} [SKU: ${item.item_sku}]`
      );
    } catch (logError) {
      console.log("Create item log failed:", logError.message);
    }

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      item
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== UPDATE ITEM ====================
export const updatePackZoneItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Prevent direct qty update through this endpoint (Use stock actions instead)
    delete updateData.qty;

    const item = await PackZone.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    const updatedItem = await PackZone.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("createdBy", "name email username");

    // ✅ Wrapped in try-catch
    try {
      await logActivity(
        req,
        "PACKZONE_ITEM_UPDATED",
        `Updated PackZone item: ${updatedItem.itemName}`
      );
    } catch (logError) {
      console.log("Update item log failed:", logError.message);
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item: updatedItem
    });
  } catch (error) {
    console.error("Update PackZone Item Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update item",
      error: error.message
    });
  }
};

// ==================== DELETE ITEM ====================
export const deletePackZoneItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await PackZone.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    const itemName = item.itemName;

    // Delete all associated logs first
    await PackZoneLog.deleteMany({ packZone: id });
    
    // Delete the item
    await PackZone.findByIdAndDelete(id);

    // ✅ Wrapped in try-catch
    try {
      await logActivity(
        req,
        "PACKZONE_ITEM_DELETED",
        `Deleted PackZone item: ${itemName}`
      );
    } catch (logError) {
      console.log("Delete item log failed:", logError.message);
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully"
    });
  } catch (error) {
    console.error("Delete PackZone Item Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete item",
      error: error.message
    });
  }
};

// ==================== ADD STOCK ====================
export const addStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, reason } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity"
      });
    }

    const item = await PackZone.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    const qtyBefore = item.qty;
    await item.addStock(quantity); // Using method from Model
    const qtyAfter = item.qty;

    await PackZoneLog.create({
      packZone: id,
      actionType: "ADD",
      quantity,
      qtyBefore,
      qtyAfter,
      reason: reason || "Stock added",
      performedBy: req.user._id,
      performedByName: req.user.name || req.user.username
    });

    // ✅ Wrapped in try-catch
    try {
      await logActivity(
        req,
        "PACKZONE_STOCK_ADDED",
        `Added ${quantity} ${item.unit} to ${item.itemName}`
      );
    } catch (logError) {
      console.log("Add stock log failed:", logError.message);
    }

    res.status(200).json({
      success: true,
      message: "Stock added successfully",
      item
    });
  } catch (error) {
    console.error("Add Stock Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add stock",
      error: error.message
    });
  }
};

// ==================== USE STOCK ====================
export const useStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, reason } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity"
      });
    }

    const item = await PackZone.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    if (item.qty < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${item.qty} ${item.unit}`
      });
    }

    const qtyBefore = item.qty;
    await item.reduceStock(quantity); // Using method from Model
    const qtyAfter = item.qty;

    await PackZoneLog.create({
      packZone: id,
      actionType: "USE",
      quantity,
      qtyBefore,
      qtyAfter,
      reason: reason || "Stock used",
      performedBy: req.user._id,
      performedByName: req.user.name || req.user.username
    });

    // ✅ Wrapped in try-catch
    try {
      await logActivity(
        req,
        "PACKZONE_STOCK_USED",
        `Used ${quantity} ${item.unit} of ${item.itemName}`
      );
    } catch (logError) {
       console.log("Use stock log failed:", logError.message);
    }

    res.status(200).json({
      success: true,
      message: "Stock reduced successfully",
      item
    });
  } catch (error) {
    console.error("Use Stock Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to use stock",
      error: error.message
    });
  }
};

// ==================== ADJUST STOCK ====================
export const adjustStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { newQuantity, reason } = req.body;

    if (newQuantity === undefined || newQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity"
      });
    }

    const item = await PackZone.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    const qtyBefore = item.qty;
    const difference = newQuantity - qtyBefore;
    
    await item.adjustStock(newQuantity); // Using method from Model

    await PackZoneLog.create({
      packZone: id,
      actionType: "ADJUST",
      quantity: Math.abs(difference),
      qtyBefore,
      qtyAfter: newQuantity,
      reason: reason || "Manual adjustment",
      performedBy: req.user._id,
      performedByName: req.user.name || req.user.username
    });

    // ✅ Wrapped in try-catch
    try {
      await logActivity(
        req,
        "PACKZONE_STOCK_ADJUSTED",
        `Adjusted stock for ${item.itemName} to ${newQuantity}`
      );
    } catch (logError) {
      console.log("Adjust stock log failed:", logError.message);
    }

    res.status(200).json({
      success: true,
      message: "Stock adjusted successfully",
      item
    });
  } catch (error) {
    console.error("Adjust Stock Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to adjust stock",
      error: error.message
    });
  }
};

// ==================== GET LOGS ====================
export const getItemLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 50 } = req.query;

    const logs = await PackZoneLog.find({ packZone: id })
      .populate("performedBy", "name username email")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: logs.length,
      logs
    });
  } catch (error) {
    console.error("Get Logs Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch logs",
      error: error.message
    });
  }
};

// ==================== GET STATISTICS ====================
export const getPackZoneStats = async (req, res) => {
  try {
    const totalItems = await PackZone.countDocuments();
    const lowStockItems = await PackZone.countDocuments({ isLowStock: true });

    // Group by Category only (Removed sub-category grouping)
    const itemsByCategory = await PackZone.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalQty: { $sum: "$qty" },
          lowStockCount: {
            $sum: { $cond: ["$isLowStock", 1, 0] }
          }
        }
      }
    ]);

    // Low stock items list (Top 10)
    const lowStockList = await PackZone.find({ isLowStock: true })
      .select("itemName length width height dimensionUnit category qty minimumStock unit")
      .limit(10);

    // Recent activity (Last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = await PackZoneLog.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: "$actionType",
          count: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total: totalItems,
        lowStock: lowStockItems,
        byCategory: itemsByCategory,
        lowStockList,
        recentActivity
      }
    });
  } catch (error) {
    console.error("Get Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message
    });
  }
};