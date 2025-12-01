const { getCartlist, addCartItem, removeCartItem, updateCartItem, clearCart } = require("../controllers/CartController");
const ensureAuthenticated = require("../middleware/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, getCartlist);

router.post("/add", ensureAuthenticated, addCartItem);

router.post("/update", ensureAuthenticated, updateCartItem);

router.delete("/remove", ensureAuthenticated, removeCartItem);

router.post("/clear", ensureAuthenticated, clearCart);

module.exports = router;
