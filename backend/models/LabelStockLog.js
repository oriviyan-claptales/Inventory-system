import mongoose from "mongoose";

const LabelStockLogSchema = new mongoose.Schema(
  {
    labelStock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabelStock",
      required: true
    },

    actionType: {
      type: String,
      enum: ["ADD", "USE", "ADJUST"],
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    stockBefore: {
      type: Number,
      required: true
    },

    stockAfter: {
      type: Number,
      required: true
    },

    reason: {
      type: String,
      default: ""
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    performedByName: {
      type: String
    }
  },
  { 
    timestamps: true 
  }
);

// Index for faster queries
LabelStockLogSchema.index({ labelStock: 1, createdAt: -1 });
LabelStockLogSchema.index({ actionType: 1 });
LabelStockLogSchema.index({ performedBy: 1 });

export default mongoose.model("LabelStockLog", LabelStockLogSchema);