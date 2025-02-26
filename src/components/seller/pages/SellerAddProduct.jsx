import React, { useState, useEffect } from "react";
import axios from "axios";
import category_list from "../../../assets/assets";

const SellerAddProduct = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "", 
    discountPercentage: "", 
    rating: "", // Allow decimals (e.g., 4.5)
    category: "",
    stock: "",
    imageUrl: "",
    flashSaleActive: false,
    bigDealActive: false,
    topPickActive: false,
  });
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    const authToken = localStorage.getItem("authToken"); 
    if (!authToken) {
      console.error("⚠️ No auth token found. Please log in.");
      return;
    }

    const response = await axios.get("http://localhost:8080/api/products", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    setProducts(response.data);
  } catch (error) {
    console.error("❌ Error fetching products:", error.response?.data || error.message);
  }
};


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Handle checkboxes
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setImageError("Please upload a valid image (jpg, jpeg, or png).");
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setImageError("File size exceeds 5MB. Please upload a smaller image.");
        return;
      }

      setImageError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.description || !formData.category || !formData.stock || !formData.imageUrl) {
        alert("⚠️ Please fill all fields, including image.");
        return;
    }

    const ratingValue = parseFloat(formData.rating);

    // Ensure rating is between 0 and 5
    if (ratingValue < 0 || ratingValue > 5) {
      alert("⚠️ Rating must be between 0 and 5.");
      return;
    }

    try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("⚠️ Please log in first.");
            return;
        }

        const productData = {
          ...formData,
          price: parseFloat(formData.price),
          discountPercentage: parseFloat(formData.discountPercentage),
          rating: ratingValue, // ✅ Ensure rating is a decimal number
          flashSaleActive: !!formData.flashSaleActive, 
          bigDealActive: !!formData.bigDealActive, 
          topPickActive: !!formData.topPickActive,
        };

        console.log("📤 Sending Product Data:", JSON.stringify(productData, null, 2));

        const response = await axios.post(
          "http://localhost:8080/api/products/add",
          productData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("✅ Product Added:", response.data);
        alert("✅ Product Added Successfully!");
        setProducts([...products, response.data]);  
        setFormData({ name: "", price: "", description: "", category: "", stock: "", imageUrl: "", flashSaleActive: false, bigDealActive: false, topPickActive: false });
    } catch (error) {
        console.error("❌ Error adding product:", error.response?.data || error.message);
        alert(`⚠️ Failed to add product: ${error.response?.data || "Check Console for details."}`);
    }
};

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add New Product</h2>
      <div className="card shadow-lg p-4">
        <label>Product Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control mb-3" />

        <label>Price ($)</label>
        <input type="text" name="price" value={formData.price} onChange={handleInputChange} className="form-control mb-3" />

        <label>Description</label>
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="form-control mb-3" />

        <label>Discount Percentage (%)</label>
        <input type="nutextmber" name="discountPercentage" value={formData.discountPercentage} onChange={handleInputChange} className="form-control mb-3" />

        <label>Rating (0 - 5)</label>
        <input type="text" name="rating" value={formData.rating} onChange={handleInputChange} className="form-control mb-3" min="0" max="5" step="0.1" />

        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleInputChange} className="form-control mb-3">
          <option value="">-- Select Category --</option>
          {category_list.map((cat, index) => (
              <option key={index} value={cat.category_name}>
                  {cat.category_name.replace(/-/g, " ")}
              </option>
          ))}
        </select>

        <label>Stock</label>
        <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="form-control mb-3" />

        <label>Product Image</label>
        <input type="file" className="form-control mb-3" onChange={handleImageUpload} />
        {imageError && <div className="text-danger">{imageError}</div>}
        {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" width="100" height="100" className="mt-2" />}

        {/* Checkboxes for Flash Sale, Big Deal, and Top Pick */}
        <div className="form-check mt-2">
          <input type="checkbox" className="form-check-input" id="flashSaleActive" name="flashSaleActive" checked={formData.flashSaleActive} onChange={handleInputChange} />
          <label className="form-check-label" htmlFor="flashSaleActive">Flash Sale</label>
        </div>

        <div className="form-check mt-2">
          <input type="checkbox" className="form-check-input" id="bigDealActive" name="bigDealActive" checked={formData.bigDealActive} onChange={handleInputChange} />
          <label className="form-check-label" htmlFor="bigDealActive">Big Deal</label>
        </div>

        <div className="form-check mt-2">
          <input type="checkbox" className="form-check-input" id="topPickActive" name="topPickActive" checked={formData.topPickActive} onChange={handleInputChange} />
          <label className="form-check-label" htmlFor="topPickActive">Top Pick</label>
        </div>

        <button className="btn btn-success mt-3" onClick={handleSubmit}>Add Product</button>
      </div>
    </div>
  );
};

export default SellerAddProduct;
