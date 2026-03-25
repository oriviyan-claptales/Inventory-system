// // import express from "express";
// // import {
// // deleteSale,
// //   getAllSales,
// //   getSalesDashboard,
// //   getSkuWiseSales,
// //   updateSaleQuantity
// // } from "../controllers/salesController.js";

// // const router = express.Router();

// // router.get("/", getAllSales);
// // router.get("/dashboard", getSalesDashboard);
// // router.get("/sku-wise", getSkuWiseSales);
// // router.put("/update-sku/:id", updateSaleQuantity);
// // router.delete("/delete-sku/:id", deleteSale);

// // export default router;



















// import express from "express";
// import {
//   createManualSale,       // 👉 Naya Function import kiya
//   deleteSale,
//   getAllSales,
//   getSalesDashboard,
//   getSkuWiseSales,
//   updateSaleQuantity
// } from "../controllers/salesController.js";

// const router = express.Router();

// router.get("/", getAllSales);
// router.get("/dashboard", getSalesDashboard);
// router.get("/sku-wise", getSkuWiseSales);

// // 👉 Naya POST route jo frontend ke modal form se hit hoga
// router.post("/update-qty-sku", createManualSale);

// router.put("/update-sku/:id", updateSaleQuantity);
// router.delete("/delete-sku/:id", deleteSale);

// export default router;












import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { requireTCode } from "../middlewares/checkTCode.js";
import {
  createManualSale,       
  deleteSale,
  getAllSales,
  getSalesDashboard,
  getSkuWiseSales,
  updateSaleQuantity
} from "../controllers/salesController.js";

const router = express.Router();

// 🟢 GET (Read) Operations
router.get("/", isAuth, requireTCode("SLS_VIEW"), getAllSales);
router.get("/dashboard", isAuth, requireTCode("SLS_VIEW"), getSalesDashboard);
router.get("/sku-wise", isAuth, requireTCode("SLS_VIEW"), getSkuWiseSales);

// 🔵 POST (Create) Operations
router.post("/update-qty-sku", isAuth, requireTCode("SLS_CREATE"), createManualSale);

// 🟠 PUT (Edit) Operations
router.put("/update-sku/:id", isAuth, requireTCode("SLS_EDIT"), updateSaleQuantity);

// 🔴 DELETE Operations
router.delete("/delete-sku/:id", isAuth, requireTCode("SLS_DELETE"), deleteSale);

export default router;