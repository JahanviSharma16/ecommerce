import express from "express"
import {
  getUserLikes,
  likeProduct,
  unlikeProduct
} from "../controllers/likeController.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", protect, getUserLikes)
router.post("/like", protect, likeProduct)
router.post("/unlike", protect, unlikeProduct)

export default router
