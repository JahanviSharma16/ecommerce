import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  })
}

export const register = async (req, res) => {
  const { name, email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" })
  }

  const user = await User.create({ name, email, password })

  res.status(201).json({
    message: "User registered successfully",
    token: generateToken(user._id)
  })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  res.status(200).json({
    message: "Login successful",
    token: generateToken(user._id)
  })
}

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password")
  res.status(200).json(users)
}
