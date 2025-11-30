import React from "react";
import "./CategoryCard.css";
import { useCart } from "../context/CartContext";

export default function CategoryCard({ image, title, description, price }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: title,
      title,
      image,
      price: Number(price.replace("₹", ""))
    });
  };

  return (
    <div className="category-card">
      <img src={image} alt={title} />

      <h3>{title}</h3>
      <p className="description">{description}</p>

      <span className="price">{price}</span>

      <button className="add-btn" onClick={handleAdd}>
        Add to Cart
      </button>
    </div>
  );
}