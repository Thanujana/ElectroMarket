import React from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";

const ProductVarieties = () => {
  const { product_type } = useParams(); // Get the product type from the URL
  const productVarieties = assets[product_type];

  console.log("Product Type:", product_type);
  console.log("Product Varieties:", productVarieties);

  if (!productVarieties) {
    return (
      <div className="container py-4">
        <h1 className="text-center text-danger">Category Not Found</h1>
        <p className="text-center">No items available for this category.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-primary">
        {product_type.replace(/-/g, " ").toUpperCase()} Varieties
      </h1>
      <div className="row">
        {productVarieties.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100 text-center">
              <img
                src={product.image}
                alt={product.type}
                className="card-img-top"
                style={{ width: "100%", height: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{product.type}</h5>
                <p className="text-muted" style={{ fontSize: "14px" }}>
                  {product.description}
                </p>
                <p className="fw-bold text-success">
                  Starting at ${product.price}
                </p>
              </div>
              <div className="card-footer bg-white border-0">
                <button className="btn btn-dark btn-sm">
                  Explore {product.type}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVarieties;
