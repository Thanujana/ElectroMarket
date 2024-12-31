import React, { useState } from "react";
import Sidebar from "./components/Sidebar"; // Correct relative path
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

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
      "You have received a 5-star review.",
      "Your listing 'Wireless Headphones' was approved.",
    ],
  };

  const [showAllNotifications, setShowAllNotifications] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Seller Dashboard</h1>

        {/* Overview Section */}
        <div className="mb-4">
          <h2>Overview</h2>
          <div className="row">
            <div className="col-md-3">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Products</h5>
                  <p className="card-text">{mockData.overview.totalProducts}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Orders</h5>
                  <p className="card-text">{mockData.overview.totalOrders}</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card text-white bg-info mb-3">
                <div className="card-body">
                  <h5 className="card-title">Top-Selling Product</h5>
                  <p className="card-text">{mockData.overview.topSellingProduct}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="mb-4">
          <h2>Recent Orders</h2>
          <ul className="list-group">
            {mockData.recentOrders.map((order) => (
              <li
                key={order.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  Order #{order.id} - {order.customer}
                </span>
                <span
                  className={`badge ${
                    order.status === "Pending" ? "bg-warning" : "bg-success"
                  } rounded-pill`}
                >
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary mt-3">View All Orders</button>
        </div>

        {/* Notifications Section */}
        <div>
          <h2>Notifications</h2>
          <ul className="list-group">
            {(showAllNotifications
              ? mockData.notifications
              : mockData.notifications.slice(0, 3)
            ).map((notification, index) => (
              <li key={index} className="list-group-item">
                <i className="bi bi-bell me-2 text-primary"></i>
                {notification}
              </li>
            ))}
          </ul>
          <button
            className="btn btn-secondary mt-3"
            onClick={() => setShowAllNotifications(!showAllNotifications)}
          >
            {showAllNotifications ? "Show Less" : "View All Notifications"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
