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
    <div className="modal show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Order #{order.id} Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
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
            <ul className="list-group mb-3">
              {order.items.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.quantity} x {item.name} - ${item.price * item.quantity}
                </li>
              ))}
            </ul>

            <h6>Total: ${order.total}</h6>

            <h6 className="mt-4">Update Order Status</h6>
            <div className="form-group">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={handleSaveStatus}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
