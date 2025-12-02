const express = require("express");
const { createOrder, getOrders } = require("../controllers/OrderController");
const ensureAuthenticated = require("../middleware/Auth");

const router = express.Router();

router.get("/", ensureAuthenticated, getOrders);
router.post("/create", ensureAuthenticated, createOrder);

module.exports = router;
