import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ addProduct }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    dimensions: { length: "", width: "", height: "" },
    price: "",
    availability: "",
    categories: [],
    photos: [],
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.productName) newErrors.productName = "Product name is required.";
      if (!formData.productDescription) newErrors.productDescription = "Description is required.";
      if (!formData.price || formData.price <= 0) newErrors.price = "Price must be greater than 0.";
      if (!formData.availability || formData.availability <= 0)
        newErrors.availability = "Availability must be greater than 0.";
    }

    if (step === 2) {
      if (formData.categories.length === 0)
        newErrors.categories = "Please select at least one category.";
    }

    if (step === 3) {
      if (formData.photos.length === 0) newErrors.photos = "Please upload at least one photo.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      photos: files.map((file) => URL.createObjectURL(file)),
    });
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((cat) => cat !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  const handleSubmit = () => {
    if (validateStep()) {
      // Add the product to the list
      if (addProduct) {
        addProduct(formData);
      }
      alert("Product added successfully!");

      // Reset the form and navigate
      setFormData({
        productName: "",
        productDescription: "",
        dimensions: { length: "", width: "", height: "" },
        price: "",
        availability: "",
        categories: [],
        photos: [],
      });
      navigate("/admin/products"); // Navigate to product list
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-white">
        <div className="card-header bg-dark">
  <h2 className="mb-0" style={{ color: "#4a90e2" }}>Add Product</h2>
</div>
</div>

        <div className="card-body">
          {/* Step 1: Description */}
          {step === 1 && (
            <div>
              <h3 className="text-secondary mb-4">
                <i className="bi bi-pencil-square me-2"></i>Step 1: Description
              </h3>

              <div className="mb-4">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="form-control"
                  id="productName"
                  placeholder="Enter the product name"
                />
                {errors.productName && <small className="text-danger">{errors.productName}</small>}
              </div>

              <div className="mb-4">
                <label htmlFor="productDescription" className="form-label">
                  Product Description
                </label>
                <textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  className="form-control"
                  id="productDescription"
                  rows="4"
                  placeholder="Describe your product"
                ></textarea>
                {errors.productDescription && (
                  <small className="text-danger">{errors.productDescription}</small>
                )}
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-control"
                    id="price"
                    placeholder="Enter the price"
                  />
                  {errors.price && <small className="text-danger">{errors.price}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="availability" className="form-label">
                    Number of Units Available
                  </label>
                  <input
                    type="number"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="form-control"
                    id="availability"
                    placeholder="Enter available units"
                  />
                  {errors.availability && (
                    <small className="text-danger">{errors.availability}</small>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-end">
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#20c997", // Mint color
                    color: "white",
                  }}
                  onClick={handleNext}
                >
                  Next <i className="bi bi-arrow-right-circle-fill ms-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Categories */}
          {step === 2 && (
            <div>
              <h3 className="text-secondary mb-4">
                <i className="bi bi-tags-fill me-2"></i>Step 2: Categories
              </h3>
              <p className="mb-4">Select the category your product belongs to:</p>

              <div className="form-check">
                <input
                  type="checkbox"
                  id="electronics"
                  className="form-check-input"
                  onChange={() => handleCategoryChange("Electronics")}
                />
                <label htmlFor="electronics" className="form-check-label">
                  Electronics
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="home-appliances"
                  className="form-check-input"
                  onChange={() => handleCategoryChange("Home Appliances")}
                />
                <label htmlFor="home-appliances" className="form-check-label">
                  Home Appliances
                </label>
              </div>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button className="btn btn-outline-secondary" onClick={handlePrevious}>
                  <i className="bi bi-arrow-left-circle me-2"></i>Back
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#20c997", // Mint color
                    color: "white",
                  }}
                  onClick={handleNext}
                >
                  Next <i className="bi bi-arrow-right-circle-fill ms-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Photos */}
          {step === 3 && (
            <div>
              <h3 className="text-secondary mb-4">
                <i className="bi bi-camera-fill me-2"></i>Step 3: Photos
              </h3>
              <p className="mb-4">Add product photos (max 10):</p>
              <input
                type="file"
                multiple
                className="form-control mb-4"
                onChange={handlePhotoUpload}
              />
              <div className="row mt-3">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="col-3 mb-3">
                    <img
                      src={photo}
                      alt={`Preview ${index + 1}`}
                      className="img-thumbnail"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button className="btn btn-outline-secondary" onClick={handlePrevious}>
                  <i className="bi bi-arrow-left-circle me-2"></i>Back
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                  }}
                  onClick={handleSubmit}
                >
                  Submit <i className="bi bi-check-circle ms-2"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
