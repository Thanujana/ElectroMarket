import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreCategory from '../../components/ExploreCategory/ExploreCategory';


const Home = () => {
  const [category, setCategory] = useState('All');

  return (
    <div>
      <Header />
      <ExploreCategory category={category} setCategory={setCategory} />
    </div>
  );
};

export default Home;
