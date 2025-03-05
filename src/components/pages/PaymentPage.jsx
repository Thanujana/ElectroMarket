import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../style/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract totalAmount from the location's state
  const { totalAmount } = location.state || { totalAmount: 0 };

  // Track the selected payment method
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCashOnDelivery = () => {
    alert("✅ Order confirmed with Cash on Delivery!");
    navigate("/order-status", {
      state: {
        totalAmount,
        paymentMethod: "Cash on Delivery",
        status: ["Ordered", "Shipped", "Out for Delivery", "Delivered"], // Example status steps
      },
    });
  };

  const handleCardPayment = () => {
    // Validate card details before proceeding
    if (!validateCardDetails()) {
      alert("⚠️ Please enter valid card details.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      alert("✅ Payment successful!");
      navigate("/order-status", {
        state: {
          totalAmount,
          paymentMethod: "Credit/Debit Card",
          status: ["Ordered", "Shipped", "Out for Delivery", "Delivered"], // Example status steps
        },
      });
    }, 2000); // Simulate a 2-second processing time
  };

  const validateCardDetails = () => {
    const cardNumber = document.getElementById("cardNumber")?.value.trim();
    const expiryDate = document.getElementById("expiryDate")?.value.trim();
    const cvv = document.getElementById("cvv")?.value.trim();

    return (
      cardNumber.length >= 13 &&
      cardNumber.length <= 19 &&
      expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/) &&
      cvv.length === 3
    );
  };

  return (
    <div className="container payment-container">
      <h2 className="text-center payment-title">Select Payment Method</h2>

      {!paymentMethod && (
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <button
              className="btn w-100 mb-3 payment-option"
              style={{
                backgroundColor: "#ff9999",
                color: "#fff",
                border: "none",
              }}
              onClick={() => setPaymentMethod("Cash on Delivery")}
            >
              Cash on Delivery
            </button>
            <button
              className="btn btn-info w-100 payment-option"
              onClick={() => setPaymentMethod("Credit/Debit Card")}
            >
              Credit/Debit Card
            </button>
          </div>
        </div>
      )}

      {paymentMethod === "Cash on Delivery" && (
        <div className="card payment-card">
          <div className="card-body">
            <h4 className="card-title">Cash on Delivery</h4>
            <p className="card-text">
              - You will pay in cash upon receiving your parcel.
              <br />
              - Confirm your order and parcel details with the courier before payment.
            </p>
            <hr />
            <p>
              <strong>Total Amount:</strong> Rs. {totalAmount}
            </p>
            <button className="btn btn-success w-100" onClick={handleCashOnDelivery}>
              Confirm Order
            </button>
          </div>
        </div>
      )}

      {paymentMethod === "Credit/Debit Card" && (
        <div className="card payment-card">
          <div className="card-body">
            <h4 className="card-title">Credit/Debit Card</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input type="text" id="cardNumber" className="form-control" placeholder="Enter card number" maxLength="19"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Name on Card</label>
                <input type="text" className="form-control" placeholder="Enter name" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Expiry Date</label>
                  <input type="text" id="expiryDate" className="form-control" placeholder="MM/YY" maxLength="5"/>
                </div>
                <div className="col-md-6">
                  <label className="form-label">CVV</label>
                  <input type="text" id="cvv" className="form-control" placeholder="CVV" maxLength="3"/>
                </div>
              </div>
            </form>
            <hr />
            <p>
              <strong>Total Amount:</strong> Rs. {totalAmount}
            </p>
            <button
              className="btn btn-success w-100"
              onClick={handleCardPayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
