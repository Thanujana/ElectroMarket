import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
    postalCode: "",
    deliveryInstructions: "",
    paymentMethod: "",
  });

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to Order Confirmation with the formData
    navigate("/order-confirmation", { state: { formData } });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Place Your Order</h1>
      <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postalCode" className="form-label">
            Postal Code
          </label>
          <input
            type="text"
            className="form-control"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deliveryInstructions" className="form-label">
            Delivery Instructions (Optional)
          </label>
          <textarea
            className="form-control"
            id="deliveryInstructions"
            name="deliveryInstructions"
            rows="3"
            value={formData.deliveryInstructions}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
            name="terms"
            required
          />
          <label htmlFor="terms" className="form-check-label">
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
