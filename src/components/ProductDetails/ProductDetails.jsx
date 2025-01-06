import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../style/ProductDetails.css";
import { varieties_list } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext"; // Import the context

const ProductDetails = () => {
  const { product_name } = useParams();
  const navigate = useNavigate(); // Used to navigate to the cart or login page
  const { cartItems, addToCart, removeFromCart, isLoggedIn } = useContext(StoreContext); // Use context functions

  const formattedName = decodeURIComponent(product_name);

  // Capitalize and replace dashes
  const displayName = formattedName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Fetch product varieties
  const varieties = varieties_list[formattedName.toLowerCase()] || [];

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Please log in before proceeding to checkout!");
      navigate("/role"); // Navigate to the login page
    } else {
      navigate("/cart"); // Navigate to the cart page if logged in
    }
  };

  const incrementItem = (varietyId) => {
    addToCart(varietyId); // Call the context's addToCart for increment
  };

  const decrementItem = (varietyId) => {
    if (cartItems[varietyId] > 1) {
      removeFromCart(varietyId); // Call removeFromCart to decrement
    } else {
      removeFromCart(varietyId); // Remove the item if quantity is 1
    }
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

                {/* Cart Actions */}
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

          {/* Checkout Button */}
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
