import { useEffect, useState, useCallback } from "react";
import { getProducts, getUserLikes, likeProduct, unlikeProduct } from "../../api/productApi";
import ProductCard from "../../components/product/ProductCard";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likedProducts, setLikedProducts] = useState(new Set());

    const { addItem } = useCart();
    const { user } = useAuth();

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserLikes = useCallback(async () => {
        try {
            if (user) {
                const likedIds = await getUserLikes();
                setLikedProducts(new Set(likedIds));
            } else {
                const guestLikes = JSON.parse(localStorage.getItem("guestLikes") || "[]");
                setLikedProducts(new Set(guestLikes));
            }
        } catch (err) {
            console.error("Failed to fetch user likes:", err);
        }
    }, [user]);

    useEffect(() => {
        fetchProducts();
        fetchUserLikes();
    }, [user, fetchUserLikes]);

    const handleLike = async (id) => {
        console.log("Like button clicked for product ID:", id);
        
        try {
            if (likedProducts.has(id)) {
                console.log("Unliking product...");
                if (user) {
                    await unlikeProduct(id);
                } else {
                    const guestLikes = JSON.parse(localStorage.getItem("guestLikes") || "[]");
                    const updatedLikes = guestLikes.filter(likedId => likedId !== id);
                    localStorage.setItem("guestLikes", JSON.stringify(updatedLikes));
                }
                setLikedProducts(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(id);
                    return newSet;
                });
                alert("Product unliked!");
            } else {
                console.log("Liking product...");
                if (user) {
                    await likeProduct(id);
                } else {
                    const guestLikes = JSON.parse(localStorage.getItem("guestLikes") || "[]");
                    guestLikes.push(id);
                    localStorage.setItem("guestLikes", JSON.stringify(guestLikes));
                }
                setLikedProducts(prev => new Set(prev).add(id));
                alert("Product liked!");
            }
            fetchProducts();
        } catch (err) {
            console.error("Failed to like/unlike product:", err);
            alert("Failed to update like status: " + (err.response?.data?.message || err.message));
        }
    };

    const handleAddToCart = (product) => {
        console.log("Adding to cart:", product);
        addItem(product);
        alert("Product added to cart!");
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Home Appliances</h1>

            

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onLike={handleLike}
                        isGuest={!user}
                        isLiked={likedProducts.has(product._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
