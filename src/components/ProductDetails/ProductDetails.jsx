import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { varieties_list } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext"; // Import the context

const ProductDetails = () => {
  const { product_name } = useParams();
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext); // Use context functions

  const formattedName = decodeURIComponent(product_name);

  // Capitalize and replace dashes
  const displayName = formattedName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Fetch product varieties
  const varieties = varieties_list[formattedName.toLowerCase()] || [];

  return (
    <div className="product-details">
      <h1 className="title">{displayName}</h1>
      {varieties.length > 0 ? (
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
              <div className="cart-actions">
                {cartItems[variety.id] > 0 && (
                  <>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(variety.id)}
                    >
                      -
                    </button>
                    <span className="cart-count">{cartItems[variety.id]}</span>
                  </>
                )}
                <button
                  className="add-btn"
                  onClick={() => addToCart(variety.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-varieties">No varieties available for this product.</p>
      )}
    </div>
  );
};

export default ProductDetails;
