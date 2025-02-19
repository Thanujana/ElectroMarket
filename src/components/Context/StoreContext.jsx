import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const StoreContext = createContext(null);

const API_BASE_URL = "http://localhost:8080/api/carts"; // Backend API

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  const isLoggedIn = !!userId;

  // ✅ Fetch cart items from MongoDB when component loads
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn, userId]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.data.productQuantities) {
        const updatedCart = Object.fromEntries(
          Object.entries(response.data.productQuantities).map(([id, quantity]) => [id, { quantity }])
        );
        setCartItems(updatedCart);
      }
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    }
  };

  // ✅ Add item to cart and sync with MongoDB
  const addToCart = async (itemId) => {
    if (!isLoggedIn) {
      alert("⚠️ Please log in to add items to the cart.");
      navigate("/login");
      return;
    }

    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]) {
        updatedCart[itemId] = { ...updatedCart[itemId], quantity: updatedCart[itemId].quantity + 1 };
      } else {
        updatedCart[itemId] = { quantity: 1 };
      }

      saveCartToBackend(updatedCart);
      return updatedCart;
    });
  };

  // ✅ Remove item from cart and sync with MongoDB
  const removeFromCart = async (itemId) => {
    if (!isLoggedIn) return;

    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]?.quantity > 1) {
        updatedCart[itemId] = { ...updatedCart[itemId], quantity: updatedCart[itemId].quantity - 1 };
      } else {
        delete updatedCart[itemId];
      }

      saveCartToBackend(updatedCart);
      return updatedCart;
    });
  };

  // ✅ Clear entire cart and sync with MongoDB
  const clearCart = async () => {
    if (!isLoggedIn) return;

    try {
      await axios.delete(`${API_BASE_URL}/clear/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCartItems({});
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
    }
  };

  // ✅ Save cart to MongoDB
 const saveCartToBackend = async (updatedCart) => {
    if (!isLoggedIn) {
        console.error("❌ User not logged in. Cannot save cart.");
        return;
    }

    try {
        await axios.post(
            `${API_BASE_URL}/${userId}`,
            { productQuantities: Object.fromEntries(Object.entries(updatedCart).map(([id, item]) => [id, item.quantity])) },
            { headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "application/json" } }
        );
        console.log("✅ Cart successfully saved to MongoDB.");
    } catch (error) {
        console.error("❌ Error saving cart:", error);
    }
};


  return (
    <StoreContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isLoggedIn }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
