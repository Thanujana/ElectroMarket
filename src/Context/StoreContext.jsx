import { createContext, useState } from 'react';
import { item_list } from '../assets/assets'; // Make sure item_list is correctly imported.

export const StoreContext = createContext(null); // Create context without initial value.

const StoreContextProvider = (props) => {
  const [cartItems,setCartItems] =useState({});

  const addToCart = (itemId) => {
    if (!item_list[itemId]) {
      console.warn(`Item with ID ${itemId} does not exist in item_list.`);
      return; // Do nothing if the item does not exist
    }
  
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1, // Increment or initialize count
    }));
  };
  

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] === 1) {
        const updatedCart = { ...prev };
        delete updatedCart[itemId]; // Remove the item when count reaches 0
        return updatedCart;
      } else {
        return { ...prev, [itemId]: prev[itemId] - 1 }; // Decrement count
      }
    });
  };
  
  return (
    <StoreContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;  // Default export for the provider
