import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Kisne kiya
  actorName: { type: String }, // User ka naam (taaki agar user delete ho jaye to bhi naam dikhe)
  action: { type: String, required: true }, // LOGIN, LOGOUT, CREATE_PRODUCT, etc.
  details: { type: String }, // "Added product: Hot Wheels" or "Deleted User: Ravi"
  ip: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Log", logSchema);