import React,{ useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import "./ProductDetails.css"; // Custom CSS file
import { varieties_list } from "../../assets/assets";
import {assets} from "../../assets/assets";

const ProductDetails = () => {
  const { product_name } = useParams();
  const navigate = useNavigate();
  
  const formattedName = decodeURIComponent(product_name);

  // Capitalize and replace dashes
  const displayName = formattedName.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Fetch product varieties
  const varieties = varieties_list[formattedName.toLowerCase()] || [];
  const [cartItems, setCartItems] = useState({});

  const handleAddToCart = (id) => {
    if (!id) {
      console.error("Invalid ID passed to handleAddToCart");
      return;
    }
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };
  };
  

const handleRemoveFromCart = (id) => {
  if (!id) {
    console.error("Invalid ID passed to handleRemoveFromCart");
    return;
  }
  setCartItems((prev) => {
    const updatedCart = { ...prev };
    if (updatedCart[id] === 1) {
      delete updatedCart[id];
    } else {
      updatedCart[id] -= 1;
    }
    return updatedCart;
  });
};



  return (
    <div className="container py-4">
      <h1 className="text-center mb-5 product-title">{displayName}</h1>
      {varieties.length > 0 ? (
        <div className="row">
          {varieties.map((variety) => (
            <div className="col-md-4 mb-4" key={variety.id}>
              <div className="card product-card border-0 shadow-sm">
                <img
                  src={variety.image}
                  alt={variety.type}
                  className="card-img-top product-image"
                />
                <div className="food-item-counter text-center my-2">
             {cartItems[variety.id] ? (
            <>
             <img
      className ="remove-icon"
        onClick={() => handleRemoveFromCart(variety.id)}
        src={assets.remove_icon_red}
        alt="Remove"
        style={{ cursor: "pointer", marginRight: "8px" }}
         />
        <span className="mx-2">{cartItems[variety.id]}</span>
        <img
      className="add-icon"
      onClick={() => handleAddToCart(variety.id)}
        src={assets.add_icon_green}
        alt="Add"
        style={{ cursor: "pointer", marginLeft: "8px" }}
     />
    </>
  ) : (
    <img
      className="add-icon"
      onClick={() => handleAddToCart(variety.id)}
      src={assets.add_icon_white}
      alt="Add to Cart"
      style={{ cursor: "pointer" }}
    />
  )}
</div>

                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{variety.type}</h5>
                  <p className="card-text product-description">{variety.description}</p>
                  <p className="product-price fw-bold text-success">${variety.price}</p>
                  <img src ={assets.rating_starts} alt="" />
                </div>
              </div>
            </div>
          ))}
         </div>
      ):(
        <p className="text-center text-muted">No varieties found for this product.</p>
      )}
    </div>
  );
         


export default ProductDetails;