import { createContext } from 'react';
import { item_list } from '../assets/assets'; // Make sure item_list is correctly imported.

export const StoreContext = createContext(); // Create context without initial value.

const StoreContextProvider = ({ children }) => {
  const contextValue = { item_list };

  return (
    <StoreContext.Provider value={contextValue}>
      {children} {/* Render children components */}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;  // Default export for the provider
