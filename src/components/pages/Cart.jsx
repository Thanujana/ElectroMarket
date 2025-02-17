import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreContext } from "../Context/StoreContext";

const API_BASE_URL = "http://localhost:8080/api/carts"; // Backend API for cart

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart, clearCart } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Assume userId is stored

  // Fetch Cart Data from Backend
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`);
        if (response.data.productQuantities) {
          setCartItems(response.data.productQuantities);
        }
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
        setError("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, setCartItems]);

  // Function to Save Cart to Backend
  const saveCartToBackend = async () => {
    if (!userId) return;

    try {
      await axios.post(`${API_BASE_URL}/${userId}`, cartItems);
      console.log("✅ Cart saved successfully.");
    } catch (error) {
      console.error("❌ Error saving cart:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      saveCartToBackend();
    }
  }, [cartItems]);

  // Calculate Total
  const getSubtotal = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const item = cartItems[itemId];
      const price = item?.price || 0; // ✅ Ensure price is defined
      return total + price * cartItems[itemId];
    }, 0);
  };

 // Function to calculate delivery fee dynamically
const calculateDeliveryFee = () => {
  const subtotal = getSubtotal();

  if (subtotal === 0) return 0; // No delivery fee if cart is empty
  if (subtotal >= 500) return 0; // Free delivery for orders above Rs 500
  if (subtotal >= 200) return 30; // Rs 30 delivery fee for orders between Rs 200 - Rs 500
  return 70; // Default Rs 70 for orders below Rs 200
};

// Call this function where you need the delivery fee
const deliveryFee = calculateDeliveryFee();

  if (loading) return <p className="loading">Loading cart...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Shopping Cart</h1>
      {Object.keys(cartItems).length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
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
                    const item = cartItems[itemId];
                    if (!item) return null; // ✅ Skip if item is missing

                    const price = item?.price || 0; // ✅ Ensure price is defined
                    const quantity = cartItems[itemId] || 0;

                    return (
                      <tr key={itemId}>
                        <td>
                          <img
                            src={item.imageUrl || "default-image.jpg"} // ✅ Fallback image
                            alt={item.name}
                            className="img-thumbnail"
                            style={{ maxWidth: "100px" }}
                          />
                        </td>
                        <td>{item.name || "Unknown Item"}</td>
                        <td>${price.toFixed(2)}</td>
                        <td>{quantity}</td>
                        <td>${(price * quantity).toFixed(2)}</td>
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
                      cartItems: Object.keys(cartItems).map((itemId) => ({
                        id: itemId,
                        title: cartItems[itemId]?.name || "Unknown",
                        image: cartItems[itemId]?.imageUrl || "default-image.jpg",
                        price: cartItems[itemId]?.price || 0,
                        quantity: cartItems[itemId] || 0,
                      })),
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
