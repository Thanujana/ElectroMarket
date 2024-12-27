import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    postalCode: "",
    deliveryInstructions: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    navigate("/"); // Redirect to home page after placing order
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Place Your Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</label>
          <textarea
            id="deliveryInstructions"
            name="deliveryInstructions"
            rows="3"
            value={formData.deliveryInstructions}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit/Debit Card</option>
            <option value="cashOnDelivery">Cash on Delivery</option>
            <option value="upi">UPI</option>
          </select>
        </div>
        <div className="form-group">
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms">
            I agree to the terms and conditions.
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
