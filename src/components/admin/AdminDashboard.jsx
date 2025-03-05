import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect if not logged in
    } else if (userRole !== "ROLE_ADMIN") {
      // Redirect unauthorized users
      if (userRole === "ROLE_BUYER") navigate("/buyer/dashboard");
      else if (userRole === "ROLE_SELLER") navigate("/seller/dashboard");
    }
  }, [token, userRole, navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
    </div>
  );
};

export default AdminDashboard;
