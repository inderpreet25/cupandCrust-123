const express = require("express");
const { createOrder, getOrders } = require("../controllers/OrderController");

const router = express.Router();

router.post("/create", createOrder);
router.get("/myorders/:userId", getOrders);

module.exports = router;