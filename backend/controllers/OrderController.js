const Order = require("../models/OrderModel");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// Auth middleware
exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Login first" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // user id
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { items, total, address, payment } = req.body;

    if (!items?.length)
      return res.status(400).json({ message: "Cart is empty" });

    const newOrder = new Order({
      userId: req.userId,
      items,
      total,
      address,
      payment: payment || "Cash on Delivery",
    });

    await newOrder.save();
    return res.json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
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
