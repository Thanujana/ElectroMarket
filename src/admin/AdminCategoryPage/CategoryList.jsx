import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Consumer Electronics" },
    { id: 3, name: "Home Appliances" },
    { id: 4, name: "........." },
  ]);

  const [showModal, setShowModal] = useState(false); // To toggle the modal
  const [currentCategory, setCurrentCategory] = useState(null); // For edit mode
  const [categoryName, setCategoryName] = useState(""); // Input field value

  // Handle Add Category
  const handleAddCategory = () => {
    setCurrentCategory(null);
    setCategoryName("");
    setShowModal(true);
  };

  // Save Category (Add or Edit)
  const handleSave = () => {
    if (currentCategory) {
      // Edit existing category
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === currentCategory.id ? { ...category, name: categoryName } : category
        )
      );
    } else {
      // Add new category
      const newCategory = {
        id: categories.length + 1,
        name: categoryName,
      };
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    }
    setShowModal(false);
    setCategoryName("");
  };

  // Handle Edit Category
  const handleEdit = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    setCurrentCategory(categoryToEdit);
    setCategoryName(categoryToEdit.name);
    setShowModal(true);
  };

  // Handle Delete Category
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
        setCategories(categories.filter((category) => category.id !== id));
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

        <ul className="list-group">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                 <span>{category.name}</span>
                 <div>
                 <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(category.id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center">No categories available.</li>
          )}
        </ul>
     {/* Modal for Add/Edit Category */}
        {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">{currentCategory ? "Edit Category" : "Add Category"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            </div>
            <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSave}>
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

export default CategoryList;
