import React, { useState, useEffect } from "react";
import axios from "axios";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    discountPercentage: 0,
    rating: 0,
    category: "",
    stock: 0,
    imageUrl: "",
  });

  // ✅ Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  // ✅ Open Edit Modal with Correct Data
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      price: product.price || 0,
      discountPercentage: product.discountPercentage || 0,
      rating: product.rating || 0,
      description: product.description || "",
      category: product.category || "",
      stock: product.stock || 0,
      imageUrl: product.imageUrl || "",
      flashSaleActive: product.flashSaleActive || false,
    bigDealActive: product.bigDealActive || false,
    topPickActive: product.topPickActive || false
    });
    setShowModal(true);
  };

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "discountPercentage" || name === "rating" ? parseFloat(value) || 0 : value,
    });
  };

  // ✅ Save Edited Product (Update API)
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/products/${selectedProduct.id}`,
        {
          ...formData,
          discountPercentage: Number(formData.discountPercentage),
          rating: Number(formData.rating),
          flashSaleActive: formData.flashSaleActive === "true" || formData.flashSaleActive === true, 
          bigDealActive: formData.bigDealActive === "true" || formData.bigDealActive === true, 
          topPickActive: formData.topPickActive === "true" || formData.topPickActive === true
        },
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
  

  // ✅ Delete Product from Backend
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // ✅ Remove from UI
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
            <th>Discount</th>
            <th>Final Price</th>
            <th>Rating</th>
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
                <td>${product.price.toFixed(2)}</td>
                <td>{product.discountPercentage}%</td>
                <td>
                  <strong style={{ color: "green" }}>
                    ${ (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2) }
                  </strong>
                </td>
                <td>{product.rating ? `${product.rating} ⭐` : "No Rating"}</td>
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
              <td colSpan="10" className="text-center">No products found.</td>
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
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control mb-3" />

                <label>Price ($)</label>
                <input type="text" name="price" value={formData.price} onChange={handleInputChange} className="form-control mb-3" />

                <label>Discount Percentage (%)</label>
                <input type="text" name="discountPercentage" value={formData.discountPercentage} onChange={handleInputChange} className="form-control mb-3" min="0" max="100" />

                <label>Rating (0 - 5)</label>
                <input type="text" name="rating" value={formData.rating} onChange={handleInputChange} className="form-control mb-3" min="0" max="5" />

                <label>Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="form-control mb-3" />

                <label>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="form-control mb-3" />

                <label>Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="form-control mb-3" />
                {/* Flash Sale Active Checkbox */}
<label>
  <input
    type="checkbox"
    name="flashSaleActive"
    checked={formData.flashSaleActive}
    onChange={(e) => setFormData({ ...formData, flashSaleActive: e.target.checked })}
  />
  Flash Sale
</label>

{/* Big Deal Active Checkbox */}
<label>
  <input
    type="checkbox"
    name="bigDealActive"
    checked={formData.bigDealActive}
    onChange={(e) => setFormData({ ...formData, bigDealActive: e.target.checked })}
  />
  Big Deal
</label>

{/* Top Pick Active Checkbox */}
<label>
  <input
    type="checkbox"
    name="topPickActive"
    checked={formData.topPickActive}
    onChange={(e) => setFormData({ ...formData, topPickActive: e.target.checked })}
  />
  Top Pick
</label>

              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSaveChanges}>Save Changes</button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
