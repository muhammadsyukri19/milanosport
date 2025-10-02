// src/App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// VERIFIKASI PATH IMPOR DI BAWAH INI
import { Navbar } from "./components/common/Navbar"; // Pastikan path ini benar
import Home from "./pages/Home.tsx"; // Pastikan path ini benar
import AboutUs from "./pages/AboutUs.tsx"; // Pastikan path ini benar

// Import Reservation Components
import Step1_FieldSelection from "./pages/Reservation/Step1_FieldSelection.tsx";
import Step2_ScheduleCheck from "./pages/Reservation/Step2_ScheduleCheck.tsx";
import Step3_BookingForm from "./pages/Reservation/Step3_BookingForm.tsx";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservasi" element={<Step1_FieldSelection />} />
        <Route path="/jadwal" element={<Step2_ScheduleCheck />} />
        <Route path="/booking" element={<Step3_BookingForm />} />
        <Route path="/tentang" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
