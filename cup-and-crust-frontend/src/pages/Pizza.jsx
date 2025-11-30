import React from "react";
import CategoryCard from "../components/CategoryCard";
import "./Pizza.css";

// ✅ Importing pizza images from assets
import bbqchicken from "../assets/bbqchicken.jpg";
import fourcheese from "../assets/fourcheese.jpg";
import hawaiian from "../assets/hawaiian.jpg";
import margareta from "../assets/margareta.jpg";
import pepperoni from "../assets/pepperoni.jpg";
import veggie from "../assets/veggie.jpg";

export default function Pizza() {
  const pizzaItems = [
    {
      image: margareta,
      title: "Margherita",
      description: "Classic pizza with fresh mozzarella, tomato & basil.",
      price: "₹250"
    },
    {
      image: pepperoni,
      title: "Pepperoni",
      description: "Loaded with mozzarella and spicy pepperoni slices.",
      price: "₹320"
    },
    {
      image: veggie,
      title: "Veggie Delight",
      description: "Topped with bell peppers, onions, mushrooms & olives.",
      price: "₹280"
    },
    {
      image: bbqchicken,
      title: "BBQ Chicken",
      description: "Grilled chicken with smoky BBQ sauce & cheese.",
      price: "₹350"
    },
    {
      image: hawaiian,
      title: "Hawaiian",
      description: "Ham, pineapple & cheese on a golden crust.",
      price: "₹300"
    },
    {
      image: fourcheese,
      title: "Four Cheese",
      description: "Mozzarella, cheddar, parmesan & blue cheese blend.",
      price: "₹340"
    }
  ];

  return (
    <div className="pizza-page">
      <h2>Our Pizza Selection</h2>
      <div className="pizza-grid">
        {pizzaItems.map((item, index) => (
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
