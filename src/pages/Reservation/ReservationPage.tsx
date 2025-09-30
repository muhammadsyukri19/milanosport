import React, { useState } from "react";
import Step1_FieldSelection from "./Step1_FieldSelection";
import Step2_ScheduleCheck from "./Step2_ScheduleCheck";
import Step3_BookingForm from "./Step3_BookingForm";
import "./ReservationPage.css";

interface ReservationData {
  selectedField?: string;
  selectedDate?: string;
  selectedTime?: string;
  duration?: number;
  totalPrice?: number;
}

const ReservationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [reservationData, setReservationData] = useState<ReservationData>({});

  const handleFieldSelect = (fieldType: string) => {
    setReservationData((prev) => ({ ...prev, selectedField: fieldType }));
    setCurrentStep(2);
  };

  const handleCheckSchedule = () => {
    // Langsung ke Step2 tanpa memilih lapangan
    setCurrentStep(2);
  };

  const handleScheduleSelect = (date: string, time: string, duration: number, totalPrice: number) => {
    setReservationData((prev) => ({
      ...prev,
      selectedDate: date,
      selectedTime: time,
      duration,
      totalPrice,
    }));
    setCurrentStep(3);
  };

  const handleBookingComplete = () => {
    alert("Reservasi berhasil dibuat!");
    setCurrentStep(1);
    setReservationData({});
  };

  const handleStepClick = () => {
    // Disable step navigation - users cannot click to jump between steps
    return;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_FieldSelection onFieldSelect={handleFieldSelect} onCheckSchedule={handleCheckSchedule} />;
      case 2:
        return <Step2_ScheduleCheck selectedField={reservationData.selectedField} onScheduleSelect={handleScheduleSelect} onBack={() => setCurrentStep(1)} onFieldSelect={handleFieldSelect} />;
      case 3:
        return <Step3_BookingForm reservationData={reservationData} onComplete={handleBookingComplete} onBack={() => setCurrentStep(2)} />;
      default:
        return <Step1_FieldSelection onFieldSelect={handleFieldSelect} onCheckSchedule={handleCheckSchedule} />;
    }
  };

  return (
    <div className="reservation-page">
      {/* Floating background orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      <div className="reservation-container">
        {/* Progress Steps */}
        <div className="steps-container">
          <div className="steps-header">
            <h1 className="main-title">Reservasi Lapangan</h1>
            <p className="main-subtitle">Ikuti 3 langkah mudah untuk menyelesaikan reservasi</p>
          </div>

          <div className="steps-indicator">
            {[1, 2, 3].map((step) => (
              <div key={step} className="step-wrapper">
                <div className={`step-circle ${currentStep >= step ? "active" : ""} ${currentStep === step ? "current" : ""}`} onClick={() => handleStepClick()}>
                  <span className="step-number">{step}</span>
                </div>
                <div className="step-info">
                  <h3 className="step-title">
                    {step === 1 && "Pilih Lapangan"}
                    {step === 2 && "Cek Jadwal"}
                    {step === 3 && "Konfirmasi"}
                  </h3>
                  <p className="step-description">
                    {step === 1 && "Pilih jenis lapangan yang diinginkan"}
                    {step === 2 && "Tentukan waktu dan durasi bermain"}
                    {step === 3 && "Lengkapi data dan konfirmasi booking"}
                  </p>
                </div>
                {step < 3 && <div className={`step-connector ${currentStep > step ? "completed" : ""}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="step-content">{renderCurrentStep()}</div>
      </div>
    </div>
  );
};

export default ReservationPage;
