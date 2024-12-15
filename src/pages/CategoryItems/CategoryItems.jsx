import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { item_list } from '../../assets/assets';

const CategoryItems = () => {
  const { category_name } = useParams();
  const navigate = useNavigate();

  // Reverse formatting: Replace hyphens with spaces and capitalize words
  const formattedCategory = category_name
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words

  // Filter items based on the formatted category name
  const filteredItems = item_list.filter(
    (item) => item.category.toLowerCase() === formattedCategory.toLowerCase()
  );

  const handleExploreClick = (itemName) => {
    const formattedName = itemName.toLowerCase().replace(/ /g, '-');
    navigate(`/products/${formattedName}`); // Navigate to a detailed product page
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-primary">{formattedCategory}</h1>
      <div className="row">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div
                className="card shadow-sm border-0 h-100"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '180px', // Reduced image height
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p className="card-text text-muted" style={{ fontSize: '14px' }}>
                    {item.description}
                  </p>
                </div>
                <div className="card-footer bg-white text-center border-0">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleExploreClick(item.name)}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            No items found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
