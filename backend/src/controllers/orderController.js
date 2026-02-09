import Order from "../models/orderModel.js"
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"

export const createOrder = async (req, res) => {
  const userId = req.user._id

  const cart = await Cart.findOne({ user: userId }).populate("items.product")
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" })
  }

  let total = 0
  const orderItems = []

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id)

    if (!product || product.stock < item.quantity) {
      return res
        .status(400)
        .json({ message: `Insufficient stock for ${item.product.name}` })
    }

    total += product.price * item.quantity

    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price
    })
  }

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount: total
  })

  await Cart.findOneAndUpdate(
    { user: userId },
    { $set: { items: [] } }
  )

  res.status(201).json(order)
}

export const simulatePayment = async (req, res) => {
  const { success } = req.body
  const orderId = req.params.orderId
  const generatedPaymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  if (typeof success !== 'boolean') {
    return res.status(400).json({ message: "Success parameter must be boolean" })
  }

  const order = await Order.findById(orderId)
  if (!order) {
    return res.status(404).json({ message: "Order not found" })
  }

  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" })
  }

  if (order.status === "PAID") {
    return res.status(200).json({ message: "Payment already processed" })
  }

  if (!success) {
    order.status = "FAILED"
    await order.save()
    return res.status(200).json({ message: "Payment failed" })
  }

  for (const item of order.items) {
    const updated = await Product.findOneAndUpdate(
      {
        _id: item.product,
        stock: { $gte: item.quantity }
      },
      { $inc: { stock: -item.quantity } }
    )

    if (!updated) {
      order.status = "FAILED"
      await order.save()
      return res.status(400).json({ message: "Stock issue during payment" })
    }
  }

  order.status = "PAID"
  order.paymentId = generatedPaymentId
  await order.save()

  res.status(200).json({ message: "Payment successful", order })
}

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "items.product"
  )
  res.status(200).json(orders)
}

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user")
    .populate("items.product")
  res.status(200).json(orders)
}
