const userModel = require("../models/UserModel"); // no .js needed
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await userModel.findOne({ email });
    if (exist) return res.json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashed,
    });

    await newUser.save();

    return res.json({
      message: "Signup successful",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.log("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.json({ message: "Invalid Email or Password" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.json({ message: "Invalid Email or Password" });

    return res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login };
