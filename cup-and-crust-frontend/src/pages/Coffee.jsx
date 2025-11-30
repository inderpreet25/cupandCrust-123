import React from "react";
import CategoryCard from "../components/CategoryCard";
import "./Coffee.css";

// ✅ Importing images from assets
import espresso from "../assets/espresso.jpg";
import cappuccino from "../assets/cappuccino.jpg";
import latte from "../assets/latte.jpg";
import mocha from "../assets/mocha.jpg";
import americano from "../assets/americano.jpg";
import flatWhite from "../assets/flatWhite.jpg";
import macchiato from "../assets/macchiato.jpg";

export default function Coffee() {
  const coffeeItems = [
    {
      image: espresso,
      title: "Espresso",
      description: "Strong and bold Italian-style coffee shot.",
      price: "₹120"
    },
    {
      image: cappuccino,
      title: "Cappuccino",
      description: "Rich espresso topped with steamed milk foam.",
      price: "₹150"
    },
    {
      image: latte,
      title: "Latte",
      description: "Smooth espresso with creamy steamed milk.",
      price: "₹160"
    },
    {
      image: mocha,
      title: "Mocha",
      description: "Espresso blended with chocolate and steamed milk.",
      price: "₹180"
    },
    {
      image: americano,
      title: "Americano",
      description: "Espresso diluted with hot water for a lighter taste.",
      price: "₹130"
    },
    {
      image: macchiato,
      title: "Macchiato",
      description: "Espresso marked with a dollop of milk foam.",
      price: "₹140"
    },
    {
      image: flatWhite,
      title: "Flat White",
      description: "Silky microfoam milk poured over rich espresso.",
      price: "₹170"
    }
  ];

  return (
    <div className="coffee-page">
      <h2>Our Coffee Selection</h2>
      <div className="coffee-grid">
        {coffeeItems.map((item, index) => (
          <CategoryCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}   // ✅ price prop pass kiya
          />
        ))}
      </div>
    </div>
  );
}
