import React from "react";
import "./AboutUs.css";
import bannerImg from "../assets/about-banner.jpg";

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
          corner where flavors meet comfort.
        </p>

        <p>
          We blend warmth, taste, and joy to make every bite and sip memorable.
        </p>

        <h2>Our Goals</h2>
        <ul>
          <li>🍕 Freshly baked pizzas with authentic taste.</li>
          <li>🥐 Beautiful & tasty bakery treats.</li>
          <li>☕ Coffee that lifts your mood.</li>
          <li>🌍 Grow into a globally loved café brand.</li>
          <li>💛 Create happy food moments.</li>
        </ul>

        <p className="closing">
          With your love, Cup & Crust will keep spreading smiles. 💜
        </p>
      </div>
    </div>
  );
}
