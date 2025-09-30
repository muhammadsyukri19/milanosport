// src/pages/AboutUs.tsx

import React from "react";
// Import Navbar agar tampilan About Us Anda lengkap
import { Navbar } from "../components/common/Navbar";

const AboutUs: React.FC = () => {
  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "800px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar sudah di-render di App.tsx, jadi tidak perlu lagi di sini */}

      <h1 style={{ color: "#007bff" }}>Tentang MilanoSport</h1>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
        MilanoSport adalah platform reservasi lapangan olahraga terlengkap di
        Aceh, menawarkan kemudahan booking untuk Mini Soccer, Futsal, Badminton,
        dan Padel.
      </p>
      <p style={{ color: "#666" }}>
        Proyek ini dibuat sebagai demonstrasi kemampuan Front-End Development
        dan implementasi Docker untuk mata kuliah Praktikum POPL A.
      </p>
      <h3 style={{ marginTop: "30px" }}>Visi Kami</h3>
      <p>
        Menjadi solusi utama bagi para atlet dan komunitas olahraga untuk
        menemukan dan memesan fasilitas terbaik dengan cepat dan efisien.
      </p>
    </div>
  );
};

export default AboutUs;
