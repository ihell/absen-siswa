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

const firebaseConfig = {
  apiKey: "AIzaSyB8g6kCR8laDnH1YCF9cYVy10lF1y7s2i0",
  authDomain: "bakwan-jagung.firebaseapp.com",
  projectId: "bakwan-jagung",
  storageBucket: "bakwan-jagung.appspot.com",
  messagingSenderId: "710653450064",
  appId: "1:710653450064:web:5cbf9ff4240922b03ffe55",
  measurementId: "G-VBHD7G08PJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

