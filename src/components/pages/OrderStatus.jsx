import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../style/OrderStatus.css";

const API_BASE_URL = "http://localhost:8080/api/tracking"; // Your Backend API

const OrderStatus = () => {
  const location = useLocation();
  const [trackingData, setTrackingData] = useState(null);
  const { orderId, paymentMethod, totalAmount } = location.state || {};

  useEffect(() => {
    if (!orderId) return;

    const fetchTrackingData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${orderId}`);
        setTrackingData(response.data);
      } catch (error) {
        console.error("❌ Error fetching tracking data:", error);
      }
    };

    fetchTrackingData();
  }, [orderId]);

  return (
    <div className="container mt-5 order-status-container">
      <h1 className="text-center">Order Status</h1>
      <p className="text-center">
        <strong>Payment Method:</strong> {paymentMethod || "N/A"} <br />
        <strong>Total Amount:</strong> Rs. {totalAmount || "0"}
      </p>

      {trackingData ? (
        <>
          <p className="text-center">
            <strong>Current Location:</strong> {trackingData.currentLocation || "N/A"} <br />
            <strong>Status:</strong> {trackingData.status || "Processing"}
          </p>

          {/* Horizontal Progress Bar */}
          <div className="order-progress-bar">
            {["Ordered", "Shipped", "Out for Delivery", "Delivered"].map((step, index) => (
              <div
                key={index}
                className={`order-step ${
                  step === trackingData.status ? "completed" : ""
                }`}
              >
                <div className="step-circle">
                  {step === trackingData.status ? (
                    <span className="checkmark">✔️</span>
                  ) : (
                    <span className="step-number">{index + 1}</span>
                  )}
                </div>
                <p className="step-label">{step}</p>
              </div>
            ))}
          </div>

          {/* Expected Delivery */}
          <div className="text-center mt-4">
            <h3 style={{ color: trackingData.status === "Delivered" ? "blue" : "orange" }}>
              {trackingData.status}
            </h3>
            <p>
              {trackingData.status === "Delivered"
                ? "Your package has been delivered! 🎉"
                : `Expected Delivery Date: ${trackingData.expectedDeliveryDate || "Not Available"}`}
            </p>
          </div>
        </>
      ) : (
        <p className="text-center text-danger">⚠️ Tracking information not available.</p>
      )}
    </div>
  );
};

export default OrderStatus;
