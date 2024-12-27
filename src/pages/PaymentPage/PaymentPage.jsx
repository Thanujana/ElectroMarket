import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData } = location.state || {};

  if (!formData) {
    return (
      <div className="container mt-5">
        <h1>Payment Error</h1>
        <p>No order details available. Please go back and try again.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Back to Home
        </button>
      </div>
    );
  }

  const handleConfirmPayment = (method) => {
    alert(`Payment successful with ${method}!`);
    navigate("/"); // Redirect to home after successful payment
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Select Payment Method</h1>
      <div className="p-4 border rounded bg-light">
        <h4>Order Summary</h4>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Total Amount:</strong> $123.00</p> {/* Add dynamic total if needed */}
        <hr />
        <div className="payment-options">
          <button
            className="btn btn-outline-primary w-100 mb-3"
            onClick={() => handleConfirmPayment("Credit/Debit Card")}
          >
            Pay with Credit/Debit Card
          </button>
          <button
            className="btn btn-outline-success w-100 mb-3"
            onClick={() => handleConfirmPayment("Cash on Delivery")}
          >
            Pay with Cash on Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
