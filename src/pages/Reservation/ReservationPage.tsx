// src/pages/Reservation/ReservationPage.tsx (Versi UI-Fokus)

import React from "react";
// import Step1_FieldSelection dari sini akan menyebabkan error jika file belum ada
// Kita akan menggunakan placeholder saja dulu.
import Step1Placeholder from "./Step1_FieldSelection";

const ReservationPage: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
        Halaman Reservasi Utama (3 Langkah)
      </h1>

      {/* Tampilan Status Langkah */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#f0f0f0",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "40px",
        }}
      >
        <p style={{ fontWeight: "bold", color: "#007bff" }}>
          1. Pilih Lapangan
        </p>
        <p style={{ color: "#666" }}>2. Cek Jadwal</p>
        <p style={{ color: "#666" }}>3. Konfirmasi</p>
      </div>

      {/* Render Placeholder untuk Langkah 1 */}
      <Step1Placeholder />
    </div>
  );
};

export default ReservationPage;
