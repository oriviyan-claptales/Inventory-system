// // // import mongoose from "mongoose";

// // // const PackZoneSchema = new mongoose.Schema(
// // //   {
// // //     // Item Details
// // //     itemName: {
// // //       type: String,
// // //       required: true,
// // //       trim: true
// // //     },

// // //     size: {
// // //       type: String,
// // //       required: true,
// // //       trim: true
// // //       // Format: "L*W*H" or "2inch x 50m" etc.
// // //     },

// // //     // Category & Sub-Category
// // //     category: {
// // //       type: String,
// // //       enum: ["Label", "Wrapping"],
// // //       required: true
// // //     },

// // //     subCategory: {
// // //       type: String,
// // //       enum: [
// // //         // Label sub-categories
// // //         "Thank You Card",
// // //         "Brand Tag",
// // //         "Product Label",
// // //         // Wrapping sub-categories
// // //         "Packaging Tape",
// // //         "Poly Bags",
// // //         "Box"
// // //       ],
// // //       required: true
// // //     },

// // //     // Inventory Tracking
// // //     qty: {
// // //       type: Number,
// // //       required: true,
// // //       default: 0,
// // //       min: 0
// // //     },

// // //     unit: {
// // //       type: String,
// // //       enum: ["Roll", "Piece", "Pack", "Box", "Sheet", "Meter"],
// // //       required: true
// // //     },

// // //     minimumStock: {
// // //       type: Number,
// // //       required: true,
// // //       default: 50,
// // //       min: 0
// // //     },

// // //     // Stock Status
// // //     isLowStock: {
// // //       type: Boolean,
// // //       default: false
// // //     },

// // //     lowStockAlertSent: {
// // //       type: Boolean,
// // //       default: false
// // //     },

// // //     // Status
// // //     status: {
// // //       type: String,
// // //       enum: ["Active", "Inactive"],
// // //       default: "Active"
// // //     },

// // //     // Additional Info
// // //     description: {
// // //       type: String,
// // //       default: ""
// // //     },

// // //     // Created By
// // //     createdBy: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //       required: true
// // //     }
// // //   },
// // //   { 
// // //     timestamps: true  // Auto creates createdAt and updatedAt
// // //   }
// // // );

// // // // Indexes for faster queries
// // // PackZoneSchema.index({ itemName: 1 });
// // // PackZoneSchema.index({ category: 1, subCategory: 1 });
// // // PackZoneSchema.index({ status: 1 });
// // // PackZoneSchema.index({ isLowStock: 1 });

// // // // Pre-save hook to check low stock
// // // PackZoneSchema.pre("save", function(next) {
// // //   if (this.qty <= this.minimumStock) {
// // //     this.isLowStock = true;
// // //   } else {
// // //     this.isLowStock = false;
// // //     this.lowStockAlertSent = false;
// // //   }
// // //   next();
// // // });

// // // // Method to add stock
// // // PackZoneSchema.methods.addStock = function(quantity) {
// // //   this.qty += quantity;
// // //   return this.save();
// // // };

// // // // Method to reduce stock
// // // PackZoneSchema.methods.reduceStock = function(quantity) {
// // //   if (this.qty < quantity) {
// // //     throw new Error("Insufficient stock");
// // //   }
// // //   this.qty -= quantity;
// // //   return this.save();
// // // };

// // // // Method to adjust stock
// // // PackZoneSchema.methods.adjustStock = function(newQuantity) {
// // //   this.qty = newQuantity;
// // //   return this.save();
// // // };

// // // export default mongoose.model("PackZone", PackZoneSchema);












// // import mongoose from "mongoose";

// // const PackZoneSchema = new mongoose.Schema(
// //   {
// //     // Item Details
// //     itemName: {
// //       type: String,
// //       required: [true, "Item name is required"],
// //       trim: true,
// //       index: true
// //     },

// //     // Dimensions (User Friendly Split)
// //     length: {
// //       type: Number,
// //       required: [true, "Length is required"],
// //       min: [0, "Length cannot be negative"]
// //     },
// //     width: {
// //       type: Number,
// //       required: [true, "Width is required"],
// //       min: [0, "Width cannot be negative"]
// //     },
// //     height: {
// //       type: Number,
// //       required: [true, "Height is required"],
// //       min: [0, "Height cannot be negative"]
// //     },
// //     dimensionUnit: {
// //       type: String,
// //       enum: ["cm", "inch"],
// //       required: [true, "Dimension unit (cm/inch) is required"]
// //     },

// //     // Category (Updated)
// //     category: {
// //       type: String,
// //       enum: ["Label", "Wrapping", "Box"], // Added Box
// //       required: [true, "Category is required"],
// //       index: true
// //     },

// //     // Note: Sub-Category and Status removed as requested

// //     // Inventory Tracking
// //     qty: {
// //       type: Number,
// //       required: true,
// //       default: 0,
// //       min: [0, "Quantity cannot be negative"]
// //     },

// //     // Inventory Unit (Roll, Piece, etc.)
// //     unit: {
// //       type: String,
// //       enum: ["Roll", "Piece", "Pack", "Box", "Sheet", "Meter"],
// //       required: [true, "Inventory unit is required"]
// //     },

// //     minimumStock: {
// //       type: Number,
// //       required: true,
// //       default: 50,
// //       min: [0, "Minimum stock cannot be negative"]
// //     },

// //     // Computed Status
// //     isLowStock: {
// //       type: Boolean,
// //       default: false
// //     },

// //     description: {
// //       type: String,
// //       default: "",
// //       trim: true
// //     },

// //     createdBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true
// //     }
// //   },
// //   { 
// //     timestamps: true 
// //   }
// // );

// // // Pre-save hook to calculate low stock automatically
// // PackZoneSchema.pre("save", function(next) {
// //   this.isLowStock = this.qty <= this.minimumStock;
// //   next();
// // });

// // // Methods for stock management
// // PackZoneSchema.methods.addStock = function(quantity) {
// //   this.qty += quantity;
// //   return this.save();
// // };

// // PackZoneSchema.methods.reduceStock = function(quantity) {
// //   if (this.qty < quantity) {
// //     throw new Error(`Insufficient stock. Available: ${this.qty}`);
// //   }
// //   this.qty -= quantity;
// //   return this.save();
// // };

// // PackZoneSchema.methods.adjustStock = function(newQuantity) {
// //   this.qty = newQuantity;
// //   return this.save();
// // };

// // export default mongoose.model("PackZone", PackZoneSchema);





















// import mongoose from "mongoose";

// const PackZoneSchema = new mongoose.Schema(
//   {
//     itemName: {
//       type: String,
//       required: [true, "Item name is required"],
//       trim: true
//     },

//     // Dimensions - Now Optional (Default 0)
//     length: {
//       type: Number,
//       default: 0
//     },
//     width: {
//       type: Number,
//       default: 0
//     },
//     height: {
//       type: Number,
//       default: 0
//     },
//     dimensionUnit: {
//       type: String,
//       enum: ["cm", "inch", "mm"],
//       default: "inch"
//     },

//     category: {
//       type: String,
//       enum: ["Label", "Wrapping", "Box"],
//       required: [true, "Category is required"]
//     },

//     qty: {
//       type: Number,
//       required: true,
//       default: 0
//     },

//     unit: {
//       type: String,
//       enum: ["Roll", "Piece", "Pack", "Box", "Sheet", "Meter", "Bundle"],
//       required: true
//     },

//     minimumStock: {
//       type: Number,
//       default: 10
//     },

//     isLowStock: {
//       type: Boolean,
//       default: false
//     },

//     description: {
//       type: String,
//       default: ""
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// // Pre-save hook for Low Stock
// PackZoneSchema.pre("save", function(next) {
//   this.isLowStock = this.qty <= this.minimumStock;
//   next();
// });

// // Methods
// PackZoneSchema.methods.addStock = function(quantity) {
//   this.qty += quantity;
//   return this.save();
// };

// PackZoneSchema.methods.reduceStock = function(quantity) {
//   if (this.qty < quantity) throw new Error("Insufficient stock");
//   this.qty -= quantity;
//   return this.save();
// };

// PackZoneSchema.methods.adjustStock = function(newQuantity) {
//   this.qty = newQuantity;
//   return this.save();
// };

// export default mongoose.model("PackZone", PackZoneSchema);













// import mongoose from "mongoose";

// const PackZoneSchema = new mongoose.Schema(
//   {
//     itemName: {
//       type: String,
//       required: [true, "Item name is required"],
//       trim: true
//     },

//     // Dimensions (For Box & Label) - Optional now
//     length: { type: Number, default: 0 },
//     width: { type: Number, default: 0 },
//     height: { type: Number, default: 0 },
//     dimensionUnit: { 
//       type: String, 
//       enum: ["cm", "inch", "mm"], 
//       default: "inch" 
//     },

//     // New Field for Wrapping Size
//     wrappingSize: {
//       type: String,
//       enum: ["Small", "Medium", "Large"], // S, M, L
//       default: null
//     },

//     category: {
//       type: String,
//       enum: ["Label", "Wrapping", "Box"],
//       required: true
//     },

//     qty: { type: Number, required: true, default: 0 },
    
//     unit: {
//       type: String,
//       enum: ["Roll", "Piece", "Pack", "Box", "Sheet", "Meter", "Bundle"],
//       required: true
//     },

//     minimumStock: { type: Number, default: 10 },
//     isLowStock: { type: Boolean, default: false },
//     description: { type: String, default: "" },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// // Pre-save hook
// PackZoneSchema.pre("save", function(next) {
//   this.isLowStock = this.qty <= this.minimumStock;
//   next();
// });

// // Methods
// PackZoneSchema.methods.addStock = function(quantity) {
//   this.qty += quantity;
//   return this.save();
// };
// PackZoneSchema.methods.reduceStock = function(quantity) {
//   if (this.qty < quantity) throw new Error("Insufficient stock");
//   this.qty -= quantity;
//   return this.save();
// };
// PackZoneSchema.methods.adjustStock = function(newQuantity) {
//   this.qty = newQuantity;
//   return this.save();
// };

// export default mongoose.model("PackZone", PackZoneSchema);












import mongoose from "mongoose";

const PackZoneSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item name is required"],
      trim: true
    },
    // Excel ke hisab se single size field
    size: { 
      type: String, 
      required: true,
      trim: true 
    },
    itemImage: { type: String, default: "" },
    // Unique identifier (Name + Size)
    item_sku: {
      type: String,
      unique: true,
      trim: true
    },
    category: {
      type: String,
      enum: ["Marketing Collateral", "Branding Stickers", "Packaging Boxes"],
      required: true
    },
    qty: { type: Number, required: true, default: 0 },
    // Costing field add kiya hai excel data store karne ke liye
    costing: { type: Number, default: 0 },
    unit: {
      type: String,
      enum: ["Roll", "Piece", "Pack", "Box", "Sheet", "Meter", "Bundle"],
      default: "Piece"
    },
    minimumStock: { type: Number, default: 10 },
    isLowStock: { type: Boolean, default: false },
    description: { type: String, default: "" },
    vendor: { type: String, trim: true }, // Excel ke 'Vendor' column ke liye

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

// Pre-save hook for SKU and Low Stock check
PackZoneSchema.pre("save", function(next) {
  // Generate SKU: "Window Box - 18*9*9"
  if (this.isModified('itemName') || this.isModified('size')) {
    this.item_sku = `${this.itemName}-${this.size}`.replace(/\s+/g, '-').toLowerCase();
  }
  
  this.isLowStock = this.qty <= this.minimumStock;
  next();
});

// Methods (Existing logic)
PackZoneSchema.methods.addStock = function(quantity) {
  this.qty += quantity;
  return this.save();
};
PackZoneSchema.methods.reduceStock = function(quantity) {
  if (this.qty < quantity) throw new Error("Insufficient stock");
  this.qty -= quantity;
  return this.save();
};

export default mongoose.model("PackZone", PackZoneSchema);