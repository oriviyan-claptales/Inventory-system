// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },

//   category: {
//     type: String,
//     enum: ["Die-cast", "Remote Control", "Soft Toy", "Board Game", "Scooter"],
//     required: true
//   },

//   color: {
//     type: String,
//     // enum: ["Black", "White", "Red","Pink", "Blue", "Green", "Yellow", "Orange", "Brown", "Grey"],
//     required: true
//   },

//   // 👉 universal size field (text me store hoga: "15 cm", "10 inch", "1:32", "S", "L", etc.)
//   size: { type: String, required: true },

//   img: { type: String },
//   price: { type: Number, required: true },
//   costing_price: {
//     type: Number,
//     required: true
//   },
//   gst: { type: Number, required: true },

//   sku: { type: String, unique: true, index: true },
//   barcodeImg: { type: String }, //

//   Supplier_name: { type: String, required: true },
//   Qty: { type: Number, default: 0 },

// }, { timestamps: true });

// export default mongoose.model("Product", ProductSchema);











import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },

  category: {
    type: String,
    enum: ["Die-cast", "Remote Control", "Soft Toy", "Board Game", "Scooter","Gun"],
    required: true
  },

  color: {
    type: String,
    // enum: ["Black", "White", "Red","Pink", "Blue", "Green", "Yellow", "Orange", "Brown", "Grey"],
    required: true
  },

  // 👉 universal size field (text me store hoga: "15 cm", "10 inch", "1:32", "S", "L", etc.)
  size: { type: String, required: true },

  img: { type: String },
  price: { type: Number, required: true },
  costing_price: {
    type: Number,
    required: true
  },
  gst: { type: Number, required: true },

  sku: { type: String, unique: true, index: true },
  barcodeImg: { type: String }, //

  Supplier_name: { type: String, required: true },
  Qty: { type: Number, default: 0 },
  shop: String,

}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
