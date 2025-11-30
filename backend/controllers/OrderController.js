import Order from "../models/Order.js";

export const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true, message: "Order Saved" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
