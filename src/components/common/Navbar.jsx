import React, { useState } from "react";
import "../../style/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService"; 
import logo from "../../assets/logo.png";
import profilePic from "../../assets/profile_icon.png"; // Default profile image

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = ApiService.isAuthenticated(); 

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchValue}`);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
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
            <li className="nav-item">
              <NavLink to="/buyer/dashboard" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">Cart</NavLink>
            </li>
          </ul>

          {/* Search Form - Appears Before Profile/Login */}
          <form className="d-flex search-wrapper me-3" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products"
              value={searchValue}
              onChange={handleSearchChange}
              className="form-control search-input me-2"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

          {/* If User is Not Logged In, Show Login Button */}
          {!isAuthenticated && (
            <NavLink to="/role" className="custom-login-btn">
            Login
          </NavLink>
          
          )}

          {/* Profile Dropdown - Only If User is Logged In */}
          {isAuthenticated && (
            <div className="nav-item dropdown">
              <div
                className="nav-link profile-wrapper"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ cursor: "pointer" }}
              >
                <img src={profilePic} alt="Profile" className="profile-pic" />
              </div>
              {dropdownOpen && (
                <ul className="dropdown-menu show">
                  <li>
                    <NavLink to="/profile" className="dropdown-item">Account</NavLink>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
