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

  return (<div className="container mt-5">
    {/* Card to Contain Form */}
    <div className="card shadow-lg">
    <div className="card-header bg-dark text-white">
        <h2 className="mb-0">Add Product</h2>
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
            </div>
  
            <div className="row mb-4">
              <div className="col-md-6">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-control"
                  id="price"
                  placeholder="Enter the price"
                />
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
              </div>
            </div>
  
            {/* Navigation Buttons */}
            <div className="d-flex justify-content-end">
              <button className="btn"
               style={{
                backgroundColor: "#20c997", // Mint color
                color: "white",
              }}
               onClick={handleNext}>
                Next <i className="bi bi-arrow-right-circle-fill ms-2"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {step === 2 && (
  <div>
    {/* Step Header */}
    <h3
      className="text-secondary mb-4"
      style={{
        borderBottom: "2px solid #ccc",
        paddingBottom: "10px",
      }}
    >
      <i className="bi bi-tags-fill me-2"></i>Step 2: Categories
    </h3>
    <p className="mb-4">Select the category your product belongs to (max. 3):</p>

    {/* Grid for Categories */}
    <div className="container">
      <div className="row">
        {/* Electronics */}
        <div className="col-md-4 mb-4">
          <h5>Electronics</h5>
          <div className="form-check">
            <input
              type="checkbox"
              id="smartphones"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Smartphones")}
            />
            <label htmlFor="smartphones" className="form-check-label">
              Smartphones
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="laptops"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Laptops")}
            />
            <label htmlFor="laptops" className="form-check-label">
              Laptops
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="tablets"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Tablets")}
            />
            <label htmlFor="tablets" className="form-check-label">
              Tablets
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="wearables"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Wearables")}
            />
            <label htmlFor="wearables" className="form-check-label">
              Wearables (e.g., Smartwatches)
            </label>
          </div>
        </div>

        {/* Accessories */}
        <div className="col-md-4 mb-4">
          <h5>Accessories</h5>
          <div className="form-check">
            <input
              type="checkbox"
              id="headphones"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Headphones")}
            />
            <label htmlFor="headphones" className="form-check-label">
              Headphones
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="chargers"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Chargers")}
            />
            <label htmlFor="chargers" className="form-check-label">
              Chargers & Adapters
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="cables"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Cables")}
            />
            <label htmlFor="cables" className="form-check-label">
              Cables (e.g., HDMI, USB)
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="powerbanks"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Power Banks")}
            />
            <label htmlFor="powerbanks" className="form-check-label">
              Power Banks
            </label>
          </div>
        </div>

        {/* Home Appliances */}
        <div className="col-md-4 mb-4">
          <h5>Home Appliances</h5>
          <div className="form-check">
            <input
              type="checkbox"
              id="televisions"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Televisions")}
            />
            <label htmlFor="televisions" className="form-check-label">
              Televisions
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="refrigerators"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Refrigerators")}
            />
            <label htmlFor="refrigerators" className="form-check-label">
              Refrigerators
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="microwaves"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Microwaves")}
            />
            <label htmlFor="microwaves" className="form-check-label">
              Microwaves
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="vacuumcleaners"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Vacuum Cleaners")}
            />
            <label htmlFor="vacuumcleaners" className="form-check-label">
              Vacuum Cleaners
            </label>
          </div>
        </div>
      </div>

      {/* Second Row for More Categories */}
      <div className="row">
        {/* Gaming */}
        <div className="col-md-4 mb-4">
          <h5>Gaming</h5>
          <div className="form-check">
            <input
              type="checkbox"
              id="gamingconsoles"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Gaming Consoles")}
            />
            <label htmlFor="gamingconsoles" className="form-check-label">
              Gaming Consoles
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="games"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Games")}
            />
            <label htmlFor="games" className="form-check-label">
              Games (PS5, Xbox, PC)
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="gamingaccessories"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Gaming Accessories")}
            />
            <label htmlFor="gamingaccessories" className="form-check-label">
              Gaming Accessories (e.g., Controllers, Keyboards)
            </label>
          </div>
        </div>

        {/* Cameras */}
        <div className="col-md-4 mb-4">
          <h5>Cameras</h5>
          <div className="form-check">
            <input
              type="checkbox"
              id="dslrcameras"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("DSLR Cameras")}
            />
            <label htmlFor="dslrcameras" className="form-check-label">
              DSLR Cameras
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="cameralenses"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Camera Lenses")}
            />
            <label htmlFor="cameralenses" className="form-check-label">
              Camera Lenses
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="drones"
              className="form-check-input"
              onChange={() => handleDeliveryMethodChange("Drones")}
            />
            <label htmlFor="drones" className="form-check-label">
              Drones
            </label>
          </div>
        </div>
      </div>
    </div>

{/* Navigation Buttons */}
<div
  className="d-flex justify-content-between align-items-center mt-4"
  style={{ marginTop: "30px", padding: "0 10px" }}
>
  <button className="btn btn-outline-secondary" onClick={handlePrevious}>
    <i className="bi bi-arrow-left-circle me-2"></i>Back
  </button>
  <button
    className="btn"
    style={{
      backgroundColor: "#20c997", // Mint green color
      color: "white",
      padding: "10px 20px",
    }}
    onClick={handleNext}
  >
    Next <i className="bi bi-arrow-right-circle ms-2"></i>
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
    <p className="mb-4">Add product photos (max 10)</p>

    {/* File Input */}
    <input
      type="file"
      multiple
      className="form-control mb-4"
      onChange={handlePhotoUpload}
    />

    {/* Photo Previews */}
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
    <div
      className="d-flex justify-content-between align-items-center mt-4"
      style={{
        padding: "0 10px",
      }}
    >
      <button className="btn btn-outline-secondary" onClick={handlePrevious}>
        <i className="bi bi-arrow-left-circle me-2"></i>Back
      </button>
      <button
        className="btn"
        style={{
          backgroundColor: "#20c997", // Mint green color
          color: "white",
          padding: "10px 20px",
        }}
        onClick={handleNext}
      >
        Next <i className="bi bi-arrow-right-circle ms-2"></i>
      </button>
    </div>
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
