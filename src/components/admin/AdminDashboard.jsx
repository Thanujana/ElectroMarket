import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {loading ? (
        <p>Loading dashboard...</p> // Show loading message
      ) : (
        <p>Welcome to the admin dashboard.</p>
      )}
    </div>
  );
};

export default AdminDashboard;