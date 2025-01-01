import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import CategoryItems from "./components/CategoryItems/CategoryItems";
import LoginRegister from './components/LoginRegister/LoginRegister';

import ProductDetails from "./components/ProductDetails/ProductDetails";

import CartContextProvider from "./Context/CartContext";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import AdminDashboard from "./admin/AdminDashboard";
import CategoryList from "./admin/AdminCategoryPage/CategoryList";
import AdminProductList from "./admin/AdminProductPage/ProductList";
import AdminOrderList from "./admin/AdminOrderPage/OrderList";
import Role from "./components/RoleSelection/Role";
import AddProduct from "./admin/AdminProductPage/AddProduct";


const App = () => {
  return (
    <CartContextProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/role" element={<Role />} />
          <Route path="/login/:role" element={<LoginRegister />} />
          <Route path="/register/:role" element={<LoginRegister />} />

          {/* Customer Routes */}
          <Route path="/buyer/dashboard" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/categories/:category_name" element={<CategoryItems />} />
          <Route path="/products/:product_name" element={<ProductDetails />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/payment" element={<PaymentPage />} />
          

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/orders" element={<AdminOrderList />} />
          <Route path="/admin/products/add" element={<AddProduct />} />

         

        </Routes>
      </div>
    </CartContextProvider>
  );
};

export default App;
