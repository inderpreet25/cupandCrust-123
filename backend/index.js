const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Routers
const AuthRouter = require("./routes/AuthRouter");

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/auth", AuthRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Connect Database
connectDB();

// Start Server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});