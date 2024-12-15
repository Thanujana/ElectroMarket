import { createContext } from 'react';
import { item_list } from '../assets/assets'; // Make sure item_list is correctly imported.

export const StoreContext = createContext(null); // Create context without initial value.

const StoreContextProvider = (props) => {
  const contextValue = { item_list };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children} {/* Render children components */}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;  // Default export for the provider
