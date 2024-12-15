import React, { useState } from "react";
import "./Home.css";
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

      {/* ExploreCategory allows users to pick a category */}
      <ExploreCategory category={category} setCategory={setCategory} />

      {/* ItemDisplay shows filtered items based on the selected category */}
      <ItemDisplay category={category} />
    </div>
  );
};

export default Home;
