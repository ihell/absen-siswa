const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Konfigurasi dotenv untuk memuat variabel lingkungan
dotenv.config();

const app = express();
const port = 3000;

// Menggunakan CORS untuk mengizinkan permintaan dari frontend
app.use(cors());

// Endpoint untuk menyajikan konfigurasi Firebase
app.get('/firebase-config', (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  });
});

// Menjalankan server pada port yang ditentukan
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
