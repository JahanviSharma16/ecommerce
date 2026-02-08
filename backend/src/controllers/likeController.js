import Like from "../models/likeModel.js"
import Product from "../models/productModel.js"

export const getUserLikes = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    
    if (!userId) {
      return res.status(200).json([]);
    }

    const likes = await Like.find({ user: userId }).select('product');
    const likedProductIds = likes.map(like => like.product.toString());
    
    res.status(200).json(likedProductIds);
  } catch (error) {
    console.error("Get likes error:", error);
    res.status(500).json({ message: "Failed to get liked products", error: error.message })
  }
}

export const likeProduct = async (req, res) => {
  const { productId } = req.body

  try {
    const userId = req.user ? req.user._id : null;

    const alreadyLiked = await Like.findOne({
      user: userId,
      product: productId
    })

    if (alreadyLiked) {
      return res.status(200).json({ message: "Product already liked" })
    }

    await Like.create({ user: userId, product: productId })
    await Product.findByIdAndUpdate(productId, { $inc: { likesCount: 1 } })

    res.status(201).json({ message: "Product liked" })
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ message: "Failed to like product", error: error.message })
  }
}

export const unlikeProduct = async (req, res) => {
  const { productId } = req.body

  try {
    const userId = req.user ? req.user._id : null;

    const deleted = await Like.findOneAndDelete({
      user: userId,
      product: productId
    })

    if (!deleted) {
      return res.status(200).json({ message: "Product not liked" })
    }

    await Product.findByIdAndUpdate(productId, { $inc: { likesCount: -1 } })
    res.status(200).json({ message: "Product unliked" })
  } catch (error) {
    console.error("Unlike error:", error);
    res.status(500).json({ message: "Failed to unlike product", error: error.message })
  }
}
