import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Auth.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // send request to backend
      const res = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      const { message, success, jwtToken, email: serverEmail, name } = res.data;


      if (success) {
        // store token & user data in localStorage
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("email", serverEmail);
        localStorage.setItem("loggedInUser", name);
        alert(message || "✅ Login successful!");

        // redirect to homepage or dashboard
        navigate("/");

      }
    } catch (err) {
      console.log(err);
      alert("❌ Login failed — try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
