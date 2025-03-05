import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/PlaceOrder.css"; 

const API_BASE_URL = "http://localhost:8080/api/orders"; // Backend API

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
    postalCode: "",
    deliveryInstructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!authToken) {
        alert("⚠️ Authentication required! Please log in.");
        console.error("❌ No auth token found in localStorage");
        return;
    }

    console.log("🟢 Sending request with token:", authToken); // ✅ Debugging

    const orderData = {
      userId: localStorage.getItem("userId"), // Ensure userId is retrieved
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        imageUrl: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      shippingAddress: { ...formData }, // ✅ Ensure shippingAddress is properly sent
    };
    
    try {
      const response = await axios.post(`${API_BASE_URL}/place`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Ensure the user is authenticated
        },
      });
    
      alert("✅ Order Placed Successfully!");
      navigate("/order-confirmation", { state: { order: response.data } }); // ✅ Ensure the order data is passed
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("⚠️ Failed to place order. Please check your authentication and try again.");
    }
    
};


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Place Your Order</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label>Full Name:</label>
          <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Address:</label>
          <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" className="form-control" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Postal Code:</label>
          <input type="text" name="postalCode" className="form-control" value={formData.postalCode} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Delivery Instructions (Optional):</label>
          <textarea name="deliveryInstructions" className="form-control" value={formData.deliveryInstructions} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success w-100">Confirm Order</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
