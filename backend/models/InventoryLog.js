import mongoose from "mongoose";

const InventoryLogSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true },

    productName: String,

    type: {
      type: String,
      enum: ["SALE", "RESTOCK", "ADJUSTMENT"],
      required: true
    },

    quantityChange: {
      type: Number, // -5 ya +3
      required: true
    },

    previousStock: Number,
    newStock: Number,

    referenceId: String, // sale id ya manual id

    performedBy: String
  },
  { timestamps: true }
);

export default mongoose.model("InventoryLog", InventoryLogSchema);
