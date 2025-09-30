// src/components/common/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 50px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        position: "sticky", // Agar tetap di atas
        top: 0,
        zIndex: 50,
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#007bff",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        MilanoSport
      </Link>

      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link to="/" style={navLinkStyle}>
          Home
        </Link>
        <Link to="/tentang" style={navLinkStyle}>
          Tentang Kami
        </Link>
        <Link to="/reservasi">
          <button style={reservasiButtonStyle}>Cek & Reservasi Jadwal</button>
        </Link>
      </div>
    </nav>
  );
};

// Styling Sederhana
const navLinkStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: "1rem",
};
const reservasiButtonStyle = {
  padding: "8px 15px",
  fontSize: "1rem",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
