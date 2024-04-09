import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProductPrice,
  removeProduct,
} from "../models/productModel.js";

const router = Router();

router.post("/", addProduct);
router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.put("/:id", updateProductPrice);
router.delete("/:id", removeProduct);

export default router;
