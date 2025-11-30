import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import Logo from "../assets/logo.jpg";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
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

        {/* ⭐ FIXED MY ORDERS BUTTON */}
        <Link to="/myorders" className="btn">
          My Orders
        </Link>

        {/* CART BUTTON */}
        <Link to="/cart" className="btn cart-btn">
          🛒 Cart ({cartItems.length})
        </Link>

        {isLoggedIn ? (
          <>
            <span className="welcome">Hey, {username}</span>
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
