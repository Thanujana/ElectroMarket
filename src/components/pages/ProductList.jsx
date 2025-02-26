import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/navbar.css"; // Add styles for the dropdown suggestions


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Read search term from URL when page loads
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");

    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [location.search]);

  // ✅ Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [search, category, minPrice, maxPrice, sortBy, order]);

  // ✅ Fetch search suggestions
  const fetchSuggestions = async (query) => {
    if (query.length > 1) {
      try {
        const response = await axios.get("http://localhost:8080/api/products/suggestions", {
          params: { query },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // ✅ Fetch filtered products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/search", {
        params: {
          name: search || null,
          category: category || null,
          minPrice: minPrice || null,
          maxPrice: maxPrice || null,
          sortBy: sortBy,
          order: order,
        },
      });
      setProducts(response.data);
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchSuggestions(value);
    
    if (window.location.pathname !== "/filter") {
      navigate("/filter");
    }
  };

  // ✅ Handle clicking on suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    navigate(`/filter?search=${suggestion}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product List</h2>

      {/* 🔍 Search Bar & Filters */}
      <div className="row mb-3">
        <div className="col-md-3 position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={search}
            onChange={handleSearchChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((s, index) => (
                <li key={index} onClick={() => handleSuggestionClick(s)}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-md-2">
          <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="consumer-electronics">Consumer Electronics</option>
            <option value="computer-components">Computer Components</option>
            <option value="smart-home-products">Smart Home Products</option>
            <option value="industrial-specialized-electronics">Industrial Electronics</option>
          </select>
        </div>

        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <select className="form-select" onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">Sort: Price</option>
            <option value="rating">Sort: Best Rated</option>
            <option value="createdAt">Sort: Newest</option>
          </select>
        </div>
      </div>

      {/* 🚀 Product List */}
      <div className="row">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.id || product._id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/250"}
                  alt={product.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-success">Price: ${product.price?.toFixed(2)}</p>
                  <Link to={`/products/${product.id || product._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-warning">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
