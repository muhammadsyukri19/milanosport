import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage on initial render
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const location = useLocation();

  // Effect untuk mengontrol navbar scroll
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

  const scrollWithOffset = (el: HTMLElement) => {
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
    setIsOpen(false);
  };

  const isActive = (hash: string) =>
    location.hash === hash || (hash === "#hero" && location.pathname === "/")
      ? "nav-link active"
      : "nav-link";

  const handleAuth = () => {
    if (!isLoggedIn) {
      if (
        !location.pathname.includes("/login") &&
        !location.pathname.includes("/register")
      ) {
        localStorage.setItem("redirectAfterLogin", location.pathname);
      }
      navigate("/login");
    } else if (location.pathname === "/reservasi") {
      navigate("/profile");
    } else {
      navigate("/reservasi");
    }
  };

  // Effect untuk cek perubahan status login
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <nav className={`navbar ${isVisible ? "navbar-visible" : "navbar-hidden"}`}>
      <div className="navbar-container">
        <HashLink
          smooth
          to="/#hero"
          scroll={scrollWithOffset}
          className="navbar-brand"
        >
          <div className="logo-icon">
            <span className="logo-text">M</span>
          </div>
          <span className="brand-name">MilanoSport</span>
        </HashLink>

        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <HashLink
            smooth
            to="/#hero"
            scroll={scrollWithOffset}
            className={isActive("#hero")}
          >
            Home
          </HashLink>

          <HashLink
            smooth
            to="/#reservasi"
            scroll={scrollWithOffset}
            className={isActive("#reservasi")}
          >
            Cek & Reservasi
          </HashLink>

          <HashLink
            smooth
            to="/#tentang"
            scroll={scrollWithOffset}
            className={isActive("#tentang")}
          >
            Tentang Kami
          </HashLink>

          <button className="login-button" onClick={handleAuth}>
            {!isLoggedIn ? "Login" : "Profil"}
          </button>
        </div>

        <button
          className={`navbar-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};
