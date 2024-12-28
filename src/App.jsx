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
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import AdminDashboard from "./admin/AdminDashboard";
import CategoryList from "./admin/AdminCategoryPage/CategoryList";
import ProductList from "./admin/AdminProductPage/ProductList"; 




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
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* Admin Routes */}
       <Route path="/admin" element={<AdminDashboard />} />
       <Route path="/admin/categories" element={<CategoryList />} />
       <Route path="/admin/products" element={<ProductList />} /> 
      </Routes>
      </div>
      </CartContextProvider>
      
  );
};

export default App;