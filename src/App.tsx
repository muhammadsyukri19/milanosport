// src/App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/common/Navbar";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
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
          <ProtectedRoute>
            <MainLayout>
              <Step1_FieldSelection />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/jadwal"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Step2_ScheduleCheck />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Step3_BookingForm />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <h1>Profile Page</h1>
            </MainLayout>
          </ProtectedRoute>
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
