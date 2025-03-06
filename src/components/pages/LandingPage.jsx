import React, { useEffect } from "react";
import { gsap } from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../../style/LandingPage.css";
import lottie from "lottie-web";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css"; 
import Slider from "react-slick";

// Import brand logos
import Brand1 from "../../assets/brands/Brand_1.png";
import Brand2 from "../../assets/brands/Brand_2.png";
import Brand3 from "../../assets/brands/Brand_3.png";
import Brand4 from "../../assets/brands/Brand_4.png";
import Brand5 from "../../assets/brands/Brand_5.png";
import Brand6 from "../../assets/brands/Brand_6.png";
import Brand7 from "../../assets/brands/Brand_7.png";
import Brand8 from "../../assets/brands/Brand_8.png";
import Brand9 from "../../assets/brands/Brand_9.png";
import Brand10 from "../../assets/brands/Brand_10.png";
import Brand11 from "../../assets/brands/Brand_11.png";
import Brand12 from "../../assets/brands/Brand_12.png";


const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // GSAP animations
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
      container: document.getElementById("lottie-envelope"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json",
    });
    return () => {
      if (animation) animation.destroy();
    };

  }, []);
  const handleButtonClick = () => navigate("/buyer/dashboard");
  const brandLogos = [
    { src: Brand1, alt: "Brand 1" },
    { src: Brand2, alt: "Brand 2" },
    { src: Brand3, alt: "Brand 3" },
    { src: Brand4, alt: "Brand 4" },
    { src: Brand5, alt: "Brand 5" },
    { src: Brand6, alt: "Brand 6" },
    { src: Brand7, alt: "Brand 7" },
    { src: Brand8, alt: "Brand 8" },
    { src: Brand9, alt: "Brand 9" },
    { src: Brand10, alt: "Brand 10" },
    { src: Brand11, alt: "Brand 11" },
    { src: Brand12, alt: "Brand 12" },
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

  const faqItems = [
    {
      id: "collapseOne",
      header: "Support 24/7",
      body: "We consider every customer need as essential. Each customer contact is regarded as an opportunity to create sustainable business relationships.",
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

  return (
    <div>
    <div className="landing-page">
      {/* Welcome Section */}
      <div className="welcome-section">
        <video
          className="background-video"
          src="/Video_4.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
        <div className="glass-container">
          <h1 className="title-text">
            <span>Welcome</span> <span>to</span> <span>ElectroMart</span>
          </h1>
          <p className="subtitle-text mt-3">
            Your one-stop destination for cutting-edge electronics!
          </p>
          <button
  className="cta-button btn btn-primary btn-lg mt-4"
  onClick={handleButtonClick} // Use the defined handler
>
  See What's New
</button>
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
                    <p className="card-text">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div id="contact" className="contact-us-section py-5 bg-light">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-md-6">
            <h2 className="mb-4 text-dark">Contact Us</h2> {/* Text color updated */}
            <form className="p-4 rounded shadow multi-layer-box">
                <div className="mb-3">
                <label htmlFor="name" className="form-label text-dark">
              Name
            </label>
            <input
              type="text"
              className="form-control input-custom"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-dark">
              Email
            </label>
            <input
              type="email"
              className="form-control input-custom"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label text-dark">
              Message
            </label>
            <textarea
              className="form-control input-custom"
              id="message"
              rows="4"
              placeholder="Write your message here"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-gradient btn-lg w-100">
            Send Message
          </button>
        </form>
      </div>
      <div className="col-md-6 d-flex justify-content-center align-items-center">
  <div id="lottie-envelope" className="lottie-envelope"></div>
</div>

          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section py-5 bg-light">
        <div className="container">
        <div className="section-header text-center mb-5">
      <h2 className="section-title">What can we do for you?</h2>
      <div className="decorative-bar mx-auto"></div> {/* Decorative bar */}
    </div>
          <div className="row align-items-center">
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
            <div className="col-md-6">
  <div className="accordion advanced-accordion" id="faqAccordion">
    {faqItems.map((item, index) => (
      <div className="accordion-item" key={index}>
        <h2 className="accordion-header" id={`heading${index}`}>
          <button
            className="accordion-button collapsed bg-dark text-light" // Dark background and light text
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${item.id}`}
            aria-expanded="false"
            aria-controls={item.id}
          >
            <i className="bi bi-info-circle-fill me-2"></i> {/* Add an icon */}
            {item.header}
          </button>
        </h2>
        <div
          id={item.id}
          className="accordion-collapse collapse"
          aria-labelledby={`heading${index}`}
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body bg-secondary text-light shadow-sm">
            {/* Dark body with light text and shadow */}
            {item.body}
          </div>
        </div>
      </div>
    ))}
  </div>
            </div>
          </div>
        </div>
      </div>
  {/* Brand Logos Section */}
  <div className="brand-logos-section py-5">
        <div className="container text-center">
          <h2 className="mb-4">Our Trusted Brands</h2>
          <Slider
             dots={false}
             infinite={true}
             speed={4000}
             slidesToShow={5}
             slidesToScroll={1}
             autoplay={true}             // Enable autoplay
             autoplaySpeed={5000}        // Set interval to 2000ms (2 seconds)
             arrows={false}  
             pauseOnHover={false}               // Keep navigation arrows
             responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 4 } },
              { breakpoint: 768, settings: { slidesToShow: 3 } },
              { breakpoint: 480, settings: { slidesToShow: 2 } },
            ]}
          >
            {brandLogos.map((logo, index) => (
              <div key={index} className="brand-slide">
                <img src={logo.src} alt={logo.alt} className="brand-logo" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
