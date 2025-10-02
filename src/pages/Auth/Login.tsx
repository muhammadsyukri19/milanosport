import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Mohon isi semua field");
      return;
    }

    try {
      // Simulasi login berhasil
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email); // Simpan email untuk ditampilkan di profile

      // Cek apakah ada halaman redirect yang tersimpan
      const redirectTo =
        localStorage.getItem("redirectAfterLogin") || "/reservasi";
      localStorage.removeItem("redirectAfterLogin"); // Hapus setelah digunakan
      navigate(redirectTo);
    } catch (err) {
      setError("Terjadi kesalahan saat login");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div
          className="auth-image-section"
          style={{
            backgroundImage: "url(/assets/futsal.jpg)",
          }}
        >
          <div className="auth-image-content">
            <h2 className="auth-image-title">Selamat Datang Kembali</h2>
            <p className="auth-image-text">
              Nikmati kemudahan reservasi lapangan olahraga favorit Anda dengan
              Milano Sport
            </p>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-header">
            <h2 className="auth-title">Login</h2>
            <p className="auth-subtitle">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="Masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>

          <div className="auth-footer">
            Belum punya akun?{" "}
            <Link to="/register" className="auth-link">
              Daftar sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
