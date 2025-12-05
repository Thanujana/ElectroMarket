import React, { useEffect, useState } from "react";
import axios from "axios";

const UserApproval = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admins/users");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users.");
    }
  };

  const approveUser = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/admins/users/approve/${userId}`);
      alert("User approved successfully!");
      fetchUsers(); // Refresh the user list
    } catch (error) {
      alert("Failed to approve user.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Approve Users</h2>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.roles.map((role) => role.role).join(", ")}</td>
              <td>{user.roles.some(role => role.role === "ROLE_APPROVED_USER") ? "Approved" : "Pending"}</td>
              <td>
                {!user.roles.some(role => role.role === "ROLE_APPROVED_USER") && (
                  <button className="btn btn-success" onClick={() => approveUser(user.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserApproval;
