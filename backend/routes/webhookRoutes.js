import express from 'express';
import { createShopifyOrder } from '../controllers/webhookController.js';

const router = express.Router();

// Ye URL Shopify hit karega
router.post('/api/shopify/orders/create', createShopifyOrder);

export default router;