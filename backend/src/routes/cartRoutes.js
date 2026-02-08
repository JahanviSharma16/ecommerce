import express from "express"
import { addToCart, updateCartItem, getCart } from "../controllers/cartController.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", protect, getCart)
router.post("/add", protect, addToCart)
router.put("/update", protect, updateCartItem)

export default router
