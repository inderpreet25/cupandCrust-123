import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Coffee from "./pages/Coffee";
import Pizza from "./pages/Pizza";
import Bakery from "./pages/Bakery";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Payment from "./pages/Payment";   // 🔥 NEW LINE

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Cart Context
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza" element={<Pizza />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />

        {/* MY ORDERS */}
        <Route path="/myorders" element={<MyOrders />} />

        {/* PAYMENT PAGE ROUTE */}
        <Route path="/payment" element={<Payment />} />  {/* 🔥 ADDED */}

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
