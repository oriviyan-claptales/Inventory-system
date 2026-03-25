import mongoose from "mongoose";

const LabelStockSchema = new mongoose.Schema(
  {
    // Label Details
    labelName: {
      type: String,
      required: true,
      trim: true
    },

    labelType: {
      type: String,
      enum: [
        "Product Label",      // Product details wala
        "Barcode Sticker",    // Barcode wala
        "Shipping Label",     // Shipping info wala
        "Thank You Card",     // Thank you message wala
        "Custom"              // User defined
      ],
      required: true
    },

    // Custom type name (agar labelType = "Custom" ho)
    customTypeName: {
      type: String,
      default: ""
    },

    // Inventory Tracking
    currentStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },

    minimumStock: {
      type: Number,
      required: true,
      default: 100,
      min: 0
    },

    // Stock Status
    isLowStock: {
      type: Boolean,
      default: false
    },

    // Alert Settings
    lowStockAlertSent: {
      type: Boolean,
      default: false
    },

    // Additional Info
    description: {
      type: String,
      default: ""
    },

    size: {
      type: String,
      default: ""  // e.g., "10cm x 5cm", "A4", "Small"
    },

    // Created By
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Active Status
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { 
    timestamps: true 
  }
);

// Index for faster queries
LabelStockSchema.index({ labelType: 1, isActive: 1 });
LabelStockSchema.index({ isLowStock: 1 });

// Pre-save hook to check low stock
LabelStockSchema.pre("save", function(next) {
  if (this.currentStock <= this.minimumStock) {
    this.isLowStock = true;
  } else {
    this.isLowStock = false;
    this.lowStockAlertSent = false; // Reset alert when stock is sufficient
  }
  next();
});

// Method to add stock
LabelStockSchema.methods.addStock = function(quantity, userId, reason = "") {
  this.currentStock += quantity;
  return this.save();
};

// Method to reduce stock
LabelStockSchema.methods.reduceStock = function(quantity, userId, reason = "") {
  if (this.currentStock < quantity) {
    throw new Error("Insufficient stock");
  }
  this.currentStock -= quantity;
  return this.save();
};

export default mongoose.model("LabelStock", LabelStockSchema);