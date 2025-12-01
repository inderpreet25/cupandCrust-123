// src/components/CategoryCard.jsx
import React from "react";
import "./CategoryCard.css";
import { useCart } from "../context/CartContext";

/**
 * Safe parse price helpers:
 * - Accepts strings like "₹ 1,234.50", "1234", "1234.50", "₹1234"
 * - Returns number (0 if parse fails)
 */
function parsePriceToNumber(price) {
  if (price == null) return 0;
  if (typeof price === "number") return price;
  // remove currency symbols, commas, spaces
  const cleaned = String(price).replace(/[^\d.-]+/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export default function CategoryCard({ image, title, description, price, id }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    const numericPrice = parsePriceToNumber(price);
    addToCart({
      id,
      title,
      image,
      price: numericPrice,
    });
  };

  return (
    <div className="category-card" role="article" aria-label={title}>
      <img src={image} alt={title} />

      <h3>{title}</h3>
      <p className="description">{description}</p>

      <span className="price">{typeof price === "number" ? `₹ ${price}` : price}</span>

      <button className="add-btn" onClick={handleAdd} aria-label={`Add ${title} to cart`}>
        Add to Cart
      </button>
    </div>
  );
}
