import CategoryCard from "../components/CategoryCard";
import { coffeeItems } from "../data/MenuData";
import "./Coffee.css";



export default function Coffee() {


  return (
    <div className="coffee-page">
      <h2>Our Coffee Selection</h2>
      <div className="coffee-grid">
        {coffeeItems.map((item, index) => (
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
