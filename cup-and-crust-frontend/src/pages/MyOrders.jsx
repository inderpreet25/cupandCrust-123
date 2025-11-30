import React from "react";
import "./MyOrders.css";   // ✅ CSS yahan import kiya hai

function MyOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="myorders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Order #{index + 1}</h3>

            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Payment:</strong> {order.payment}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>

            <h4>Items:</h4>
            {order.items.map((item, i) => (
              <li key={i}>{item.name} - ₹{item.price}</li>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
