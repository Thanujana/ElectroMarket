import React from "react";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: "#F8F9FA", // Light background for content
          minHeight: "100vh", // Full height
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
