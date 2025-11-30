const Order = require("../models/OrderModel");

exports.createOrder = async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    if (!userId || !items.length)
      return res.status(400).json({ message: "Invalid order data" });

    const newOrder = new Order({ userId, items, total });
    await newOrder.save();

    res.json({ message: "Order created", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};