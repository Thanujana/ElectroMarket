import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract totalAmount from the location's state
  const { totalAmount } = location.state || { totalAmount: 0 }; // Default to 0 if not provided

  const handleCashOnDelivery = () => {
    alert("Order confirmed with Cash on Delivery!");
    navigate("/order-confirmation", {
      state: {
        totalAmount,
        paymentMethod: "Cash on Delivery",
      },
    });
  };

  const handleCardPayment = () => {
    alert("Card Payment initiated!");
    navigate("/order-confirmation", {
      state: {
        totalAmount,
        paymentMethod: "Credit/Debit Card",
      },
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Select Payment Method</h2>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h4 style={{ marginBottom: "15px" }}>Cash on Delivery</h4>
        <p style={{ fontSize: "14px", marginBottom: "10px" }}>
          - You may pay in cash to our courier upon receiving your parcel at the doorstep.
          <br />
          - Before making payment, confirm your order and parcel details with the courier.
        </p>
        <hr />
        <div>
          <p>
            <strong>Subtotal:</strong> Rs. {totalAmount - 30}
          </p>
          <p>
            <strong>Cash Payment Fee:</strong> Rs. 30
          </p>
          <p>
            <strong>Total Amount:</strong> Rs. {totalAmount}
          </p>
        </div>
        <button
          style={{
            backgroundColor: "#ff5722",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
            width: "100%",
            marginTop: "10px",
          }}
          onClick={handleCashOnDelivery}
        >
          Confirm Order
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h4 style={{ marginBottom: "15px" }}>Credit/Debit Card</h4>
        <form>
          <div style={{ marginBottom: "10px" }}>
            <label>Card Number</label>
            <input
              type="text"
              placeholder="Enter card number"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Name on Card</label>
            <input
              type="text"
              placeholder="Enter name"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <div style={{ flex: "1" }}>
              <label>Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div style={{ flex: "1" }}>
              <label>CVV</label>
              <input
                type="text"
                placeholder="CVV"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>
        </form>
        <p>
          <strong>Total Amount:</strong> Rs. {totalAmount}
        </p>
        <button
          style={{
            backgroundColor: "#ff5722",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
            width: "100%",
            marginTop: "10px",
          }}
          onClick={handleCardPayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
