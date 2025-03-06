import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import PlaceOrder from "./components/pages/PlaceOrder";
import Cart from "./components/pages/Cart";
import ProductDetails from "./components/pages/ProductDetails";
import CartContextProvider from "./components/Context/CartContext";
import OrderConfirmation from "./components/pages/OrderConfirmation";
import CategoryItems from "./components/pages/CategoryItems";
import PaymentPage from "./components/pages/PaymentPage";
import AdminLayout from "./components/admin/layouts/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserList from "./components/admin/AdminUserPage/UserList";
import UserApproval from "./components/admin/AdminUserPage/UserApproval";
import AdminProductList from "./components/admin/AdminProductPage/ProductList";
import AdminOrderList from "./components/admin/AdminOrderPage/OrderList";
import AddProduct from "./components/admin/AdminProductPage/AddProduct";
import Role from "./components/common/Role";
import OrderStatus from "./components/pages/OrderStatus";
import LandingPage from "./components/pages/LandingPage";
import Profile from "./components/pages/Profile";
import SellerLayout from "./components/seller/layouts/SellerLayout";
import SellerDashboard from "./components/seller/pages/SellerDashboard";
import SellerProducts from "./components/seller/pages/SellerProducts";
import SellerAddProduct from "./components/seller/pages/SellerAddProduct";
import ProductList from "./components/pages/ProductList";

const App = () => {
  return (
    <CartContextProvider>
      <div className="app">
        <Routes>
          {/* 🛒 Customer Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/buyer/dashboard" element={<Home />} />
                  <Route path="/role" element={<Role />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/place-order" element={<PlaceOrder />} />
                  <Route path="/categories/:category" element={<CategoryItems />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/filter" element={<ProductList />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/order-status" element={<OrderStatus />} />
                </Routes>
                <Footer />
              </>
            }
          />

          {/* 🛠️ Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<UserList />} />
                  <Route path="users/approve" element={<UserApproval />} />
                  <Route path="products" element={<AdminProductList />} />
                  <Route path="products/add" element={<AddProduct />} />
                  <Route path="orders" element={<AdminOrderList />} />
                </Routes>
              </AdminLayout>
            }
          />

          {/* 🏪 Seller Routes */}
          <Route
            path="/seller/*"
            element={
              <SellerLayout>
                <Routes>
                  <Route path="dashboard" element={<SellerDashboard />} />
                  <Route path="products" element={<SellerProducts />} />
                  <Route path="add-product" element={<SellerAddProduct />} />
                </Routes>
              </SellerLayout>
            }
          />
        </Routes>
      </div>
    </CartContextProvider>
  );
};

export default App;