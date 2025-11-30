import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import Payment from "./pages/Payment";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RefreshHandler from "./components/RefreshHandler";

// Cart Context
import { CartProvider } from "./context/CartContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Private Route Wrapper
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <CartProvider>
      <Navbar />

      {/* This keeps user logged in on refresh */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        {/* PUBLIC ROUTE (ONLY HOME) */}
        <Route path="/" element={<Home />} />

        {/* PROTECTED ROUTES */}
        <Route path="/pizza" element={<PrivateRoute element={<Pizza />} />} />
        <Route path="/coffee" element={<PrivateRoute element={<Coffee />} />} />
        <Route path="/bakery" element={<PrivateRoute element={<Bakery />} />} />
        <Route path="/menu" element={<PrivateRoute element={<Menu />} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/myorders" element={<PrivateRoute element={<MyOrders />} />} />
        <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
