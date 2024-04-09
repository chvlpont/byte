import express from "express";
import { getOrderHistory } from "../models/orderHistoryModel.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get order history route
router.get("/", verifyToken, getOrderHistory);

export default router;
