import React, { useState, useEffect, useRef } from "react";
import "../../style/navbar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService"; 
import logo from "../../assets/logo.png";
import profilePic from "../../assets/profile_icon.png"; // Default profile image

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current page URL
  const isAuthenticated = ApiService.isAuthenticated();
  const dropdownRef = useRef(null);

  // ✅ Handle search input change (navigate only if typing)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // ✅ Navigate to `/filter` ONLY when user starts typing (but NOT when deleting)
    if (value.trim() !== "" && location.pathname !== "/filter") {
      navigate("/filter");
    }
  };

  // ✅ Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        
        {/* 🔵 Brand Logo */}
        <div className="navbar-brand">
          <NavLink to="/buyer/dashboard">
            <img src={logo} alt="Electro Mart" className="logo" />
          </NavLink>
        </div>

        {/* 📱 Mobile Navbar Toggler */}
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

        {/* 🔗 Navbar Links */}
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

          {/* 🔍 Search Bar */}
          <form className="d-flex search-wrapper me-3">
            <input
              type="text"
              placeholder="Search products"
              value={searchValue}
              onChange={handleSearchChange}
              className="form-control search-input me-2"
            />
          </form>

          {/* 🔑 Show Login Button if Not Logged In */}
          {!isAuthenticated && (
            <NavLink to="/role" className="custom-login-btn">
              Login
            </NavLink>
          )}

          {/* 👤 Profile Dropdown (Only if Logged In) */}
          {isAuthenticated && (
            <div className="nav-item dropdown" ref={dropdownRef}>
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
                    <button className="dropdown-item text-danger" onClick={() => ApiService.logout()}>
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
