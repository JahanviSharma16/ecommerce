import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, image } = req.body;

    if (!name || price == null || stock == null) {
      return res.status(400).json({
        message: "Name, price and stock are required",
      });
    }

    const product = await Product.create({
      name,
      price,
      stock,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};
