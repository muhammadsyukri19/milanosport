import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (Object.values(formData).some((value) => !value)) {
      setError("Mohon isi semua field");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      console.log("Register dengan:", formData);
    } catch (err) {
      setError("Terjadi kesalahan saat registrasi");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div
          className="auth-image-section"
          style={{
            backgroundImage: "url(/assets/mini-soccer.jpg)",
          }}
        >
          <div className="auth-image-content">
            <h2 className="auth-image-title">Bergabung Bersama Kami</h2>
            <p className="auth-image-text">
              Daftar sekarang dan nikmati pengalaman berolahraga yang
              menyenangkan di fasilitas olahraga modern kami
            </p>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-header">
            <h2 className="auth-title">Daftar</h2>
            <p className="auth-subtitle">
              Bergabung dengan Milano Sport untuk pengalaman olahraga terbaik
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Nomor Telepon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-input"
                placeholder="Masukkan nomor telepon"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Minimal 6 karakter"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-input"
                placeholder="Masukkan ulang password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="auth-button">
              Daftar Sekarang
            </button>
          </form>

          <div className="auth-footer">
            Sudah punya akun?{" "}
            <Link to="/login" className="auth-link">
              Login di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
