import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: String,
      price: Number,
      quantity: Number,
    }
  ],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }, // backend handles date automatically
});

export default mongoose.model("Order", orderSchema);
