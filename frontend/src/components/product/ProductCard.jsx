import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart, onLike, isGuest, isLiked }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300";
          }}
        />
      </div>

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600">₹ {product.price}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      <p className="text-xs text-gray-400">{product.likesCount || 0} likes</p>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
        >
          Add to Cart
        </button>

        <button
          onClick={() => onLike(product._id)}
          className={`p-2 rounded-lg transition ${
            isGuest ? "text-gray-300 " : "text-gray-600 hover:text-red-500"
          }`}
          title={isGuest ? "Like product" : "Like product"}
        >
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
