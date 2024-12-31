import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query"); // Extract the search term from the URL

  // Sample product data
  const products = [
    { id: 1, category: "Mobile", name: "iPhone 14" },
    { id: 2, category: "Laptop", name: "Dell XPS 15" },
    { id: 3, category: "Tablet", name: "Samsung Galaxy Tab S7" },
    { id: 4, category: "Mobile", name: "OnePlus 10 Pro" },
    { id: 5, category: "Laptop", name: "MacBook Pro" },
  ];

  // Filter products based on the search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Search Results for "{searchTerm}"</h2>
      <ul className="list-group mt-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product.id} className="list-group-item">
              <strong>{product.name}</strong> <br />
              <span className="text-muted">Category: {product.category}</span>
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No products found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
