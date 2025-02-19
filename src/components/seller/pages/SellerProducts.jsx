import React, { useState, useEffect } from "react";
import axios from "axios";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",  // ✅ Ensure this matches backend
    category: "",
    stock: "",
    imageUrl: "",  // ✅ Fix field name for backend consistency
  });

  // ✅ Fetch products from backend when component loads
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // ✅ Ensure token is sent
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Save Edited Product (Update Backend)
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/products/${selectedProduct.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id ? response.data : product
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error updating product:", error);
    }
  };

  // ✅ Delete Product (Remove from Backend)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("❌ Error deleting product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage My Products</h2>
      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt="Product" width="50" height="50" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                <div className="d-flex justify-content-center gap-2">
  <button className="btn btn-warning btn-sm px-1" onClick={() => handleEdit(product)}>
    ✏️ Edit
  </button>
  <button className="btn btn-danger btn-sm px-1" onClick={() => handleDelete(product.id)}>
    🗑️ Delete
  </button>
</div>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Product Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />

                <label>Price ($)</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />

                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />

                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />

                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
