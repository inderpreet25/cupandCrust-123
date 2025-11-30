import React, { useState } from "react";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);

  // MAIN PLACE ORDER (SHOW PAYMENT POPUP)
  const handlePlaceOrder = () => {
    const username = localStorage.getItem("username");

    if (!username) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    setShowPayment(true); // Show payment box
  };

  // CONFIRM CASH ON DELIVERY
  const confirmCOD = async () => {
    const orderData = {
      username: localStorage.getItem("username"),
      items: cartItems,
      total: totalPrice,
      date: new Date().toLocaleString(),
      payment: "Cash on Delivery",
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        alert("Order placed successfully!");
        clearCart();
        navigate("/myorders");
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (error) {
      console.log("Order error:", error);
      alert("Server error.");
    }
  };

  // EMPTY CART VIEW
  if (!cartItems.length) {
    return (
      <div className="cart-page">
        <h2>Your Cart is empty</h2>
        <Link to="/menu" className="btn">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            
            <img src={item.image} alt={item.title} className="cart-item-img" />
            
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>Price: ₹{item.price}</p>

              <div className="qty-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <button className="btn remove-btn" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>

            <div className="cart-item-subtotal">
              ₹{item.price * item.quantity}
            </div>

          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ₹{totalPrice}</h3>

        <button className="btn checkout-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>

        <button className="btn clear-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      {/* PAYMENT POPUP */}
      {showPayment && (
        <div className="payment-popup">
          <div className="payment-box">
            <h3>Select Payment Method</h3>

            <button className="cod-btn" onClick={confirmCOD}>
              Cash On Delivery
            </button>

            <button className="cancel-btn" onClick={() => setShowPayment(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
