import React from 'react';
import './ExploreCategory.css';
import { category_list } from '../../assets/assets';

const ExploreCategory = ({ category, setCategory }) => {
  return (
    <div className='explore-category' id='explore-category'>
      <h1>Explore the Categories.!!!</h1>
      <p className='explore-category-text'>
        Discover a wide range of categories tailored to your interests. Whether you're looking for the latest trends, exploring new ideas, or diving into your favorite topics, we've got you covered. Start exploring now and find what inspires you!
      </p>
      <div className='explore-category-list'>
        {category_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.category_name ? 'All' : item.category_name
              )
            }
            key={index}
            className={`explore-category-list-item ${
              category === item.category_name ? 'active' : ''
            }`}
          >
            <img
              className={category === item.category_name ? 'active' : ''}
              src={item.category_image}
              alt={item.category_name}
            />
            <p>{item.category_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreCategory;
