import express from "express"
import {
  getProducts,
  createProduct
} from "../controllers/productController.js"
import { protect, isAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", getProducts)
router.post("/", protect, isAdmin, createProduct)

export default router
