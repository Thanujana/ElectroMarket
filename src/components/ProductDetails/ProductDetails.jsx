import React from "react";
import { useParams } from "react-router-dom";
import './ProductDetails.css';
import { varieties_list } from "../../assets/assets";

const ProductDetails = () => {
  const { product_name } = useParams(); // Get product name from URL
  const formattedName = decodeURIComponent(product_name);

  // Capitalize and replace dashes for display
  const displayName = formattedName.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Fetch varieties from the list based on the product name
  const varieties = varieties_list[formattedName.toLowerCase()] || [];

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-primary">{displayName}</h1>

      {varieties.length > 0 ? (
        <div className="row">
          {varieties.map((variety, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0">
                <img
                  src={variety.image}
                  alt={variety.type}
                  className="card-img-top"
                  style={{ objectFit: "contain", height: "200px" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{variety.type}</h5>
                  <p className="card-text text-muted">{variety.description}</p>
                  <p className="card-text fw-bold">${variety.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">
          No varieties found for this product.
        </p>
      )}
    </div>
  );
};

export default ProductDetails;
