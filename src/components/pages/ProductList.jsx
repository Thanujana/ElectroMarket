import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";  // ⬅ Import useLocation
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const location = useLocation(); // ⬅ Get the current URL

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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product List</h2>

      {/* 🔍 Search & Filters */}
      <div className="row mb-3">
     

        <div className="col-md-2">
          <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="home-appliances">home-appliances</option>
            <option value="consumer-electronics">consumer-electronics</option>
            <option value="computer-components">computer-components</option>
            <option value="smart-home-products">smart-home-products</option>
            <option value="industrial-specialized-electronics">industrial-specialized-electronics</option>
          </select>
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
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

        <div className="col-md-1">
          <select className="form-select" onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">↑ Ascending</option>
            <option value="desc">↓ Descending</option>
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
