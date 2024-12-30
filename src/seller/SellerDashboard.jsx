import React from "react";
import Sidebar from "./components/Sidebar"; // Correct relative path


const SellerDashboard = () => {
  const mockData = {
    overview: {
      totalProducts: 50,
      totalOrders: 120,
      totalEarnings: "$10,000",
      topSellingProduct: "Wireless Headphones",
    },
    recentOrders: [
      { id: 101, customer: "John Doe", total: "$500", status: "Pending" },
      { id: 102, customer: "Jane Smith", total: "$300", status: "Shipped" },
    ],
    notifications: [
      "New Order: #103",
      "Your payout of $500 is processed.",
      "Product 'Smartphone' is low on stock.",
    ],
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px" }}>
        <h1>Seller Dashboard</h1>

        {/* Overview Section */}
        <div>
          <h2>Overview</h2>
          <p>Total Products Listed: {mockData.overview.totalProducts}</p>
          <p>Total Orders: {mockData.overview.totalOrders}</p>
          <p>Total Earnings: {mockData.overview.totalEarnings}</p>
          <p>Top-Selling Product: {mockData.overview.topSellingProduct}</p>
        </div>

        {/* Recent Orders */}
        <div>
          <h2>Recent Orders</h2>
          <ul>
            {mockData.recentOrders.map((order) => (
              <li key={order.id}>
                Order #{order.id} - {order.customer} - {order.total} -{" "}
                {order.status}
              </li>
            ))}
          </ul>
          <button>View All Orders</button>
        </div>

        {/* Notifications */}
        <div>
          <h2>Notifications</h2>
          <ul>
            {mockData.notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
