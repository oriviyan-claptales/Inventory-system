import LabelStock from "../models/LabelStock.js";
import LabelStockLog from "../models/LabelStockLog.js";
import { logActivity } from "../utils/logger.js";

// ==================== GET ALL LABEL STOCKS ====================
export const getAllLabelStocks = async (req, res) => {
  try {
    const { type, status, search } = req.query;

    // Build filter
    let filter = {};
    
    if (type) {
      filter.labelType = type;
    }
    
    if (status === "low") {
      filter.isLowStock = true;
    } else if (status === "active") {
      filter.isActive = true;
    } else if (status === "inactive") {
      filter.isActive = false;
    }
    
    if (search) {
      filter.$or = [
        { labelName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { customTypeName: { $regex: search, $options: "i" } }
      ];
    }

    const labelStocks = await LabelStock.find(filter)
      .populate("createdBy", "name email username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: labelStocks.length,
      labelStocks
    });
  } catch (error) {
    console.error("Get Label Stocks Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch label stocks",
      error: error.message
    });
  }
};

// ==================== GET SINGLE LABEL STOCK ====================
export const getLabelStockById = async (req, res) => {
  try {
    const { id } = req.params;

    const labelStock = await LabelStock.findById(id)
      .populate("createdBy", "name email username");

    if (!labelStock) {
      return res.status(404).json({
        success: false,
        message: "Label stock not found"
      });
    }

    // Get recent logs
    const recentLogs = await LabelStockLog.find({ labelStock: id })
      .populate("performedBy", "name username")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      labelStock,
      recentLogs
    });
  } catch (error) {
    console.error("Get Label Stock Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch label stock",
      error: error.message
    });
  }
};

// ==================== CREATE LABEL STOCK ====================
export const createLabelStock = async (req, res) => {
  try {
    const {
      labelName,
      labelType,
      customTypeName,
      currentStock,
      minimumStock,
      description,
      size
    } = req.body;

    // Check if label name already exists
    const existingLabel = await LabelStock.findOne({ labelName });
    if (existingLabel) {
      return res.status(400).json({
        success: false,
        message: "Label with this name already exists"
      });
    }

    // Create label stock
    const labelStock = await LabelStock.create({
      labelName,
      labelType,
      customTypeName,
      currentStock: currentStock || 0,
      minimumStock: minimumStock || 100,
      description,
      size,
      createdBy: req.user._id
    });

    // Create initial log entry
    await LabelStockLog.create({
      labelStock: labelStock._id,
      actionType: "ADD",
      quantity: currentStock || 0,
      stockBefore: 0,
      stockAfter: currentStock || 0,
      reason: "Initial stock",
      performedBy: req.user._id,
      performedByName: req.user.name || req.user.username
    });

    // Log activity
    await logActivity(
      req,
      "LABEL_STOCK_CREATED",
      `Created label stock: ${labelName} (${labelType}) - Initial quantity: ${currentStock || 0}`
    );

    res.status(201).json({
      success: true,
      message: "Label stock created successfully",
      labelStock
    });
  } catch (error) {
    console.error("Create Label Stock Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create label stock",
      error: error.message
    });
  }
};

// ==================== UPDATE LABEL STOCK ====================
export const updateLabelStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const labelStock = await LabelStock.findById(id);

    if (!labelStock) {
      return res.status(404).json({
        success: false,
        message: "Label stock not found"
      });
    }

    // Don't allow direct currentStock update through this endpoint
    delete updateData.currentStock;

    const updatedLabelStock = await LabelStock.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("createdBy", "name email username");

    // Log activity
    await logActivity(
      req,
      "LABEL_STOCK_UPDATED",
      `Updated label stock: ${updatedLabelStock.labelName}`
    );

    res.status(200).json({
      success: true,
      message: "Label stock updated successfully",
      labelStock: updatedLabelStock
    });
  } catch (error) {
    console.error("Update Label Stock Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update label stock",
      error: error.message
    });
  }
};

// ==================== DELETE LABEL STOCK ====================
export const deleteLabelStock = async (req, res) => {
  try {
    const { id } = req.params;

    const labelStock = await LabelStock.findById(id);

    if (!labelStock) {
      return res.status(404).json({
        success: false,
        message: "Label stock not found"
      });
    }

    const labelName = labelStock.labelName;

    // Delete associated logs
    await LabelStockLog.deleteMany({ labelStock: id });

    // Delete label stock
    await LabelStock.findByIdAndDelete(id);

    // Log activity
    await logActivity(
      req,
      "LABEL_STOCK_DELETED",
      `Deleted label stock: ${labelName}`
    );

    res.status(200).json({
      success: true,
      message: "Label stock deleted successfully"
    });
  } catch (error) {
    console.error("Delete Label Stock Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete label stock",
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

    const labelStock = await LabelStock.findById(id);

    if (!labelStock) {
      return res.status(404).json({
        success: false,
        message: "Label stock not found"
      });
    }

    const stockBefore = labelStock.currentStock;
    
    // Add stock
    await labelStock.addStock(quantity, req.user._id, reason);
    
    const stockAfter = labelStock.currentStock;

    // Create log entry
    await LabelStockLog.create({
      labelStock: id,
      actionType: "ADD",
      quantity,
      stockBefore,
      stockAfter,
      reason: reason || "Stock added",
      performedBy: req.user._id,
      performedByName: req.user.name || req.user.username
    });

    // Log activity
    await logActivity(
      req,
      "LABEL_STOCK_ADDED",
      `Added ${quantity} units to ${labelStock.labelName}. Stock: ${stockBefore} → ${stockAfter}`
    );

    res.status(200).json({
      success: true,
      message: "Stock added successfully",
      labelStock
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

// ==================== USE/REDUCE STOCK ====================
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

    const labelStock = await LabelStock.findById(id);

    if (!labelStock) {
      return res.status(404).json({
        success: false,
        message: "Label stock not found"
      });
    }

    if (labelStock.currentStock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${labelStock.currentStock}, Requested: ${quantity}`
      });
    }

    const stockBefore = labelStock.currentStock;
    
    // Reduce stock
    await labelStock.reduceStock(quantity, req.user._id, reason);
    
    const stockAfter = labelStock.currentStock;

    // Create log entry
    await LabelStockLog.create({
      labelStock: id,
      actionType: "USE",
      quantity,
      stockBefore,
      stockAfter,
      reason: reason || "Stock used",
      performedBy: req.user._id,
      performedByName: req.user.name || req.user.username
    });

    // Log activity
    await logActivity(
      req,
      "LABEL_STOCK_USED",
      `Used ${quantity} units of ${labelStock.labelName}. Stock: ${stockBefore} → ${stockAfter}`
    );

    res.status(200).json({
      success: true,
      message: "Stock reduced successfully",
      labelStock
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

// ==================== ADJUST STOCK (Manual correction) ====================
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

    const labelStock = await LabelStock.findById(id);

    if (!labelStock) {
      return res.status(404).json({
        success: false,
        message: "Label stock not found"
      });
    }

    const stockBefore = labelStock.currentStock;
    const difference = newQuantity - stockBefore;
    
    // Update stock
    labelStock.currentStock = newQuantity;
    await labelStock.save();

    // Create log entry
    await LabelStockLog.create({
      labelStock: id,
      actionType: "ADJUST",
      quantity: Math.abs(difference),
      stockBefore,
      stockAfter: newQuantity,
      reason: reason || "Manual adjustment",
      performedBy: req.user._id,
      performedByName: req.user.name || req.user.username
    });

    // Log activity
    await logActivity(
      req,
      "LABEL_STOCK_ADJUSTED",
      `Adjusted stock for ${labelStock.labelName}. Stock: ${stockBefore} → ${newQuantity} (${difference >= 0 ? '+' : ''}${difference})`
    );

    res.status(200).json({
      success: true,
      message: "Stock adjusted successfully",
      labelStock
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

// ==================== GET STOCK LOGS ====================
export const getStockLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 50, actionType } = req.query;

    let filter = { labelStock: id };
    
    if (actionType) {
      filter.actionType = actionType;
    }

    const logs = await LabelStockLog.find(filter)
      .populate("performedBy", "name username email")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: logs.length,
      logs
    });
  } catch (error) {
    console.error("Get Stock Logs Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock logs",
      error: error.message
    });
  }
};

// ==================== GET ALL LOGS (Admin) ====================
export const getAllStockLogs = async (req, res) => {
  try {
    const { actionType, startDate, endDate, limit = 100 } = req.query;

    let filter = {};
    
    if (actionType) {
      filter.actionType = actionType;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const logs = await LabelStockLog.find(filter)
      .populate("labelStock", "labelName labelType")
      .populate("performedBy", "name username email")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: logs.length,
      logs
    });
  } catch (error) {
    console.error("Get All Stock Logs Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch logs",
      error: error.message
    });
  }
};

// ==================== GET STATISTICS ====================
export const getStockStatistics = async (req, res) => {
  try {
    const totalLabels = await LabelStock.countDocuments();
    const activeLabelss = await LabelStock.countDocuments({ isActive: true });
    const lowStockLabels = await LabelStock.countDocuments({ isLowStock: true });

    // Total stock across all labels
    const stockStats = await LabelStock.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$currentStock" }
        }
      }
    ]);

    // Stock by type
    const stockByType = await LabelStock.aggregate([
      {
        $group: {
          _id: "$labelType",
          count: { $sum: 1 },
          totalStock: { $sum: "$currentStock" },
          lowStockCount: {
            $sum: { $cond: ["$isLowStock", 1, 0] }
          }
        }
      }
    ]);

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = await LabelStockLog.aggregate([
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

    // Low stock items
    const lowStockItems = await LabelStock.find({ isLowStock: true })
      .select("labelName labelType currentStock minimumStock")
      .limit(10);

    // Most used labels (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const mostUsed = await LabelStockLog.aggregate([
      {
        $match: {
          actionType: "USE",
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: "$labelStock",
          totalUsed: { $sum: "$quantity" },
          usageCount: { $sum: 1 }
        }
      },
      {
        $sort: { totalUsed: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "labelstocks",
          localField: "_id",
          foreignField: "_id",
          as: "labelDetails"
        }
      },
      {
        $unwind: "$labelDetails"
      },
      {
        $project: {
          labelName: "$labelDetails.labelName",
          labelType: "$labelDetails.labelType",
          totalUsed: 1,
          usageCount: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total: totalLabels,
        active: activeLabelss,
        lowStock: lowStockLabels,
        totalStockQuantity: stockStats[0]?.totalStock || 0,
        byType: stockByType,
        recentActivity,
        lowStockItems,
        mostUsed
      }
    });
  } catch (error) {
    console.error("Get Statistics Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message
    });
  }
};

// ==================== TOGGLE ACTIVE STATUS ====================
export const toggleActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const labelStock = await LabelStock.findById(id);

    if (!labelStock) {
      return res.status(404).json({
        success: false,
        message: "Label stock not found"
      });
    }

    labelStock.isActive = !labelStock.isActive;
    await labelStock.save();

    // Log activity
    await logActivity(
      req,
      "LABEL_STOCK_STATUS_CHANGED",
      `${labelStock.isActive ? 'Activated' : 'Deactivated'} label stock: ${labelStock.labelName}`
    );

    res.status(200).json({
      success: true,
      message: `Label stock ${labelStock.isActive ? 'activated' : 'deactivated'} successfully`,
      labelStock
    });
  } catch (error) {
    console.error("Toggle Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle status",
      error: error.message
    });
  }
};