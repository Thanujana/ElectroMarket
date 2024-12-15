import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import CategoryItems from "./pages/CategoryItems/CategoryItems";
import Login from "./components/Login/Login";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Conditionally render the Login modal */}
      {showLogin && <Login setShowLogin={setShowLogin} />}

      <div className="app">
        {/* Navbar Component */}
        <Navbar setShowLogin={setShowLogin} />

        {/* Routes Configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/categories/:category_name" element={<CategoryItems />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
