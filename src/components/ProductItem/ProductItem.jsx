import React, { useContext } from "react";
import "./ProductItem.css";
import StoreContext from "../../Context/StoreContext";

const ProductItem = ({ item }) => {
  const { addToCart } = useContext(StoreContext); // Access cart management context

  return (
    <div className="card product-item">
      <img src={item.image} className="card-img-top" alt={item.name} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <p className="card-text">
          <strong>${item.price}</strong>
        </p>
        <button className="btn btn-primary w-100" onClick={() => addToCart(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
