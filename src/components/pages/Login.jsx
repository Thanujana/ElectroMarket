import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../style/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ✅ Extract the selected role from the URL query parameter
  const queryRole = new URLSearchParams(location.search).get("role") || "buyer"; 

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Dynamically set API endpoint based on role from URL
      let apiEndpoint = "http://localhost:8080/api/auth/login"; // Default for buyers & sellers
      if (queryRole === "admin") {
        apiEndpoint = "http://localhost:8080/api/admins/login"; // Admin login API
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Invalid credentials";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Login Response:", data); // Debugging

      const { token, role, userId } = data;

      if (!userId) {
        throw new Error("User ID is missing in the response.");
      }

      // ✅ Store token, role, and user ID
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", userId);

      setSuccess(true);

      console.log("User Role:", role);

      setTimeout(() => {
        if (role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else if (role === "ROLE_SELLER") {
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

  return (
    <div className="login-container">
      <div className="login-box">
        {isForgotPassword ? (
          <>
            <h2 className="forgot-title">Forgot Password?</h2>
            <p className="forgot-description">Enter your email, and we'll send you a reset link.</p>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form>
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
            <h2>LOGIN ({queryRole.toUpperCase()})</h2>

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
