import React, { useState } from "react";


const OrderDetails = ({ order, onClose }) => {
  const [status, setStatus] = useState(order.status);

  const handleSaveStatus = () => {
    if (!status.trim()) {
      alert("Status cannot be empty!");
      return;
    }
    alert(`Order #${order.id} status updated to "${status}"`);
    onClose(); // Close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h5>Order #{order.id} Details</h5>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <h6>Customer Information</h6>
          <p>
            <strong>Name:</strong> {order.customer.name}
          </p>
          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.customer.phone}
          </p>
          <p>
            <strong>Address:</strong> {order.customer.address}
          </p>

          <h6>Items Ordered</h6>
          <ul className="item-list">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.quantity} x {item.name} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>

          <h6>Total: ${order.total}</h6>

          <h6 className="status-header">Update Order Status</h6>
          <select
            className="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="modal-footer">
          <button className="btn save-btn" onClick={handleSaveStatus}>
            Save
          </button>
          <button className="btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
