import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.png";
import basketIcon from "../../assets/basket_icon.png";


const Navbar = () => {
  const [menu, setMenu] = useState('home');

  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="logo" />

      <ul className="navbar-menu">
        <li
          className={menu === 'home' ? 'active' : ''}
          onClick={() => setMenu('home')}
        >
          Home
        </li>
        <li
          className={menu === 'menu' ? 'active' : ''}
          onClick={() => setMenu('menu')}
        >
          Menu
        </li>
        <li
          className={menu === 'mobile-app' ? 'active' : ''}
          onClick={() => setMenu('mobile-app')}
        >
          Mobile App
        </li>
        <li
          className={menu === 'contact-us' ? 'active' : ''}
          onClick={() => setMenu('contact-us')}
        >
          Contact Us
        </li>
      </ul>

      <div className="navbar-right">
        <img src={searchIcon} alt="Search" />
        <img src={basketIcon} alt="Basket" />
        <button className="sign-in-button" onClick={() => alert('Sign In Clicked!')}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
