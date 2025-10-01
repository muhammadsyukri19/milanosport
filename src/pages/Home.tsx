// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/common/Navbar"; // Asumsikan Anda memiliki komponen Navbar

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleReservasiClick = () => {
    navigate("/reservasi"); // Arahkan ke halaman reservasi
  };

  const FeatureCard: React.FC<{
    title: string;
    icon: string;
    description: string;
  }> = ({ title, icon, description }) => (
    <div
      style={{
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        width: "30%",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: "3rem", color: "#007bff", marginBottom: "10px" }}>{icon}</div>
      <h3 style={{ color: "#333" }}>{title}</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>{description}</p>
    </div>
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Mengganti ini dengan komponen Navbar Anda */}
      {/* <Navbar /> */}

      {/* A. Hero Section */}
      <div
        style={{
          background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/assets/hero-bg.jpg)",
          backgroundSize: "cover",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3.5rem", marginBottom: "10px" }}>Satu Tempat, Semua Lapangan.</h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "30px" }}>Reservasi Cepat, Main Kapan Saja di Aceh.</p>
        <button
          onClick={handleReservasiClick}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          RESERVASI SEKARANG
        </button>
      </div>

      {/* B. Feature Section (Keunggulan) */}
      <div style={{ padding: "60px 50px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>Mengapa Memilih MilanoSport?</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <FeatureCard icon="⚽" title="Fasilitas Terlengkap" description="Mini Soccer, Futsal, Badminton, dan Padel dalam satu platform reservasi yang mudah." />
          <FeatureCard icon="📅" title="Jadwal Real-time" description="Cek ketersediaan semua unit lapangan Anda secara langsung tanpa perlu telepon atau chat." />
          <FeatureCard icon="💰" title="Harga Terbaik" description="Kami menawarkan harga sewa yang paling kompetitif dan transparan di seluruh wilayah Aceh." />
        </div>
      </div>

      {/* C. CTA Mini */}
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#007bff",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Siap Amankan Lapangan Anda Hari Ini?</h2>
        <button
          onClick={handleReservasiClick}
          style={{
            padding: "12px 25px",
            fontSize: "1.1rem",
            backgroundColor: "#ffc107",
            color: "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Cek Jadwal & Booking
        </button>
      </div>

      {/* D. Footer (Ganti dengan komponen Footer Anda) */}
      <div
        style={{
          padding: "40px",
          backgroundColor: "#333",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <p>&copy; 2025 MilanoSport. Reservasi Lapangan Aceh. | Kontak: (0651) 123456</p>
      </div>
    </div>
  );
};

export default Home;
