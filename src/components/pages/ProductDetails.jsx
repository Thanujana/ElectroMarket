import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/ProductDetails.css";
import { useCart } from "../Context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const placeholderImage = "https://dummyimage.com/250x250/cccccc/000000&text=No+Image";

    useEffect(() => {
        if (!id || id === "undefined") {
            setError("Invalid product ID.");
            setLoading(false);
            return;
        }

        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${id}`);
                if (!response.ok) throw new Error("Error fetching product");

                const data = await response.json();

                if (!data || (!data.name && !data.id)) {
                    throw new Error("⚠️ Invalid product data received!");
                }

                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const cartItem = cart.find((item) => item.id === id);

    const handleAddToCart = () => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("⚠️ You need to log in to add items to the cart.");
            navigate("/login");
            return;
        }

        if (cartItem) {
            updateQuantity(id, cartItem.quantity + 1);
        } else {
            addToCart({
                id,
                name: product?.name,
                price: product?.price,
                image: product?.imageUrl,
                quantity: 1,
            });
        }
    };

    const handleIncrease = () => {
        updateQuantity(id, (cartItem?.quantity || 1) + 1);
    };

    const handleDecrease = () => {
        if (cartItem?.quantity > 1) {
            updateQuantity(id, cartItem.quantity - 1);
        } else {
            removeFromCart(id);
        }
    };

    if (loading) return <p className="text-center text-primary mt-5">Loading product details...</p>;
    if (error) return <p className="text-center text-danger mt-5">❌ Error: {error}</p>;
    if (!product) return <p className="text-center text-warning mt-5">⚠️ No product found!</p>;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg product-details-card">
                <div className="row g-0">
                    <div className="col-md-5">
                    <img
    src={product?.imageUrl || "https://dummyimage.com/400x300/cccccc/000000&text=No+Image"}
    alt={product?.name || "Product Image"}
    className="img-fluid product-image"
    style={{ width: "400px", height: "300px", objectFit: "contain" }}
    onError={(e) => {
        e.target.src = "https://dummyimage.com/400x300/cccccc/000000&text=Image+Not+Found";
    }}
/>

                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h2 className="card-title">{product?.name}</h2>
                            <p className="card-text">{product?.description}</p>
                            <h4 className="text-success">
  {product.discountPercentage > 0 ? (
    <>
      <span style={{ textDecoration: "line-through", color: "red" }}>
        ${product.price.toFixed(2)}
      </span>
      <br />
      <span style={{ color: "green", fontSize: "1.5rem", fontWeight: "bold" }}>
        ${ (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2) }
      </span>
    </>
  ) : (
    `$ ${product.price.toFixed(2)}`
  )}
</h4>


                            {/* ✅ Display Stock and Category */}
                            <p className="text-muted">
                                <strong>Stock:</strong> {product?.stock ? `${product.stock} units available` : "Out of stock"}
                            </p>
                            <p className="text-danger">
                                <strong>Category:</strong> {product?.category || "Uncategorized"}
                            </p>

                            {/* ✅ Show +/- Controls If Already in Cart */}
                            {cartItem ? (
                                <div className="d-flex align-items-center mt-3">
                                    <button className="btn btn-danger" onClick={handleDecrease}>-</button>
                                    <span className="mx-3">{cartItem.quantity}</span>
                                    <button className="btn btn-success" onClick={handleIncrease}>+</button>
                                </div>
                            ) : (
                                <button className="btn btn-primary w-100 mt-3" onClick={handleAddToCart}>
                                    Add to Cart
                                </button>
                            )}

                            <button className="btn btn-warning w-100 mt-3" onClick={() => navigate("/cart")}>
                                Go to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
