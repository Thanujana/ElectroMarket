import React, { useState } from 'react'; // Added useState for itemCount
import './ProductItem.css';
import { assets } from '../../assets/assets';

const ProductItem = ({ id, name, price, description, image }) => {
  const [itemCount, setItemCount] = useState(0); // Initialize state for itemCount

  return (
    <div className="product-item">
      <div className="product-item-img-container">
        <img className="product-item-image" src={image} alt={name} />
        {!itemCount ? (
          <img
            className="add"
            onClick={() => setItemCount(prev => prev + 1)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="product-item-counter">
            <img
              onClick={() => setItemCount(prev => Math.max(0, prev - 1))}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{itemCount}</p>
            <img
              onClick={() => setItemCount(prev => prev + 1)}
              src={assets.add_icon_green}
              alt="Add More"
            />
          </div>
        )}
      </div>

      <div className="product-item-info">
        <div className="product-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="product-item-desc">{description}</p>
        <p className="product-item-price">${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
