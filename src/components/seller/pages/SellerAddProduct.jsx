import React, { useState, useEffect } from "react";
import axios from "axios";
import category_list from "../../../assets/assets"; 


const SellerAddProduct = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",  // ✅ Fix: Added missing field
    category: "",
    stock: "",
    imageUrl: "",  // ✅ Fix: Renamed to match backend
  });
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        setFormData({ ...formData, imageUrl: reader.result }); // ✅ Fix: Store image as `imageUrl`
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.description || !formData.category || !formData.stock || !formData.imageUrl) {
        alert("⚠️ Please fill all fields, including image.");
        return;
    }

    try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("⚠️ Please log in first.");
            return;
        }

        console.log("📤 Sending Product Data:", JSON.stringify(formData, null, 2)); // ✅ Debugging
        console.log("🔑 Auth Token:", authToken); // ✅ Debugging

        const response = await axios.post(
            "http://localhost:8080/api/products/add",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`, // ✅ Ensure correct token format
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("✅ Product Added:", response.data);
        alert("✅ Product Added Successfully!");
        setProducts([...products, response.data]);  
        setFormData({ name: "", price: "", description: "", category: "", stock: "", imageUrl: "" });
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

        <label>Category</label>
<select 
    name="category" 
    value={formData.category} 
    onChange={handleInputChange} 
    className="form-control mb-3"
>
    <option value="">-- Select Category --</option>
    {category_list.map((cat, index) => (
        <option key={index} value={cat.category_name}>
            {cat.category_name.replace(/-/g, " ")} {/* Display category names properly */}
        </option>
    ))}
</select>


        <label>Stock</label>
        <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="form-control mb-3" />

        <label>Product Image</label>
        <input type="file" className="form-control mb-3" onChange={handleImageUpload} />
        {imageError && <div className="text-danger">{imageError}</div>}
        {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" width="100" height="100" className="mt-2" />}

        <button className="btn btn-success mt-3" onClick={handleSubmit}>Add Product</button>
      </div>
    </div>
  );
};

export default SellerAddProduct;