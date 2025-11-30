const express = require("express");
const router = express.Router();

// FRONTEND assets folder ke names hi use hongay
router.get("/", (req, res) => {
  res.json([
    // ---- Pizza Items ----
    {
      id: 1,
      title: "Margherita",
      description: "Classic pizza with mozzarella & basil",
      price: 250,
      image: "margareta.jpg"
    },
    {
      id: 2,
      title: "Pepperoni",
      description: "Spicy pepperoni slices",
      price: 320,
      image: "pepperoni.jpg"
    },
    {
      id: 3,
      title: "Veggie Delight",
      description: "Loaded with veggies",
      price: 280,
      image: "veggie.jpg"
    },

    // ---- Coffee Items ----
    {
      id: 4,
      title: "Latte",
      description: "Smooth milk + espresso",
      price: 160,
      image: "latte.jpg"
    },
    {
      id: 5,
      title: "Cappuccino",
      description: "Foamy steamed milk",
      price: 150,
      image: "cappuccino.jpg"
    },
    {
      id: 6,
      title: "Mocha",
      description: "Chocolate espresso mix",
      price: 180,
      image: "mocha.jpg"
    },

    // ---- Bakery Items ----
    {
      id: 7,
      title: "Cupcake",
      description: "Creamy vanilla cupcake",
      price: 85,
      image: "cupcake.jpg"
    },
    {
      id: 8,
      title: "Brownie",
      description: "Dark chocolate brownie",
      price: 80,
      image: "brownie.jpg"
    },
    {
      id: 9,
      title: "Cheesecake Slice",
      description: "Creamy cheese dessert",
      price: 150,
      image: "cheesecake.jpg"
    }
  ]);
});

module.exports = router;
