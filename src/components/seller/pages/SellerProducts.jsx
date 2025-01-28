import React, { useState } from "react";

const SellerProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, productName: "Smartphone", price: 699, category: "Electronics", stock: 10, image: "" },
    { id: 2, productName: "Laptop", price: 999, category: "Electronics", stock: 5, image: "" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  // Open Edit Modal
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save Edited Product
  const handleSaveChanges = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === selectedProduct.id ? { ...formData, id: selectedProduct.id } : product
      )
    );
    setShowModal(false);
  };

  // Delete Product
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                {product.image ? (
                  <img src={product.image} alt="Product" width="50" height="50" />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
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
                  name="productName"
                  value={formData.productName}
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
