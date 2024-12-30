import React, { useState } from "react";

const AddProduct = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    dimensions: { length: "", width: "", height: "" },
    price: "",
    availability: "",
    categories: [],
    photos: [],
    deliveryMethods: [],
    shippingTime: "",
    complaints: { warranty: "", address: "", returnPolicy: "" },
  });

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dimensions: { ...formData.dimensions, [name]: value },
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      photos: files.map((file) => URL.createObjectURL(file)),
    });
  };

  const handleDeliveryMethodChange = (method) => {
    setFormData((prev) => {
      const methods = prev.deliveryMethods.includes(method)
        ? prev.deliveryMethods.filter((m) => m !== method)
        : [...prev.deliveryMethods, method];
      return { ...prev, deliveryMethods: methods };
    });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    alert("Product added successfully!");
  };

  return (
    <div className="container mt-4">
      <h1>Add Product</h1>
      <div className="card p-4">
        {/* Step 1: Description */}
        {step === 1 && (
          <div>
            <h2>Step 1: Description</h2>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="form-control mb-3"
              placeholder="Product Name"
            />
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleInputChange}
              className="form-control mb-3"
              rows="3"
              placeholder="Product Description"
            ></textarea>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-control mt-3 mb-3"
              placeholder="Price"
            />
            <input
              type="number"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Number of Units Available"
            />
            <button className="btn btn-primary mt-3" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {/* Step 2: Categories */}
        {step === 2 && (
          <div>
            <h2>Step 2: Categories</h2>
            <div className="form-check">
              <input
                type="checkbox"
                id="electronics"
                className="form-check-input"
                onChange={() => handleDeliveryMethodChange("Electronics")}
              />
              <label htmlFor="electronics" className="form-check-label">
                Electronics
              </label>
            </div>
            {/* Repeat similar for other categories */}
            <button className="btn btn-secondary mt-3 me-3" onClick={handlePrevious}>
              Back
            </button>
            <button className="btn btn-primary mt-3" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <div>
            <h2>Step 3: Photos</h2>
            <input
              type="file"
              multiple
              className="form-control"
              onChange={handlePhotoUpload}
            />
            <div className="mt-3">
              {formData.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Preview ${index + 1}`}
                  className="img-thumbnail me-2"
                  style={{ maxWidth: "100px" }}
                />
              ))}
            </div>
            <button className="btn btn-secondary mt-3 me-3" onClick={handlePrevious}>
              Back
            </button>
            <button className="btn btn-primary mt-3" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {/* Step 4: Delivery */}
        {step === 4 && (
          <div>
            <h2>Step 4: Delivery</h2>
            <div className="form-check">
              <input
                type="checkbox"
                id="pickup"
                className="form-check-input"
                onChange={() => handleDeliveryMethodChange("Self Pickup")}
              />
              <label htmlFor="pickup" className="form-check-label">
                Self Pickup
              </label>
            </div>
            {/* Add more delivery options */}
            <input
              type="date"
              name="shippingTime"
              value={formData.shippingTime}
              onChange={handleInputChange}
              className="form-control mt-3"
            />
            <button className="btn btn-secondary mt-3 me-3" onClick={handlePrevious}>
              Back
            </button>
            <button className="btn btn-primary mt-3" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {/* Step 5: Complaints/Returns */}
        {step === 5 && (
          <div>
            <h2>Step 5: Complaints/Returns</h2>
            <input
              type="text"
              name="warranty"
              value={formData.complaints.warranty}
              onChange={handleInputChange}
              className="form-control mb-3"
              placeholder="Warranty Period"
            />
            <textarea
              name="address"
              value={formData.complaints.address}
              onChange={handleInputChange}
              className="form-control mb-3"
              placeholder="Address for Complaints or Returns"
            ></textarea>
            <textarea
              name="returnPolicy"
              value={formData.complaints.returnPolicy}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Return Policy"
            ></textarea>
            <button className="btn btn-secondary mt-3 me-3" onClick={handlePrevious}>
              Back
            </button>
            <button className="btn btn-success mt-3" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
