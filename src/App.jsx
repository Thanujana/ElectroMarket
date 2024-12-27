import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes,useNavigate} from "react-router-dom";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import CategoryItems from "./components/CategoryItems/CategoryItems";
import Login from "./components/Login/Login";
import ProductDetails from './components/ProductDetails/ProductDetails';
import Register from "./components/Register/Register";
import CartContextProvider from "./Context/CartContext";



const App = () => {

  return (
    <CartContextProvider>
    <div className="app">
        {/* Navbar Component */}
        <Navbar />

  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/categories/:category_name" element={<CategoryItems />} />
          <Route path="/products/:product_name" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
          
 </Routes>
      </div>
      </CartContextProvider>
      
  );
};

export default App;