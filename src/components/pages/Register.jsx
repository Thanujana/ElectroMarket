import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Register.css";
import { FaUser, FaEnvelope, FaLock, FaRocket, FaPhone, FaStore, FaIdCard } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "buyer",
    shopName: "",
    taxNumber: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  // ✅ Password Validation
  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValid(criteria);
    return Object.values(criteria).every(Boolean);
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // ✅ Phone number validation: Only digits, must be 10 characters, starts with 6-9
    if (name === "phone") {
      if (!/^\d*$/.test(value)) {
        return; // Prevent non-numeric input
      }
      if (value.length > 10) {
        return; // Restrict to 10 digits
      }
    }
    // ✅ Tax Number Validation: Must be alphanumeric, max 15 characters
  if (name === "taxNumber") {
    if (!/^\d*$/.test(value)) return; // Only allow alphanumeric characters
    if (value.length > 15) return; // Limit to 15 characters
  }
  
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    if (name === "password") {
      setShowPasswordRules(true);
      const isValid = validatePassword(value);
      if (isValid) setTimeout(() => setShowPasswordRules(false), 500);
    }
  };
  

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(formData.password)) {
      setError("Password does not meet the required criteria.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ✅ Ensure required seller fields are filled
    if (formData.role === "seller" && (!formData.shopName || !formData.taxNumber)) {
      setError("Shop Name and Tax Number are required for sellers.");
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
          phoneNumber: formData.phone,
          ...(formData.role === "seller" && {
            shopName: formData.shopName,
            taxNumber: formData.taxNumber,
          }),
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate(`/login?role=${formData.role}`), 2500);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Registration failed. Try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Left Section */}
        <div className="left-section">
          <FaRocket className="icon" />
          <h2>Welcome</h2>
          <p>Start shopping for your dream electronics today!</p>
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        {/* Right Section - Registration Form */}
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
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone"
                    required
                  />
                </div>


                {formData.role === "seller" && (
                  <>
                    <div className="input-group">
                      <FaStore />
                      <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} placeholder="Shop Name" required />
                    </div>

                    <div className="input-group">
                      <FaIdCard />
                      <input type="text" name="taxNumber" value={formData.taxNumber} onChange={handleChange} placeholder="Tax Number (GST)" required />
                    </div>
                  </>
                )}

                <div className="input-group">
                  <FaLock />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                </div>

                {/* ✅ Password Validation Messages */}
                {showPasswordRules && !Object.values(passwordValid).every(Boolean) && (
                  <div className="password-validation">
                    <p className={passwordValid.length ? "valid" : "invalid"}>At least 8 characters</p>
                    <p className={passwordValid.uppercase ? "valid" : "invalid"}>One uppercase letter</p>
                    <p className={passwordValid.lowercase ? "valid" : "invalid"}>One lowercase letter</p>
                    <p className={passwordValid.number ? "valid" : "invalid"}>One number</p>
                    <p className={passwordValid.specialChar ? "valid" : "invalid"}>One special character</p>
                  </div>
                )}

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
