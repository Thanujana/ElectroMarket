import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Home Appliances",
      subcategories: [
        {
          id: 1,
          name: "Washing Machines",
          products: [
            { id: 1, name: "Top Load", description: "Efficient top load washer", price: 549, image: "" },
            { id: 2, name: "Front Load", description: "Deep clean washer", price: 699, image: "" },
          ],
        },
        {
          id: 2,
          name: "Refrigerators",
          products: [
            { id: 3, name: "Double Door", description: "Spacious and efficient", price: 799, image: "" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Consumer Electronics",
      subcategories: [
        {
          id: 3,
          name: "Televisions",
          products: [
            { id: 4, name: "4K TV", description: "Ultra HD television", price: 1199, image: "" },
          ],
        },
      ],
    },
  ]);

  const addProduct = (categoryId, subcategoryId, product) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.map((subcategory) =>
                subcategory.id === subcategoryId
                  ? {
                      ...subcategory,
                      products: [...subcategory.products, product],
                    }
                  : subcategory
              ),
            }
          : category
      )
    );
  };


  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleDeleteProduct = (categoryId, subcategoryId, productId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              subcategories: category.subcategories.map((subcategory) =>
                subcategory.id === subcategoryId
                  ? {
                      ...subcategory,
                      products: subcategory.products.filter(
                        (product) => product.id !== productId
                      ),
                    }
                  : subcategory
              ),
            }
          : category
      )
    );
  };

  const handleEditProduct = (category, subcategory, product) => {
    setCurrentCategory(category);
    setCurrentSubcategory(subcategory);
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setShowModal(true); // Open modal
  };

  const handleSaveProduct = () => {
    const { name, description, price, image } = formData;

    if (!name.trim() || !description.trim() || !price || !image.trim()) {
      alert("All fields are required!");
      return;
    }

    const updatedProduct = { ...currentProduct, ...formData, price: parseFloat(price) };

    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === currentCategory.id
          ? {
              ...category,
              subcategories: category.subcategories.map((subcategory) =>
                subcategory.id === currentSubcategory.id
                  ? {
                      ...subcategory,
                      products: subcategory.products.map((product) =>
                        product.id === currentProduct.id ? updatedProduct : product
                      ),
                    }
                  : subcategory
              ),
            }
          : category
      )
    );

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
          <h3>{category.name}</h3>
          {category.subcategories.map((subcategory) => (
            <div key={subcategory.id} className="mb-3">
              <h4 className="d-flex justify-content-between align-items-center">
                {subcategory.name}
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate("/admin/products/add")}
                >
                  Add Product
                </button>
              </h4>
              <ul className="list-group">
                {subcategory.products.length > 0 ? (
                  subcategory.products.map((product) => (
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
                            onClick={() => handleEditProduct(category, subcategory, product)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDeleteProduct(category.id, subcategory.id, product.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted">
                    No products available in this subcategory.
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      ))}

      {/* Modal for Editing */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
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
                  type="text"
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
