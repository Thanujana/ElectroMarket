import React, { useState } from "react";

const ProductList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", products: [{ id: 1, name: "Smartphone" }, { id: 2, name: "Laptop" }] },
    { id: 2, name: "Consumer Electronics", products: [{ id: 3, name: "monitor" }, { id: 4, name: "Mouse" }] },
    { id: 3, name: "Home Appliances", products: [{ id: 5, name: "Microwave" }, { id: 6, name: "Vacuum Cleaner" }] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [productName, setProductName] = useState("");

  // Handle Add Product
  const handleAddProduct = (category) => {
    setCurrentCategory(category);
    setProductName("");
    setShowModal(true);
  };

  // Save Product
  const handleSaveProduct = () => {
    if (!productName.trim()) {
      alert("Product name cannot be empty.");
      return;
    }

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

    setShowModal(false);
    setProductName("");
  };

  return (
    <div>
      <h2>Manage Products</h2>

      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <button onClick={() => handleAddProduct(category)}>Add Product</button>
          <ul>
            {category.products.length > 0 ? (
              category.products.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))
            ) : (
              <li>No products available in this category.</li>
            )}
          </ul>
        </div>
      ))}

      {showModal && (
        <div>
          <h3>Add Product to {currentCategory?.name}</h3>
          <input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <button onClick={handleSaveProduct}>Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
