import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Register.css";
import { FaUser, FaEnvelope, FaLock, FaRocket, FaPhone } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone:"",
    role: "buyer",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/auth/register/${formData.role === "buyer" ? "user" : "seller"}`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userName: formData.name, 
            email: formData.email,
            password: formData.password,
        }),
    });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate(`/login?role=${formData.role}`), 2500);
      } else {
        setError(await response.text());
      }
    } catch (err) {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Left Side - Gradient Background with Blur Box */}
        <div className="left-section">
          <FaRocket className="icon" />
          <h2>Welcome</h2>
          <p>Start shopping for your dream electronics today!</p>
          <button className="login-button" onClick={() => navigate("/login")}>Login</button>
        </div>

        {/* Right Side - Form */}
        <div className="right-section">
          <h2>Register Here</h2>

          {success ? (
            <div className="success-message">
              🎉 Registration Successful! Redirecting to {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Login...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <p className="error-message">{error}</p>}

              <div className="form-grid">
                <div className="input-group">
                  <FaUser />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                </div>

                <div className="input-group">
                  <FaEnvelope />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
                </div>

                <div className="input-group">
                <FaPhone />
                  <input type="text" name="phone" placeholder="Your Phone" required />
                </div>

                <div className="input-group">
                  <FaLock />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                </div>

                <div className="input-group">
                <FaLock />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                </div>

                <div className="mb-3">
                <label className="form-label">Register As:</label>
                <select name="role" value={formData.role} onChange={handleChange} className="form-control">
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
</div>

              <button type="submit" className="register-button" disabled={loading}>
                {loading ? "Processing..." : "Register"}
              </button>
            </form>
          )}

          {!success && (
            <p className="login-link" onClick={() => navigate("/login")}>
              Already have an account? Login here
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
