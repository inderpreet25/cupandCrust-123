const cartModel = require("../models/CartModel");

const userModel = require("../models/UserModel");

// GET Cart (Token → extract user)
const getCartlist = async (req, res) => {
    try {
        const userId = req.user._id;

        // Validate user first
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find the single cart document for this user (or null if none)
        const cart = await cartModel.findOne({ userId });

        // If no cart exists yet, return an empty items array for consistent client shape
        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: {
                    userId,
                    items: [],
                    updatedAt: null,
                },
            });
        }

        // Return the found cart
        return res.status(200).json({
            success: true,
            cart,
        });
    } catch (error) {
        console.error("Get cart list error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// ADD Cart Item
const addCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id, title, image, price, category } = req.body;

        if (!id || !title || !image || !price) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        // Check user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Fetch or create user's cart
        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({
                userId,
                items: [],
            });
        }

        // Check duplicate item inside cart
        const exists = cart.items.find((item) => item.id === id);

        if (exists) {
            // update quantity instead of blocking
            exists.quantity += 1;

            await cart.save();

            return res.status(200).json({
                success: true,
                message: "Quantity increased",
                cart,
            });
        }

        // Add new item
        cart.items.push({
            id,
            title,
            image,
            price,
            quantity: 1,
            category,
        });

        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Item added to cart",
            cart,
        });

    } catch (error) {
        console.log("Add to cart error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// UPDATE Cart Item (change quantity)
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user._id;

        // accept multiple possible names from the frontend for robustness
        const itemId = req.body.itemId || req.body.productId || req.body.id;
        let { quantity } = req.body;

        if (!itemId) {
            return res.status(400).json({ success: false, message: "Product ID missing" });
        }

        // coerce to number and validate
        quantity = Number(quantity);
        if (Number.isNaN(quantity) || !Number.isFinite(quantity)) {
            return res.status(400).json({ success: false, message: "Invalid quantity" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // find item index
        const idx = cart.items.findIndex((it) => it.id === itemId);
        if (idx === -1) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        if (quantity <= 0) {
            // remove item when quantity <= 0
            cart.items.splice(idx, 1);
            await cart.save();
            return res.status(200).json({
                success: true,
                message: "Item removed from cart",
                cart,
            });
        }

        // update quantity
        cart.items[idx].quantity = quantity;

        // optional: keep updatedAt changes if your schema uses timestamps
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated",
            cart,
        });
    } catch (error) {
        console.error("Cart update error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};




// REMOVE Cart Item
const removeCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.body; // that's fine, but consider renaming to `id` to match addCartItem
        console.log(itemId);


        if (!itemId) {
            return res.status(400).json({ success: false, message: "Product ID missing" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const initialLength = cart.items.length;
        cart.items = cart.items.filter((item) => item.id !== itemId);

        if (cart.items.length === initialLength) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        await cart.save();

        return res.json({
            success: true,
            message: "Item removed from cart",
            cart,
        });
    } catch (error) {
        console.error("Cart remove error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// Clear Cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;


        // optional: ensure user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Atomically set items to empty array and return the updated document
        const updatedCart = await cartModel.findOneAndUpdate(
            { userId },
            { $set: { items: [] } },
            { new: true, upsert: true } // upsert: true creates a cart if it doesn't exist
        );

        // If you prefer to remove the entire cart doc instead of keeping an empty one:
        // await cartModel.findOneAndDelete({ userId });

        return res.status(200).json({
            success: true,
            message: "Cart cleared",
            cart: updatedCart || { userId, items: [] },
        });
    } catch (error) {
        console.error("Clear cart error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};





module.exports = {
    getCartlist,
    addCartItem,
    updateCartItem,
    removeCartItem,
    clearCart
};
