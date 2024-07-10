import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Fungsi untuk mendapatkan konfigurasi Firebase dari server backend
async function getFirebaseConfig() {
  const response = await fetch('http://localhost:3000/firebase-config');
  return response.json();
}

// Inisialisasi Firebase dengan konfigurasi yang didapatkan dari backend
async function initializeFirebase() {
  const firebaseConfig = await getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
}

// Menjalankan fungsi inisialisasi Firebase dan menyimpan referensi Firestore
const db = await initializeFirebase();

// Fungsi untuk mengambil daftar absensi
export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "absen");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      kelamin: dok.data().kelamin,
      kelas: dok.data().kelas,
      keterangan: dok.data().keterangan,
      tanggal: dok.data().tanggal || ""
    });
  });

  return hasil;
}

// Fungsi untuk mengubah status absensi
export async function ubahStatusAbsensi(docId, keterangan, tanggal) {
  try {
    await updateDoc(doc(db, "absen", docId), {
      keterangan: keterangan,
      tanggal: tanggal
    });
    console.log('Status absensi berhasil diubah.');
  } catch (error) {
    console.error('Gagal mengubah status absensi: ', error);
  }
}

// Fungsi untuk menambah absensi baru
export async function tambahAbsensi(nama, kelamin, kelas) {
  try {
    const dokRef = await addDoc(collection(db, 'absen'), {
      nama: nama,
      kelamin: kelamin,
      kelas: kelas,
      keterangan: '',
      tanggal: ''
    });
    console.log('Berhasil menambah dokumen dengan ID: ', dokRef.id);
  } catch (error) {
    console.error('Gagal menambah dokumen: ', error);
  }
}
