import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import CategoryItems from "./components/CategoryItems/CategoryItems";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import AdminLayout from "./admin/layouts/AdminLayout"; // Admin Layout
import AdminDashboard from "./admin/AdminDashboard";
import CategoryList from "./admin/AdminCategoryPage/CategoryList";
import AdminProductList from "./admin/AdminProductPage/ProductList";
import AdminOrderList from "./admin/AdminOrderPage/OrderList";
import Role from "./components/RoleSelection/Role";
import AddProduct from "./admin/AdminProductPage/AddProduct";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import LandingPage from "./pages/LandingPage/LandingPage";
import Profile from "./components/Profile/Profile";

const App = () => {
  return (
    <CartContextProvider>
      <div className="app">
        <Navbar />
        <Routes>1
          {/* Customer Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/buyer/dashboard" element={<Home />} />
          <Route path="/role" element={<Role />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/categories/:category_name" element={<CategoryItems />} />
          <Route path="/products/:product_name" element={<ProductDetails />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-status" element={<OrderStatus />} />

          {/* Admin Routes Wrapped with AdminLayout */}
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="categories" element={<CategoryList />} />
                  <Route path="products" element={<AdminProductList />} />
                  <Route path="orders" element={<AdminOrderList />} />
                  <Route path="products/add" element={<AddProduct />} />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
        <Footer />
      </div>
    </CartContextProvider>
  );
};

export default App;
