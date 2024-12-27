import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { varieties_list } from "../../assets/assets"; 

const Cart = () => {
  const { cartItems, removeFromCart,clearCart} = useContext(StoreContext);

  // Calculate total price for each item and overall cart total
  const getItemTotal = (itemId) => (varieties_list[itemId].price * cartItems[itemId]).toFixed(2);
  const getCartTotal = () =>
    Object.keys(cartItems)
      .reduce((total, itemId) => total + varieties_list[itemId].price * cartItems[itemId], 0)
      .toFixed(2);

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
          {Object.keys(cartItems).map((itemId) => (
            <div key={itemId} className="cart-item">
              <img
                src={varieties_list[itemId].image}
                alt={varieties_list[itemId].title}
                className="cart-item-image"
              />
              <p>{varieties_list[itemId].title}</p>
              <p>${varieties_list[itemId].price.toFixed(2)}</p>
              <p>{cartItems[itemId]}</p>
              <p>${getItemTotal(itemId)}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(itemId)}
              >
                Remove
              </button>
            </div>
          ))}
          <hr />
          <div className="cart-total">
            <h2>Total: ${getCartTotal()}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
