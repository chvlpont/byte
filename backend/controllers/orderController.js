// routes/orderRoutes.js
import express from "express";
import { saveOrder } from "../models/orderModel.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Save order route
router.post("/", verifyToken, saveOrder);

export default router;
