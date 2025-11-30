import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import heroImg from "../assets/hero-bg.jpg";   // a big hero image you choose
import coffeeImg from "../assets/coffee-bg.jpg";  // or use photos for sections
import bakeryImg from "../assets/bakery-bg.jpg";
import pizzaImg from "../assets/pizza-bg.jpg";

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Banner */}
      <div
        className="home-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Welcome to Cup & Crust</h1>
            <p>Where every slice, sip & bite feels like home</p>
            <Link to="/menu" className="btn hero-btn">Explore Menu</Link>
          </div>
        </div>
      </div>

      {/* Categories Highlight Section */}
      <div className="home-sections">
        <Link to="/coffee" className="home-section">
          <div className="section-img" style={{ backgroundImage: `url(${coffeeImg})` }} />
          <div className="section-text">
            <h2>Coffee</h2>
            <p>Rich & flavorful brews to light up your day</p>
          </div>
        </Link>

        <Link to="/bakery" className="home-section">
          <div className="section-img" style={{ backgroundImage: `url(${bakeryImg})` }} />
          <div className="section-text">
            <h2>Bakery</h2>
            <p>Freshly baked treats, straight from the oven</p>
          </div>
        </Link>

        <Link to="/pizza" className="home-section">
          <div className="section-img" style={{ backgroundImage: `url(${pizzaImg})` }} />
          <div className="section-text">
            <h2>Pizza</h2>
            <p>Hot, cheesy & full of flavor</p>
          </div>
        </Link>
      </div>

      {/* About / Feature / Why Us Section */}
      <div className="home-about">
        <h2>Why Cup & Crust?</h2>
        <p>
          We blend fresh ingredients, cozy ambiance, and passionate recipes
          to deliver a unique dining experience. Whether you’re craving a warm
          coffee, soft baked goods or a hearty slice — we’re here for you.
        </p>
      </div>

      {/* Call to Action / Footer (Footer will always be rendered) */}
    </div>
  );
}
