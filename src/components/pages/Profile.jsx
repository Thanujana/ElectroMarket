import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Profile.css";
import profileImage from "../../assets/profile_image.png";
import { FaPen } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editedField, setEditedField] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user info on mount
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      setUserData(response.user);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to fetch user info");
    }
  };

  const handleEditClick = (field) => {
    setEditedField(field);
    setEditedData({ ...editedData, [field]: userData[field] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const saveChanges = () => {
    const updatedUser = { ...userData, ...editedData };
    setUserData(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser)); // Save changes locally
    setEditedField(null);
  };

  const handleBlur = () => {
    saveChanges();
  };

  const handleAddressClick = () => {
    navigate(userData.address ? "/edit-address" : "/add-address");
  };

  const handleDashboardNavigation = () => {
    if (!userData || !userData.role) {
      alert("Role is missing or invalid.");
      return;
    }

    if (userData.role.toLowerCase() === "admin") {
      navigate("/admin/dashboard");
    } else if (userData.role.toLowerCase() === "buyer") {
      navigate("/buyer/dashboard");
    } else {
      alert("Unknown role. Please contact support.");
    }
  };

  if (!userData) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  // Pagination for orders
  const orderItemList = userData.orderItemList || [];
  const totalPages = Math.ceil(orderItemList.length / itemsPerPage);
  const paginatedOrders = orderItemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-5 profile-page">
      <div className="card profile-card shadow">
        {/* Profile Image */}
        <div className="text-center mt-4">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>
        <div className="card-body">
          <h3 className="text-center mb-4">Welcome, {userData.name}</h3>

          {/* Editable Name */}
          <div className="d-flex align-items-center">
            <strong className="me-2">Name:</strong>
            {editedField === "name" ? (
              <input
                type="text"
                name="name"
                value={editedData.name || ""}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="form-control form-control-sm"
                style={{ width: "200px" }}
                autoFocus
              />
            ) : (
              <>
                <span>{userData.name}</span>
                <FaPen
                  className="ms-2 text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditClick("name")}
                />
              </>
            )}
          </div>

          {/* Editable Email */}
          <div className="d-flex align-items-center mt-3">
            <strong className="me-2">Email:</strong>
            {editedField === "email" ? (
              <input
                type="email"
                name="email"
                value={editedData.email || ""}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="form-control form-control-sm"
                style={{ width: "200px" }}
                autoFocus
              />
            ) : (
              <>
                <span>{userData.email}</span>
                <FaPen
                  className="ms-2 text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditClick("email")}
                />
              </>
            )}
          </div>

          {/* Role Display */}
          <p className="mt-3">
            <strong>Role:</strong>{" "}
            <span
              className={`badge ${userData.role === "admin" ? "bg-primary" : "bg-success"}`}
            >
              {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
            </span>
          </p>

          {/* Address Section */}
          <div className="mt-4">
            <h3>Address</h3>
            {userData.address ? (
              <div>
                <p><strong>Street:</strong> {userData.address.street}</p>
                <p><strong>City:</strong> {userData.address.city}</p>
                <p><strong>State:</strong> {userData.address.state}</p>
                <p><strong>Zip Code:</strong> {userData.address.zipCode}</p>
                <p><strong>Country:</strong> {userData.address.country}</p>
              </div>
            ) : (
              <p>No Address information available</p>
            )}
            <button className="btn btn-secondary" onClick={handleAddressClick}>
              {userData.address ? "Edit Address" : "Add Address"}
            </button>
          </div>

          {/* Order History Section */}
          <div className="mt-4">
            <h3>Order History</h3>
            <ul>
              {paginatedOrders.map((order) => (
                <li key={order.id} className="order-item">
                  <img src={order.product?.imageUrl} alt={order.product.name} />
                  <div>
                    <p><strong>Name:</strong> {order.product.name}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Price:</strong> Rs {order.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>

        {/* Footer Section */}
        <div className="card-footer text-center">
          <button className="btn btn-primary me-2" onClick={handleDashboardNavigation}>
            Go to Dashboard
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
