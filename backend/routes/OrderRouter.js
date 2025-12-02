const express = require("express");
const { createOrder, getOrders, authMiddleware } = require("../controllers/OrderController");

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.get("/myorders", authMiddleware, getOrders);

module.exports = router;
