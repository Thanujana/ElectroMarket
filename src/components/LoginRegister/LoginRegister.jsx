import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login", "register", or "forgotPassword"

  const sideImage = role === "seller" ? "/Seller.jpg" : "/Buyer.jpg";

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="row shadow rounded" style={{ width: "900px", height: "550px" }}>
        {/* Left Side Image Section */}
        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center"
          style={{
            backgroundImage: `url(${sideImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
          }}
        >
          <div className="text-white text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <h3>{role === "seller" ? "Sell with Confidence" : "Shop with Ease"}</h3>
            <p>
              {role === "seller"
                ? "Join us to showcase your products and reach a wider audience."
                : "Sign up now to explore a variety of products tailored for you."}
            </p>
          </div>
        </div>

        {/* Right Side Form Section */}
        <div
          className="col-md-6 bg-white p-4"
          style={{
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <h2 className="text-center mb-4">
            {mode === "login" && `Login as ${role}`}
            {mode === "register" && `Register as ${role}`}
            {mode === "forgotPassword" && "Forgot Password"}
          </h2>

          {/* Toggle Buttons */}
          {mode !== "forgotPassword" && (
            <div className="d-flex justify-content-center mb-4">
              <button
                className="btn me-2"
                onClick={() => setMode("login")}
                style={{
                  backgroundColor: mode === "login" ? "#003366" : "#f8f9fa",
                  color: mode === "login" ? "#fff" : "#000",
                  border: "1px solid #003366",
                }}
              >
                Login
              </button>
              <button
                className="btn ms-2"
                onClick={() => setMode("register")}
                style={{
                  backgroundColor: mode === "register" ? "#003366" : "#f8f9fa",
                  color: mode === "register" ? "#fff" : "#000",
                  border: "1px solid #003366",
                }}
              >
                Register
              </button>
            </div>
          )}

          {/* Form Rendering Based on Mode */}
          {mode === "login" && <LoginForm role={role} navigate={navigate} setMode={setMode} />}
          {mode === "register" && <RegisterForm role={role} navigate={navigate} />}
          {mode === "forgotPassword" && <ForgotPasswordForm navigate={navigate} />}
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ role, navigate, setMode }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Retrieve saved data from localStorage for the selected role
    const savedData = JSON.parse(localStorage.getItem(`${role}Data`));
  
    // Check if credentials match the saved data
    if (savedData?.email === formData.email && savedData?.password === formData.password) {
      // Navigate based on the role
      if (role === "buyer") {
        navigate("/buyer/dashboard"); // Navigate to Home for buyers
      } else if (role === "seller") {
        navigate("/admin/dashboard"); // Navigate to AdminDashboard for sellers
      }
    } else {
      // Show error message for invalid credentials
      setError("Invalid email or password.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-danger text-center">{error}</p>}
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
      <div className="d-flex justify-content-between mb-3">
        <div>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" className="ms-2">
            Remember me
          </label>
        </div>
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setMode("forgotPassword")}
        >
          Forgot Password?
        </span>
      </div>
      <button type="submit" className="btn btn-dark w-100">
        Login
      </button>
    </form>
  );
};

const RegisterForm = ({ role, navigate }) => {
  const [formData, setFormData] = useState({ email: "", name: "", password: "", confirmPassword: "" });
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
    localStorage.setItem(`${role}Data`, JSON.stringify(formData));
    setSuccess("Registration successful! Please login with your username and password.");
    setTimeout(() => {
      navigate(`/login/${role}`);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-danger text-center">{error}</p>}
      {success && <p className="text-success text-center">{success}</p>}
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
        <label>Name:</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
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
      <div className="mb-3">
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-dark w-100 text-white">
        Register
      </button>
    </form>
  );
};

const ForgotPasswordForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Password reset link has been sent to your email.");
    console.log("Forgot Password Email:", email);
    // Simulate API call or navigate back to login
    setTimeout(() => {
      navigate("/login/${role}"); // Or `/login/seller`
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <p className="text-success text-center">{message}</p>}
      <div className="mb-3">
        <label>Email Address:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-dark w-100">
        Submit
      </button>
    </form>
  );
};

export default LoginRegister;
