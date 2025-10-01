import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Step2_ScheduleCheck.css";

interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
}

const FIELD_PRICES = {
  "Mini Soccer": 200000,
  Futsal: 150000,
  Badminton: 50000,
  Padel: 130000,
};

const FIELD_DATA = [
  { type: "Mini Soccer", price: 200000, icon: "⚽" },
  { type: "Futsal", price: 150000, icon: "🥅" },
  { type: "Badminton", price: 50000, icon: "🏸" },
  { type: "Padel", price: 130000, icon: "🎾" },
];

const TIME_SLOTS: TimeSlot[] = [
  { time: "06:00", available: true, price: 0.8 }, // Morning discount
  { time: "07:00", available: true, price: 0.8 },
  { time: "08:00", available: false, price: 1 },
  { time: "09:00", available: true, price: 1 },
  { time: "10:00", available: true, price: 1 },
  { time: "11:00", available: true, price: 1 },
  { time: "12:00", available: false, price: 1 },
  { time: "13:00", available: true, price: 1 },
  { time: "14:00", available: true, price: 1 },
  { time: "15:00", available: true, price: 1 },
  { time: "16:00", available: true, price: 1.2 }, // Peak hours
  { time: "17:00", available: true, price: 1.2 },
  { time: "18:00", available: false, price: 1.2 },
  { time: "19:00", available: true, price: 1.2 },
  { time: "20:00", available: true, price: 1.2 },
  { time: "21:00", available: true, price: 1 },
];

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const Step2_ScheduleCheck: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedFieldFromUrl = searchParams.get("field");

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(1);
  const [currentField, setCurrentField] = useState<string>(selectedFieldFromUrl || "");

  const dates = generateDates();
  const basePrice = FIELD_PRICES[currentField as keyof typeof FIELD_PRICES] || 0;

  const handleFieldSelect = (fieldType: string) => {
    setCurrentField(fieldType);
  };

  const handleBack = () => {
    navigate("/reservasi");
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime && duration > 0 && currentField) {
      const totalPrice = calculateTotalPrice();
      const params = new URLSearchParams({
        field: currentField,
        date: selectedDate,
        time: selectedTime,
        duration: duration.toString(),
        totalPrice: totalPrice.toString(),
      });
      navigate(`/booking?${params.toString()}`);
    }
  };

  const getSelectedTimeSlot = () => {
    return TIME_SLOTS.find((slot) => slot.time === selectedTime);
  };

  const calculateTotalPrice = () => {
    const timeSlot = getSelectedTimeSlot();
    if (!timeSlot) return 0;
    return Math.round(basePrice * timeSlot.price * duration);
  };

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    setSelectedDate(dateString);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isTomorrow = (date: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Hari ini";
    if (isTomorrow(date)) return "Besok";
    return formatDate(date);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <button className="back-button" onClick={handleBack}>
          Kembali
        </button>
        <div className="schedule-title-section">
          <h1 className="schedule-title">Pilih Waktu Bermain</h1>
          {currentField ? (
            <p className="selected-field">
              Lapangan: <span>{currentField}</span>
            </p>
          ) : (
            <p className="selected-field">Silakan pilih lapangan terlebih dahulu</p>
          )}
        </div>
      </div>

      <div className="schedule-content">
        {/* Field Selection (jika belum dipilih) */}
        {!currentField && (
          <div className="field-selection-section">
            <h2 className="section-title">Pilih Lapangan</h2>
            <div className="field-selector-grid">
              {FIELD_DATA.map((field) => (
                <button key={field.type} className="field-selector-card" onClick={() => handleFieldSelect(field.type)}>
                  <span className="field-selector-icon">{field.icon}</span>
                  <span className="field-selector-name">{field.type}</span>
                  <span className="field-selector-price">Rp {field.price.toLocaleString("id-ID")}/jam</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Date Selection */}
        {currentField && (
          <div className="date-section">
            <h2 className="section-title">Pilih Tanggal</h2>
            <div className="date-grid">
              {dates.map((date, index) => (
                <button key={index} className={`date-card ${selectedDate === date.toISOString().split("T")[0] ? "selected" : ""}`} onClick={() => handleDateSelect(date)}>
                  <span className="date-day">{date.getDate()}</span>
                  <span className="date-label">{getDateLabel(date)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Time Selection */}
        {selectedDate && (
          <div className="time-section">
            <h2 className="section-title">Pilih Jam</h2>
            <div className="time-grid">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.time}
                  className={`time-slot ${!slot.available ? "unavailable" : ""} ${selectedTime === slot.time ? "selected" : ""}`}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                >
                  <span className="time-text">{slot.time}</span>
                  <span className="price-multiplier">
                    {slot.price === 0.8 && <span className="discount">-20%</span>}
                    {slot.price === 1.2 && <span className="peak">Peak</span>}
                    {slot.price === 1 && <span className="normal">Normal</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Duration Selection */}
        {selectedTime && (
          <div className="duration-section">
            <h2 className="section-title">Durasi Bermain</h2>
            <div className="duration-controls">
              <button className="duration-btn" onClick={() => setDuration(Math.max(1, duration - 1))} disabled={duration <= 1}>
                -
              </button>
              <span className="duration-display">{duration} jam</span>
              <button className="duration-btn" onClick={() => setDuration(Math.min(4, duration + 1))} disabled={duration >= 4}>
                +
              </button>
            </div>
            <p className="duration-note">Maksimal 4 jam per booking</p>
          </div>
        )}

        {/* Booking Summary */}
        {selectedDate && selectedTime && (
          <div className="booking-summary">
            <h2 className="section-title">Ringkasan Booking</h2>
            <div className="summary-card">
              <div className="summary-item">
                <span className="summary-label">Lapangan:</span>
                <span className="summary-value">{currentField}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Tanggal:</span>
                <span className="summary-value">
                  {new Date(selectedDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Waktu:</span>
                <span className="summary-value">
                  {selectedTime} - {new Date(`2000-01-01T${selectedTime}`).getHours() + duration}:00
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Durasi:</span>
                <span className="summary-value">{duration} jam</span>
              </div>
              <div className="summary-item total">
                <span className="summary-label">Total Harga:</span>
                <span className="summary-value">Rp {calculateTotalPrice().toLocaleString("id-ID")}</span>
              </div>
            </div>

            <button className="continue-button" onClick={handleContinue}>
              Lanjutkan ke Pembayaran
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2_ScheduleCheck;
