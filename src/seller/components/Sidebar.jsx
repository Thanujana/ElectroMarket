import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column vh-100 p-3 text-white bg-dark"
      style={{ width: "250px" }}
    >
      <h3 className="text-center mb-4">Seller Menu</h3>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/seller/dashboard" className="nav-link text-white">
            <i className="bi bi-house me-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/seller/products" className="nav-link text-white">
            <i className="bi bi-box me-2"></i> Products
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/seller/products/add" className="nav-link text-white">
            <i className="bi bi-plus-square me-2"></i> Add Product
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/seller/orders" className="nav-link text-white">
            <i className="bi bi-cart me-2"></i> Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/seller/earnings" className="nav-link text-white">
            <i className="bi bi-cash-coin me-2"></i> Earnings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
