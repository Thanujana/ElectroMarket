import React from "react";
import SellerSidebar from "../SellerSidebar"; // Adjusted path

const SellerLayout = ({ children }) => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SellerSidebar />
      <div
        className="flex-grow-1 p-4"
        style={{
          overflowY: "auto",
          backgroundColor: "#F8FAFC",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SellerLayout;
