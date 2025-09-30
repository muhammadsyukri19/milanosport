// src/App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// VERIFIKASI PATH IMPOR DI BAWAH INI
import { Navbar } from "./components/common/Navbar"; // Pastikan path ini benar
import Home from "./pages/Home.tsx"; // Pastikan path ini benar
import AboutUs from "./pages/AboutUs.tsx"; // Pastikan path ini benar

// Import Reservation Page
import ReservationPage from "./pages/Reservation/ReservationPage.tsx";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservasi" element={<ReservationPage />} />
        <Route path="/tentang" element={<AboutUs />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
