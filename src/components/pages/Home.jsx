import React, { useState, useEffect, useContext } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/Home.css"; 
import { StoreContext } from "../Context/StoreContext";
import { category_list } from "../../assets/assets";
import sideImage from "/header_img.png";
import bgImage from "/bg_image.jpg";

const API_BASE_URL = "http://localhost:8080/api/products/product"; // Backend API


const Home = () => {
  const [topItems, setTopItems] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [bigDeals, setBigDeals] = useState([]);
  const navigate = useNavigate();

  // 🔹 Check User Role Before Rendering
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      navigate("/login"); // Redirect if user is not logged in
    } else if (userRole !== "ROLE_BUYER") {
      // Redirect sellers/admins to their respective dashboards
      if (userRole === "ROLE_SELLER") navigate("/seller/dashboard");
      else if (userRole === "ROLE_ADMIN") navigate("/admin/dashboard");
    }
  }, [navigate]);

  // Fetch products from backend
  const fetchProducts = async (type, setState) => {
    try {
      const response = await axios.get(`${API_BASE_URL}?type=${type}`);
      setState(response.data);
    } catch (error) {
      console.error(`❌ Error fetching ${type} products:`, error);
    }
  };

  const handleCategoryClick = (item) => {
    navigate(`/categories/${item.category_name}`);
  };

  useEffect(() => {
    fetchProducts("top-picks", setTopItems);
    fetchProducts("flash-sale", setFlashSales);
    fetchProducts("big-deals", setBigDeals);
  }, []);

  return (
    <div>
      {/* Header Section */}
      <header
        id="header-section"
        className="header-container"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Glass Effect Card */}
        <div className="glass-card">
          <div className="glass-content">
            <h1 className="glass-title">Shop the Future of Electronics Today!</h1>
            <p className="glass-description">
              Explore the ultimate destination for cutting-edge electronics - all in one seamless online marketplace.
            </p>
            <button
              className="glass-button"
              onClick={() =>
                document.getElementById("explore-category").scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Now
            </button>
          </div>

          {/* Side Image Inside Glass */}
          <div className="glass-side-image">
            <img src={sideImage} alt="Electronics Display" />
          </div>
        </div>
      </header>

      {/* Explore Categories */}
      <div
        className="container-fluid py-5"
        id="explore-category"
        style={{
          background: "linear-gradient(135deg, #ADD8E6 50%, #dbeafe 50%)",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 className="text-center mb-3">Explore the Categories</h1>
        <p className="text-muted text-center mb-5" style={{ fontSize: "1rem", lineHeight: "1.6", color: "#555" }}>
          Discover a wide range of categories tailored to your interests. Whether you're looking for
          the latest trends or diving into your favorite topics, we've got you covered.
        </p>
        <div className="row g-4 justify-content-center">
          {category_list.map((item, index) => (
            <div
              key={index}
              className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
              onClick={() => handleCategoryClick(item)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card border-0 shadow-sm"
                style={{
                  background: "linear-gradient(180deg,rgb(25, 189, 189), #f3f4f6)",
                  borderRadius: "10px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#e0f2fe",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <img
                    src={item.category_image}
                    alt={item.category_name}
                    className="card-img-top"
                    style={{
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
                <p className="fw-bold mt-2 text-dark">{item.category_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Display Section */}
      <div className="item-display container py-4" id="item-display">
        {/* Top Picks Section */}
        <section className="top-picks mb-5">
          <h2 className="section-title">Top Picks Just for You</h2>
          {topItems.length > 0 ? (
            <div className="row">
              {topItems.map((item) => (
                <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="product-item card">
                  <img
  src={item.imageUrl.startsWith("data:image") ? item.imageUrl : "https://via.placeholder.com/250"}
  alt={item.name || "Product Image"}
  className="card-img-top product-image"
  onError={(e) => {
    console.error(`⚠️ Failed to load image for: ${item.name}`);
    e.target.src = "https://via.placeholder.com/250";
    e.target.onerror = null;
  }}
/>

                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text text-muted">{item.description}</p>
                      <p className="product-item-price fw-bold"> $ {item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No items available to display.</p>
          )}
        </section>

        {/* Flash Sale Section */}
        <section className="flash-sale mb-5">
          <h2 className="section-title text-danger">Flash Sale 🔥</h2>
          {flashSales.length > 0 ? (
            <div className="row">
              {flashSales.map((item) => (
                <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="product-item card">
                  <img
  src={item.imageUrl.startsWith("data:image") ? item.imageUrl : "https://via.placeholder.com/250"}
  alt={item.name || "Product Image"}
  className="product-item-image card-img-top"
  onError={(e) => {
    console.error(`⚠️ Failed to load image for: ${item.name}`);
    e.target.src = "https://via.placeholder.com/250";
    e.target.onerror = null;
  }}
/>

                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text text-muted">{item.description}</p>
                      <p className="product-item-price text-danger fw-bold">
                        $ {item.price} <small>(Limited Time Offer!)</small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No Flash Sale items available at the moment.</p>
          )}
        </section>
        {/* Big Deals Section */}
        <section className="big-deals mb-5">
          <h2 className="section-title text-primary">Big Deals 🎉</h2>
          {bigDeals.length > 0 ? (
            <div className="row">
              {bigDeals.map((item) => (
                <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="product-item card">
                   <img
  src={item.imageUrl.startsWith("data:image") ? item.imageUrl : "https://via.placeholder.com/250"}
  alt={item.name || "Product Image"}
  className="product-item-image card-img-top"
  onError={(e) => {
    console.error(`⚠️ Failed to load image for: ${item.name}`);
    e.target.src = "https://via.placeholder.com/250";
    e.target.onerror = null;
  }}
/>

                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text text-muted">{item.description}</p>
                      <p className="product-item-price text-primary fw-bold">
                        $ {item.price} <small>(Special Offer!)</small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No Big Deals available at the moment.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
