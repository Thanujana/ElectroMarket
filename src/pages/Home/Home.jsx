import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreCategory from "../../components/ExploreCategory/ExploreCategory";
import ItemDisplay from "../../components/ItemDisplay/ItemDisplay";

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
 </div>

  );
};

export default Home;
