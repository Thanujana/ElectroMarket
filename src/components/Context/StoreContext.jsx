import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const API_BASE_URL = "http://localhost:8080/api/carts"; // Backend API

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  
  const userId = localStorage.getItem("userId") || "";
  const authToken = localStorage.getItem("authToken") || "";
  const isLoggedIn = Boolean(userId && authToken); // ✅ Ensure both exist

  // ✅ Debugging Logs
  console.log("🟢 User ID:", userId);
  console.log("🟢 Auth Token:", authToken);
  console.log("🟢 isLoggedIn:", isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      console.warn("⚠️ User not logged in, skipping cart fetch.");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`, {
          headers: { Authorization: `Bearer ${authToken}` }, // ✅ Send token
        });

        if (response.data.productQuantities) {
          setCartItems(response.data.productQuantities);
        }
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [isLoggedIn, userId, authToken]);

  return (
    <StoreContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
