import React, { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { Camera, User, CheckCircle2, AlertCircle } from "lucide-react";
import { Navbar } from "../../components/common/Navbar";
import "./Profile.css";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  profileImage: string | null;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe", // Nanti diambil dari context/state management
    email: "john@example.com",
    phone: "081234567890",
    address: "Banda Aceh",
    birthDate: "1990-01-01",
    profileImage: null,
  });

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({
          ...prev,
          profileImage: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Implementasi update profile di sini
      console.log("Update profile:", profile);
      setMessage({
        text: "Profil berhasil diperbarui",
        type: "success",
      });
    } catch (error) {
      setMessage({
        text: "Gagal memperbarui profil",
        type: "error",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-content">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-image-container">
              <img
                src={profile.profileImage || "/assets/default-avatar.png"}
                alt="Profile"
                className="profile-image"
              />
              <label className="profile-image-upload" htmlFor="profile-image">
                <Camera size={20} />
                <input
                  type="file"
                  id="profile-image"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-email">{profile.email}</p>

            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">12</div>
                <div className="stat-label">Reservasi</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">4.8</div>
                <div className="stat-label">Rating</div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="profile-main">
            <div className="profile-section">
              <h3 className="section-title">
                <User size={24} />
                Informasi Profil
              </h3>

              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={profile.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={profile.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthDate" className="form-label">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    className="form-input"
                    value={profile.birthDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address" className="form-label">
                    Alamat
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-input"
                    value={profile.address}
                    onChange={handleInputChange}
                  />
                </div>

                {message && (
                  <div
                    className={`${
                      message.type === "success"
                        ? "success-message"
                        : "error-message"
                    }`}
                  >
                    {message.type === "success" ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    {message.text}
                  </div>
                )}

                <button type="submit" className="save-button">
                  Simpan Perubahan
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;
