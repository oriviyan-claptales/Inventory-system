// import mongoose from "mongoose";

// const SaleSchema = new mongoose.Schema(
//   {
//     sku: {
//       type: String,
//       required: true,
//       index: true
//     },

//     productName: {
//       type: String,
//       required: true
//     },

//     category: String,

//     quantity: {
//       type: Number,
//       required: true
//     },

//     sellingPrice: {
//       type: Number,
//       required: true
//     },

//     totalAmount: {
//       type: Number,
//       required: true
//     },

//     costPrice: {
//       type: Number,
//       required: true
//     },

//     profit: {
//       type: Number,
//       required: true
//     },

//     shop: String // agar multi-shop future me kare
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Sale", SaleSchema);






// import mongoose from "mongoose";

// const SaleSchema = new mongoose.Schema(
//   {
//     sku: { type: String, required: true, index: true },
//     productName: String,
//     category: String,

//     quantity: { type: Number, required: true },

//     sellingPrice: { type: Number, required: true },
//     totalAmount: { type: Number, required: true },

//     costPrice: { type: Number, required: true },
//     profit: { type: Number, required: true },

//     shop: String
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Sale", SaleSchema);



















// // webhook with ngrok
// import mongoose from "mongoose";

// const SaleSchema = new mongoose.Schema(
//   {
//     shopifyOrderId: { type: String }, // 👉 Ye naya field add kar duplicate rokne ke liye
//     sku: { type: String, required: true, index: true },
//     productName: String,
//     category: String,

//     quantity: { type: Number, required: true },

//     sellingPrice: { type: Number, required: true },
//     totalAmount: { type: Number, required: true },

//     costPrice: { type: Number, required: true },
//     profit: { type: Number, required: true },
// webhookController.js
//     shop: String
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Sale", SaleSchema);













// import mongoose from "mongoose";

// // Address ka ek chota sub-schema bana diya taki code clean rahe
// const AddressSchema = new mongoose.Schema({
//   first_name: String,
//   last_name: String,
//   address1: String,
//   address2: String,
//   city: String,
//   province: String, // Ye State hai (e.g., Haryana, Delhi)
//   zip: String,      // Pincode
//   country: String
// }, { _id: false });

// const SaleSchema = new mongoose.Schema(
//   {
//     shopifyOrderId: { type: String }, 
//     orderNumber: { type: String },    // Jaise #1001, #1002
//     companyName: { type: String, default: "Claptales" }, // Hamesha Claptales rahega
//     paymentMethod: { type: String },  // paid, pending, cod
    
//     // Customer Details
//     customerName: { type: String },
//     billingAddress: AddressSchema,
//     shippingAddress: AddressSchema,

//     // Item Details
//     sku: { type: String, required: true, index: true },
//     productName: String,
//     category: String,
//     quantity: { type: Number, required: true },
//     unit: { type: String, default: "pcs" },

//     // Pricing
//     sellingPrice: { type: Number, required: true },
//     totalAmount: { type: Number, required: true },
//     costPrice: { type: Number, required: true },
//     profit: { type: Number, required: true },

//     // 🔴 Tax Breakdown 🔴
//     gstPercentage: { type: Number, default: 0 },
//     igst: { type: Number, default: 0 },
//     cgst: { type: Number, default: 0 },
//     sgst: { type: Number, default: 0 },
//     mrp: { type: Number }, // 👉 Naya field MRP ke liye
//     discountPercentage: { type: Number, default: 0 }, // 👉 Naya field Discount % ke liye
//     sellingPrice: { type: Number, required: true },

//     shop: String
//   },
  
  
//   { timestamps: true }
// );

// export default mongoose.model("Sale", SaleSchema);


























import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  address1: String,
  address2: String,
  city: String,
  province: String, // Ye State hai (e.g., Haryana, Delhi)
  zip: String,      // Pincode
  country: String
}, { _id: false });

const SaleSchema = new mongoose.Schema(
  {
    shopifyOrderId: { type: String }, 
    orderNumber: { type: String },    
    companyName: { type: String, default: "Claptales" }, 
    paymentMethod: { type: String },  
    
    // Customer Details
    customerName: { type: String },
    billingAddress: AddressSchema,
    shippingAddress: AddressSchema,

    // Item Details
    sku: { type: String, required: true, index: true },
    productName: String,
    category: String,
    quantity: { type: Number, required: true },
    unit: { type: String, default: "pcs" },

    // Pricing
    mrp: { type: Number }, // 👉 MRP
    sellingPrice: { type: Number, required: true }, // Ek hi baar aayega ab
    discountPercentage: { type: Number, default: 0 }, // 👉 Discount %
    totalAmount: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    profit: { type: Number, required: true },

    // 🔴 Tax Breakdown 🔴
    gstPercentage: { type: Number, default: 0 },
    igst: { type: Number, default: 0 },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    itemImage: { type: String, default: "" },
    shop: String
  },
  { timestamps: true }
);

export default mongoose.model("Sale", SaleSchema);