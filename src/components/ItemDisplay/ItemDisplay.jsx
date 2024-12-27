import React, { useContext } from 'react';
import './ItemDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import { item_list } from '../../assets/assets';

const ItemDisplay = () => {
  const { item_list = [] } = useContext(StoreContext);

  // Filter the top items: Example criteria — first 8 items
  const topItems = item_list.slice(0, 8);

  return (
    <div className="item-display" id="item-display">
      <h2>Top Picks Just for You</h2>
      {topItems.length > 0 ? (
      <div className="item-display-list">
        {topItems.map((item) => (
            <div key={item.id} className="product-item">
              <img src={item.image} alt={item.name} className="product-item-image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="product-item-price">${item.price}</p>
            </div>
        ))}
      </div>
    ) : (
      <p>No items available to display.</p>
    )}
  </div>
);
};

export default ItemDisplay;