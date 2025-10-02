import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ⬅️ dummy login state
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const isActive = (path: string) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav className={`navbar ${isVisible ? "navbar-visible" : "navbar-hidden"}`}>
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

          {/* Kondisional: sebelum login => Login, sesudah login => Profil */}
          {!isLoggedIn ? (
            <button
              className="login-button"
              onClick={() => setIsLoggedIn(true)}
            >
              Login
            </button>
          ) : (
            <button
              className="login-button"
              onClick={() => setIsLoggedIn(false)}
            >
              Profil
            </button>
          )}
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
