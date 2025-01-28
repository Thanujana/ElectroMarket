import React from "react";

const AdminDashboard = () => {
  const summaryData = [
    { title: "Total Categories", value: 10, color: "primary" },
    { title: "Total Products", value: 50, color: "success" },
    { title: "Total Orders", value: 120, color: "warning" },
    { title: "Total Sales", value: "$5000", color: "danger" },
    { title: "Pending Orders", value: 15, color: "info" },
    { title: "Shipped Orders", value: 25, color: "secondary" },
    { title: "Delivered Orders", value: 80, color: "dark" },
    { title: "Total Earnings", value: "$10000", color: "warning" },
  ];

  const recentOrders = [
    { id: 101, customer: "John Doe", total: "$150", status: "Pending" },
    { id: 102, customer: "Jane Smith", total: "$200", status: "Shipped" },
    { id: 103, customer: "Alice Johnson", total: "$120", status: "Delivered" },
    { id: 104, customer: "Bob Brown", total: "$80", status: "Pending" },
  ];

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="row g-4 mb-5">
        {summaryData.map(({ title, value, color }, index) => (
          <div key={index} className="col-md-3">
            <div className={`card text-white bg-${color} shadow-sm`}>
              <div className="card-body text-center">
                <h5 className="card-title">{title}</h5>
                <h3 className="card-text">{value}</h3>
              </div>
            </div>
          </div>
        ))}
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
  );
};

export default AdminDashboard;
