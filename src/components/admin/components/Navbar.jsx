import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const adminName = localStorage.getItem("adminName") || "Admin";

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand">{title}</span>

      <div className="ms-auto d-flex align-items-center">
        {/* 🔔 Notifications */}
        <button className="btn btn-outline-light me-3">
          <i className="bi bi-bell"></i>
        </button>

        {/* 👤 Admin Profile */}
        <div className="dropdown">
          <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <i className="bi bi-person-circle"></i> {adminName}
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/profile">View Profile</a></li>
            <li><a className="dropdown-item" href="/settings">Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
