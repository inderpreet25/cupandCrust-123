const OrderModel = require("../models/OrderModel");
const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");


// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { items, total, address, payment } = req.body;

    if (!items?.length)
      return res.status(400).json({ message: "Cart is empty" });

    const newOrder = new OrderModel({
      userId: req.user._id,
      items,
      total,
      address,
      payment: payment || "Cash on Delivery",
    });

    await newOrder.save();

    return res.json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: err });
  }
};

// Get My Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


