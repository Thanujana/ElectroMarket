import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/navbar.css";
import ApiService from "../../service/ApiService"; 
import logo from "../../assets/logo.png";
import profilePic from "../../assets/profile_icon.png"; // Default profile image

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const isAuthenticated = ApiService.isAuthenticated();

  // ✅ Fetch search suggestions dynamically
  const fetchSuggestions = async (query) => {
    if (query.length > 1) {
      try {
        const response = await axios.get("http://localhost:8080/api/products/suggestions", {
          params: { query },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // ✅ Handle Search Input Change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    fetchSuggestions(value);
  };

  // ✅ Handle Search Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      navigate(`/filter?search=${searchValue}`);
      setSuggestions([]);
    }
  };

  // ✅ Handle Clicking on Suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setSuggestions([]);
    navigate(`/filter?search=${suggestion}`);
  };

  // ✅ Close Dropdown when Clicking Outside
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
          <form className="d-flex search-wrapper me-3" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products"
              value={searchValue}
              onChange={handleSearchChange}
              className="form-control search-input me-2"
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-dropdown">
                {suggestions.map((s, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
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
