import React from "react";
import { useNavigate } from "react-router-dom";

const Role = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('/Bg_2.jpg')", // Use your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="row w-75 shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.3)", // Semi-transparent white
          backdropFilter: "blur(10px)", // Glass effect
          borderRadius: "15px", // Rounded corners
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)", // Shadow for depth
        }}
      >
        <div className="col-md-6 text-dark p-5 d-flex flex-column justify-content-center">
          <h1 className="display-6">Welcome to ElectroMart</h1>
          <p className="lead">Choose your role to log in or register:</p>
        </div>
        <div className="col-md-6 bg-white p-5 d-flex flex-column align-items-center">
          <h2 className="mb-4"
          style={{
            color: "#003366", // Dark blue
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", // Subtle shadow for depth
          }} >Select Your Role</h2>
          <div
            className="card mb-3 p-3 w-75 text-center"
            style={{ cursor: "pointer", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            onClick={() => navigate("/login/buyer")}
          >
            <h4>Buyer</h4>
            <p className="text-muted">Log in as a Buyer</p>
          </div>
          <div
            className="card p-3 w-75 text-center"
            style={{ cursor: "pointer", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            onClick={() => navigate("/login/seller")}
          >
            <h4>Seller</h4>
            <p className="text-muted">Log in as a Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
