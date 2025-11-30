import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create Order
router.post("/create", async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    if (!userId || !items || !items.length) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({ userId, items, total });
    await newOrder.save();

    res.status(200).json({ message: "Order created successfully!", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Orders for a logged-in user
router.get("/myorders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
