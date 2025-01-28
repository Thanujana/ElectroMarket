import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData } = location.state || {};

  if (!formData || !formData.cartItems || formData.cartItems.length === 0) {
    return (
      <div className="container mt-5">
        <h1>Order Not Found</h1>
        <p>No order details available. Please place an order first.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Order Confirmation</h1>
      <div className="p-4 border rounded bg-light">
        {/* Order Details */}
        <h4>Order Details</h4>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Postal Code:</strong> {formData.postalCode}</p>
        {formData.deliveryInstructions && (
          <p><strong>Delivery Instructions:</strong> {formData.deliveryInstructions}</p>
        )}

        <hr />

        {/* Cart Details */}
        <h4 className="mt-4">Cart Details</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {formData.cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grand Total */}
        <h5 className="mt-3">
          Grand Total: $
          {formData.cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </h5>

        {/* Actions */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/cart")}
          >
            Cancel
          </button>
          <button
  className="btn btn-danger"
  onClick={() =>
    navigate("/payment", {
      state: {
        totalAmount: formData.cartItems
          .reduce((total, item) => total + item.price * item.quantity, 0), // Calculate total amount
      },
    })
  }
>
  Pay Now
</button>

        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
