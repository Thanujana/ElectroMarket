import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import CategoryItems from "./components/CategoryItems/CategoryItems";
import Login from "./components/Login/Login";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Register from "./components/Register/Register";
import CartContextProvider from "./Context/CartContext";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import AdminDashboard from "./admin/AdminDashboard";
import CategoryList from "./admin/AdminCategoryPage/CategoryList";
import AdminProductList from "./admin/AdminProductPage/ProductList";
import AdminOrderList from "./admin/AdminOrderPage/OrderList";
import SellerDashboard from "./seller/SellerDashboard";
import SellerProductList from "./seller/SellerProductPage/ProductList";
import AddProduct from "./seller/SellerProductPage/AddProduct";
import SellerOrderList from "./seller/SellerOrderPage/OrderList";
import OrderDetails from "./seller/SellerOrderPage/OrderDetails";
import SellerEarningsPage from "./seller/SellerEarningsPage";
import RoleSelection from "./components/RoleSelection/Role";

const App = () => {
  return (
    <CartContextProvider>
      <div className="app">
        <Navbar />
        <Routes>
        <Route path="/role" element={<RoleSelection />} />
          {/* Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/categories/:category_name" element={<CategoryItems />} />
          <Route path="/products/:product_name" element={<ProductDetails />} />
          {/* Buyer Login/Register */}
        <Route path="/login/buyer" element={<Login role="Buyer" />} />
        <Route path="/register/buyer" element={<Register role="Buyer" />} />

        {/* Seller Login/Register */}
        <Route path="/login/seller" element={<Login role="Seller" />} />
        <Route path="/register/seller" element={<Register role="Seller" />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/orders" element={<AdminOrderList />} />

          {/* Seller Routes */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProductList />} />
          <Route path="/seller/products/add" element={<AddProduct />} />
          <Route path="/seller/orders" element={<SellerOrderList />} />
          <Route path="/seller/orders/:orderId" element={<OrderDetails />} />
          <Route path="/seller/earnings" element={<SellerEarningsPage />} />

        </Routes>
      </div>
    </CartContextProvider>
  );
};

export default App;
