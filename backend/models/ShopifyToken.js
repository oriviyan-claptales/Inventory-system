import mongoose from "mongoose";

const shopifyTokenSchema = new mongoose.Schema(
  {
    shop: {
      type: String,
      required: true,
      unique: true, // har shop ka ek hi token hoga
    },
    accessToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ShopifyToken = mongoose.model("ShopifyToken", shopifyTokenSchema);

export default ShopifyToken;
