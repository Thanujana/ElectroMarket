import React from 'react';
import { useNavigate } from 'react-router-dom';
import { category_list } from '../../assets/assets';

const ExploreCategory = ({ category, setCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (item) => {
    navigate(`/categories/${item.category_name}`);
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: 'linear-gradient(135deg, #ADD8E6 50%, #dbeafe 50%)', 
        borderRadius: '20px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 className="text-center mb-3">Explore the Categories</h1>
      <p
        className="text-muted text-center mb-5"
        style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555' }}
      >
        Discover a wide range of categories tailored to your interests. Whether you're looking for
        the latest trends or diving into your favorite topics, we've got you covered.
      </p>
      <div className="row g-4 justify-content-center">
        {category_list.map((item, index) => (
          <div
            key={index}
            className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
            onClick={() => handleCategoryClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="card border-0 shadow-sm"
              style={{
                background: 'linear-gradient(180deg,rgb(25, 189, 189), #f3f4f6)', // Slight gradient for cards
                borderRadius: '10px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div
                style={{
                  backgroundColor: '#e0f2fe', // Updated color behind the image
                  borderRadius: '10px',
                  padding: '10px',
                }}
              >
                <img
                  src={item.category_image}
                  alt={item.category_name}
                  className="card-img-top"
                  style={{
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
              <p className="fw-bold mt-2 text-dark">{item.category_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCategory;
