import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },


    // 👇 Naya field: Last 3 passwords store karne ke liye
    previousPasswords: [{ type: String }],

    userType: {
      type: String,
      enum: ["admin", "superuser", "user"],
      default: "user"
    },
    // 👇 Ye 2 fields add kar
    failedLoginAttempts: { type: Number, default: 0 },
    isFrozen: { type: Boolean, default: false }, // True matlab account locked

    resetCode: String,
    resetCodeExpire: Date,
    // models/User.js mein ye do fields add kar:
    loginCode: String,
    loginCodeExpire: Date,
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
