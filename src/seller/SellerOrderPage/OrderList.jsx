import React from "react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const orders = [
    { id: 1, customer: "Alice", total: 150.0, date: "2023-12-31", status: "Delivered" },
    { id: 2, customer: "Bob", total: 90.5, date: "2023-12-30", status: "Pending" },
  ];

  const navigate = useNavigate();

  const handleViewDetails = (orderId) => {
    navigate(`/seller/orders/${orderId}`);
  };

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleViewDetails(order.id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
