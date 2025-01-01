import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreCategory from "../../components/ExploreCategory/ExploreCategory";
import ItemDisplay from "../../components/ItemDisplay/ItemDisplay";
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

      {/* Item Display Section */}
      <div id="item-display">
        <ItemDisplay />
      </div>

   
      {/* Footer */}
      <div id="footer-section">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
