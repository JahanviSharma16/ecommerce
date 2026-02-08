import { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart } from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      if (token) {
        try {
          const data = await getCart();
          setCart(data.items || []);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      } else {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        setCart(guestCart);
      }
      setLoading(false);
    };

    initializeCart();
  }, [token]);

  const fetchCart = async () => {
    if (!token) return;
    
    try {
      const data = await getCart();
      setCart(data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const addItem = async (product) => {
    console.log("CartContext: Adding item", product);
    console.log("Token exists:", !!token);
    
    if (token) {
      try {
        console.log("Adding to server cart...");
        await addToCart(product._id, 1);
        await fetchCart();
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    } else {
      console.log("Adding to guest cart...");
      const updated = [...cart];
      const existing = updated.find(i => i._id === product._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        updated.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("guestCart", JSON.stringify(updated));
      setCart(updated);
      console.log("Guest cart updated:", updated);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem, loading, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
