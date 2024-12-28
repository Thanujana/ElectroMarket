import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ width: "250px", height: "100vh", background: "#f4f4f4", padding: "20px" }}>
      <h2>Admin Panel</h2>
      <nav>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/categories">Manage Categories</Link></li>
          <li><Link to="/admin/products">Manage Products</Link></li>
          <li><Link to="/admin/orders">Manage Orders</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
