import React, { useState } from "react";
import OrderDetails from "./OrderDetails";

const OrderList = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: {
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Elm St, Springfield, IL",
      },
      items: [
        { id: 1, name: "Smartphone", quantity: 1, price: 699 },
        { id: 2, name: "Laptop", quantity: 1, price: 999 },
      ],
      total: 1698,
      status: "Pending",
    },
    {
      id: 2,
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        address: "456 Oak Ave, Metropolis, NY",
      },
      items: [
        { id: 3, name: "Monitor", quantity: 2, price: 199 },
        { id: 4, name: "Mouse", quantity: 1, price: 49 },
      ],
      total: 447,
      status: "Shipped",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Order List</h2>
      <div className="list-group">
        {orders.map((order) => (
          <div key={order.id} className="list-group-item">
            <h5 className="d-flex justify-content-between">
              Order #{order.id}
              <button
                className="btn btn-info btn-sm"
                onClick={() => setSelectedOrder(order)}
              >
                View Details
              </button>
            </h5>
            <p>
              <strong>Customer:</strong> {order.customer.name}
            </p>
            <p>
              <strong>Total:</strong> ${order.total}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};

export default OrderList;
