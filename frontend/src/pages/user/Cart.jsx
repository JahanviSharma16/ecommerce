import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../api/orderApi";
import { updateCartItem } from "../../api/cartApi";
import { useState } from "react";

const Cart = () => {
    const { cart, fetchCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [updating, setUpdating] = useState(false);

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        
        if (!user) {
            const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
            const updatedCart = guestCart.map(item => {
                if ((item._id || item.product?._id) === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            localStorage.setItem("guestCart", JSON.stringify(updatedCart));
            window.location.reload();
            return;
        }
        
        try {
            setUpdating(true);
            await updateCartItem(productId, newQuantity);
            await fetchCart();
        } catch (error) {
            console.error("Failed to update cart:", error);
        } finally {
            setUpdating(false);
        }
    };

    const handleCheckout = () => {
        if (!user) {
            navigate("/login");
            return;
        }

        proceedWithCheckout();
    };

    const proceedWithCheckout = async () => {
        try {
            await createOrder();
            
            alert("Your payment is processing, check your orders to check the correct status.");
            
            navigate("/orders");
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Checkout failed");
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = item.priceAtAdd || item.price || 0;
            return total + (price * (item.quantity || 1));
        }, 0);
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                <p className="text-gray-500">Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

            {!user && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-yellow-800 font-medium">
                                You're browsing as a guest
                            </p>
                            <p className="text-yellow-600 text-sm">
                                Please login to complete your order
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Login to Checkout
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="divide-y divide-gray-200">
                    {cart.map(item => (
                        <div
                            key={item._id || item.product?._id}
                            className="p-4 flex justify-between items-center"
                        >
                            <div className="flex-1">
                                <h3 className="font-medium text-lg">
                                    {item.name || item.product?.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    ₹ {item.priceAtAdd || item.price} per item
                                </p>
                                {item.stock !== undefined && (
                                    <p className="text-xs text-gray-400">
                                        Stock: {item.stock}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleQuantityChange(
                                            item._id || item.product?._id, 
                                            (item.quantity || 1) - 1
                                        )}
                                        disabled={updating}
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center">
                                        {item.quantity || 1}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(
                                            item._id || item.product?._id, 
                                            (item.quantity || 1) + 1
                                        )}
                                        disabled={updating}
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">
                                        ₹ {(item.priceAtAdd || item.price) * (item.quantity || 1)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Total:</span>
                    <span className="text-2xl font-bold">₹ {calculateTotal()}</span>
                </div>

                <button
                    onClick={handleCheckout}
                    className={`w-full font-medium py-3 px-6 rounded-lg transition duration-200 ${
                        user 
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-yellow-600 hover:bg-yellow-700 text-white"
                    }`}
                >
                    {user ? "Proceed to Checkout" : "Login to Checkout"}
                </button>
            </div>
        </div>
    );
};

export default Cart;
