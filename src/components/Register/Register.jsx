import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get("role") || "buyer"; // Default to buyer
  const sideImage = role === "admin" ? "/Seller.jpg" : "/Buyer.jpg"; // Dynamic side image

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    const userData = {
      ...formData,
      role, // Ensure role is saved
    };
  
    localStorage.setItem(`${role}Data`, JSON.stringify(userData)); // Save user data
    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => {
      navigate(`/login?role=${role}`);
    }, 1000);
  };
  

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row shadow-lg rounded overflow-hidden" style={{ width: "900px", height: "650px" }}>
        {/* Left Side Image */}
        <div
          className="col-md-6 d-none d-md-block"
          style={{
            backgroundImage: `url(${sideImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right Side Registration Form */}
        <div className="col-md-6 bg-white p-5">
          <h2 className="text-center mb-4">Register as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">{success}</p>}
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <span
              onClick={() => navigate(`/login?role=${role}`)}
              style={{ cursor: "pointer", color: "#007bff" }}
            >
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
