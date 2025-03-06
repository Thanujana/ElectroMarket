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
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card shadow">
        <div className="card-header bg-dark text-white ">
            <h2 className="card-title">Welcome to the Admin Dashboard</h2>
            <button className="btn btn-light" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left"></i> Back
            </button>
          </div>
          <div className="card-body">
            <p className="card-text">Here’s the latest data:</p>
            <pre className="bg-light p-3 rounded">{JSON.stringify(dashboardData, null, 2)}</pre>
          </div>
          <div className="card-footer text-muted text-center">
          © 2025 ElectroMart Admin
        </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;