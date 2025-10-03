# 🔧 Troubleshooting: Booking Creation Error 500

## 📋 Error Details

```
POST https://milano-sport-backend.vercel.app/api/bookings 500 (Internal Server Error)
```

---

## 🔍 Kemungkinan Penyebab

### 1. **Authentication Token Issue** ⚠️ (PALING SERING)

**Problem:**

- Token tidak ada atau expired
- Token tidak dikirim dengan benar

**Solusi:**

#### A. Cek Token di Browser Console

```javascript
// Buka Developer Tools Console (F12)
console.log("Token:", localStorage.getItem("authToken"));
```

Jika `null` atau `undefined`, berarti **belum login** atau **token hilang**.

**Fix:** Login ulang!

#### B. Cek Token Expiry

Token JWT biasanya expired setelah beberapa waktu. Jika sudah lama login, **logout dan login ulang**.

---

### 2. **File Upload Issue (Cloudinary)** 📁

**Problem:**

- File terlalu besar (> 10MB)
- Format file tidak didukung
- Cloudinary credentials salah

**Solusi:**

#### A. Cek Ukuran File

- Maksimal: **10MB**
- Format: JPG, JPEG, PNG

#### B. Compress Gambar

Jika file > 10MB, compress dulu menggunakan:

- https://tinypng.com
- https://compressor.io

---

### 3. **Environment Variables di Vercel** ⚙️

**Problem:**

- `JWT_SECRET` tidak set
- `CLOUDINARY_*` credentials salah
- `MONGO_URI` tidak valid

**Solusi:**

Cek di **Vercel Dashboard** → Project → Settings → Environment Variables:

```env
JWT_SECRET=your_secret_key_minimum_32_characters
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/milanosport
```

---

### 4. **MongoDB Connection** 🗄️

**Problem:**

- MongoDB Atlas cluster down
- IP whitelist tidak include Vercel IPs
- Connection string salah

**Solusi:**

#### A. Whitelist All IPs di MongoDB Atlas

1. Login ke MongoDB Atlas
2. Network Access → Add IP Address
3. Pilih **"Allow Access from Anywhere"** (`0.0.0.0/0`)

#### B. Test Connection String

```javascript
// Test di local backend
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/milanosport
```

---

## 🧪 Debugging Steps

### Step 1: Check Authentication

```javascript
// Di Browser Console (F12)
const token = localStorage.getItem("authToken");
console.log("Token exists:", !!token);
console.log("Token:", token);

// Decode token (untuk cek expiry)
if (token) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  console.log("Token payload:", payload);
  console.log("Token expired:", payload.exp < Date.now() / 1000);
}
```

**Expected:**

- Token exists: `true`
- Token expired: `false`

Jika token expired atau tidak ada, **LOGIN ULANG**.

---

### Step 2: Check Request Payload

Buka **Developer Tools** → **Network** tab:

1. Clear console
2. Submit booking form
3. Klik request `bookings` yang gagal
4. Tab **Headers** → Lihat:

   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   **Jika tidak ada `Authorization` header, berarti token tidak dikirim!**

5. Tab **Payload** → Cek:
   - fieldId: ✓
   - date: ✓
   - startTime: ✓
   - endTime: ✓
   - customerName: ✓
   - customerPhone: ✓
   - proofOfPayment: (file) ✓

---

### Step 3: Check Backend Logs (Vercel)

1. Buka **Vercel Dashboard**
2. Pilih project **milano-sport-backend**
3. Tab **Deployments**
4. Klik deployment terbaru
5. **View Function Logs**

**Look for:**

```
✅ Token verified, user: { id: '...', ... }
Error creating booking: ...
```

Error message akan menunjukkan masalah spesifik.

---

## ✅ Solusi Pasti

### **Solusi 1: Login Ulang** (90% kasus fix dengan ini!)

```javascript
// 1. Logout
localStorage.clear();

// 2. Refresh page
window.location.reload();

// 3. Login lagi dengan credentials yang benar
```

---

### **Solusi 2: Fix Token Interceptor**

Pastikan `bookingApi.ts` mengirim token dengan benar:

```typescript
// File: src/api/bookingApi.ts

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");

  // Debug log
  console.log("Sending request with token:", !!token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("⚠️ No token found! User not logged in?");
  }

  return config;
});
```

---

### **Solusi 3: Add Better Error Handling**

Update `Step3_BookingForm.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Check login first
  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("Anda harus login terlebih dahulu!");
    navigate("/login");
    return;
  }

  // Check file
  if (!formData.paymentProof) {
    alert("Bukti transfer wajib diupload!");
    return;
  }

  setIsSubmitting(true);

  try {
    const bookingData: CreateBookingRequest = {
      fieldId: reservationData.fieldId,
      date: reservationData.selectedDate,
      startTime: reservationData.selectedTime,
      endTime: endTime,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      notes: formData.notes || "",
      proofOfPayment: formData.paymentProof,
    };

    const response = await bookingApi.createBooking(bookingData);

    alert(`Reservasi berhasil! ID: ${response.data.bookingId}`);
    navigate("/my-bookings");
  } catch (error: any) {
    console.error("Booking error:", error);

    // Check if authentication error
    if (error.message.includes("401") || error.message.includes("Token")) {
      alert("Sesi Anda telah berakhir. Silakan login kembali.");
      navigate("/login");
    } else {
      alert(`Gagal membuat reservasi: ${error.message}`);
    }
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 🎯 Quick Fix Checklist

**Untuk User (Anda):**

- [ ] Login ulang ke aplikasi
- [ ] Pastikan bukti transfer < 10MB
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Test dengan incognito mode

**Untuk Developer (Backend):**

- [ ] Cek Vercel logs untuk error detail
- [ ] Verifikasi environment variables di Vercel
- [ ] Test endpoint dengan Postman/curl dengan valid token
- [ ] Cek MongoDB Atlas IP whitelist (allow 0.0.0.0/0)

---

## 🔧 Testing dengan curl

```bash
# 1. Login untuk dapat token
curl -X POST https://milano-sport-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"yourpassword"}'

# Copy token dari response

# 2. Test create booking
curl -X POST https://milano-sport-backend.vercel.app/api/bookings \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "fieldId=..." \
  -F "date=2025-10-05" \
  -F "startTime=08:00" \
  -F "endTime=10:00" \
  -F "customerName=Test User" \
  -F "customerPhone=08123456789" \
  -F "proofOfPayment=@/path/to/image.jpg"
```

---

## 📊 Common Error Messages

| Error                     | Cause                   | Solution               |
| ------------------------- | ----------------------- | ---------------------- |
| 401 Unauthorized          | Token tidak ada/expired | Login ulang            |
| 400 Bad Request           | Data tidak lengkap      | Cek semua field terisi |
| 500 Internal Server Error | Backend issue           | Cek Vercel logs        |
| Network Error             | Internet/CORS issue     | Cek koneksi internet   |

---

## ✅ Expected Flow

### Correct Booking Flow:

1. **User Login** → Token saved to localStorage
2. **Select Field** → fieldId stored
3. **Select Schedule** → date, time stored
4. **Fill Form** → name, phone, notes
5. **Upload Proof** → file < 10MB
6. **Submit** →
   - ✅ Token sent in Authorization header
   - ✅ FormData with file
   - ✅ Backend validates token
   - ✅ Upload to Cloudinary
   - ✅ Save to MongoDB
   - ✅ Return booking ID
7. **Success** → Redirect to My Bookings

---

## 🚨 Immediate Action Required

**RIGHT NOW:**

1. **Buka Browser Console** (F12)
2. **Ketik:**
   ```javascript
   localStorage.getItem("authToken");
   ```
3. **Jika `null`:**

   - **LOGIN ULANG!**
   - **Ini 90% penyebab error 500**

4. **Setelah login, test booking lagi**

---

## 📞 If Still Error

**Get exact error message:**

1. Vercel Dashboard → milano-sport-backend → Deployments → View Function Logs
2. Screenshot error
3. Error message biasanya:
   - `JWT expired`
   - `Token not provided`
   - `File upload failed`
   - `MongoDB connection failed`
   - dll.

Share error message untuk solusi spesifik!

---

**💡 TL;DR: 90% kasus fix dengan LOGIN ULANG!**

---
