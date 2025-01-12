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

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem(`${role}Data`)); // Fetch data based on role

    if (storedData?.email === formData.email && storedData?.password === formData.password) {
      const userWithRole = { ...storedData, role }; // Ensure role is present
      localStorage.setItem("userData", JSON.stringify(userWithRole)); // Save userData
      navigate("/profile");
    } else {
      setError("Invalid email or password.");
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
