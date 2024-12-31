import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = {
    id: 1,
    customer: "Alice",
    total: 150.0,
    date: "2023-12-31",
    status: "Delivered",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 50.0 },
      { name: "Gaming Mouse", quantity: 2, price: 25.0 },
    ],
  };

  if (parseInt(orderId, 10) !== order.id) {
    return <p>Order not found.</p>;
  }

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order.id}</p>
      <p>Customer: {order.customer}</p>
      <p>Total: ${order.total.toFixed(2)}</p>
      <p>Date: {order.date}</p>
      <p>Status: {order.status}</p>

      <h2>Items</h2>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/seller/orders")}>Back to Orders</button>
    </div>
  );
};

export default OrderDetails;
