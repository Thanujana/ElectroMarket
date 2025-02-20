import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap
import "../../style/CategoryItems.css"; // ✅ Import custom CSS
import { FaStar, FaStarHalfAlt, FaRegStar,  FaArrowRight } from "react-icons/fa"; // Import rating & cart icon

const CategoryItems = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(`🔵 Fetching products for category: ${category}`);

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/category/${category}`
        );
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

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-primary mt-3">Fetching products...</p>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-danger mt-5">
        ❌ Error: {error}
      </p>
    );

  return (
    <div className="container mt-5">
      <h2 className="category-title">{category} Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id || product._id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card product-card">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/250"}
                  alt={product.name}
                  className="card-img-top product-image"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  
                  {/* ⭐ Rating System */}
                  <div className="rating">{generateStars(product.rating)}</div>

                  {/* Instead of "Explore Now" button, use an icon */}
                  <Link to={`/products/${product.id || product._id}`} className="icon-button">
                    <FaArrowRight className="icon-style" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-warning mt-4">
            ⚠️ No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

/* Function to Generate Star Ratings */
const generateStars = (rating) => {
  if (!rating || rating < 0) rating = 0; // Handle undefined/null/negative values
  if (rating > 5) rating = 5; // Ensure rating does not exceed 5

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} color="#FFD700" />
      ))}
      {halfStar && <FaStarHalfAlt color="#FFD700" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} color="#DDD" />
      ))}
    </>
  );
};


export default CategoryItems;
