const express = require("express");
const { createOrder, getOrders } = require("../controllers/OrderController");
const ensureAuthenticated = require("../middleware/Auth");

const router = express.Router();

router.post("/create", ensureAuthenticated, createOrder);
router.get("/myorders", ensureAuthenticated, getOrders);

module.exports = router;
