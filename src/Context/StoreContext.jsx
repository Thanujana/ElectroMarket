import { createContext, useState } from 'react';
import { item_list } from '../assets/assets'; // Make sure item_list is correctly imported.

export const StoreContext = createContext(null); // Create context without initial value.

const StoreContextProvider = (props) => {
  const [cartItems,setCartItems] =useState({});

  const addToCart =(itemId)=>{
    if(!cartItems[itemId]){
      setCartItems((prev)=({...prev,[itemId]:1}))
    }
    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
  }

  const removeFromCart=(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }
  const contextValue = { item_list,cartItems,setCartItems,addToCart,removeFromCart };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children} {/* Render children components */}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;  // Default export for the provider
