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

  const [errors, setErrors] = useState({});

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // ✅ Clear errors when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ Validation Function
  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    } else if (!/^\d{5,6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Invalid postal code.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ Return true if no errors
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        console.error("❌ Validation Failed");
        return;
    }

    const authToken = localStorage.getItem("authToken");

    // ✅ Check if token is missing
    if (!authToken) {
        alert("⚠️ Authentication required! Please log in.");
        navigate("/login"); // Redirect user to login page
        return;
    }

    const orderData = {
        userId: localStorage.getItem("userId"),
        items: cartItems?.map((item) => ({
            productId: item.id,
            name: item.name,
            imageUrl: item.image,
            price: item.price,
            quantity: item.quantity,
        })) || [],
        totalAmount: cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0,
        shippingAddress: { ...formData },
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/place`, orderData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 201 && response.data) {
            alert("✅ Order Placed Successfully!");
            navigate("/order-confirmation", { state: { order: response.data } });

            // ✅ Clear cart after order is placed
            localStorage.removeItem("cartItems");
            window.dispatchEvent(new Event("cartUpdated"));
        } else {
            console.error("❌ Unexpected API response", response);
            alert("⚠️ Something went wrong. Please try again.");
        }
    } catch (error) {
        console.error("❌ Error placing order:", error);

        // ✅ Specific handling for 403 error
        if (error.response?.status === 403) {
            alert("⚠️ Access Denied: Your session may have expired. Please log in again.");
            localStorage.removeItem("authToken"); // Remove expired token
            navigate("/login"); // Redirect to login
        } else {
            alert("⚠️ Failed to place order. Please try again.");
        }
    }
};



  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Place Your Order</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label>Full Name:</label>
          <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
          {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
        </div>

        <div className="mb-3">
          <label>Address:</label>
          <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
          {errors.address && <p className="text-danger">{errors.address}</p>}
        </div>

        <div className="mb-3">
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" className="form-control" value={formData.phoneNumber} onChange={handleChange} required />
          {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
        </div>

        <div className="mb-3">
          <label>Email:</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <label>Postal Code:</label>
          <input type="text" name="postalCode" className="form-control" value={formData.postalCode} onChange={handleChange} required />
          {errors.postalCode && <p className="text-danger">{errors.postalCode}</p>}
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
