import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import Logo from "../assets/logo.jpg";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser"); // check login state

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("email");
    navigate("/login");
  };



  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="navbar-logo">
        <img src={Logo} alt="Logo" />
      </div>

      {/* LINKS */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pizza">Pizza</Link></li>
        <li><Link to="/coffee">Coffee</Link></li>
        <li><Link to="/bakery">Bakery</Link></li>
        <li><Link to="/menu">Menu</Link></li>
      </ul>

      {/* AUTH + CART + ORDERS */}
      <div className="navbar-auth">


        {loggedInUser && (
          <>
            <Link to="/myorders" className="btn">
              My Orders
            </Link>

            <Link to="/cart" className="btn cart-btn">
              🛒 Cart ({(cartItems || []).length})
            </Link>
          </>
        )}


        {loggedInUser ? (
          <>
            <span className="welcome">Hey, {loggedInUser}</span>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
          </>
        )}






      </div>
    </nav>
  );
}

export default Navbar;
