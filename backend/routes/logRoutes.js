// import express from "express";
// import { getLogs, getProductLogs, getUserLogs } from "../controllers/logController.js";
// import { protect } from "../middlewares/authMiddleware.js"; // Teri existing middleware
// import isAuth from "../middlewares/auth.js";

// const router = express.Router();

// // Sirf Admin dekh sakta hai
// router.get("/", protect, getLogs);
// router.get("/user/:userId", isAuth, getUserLogs);
// router.get("/product/:productId", isAuth, getProductLogs);

// export default router;












import express from "express";
import { getLogs, getProductLogs, getUserLogs } from "../controllers/logController.js";
import isAuth from "../middlewares/isAuth.js"; // Dono jagah ek hi auth use karo
import { adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Sirf Admin system logs dekh sakta hai
router.get("/", isAuth, adminOnly, getLogs);
router.get("/user/:userId", isAuth, adminOnly, getUserLogs);
router.get("/product/:productId", isAuth, adminOnly, getProductLogs);

export default router;