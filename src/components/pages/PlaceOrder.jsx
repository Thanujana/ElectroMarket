import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/order-confirmation", {
      state: {
        formData: { ...formData, cartItems }, // Pass cart items and form data
      },
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Place Your Order</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            className="form-control"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            className="form-control"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Delivery Instructions (Optional):</label>
          <textarea
            name="deliveryInstructions"
            className="form-control"
            value={formData.deliveryInstructions}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
