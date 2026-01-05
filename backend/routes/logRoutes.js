import express from "express";
import { getLogs } from "../controllers/logController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Teri existing middleware

const router = express.Router();

// Sirf Admin dekh sakta hai
router.get("/", protect, getLogs);

export default router;