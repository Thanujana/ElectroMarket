import React from "react";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to ElectroMart</h1>
        <p>Your one-stop destination for buyers and sellers.</p>
      </header>

      <section className="features-section">
        <div className="feature">
          <h2>For Buyers</h2>
          <p>Explore the latest gadgets and enjoy seamless shopping experiences.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/buyer/dashboard")}
          >
            Explore as Buyer
          </button>
        </div>

        <div className="feature">
          <h2>For Sellers</h2>
          <p>Manage your inventory, track orders, and grow your business efficiently.</p>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/seller/dashboard")}
          >
            Explore as Seller
          </button>
        </div>
      </section>

      <section className="advanced-features">
        <h2>Why Choose ElectroMart?</h2>
        <div className="advanced-feature-item">
          <h3>For Buyers:</h3>
          <ul>
            <li>Wide range of electronics at unbeatable prices.</li>
            <li>Secure payment options and fast delivery.</li>
            <li>Personalized recommendations tailored to your needs.</li>
          </ul>
        </div>
        <div className="advanced-feature-item">
          <h3>For Sellers:</h3>
          <ul>
            <li>Advanced analytics to track sales and performance.</li>
            <li>Access to a wide customer base.</li>
            <li>Easy tools for managing products and orders.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
