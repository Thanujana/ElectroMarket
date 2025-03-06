import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spinner, Alert } from "react-bootstrap";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:8080/api/admins/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🛠️ API Response:", response.data); // Debugging
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleAction = async (action, email) => {
    if (!email) {
      console.error(`❌ Error: Email is undefined for ${action}`);
      return;
    }

    if (window.confirm(`Are you sure you want to ${action} user with email ${email}?`)) {
      try {
        const token = localStorage.getItem("authToken");

        console.log(`🛠️ Sending ${action.toUpperCase()} request for email:`, email);

        await axios.put(`http://localhost:8080/api/admins/users/${action}?email=${email}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, active: action === "unblock" } : user
          )
        );

        setMessage(`User ${action}d successfully.`);
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        console.error(`❌ Error ${action}ing user:`, error.response?.data || error);
      }
    }
  };

  const handleDelete = async (email) => {
    if (!email) {
      console.error("❌ Error: Email is undefined.");
      return;
    }

    if (window.confirm(`Are you sure you want to delete user with email ${email}?`)) {
      try {
        const token = localStorage.getItem("authToken");

        console.log("🛠️ Sending DELETE request for email:", email);

        await axios.delete(`http://localhost:8080/api/admins/users/delete?email=${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));

        setMessage(`User with email ${email} deleted successfully.`);
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        console.error("❌ Error deleting user:", error.response?.data || error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Users</h2>

      {/* ✅ Display Success Message */}
      {message && <Alert variant="success">{message}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Active</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email || Math.random()}>
                <td>{user.email || "❌ Email Missing"}</td>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.active ? "Yes" : "No"}</td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {/* Block/Unblock Button */}
                  {user.email ? (
                    user.active ? (
                      <Button
                        variant="warning"
                        size="sm"
                        style={{ marginRight: "8px", padding: "6px 12px" }}
                        onClick={() => handleAction("block", user.email)}
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        variant="info"
                        size="sm"
                        style={{ marginRight: "8px", padding: "6px 12px" }}
                        onClick={() => handleAction("unblock", user.email)}
                      >
                        Unblock
                      </Button>
                    )
                  ) : (
                    <span>❌ No Email Found</span>
                  )}

                  {/* Delete Button */}
                  {user.email ? (
                    <Button
                      variant="danger"
                      size="sm"
                      style={{ padding: "6px 12px" }}
                      onClick={() => {
                        console.log("🛠️ User Object Before Deletion:", user);
                        console.log("🛠️ Extracted Email:", user.email);
                        handleDelete(user.email);
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    <span>❌ No Email Found</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ManageUsers;
