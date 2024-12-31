import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ role }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock validation: Simulate role-specific login
      const savedUserData = JSON.parse(localStorage.getItem(`${role.toLowerCase()}Data`));
      if (
        savedUserData &&
        savedUserData.email === formData.email &&
        savedUserData.password === formData.password
      ) {
        setMessage(`Login successful as ${role}!`);
        setTimeout(() => navigate(`/${role.toLowerCase()}/dashboard`), 2000); // Redirect based on role
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      setMessage("An error occurred during login.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: role === "Seller"
          ? "linear-gradient(135deg, rgba(255, 102, 0, 0.7), rgba(255, 51, 153, 0.6))"
          : "linear-gradient(135deg, rgba(0, 102, 255, 0.7), rgba(0, 255, 102, 0.6))",
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className={`text-center mb-4 ${role === "Seller" ? "text-warning" : "text-primary"}`}>
          Login as {role}
        </h2>
        {message && <p className="text-danger text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
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
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={`btn w-100 ${role === "Seller" ? "btn-warning" : "btn-primary"}`}
          >
            Login
          </button>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <span
              className={`text-${role === "Seller" ? "warning" : "primary"}`}
              onClick={() => navigate(`/register/${role.toLowerCase()}`)}
              style={{ cursor: "pointer" }}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
