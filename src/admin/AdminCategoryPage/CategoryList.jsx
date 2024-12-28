import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home Appliances" },
    { id: 4, name: "Books" },
  ]);

  const navigate = useNavigate();

  // Handle Add Category
  const handleAddCategory = () => {
    navigate("/admin/add-category");
  };

  // Handle Edit Category
  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };

  // Handle Delete Category
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
      const updatedCategories = categories.filter((category) => category.id !== id);
      setCategories(updatedCategories);
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
    </div>
  );
};

export default CategoryList;
