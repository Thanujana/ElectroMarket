import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductList = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      products: [
        { id: 1, name: "Smartphone", description: "A high-tech phone", price: 699, image: "" },
        { id: 2, name: "Laptop", description: "Portable computer", price: 999, image: "" },
      ],
    },
    {
      id: 2,
      name: "Consumer Electronics",
      products: [
        { id: 3, name: "Monitor", description: "HD monitor", price: 199, image: "" },
        { id: 4, name: "Mouse", description: "Wireless mouse", price: 49, image: "" },
      ],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleAddProduct = (category) => {
    setCurrentCategory(category);
    setCurrentProduct(null);
    setFormData({ name: "", description: "", price: "", image: "" });
    setShowModal(true);
  };

  const handleEditProduct = (category, product) => {
    setCurrentCategory(category);
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    const { name, description, price, image } = formData;

    if (!name.trim() || !description.trim() || !price || !image.trim()) {
      alert("All fields are required!");
      return;
    }

    const updatedProduct = { ...currentProduct, ...formData, price: parseFloat(price) };

    if (currentProduct) {
      // Update existing product
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === currentCategory.id
            ? {
                ...category,
                products: category.products.map((product) =>
                  product.id === currentProduct.id ? updatedProduct : product
                ),
              }
            : category
        )
      );
    } else {
      // Add new product
      const newProduct = { ...formData, id: Date.now(), price: parseFloat(price) };
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === currentCategory.id
            ? { ...category, products: [...category.products, newProduct] }
            : category
        )
      );
    }

    setShowModal(false);
    setFormData({ name: "", description: "", price: "", image: "" });
    setCurrentProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
                  <div>
                    <strong>{product.name}</strong>
                    <p className="mb-1 text-muted">{product.description}</p>
                    <span className="text-success">${product.price}</span>
                  </div>
                  <div>
                    <img
                      src={product.image || "https://via.placeholder.com/50"}
                      alt={product.name}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <div>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditProduct(category, product)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
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
                  {currentProduct ? "Edit Product" : "Add Product"} to {currentCategory?.name}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSaveProduct}>
                  Save
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

export default ProductList;
