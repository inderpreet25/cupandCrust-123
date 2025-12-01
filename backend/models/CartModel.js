// models/Cart.js
const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    id: String,      // PZ1A, CF3C etc.
    title: String,
    image: String,
    price: Number,
    quantity: Number,
    category: String
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: false, index: true },
  items: [CartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

// optional: ensure either userId or guestId exists at creation time (not strictly enforced here)
const cartModel = mongoose.model("Cart", CartSchema);
module.exports = cartModel;
