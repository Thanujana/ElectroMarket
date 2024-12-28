import React from "react";
import Sidebar from "./components/Sidebar";

const AdminDashboard = () => {
  const recentOrders = [
    { id: 101, customer: "John Doe", total: "$150", status: "Pending" },
    { id: 102, customer: "Jane Smith", total: "$200", status: "Shipped" },
    { id: 103, customer: "Alice Johnson", total: "$120", status: "Delivered" },
    { id: 104, customer: "Bob Brown", total: "$80", status: "Pending" },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <h2 className="mb-4 text-center">Admin Dashboard</h2>

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card text-white bg-primary shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Total Categories</h5>
                <h3 className="card-text">10</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Total Products</h5>
                <h3 className="card-text">50</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Total Orders</h5>
                <h3 className="card-text">120</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-danger shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Total Sales</h5>
                <h3 className="card-text">$5000</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-info shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Pending Orders</h5>
                <h3 className="card-text">15</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-secondary shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Shipped Orders</h5>
                <h3 className="card-text">25</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-dark shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Delivered Orders</h5>
                <h3 className="card-text">80</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-5">
          <h3>Recent Orders</h3>
          <table className="table table-striped table-hover mt-3 shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Pending"
                          ? "bg-warning"
                          : order.status === "Shipped"
                          ? "bg-info"
                          : "bg-success"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerts/Notifications */}
        <div>
          <h3>Alerts/Notifications</h3>
          <ul className="list-group shadow-sm">
            <li className="list-group-item list-group-item-danger">
              Low stock alert: Product XYZ has only 5 items left.
            </li>
            <li className="list-group-item list-group-item-warning">
              Reminder: 10 pending orders need approval.
            </li>
            <li className="list-group-item list-group-item-success">
              Update: Order #102 has been shipped.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
