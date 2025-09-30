// src/pages/Reservation/Step1_FieldSelection.tsx

import React, { useState } from "react";

// --- DATA DUMMY DIDEFINISIKAN LANGSUNG (Untuk menghindari import error) ---
interface FieldType {
  type: "Mini Soccer" | "Futsal" | "Badminton" | "Padel";
  price: number;
  description: string;
}

const DUMMY_FIELDS: FieldType[] = [
  {
    type: "Mini Soccer",
    price: 200000,
    description: "Lapangan rumput sintetis standar.",
  },
  {
    type: "Futsal",
    price: 150000,
    description: "Permukaan vinyl berkualitas tinggi.",
  },
  {
    type: "Badminton",
    price: 50000,
    description: "4 unit lapangan dengan lantai kayu.",
  },
  {
    type: "Padel",
    price: 130000,
    description: "2 unit lapangan dengan dinding kaca.",
  },
];
// --- AKHIR DATA DUMMY ---

// Komponen Modal Detail (Tampilan saja)
const FieldDetailModal: React.FC<{ field: FieldType; onClose: () => void }> = ({
  field,
  onClose,
}) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        maxWidth: "600px",
        width: "90%",
      }}
    >
      <h2 style={{ borderBottom: "2px solid #007bff", paddingBottom: "10px" }}>
        Detail: {field.type}
      </h2>
      <div
        style={{
          height: "150px",
          backgroundColor: "#eee",
          marginBottom: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        [Galeri Foto Lapangan - Fokus Desain UI]
      </div>
      <p>
        <strong>Deskripsi:</strong> {field.description} (Fasilitas terbaik di
        Aceh)
      </p>
      <p>
        <strong>Harga Dasar:</strong> Rp {field.price.toLocaleString("id-ID")} /
        jam
      </p>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={onClose}
          style={{
            padding: "10px 15px",
            background: "none",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
);

// Komponen Card Pilihan Lapangan
const FieldCardUI: React.FC<{ field: FieldType }> = ({ field }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi placeholder, tidak melakukan apapun
  const handleAction = (action: string) => {
    if (action === "Baca Selengkapnya") {
      setIsModalOpen(true);
    } else {
      alert(
        `Simulasi: Memilih jenis lapangan ${field.type}. Fokus pada desain UI Anda.`
      );
    }
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "280px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Visual Placeholder */}
        <div
          style={{
            height: "150px",
            backgroundColor: "#a3d8ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "1.5rem",
          }}
        >
          {field.type} FOTO
        </div>

        <div style={{ padding: "20px" }}>
          <h3 style={{ color: "#007bff", marginBottom: "5px" }}>
            {field.type}
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#555", minHeight: "40px" }}>
            {field.description}
          </p>
          <p style={{ fontWeight: "bold", margin: "15px 0 20px 0" }}>
            Mulai: Rp {field.price.toLocaleString("id-ID")}/jam
          </p>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => handleAction("Cek Jadwal")}
              style={{
                padding: "10px 15px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Cek Jadwal
            </button>
            <button
              onClick={() => handleAction("Baca Selengkapnya")}
              style={{
                padding: "10px 15px",
                background: "none",
                border: "1px solid #007bff",
                color: "#007bff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Baca Selengkapnya
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <FieldDetailModal field={field} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

// Komponen Utama Step 1
const Step1_FieldSelection: React.FC = () => {
  return (
    <div style={{ padding: "20px 0", backgroundColor: "#f4f7f6" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Langkah 1: Pilih Jenis Lapangan
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {DUMMY_FIELDS.map((field) => (
          <FieldCardUI key={field.type} field={field} />
        ))}
      </div>
    </div>
  );
};

export default Step1_FieldSelection;
