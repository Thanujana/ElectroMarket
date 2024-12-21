import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear password error when user modifies fields
    if (name === "password" || name === "confirmPassword") {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      const response = await ApiService.registerUser({
        email: formData.email,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      if (response.status === 200) {
        setMessage("User Successfully Registered");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (error) {
      setMessage(error.response?.data.message || error.message || "Unable to register a user");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, rgba(0, 128, 255, 0.7), rgba(0, 255, 128, 0.6))",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "360px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <h2
          className="text-center text-primary mb-4"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Register
        </h2>
        {message && <p className="text-danger text-center">{message}</p>}
        {passwordError && <p className="text-danger text-center">{passwordError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="form-control"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Register
          </button>
                    <p className="text-center mt-3">
            Already have an account?{" "}
            <span
              className="text-decoration-none text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")} // Switch to Login view
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;
