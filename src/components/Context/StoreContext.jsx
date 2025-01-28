import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };
  const clearCart = () => {
    setCartItems({});
  };
  
  const totalItems = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
  return (
    <StoreContext.Provider value={{ cartItems, addToCart, removeFromCart,clearCart,
        totalItems, }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
