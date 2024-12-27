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
    <div className="container my-5">
      <h1 className="text-center mb-4">Shopping Cart</h1>
      {Object.keys(cartItems).length === 0 ? (
        <p className="text-center text-muted">Your cart is empty. Add some items to see them here.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
            </tr>
            </thead>
         <tbody>
          {Object.keys(cartItems).map((itemId) => {
            const item = getItemById(itemId);
            if (!item) {
              console.warn(`Item with ID ${itemId} not found`);
              return null;
            }
            return (
                <tr key={itemId}>
                <td>
                  <img
                    src={item.image}
                    alt={item.type}
                    className="img-thumbnail"
                    style={{ maxWidth: "100px" }}
                  />
                </td>
                <td>{item.type}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{cartItems[itemId]}</td>
                <td>${getItemTotal(itemId)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(itemId)}
                  >
                    &times;
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
        <tr>
                <td colSpan="4" className="text-end fw-bold">Grand Total:</td>
                <td colSpan="2" className="fw-bold">${getCartTotal()}</td>
              </tr>
            </tfoot>
          </table>
          <div className="text-end">
            <button className="btn btn-warning mt-3" onClick={clearCart}>
            Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
