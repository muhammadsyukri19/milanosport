// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Trophy,
  DollarSign,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import { Navbar } from "../components/common/Navbar";
import "./Home.css";
import InfiniteScroll from "../components/common/InfiniteScroll.tsx";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleReservasiClick = () => {
    navigate("/reservasi");
  };

  const FeatureCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    description: string;
  }> = ({ title, icon, description }) => (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );

  const sports = [
    { name: "Mini Soccer", emoji: "⚽" },
    { name: "Futsal", emoji: "🥅" },
    { name: "Badminton", emoji: "🏸" },
    { name: "Padel", emoji: "🎾" },
  ];

  const items = [
    { content: "Mini Soccer" },
    {
      content: (
        <img
          src="/assets/mini-soccer.jpg"
          alt="Mini Soccer"
          style={{ width: "90%", borderRadius: "45px" }}
        />
      ),
    },

    { content: "Futsal" },
    {
      content: (
        <img
          src="/assets/futsal.jpg"
          alt="Futsal"
          style={{ width: "90%", borderRadius: "45px" }}
        />
      ),
    },

    { content: "Badminton" },
    {
      content: (
        <img
          src="/assets/badminton.jpg"
          alt="Badminton"
          style={{ width: "90%", borderRadius: "45px" }}
        />
      ),
    },

    { content: "Padel" },
    {
      content: (
        <img
          src="/assets/padel.jpg"
          alt="Padel"
          style={{ width: "90%", borderRadius: "45px" }}
        />
      ),
    },
  ];

  return (
    <div className="home-container">
      <Navbar />
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span>Platform Reservasi Lapangan #1 di Aceh</span>
            </div>
            <h1 className="hero-title">
              Satu Tempat,
              <br />
              <span className="hero-title-gradient">Semua Lapangan</span>
            </h1>
            <p className="hero-subtitle">
              Reservasi cepat dan mudah untuk Mini Soccer, Futsal, Badminton &
              Padel.
              <br />
              Kapan saja, di mana saja.
            </p>

            {/* Sports Pills */}
            <div className="sports-pills">
              {sports.map((sport, idx) => (
                <div key={idx} className="sport-pill">
                  <span className="sport-emoji">{sport.emoji}</span>
                  <span className="sport-name">{sport.name}</span>
                </div>
              ))}
            </div>

            <button onClick={handleReservasiClick} className="hero-btn">
              Reservasi Sekarang
            </button>
          </div>
          {/* Image Section */}
          <div className="hero-image">
            <div style={{ height: "500px", position: "relative" }}>
              <InfiniteScroll
                items={items}
                isTilted={true}
                tiltDirection="left"
                autoplay={true}
                autoplaySpeed={2}
                autoplayDirection="down"
                pauseOnHover={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Mengapa Memilih MilanoSport?</h2>
            <p className="section-subtitle">
              Kemudahan dan kenyamanan untuk pengalaman booking terbaik Anda
            </p>
          </div>

          <div className="features-grid">
            <FeatureCard
              icon={<Trophy className="icon-white" />}
              title="Fasilitas Terlengkap"
              description="Mini Soccer, Futsal, Badminton, dan Padel dalam satu platform yang terintegrasi."
            />
            <FeatureCard
              icon={<Calendar className="icon-white" />}
              title="Jadwal Real-time"
              description="Cek ketersediaan langsung tanpa perlu telepon. Transparansi penuh untuk Anda."
            />
            <FeatureCard
              icon={<DollarSign className="icon-white" />}
              title="Harga Terbaik"
              description="Harga kompetitif dan transparan di seluruh wilayah Aceh. Tidak ada biaya tersembunyi."
            />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="howto-section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Cara Mudah Booking</h2>
            <p className="section-subtitle">
              Hanya 3 langkah untuk mendapatkan lapangan impian Anda
            </p>
          </div>

          <div className="steps-grid">
            {[
              {
                step: "1",
                title: "Pilih Lapangan",
                desc: "Browse dan pilih jenis lapangan yang Anda inginkan",
              },
              {
                step: "2",
                title: "Tentukan Jadwal",
                desc: "Pilih tanggal dan jam yang tersedia sesuai kebutuhan",
              },
              {
                step: "3",
                title: "Konfirmasi Booking",
                desc: "Bayar dan terima konfirmasi booking langsung",
              },
            ].map((item, idx) => (
              <div key={idx} className="step-item">
                <div className="step-number">
                  <span>{item.step}</span>
                </div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Siap Amankan Lapangan Anda?</h2>
          <p className="cta-subtitle">
            Jangan sampai kehabisan slot! Booking sekarang dan nikmati
            pengalaman bermain terbaik.
          </p>
          <button onClick={handleReservasiClick} className="cta-btn">
            Cek Jadwal & Booking
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <div className="logo-icon">
                  <span className="logo-text">M</span>
                </div>
                <span className="footer-brand">MilanoSport</span>
              </div>
              <p className="footer-desc">
                Platform reservasi lapangan olahraga terpercaya di Aceh.
              </p>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Kontak</h3>
              <div className="footer-info">
                <div className="info-item">
                  <Phone className="info-icon" />
                  <span>(0651) 123456</span>
                </div>
                <div className="info-item">
                  <MapPin className="info-icon" />
                  <span>Aceh, Indonesia</span>
                </div>
              </div>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Jam Operasional</h3>
              <div className="info-item">
                <Clock className="info-icon" />
                <span>Senin - Minggu: 06:00 - 23:00</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; 2025 MilanoSport. Reservasi Lapangan Aceh. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
