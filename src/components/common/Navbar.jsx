import React, { useState } from "react";
import '../../style/navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService"; // Ensure the service exists
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // Check if the user is authenticated
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
        navigate("/role");
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
            {/* Default Links */}
            <li className="nav-item">
              <NavLink to="/buyer/dashboard" className="nav-link">
                Home
              </NavLink>
              </li>
              <li className="aboutus-item">
              <NavLink to="/" className="nav-link">
                AboutUs
              </NavLink>
            </li>
            {!isAuthenticated && (
              <li className="nav-item">
                <NavLink to="/role" className="nav-link">
                  Login
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                Cart
              </NavLink>
            </li>

            {/* Authenticated Links */}
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-link bg-danger text-white"
                    style={{
                      border: "none",
                      cursor: "pointer",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
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
