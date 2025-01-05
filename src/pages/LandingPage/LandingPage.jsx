import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const bannerImages = [
    "https://images.unsplash.com/photo-1517059224940-d4af9eec41b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    "https://images.unsplash.com/photo-1521334884684-d80222895322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    "https://images.unsplash.com/photo-1610484827713-fc4972ebfb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
  ];

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1587202372775-0dbe94b505bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      link: "/category/electronics",
    },
    {
      id: 2,
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      link: "/category/fashion",
    },
    {
      id: 3,
      name: "Home Appliances",
      image: "https://images.unsplash.com/photo-1610484827713-fc4972ebfb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      link: "/category/home",
    },
    {
      id: 4,
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      link: "/category/beauty",
    },
  ];

  const hotDeals = [
    {
      id: 1,
      name: "Smartphone",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      link: "/product/1",
    },
    {
      id: 2,
      name: "Headphones",
      image: "https://images.unsplash.com/photo-1602524813674-835ef17f3c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      link: "/product/2",
    },
    {
      id: 3,
      name: "Smart TV",
      image: "https://images.unsplash.com/photo-1617392299361-c07b8dc49bac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      link: "/product/3",
    },
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
          <p>Shop amazing deals and products!</p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <h2>Shop by Categories</h2>
        <div className="categories-container">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => navigate(category.link)}
            >
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Deals Section */}
      <div className="promotions-section">
        <h2>Hot Deals</h2>
        <div className="promotions-carousel">
          {hotDeals.map((deal) => (
            <div
              className="promotion-card"
              key={deal.id}
              onClick={() => navigate(deal.link)}
            >
              <img src={deal.image} alt={deal.name} />
              <p>{deal.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
