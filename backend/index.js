import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.js";   // ✅ ADD
import passwordRoutes from "./routes/password.routes.js";
import cookieParser from "cookie-parser"; // 👈 Add this import
import logRoutes from "./routes/logRoutes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

const MONGO_URL =
  process.env.MONGO_URI;

app.use(cors({
  // origin: "https://inventory-system-f.onrender.com",
  origin: "https://inventory.oriviyan.com",
  credentials: true
}));

// app.use(
//   cors({
//     origin: "https://inventory-system-f.onrender.com", // frontend exact URL
//     credentials: true,               // cookies allow
//   })
// );

app.use(cookieParser()); // 👈 app.use(express.json()) ke upar ya niche add karein
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);       // ✅ LOGIN
app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/logs", logRoutes);

app.get("/", (req, res) => res.send("Server running successfully"));

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server started on port ${PORT}`);
});
