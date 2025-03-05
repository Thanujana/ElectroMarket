import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {}; // Ensure order is retrieved safely

  if (!order) {
    return (
      <div className="container mt-5">
        <h1>Order Not Found</h1>
        <p>No order details available. Please place an order first.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Order Confirmation</h1>
      <div className="p-4 border rounded bg-light">
        <h4>Order Details</h4>
        <p><strong>Order ID:</strong> {order.id || "N/A"}</p>
        <p><strong>Tracking ID:</strong> {order.trackingId || "N/A"}</p>
        <p><strong>Status:</strong> {order.status || "Pending"}</p>

        <hr />

        <h4>Shipping Address</h4>
        <p><strong>Name:</strong> {order.shippingAddress?.fullName || "N/A"}</p>
        <p><strong>Address:</strong> {order.shippingAddress?.address || "N/A"}</p>
        <p><strong>Phone:</strong> {order.shippingAddress?.phoneNumber || "N/A"}</p>
        <p><strong>Email:</strong> {order.shippingAddress?.email || "N/A"}</p>
        <p><strong>Postal Code:</strong> {order.shippingAddress?.postalCode || "N/A"}</p>

        <hr />

        <h4>Order Items</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/50"}
                      alt={item.name || "Product Image"}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.name || "Unknown Item"}</td>
                  <td>${item.price?.toFixed(2) || "0.00"}</td>
                  <td>{item.quantity || 0}</td>
                  <td>${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5 className="mt-3">
          Total Amount: ${order.totalAmount?.toFixed(2) || "0.00"}
        </h5>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button
  className="btn btn-danger"
  onClick={() =>
    navigate("/payment", {
      state: {
        totalAmount: order.totalAmount, // ✅ Pass the total amount
      },
    })
  }
>
  Pay Now
</button>

        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
