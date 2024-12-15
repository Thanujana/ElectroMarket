import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Custom CSS
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.png";
import basketIcon from "../../assets/basket_icon.png";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');

  const handleScroll = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setMenu(sectionId); // Update menu state
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Logo" className="logo me-2" />
        </a>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <a
                className={`nav-link ${menu === 'header-section' ? 'active' : ''}`}
                onClick={() => handleScroll('header-section')} // Scroll to Header
              >
                Home
              </a>
            </li>
            {/* Menu Navigation */}
            <li className="nav-item">
              <a
                className={`nav-link ${menu === 'explore-category' ? 'active' : ''}`}
                onClick={() => handleScroll('explore-category')} // Scroll to Explore Categories
              >
                Menu
              </a>
            </li>
            {/* Mobile App Navigation */}
            <li className="nav-item">
              <a
                className={`nav-link ${menu === 'app-download' ? 'active' : ''}`}
                onClick={() => handleScroll('app-download')} // Scroll to App Download
              >
                Mobile App
              </a>
            </li>
            {/* Contact Us Navigation */}
            <li className="nav-item">
              <a
                className={`nav-link ${menu === 'footer-section' ? 'active' : ''}`}
                onClick={() => handleScroll('footer-section')} // Scroll to Footer
              >
                Contact Us
              </a>
            </li>
          </ul>
          <div className="search-wrapper d-flex align-items-center me-3">
            <input
              type="text"
              placeholder="Search here..."
              className="form-control search-input"
            />
            <img src={searchIcon} alt="Search" className="icon search-icon" />
          </div>
          <img src={basketIcon} alt="Basket" className="icon me-3" />
          <button
          className="btn btn-sm custom-signin-btn"
           onClick={() => setShowLogin(true)}
          >
  Sign In
</button>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
