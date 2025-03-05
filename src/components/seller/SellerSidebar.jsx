import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SellerSidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Example: check authentication status from localStorage or state
    const token = localStorage.getItem("authToken"); // Check if there's a token stored
    setIsAuthenticated(!!token); // If token exists, consider the user authenticated
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear authentication token (or use your logout function here)
      localStorage.removeItem("authToken"); // For example, remove token from localStorage
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 500);
    }
  };

  return (
    <aside
      className="d-flex flex-column vh-100"
      style={{
        width: "250px",
        backgroundColor: "#1E293B",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h4 className="text-center mb-4 text-white fw-bold">Seller Panel</h4>
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink to="/seller/dashboard" className="nav-link text-white">
              <i className="bi bi-bar-chart me-2"></i> Dashboard
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/seller/products" className="nav-link text-white">
              <i className="bi bi-box-seam me-2"></i> My Products
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/seller/add-product" className="nav-link text-white">
              <i className="bi bi-plus-square me-2"></i> Add Product
            </NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li className="nav-item mb-2">
                <NavLink to="/profile" className="nav-link text-white">
                  <i className="bi bi-person-circle me-2"></i> My Account
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <button
                  onClick={handleLogout}
                  className="nav-link text-white bg-danger border-0 w-100 text-start"
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SellerSidebar;
