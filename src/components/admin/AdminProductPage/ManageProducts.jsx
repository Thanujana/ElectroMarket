import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spinner, Alert } from "react-bootstrap";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:8080/api/admins/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🛠️ API Response:", response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setLoading(false);
    }
  };

  // ✅ Approve Product
  const handleApprove = async (id) => {
    if (!id) {
      console.error("❌ Error: Product ID is undefined.");
      return;
    }
  
    console.log(`🛠️ Approving Product ID:`, id); // Debugging Log
  
    try {
      const token = localStorage.getItem("authToken");
  
      await axios.put(`http://localhost:8080/api/admins/products/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setMessage("✅ Product approved successfully.");
      setTimeout(() => setMessage(null), 3000);
  
      // ✅ Wait for the updated product list
      await fetchProducts();
    } catch (error) {
      console.error("❌ Error approving product:", error.response?.data || error);
    }
  };
  
  

  const handleDelete = async (id) => {
    if (!id) {
      console.error("❌ Error: Product ID is undefined.");
      return;
    }
  
    console.log("🛠️ Deleting Product ID:", id); // Debugging Log
  
    if (window.confirm(`Are you sure you want to delete this product?`)) {
      try {
        const token = localStorage.getItem("authToken");
  
        await axios.delete(`http://localhost:8080/api/admins/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setMessage("✅ Product deleted successfully.");
        setTimeout(() => setMessage(null), 3000);
  
        // ✅ Wait for the updated product list
        await fetchProducts();
      } catch (error) {
        console.error("❌ Error deleting product:", error.response?.data || error);
      }
    }
  };
  

  return (
    <div className="container mt-4">
      <h2>Manage Products</h2>

      {message && <Alert variant="success">{message}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.approved ? "Yes" : "No"}</td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
  {/* Approve Product */}
{/* Approve Product */}
{!product.approved && (
  <Button
    variant="success"
    size="sm"
    style={{ marginRight: "5px" }}
    onClick={() => handleApprove(product._id || product.id)}
  >
    Approve
  </Button>
)}

{/* Delete Product */}
<Button
  variant="danger"
  size="sm"
  style={{ marginTop: "5px" }}
  onClick={() => handleDelete(product._id || product.id)}
>
  Delete
</Button>

</td>

              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ManageProducts;
