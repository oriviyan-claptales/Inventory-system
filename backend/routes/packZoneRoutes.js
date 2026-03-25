// // import express from "express";
// // import {
// //   getAllPackZoneItems,
// //   getPackZoneItemById,
// //   createPackZoneItem,
// //   updatePackZoneItem,
// //   deletePackZoneItem,
// //   addStock,
// //   useStock,
// //   adjustStock,
// //   getItemLogs,
// //   getPackZoneStats,
// //   toggleStatus
// // } from "../controllers/packZoneController.js";
// // import { protect } from "../middlewares/authMiddleware.js";
// // import { adminOnly, adminOrSuperuser } from "../middlewares/authMiddleware.js";

// // const router = express.Router();

// // // ==================== PUBLIC ROUTES (PROTECTED) ====================
// // // Get all items
// // router.get("/", protect, getAllPackZoneItems);

// // // Get single item
// // router.get("/:id", protect, getPackZoneItemById);

// // // Get statistics
// // router.get("/stats/overview", protect, getPackZoneStats);

// // // Get logs for specific item
// // router.get("/:id/logs", protect, getItemLogs);

// // // ==================== ADMIN & SUPERUSER ROUTES ====================
// // // Create new item
// // router.post("/", protect, adminOrSuperuser, createPackZoneItem);

// // // Update item details
// // router.put("/:id", protect, adminOrSuperuser, updatePackZoneItem);

// // // Add stock
// // router.post("/:id/add", protect, adminOrSuperuser, addStock);

// // // Use/reduce stock
// // router.post("/:id/use", protect, adminOrSuperuser, useStock);

// // // Adjust stock
// // router.post("/:id/adjust", protect, adminOrSuperuser, adjustStock);

// // // Toggle status
// // router.patch("/:id/toggle", protect, adminOrSuperuser, toggleStatus);

// // // ==================== ADMIN ONLY ROUTES ====================
// // // Delete item
// // router.delete("/:id", protect, adminOnly, deletePackZoneItem);

// // export default router;














// import express from "express";
// import {
//   getAllPackZoneItems,
//   getPackZoneItemById,
//   createPackZoneItem,
//   updatePackZoneItem,
//   deletePackZoneItem,
//   addStock,
//   useStock,
//   adjustStock,
//   getItemLogs,
//   getPackZoneStats
// } from "../controllers/packZoneController.js";
// import { protect, adminOnly, adminOrSuperuser } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // ==================== PUBLIC ROUTES (PROTECTED) ====================

// // Get statistics (Move this above /:id to prevent conflict)
// router.get("/stats/overview", protect, getPackZoneStats);

// // Get all items
// router.get("/", protect, getAllPackZoneItems);

// // Get single item
// router.get("/:id", protect, getPackZoneItemById);

// // Get logs for specific item
// router.get("/:id/logs", protect, getItemLogs);


// // ==================== ADMIN & SUPERUSER ROUTES ====================

// // Create new item
// router.post("/", protect, adminOrSuperuser, createPackZoneItem);

// // Update item details
// router.put("/:id", protect, adminOrSuperuser, updatePackZoneItem);

// // Add stock
// router.post("/:id/add", protect, adminOrSuperuser, addStock);

// // Use/reduce stock
// router.post("/:id/use", protect, adminOrSuperuser, useStock);

// // Adjust stock manually
// router.post("/:id/adjust", protect, adminOrSuperuser, adjustStock);


// // ==================== ADMIN ONLY ROUTES ====================

// // Delete item
// router.delete("/:id", protect, adminOnly, deletePackZoneItem);

// export default router;












import express from "express";
import {
  getAllPackZoneItems,
  getPackZoneItemById,
  createPackZoneItem,
  updatePackZoneItem,
  deletePackZoneItem,
  addStock,
  useStock,
  adjustStock,
  getItemLogs,
  getPackZoneStats
} from "../controllers/packZoneController.js";
import isAuth from "../middlewares/isAuth.js";
import { requireTCode } from "../middlewares/checkTCode.js";

const router = express.Router();

// 🟢 GET (View) ROUTES
router.get("/stats/overview", isAuth, requireTCode("PKG_VIEW"), getPackZoneStats);
router.get("/", isAuth, requireTCode("PKG_VIEW"), getAllPackZoneItems);
router.get("/:id", isAuth, requireTCode("PKG_VIEW"), getPackZoneItemById);
router.get("/:id/logs", isAuth, requireTCode("PKG_VIEW"), getItemLogs);

// 🔵 POST (Create) ROUTES
router.post("/", isAuth, requireTCode("PKG_CREATE"), createPackZoneItem);

// 🟠 PUT/POST (Edit/Update) ROUTES
router.put("/:id", isAuth, requireTCode("PKG_EDIT"), updatePackZoneItem);
router.post("/:id/add", isAuth, requireTCode("PKG_EDIT"), addStock);
router.post("/:id/use", isAuth, requireTCode("PKG_EDIT"), useStock);
router.post("/:id/adjust", isAuth, requireTCode("PKG_EDIT"), adjustStock);

// 🔴 DELETE ROUTE
router.delete("/:id", isAuth, requireTCode("PKG_DELETE"), deletePackZoneItem);

export default router;