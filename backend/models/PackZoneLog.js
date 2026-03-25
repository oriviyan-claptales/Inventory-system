import mongoose from "mongoose";

const PackZoneLogSchema = new mongoose.Schema(
  {
    packZone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PackZone",
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

    qtyBefore: {
      type: Number,
      required: true
    },

    qtyAfter: {
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

// Indexes for faster queries
PackZoneLogSchema.index({ packZone: 1, createdAt: -1 });
PackZoneLogSchema.index({ actionType: 1 });
PackZoneLogSchema.index({ performedBy: 1 });

export default mongoose.model("PackZoneLog", PackZoneLogSchema);