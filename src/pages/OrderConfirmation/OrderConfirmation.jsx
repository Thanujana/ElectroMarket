import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData } = location.state || {};

  if (!formData) {
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
        <button
          className="btn btn-success w-100"
          onClick={() => alert("Order confirmed!")}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
