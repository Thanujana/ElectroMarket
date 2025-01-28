import React, { useState, useEffect } from "react";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false); // To toggle the modal
  const [currentCategory, setCurrentCategory] = useState(null); // For edit mode
  const [categoryName, setCategoryName] = useState(""); // Input field value
  const [categoryImage, setCategoryImage] = useState(null); // Image input

  // Simulating API call with mock data
  useEffect(() => {
    // Mock API call
    const fetchCategories = () => {
      const mockData = [
        { id: 1, name: "Electronics", image: null },
        { id: 2, name: "Consumer Electronics", image: null },
        { id: 3, name: "Home Appliances", image: null },
        { id: 4, name: "Home Appliances", image: null },

      ];
      setTimeout(() => {
        setCategories(mockData);
      }, 1000); // Simulate network delay
    };

    fetchCategories();
  }, []);

  // Save Category (Add or Edit)
  const handleSave = () => {
    if (!categoryName || !categoryImage) {
      alert("Please provide both category name and image.");
      return;
    }

    if (currentCategory) {
      // Edit existing category
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === currentCategory.id
            ? { ...category, name: categoryName, image: categoryImage }
            : category
        )
      );
    } else {
      // Add new category
      const newCategory = {
        id: categories.length + 1,
        name: categoryName,
        image: categoryImage,
      };
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    }

    setShowModal(false);
    setCategoryName("");
    setCategoryImage(null);
  };

  // Handle Add Category
  const handleAddCategory = () => {
    setCurrentCategory(null);
    setCategoryName("");
    setCategoryImage(null);
    setShowModal(true);
  };

  // Handle Edit Category
  const handleEdit = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    setCurrentCategory(categoryToEdit);
    setCategoryName(categoryToEdit.name);
    setCategoryImage(categoryToEdit.image);
    setShowModal(true);
  };

  // Handle Delete Category
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2 className="text-center">Manage Categories</h2>
        <button className="btn btn-primary" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <p className="text-center">Loading categories...</p>
      ) : (
        <ul className="list-group">
          {categories.map((category) => (
            <li
              key={category.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
                  />
                )}
                <span>{category.name}</span>
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(category.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Add/Edit Category */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentCategory ? "Edit Category" : "Add Category"}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {categoryImage && (
                  <img
                    src={categoryImage}
                    alt="Preview"
                    style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSave}>
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

export default CategoryList;
