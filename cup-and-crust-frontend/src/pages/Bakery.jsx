import React from "react";
import CategoryCard from "../components/CategoryCard";
import "./Bakery.css";

// Import bakery images from assets
import croissant from "../assets/croissant.jpg";
import donut from "../assets/donut.jpg";
import muffin from "../assets/muffin.jpg";
import cheesecake from "../assets/cheesecake.jpg";
import brownie from "../assets/brownie.jpg";
import cupcake from "../assets/cupcake.jpg";

export default function Bakery() {
  const bakeryItems = [
    {
      image: croissant,
      title: "Butter Croissant",
      description: "Flaky, soft French-style buttery croissant.",
      price: "₹90"
    },
    {
      image: donut,
      title: "Chocolate Donut",
      description: "Soft donut glazed with rich chocolate.",
      price: "₹70"
    },
    {
      image: muffin,
      title: "Blueberry Muffin",
      description: "Fresh muffin loaded with juicy blueberries.",
      price: "₹110"
    },
    {
      image: cheesecake,
      title: "Cheesecake Slice",
      description: "Creamy classic cheesecake with a biscuit base.",
      price: "₹150"
    },
    {
      image: brownie,
      title: "Chocolate Brownie",
      description: "Dense and fudgy brownie with dark chocolate.",
      price: "₹80"
    },
    
    {
      image: cupcake,
      title: "Vanilla Cupcake",
      description: "Soft cupcake with fluffy vanilla frosting.",
      price: "₹85"
    }
  ];

  return (
    <div className="bakery-page">
      <h2>Our Bakery Collection</h2>
      <div className="bakery-grid">
        {bakeryItems.map((item, index) => (
          <CategoryCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
