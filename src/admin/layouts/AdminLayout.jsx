import React from "react";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar /> {/* Sidebar always visible */}
      <div
        className="admin-content"
        style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa" }}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
