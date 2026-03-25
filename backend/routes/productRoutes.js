// // import express from "express";
// // import {
// //   getProducts,
// //   getProductBySKU,
// //   updateQtyBySKU,
// //   getProduct,
// //   createProduct,
// //   updateProduct,
// //   deleteProduct,
// //   generateBarcodeForProduct
// // } from "../controllers/productController.js";

// // import upload from "../middlewares/multer.js";
// // import auth from "../middlewares/isAuth.js";

// // const router = express.Router();

// // // IMAGE UPLOAD (PROTECTED)
// // router.post("/upload", auth, upload.single("image"), async (req, res) => {
// //   try {
// //     if (!req.file) return res.status(400).json({ error: "No file uploaded" });
// //     return res.json({ url: req.file.path });
// //   } catch (err) {
// //     res.status(500).json({ error: "Image upload failed" });
// //   }
// // });
// // // Is route ko add kar dena
// // router.post("/generate-barcode/:sku", auth, generateBarcodeForProduct);

// // // PUBLIC ROUTES
// // router.get("/", getProducts);
// // router.get("/sku/:sku", getProductBySKU);
// // router.get("/:id", getProduct);

// // // PROTECTED ROUTES
// // router.put("/update-qty-sku", auth, updateQtyBySKU);
// // router.post("/", auth, createProduct);
// // router.put("/:id", auth, updateProduct);
// // router.delete("/:id", auth, deleteProduct);

// // export default router;



// import express from "express";
// import {
//   getProducts,
//   getProductBySKU,
//   updateQtyBySKU,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   generateBarcodeForProduct,
//   importProducts
// } from "../controllers/productController.js";

// import upload from "../middlewares/multer.js";

// // 👇 YAHAN CHANGE KIYA HAI (Nayi file se import kiya)
// import auth from "../middlewares/auth.js";
// // import { protect as auth } from "../middlewares/authMiddleware.js"

// const router = express.Router();

// // IMAGE UPLOAD (PROTECTED)
// router.post("/upload", auth, upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });
//     return res.json({ url: req.file.path });
//   } catch (err) {
//     res.status(500).json({ error: "Image upload failed" });
//   }
// });

// router.post("/import", auth, importProducts);
// // Barcode Gen
// router.post("/generate-barcode/:sku", auth, generateBarcodeForProduct);

// // PUBLIC ROUTES
// router.get("/", getProducts);
// router.get("/sku/:sku", getProductBySKU);
// router.get("/:id", getProduct);

// // PROTECTED ROUTES
// router.put("/update-qty-sku", auth, updateQtyBySKU); // ✅ Ab ye sahi middleware use karega
// router.post("/", auth, createProduct);
// router.put("/:id", auth, updateProduct);
// router.delete("/:id", auth, deleteProduct);

// export default router;






















import express from "express";
import {
  getProducts,
  getProductBySKU,
  updateQtyBySKU,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  generateBarcodeForProduct,
  importProducts
} from "../controllers/productController.js";

import upload from "../middlewares/multer.js";
import isAuth from "../middlewares/auth.js"; // Tumhara existing auth
import { requireTCode } from "../middlewares/checkTCode.js"; // Naya TCode check

const router = express.Router();

// 🔵 IMAGE UPLOAD & IMPORT (CREATE Permissions)
router.post("/upload", isAuth, requireTCode("INV_CREATE"), upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    return res.json({ url: req.file.path });
  } catch (err) {
    res.status(500).json({ error: "Image upload failed" });
  }
});
router.post("/import", isAuth, requireTCode("INV_CREATE"), importProducts);
router.post("/generate-barcode/:sku", isAuth, requireTCode("INV_CREATE"), generateBarcodeForProduct);

// 🟢 PUBLIC/VIEW ROUTES
router.get("/", isAuth, requireTCode("INV_VIEW"), getProducts);
router.get("/sku/:sku", isAuth, requireTCode("INV_VIEW"), getProductBySKU);
router.get("/:id", isAuth, requireTCode("INV_VIEW"), getProduct);

// 🟠 EDIT ROUTES
router.put("/update-qty-sku", isAuth, requireTCode("INV_EDIT"), updateQtyBySKU); 
router.post("/", isAuth, requireTCode("INV_CREATE"), createProduct);
router.put("/:id", isAuth, requireTCode("INV_EDIT"), updateProduct);

// 🔴 DELETE ROUTES
router.delete("/:id", isAuth, requireTCode("INV_DELETE"), deleteProduct);

export default router;