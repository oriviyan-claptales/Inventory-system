import express from "express";
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  toggleTemplateStatus,
  useTemplate,
  getTemplateStats,
  duplicateTemplate
} from "../controllers/templateController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly, adminOrSuperuser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ==================== PUBLIC ROUTES (PROTECTED) ====================
// Get all templates (all logged-in users can view)
router.get("/", protect, getAllTemplates);

// Get single template by ID
router.get("/:id", protect, getTemplateById);

// Get template statistics
router.get("/stats/overview", protect, getTemplateStats);

// ==================== ADMIN & SUPERUSER ROUTES ====================
// Create new template
router.post("/", protect, adminOrSuperuser, createTemplate);

// Update template
router.put("/:id", protect, adminOrSuperuser, updateTemplate);

// Toggle template active/inactive status
router.patch("/:id/toggle", protect, adminOrSuperuser, toggleTemplateStatus);

// Use template (increment usage count)
router.post("/:id/use", protect, adminOrSuperuser, useTemplate);

// Duplicate template
router.post("/:id/duplicate", protect, adminOrSuperuser, duplicateTemplate);

// ==================== ADMIN ONLY ROUTES ====================
// Delete template
router.delete("/:id", protect, adminOnly, deleteTemplate);

export default router;