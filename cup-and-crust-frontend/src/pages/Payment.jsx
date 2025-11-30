import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("");

  // Get cart + total
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    const order = {
      items: cartItems,
      total: totalPrice,
      payment: method,
      date: new Date().toLocaleString(),
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cartItems");

    navigate("/myorders");
  };

  return (
    <div className="payment-page" style={{ padding: "20px" }}>
      <h2>Choose Payment Method</h2>
      <h3>Total Amount: ₹{totalPrice}</h3>

      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="radio"
            name="pay"
            value="Cash On Delivery"
            onChange={(e) => setMethod(e.target.value)}
          />{" "}
          Cash On Delivery
        </label>

        <br /><br />

        <label>
          <input
            type="radio"
            name="pay"
            value="UPI / Online Payment"
            onChange={(e) => setMethod(e.target.value)}
          />{" "}
          UPI / Online Payment
        </label>
      </div>

      <button
        className="btn"
        style={{ marginTop: "20px" }}
        onClick={placeOrder}
      >
        Confirm Order
      </button>
    </div>
  );
}

export default Payment;
