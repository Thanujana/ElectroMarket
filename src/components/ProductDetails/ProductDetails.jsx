import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css"; // Custom CSS file
import { varieties_list } from "../../assets/assets";

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProductDetails = () => {
  const { product_name } = useParams();
  const formattedName = decodeURIComponent(product_name);

  // Capitalize and replace dashes
  const displayName = formattedName.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Fetch product varieties
  const varieties = varieties_list[formattedName.toLowerCase()] || [];

  return (
    <div className="container py-4">
      {/* Page Title */}
      <h1 className="text-center mb-5 product-title">{displayName}</h1>

      {/* Swiper Carousel */}
      {varieties.length > 0 ? (
        <Swiper
          spaceBetween={20} // Space between slides
          slidesPerView={3} // Show 3 slides at a time
          navigation // Enable navigation arrows
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 1 }, // 1 slide for mobile screens
            768: { slidesPerView: 2 }, // 2 slides for tablets
            1024: { slidesPerView: 3 }, // 3 slides for desktops
          }}
        >
          {varieties.map((variety, index) => (
            <SwiperSlide key={index}>
              <div className="card product-card border-0 shadow-sm">
                {/* Product Image */}
                <img
                  src={variety.image}
                  alt={variety.type}
                  className="card-img-top product-image"
                />
                {/* Product Details */}
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{variety.type}</h5>
                  <p className="card-text product-description">{variety.description}</p>
                  <p className="product-price fw-bold text-success">${variety.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-muted">No varieties found for this product.</p>
      )}
    </div>
  );
};

export default ProductDetails;
