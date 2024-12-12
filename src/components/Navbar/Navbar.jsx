import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  const [menu, setMenu] = useState('home');

  return (
    <div className="navbar">
      <img src="assets.logo" alt="Logo" className="logo" />

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
        <img src="assets.search_icon" alt="Search" />
        <img src="assets.basket_icon" alt="Basket" />
      </div>
    </div>
  );
};

export default Navbar;
