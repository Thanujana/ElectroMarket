import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: "250px", height: "100vh", background: "#f4f4f4", padding: "20px" }}>
      <h3>Seller Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/seller/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/seller/products">Products</Link>
        </li>
        <li>
          <Link to="/seller/products/add">Add Product</Link>
        </li>
        <li>
          <Link to="/seller/orders">Orders</Link>
        </li>
        <li>
          <Link to="/seller/earnings">Earnings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
