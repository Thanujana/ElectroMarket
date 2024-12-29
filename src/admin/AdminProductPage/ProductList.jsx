import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", products: [{ id: 1, name: "Smartphone" }, { id: 2, name: "Laptop" }] },
    { id: 2, name: "Consumer Electronics", products: [{ id: 3, name: "Monitor" }, { id: 4, name: "Mouse" }] },
    { id: 3, name: "Home Appliances", products: [{ id: 5, name: "Microwave" }, { id: 6, name: "Vacuum Cleaner" }] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productName, setProductName] = useState("");

  const handleAddProduct = (category) => {
    setCurrentCategory(category);
    setCurrentProduct(null);
    setProductName("");
    setShowModal(true);
  };

  const handleEditProduct = (category, product) => {
    setCurrentCategory(category);
    setCurrentProduct(product);
    setProductName(product.name);
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    if (!productName.trim()) {
      alert("Product name cannot be empty.");
      return;
    }

    if (currentProduct) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === currentCategory.id
            ? {
                ...category,
                products: category.products.map((product) =>
                  product.id === currentProduct.id ? { ...product, name: productName } : product
                ),
              }
            : category
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: productName,
      };

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === currentCategory.id
            ? { ...category, products: [...category.products, newProduct] }
            : category
        )
      );
    }

    setShowModal(false);
    setProductName("");
    setCurrentProduct(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Products</h2>

      {categories.map((category) => (
        <div key={category.id} className="mb-4 border rounded p-3 bg-light shadow-sm">
          <h3 className="d-flex justify-content-between align-items-center">
            {category.name}
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleAddProduct(category)}
            >
              Add Product
            </button>
          </h3>
          <ul className="list-group">
            {category.products.length > 0 ? (
              category.products.map((product) => (
                <li
                  key={product.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {product.name}
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEditProduct(category, product)}
                  >
                    Edit
                  </button>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No products available in this category.</li>
            )}
          </ul>
        </div>
      ))}

      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentProduct ? "Edit Product" : "Add Product"} to{" "}
                  {currentCategory?.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={handleSaveProduct}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
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

export default ProductList;
