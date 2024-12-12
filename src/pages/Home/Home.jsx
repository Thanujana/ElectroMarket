import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreCategory from '../../components/ExploreCategory/ExploreCategory';
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay';
import ProductItem from '../../components/ProductItem/ProductItem';



const Home = () => {
  const [category, setCategory] = useState('All');
  console.log('Home Component Rendered'); 

  return (
    <div>
      <Header />
      <ExploreCategory category={category} setCategory={setCategory} />
      <ItemDisplay />
      <ProductItem/>
     
    </div>
  );
};

export default Home;
