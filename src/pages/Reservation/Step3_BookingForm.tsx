import React, { useState } from "react";
import "./Step3_BookingForm.css";

interface Props {
  reservationData: {
    selectedField?: string;
    selectedDate?: string;
    selectedTime?: string;
    duration?: number;
    totalPrice?: number;
  };
  onComplete: () => void;
  onBack: () => void;
}

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
  paymentProof?: File;
  notes: string;
}

const PAYMENT_METHODS = [
  { id: "bank_transfer", name: "Transfer Bank", desc: "BCA, Mandiri, BNI, BRI" },
  { id: "e_wallet", name: "E-Wallet", desc: "GoPay, OVO, DANA, ShopeePay" },
  { id: "qris", name: "QRIS", desc: "Scan QR Code untuk pembayaran" },
  { id: "cash", name: "Bayar di Tempat", desc: "Bayar saat tiba di lokasi" },
];

const Step3_BookingForm: React.FC<Props> = ({ reservationData, onComplete, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "",
    notes: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, paymentProof: file || undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Nama lengkap wajib diisi";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Format email tidak valid";
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Nomor telepon wajib diisi";
    } else if (!/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(formData.customerPhone.replace(/[^0-9+]/g, ""))) {
      newErrors.customerPhone = "Format nomor telepon tidak valid";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Metode pembayaran wajib dipilih";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onComplete();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string, duration?: number) => {
    if (!duration) return time;
    const startHour = parseInt(time.split(':')[0]);
    const endHour = startHour + duration;
    return `${time} - ${endHour.toString().padStart(2, '0')}:00`;
  };

  return (
    <div className="booking-form-container">
      <div className="booking-header">
        <button className="back-button" onClick={onBack}>
          ← Kembali
        </button>
        <div className="booking-title-section">
          <h1 className="booking-title">Konfirmasi Reservasi</h1>
          <p className="booking-subtitle">Lengkapi data dan konfirmasi booking Anda</p>
        </div>
      </div>

      <div className="booking-content">
        <div className="booking-form-section">
          {/* Reservation Summary */}
          <div className="reservation-summary-card">
            <h2 className="card-title">Ringkasan Reservasi</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-icon">🏟️</span>
                <div className="summary-details">
                  <span className="summary-label">Lapangan</span>
                  <span className="summary-value">{reservationData.selectedField}</span>
                </div>
              </div>
              
              <div className="summary-item">
                <span className="summary-icon">📅</span>
                <div className="summary-details">
                  <span className="summary-label">Tanggal</span>
                  <span className="summary-value">
                    {reservationData.selectedDate && formatDate(reservationData.selectedDate)}
                  </span>
                </div>
              </div>
              
              <div className="summary-item">
                <span className="summary-icon">⏰</span>
                <div className="summary-details">
                  <span className="summary-label">Waktu</span>
                  <span className="summary-value">
                    {reservationData.selectedTime && formatTime(reservationData.selectedTime, reservationData.duration)}
                  </span>
                </div>
              </div>
              
              <div className="summary-item">
                <span className="summary-icon">💰</span>
                <div className="summary-details">
                  <span className="summary-label">Total Harga</span>
                  <span className="summary-value price">
                    Rp {reservationData.totalPrice?.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <div className="form-card">
            <h2 className="card-title">Data Pemesan</h2>
            <div className="form-grid">
              <FormField
                label="Nama Lengkap"
                type="text"
                value={formData.customerName}
                onChange={(value) => handleInputChange("customerName", value)}
                error={errors.customerName}
                placeholder="Masukkan nama lengkap"
                required
              />
              
              <FormField
                label="Email"
                type="email"
                value={formData.customerEmail}
                onChange={(value) => handleInputChange("customerEmail", value)}
                error={errors.customerEmail}
                placeholder="contoh@email.com"
                required
              />
              
              <FormField
                label="Nomor Telepon"
                type="tel"
                value={formData.customerPhone}
                onChange={(value) => handleInputChange("customerPhone", value)}
                error={errors.customerPhone}
                placeholder="08xxxxxxxxxx"
                required
              />
              
              <div className="form-field full-width">
                <label className="form-label">Catatan (Opsional)</label>
                <textarea
                  className="form-textarea"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Tambahkan catatan khusus untuk reservasi Anda"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="form-card">
            <h2 className="card-title">Metode Pembayaran</h2>
            <div className="payment-methods">
              {PAYMENT_METHODS.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  selected={formData.paymentMethod === method.id}
                  onSelect={() => handleInputChange("paymentMethod", method.id)}
                />
              ))}
            </div>
            {errors.paymentMethod && (
              <span className="error-message">{errors.paymentMethod}</span>
            )}
          </div>

          {/* Payment Proof Upload */}
          {formData.paymentMethod && formData.paymentMethod !== "cash" && (
            <div className="form-card">
              <h2 className="card-title">Bukti Pembayaran</h2>
              <PaymentProofUpload onFileChange={handleFileChange} />
            </div>
          )}

          {/* Submit Button */}
          <div className="submit-section">
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading-text">
                  <span className="spinner"></span>
                  Memproses...
                </span>
              ) : (
                "Konfirmasi Reservasi"
              )}
            </button>
            <p className="submit-note">
              Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form Field Component
const FormField: React.FC<{
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}> = ({ label, type, value, onChange, error, placeholder, required }) => (
  <div className="form-field">
    <label className="form-label">
      {label} {required && <span className="required">*</span>}
    </label>
    <input
      type={type}
      className={`form-input ${error ? "error" : ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

// Payment Method Card Component
const PaymentMethodCard: React.FC<{
  method: { id: string; name: string; desc: string };
  selected: boolean;
  onSelect: () => void;
}> = ({ method, selected, onSelect }) => (
  <div className={`payment-card ${selected ? "selected" : ""}`} onClick={onSelect}>
    <div className="payment-radio">
      <div className={`radio-dot ${selected ? "selected" : ""}`}></div>
    </div>
    <div className="payment-info">
      <h3 className="payment-name">{method.name}</h3>
      <p className="payment-desc">{method.desc}</p>
    </div>
  </div>
);

// Payment Proof Upload Component
const PaymentProofUpload: React.FC<{
  onFileChange: (file: File | null) => void;
}> = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFileChange(file);
  };

  return (
    <div className="upload-zone">
      <input
        type="file"
        id="payment-proof"
        accept="image/*,.pdf"
        onChange={handleFileSelect}
        className="upload-input"
      />
      <label htmlFor="payment-proof" className="upload-label">
        <div className="upload-icon">📎</div>
        <div className="upload-text">
          {selectedFile ? (
            <span className="file-selected">{selectedFile.name}</span>
          ) : (
            <>
              <span className="upload-main">Klik untuk upload bukti pembayaran</span>
              <span className="upload-sub">PNG, JPG, PDF maksimal 5MB</span>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default Step3_BookingForm;
