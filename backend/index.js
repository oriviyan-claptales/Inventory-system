// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import connectDB from "./config/db.js";
// // import productRoutes from "./routes/productRoutes.js";
// // import userRoutes from "./routes/user.routes.js";
// // import authRoutes from "./routes/auth.js";   // ✅ ADD
// // import passwordRoutes from "./routes/password.routes.js";
// // import cookieParser from "cookie-parser"; // 👈 Add this import
// // import logRoutes from "./routes/logRoutes.js";
// // import cron from "node-cron";



// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 7000;

// // const MONGO_URL =
// //   process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lostfound";


// // app.use(
// //   cors({
// //     origin: "http://localhost:5173", // frontend exact URL
// //     credentials: true,               // cookies allow
// //   })
// // );

// // app.use(cookieParser()); // 👈 app.use(express.json()) ke upar ya niche add karein
// // app.use(express.json());

// // // Routes
// // app.use("/api/auth", authRoutes);       // ✅ LOGIN
// // app.use("/api/products", productRoutes);
// // // app.use("/api/users", userRoutes);
// // app.use("/api/users", userRoutes);
// // app.use("/api/password", passwordRoutes);
// // app.use("/api/logs", logRoutes);

// // app.get("/", (req, res) => res.send("Server running successfully"));

// // // HEALTH CHECK ROUTE
// // app.get("/health", (req, res) => {
// //   res.status(200).send("OK");
// // });


// // app.listen(PORT, () => {
// //   connectDB();
// //   console.log(`🚀 Server started on port ${PORT}`);
// // });
















// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import connectDB from "./config/db.js";
// // import productRoutes from "./routes/productRoutes.js";
// // import userRoutes from "./routes/user.routes.js";
// // import authRoutes from "./routes/auth.js";
// // import passwordRoutes from "./routes/password.routes.js";
// // import cookieParser from "cookie-parser";
// // import logRoutes from "./routes/logRoutes.js";
// // import templateRoutes from "./routes/templateRoutes.js";  // ✅ NEW: Template routes
// // import cron from "node-cron";



// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 7000;

// // const MONGO_URL =
// //   process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lostfound";


// // app.use(
// //   cors({
// //     origin: "http://localhost:5173", // frontend exact URL
// //     credentials: true,               // cookies allow
// //   })
// // );

// // app.use(cookieParser());
// // app.use(express.json());

// // // Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/products", productRoutes);
// // app.use("/api/users", userRoutes);
// // app.use("/api/password", passwordRoutes);
// // app.use("/api/logs", logRoutes);
// // app.use("/api/templates", templateRoutes);  // ✅ NEW: Template Management

// // app.get("/", (req, res) => res.send("Server running successfully"));

// // // HEALTH CHECK ROUTE
// // app.get("/health", (req, res) => {
// //   res.status(200).send("OK");
// // });


// // app.listen(PORT, () => {
// //   connectDB();
// //   console.log(`🚀 Server started on port ${PORT}`);
// // });






// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/user.routes.js";
// import authRoutes from "./routes/auth.js";
// import passwordRoutes from "./routes/password.routes.js";
// import cookieParser from "cookie-parser";
// import logRoutes from "./routes/logRoutes.js";
// import labelStockRoutes from "./routes/labelStockRoutes.js";  // ✅ NEW: Label Stock routes
// import cron from "node-cron";



// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 7000;

// const MONGO_URL =
//   process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lostfound";


// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend exact URL
//     credentials: true,               // cookies allow
//   })
// );

// app.use(cookieParser());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/password", passwordRoutes);
// app.use("/api/logs", logRoutes);
// app.use("/api/label-stocks", labelStockRoutes);  // ✅ NEW: Label Stock Management

// app.get("/", (req, res) => res.send("Server running successfully"));

// // HEALTH CHECK ROUTE
// app.get("/health", (req, res) => {
//   res.status(200).send("OK");
// });


// app.listen(PORT, () => {
//   connectDB();
//   console.log(`🚀 Server started on port ${PORT}`);
// });


























import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.js";
import passwordRoutes from "./routes/password.routes.js";
import cookieParser from "cookie-parser";
import logRoutes from "./routes/logRoutes.js";
import packZoneRoutes from "./routes/packZoneRoutes.js";  // ✅ NEW: PackZone routes
import cron from "node-cron";
import shopifyRoutes from "./routes/shopifyRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
// 1. Apne route ko import kar (top par)
import webhookRoutes from './routes/webhookRoutes.js'; 








dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

const MONGO_URL =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lostfound";


app.use(
  cors({
    origin: "http://localhost:5173", // frontend exact URL
    credentials: true,               // cookies allow
  })
);

app.use(cookieParser());
app.use(express.json());

// 2. Express ko JSON samajhne ke liye ye line zaroori hai (agar pehle se nahi hai toh)
// app.use(express.json()); 


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/packzone", packZoneRoutes);  // ✅ NEW: PackZone Management

app.get("/", (req, res) => res.send("Server running successfully"));




// Shopify OAuth
app.use("/api/shopify", shopifyRoutes);


app.use("/api/analytics", analyticsRoutes);

app.use("/api/sales", salesRoutes);
// ... tera baaki code ...

// 3. Apne route ko app me add kar de
app.use('/', webhookRoutes);

// HEALTH CHECK ROUTE
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});


app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server started on port ${PORT}`);
});