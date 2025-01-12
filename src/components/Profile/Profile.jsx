import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Profile.css";
import profileImage from "../../assets/profile_image.png";
import { FaPen } from "react-icons/fa"; // FontAwesome Pen Icon

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editedField, setEditedField] = useState(null); // To track which field is being edited
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    if (user) {
      setUserData(user);
    } else {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);

  const handleEditClick = (field) => {
    setEditedField(field); // Set the field currently being edited
    setEditedData({ ...editedData, [field]: userData[field] }); // Prepopulate the current value
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const saveChanges = () => {
    const updatedUser = { ...userData, ...editedData };
    setUserData(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser)); // Save changes to localStorage
    setEditedField(null); // Exit edit mode
  };

  const handleBlur = () => {
    saveChanges(); // Save changes when the user clicks outside the input field
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

  return (
    <div className="container mt-5">
      <div className="card profile-card shadow">
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

          {/* Editable Phone */}
          <div className="d-flex align-items-center mt-3">
            <strong className="me-2">Phone:</strong>
            {editedField === "phone" ? (
              <input
                type="text"
                name="phone"
                value={editedData.phone || ""}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="form-control form-control-sm"
                style={{ width: "200px" }}
                autoFocus
              />
            ) : (
              <>
                <span>{userData.phone || "Not Provided"}</span>
                <FaPen
                  className="ms-2 text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditClick("phone")}
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
        </div>

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
