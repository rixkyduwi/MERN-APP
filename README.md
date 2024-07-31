# MERN Stack Technical Test

## Deskripsi Proyek
Proyek ini adalah aplikasi web yang dibangun menggunakan MERN stack (MongoDB, Express.js, React, dan Node.js) yang memiliki fitur login/logout, CRUD data, dan pengiriman email otomatis.

## Fitur
1. **Login dan Logout**:
   - Pengguna dapat melakukan login dan logout.
   - Timestamp untuk login dan logout direkam di database.

2. **CRUD Data dan Pengiriman Email**:
   - Pengguna dapat membuat, membaca, memperbarui, dan menghapus data.
   - Saat data baru dibuat, email otomatis dikirim sesuai template yang diberikan.

## Teknologi yang Digunakan
- **MongoDB**: Database NoSQL untuk menyimpan data.
- **Express.js**: Framework untuk membuat server dan API.
- **React**: Library JavaScript untuk membangun antarmuka pengguna.
- **Node.js**: Runtime untuk menjalankan JavaScript di sisi server.
- **Nodemailer**: Modul untuk mengirim email dari Node.js.

## Instalasi dan Penggunaan

### 1. Clone Repository
Clone repository ini ke komputer Anda:
```bash
git clone https://github.com/rixkyduwi/MERN-APP.git
cd mern-app
```

### 2. Setup Backend
a. Instalasi Dependensi
Masuk ke direktori backend dan instal dependensi:

```bash
cd backend
npm install
```
b. Konfigurasi MongoDB
Pastikan MongoDB berjalan di komputer Anda. Jika menggunakan MongoDB lokal, jalankan perintah berikut di terminal:

```bash
mongod
```
c. Menjalankan Server
Jalankan server backend:

```bash
npm run start
```
Server akan berjalan di http://localhost:5000.

### 3. Setup Frontend
a. Instalasi Dependensi
Masuk ke direktori frontend dan instal dependensi:

```bash
cd frontend
npm install
```
b. Menjalankan Aplikasi React
Jalankan aplikasi React:

```bash
npm start
```
Aplikasi akan berjalan di http://localhost:3000.
## Struktur Direktori
mern-app/
├── backend/
│   ├── models/
│   │   └── Data.js
│   ├── routes/
│   │   └── data.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── config.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── setupProxy.js
├── .gitignore
├── README.md
└── package.json