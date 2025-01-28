import React, { useState, useEffect } from "react";

const SellerAddProduct = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("sellerProducts")) || [];
    setProducts(savedProducts);
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Product Addition
  const handleSubmit = () => {
    if (!formData.productName || !formData.price || !formData.category || !formData.stock || !formData.image) {
      alert("Please fill all fields, including image.");
      return;
    }

    const newProduct = { ...formData, id: products.length + 1 };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts));
    setFormData({ productName: "", price: "", category: "", stock: "", image: "" });
    alert("Product Added!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add New Product</h2>
      <div className="card shadow-lg p-4">
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

        <label>Product Image</label>
        <input type="file" className="form-control mb-3" onChange={handleImageUpload} />
        {formData.image && (
          <img src={formData.image} alt="Preview" width="100" height="100" className="mt-2" />
        )}

        <button className="btn btn-success mt-3" onClick={handleSubmit}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default SellerAddProduct;
