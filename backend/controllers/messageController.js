import { Router } from "express";
import { sendMessage } from "../models/messageModel.js";

const router = Router();

router.post("/", sendMessage);

export default router;
