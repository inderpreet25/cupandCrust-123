import React from "react";
import { Link } from "react-router-dom";
import footerBg from "../assets/fbg.jpg"; 
import "./Footer.css";

export default function Footer() {
  return (
    <footer
      className="footer"
      style={{ backgroundImage: `url(${footerBg})` }}
      aria-label="Site footer"
    >
      <div className="footer__overlay" />
      <div className="footer__content">
        {/* Brand Name */}
        <h3 className="footer__brand">Cup & Crust</h3>

        {/* Tagline */}
        <p className="footer__tagline">
          By Inderpreet — Happiness served with Pizza, Bakery & Coffee
        </p>

        {/* Footer Links */}
        <nav className="footer__links" aria-label="Footer links">
          <Link to="/about">About Us</Link>
        </nav>
      </div>
    </footer>
  );
}