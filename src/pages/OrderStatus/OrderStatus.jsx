import React from "react";
import { useLocation } from "react-router-dom";
import '../../style/OrderStatus.css';

const OrderStatus = () => {
  const location = useLocation();

  // Extracting state values passed through navigation
  const { paymentMethod, totalAmount, status } = location.state || {
    paymentMethod: "Not Specified",
    totalAmount: 0,
    status: ["Ordered"],
  };

  // Determine the current status
  const currentStepIndex = status.indexOf("Delivered") + 1; // Update this dynamically

  return (
    <div className="container mt-5 order-status-container">
      <h1 className="text-center">Order Status</h1>
      <p className="text-center">
        <strong>Payment Method:</strong> {paymentMethod} <br />
        <strong>Total Amount:</strong> Rs. {totalAmount}
      </p>

      {/* Horizontal Progress Bar */}
      <div className="order-progress-bar">
        {status.map((step, index) => (
          <div
            key={index}
            className={`order-step ${
              index < currentStepIndex ? "completed" : ""
            }`}
          >
            <div className="step-circle">
              {index < currentStepIndex ? (
                <span className="checkmark">✔️</span>
              ) : (
                <span className="step-number">{index + 1}</span>
              )}
            </div>
            <p className="step-label">{step}</p>
          </div>
        ))}
      </div>

      {/* Current Status Message */}
      <div className="text-center mt-4">
        <h3
          style={{
            color: currentStepIndex === status.length ? "blue" : "orange",
          }}
        >
          {status[currentStepIndex - 1]}
        </h3>
        <p>
          {currentStepIndex === status.length
            ? "Your package is Delivered and will arrive soon!"
            : `Your package is currently at the ${status[currentStepIndex - 1]} stage.`}
        </p>
      </div>
    </div>
  );
};

export default OrderStatus;
