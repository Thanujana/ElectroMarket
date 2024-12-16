import React from "react";
import { useParams } from "react-router-dom";
import { varieties_list } from "../../assets/assets";

const ProductVarieties = () => {
  const { product_type } = useParams(); // Extract product_type from the URL

  // Match the product_type to varieties_list keys
  const sanitizedType = product_type.split("/").pop();
  const productVarieties = varieties_list[sanitizedType];

  console.log("Product Type:", product_type);
  console.log("Sanitized Type:", sanitizedType);
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
        {sanitizedType.replace(/-/g, " ").toUpperCase()} Varieties
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
                <p className="text-muted">{product.description}</p>
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
