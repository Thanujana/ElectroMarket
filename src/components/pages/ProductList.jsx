import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/navbar.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Read search term & category from URL when page loads
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    const categoryParam = params.get("category");

    if (categoryParam) {
      setCategory(categoryParam);
    }

    fetchProducts(searchQuery, categoryParam);
  }, [location.search]); // ✅ React when URL changes

  // ✅ Fetch products from the backend
  const fetchProducts = async (searchQuery, selectedCategory) => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/search", {
        params: {
          name: searchQuery || null,
          category: selectedCategory || null,
        },
      });
      setProducts(response.data);
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle category change and update URL
 // ✅ Handle Category Change - Reset Search Query
const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const params = new URLSearchParams();

    if (selectedCategory) {
        params.set("category", selectedCategory);
    }

    // ✅ Update the URL with only the selected category (removes search query)
    navigate(`/filter?${params.toString()}`);
};


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product List</h2>

      {/* 🏷️ Category Filter (Now Updates URL) */}
      <div className="row mb-3">
        <div className="col-md-2">
          <select className="form-select" value={category} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="consumer-electronics">Consumer Electronics</option>
            <option value="computer-components">Computer Components</option>
            <option value="smart-home-products">Smart Home Products</option>
            <option value="industrial-specialized-electronics">Industrial Electronics</option>
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
