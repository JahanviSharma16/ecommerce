import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import likeRoutes from "./routes/likeRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-self-zeta.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/orders", orderRoutes)

app.get("/health", (req, res) => {
    res.status(200).json({status: "OK", message: "API running"})
})

export default app