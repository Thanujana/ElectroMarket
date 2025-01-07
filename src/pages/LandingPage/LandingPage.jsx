import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero-banner">
        {/* Video Background */}
        <video
          className="hero-video"
          src="/Video_2.mp4"
          autoPlay
          muted
          loop
        ></video>

        <div className="hero-overlay text-center text-white">
          <h1 className="display-4 fw-bold">Welcome to ElectroMart</h1>
          <p className="lead">Your one-stop shop for cutting-edge electronics!</p>
          <button className="btn btn-danger btn-lg mt-3">Shop Now</button>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us text-center py-5 bg-light">
        <div className="container">
          <h2 className="mb-4">About Us</h2>
          <p className="lead">
            ElectroMart is one of the largest e-commerce platforms, facilitating
            the distribution of electrical, communication, and data networking
            products across the country. We ensure reliability, quality, and
            exceptional service in everything we offer.
          </p>
        </div>
      </div>

      {/* Core Sections */}
      <div className="core-sections py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <h3 className="card-title">What We Really Do?</h3>
                  <p className="card-text">
                    Making our customers' lives easier is our primary goal. We are
                    committed to understanding and satisfying their needs. By
                    partnering with reputable manufacturers, we provide
                    top-quality products and solutions across industries.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <h3 className="card-title">Our Vision</h3>
                  <p className="card-text">
                    ElectroMart is an independent, family-owned e-commerce platform.
                    We aim to maintain leadership in the electrical and technology
                    market by staying committed to our customers, partners, and team.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <h3 className="card-title">History of Beginning</h3>
                  <p className="card-text">
                    Since its inception in 2018, ElectroMart has grown from a small
                    startup to a trusted provider of electronics and technology
                    products. Our journey reflects innovation, customer focus, and
                    relentless dedication to quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
