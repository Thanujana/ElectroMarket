import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap
import "../../style/CategoryItems.css"; // ✅ Import custom CSS

const CategoryItems = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(`🔵 Fetching products for category: ${category}`);

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/category/${category}`);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        console.log("✅ Category Products:", data);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <p className="text-center text-primary mt-5">Loading products...</p>;
  if (error) return <p className="text-center text-danger mt-5">❌ Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center text-uppercase category-title">{category} Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id || product._id} className="col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm product-card">
              {/* ✅ Ensure proper image rendering with a default fallback */}
              <img 
                src={product.imageUrl || "https://via.placeholder.com/250"} 
                alt={product.name} 
                className="card-img-top product-image" 
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="text-muted">{product.description?.substring(0, 50)}...</p>
                <Link to={`/products/${product.id || product._id}`} className="btn btn-primary explore-btn">
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;
