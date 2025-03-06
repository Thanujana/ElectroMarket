import{ createContext, useContext, useState, useEffect } from "react";

// ✅ Create Context
const CartContext = createContext();

// ✅ Cart Context Provider
const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // ✅ Add to Cart
    const addToCart = (item) => {
        const updatedCart = [...cart, item];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // ✅ Remove from Cart
    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // ✅ Update Quantity
    const updateQuantity = (id, quantity) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // ✅ Clear Cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("storage")); // ✅ Forces UI update
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart ,setCart}}>
            {children}
        </CartContext.Provider>
    );
};

// ✅ Custom Hook
export const useCart = () => useContext(CartContext);

// ✅ FIX: Export as default
export default CartContextProvider;
