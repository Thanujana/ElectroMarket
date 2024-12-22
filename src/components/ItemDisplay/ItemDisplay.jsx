import React, { useContext } from 'react';
import './ItemDisplay.css';
import { StoreContext } from '../../Context/StoreContext';

const ItemDisplay = () => {
  const { item_list } = useContext(StoreContext);

  // Filter the top items: Example criteria — first 8 items
  const topItems = item_list.slice(0, 8);

  return (
    <div className="item-display" id="item-display">
      <h2>Top Picks Just for You</h2>
      <div className="item-display-list">
        {topItems.map((item, index) => {
          return (
            <div key={index} className="product-item">
              <img src={item.image} alt={item.name} className="product-item-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="product-item-price">${item.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemDisplay;