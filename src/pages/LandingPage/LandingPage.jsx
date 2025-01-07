import React, { useState, useEffect } from "react";
import '../../style/LandingPage.css';

const LandingPage = () => {
  const bannerImages = [
    "/photo1.jpg",
    "/photo2.jpg",
    "/photo3.jpg",
    "/photo4.jpg",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div
        className="hero-banner"
        style={{
          backgroundImage: `url(${bannerImages[currentBanner]})`,
        }}
      >
        <div className="hero-overlay">
          <h1>Welcome to ElectroMart</h1>
          <p>Your one-stop shop for cutting-edge electronics!</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-section">
        <h2>About Us</h2>
        <p>
          ElectroMart is your trusted partner for high-quality electronics. We aim to deliver top-notch products with unbeatable customer service, ensuring a seamless shopping experience for every customer.
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
