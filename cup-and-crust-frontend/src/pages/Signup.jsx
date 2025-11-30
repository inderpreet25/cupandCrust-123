import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Auth.css";
import bgImg from "../assets/bg.jpg";
import axios from "axios";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {

      const res = await axios.post("http://localhost:8080/auth/signup", { name, email, password });
      alert(res.data.msg || "✅ Signup successful!");
      navigate("/login"); // redirect to login page
      console.log("User Registered:", res.data.user);


    } catch (err) {
      const errorDetailsObj = err.response.data.error.details[0];
      console.error(errorDetailsObj);
      const alertMsg = Object.values(errorDetailsObj)[0];

      alert(alertMsg || "❌ Signup failed — try again.");
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="auth-box">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="switch-auth">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <Link to="/" className="back-home">⬅ Go Back to Home</Link>
      </div>
    </div>
  );
}

export default Signup;
