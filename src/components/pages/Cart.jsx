import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreContext } from "../Context/StoreContext";
import { varieties_list } from "../../assets/assets";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(StoreContext);

  const navigate = useNavigate();
  // Flatten varieties_list for easy lookup
  const allItems = Object.values(varieties_list).flat();
  const getItemById = (id) => allItems.find((item) => item.id === parseInt(id));

  // Calculate subtotal and total price
  const getSubtotal = () =>
    Object.keys(cartItems).reduce((total, itemId) => {
      const item = getItemById(itemId);
      if (!item) return total;
      return total + item.price * cartItems[itemId];
    }, 0);

  const deliveryFee = 70; // Fixed delivery fee

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Shopping Cart</h1>
      {Object.keys(cartItems).length === 0 ? (
        <p className="text-center text-muted">Your cart is empty. Add some items to see them here.</p>
      ) : (
        <div className="row">
          {/* Cart Items Table */}
          <div className="col-md-8">
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
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
                        <td>${(item.price * cartItems[itemId]).toFixed(2)}</td>
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
              </table>
            </div>
          </div>

          {/* Cart Totals Section */}
          <div className="col-md-4">
            <div className="border p-3">
              <h4 className="mb-3">Cart Totals</h4>
              <div className="d-flex justify-content-between">
                <p>Subtotal:</p>
                <p>${getSubtotal().toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Delivery Fee:</p>
                <p>${deliveryFee.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between fw-bold">
                <p>Total:</p>
                <p>${(getSubtotal() + deliveryFee).toFixed(2)}</p>
              </div>
              <button
  className="btn btn-danger w-100 mt-3"
  onClick={() =>
    navigate("/place-order", {
      state: {
        cartItems: Object.keys(cartItems).map((itemId) => {
          const item = getItemById(itemId);
          return {
            id: itemId,
            title: item.type,
            image: item.image,
            price: item.price,
            quantity: cartItems[itemId],
          };
        }),
      },
    })
  }
>
  Proceed to Checkout
</button>

              <button
                className="btn btn-outline-danger w-100 mt-2"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
