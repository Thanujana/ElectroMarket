import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { varieties_list } from "../../assets/assets"; // Import varieties_list directly

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(StoreContext);

  // Flatten varieties_list for easy lookup
  const allItems = Object.values(varieties_list).flat();
  const getItemById = (id) => allItems.find((item) => item.id === parseInt(id));

  // Calculate the total for each item and the entire cart
  const getItemTotal = (itemId) => {
    const item = getItemById(itemId);
    if (!item) return 0;
    return (item.price * cartItems[itemId]).toFixed(2);
  };

  const getCartTotal = () =>
    Object.keys(cartItems).reduce((total, itemId) => {
      const item = getItemById(itemId);
      if (!item) return total;
      return total + item.price * cartItems[itemId];
    }, 0);

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {Object.keys(cartItems).length === 0 ? (
        <p>Your cart is empty. Add some items to see them here.</p>
      ) : (
        <div className="cart-items">
          <div className="cart-items-header">
            <p>Image</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {Object.keys(cartItems).map((itemId) => {
            const item = getItemById(itemId);
            if (!item) {
              console.warn(`Item with ID ${itemId} not found`);
              return null;
            }
            return (
              <div key={itemId} className="cart-item">
                <img
                  src={item.image}
                  alt={item.type}
                  className="cart-item-image"
                />
                <p>{item.type}</p>
                <p>${item.price.toFixed(2)}</p>
                <p>{cartItems[itemId]}</p>
                <p>${getItemTotal(itemId)}</p>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(itemId)}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <hr />
          <div className="cart-total">
            <h2>Total: ${getCartTotal().toFixed(2)}</h2>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
