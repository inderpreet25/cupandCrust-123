import CategoryCard from "../components/CategoryCard";
import "./Bakery.css";

import { bakeryItems } from "../data/MenuData";

export default function Bakery() {

  return (
    <div className="bakery-page">
      <h2>Our Bakery Collection</h2>
      <div className="bakery-grid">
        {bakeryItems.map((item, index) => (
          <CategoryCard
            key={item.id}
            id={item.id}
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
