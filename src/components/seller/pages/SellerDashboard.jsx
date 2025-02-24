import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (userRole !== "ROLE_SELLER") {
      navigate("/login"); // Redirect if user is not a seller
    }
  }, [userRole, navigate]);

  const stats = [
    { title: "Total Products", value: 15, color: "primary" },
    { title: "Total Sales", value: "$4,500", color: "success" },
    { title: "Pending Orders", value: 5, color: "warning" },
    { title: "Completed Orders", value: 20, color: "dark" },
  ];

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4 text-center">Seller Dashboard</h2>

      <div className="row g-4 mb-5">
        {stats.map(({ title, value, color }, index) => (
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

      <div>
        <h3>Recent Orders</h3>
        <table className="table table-striped table-hover mt-3 shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>201</td>
              <td>Smartphone</td>
              <td>John</td>
              <td><span className="badge bg-warning">Pending</span></td>
            </tr>
            <tr>
              <td>202</td>
              <td>Headphones</td>
              <td>Karthik</td>
              <td><span className="badge bg-success">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerDashboard;
