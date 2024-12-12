import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Discover Your Favorite Electronics Today!</h2>
        <p>
          Shop the latest gadgets, electronics, and accessories at unbeatable prices. Whether
          you're looking for cutting-edge smartphones, high-quality audio gear, or must-have home
          appliances, we've got you covered. Start exploring now!
        </p>
        <button>View Menu</button>
      </div>
      <img src="/header_img.png" alt="Electronics" className="header-image" />
    </div>
  );
};

export default Header;
