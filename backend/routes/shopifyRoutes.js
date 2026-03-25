import express from "express";
import { shopifyAuth, shopifyCallback } from "../controllers/shopifyController.js";

const router = express.Router();

router.get("/auth", shopifyAuth);
router.get("/auth/callback", shopifyCallback);

export default router;
