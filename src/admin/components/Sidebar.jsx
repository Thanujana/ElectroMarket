import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="d-flex flex-column vh-100 border-end"
      style={{
        width: "250px",
        backgroundColor: "#1E293B", // Sidebar background
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h4
        className="text-center mb-4"
        style={{ fontWeight: "bold", color: "#FFFFFF" }}
      >
        Admin Panel
      </h4>
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `nav-link px-3 py-2 ${
                  isActive ? "text-warning" : "text-white"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `nav-link px-3 py-2 ${
                  isActive ? "text-warning" : "text-white"
                }`
              }
            >
              Manage Categories
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `nav-link px-3 py-2 ${
                  isActive ? "text-warning" : "text-white"
                }`
              }
            >
              Manage Products
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `nav-link px-3 py-2 ${
                  isActive ? "text-warning" : "text-white"
                }`
              }
            >
              Manage Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
