import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="logo-icon">
            <span className="logo-text">M</span>
          </div>
          <span className="brand-name">MilanoSport</span>
        </Link>

        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/reservasi" className={isActive("/reservasi")}>
            Cek & Reservasi
          </Link>
          <Link to="/about" className={isActive("/about")}>
            Tentang Kami
          </Link>
          <button className="login-button">Login</button>
        </div>

        <button className="mobile-menu" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};
