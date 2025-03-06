import { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const stripePromise = loadStripe("pk_test_51QywD7GfFmWEQrHHDlRqZ56taFurEBakuevVV7xqmta9FZyKBCaaD87JSit21IJOskP0PofrZTuL9UbzB6D9xMZE00FX1CC8GJ");

const CheckoutForm = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const payload = {
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity
            })),
            quantities: cartItems.map(item => item.quantity)
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/api/payment/create-checkout-session",
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.url) {
                window.location.href = response.data.url;
            } else {
                console.error("❌ Payment Error: No checkout URL received", response.data);
                alert("Failed to get the checkout session URL.");
            }
        } catch (error) {
            console.error("❌ Payment Error:", error);
            alert("Failed to create a payment session.");
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100"
            style={{
                background: "white", 
                color: "white",
                padding: "20px"
            }}
        >
            <div className="card shadow p-4 w-75" style={{ backgroundColor: "#005f99", borderRadius: "15px" }}>
                <h2 className="text-center text-white mb-4">Checkout</h2>

                {cartItems.length === 0 ? (
                    <p className="text-center text-light">Your cart is empty!</p>
                ) : (
                    <table className="table text-white">
                        <thead>
                            <tr style={{ backgroundColor: "#003d66" }}>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button 
                    onClick={handleCheckout} 
                    className="btn btn-lg w-100 mt-3 shadow"
                    style={{
                        backgroundColor: "#00b4db",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "8px"
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0083b0")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#00b4db")}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

const Checkout = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default Checkout;
