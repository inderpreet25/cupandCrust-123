const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Routers
const AuthRouter = require("./routes/AuthRouter");
const OrderRouter = require("./routes/OrderRouter");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/auth", AuthRouter);
app.use("/api/orders", OrderRouter);

app.get("/", (req, res) => {
  res.send("Backend running");
});

connectDB();

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));