// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint Wilayah Desa (Poligon Organik Kemitir)
app.get('/api/wilayah', (req, res) => {
  res.json({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature', properties: { nama_dusun: 'Dusun Krajan', tingkat_risiko: 3, label_risiko: 'Sangat Tinggi' },
        geometry: { type: 'Polygon', coordinates: [[[110.352, -7.225], [110.358, -7.222], [110.365, -7.223], [110.371, -7.228], [110.373, -7.234], [110.368, -7.239], [110.360, -7.238], [110.354, -7.233], [110.352, -7.225]]] }
      },
      {
        type: 'Feature', properties: { nama_dusun: 'Dusun Ngobo', tingkat_risiko: 2, label_risiko: 'Sedang' },
        geometry: { type: 'Polygon', coordinates: [[[110.358, -7.222], [110.362, -7.215], [110.370, -7.214], [110.376, -7.219], [110.371, -7.228], [110.365, -7.223], [110.358, -7.222]]] }
      },
      {
        type: 'Feature', properties: { nama_dusun: 'Dusun Sumbermulyo', tingkat_risiko: 1, label_risiko: 'Rendah' },
        geometry: { type: 'Polygon', coordinates: [[[110.354, -7.233], [110.360, -7.238], [110.368, -7.239], [110.364, -7.245], [110.355, -7.246], [110.350, -7.240], [110.354, -7.233]]] }
      }
    ]
  });
});

// Endpoint Fasilitas Umum / Bangunan 3D
app.get('/api/bangunan', (req, res) => {
  res.json({
    type: 'FeatureCollection',
    features: [
      // Masjid Ngoho (RT 01/04 & RT 03/04) - Ekstrusi Tinggi (12m)
      {
        type: 'Feature', properties: { nama: 'Masjid Ngoho', jenis: 'Ibadah', rt_rw: 'RT 01/04', height: 12, color: '#facc15' },
        geometry: { type: 'Polygon', coordinates: [[[110.3600, -7.2160], [110.3602, -7.2160], [110.3602, -7.2162], [110.3600, -7.2162], [110.3600, -7.2160]]] }
      },
      // Musholla/Masjid (RT 03/03 & RT 04/04)
      {
        type: 'Feature', properties: { nama: 'Musholla RT 03/03', jenis: 'Ibadah', rt_rw: 'RT 03/03', height: 8, color: '#facc15' },
        geometry: { type: 'Polygon', coordinates: [[[110.3580, -7.2240], [110.3581, -7.2240], [110.3581, -7.2241], [110.3580, -7.2241], [110.3580, -7.2240]]] }
      },
      // Mushola (RT 01/03)
      {
        type: 'Feature', properties: { nama: 'Mushola RT 01/03', jenis: 'Ibadah', rt_rw: 'RT 01/03', height: 8, color: '#facc15' },
        geometry: { type: 'Polygon', coordinates: [[[110.3630, -7.2260], [110.3631, -7.2260], [110.3631, -7.2261], [110.3630, -7.2261], [110.3630, -7.2260]]] }
      },
      // SDN Kemitir 02 & TK Kemitir (RT 02/03) - Sekolah (10m)
      {
        type: 'Feature', properties: { nama: 'SDN Kemitir 02', jenis: 'Pendidikan', rt_rw: 'RT 02/03', height: 10, color: '#60a5fa' },
        geometry: { type: 'Polygon', coordinates: [[[110.3650, -7.2250], [110.3654, -7.2250], [110.3654, -7.2252], [110.3650, -7.2252], [110.3650, -7.2250]]] }
      },
      {
        type: 'Feature', properties: { nama: 'TK Kemitir', jenis: 'Pendidikan', rt_rw: 'RT 02/03', height: 6, color: '#60a5fa' },
        geometry: { type: 'Polygon', coordinates: [[[110.3655, -7.2250], [110.3657, -7.2250], [110.3657, -7.2251], [110.3655, -7.2251], [110.3655, -7.2250]]] }
      },
      // Lapangan Voli Ngoho (RT 02/03) - (Tinggi sangat rendah, hanya batas lap)
      {
        type: 'Feature', properties: { nama: 'Lap. Voli Ngoho', jenis: 'Fasum', rt_rw: 'RT 02/03', height: 0.5, color: '#4ade80' },
        geometry: { type: 'Polygon', coordinates: [[[110.3660, -7.2250], [110.3663, -7.2250], [110.3663, -7.2253], [110.3660, -7.2253], [110.3660, -7.2250]]] }
      },
      // Masjid, Lap. Bola, Lap. Voli (RT 01/02 & RT 03/02)
      {
        type: 'Feature', properties: { nama: 'Masjid RT 01/02', jenis: 'Ibadah', rt_rw: 'RT 01/02', height: 12, color: '#facc15' },
        geometry: { type: 'Polygon', coordinates: [[[110.3550, -7.2300], [110.3552, -7.2300], [110.3552, -7.2302], [110.3550, -7.2302], [110.3550, -7.2300]]] }
      },
      {
        type: 'Feature', properties: { nama: 'Lapangan Bola Kemitir', jenis: 'Fasum', rt_rw: 'RT 03/02', height: 0.5, color: '#4ade80' },
        geometry: { type: 'Polygon', coordinates: [[[110.3560, -7.2310], [110.3570, -7.2310], [110.3570, -7.2325], [110.3560, -7.2325], [110.3560, -7.2310]]] }
      }
    ]
  });
});

// Endpoint Titik Sumber Air
app.get('/api/sumber-air', (req, res) => {
  res.json([
    { id: 1, nama: 'Mata Air Surodadi', jenis: 'Permanen', debit: '15 L/dtk', jarak: '320 m', lat: -7.226, lng: 110.361 },
    { id: 2, nama: 'Sumur Resapan', jenis: 'Musiman', debit: '5 L/dtk', jarak: '460 m', lat: -7.220, lng: 110.366 },
    { id: 3, nama: 'Embung Kemitir', jenis: 'Permanen', debit: '45 L/dtk', jarak: '1.2 km', lat: -7.241, lng: 110.358 }
  ]);
});

app.listen(5000, () => console.log(`API Backend aktif di port 5000`));