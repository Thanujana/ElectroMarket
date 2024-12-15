import React, { useState } from 'react';
import { varieties_list } from '../varieties_list'; // Adjust the path if needed

const ProductDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState(''); // State to track selected category

  const categories = Object.keys(varieties_list); // All categories

  return (
    <div>
      {/* Category Buttons */}
      <div>
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)}>
            {category.replace(/_/g, ' ')}
          </button>
        ))}
        <button onClick={() => setSelectedCategory('')}>Show All</button>
      </div>

      {/* Product List */}
      {categories
        .filter((category) => selectedCategory === '' || category === selectedCategory)
        .map((category) =>
          varieties_list[category].map((item, index) => (
            <div key={index}>
              <h3>{item.type}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))
        )}
    </div>
  );
};

export default ProductDisplay;
