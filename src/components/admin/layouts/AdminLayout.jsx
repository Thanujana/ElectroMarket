import React from "react";
import Sidebar from "../components/Sidebar"; 

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="flex-grow-1 p-4"
        style={{
          overflowY: "auto",
          backgroundColor: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;