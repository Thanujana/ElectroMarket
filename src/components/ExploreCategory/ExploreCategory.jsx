import React from 'react';
import { useNavigate } from 'react-router-dom';
import { category_list } from '../../assets/assets';

const ExploreCategory = ({ category, setCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (item) => {
    navigate(`/categories/${item.category_name}`); // Use category_name directly (already clean)
  };
  

  return (
    <div className="container py-4">
      <h1 className="text-center mb-3">Explore the Categories.!!!</h1>
      <p className="text-muted text-center mb-4">
        Discover a wide range of categories tailored to your interests. Whether you're looking for
        the latest trends or diving into your favorite topics, we've got you covered.
      </p>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        {category_list.map((item, index) => (
          <div
            key={index}
            className="text-center"
            style={{
              width: '18%',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onClick={() => handleCategoryClick(item)} // Call the updated function
          >
            <div
              className={`card border-0 ${
                category === item.category_name ? 'border-primary' : ''
              }`}
            >
              <img
                src={item.category_image}
                alt={item.category_name}
                className="card-img-top rounded"
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  boxShadow: category === item.category_name ? '0 4px 10px rgba(0, 0, 255, 0.4)' : '',
                }}
              />
              <p
                className={`fw-bold mt-2 ${
                  category === item.category_name ? 'text-primary' : 'text-dark'
                }`}
              >
                {item.category_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCategory;