import express from "express";
import { getLogs, getProductLogs, getUserLogs } from "../controllers/logController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Teri existing middleware
import isAuth from "../middlewares/auth.js";

const router = express.Router();

// Sirf Admin dekh sakta hai
router.get("/", protect, getLogs);
router.get("/user/:userId", isAuth, getUserLogs);
router.get("/product/:productId", isAuth, getProductLogs);

export default router;