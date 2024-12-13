import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Custom CSS
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.png";
import basketIcon from "../../assets/basket_icon.png";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');

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
                className={`nav-link ${menu === 'home' ? 'active-link' : ''}`}
                href="#"
                onClick={() => setMenu('home')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${menu === 'menu' ? 'highlight-link' : ''}`}
                href="#"
                onClick={() => setMenu('menu')}
              >
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${menu === 'mobile-app' ? 'highlight-link' : ''}`}
                href="#"
                onClick={() => setMenu('mobile-app')}
              >
                Mobile App
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${menu === 'contact-us' ? 'active-link' : ''}`}
                href="#"
                onClick={() => setMenu('contact-us')}
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
