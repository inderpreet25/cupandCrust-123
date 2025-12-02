import React, { useEffect, useState } from "react";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token from login
        if (!token) return;

        const res = await fetch("http://localhost:8080/orders/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          const data = await res.json();
          alert(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.log("Order fetch error:", err);
        alert("Server error while fetching orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="myorders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Order #{index + 1}</h3>

            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Payment:</strong> {order.payment}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>

            <h4>Items:</h4>
            {order.items.map((item, i) => (
              <li key={i}>{item.title} - ₹{item.price} x {item.quantity}</li>
            ))}

            <h4>Address:</h4>
            <p>{order.address.fullName}, {order.address.house}, {order.address.area}</p>
            <p>{order.address.city} - {order.address.pincode}</p>
            <p>Phone: {order.address.phone}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
