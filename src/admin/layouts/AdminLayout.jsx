import React from "react";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div
      className="d-flex"
      style={{
        height: "100vh", // Full viewport height
        overflow: "hidden", // Prevent extra scrollbars
      }}
    >
      <Sidebar />
      <div
        className="flex-grow-1 p-4"
        style={{
          overflowY: "auto", // Allow vertical scrolling for content
          backgroundColor: "#F8FAFC", // Light background for the content area
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
