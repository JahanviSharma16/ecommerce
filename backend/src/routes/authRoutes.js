import express from "express"
import { register, login, getAllUsers } from "../controllers/authController.js"
import { protect, isAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/users", protect, isAdmin, getAllUsers)

export default router
