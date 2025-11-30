import React from "react";
import "./AboutUs.css";
import bannerImg from "../assets/about-banner.jpg"; // apna banner image dalna

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Banner Section */}
      <div className="about-banner">
        <img src={bannerImg} alt="Cup & Crust Story" className="banner-image" />
        <div className="banner-text">
          <h1>Our Story</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="about-content">
        <h2>Cup & Crust</h2>
        <p>
          <strong>Cup & Crust</strong> is more than just a café — it’s a cozy
          corner where flavors meet comfort. From freshly baked pastries to
          cheesy pizzas and handcrafted coffee, we bring you moments of joy in
          every bite and sip. ✨
        </p>

        <p>
          We believe in creating an experience that blends warmth, taste, and
          togetherness. Whether it’s a casual meet-up, a quick coffee break, or
          a hearty meal with friends, <strong>Cup & Crust</strong> is here to
          make every moment special.
        </p>

        <h2>Our Goals</h2>
        <ul>
          <li>🍕 Serve freshly made pizzas with unique and authentic flavors.</li>
          <li>🥐 Bring bakery delights that are as beautiful as they are tasty.</li>
          <li>☕ Brew coffee that inspires conversations and creativity.</li>
          <li>🌍 Build a café brand that’s loved locally and recognized globally.</li>
          <li>💛 Create a space where food, love, and laughter come together.</li>
        </ul>

        <p className="closing">
          This is just the beginning. With your love and support,{" "}
          <strong>Cup & Crust</strong> will continue to grow and serve happiness
          in every slice, sip, and smile. 💜
        </p>
      </div>
    </div>
  );
}