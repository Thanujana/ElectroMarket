import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const photos = [
    "/photo1.jpg",
    "/photo2.jpg",
    "/photo3.jpg",
    "/photo4.jpg",
  ]; // Array of image URLs

  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * photos.length);
      console.log("Current photo path:", photos[randomIndex]); // Debugging log
      setCurrentPhoto(randomIndex);
    }, 3000);
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="landing-page">
      {/* Background Image */}
      <div
        className="photo-banner"
        style={{
          backgroundImage: `url(${photos[currentPhoto]})`,
        }}
      >
        <div className="photo-overlay">
          <header className="landing-header">
            <h1>Welcome to ElectroMart</h1>
            <p>Your one-stop destination for buyers and sellers.</p>
          </header>
        </div>
      </div>

      <div className="container text-center mt-5">
        <div className="row">
          {/* Buyer Section */}
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h2>For Buyers</h2>
                <p>Discover the best deals on the latest electronics.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/role")}
                >
                  Continue as Buyer
                </button>
              </div>
            </div>
          </div>

          {/* Seller Section */}
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h2>For Sellers</h2>
                <p>Grow your business by reaching a wide customer base.</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/role")}
                >
                  Continue as Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
