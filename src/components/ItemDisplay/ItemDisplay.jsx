import React, { useContext } from 'react';
import './ItemDisplay.css';
import { StoreContext } from '../../Context/StoreContext';

const ItemDisplay = () => {
  const { item_list = [] } = useContext(StoreContext);

  // Filter items into different sections
  const topItems = item_list.slice(0, 8); // Top picks (first 8 items)
  const flashSales = item_list.slice(8, 12); // Flash sale (next 4 items)
  const bigDeals = item_list.slice(12, 16); // Big deals (next 4 items)

  return (
    <div className="item-display container py-4" id="item-display">
      {/* Top Picks Section */}
      <section className="top-picks mb-5">
        <h2 className="section-title">Top Picks Just for You</h2>
        {topItems.length > 0 ? (
          <div className="row">
            {topItems.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="product-item card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-item-image card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-muted">{item.description}</p>
                    <p className="product-item-price fw-bold">Rs {item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No items available to display.</p>
        )}
      </section>

      {/* Flash Sale Section */}
      <section className="flash-sale mb-5">
        <h2 className="section-title text-danger">Flash Sale 🔥</h2>
        {flashSales.length > 0 ? (
          <div className="row">
            {flashSales.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="product-item card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-item-image card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-muted">{item.description}</p>
                    <p className="product-item-price text-danger fw-bold">
                      Rs {item.price} <small>(Limited Time Offer!)</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Flash Sale items available at the moment.</p>
        )}
      </section>

      {/* Big Deals Section */}
      <section className="big-deals mb-5">
        <h2 className="section-title text-success">Big Deals 💥</h2>
        {bigDeals.length > 0 ? (
          <div className="row">
            {bigDeals.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="product-item card border-success">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-item-image card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-muted">{item.description}</p>
                    <p className="product-item-price text-success fw-bold">
                      Rs {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Big Deals items available right now.</p>
        )}
      </section>
    </div>
  );
};

export default ItemDisplay;
