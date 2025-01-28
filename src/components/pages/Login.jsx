import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get("role") || "buyer"; // Default role: buyer
  const sideImage = role === "admin" ? "/Seller.jpg" : "/Buyer.jpg"; // Dynamic image based on role

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const { token } = await response.json(); // Get JWT token
        localStorage.setItem("authToken", token); // Save token to localStorage
  
        // Decode the JWT token to get the user role
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode base64 payload
        const userRole = decodedToken.roles.includes("ROLE_ADMIN") ? "admin" : "buyer";
  
        // Navigate to the appropriate dashboard
        navigate(userRole === "admin" ? "/admin/dashboard" : "/buyer/dashboard");
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };
  
  
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row shadow-lg rounded overflow-hidden" style={{ width: "900px", height: "550px" }}>
        {/* Left Side Image */}
        <div
          className="col-md-6 d-none d-md-block"
          style={{
            backgroundImage: `url(${sideImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right Side Login Form */}
        <div className="col-md-6 bg-white p-5">
          <h2 className="text-center mb-4">Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-danger text-center">{error}</p>}
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
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <span
              onClick={() => navigate(`/register?role=${role}`)}
              style={{ cursor: "pointer", color: "#007bff" }}
            >
              Register as {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
