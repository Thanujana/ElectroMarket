import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const { role } = useParams(); // Extract role (buyer/seller) from URL
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register

  return (
    <div>
      <h1>{isLogin ? `Login as ${role}` : `Register as ${role}`}</h1>
      <button onClick={() => setIsLogin(true)}>Login</button>
      <button onClick={() => setIsLogin(false)}>Register</button>
      {isLogin ? <LoginForm role={role} navigate={navigate} /> : <RegisterForm role={role} navigate={navigate} />}
    </div>
  );
};

const LoginForm = ({ role, navigate }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedData = JSON.parse(localStorage.getItem(`${role}Data`));
    if (savedData?.email === formData.email && savedData?.password === formData.password) {
      navigate(`/${role}/dashboard`);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

const RegisterForm = ({ role, navigate }) => {
  const [formData, setFormData] = useState({ email: "", name: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

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
    navigate(`/login/${role}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      <label>Confirm Password:</label>
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default LoginRegister; // Ensure this line is present
