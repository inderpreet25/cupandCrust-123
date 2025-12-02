import { useState } from "react";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import AddressModal from "../components/AddressModal";
import { api } from "../utils/api";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [showAddress, setShowAddress] = useState(false);



  // OPEN ADDRESS MODAL
  const handlePlaceOrder = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    setShowAddress(true);
  };

  // FINAL ORDER SUBMIT TO BACKEND
  const submitOrder = async (address) => {

    const orderData = {
      items: cartItems,
      total: totalPrice,
      address: address,
      payment: "Cash on Delivery",
    };

    try {
      const res = await api.post("/orders/create", orderData)



      if (res.status === 201) {
        alert("Order placed successfully!");
        clearCart();
        navigate("/myorders");
      } else {
        // alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Order error:", error);
      alert("Server error.");
    }
  };

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

      {showAddress && (
        <AddressModal
          close={() => setShowAddress(false)}
          onSubmit={submitOrder}
        />
      )}
    </div>
  );
}
