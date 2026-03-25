import express from "express";
import {
  getAllLabelStocks,
  getLabelStockById,
  createLabelStock,
  updateLabelStock,
  deleteLabelStock,
  addStock,
  useStock,
  adjustStock,
  getStockLogs,
  getAllStockLogs,
  getStockStatistics,
  toggleActiveStatus
} from "../controllers/labelStockController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly, adminOrSuperuser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ==================== PUBLIC ROUTES (PROTECTED) ====================
// Get all label stocks (all logged-in users can view)
router.get("/", protect, getAllLabelStocks);

// Get single label stock
router.get("/:id", protect, getLabelStockById);

// Get statistics
router.get("/stats/overview", protect, getStockStatistics);

// Get logs for specific label stock
router.get("/:id/logs", protect, getStockLogs);

// ==================== ADMIN & SUPERUSER ROUTES ====================
// Create new label stock
router.post("/", protect, adminOrSuperuser, createLabelStock);

// Update label stock details
router.put("/:id", protect, adminOrSuperuser, updateLabelStock);

// Add stock
router.post("/:id/add", protect, adminOrSuperuser, addStock);

// Use/reduce stock
router.post("/:id/use", protect, adminOrSuperuser, useStock);

// Adjust stock (manual correction)
router.post("/:id/adjust", protect, adminOrSuperuser, adjustStock);

// Toggle active status
router.patch("/:id/toggle", protect, adminOrSuperuser, toggleActiveStatus);

// ==================== ADMIN ONLY ROUTES ====================
// Delete label stock
router.delete("/:id", protect, adminOnly, deleteLabelStock);

// Get all logs (across all labels)
router.get("/logs/all", protect, adminOnly, getAllStockLogs);

export default router;