import React, { useEffect } from "react";
import { gsap } from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/LandingPage.css";

const LandingPage = () => {
  useEffect(() => {
    // Animations for text elements
    gsap.fromTo(
      ".title-text span",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".subtitle-text",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, delay: 1, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      ".cta-button",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, delay: 1.5, duration: 0.8, ease: "elastic.out(1, 0.5)" }
    );
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="landing-page">
        <div className="container-fluid vh-100 d-flex">
          <div className="content-section d-flex flex-column justify-content-center align-items-start px-5">
            <h1 className="title-text">
              <span>Welcome</span> <span>to</span> <span>ElectroMart</span>
            </h1>
            <p className="subtitle-text mt-3">
              Your one-stop destination for cutting-edge electronics!
            </p>
            <button className="cta-button btn btn-primary btn-lg mt-4">See What's New</button>
          </div>
          <div className="video-section d-flex justify-content-center align-items-center">
            <video
              className="side-video"
              src="/Video_2.mp4"
              autoPlay
              muted
              loop
              playsInline
            ></video>
          </div>
        </div>
      </div>
{/* About Us Section */}
<div className="about-us-section py-5 text-center bg-light">
  <div className="container">
    <h2 className="mb-4">About Us</h2>
    <p className="mb-5">
      Elecshop is one of the largest e-commerce platforms facilitating the
      distribution of electrical, communications, and data networking products.
    </p>
    <div className="row">
      <div className="col-md-4">
        <div className="card about-card shadow-sm">
          <img
            src="https://th.bing.com/th/id/OIP.XlNNMktizHtTNOP026xhLQHaEA?w=654&h=354&rs=1&pid=ImgDetMain"
            alt="What We Really Do"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">What We Really Do</h5>
            <p className="card-text">
              We strive to make customers' lives easier by offering high-quality
              electronic products and solutions tailored to their needs.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card about-card shadow-sm">
          <img
            src="https://thumbs.dreamstime.com/b/business-vision-eye-formed-related-words-d-render-52097564.jpg"
            alt="Our Vision"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">Our Vision</h5>
            <p className="card-text">
              Our vision is to lead the market with innovative products and a
              customer-first approach, setting benchmarks in the e-commerce space.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card about-card shadow-sm">
          <img
            src="https://th.bing.com/th/id/OIP.-0_LR6r9dnVageN_wlVjegHaFj?w=640&h=480&rs=1&pid=ImgDetMain"
            alt="History of Beginning"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">History of Beginning</h5>
            <p className="card-text">
              Established in 2024, Elecshop has built its reputation as a reliable
              platform for all things electronics.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


{/* Contact Us Section */}
<div className="contact-us-section py-5">
  <div className="container">
    <div className="row align-items-center">
      {/* Video Section */}
      <div className="col-md-6 video-section d-flex justify-content-center align-items-center">
        <video
          className="side-video shadow-lg"
          src="/Video_1.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>

      {/* Contact Form */}
      <div className="col-md-6 form-section">
        <h2 className="mb-4">Contact Us</h2>
        <form className="p-4 rounded shadow">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              placeholder="Write your message here"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-gradient">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

</div>
  );
};

export default LandingPage;
