import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile =() =>{
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Get user data from localStorage
      const user = JSON.parse(localStorage.getItem("userData"));
      if (user) {
        setUserData(user);
      } else {
        // If no user is logged in, redirect to login
        navigate("/login");
      }
    }, [navigate]);
  
    if (!userData) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-header">
            <h2>Welcome, {userData.name}</h2>
          </div>
          <div className="card-body">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role === "admin" ? "Admin" : "Buyer"}</p>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-dark"
              onClick={() => {
                localStorage.removeItem("userData"); // Clear user data
                navigate("/login"); // Redirect to login
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