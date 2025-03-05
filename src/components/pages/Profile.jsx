import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import "../../style/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await ApiService.getUserProfile();
        console.log("✅ User data received:", data);
        if (!data) throw new Error("Session expired");

        setUserData(data);
        setUpdatedProfile(data);
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
        setError(error.response?.data?.message || "Session expired. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const updatedData = { ...updatedProfile };

      if (!updatedData.password) {
        delete updatedData.password;
      }

      await ApiService.updateUserProfile(updatedData);
      alert("Profile updated successfully!");
      setEditMode(false);
      setUserData(updatedData);
    } catch (error) {
      console.error("❌ Failed to update profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p className="loading">Loading profile...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="profile-container">
      <h1>Welcome, {userData?.userName || "Guest"}</h1>
      <p><strong>Email:</strong> {userData?.email || "Not available"}</p>
      <p><strong>Role:</strong> {userData?.roles?.map(role => role.role).join(", ") || "No roles assigned"}</p>

      {editMode ? (
        <div className="edit-form">
          <label>Username:</label>
          <input
            type="text"
            value={updatedProfile?.userName || ""}
            onChange={(e) => setUpdatedProfile({ ...updatedProfile, userName: e.target.value })}
            placeholder="Enter new username"
          />

          <label>New Password (Optional):</label>
          <input
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setUpdatedProfile({ ...updatedProfile, password: e.target.value })}
          />

          <button className="btn-save" onClick={handleUpdate}>Save</button>
          <button className="btn-cancel" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <button className="btn-edit" onClick={() => setEditMode(true)}>Edit Profile</button>
      )}

      <button className="btn-logout" onClick={() => {
        ApiService.logout();
        navigate("/login");
      }}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
