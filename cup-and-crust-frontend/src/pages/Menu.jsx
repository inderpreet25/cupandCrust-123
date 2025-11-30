import React from "react";
import "./Menu.css";

export default function Menu() {
  return (
    <div className="menu-container">

      <h1 className="menu-title">OUR MENU</h1>

      {/* ------------------- COFFEE ------------------- */}
      <div className="menu-category">
        <h2 className="cat-title">COFFEE</h2>

        <table className="menu-table">
          <tbody>
            <tr><td>Espresso</td><td>₹120</td></tr>
            <tr><td>Cappuccino</td><td>₹150</td></tr>
            <tr><td>Latte</td><td>₹160</td></tr>
            <tr><td>Mocha</td><td>₹180</td></tr>
            <tr><td>Americano</td><td>₹130</td></tr>
            <tr><td>Macchiato</td><td>₹140</td></tr>
            <tr><td>Flat White</td><td>₹170</td></tr>
          </tbody>
        </table>
      </div>

      {/* ------------------- BAKERY ------------------- */}
      <div className="menu-category">
        <h2 className="cat-title">BAKERY</h2>

        <table className="menu-table">
          <tbody>
            <tr><td>Butter Croissant</td><td>₹90</td></tr>
            <tr><td>Chocolate Donut</td><td>₹70</td></tr>
            <tr><td>Blueberry Muffin</td><td>₹110</td></tr>
            <tr><td>Cheesecake Slice</td><td>₹150</td></tr>
            <tr><td>Chocolate Brownie</td><td>₹80</td></tr>
            <tr><td>Vanilla Cupcake</td><td>₹85</td></tr>
          </tbody>
        </table>
      </div>

      {/* ------------------- PIZZA ------------------- */}
      <div className="menu-category">
        <h2 className="cat-title">PIZZA</h2>

        <table className="menu-table">
          <tbody>
            <tr><td>Margherita</td><td>₹250</td></tr>
            <tr><td>Pepperoni</td><td>₹320</td></tr>
            <tr><td>Veggie Delight</td><td>₹280</td></tr>
            <tr><td>BBQ Chicken</td><td>₹350</td></tr>
            <tr><td>Hawaiian</td><td>₹300</td></tr>
            <tr><td>Four Cheese</td><td>₹340</td></tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
