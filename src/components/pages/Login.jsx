import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../style/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryRole = new URLSearchParams(location.search).get("role") || "buyer"; // Default role

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [resetEmail, setResetEmail] = useState(""); // Email for password reset
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggle for forgot password form

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          requestedRole: queryRole, // Role from URL parameter
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Invalid credentials");
      }

      const { token, role: serverRole, userId } = await response.json();

      if (!userId) {
        throw new Error("User ID is missing in the response.");
      }

      // ✅ Use Role from Backend, NOT from URL to prevent manipulation
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", serverRole);
      localStorage.setItem("userId", userId);

      setSuccess(true);

      setTimeout(() => {
        if (serverRole === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else if (serverRole === "ROLE_SELLER") {
          navigate("/seller/dashboard");
        } else {
          navigate("/buyer/dashboard");
        }
      }, 1500);
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (response.ok) {
        setSuccess("A password reset link has been sent to your email.");
      } else {
        setError("Failed to send reset link. Please check your email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {isForgotPassword ? (
          <>
            <h2 className="forgot-title">Forgot Password?</h2>
            <p className="forgot-description">Enter your email address, and we'll send you a reset link.</p>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="back-to-login" onClick={() => setIsForgotPassword(false)}>
              Back to Login
            </p>
          </>
        ) : (
          <>
            <h2>LOGIN</h2>

            {success && <div className="alert alert-success">Login Successful! Redirecting...</div>}
            {error && <p className="text-danger text-center">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Email Address"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                  required
                  disabled={loading}
                />
              </div>

              <div className="remember-forgot">
                <label>
                  <input type="checkbox" disabled={loading} /> Remember me
                </label>
                <span className="forgot-password" onClick={() => setIsForgotPassword(true)}>
                  Forgot Password?
                </span>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Logging in..." : "LOGIN"}
              </button>
            </form>

            <p className="register-link" onClick={() => navigate(`/register?role=${queryRole}`)}>
              Don't have an account? Register here
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
