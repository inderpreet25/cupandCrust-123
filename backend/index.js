const express = require("express");
const app = express();


require('dotenv').config();


const bodyParser = require("body-parser");
const cors = require("cors");


const connectDB = require("./config/db");

// Middleware
app.use(bodyParser.json());
app.use(cors());


const OrderRouter = require("./routes/OrderRouter");
const AuthRouter = require("./routes/AuthRouter");
const ProductRouter = require("./routes/ProductRouter");
const CartRouter = require("./routes/CartRouter");




// Routers
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/cart', CartRouter);
app.use("/orders", OrderRouter);





// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});


// Connect DB
connectDB();



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
