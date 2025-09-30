import React, { useState } from "react";
import "./Step1_FieldSelection.css";

interface FieldType {
  type: "Mini Soccer" | "Futsal" | "Badminton" | "Padel";
  price: number;
  description: string;
  icon: string;
}

const DUMMY_FIELDS: FieldType[] = [
  {
    type: "Mini Soccer",
    price: 200000,
    description: "Lapangan rumput sintetis standar berkualitas tinggi dengan fasilitas lengkap.",
    icon: "⚽",
  },
  {
    type: "Futsal",
    price: 150000,
    description: "Permukaan vinyl berkualitas tinggi dengan pencahayaan optimal.",
    icon: "🥅",
  },
  {
    type: "Badminton",
    price: 50000,
    description: "4 unit lapangan dengan lantai kayu dan net standar internasional.",
    icon: "🏸",
  },
  {
    type: "Padel",
    price: 130000,
    description: "2 unit lapangan dengan dinding kaca dan permukaan sintetis premium.",
    icon: "🎾",
  },
];

const FieldDetailModal: React.FC<{ field: FieldType; onClose: () => void }> = ({ field, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <span className="modal-icon">{field.icon}</span>
        <h2 className="modal-title">{field.type}</h2>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="modal-image">
        <div className="image-placeholder">
          <span className="image-icon">{field.icon}</span>
          <p>Premium Sports Facility - {field.type}</p>
        </div>
      </div>

      <div className="modal-details">
        <div className="detail-section">
          <h3>Deskripsi Fasilitas</h3>
          <p>{field.description} Fasilitas terbaik di Aceh dengan teknologi modern dan standar internasional.</p>
        </div>

        <div className="detail-section">
          <h3>Informasi Harga</h3>
          <div className="price-info">
            <span className="price-label">Harga Dasar:</span>
            <span className="price-value">Rp {field.price.toLocaleString("id-ID")} / jam</span>
          </div>
        </div>

        <div className="detail-section">
          <h3>Fasilitas Tambahan</h3>
          <ul className="facilities-list">
            <li>✓ Ruang ganti dengan locker</li>
            <li>✓ Shower dengan air hangat</li>
            <li>✓ Parkir luas dan aman</li>
            <li>✓ Kantin dan area istirahat</li>
          </ul>
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn-primary" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  </div>
);

const FieldCardUI: React.FC<{
  field: FieldType;
  onFieldSelect?: (fieldType: string) => void;
}> = ({ field, onFieldSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (action: string) => {
    if (action === "detail") {
      setIsModalOpen(true);
    } else if (action === "select") {
      if (onFieldSelect) {
        onFieldSelect(field.type);
      }
    }
  };

  const getFieldClass = () => {
    return field.type.toLowerCase().replace(" ", "-");
  };

  return (
    <>
      <div className={`field-card ${getFieldClass()}`}>
        <div className="field-card-header">
          <div className="field-icon">{field.icon}</div>
          <h3 className="field-card-title">{field.type}</h3>
        </div>

        <div className="field-card-body">
          <p className="field-description">{field.description}</p>

          <div className="field-price-container">
            <span className="price-label">Mulai dari</span>
            <span className="field-price">Rp {field.price.toLocaleString("id-ID")}/jam</span>
          </div>

          <div className="field-actions">
            <button onClick={() => handleAction("select")} className="btn-primary">
              Pilih Lapangan
            </button>
            <button onClick={() => handleAction("detail")} className="btn-secondary">
              Detail
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <FieldDetailModal field={field} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

const Step1_FieldSelection: React.FC<{
  onFieldSelect?: (fieldType: string) => void;
  onCheckSchedule?: () => void;
}> = ({ onFieldSelect, onCheckSchedule }) => {
  return (
    <div className="field-selection-container">
      <div className="field-header">
        <h1 className="field-title">Pilih Lapangan Favorit Anda</h1>
        <p className="field-subtitle">Fasilitas olahraga premium dengan teknologi terdepan di Aceh. Nikmati pengalaman bermain yang tak terlupakan dengan standar internasional.</p>
      </div>

      <div className="field-cards-container">
        {DUMMY_FIELDS.map((field) => (
          <FieldCardUI key={field.type} field={field} onFieldSelect={onFieldSelect} />
        ))}
      </div>
    </div>
  );
};

export default Step1_FieldSelection;
