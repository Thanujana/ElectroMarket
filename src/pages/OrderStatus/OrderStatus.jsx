import React from "react";
import { useLocation } from "react-router-dom";
import "./OrderStatus.css";

const OrderStatus = () => {
  const location = useLocation();
  const { paymentMethod, totalAmount, status } = location.state || {};

  if (!status || status.length === 0) {
    return <p>No order status available. Please place an order first.</p>;
  }

  const currentStatusIndex = 3; // Dynamically set based on API or user actions (e.g., "Out for Delivery")

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Order Status</h1>
      <p className="text-center mb-4">
        <strong>Payment Method:</strong> {paymentMethod} <br />
        <strong>Total Amount:</strong> Rs. {totalAmount}
      </p>

      {/* Progress Bar */}
      <div className="progress-bar-container mb-4">
        <div className="progress-bar">
          {status.map((step, index) => (
            <div
              key={index}
              className={`progress-step ${index <= currentStatusIndex ? "active" : ""}`}
            >
              <div className="progress-circle">
                {index < currentStatusIndex && <span className="checkmark">&#10003;</span>}
              </div>
              <p className="progress-label">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Status Message */}
      <div className="text-center">
        <h4 className="text-primary">{status[currentStatusIndex]}</h4>
        <p>Your package is {status[currentStatusIndex]} and will arrive soon!</p>
      </div>
    </div>
  );
};

export default OrderStatus;
