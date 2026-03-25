// import express from "express";
// import { getDashboardStats } from "../controllers/analyticsController.js";

// const router = express.Router();

// router.get("/dashboard", getDashboardStats);

// export default router;




import express from "express";
import { getDashboardStats } from "../controllers/analyticsController.js";
import isAuth from "../middlewares/isAuth.js"; 
import { requireTCode } from "../middlewares/checkTCode.js";

const router = express.Router();

// Sirf jiske paas ANL_VIEW hai wo dashboard stats dekh payega
router.get("/dashboard", isAuth, requireTCode("ANL_VIEW"), getDashboardStats);

export default router;