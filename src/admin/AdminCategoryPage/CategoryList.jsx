import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home Appliances" },
    { id: 4, name: "Books" },
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
    <div className="admin-category-page">
      <div className="admin-category-list">
        <h2>Manage Categories</h2>
        <button className="btn-add-category" onClick={handleAddCategory}>
          Add Category
        </button>
        <ul>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="category-item">
                <span className="category-name">{category.name}</span>
                <div className="admin-btns">
                  <button className="btn-edit" onClick={() => handleEdit(category.id)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(category.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="no-category">No categories available.</li>
          )}
        </ul>
      </div>

        {/* Modal for Add/Edit Category */}
        {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{currentCategory ? "Edit Category" : "Add Category"}</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
