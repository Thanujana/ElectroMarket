import React, { useEffect } from "react";
import { gsap } from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../../style/LandingPage.css";
import lottie from "lottie-web";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animations for text elements
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

    const animation = lottie.loadAnimation({
      container: document.getElementById("lottie-envelope"), // Animation container
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json",
    });

    return () => {
      if (animation) animation.destroy(); // Cleanup animation
    };
  }, []);

  const handleButtonClick = () => {
    navigate("/buyer/dashboard");
  };

  const faqItems = [
    {
      id: "collapseOne",
      header: "Support 24/7",
      body: "We consider every customer need as essential. Each customer contact is regarded as an opportunity to create sustainable business relationships. Thus our support is provided via phone, email, and chat 24/7.",
    },
    {
      id: "collapseTwo",
      header: "Best Quality",
      body: "We ensure top-notch quality for all our products, maintaining excellence and reliability.",
    },
    {
      id: "collapseThree",
      header: "Fastest Delivery",
      body: "Our delivery system ensures the fastest and most reliable service to your doorstep.",
    },
    {
      id: "collapseFour",
      header: "Customer Care",
      body: "Our dedicated team is here to assist you with any questions or issues you may encounter.",
    },
  ];

  const aboutUsCards = [
    {
      img: "https://th.bing.com/th/id/OIP.XlNNMktizHtTNOP026xhLQHaEA?w=654&h=354&rs=1&pid=ImgDetMain",
      title: "What We Really Do",
      text: "We strive to make customers' lives easier by offering high-quality electronic products and solutions tailored to their needs.",
    },
    {
      img: "https://thumbs.dreamstime.com/b/business-vision-eye-formed-related-words-d-render-52097564.jpg",
      title: "Our Vision",
      text: "Our vision is to lead the market with innovative products and a customer-first approach, setting benchmarks in the e-commerce space.",
    },
    {
      img: "https://th.bing.com/th/id/OIP.-0_LR6r9dnVageN_wlVjegHaFj?w=640&h=480&rs=1&pid=ImgDetMain",
      title: "History of Beginning",
      text: "Established in 2024, Elecshop has built its reputation as a reliable platform for all things electronics.",
    },
  ];

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
            <button
              className="cta-button btn btn-primary btn-lg mt-4"
              onClick={handleButtonClick}
            >
              See What's New
            </button>
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
      <div id="about" className="about-us-section py-5 text-center bg-light">
        <div className="container">
          <h2 className="mb-4">About Us</h2>
          <p className="mb-5" style={{ fontSize: "18px" }}>
            Elecshop is one of the largest e-commerce platforms facilitating the
            distribution of electrical, communications, and data networking products.
          </p>
          <div className="row">
            {aboutUsCards.map((card, index) => (
              <div className="col-md-4" key={index}>
                <div className="card about-card shadow-sm">
                  <img src={card.img} alt={card.title} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text" style={{ fontSize: "16px" }}>
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div id="contact" className="contact-us-section py-5">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-md-6">
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
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-gradient"
                >
                  Send Message
                </button>
              </form>
            </div>
            {/* Lottie Animation */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <div id="lottie-envelope" className="lottie-envelope"></div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section with Video */}
      <div className="faq-section py-5">
        <div className="container">
          <h2 className="mb-4 text-center">What can we do for you?</h2>
          <div className="row align-items-center">
            {/* Video Section */}
            <div className="col-md-6">
              <video
                className="side-video rounded shadow w-100"
                src="/Video_1.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            {/* FAQ Section */}
            <div className="col-md-6">
              <div className="accordion" id="faqAccordion">
                {faqItems.map((item, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${item.id}`}
                        aria-expanded="false"
                        aria-controls={item.id}
                      >
                        {item.header}
                      </button>
                    </h2>
                    <div
                      id={item.id}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
