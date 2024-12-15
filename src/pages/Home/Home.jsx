import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreCategory from "../../components/ExploreCategory/ExploreCategory";
import ItemDisplay from "../../components/ItemDisplay/ItemDisplay";
import AppDownload from '../../components/AppDownload/AppDownload';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  // State to store the selected category
  const [category, setCategory] = useState("All");

  console.log(`Selected Category: ${category}`); // Debugging log

  return (
    <div>
    {/* Header Section */}
    <Header />

    {/* Explore Categories */}
    <div id="explore-category">
      <ExploreCategory />
    </div>

    {/* Mobile App Download */}
    <div id="app-download">
      <AppDownload />
    </div>

    {/* Footer */}
    <div id="footer-section">
      <Footer />
    </div>
  </div>
);
};

export default Home;
