import express from "express"
import {
  createOrder,
  simulatePayment,
  getMyOrders,
  getAllOrders
} from "../controllers/orderController.js"
import { protect, isAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/", protect, createOrder)
router.post("/:orderId/pay", protect, simulatePayment)
router.get("/my", protect, getMyOrders)
router.get("/all", protect, isAdmin, getAllOrders)

export default router
