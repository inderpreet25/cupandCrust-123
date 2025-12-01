import CategoryCard from "../components/CategoryCard";
import "./Pizza.css";

import { pizzaItems } from "../data/MenuData";

export default function Pizza() {


  return (
    <div className="pizza-page">
      <h2>Our Pizza Selection</h2>
      <div className="pizza-grid">
        {pizzaItems.map((item, index) => (
          <CategoryCard
            key={item.id}
            id={item.id}
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
