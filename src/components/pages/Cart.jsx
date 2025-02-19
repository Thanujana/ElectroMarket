import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/CartContext";

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    // ✅ Quick Category Navigation
    const categories = [
        { name: "Home Appliances", path: "/categories/home-appliances" },
        { name: "Consumer Electronics", path: "/categories/consumer-electronics" },
        { name: "Computer Components", path: "/categories/computer-components" },
        { name: "Smart Home Products", path: "/categories/smart-home-products" },
        { name: "Industrial & Specialized Electronics", path: "/categories/industrial-specialized-electronics" },
    ];

    // ✅ Ensure cart is always an array
    const cartItems = Array.isArray(cart) ? cart : [];

    // ✅ Calculate Total Price
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // ✅ Ensure Token is Valid Before Checkout
    const isTokenExpired = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return true;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000 < Date.now();
        } catch (error) {
            return true;
        }
    };

    // ✅ Save Cart to Database
    const saveCartToDB = async () => {
        if (isTokenExpired()) {
            alert("⚠️ Session expired. Please log in again.");
            localStorage.clear();
            navigate("/login");
            return;
        }

        const authToken = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!authToken || !userId) {
            alert("⚠️ You need to log in before saving the cart.");
            navigate("/login");
            return;
        }

        const cartData = {
            userId: userId,
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            await axios.post("http://localhost:8080/api/carts/add", cartData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            alert("🛍️ Cart successfully updated!");
        } catch (error) {
            alert("⚠️ Failed to save cart. Please try again.");
        }
    };

    // ✅ Handle Checkout
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("⚠️ Your cart is empty. Add items before proceeding.");
            return;
        }
        navigate("/place-order", {
            state: { cartItems }, // ✅ Ensure cart items are correctly passed
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">🛒 Your Cart</h2>

            {/* ✅ Quick Category Navigation */}
            <div className="text-center my-3">
                <h5>Continue Shopping:</h5>
                {categories.map((category) => (
                    <button
                        key={category.path}
                        className="btn btn-outline-secondary m-2"
                        onClick={() => navigate(category.path)}
                    >
                        {category.name}
                    </button>
                ))}
                <button className="btn btn-outline-primary m-2" onClick={() => navigate("/buyer/dashboard")}>
                    🔙 Back to Dashboard
                </button>
            </div>

            {cartItems.length === 0 ? (
                <p className="text-center mt-3">Your cart is empty 😔</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="card mb-3 p-3 shadow-sm">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src={item.image || "/images/default-product.png"} alt={item.name} className="img-fluid rounded" style={{ maxWidth: "100px" }} />
                                </div>
                                <div className="col-md-6">
                                    <h5>{item.name}</h5>
                                    <p className="text-muted">$ {item.price.toFixed(2)}</p>
                                </div>
                                <div className="col-md-2">
                                    <input type="number" className="form-control" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} min="1" />
                                </div>
                                <div className="col-md-2 text-end">
                                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h4 className="text-end">Total: Rs {totalAmount.toFixed(2)}</h4>
                    <button className="btn btn-primary w-100 mt-3" onClick={saveCartToDB}>Save Cart</button>
                    <button className="btn btn-success w-100 mt-3" onClick={handleCheckout}>Proceed to Checkout</button>
                    <button className="btn btn-outline-danger w-100 mt-2" onClick={clearCart}>Clear Cart</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
