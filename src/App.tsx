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

// Layout component that includes Navbar
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/reservasi"
        element={
          <MainLayout>
            <Step1_FieldSelection />
          </MainLayout>
        }
      />
      <Route
        path="/jadwal"
        element={
          <MainLayout>
            <Step2_ScheduleCheck />
          </MainLayout>
        }
      />
      <Route
        path="/booking"
        element={
          <MainLayout>
            <Step3_BookingForm />
          </MainLayout>
        }
      />
      <Route
        path="/tentang"
        element={
          <MainLayout>
            <AboutUs />
          </MainLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <MainLayout>
            <h1>404 Not Found</h1>
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
