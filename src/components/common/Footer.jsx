import React from "react";
import "../../style/Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-start">
          {/* Left Section */}
          <div className="col-md-4">
            <img
              src={assets.logo}
              alt="Electromart Logo"
              className="footer-logo mb-3"
            />
            <p>
              Electromart is your one-stop shop for the latest gadgets and
              electronics. We bring you high-quality products at unbeatable
              prices, ensuring a seamless shopping experience.
            </p>
            <div className="d-flex gap-2 mt-2">
              <img
                src={assets.facebook_icon}
                alt="Facebook"
                className="social-icon"
              />
              <img
                src={assets.twitter_icon}
                alt="Twitter"
                className="social-icon"
              />
              <img
                src={assets.linkedin_icon}
                alt="LinkedIn"
                className="social-icon"
              />
            </div>
          </div>

          {/* Navigation Links Section */}
          <div className="col-md-4 text-center mt-4 mt-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/buyer/dashboard" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/#about" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#contact" className="footer-link">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="col-md-4 text-md-end mt-4 mt-md-0">
            <h5>GET IN TOUCH</h5>
            <ul className="list-unstyled">
              <li>Phone: 0112345664</li>
              <li>Email: contact@electromart.com</li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />
        <p className="text-center mb-0">
          &copy; 2024 Electromart.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
