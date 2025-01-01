import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract totalAmount from the location's state
  const { totalAmount } = location.state || { totalAmount: 0 };

  // Track the selected payment method
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleCashOnDelivery = () => {
    alert("Order confirmed with Cash on Delivery!");
    navigate("/order-status", {
      state: {
        totalAmount,
        paymentMethod: "Cash on Delivery",
        status: ["Ordered", "Shipped", "Out for Delivery", "Delivered"], // Example status steps
      },
    });
  };

  const handleCardPayment = () => {
    alert("Card Payment initiated!");
    navigate("/order-status", {
      state: {
        totalAmount,
        paymentMethod: "Credit/Debit Card",
        status: ["Ordered", "Shipped", "Out for Delivery", "Delivered"], // Example status steps
      },
    });
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
            <button
  className="btn btn-success w-100"
  onClick={() =>
    navigate("/order-status", {
      state: {
        paymentMethod: "Cash on Delivery",
        totalAmount,
        status: ["Ordered", "Shipped", "Out for Delivery", "Delivered"], // Example status steps
      },
    })
  }
>
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
                <input type="text" className="form-control" placeholder="Enter card number" />
              </div>
              <div className="mb-3">
                <label className="form-label">Name on Card</label>
                <input type="text" className="form-control" placeholder="Enter name" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Expiry Date</label>
                  <input type="text" className="form-control" placeholder="MM/YY" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">CVV</label>
                  <input type="text" className="form-control" placeholder="CVV" />
                </div>
              </div>
            </form>
            <hr />
            <p>
              <strong>Total Amount:</strong> Rs. {totalAmount}
            </p>
            <button
  className="btn btn-success w-100"
  onClick={() =>
    navigate("/order-status", {
      state: {
        paymentMethod: "Credit/Debit Card",
        totalAmount,
        status: ["Ordered", "Shipped", "Out for Delivery", "Delivered"], // Example status steps
      },
    })
  }
>
  Pay Now
</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
