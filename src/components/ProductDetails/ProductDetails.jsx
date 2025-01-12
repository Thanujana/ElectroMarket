import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../style/ProductDetails.css";
import { varieties_list } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductDetails = () => {
  const { product_name } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, isLoggedIn } = useContext(StoreContext);

  const formattedName = decodeURIComponent(product_name);
  const displayName = formattedName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const varieties = varieties_list[formattedName.toLowerCase()] || [];

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Please log in before proceeding to checkout!");
      navigate("/role");
    } else {
      navigate("/cart");
    }
  };

  const incrementItem = (varietyId) => {
    addToCart(varietyId);
  };

  const decrementItem = (varietyId) => {
    if (cartItems[varietyId] > 1) {
      removeFromCart(varietyId);
    } else {
      removeFromCart(varietyId);
    }
  };

  const renderStars = (rating = 0) => {
    const validRating = Math.min(Math.max(rating, 0), 5); // Ensure valid range
    const fullStars = Math.floor(validRating);
    const halfStar = validRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="star full-star" />
        ))}
        {halfStar && <FaStarHalfAlt className="star half-star" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="star empty-star" />
        ))}
      </>
    );
  };

  return (
    <div className="product-details">
      <h1 className="title">{displayName}</h1>
      {varieties.length > 0 ? (
        <>
          <div className="products-grid">
            {varieties.map((variety) => (
              <div className="product-card" key={variety.id}>
                <img
                  src={variety.image}
                  alt={variety.type}
                  className="product-image"
                />
                <h2 className="product-name">{variety.type}</h2>
                <p className="product-description">{variety.description}</p>
                <div className="product-price">Price: ${variety.price}</div>
                <div className="product-rating">{renderStars(variety.rating)}</div>

                <div className="cart-actions">
                  {cartItems[variety.id] > 0 ? (
                    <div className="quantity-controls">
                      <button
                        className="remove-btn"
                        onClick={() => decrementItem(variety.id)}
                      >
                        -
                      </button>
                      <span className="cart-count">{cartItems[variety.id]}</span>
                      <button
                        className="add-btn"
                        onClick={() => incrementItem(variety.id)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-to-picks-btn"
                      onClick={() => incrementItem(variety.id)}
                    >
                      Add to My Picks
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-container">
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="no-varieties">No varieties available for this product.</p>
      )}
    </div>
  );
};

export default ProductDetails;
