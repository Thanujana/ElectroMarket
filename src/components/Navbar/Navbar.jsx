import React, { useState } from "react";
import '../../style/navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService"; // Ensure the service file exists and has the required methods
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const isAdmin = ApiService.isAdmin();
  const isAuthenticated = ApiService.isAuthenticated();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchValue}`);
  };

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      ApiService.logout();
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <NavLink to="/buyer/dashboard">
            <img src={logo} alt="Electro Mart" className="logo" />
          </NavLink>
        </div>

        {/* Navbar Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/buyer/dashboard" className="nav-link">
                Home
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link">
                  My Account
                </NavLink>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="adminDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                  <li>
                    <NavLink to="/admin/categories" className="dropdown-item">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/orders" className="dropdown-item">
                      Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/products" className="dropdown-item">
                      Products
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <NavLink to="/role" className="nav-link">
                  Login
                </NavLink>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink to="/" onClick={handleLogout} className="nav-link">
                  Logout
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                Cart
              </NavLink>
            </li>
          </ul>

          {/* Search Form */}
          <form className="d-flex search-wrapper" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products"
              value={searchValue}
              onChange={handleSearchChange}
              className="form-control search-input me-2"
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
