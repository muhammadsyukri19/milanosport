# 🌐 Network Access Setup - MilanoSport

## 📋 Overview

Panduan konfigurasi untuk mengakses aplikasi **MilanoSport** dari laptop/device lain dalam jaringan lokal yang sama (LAN/WiFi).

---

## ✅ Konfigurasi yang Sudah Dilakukan

### 1. **Frontend (.env)** ✅

```env
VITE_API_BASE_URL=http://192.168.1.60:5000/api
```

### 2. **Backend (server.js)** ✅

```javascript
const host = "0.0.0.0"; // Listen on all network interfaces
const port = process.env.PORT || 5000;

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
  console.log(`Access from other devices: http://192.168.1.60:${port}`);
});
```

### 3. **CORS Configuration** ✅

```javascript
app.use(cors()); // Allow all origins
```

---

## 🚀 Cara Menjalankan

### Step 1: Jalankan Backend

```bash
cd milanosport-backend
npm start
```

**Output yang Diharapkan:**

```
Server running on http://0.0.0.0:5000
Access from other devices: http://192.168.1.60:5000
Pinged your deployment. You successfully connected to MongoDB!
```

### Step 2: Jalankan Frontend (Development)

```bash
cd milanosport
npm run dev
```

**Vite akan menampilkan:**

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.60:5173/
```

### Step 3: Build untuk Production (Optional)

```bash
cd milanosport
npm run build
npm run preview
```

---

## 🔗 URL Access

### Dari Laptop Server (Host):

- **Frontend Dev:** `http://localhost:5173`
- **Frontend Production:** `http://localhost:4173`
- **Backend API:** `http://localhost:5000`

### Dari Laptop Lain (Sama WiFi/LAN):

- **Frontend Dev:** `http://192.168.1.60:5173`
- **Frontend Production:** `http://192.168.1.60:4173`
- **Backend API:** `http://192.168.1.60:5000`

---

## 🔧 Troubleshooting

### Problem 1: Tidak Bisa Akses dari Laptop Lain

**Solusi:**

1. **Cek IP Address Server**

   ```bash
   # Windows
   ipconfig

   # Linux/Mac
   ifconfig
   # atau
   ip addr show
   ```

   Pastikan IP yang digunakan adalah IP WiFi/LAN adapter, bukan Virtual adapter.

2. **Update IP di .env jika berubah**

   ```bash
   # File: milanosport/.env
   VITE_API_BASE_URL=http://[IP_BARU]:5000/api
   ```

3. **Restart Development Server**
   ```bash
   # Stop: Ctrl+C
   # Start lagi: npm run dev
   ```

---

### Problem 2: Firewall Blocking

**Windows Firewall:**

1. Buka **Windows Defender Firewall**
2. Klik **"Allow an app through firewall"**
3. Tambahkan:
   - `Node.js` (untuk backend)
   - Port `5000` (Backend)
   - Port `5173` (Frontend Dev)
   - Port `4173` (Frontend Preview)

**Atau disable sementara untuk testing:**

```powershell
# Run as Administrator
netsh advfirewall set allprofiles state off
```

**Enable kembali setelah testing:**

```powershell
netsh advfirewall set allprofiles state on
```

---

### Problem 3: CORS Error

Jika muncul error CORS saat akses dari laptop lain:

**Update Backend CORS:**

```javascript
// File: milanosport-backend/src/server.js

// Dari:
app.use(cors());

// Menjadi (lebih spesifik):
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.60:5173", "http://localhost:4173", "http://192.168.1.60:4173"],
    credentials: true,
  })
);
```

---

### Problem 4: IP Berubah-ubah

Jika IP sering berubah setelah restart router:

**Solusi 1: Set Static IP di Router**

1. Login ke router admin (biasanya `192.168.1.1` atau `192.168.0.1`)
2. Cari menu **DHCP** atau **IP Reservation**
3. Bind MAC Address laptop ke IP `192.168.1.60`

**Solusi 2: Gunakan Hostname**

```bash
# File: .env
VITE_API_BASE_URL=http://NAMA-LAPTOP:5000/api
```

---

## 📱 Akses dari HP/Tablet

### Android/iOS:

1. Pastikan HP tersambung ke **WiFi yang sama**
2. Buka browser: `http://192.168.1.60:5173`

### Testing API:

```bash
# Buka browser di HP:
http://192.168.1.60:5000

# Seharusnya muncul:
{"status":200,"message":"hello"}
```

---

## 🔐 Security Notes

### Development Mode (Current):

- ✅ CORS: Allow all origins
- ✅ Firewall: Open ports
- ⚠️ **HANYA untuk development/testing**

### Production Mode (Recommended):

```javascript
// Backend CORS - Restrict origins
app.use(cors({
  origin: ['https://yourdomain.com'],
  credentials: true
}));

// Environment variables
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

## 📊 Network Architecture

```
┌─────────────────────────────────────────────────┐
│         WiFi Router (192.168.1.1)               │
└─────────────┬───────────────────────────────────┘
              │
      ┌───────┴────────┐
      │                │
┌─────▼─────┐   ┌──────▼──────┐
│  Laptop A  │   │  Laptop B   │
│  (Server)  │   │  (Client)   │
├────────────┤   ├─────────────┤
│ IP: .60    │   │ IP: .70     │
├────────────┤   └─────────────┘
│ Backend    │          │
│ :5000      │◄─────────┤ Akses:
├────────────┤          │ http://192.168.1.60:5173
│ Frontend   │          │ http://192.168.1.60:5000/api
│ :5173      │          │
└────────────┘          └─────────────────────────►
```

---

## 🧪 Testing Checklist

### Dari Laptop Server:

- [ ] Backend running: `http://localhost:5000` → {"status":200,"message":"hello"}
- [ ] Frontend running: `http://localhost:5173` → Muncul homepage
- [ ] API call works: Login/Register berfungsi

### Dari Laptop Lain:

- [ ] Ping server: `ping 192.168.1.60` → Reply received
- [ ] Access backend: `http://192.168.1.60:5000` → {"status":200,"message":"hello"}
- [ ] Access frontend: `http://192.168.1.60:5173` → Muncul homepage
- [ ] Login works: Bisa login dan akses data
- [ ] Booking works: Bisa membuat reservasi
- [ ] Image upload works: Bisa upload bukti transfer

---

## 🎯 Quick Commands

### Cek IP Current:

```bash
# Windows
ipconfig | findstr IPv4

# Linux/Mac
ip addr show | grep inet
```

### Test Koneksi Backend:

```bash
# Dari laptop lain
curl http://192.168.1.60:5000
# atau
curl http://192.168.1.60:5000/api/fields
```

### Test Port Terbuka:

```bash
# Windows
Test-NetConnection -ComputerName 192.168.1.60 -Port 5000

# Linux/Mac
nc -zv 192.168.1.60 5000
```

---

## 📝 Configuration Files

### 1. Frontend Environment

```env
# File: milanosport/.env
VITE_API_BASE_URL=http://192.168.1.60:5000/api
```

### 2. Backend Server

```javascript
// File: milanosport-backend/src/server.js
const port = process.env.PORT || 5000;
const host = "0.0.0.0"; // Important!

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
```

### 3. Backend Environment

```env
# File: milanosport-backend/.env
PORT=5000
MONGO_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
JWT_SECRET=...
```

---

## 🔄 Updating IP Address

Jika IP berubah (misalnya setelah restart router):

### Step 1: Cari IP Baru

```bash
ipconfig
# atau
ip addr show
```

### Step 2: Update .env

```env
# milanosport/.env
VITE_API_BASE_URL=http://[IP_BARU]:5000/api
```

### Step 3: Update server.js (optional)

```javascript
console.log(`Access from other devices: http://[IP_BARU]:${port}`);
```

### Step 4: Restart Services

```bash
# Stop semua (Ctrl+C)
# Start backend
cd milanosport-backend && npm start

# Start frontend (terminal baru)
cd milanosport && npm run dev
```

---

## 🌐 Production Deployment

Untuk deployment production (bukan development):

### Option 1: Same Network Production

```bash
# Build frontend
npm run build

# Serve dengan static server
npm install -g serve
serve -s dist -l 5173
```

### Option 2: Separate Server

- Deploy backend ke VPS (DigitalOcean, AWS, etc)
- Deploy frontend ke Vercel, Netlify, atau Nginx
- Update `.env` dengan domain production

---

## ✅ Status Checklist

- [x] Backend listen pada `0.0.0.0`
- [x] Frontend `.env` menggunakan IP network
- [x] CORS enabled untuk all origins
- [x] Server menampilkan network URL saat startup
- [ ] Firewall rules added (manual)
- [ ] Static IP configured (optional)
- [ ] Tested from other device (manual)

---

## 🎓 Best Practices

### Development:

1. ✅ Gunakan IP lokal (`192.168.x.x`)
2. ✅ CORS allow all untuk testing
3. ✅ Console log network URLs
4. ✅ Dokumentasi IP yang digunakan

### Production:

1. ⚠️ Gunakan domain name (bukan IP)
2. ⚠️ CORS restrict ke specific origins
3. ⚠️ Enable HTTPS (SSL/TLS)
4. ⚠️ Rate limiting & security headers
5. ⚠️ Environment variables yang aman

---

## 📞 Support

Jika masih ada masalah:

1. **Cek Terminal Output:**

   - Backend: Apakah ada error?
   - Frontend: Apakah build berhasil?

2. **Cek Browser Console:**

   - F12 → Console tab
   - Lihat error network/API

3. **Test dengan curl:**

   ```bash
   curl http://192.168.1.60:5000
   ```

4. **Cek firewall:**
   - Windows Defender
   - Antivirus third-party

---

**MilanoSport** - Ready untuk Multi-Device Access! 🎉
**Network Configuration** ✅ Complete

---
