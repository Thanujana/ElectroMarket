import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserApproval = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (userRole !== "ROLE_ADMIN") {
      navigate(userRole === "ROLE_BUYER" ? "/buyer/dashboard" : "/seller/dashboard");
    } else {
      fetchPendingUsers();
    }
  }, [token, userRole, navigate]);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/pending-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users.");
      setLoading(false);
    }
  };

  const handleApproval = async (userId, action) => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/${action}-user`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`User ${action}ed successfully!`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user.`);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">User Approval</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No pending users for approval.</p>
      ) : (
        <Table className="bg-white shadow-md rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button className="bg-green-500 hover:bg-green-600 mx-1" onClick={() => handleApproval(user.id, "approve")}>
                    Approve
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600 mx-1" onClick={() => handleApproval(user.id, "reject")}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserApproval;
