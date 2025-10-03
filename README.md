# MilanoSport App

Aplikasi reservasi lapangan olahraga berbasis web menggunakan React dan TypeScript.

## Docker

Aplikasi ini tersedia sebagai Docker image di Docker Hub:
[username/milanosport:v1-UTS](https://hub.docker.com/r/username/milanosport)

### Menjalankan dengan Docker

1. Pull image dari Docker Hub:
```bash
docker pull username/milanosport:v1-UTS
```

2. Jalankan container:
```bash
docker run -d -p 80:80 username/milanosport:v1-UTS
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