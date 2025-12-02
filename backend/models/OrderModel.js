const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },

  address: {
    fullName: String,
    phone: String,
    house: String,
    area: String,
    city: String,
    pincode: String,
  },

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],

  payment: { type: String, default: "Cash on Delivery" },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
