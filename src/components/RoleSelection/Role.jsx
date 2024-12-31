import React from "react";
import { useNavigate } from "react-router-dom";

const Role = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, rgba(0, 128, 255, 0.7), rgba(0, 255, 128, 0.6))",
      }}
    >
      <div className="row w-75 shadow-lg">
        <div className="col-md-6 bg-primary text-white p-5 d-flex flex-column justify-content-center">
          <h1 className="display-6">Welcome to ElectroMart</h1>
          <p className="lead">Choose your role to log in or register:</p>
        </div>
        <div className="col-md-6 bg-white p-5 d-flex flex-column align-items-center">
          <h2 className="mb-4 text-primary">Select Your Role</h2>
          <div
            className="card mb-3 p-3 w-75 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login/buyer")}
          >
            <h4>Buyer</h4>
            <p className="text-muted">Log in as a Buyer</p>
          </div>
          <div
            className="card p-3 w-75 text-center"
            style={{ cursor: "pointer" }}
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
