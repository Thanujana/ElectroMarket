import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Custom CSS
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.png";
import basketIcon from "../../assets/basket_icon.png";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const navigate = useNavigate();

  const handleScroll = (sectionId) => {
    // Check if the user is already on the home page
    if (location.pathname === '/') {
      // Scroll to the section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to home and then scroll to the section
      navigate('/buyer/dashboard');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300); // Delay to ensure page has loaded
    }
    setMenu(sectionId); // Update the active menu item
  };

  const handleNavigation = (route, menuName) => {
    navigate(route); // Navigate to the route
    setMenu(menuName); // Update the active menu item
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
                onClick={() => handleScroll('header-section')}
                
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
          <img
            src={basketIcon}
            alt="Basket"
            className="icon me-3"
            onClick={() => navigate('/cart')} // Add navigation to Cart page
            style={{ cursor: "pointer" }} // Make it visually clear the icon is clickable
          />

          <button
          className="btn btn-sm custom-signin-btn"
           onClick={() => navigate('/role')}
          >
  Login
</button>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
