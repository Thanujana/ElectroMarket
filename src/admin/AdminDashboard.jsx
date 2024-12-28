import React from "react";
import Sidebar from "./components/Sidebar";

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Admin Dashboard</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          <div style={{ background: "#007bff", color: "#fff", padding: "20px", borderRadius: "8px" }}>
            <h3>Total Categories</h3>
            <p>10</p>
          </div>
          <div style={{ background: "#28a745", color: "#fff", padding: "20px", borderRadius: "8px" }}>
            <h3>Total Products</h3>
            <p>50</p>
          </div>
          <div style={{ background: "#ffc107", color: "#fff", padding: "20px", borderRadius: "8px" }}>
            <h3>Total Orders</h3>
            <p>120</p>
          </div>
          <div style={{ background: "#dc3545", color: "#fff", padding: "20px", borderRadius: "8px" }}>
            <h3>Total Sales</h3>
            <p>$5000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
