import React from 'react';
import './Header.css';
import sideImage from '/header_img.png'; // Replace with your side image path
import bgImage from '/bg_image.jpg'; // Replace with your background image path

const Header = () => {
  return (
    <header
      className="header-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Glass Effect Card */}
      <div className="glass-card">
        <div className="glass-content">
          <h1 className="glass-title">Shop the Future of Electronics Today!</h1>
          <p className="glass-description">
          Explore the ultimate destination for cutting-edge electronics -all in one seamless online marketplace.
          </p>
          <button className="glass-button"onClick={() => document.getElementById('explore-category').scrollIntoView({ behavior: 'smooth' })}>
            Explore Now
          </button>

        </div>

        {/* Side Image Inside Glass */}
        <div className="glass-side-image">
          <img src={sideImage} alt="Electronics Display" />
        </div>
      </div>
    </header>
  );
};

export default Header;
