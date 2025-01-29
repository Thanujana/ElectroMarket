import React from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Role.css";
import { FaUser, FaStore, FaUserShield } from "react-icons/fa";

const Role = () => {
  const navigate = useNavigate();

  return (
    <div className="role-container">
      <div className="role-box">
        <h2>Select Your Role</h2>

        <button className="role-button buyer" onClick={() => navigate("/login?role=buyer")}>
          <FaUser /> Login as Buyer
        </button>

        <button className="role-button seller" onClick={() => navigate("/login?role=seller")}>
          <FaStore /> Login as Seller
        </button>

        <button className="role-button admin" onClick={() => navigate("/login?role=admin")}>
          <FaUserShield /> Login as Admin
        </button>
      </div>
    </div>
  );
};

export default Role;
