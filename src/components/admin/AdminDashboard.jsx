import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null); // Add state for fetched data

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        setDashboardData(data); // Update state with fetched data
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
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <p>Welcome to the admin dashboard.</p>
          <pre>{JSON.stringify(dashboardData, null, 2)}</pre> {/* Display fetched data */}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;