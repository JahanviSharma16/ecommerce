import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body
  const userId = req.user._id

  const product = await Product.findById(productId)
  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  if (quantity > product.stock) {
    return res.status(400).json({ message: "Not enough stock" })
  }

  let cart = await Cart.findOne({ user: userId })

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: []
    })
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  )

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity
  } else {
    cart.items.push({
      product: productId,
      quantity,
      priceAtAdd: product.price
    })
  }

  await cart.save()

  res.status(200).json(cart)
}

export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body
  const userId = req.user._id

  console.log("Update cart request:", { productId, quantity, userId })

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" })
  }

  const product = await Product.findById(productId)
  if (!product) {
    console.log("Product not found for ID:", productId)
    return res.status(404).json({ message: "Product not found" })
  }

  if (quantity > product.stock) {
    return res.status(400).json({ message: "Not enough stock" })
  }

  const cart = await Cart.findOne({ user: userId })
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" })
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  )

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found in cart" })
  }

  cart.items[itemIndex].quantity = quantity
  await cart.save()

  res.status(200).json(cart)
}

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  )

  res.status(200).json(cart || { items: [] })
}
