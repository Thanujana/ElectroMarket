import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link
import { item_list } from "../../assets/assets";



const CategoryItems = () => {
  const { category_name } = useParams(); // Get the category name from URL
  const navigate = useNavigate();

  // Decode and format category name (handle URL-encoded characters)
  const formattedCategory = decodeURIComponent(category_name);

  // Capitalize each word in the category name for display
  const displayCategory = formattedCategory
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/-/g, " ");

  // Filter items based on the decoded category name
  const filteredItems = item_list.filter(
    (item) => item.category.toLowerCase() === formattedCategory.toLowerCase()
  );

  return (
    <div className="container py-4">
      {/* Category Title */}
      <h1 className="text-center mb-4 text-primary">{displayCategory}</h1>

      {/* Display Items */}
      <div className="row">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div
                className="card shadow-sm border-0 h-100"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "200px",
                  }}
                />

                {/* Item Name and Description */}
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "14px" }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Explore Button */}
                <div className="card-footer bg-white text-center border-0">
                <Link
                  to={`/products/${item.name.toLowerCase().replace(/ /g, "-")}`}
                   className="btn btn-outline-primary btn-sm"
                     >
                     Explore
                  </Link>

                  
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            No items found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
