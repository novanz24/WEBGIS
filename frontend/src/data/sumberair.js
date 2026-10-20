// src/data/sumberair.js

export const defaultSumberAir = [
  { id: 1, nama: 'Mata Air Surodadi', jenis: 'Permanen', debit: '15 L/dtk', jarak: '320 m', lat: -7.2275, lng: 110.2680 },
  { id: 2, nama: 'Sumur Resapan RW 02', jenis: 'Musiman', debit: '5 L/dtk', jarak: '460 m', lat: -7.2262, lng: 110.2750 },
  { id: 3, nama: 'Embung Kemitir', jenis: 'Permanen', debit: '45 L/dtk', jarak: '1.2 km', lat: -7.2290, lng: 110.2850 }
];

export const initialDatasets = [
  { id: 1, nama: 'Batas Administrasi Kemitir (Presisi 130+ Node)', format: 'SHP • Boundary Line', kategori: 'Administrasi', pengelola: 'Tim GIS Geodesi', diperbarui: '19 Okt 2026', status: 'Success' },
  { id: 2, nama: 'Layer Bangunan 3D Mapbox', format: 'Mapbox Vector Tiles', kategori: 'Infrastruktur', pengelola: 'Mapbox API 3D', diperbarui: '19 Okt 2026', status: 'Success' },
  { id: 3, nama: 'Inventarisasi Sumber Air', format: 'GeoJSON • 3 Titik', kategori: 'Sumber Daya Air', pengelola: 'Tim Survei Air', diperbarui: '18 Okt 2026', status: 'Active' },
  { id: 4, nama: 'Peta Risiko Kekeringan Per RT', format: 'GeoJSON • 4 Zona', kategori: 'Kebencanaan', pengelola: 'Tim Informatika', diperbarui: '18 Okt 2026', status: 'Pending' }
];