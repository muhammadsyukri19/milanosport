# MilanoSport App

Aplikasi reservasi lapangan olahraga berbasis web menggunakan React, TypeScript dan Express.js.

## Arsitektur

Aplikasi ini terdiri dari:
- Frontend: React + TypeScript 
- Backend: Express.js
- Database: MongoDB

Dalam container Docker, aplikasi berjalan dengan:
- Nginx sebagai web server dan reverse proxy
- Frontend static files di-serve oleh Nginx
- Backend API berjalan menggunakan PM2
- Routing: 
  - `/` -> Frontend
  - `/api` -> Backend

## Docker

Aplikasi ini tersedia sebagai Docker image di Docker Hub:
[msyukri19/milanosport:v1-UTS](https://hub.docker.com/r/msyukri19/milanosport)

### Menjalankan dengan Docker

1. Pull image dari Docker Hub:
```bash
docker pull msyukri19/milanosport:v1-UTS
```

2. Setup environment variables (opsional):
```bash
# Backend MongoDB URI
MONGODB_URI=mongodb://host:port/database

# JWT Secret
JWT_SECRET=your_jwt_secret
```

3. Jalankan container:
```bash
docker run -d \
  -p 80:80 \
  -e MONGODB_URI=mongodb://host:port/database \
  -e JWT_SECRET=your_jwt_secret \
  msyukri19/milanosport:v1-UTS
```

3. Buka aplikasi di browser:
```
http://localhost
```

### Build Image Lokal

Jika ingin build image secara lokal:

1. Clone repository:
```bash
git clone https://github.com/muhammadsyukri19/milanosport.git
cd milanosport
```

2. Build image:
```bash
docker build -t milanosport-app .
```

3. Jalankan container:
```bash
docker run -d -p 80:80 milanosport-app
```

## Development

### Prerequisites

- Node.js 18 atau lebih tinggi
- npm 8 atau lebih tinggi

### Setup Development

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Build untuk production:
```bash
npm run build
```