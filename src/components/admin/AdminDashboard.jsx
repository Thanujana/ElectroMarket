import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Add useEffect to fetch data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        console.log("Fetched data:", data); // Log fetched data
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <p>Welcome to the admin dashboard.</p>
      )}
    </div>
  );
};

export default AdminDashboard;