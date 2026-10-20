// frontend/src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import Map, { Source, Layer, Marker, Popup, NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl'; // Import mapbox-gl untuk caching
import 'mapbox-gl/dist/mapbox-gl.css';

// 🔑 GANTI DENGAN TOKEN ASLI ANDA (Dimulai dengan 'pk.eyJ...')
const MAPBOX_TOKEN = 'pk.eyJ1Ijoibm92YW56YTI0IiwiYSI6ImNtdmduZHg2MjAzankyd3F1NGp4dndkcWIifQ.LR4fEJF19FoimH6Uokkt-w'; 

// --- OPTIMASI CACHING MAPBOX (MENGHEMAT API KEY) ---
// Meningkatkan batas cache penyimpanan tile di browser agar tidak download ulang
try {
  if (mapboxgl && mapboxgl.setGlobalMapCacheSize) {
    mapboxgl.setGlobalMapCacheSize(100); // Simpan lebih banyak tile di memori
  }
} catch (e) {
  console.log("Caching optimization not supported", e);
}

// 1. DATA POLIGON BATAS DESA KEMITIR (130+ TITIK KOORDINAT PRESISI ASLI)
const geoWilayahKemitir = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { nama_dusun: 'Wilayah Desa Kemitir', label: 'Batas Resmi Kemitir' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [110.273464, -7.214050], [110.272536, -7.216307], [110.271415, -7.216764],
          [110.271098, -7.216562], [110.271013, -7.216317], [110.270868, -7.216184],
          [110.270637, -7.216083], [110.270117, -7.216072], [110.269827, -7.216253],
          [110.269513, -7.216551], [110.268977, -7.216770], [110.268312, -7.216738],
          [110.268312, -7.216733], [110.266556, -7.217669], [110.266537, -7.218105],
          [110.266398, -7.218217], [110.266344, -7.218454], [110.266403, -7.218637],
          [110.266476, -7.218658], [110.266403, -7.218840], [110.265983, -7.218969],
          [110.265744, -7.219080], [110.265350, -7.219305], [110.265066, -7.219582],
          [110.264787, -7.219881], [110.264881, -7.220325], [110.264793, -7.220646],
          [110.264734, -7.220923], [110.264606, -7.221641], [110.264591, -7.221801],
          [110.264530, -7.221970], [110.264491, -7.222161], [110.264493, -7.222317],
          [110.264422, -7.222477], [110.264413, -7.222601], [110.264349, -7.222812],
          [110.264331, -7.223081], [110.264334, -7.223178], [110.264302, -7.223268],
          [110.264202, -7.223678], [110.264216, -7.223871], [110.264111, -7.223870],
          [110.264092, -7.223907], [110.264120, -7.224313], [110.264011, -7.224468],
          [110.264063, -7.224622], [110.264159, -7.224820], [110.264137, -7.225225],
          [110.264365, -7.225311], [110.264569, -7.225289], [110.264785, -7.225236],
          [110.264752, -7.225422], [110.264691, -7.225665], [110.264877, -7.225914],
          [110.265310, -7.226519], [110.265555, -7.226761], [110.265892, -7.227836],
          [110.266134, -7.228061], [110.266339, -7.228759], [110.266577, -7.229430],
          [110.266883, -7.229841], [110.267137, -7.230336], [110.267285, -7.230913],
          [110.267009, -7.231348], [110.266751, -7.231590], [110.266696, -7.231986],
          [110.266690, -7.232303], [110.266900, -7.232745], [110.267161, -7.232992],
          [110.267572, -7.233173], [110.268283, -7.233029], [110.268585, -7.233191],
          [110.268937, -7.233602], [110.269120, -7.233603], [110.269431, -7.233688],
          [110.269685, -7.233771], [110.269870, -7.233855], [110.270019, -7.233946],
          [110.270102, -7.234050], [110.270134, -7.234117], [110.270488, -7.234197],
          [110.270871, -7.234318], [110.271621, -7.234802], [110.271755, -7.234198],
          [110.272315, -7.233984], [110.272688, -7.233376], [110.274162, -7.233066],
          [110.275790, -7.232425], [110.276888, -7.231765], [110.278650, -7.231522],
          [110.278845, -7.230912], [110.279398, -7.230131], [110.283041, -7.229927],
          [110.284137, -7.229568], [110.284954, -7.229510], [110.284972, -7.229522],
          [110.286237, -7.230326], [110.287124, -7.230631], [110.287937, -7.230529],
          [110.289200, -7.229920], [110.289391, -7.229921], [110.289584, -7.229863],
          [110.291358, -7.230215], [110.291997, -7.230632], [110.292432, -7.231224],
          [110.292627, -7.231436], [110.292775, -7.231658], [110.293086, -7.231801],
          [110.294836, -7.232936], [110.295414, -7.232940], [110.296947, -7.232361],
          [110.296990, -7.232326], [110.296990, -7.231797], [110.296940, -7.231623],
          [110.296513, -7.231030], [110.294895, -7.229758], [110.294268, -7.229008],
          [110.293326, -7.228167], [110.292434, -7.227545], [110.291433, -7.226951],
          [110.291082, -7.226820], [110.289850, -7.226360], [110.288638, -7.225804],
          [110.288002, -7.225384], [110.287479, -7.224576], [110.287332, -7.224258],
          [110.287525, -7.223691], [110.288442, -7.223026], [110.288441, -7.222750],
          [110.288487, -7.222228], [110.289213, -7.221584], [110.288990, -7.220461],
          [110.286430, -7.219258], [110.283429, -7.218006], [110.282665, -7.218165],
          [110.282375, -7.218173], [110.280884, -7.218006], [110.278130, -7.216142],
          [110.277025, -7.215884], [110.276172, -7.215720], [110.275797, -7.215350],
          [110.275306, -7.214890], [110.273477, -7.214053], [110.273464, -7.214050]
        ]]
      }
    }
  ]
};

// 2. LAYER CONFIGURATION: BANGUNAN 3D NATIVE MAPBOX
const mapbox3DBuildingLayer = {
  id: '3d-buildings',
  source: 'composite',
  'source-layer': 'building',
  filter: ['==', 'extrude', 'true'],
  type: 'fill-extrusion',
  minzoom: 14,
  paint: {
    'fill-extrusion-color': [
      'interpolate', ['linear'], ['get', 'height'],
      0, '#e2e8f0', 10, '#cbd5e1', 20, '#94a3b8', 50, '#3b82f6'
    ],
    'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 14, 0, 14.05, ['get', 'height']],
    'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 14, 0, 14.05, ['get', 'min_height']],
    'fill-extrusion-opacity': 0.85
  }
};

// 3. TITIK SUMBER AIR
const defaultSumberAir = [
  { id: 1, nama: 'Mata Air Surodadi', jenis: 'Permanen', debit: '15 L/dtk', jarak: '320 m', lat: -7.2275, lng: 110.2680 },
  { id: 2, nama: 'Sumur Resapan RW 02', jenis: 'Musiman', debit: '5 L/dtk', jarak: '460 m', lat: -7.2262, lng: 110.2750 },
  { id: 3, nama: 'Embung Kemitir', jenis: 'Permanen', debit: '45 L/dtk', jarak: '1.2 km', lat: -7.2290, lng: 110.2850 }
];

const initialDatasets = [
  { id: 1, nama: 'Batas Administrasi Kemitir (Presisi 130+ Node)', format: 'SHP • Boundary Line', kategori: 'Administrasi', pengelola: 'Tim GIS Geodesi', diperbarui: '19 Okt 2026', status: 'Success' },
  { id: 2, nama: 'Layer Bangunan 3D Mapbox', format: 'Mapbox Vector Tiles', kategori: 'Infrastruktur', pengelola: 'Mapbox API 3D', diperbarui: '19 Okt 2026', status: 'Success' },
  { id: 3, nama: 'Inventarisasi Sumber Air', format: 'GeoJSON • 3 Titik', kategori: 'Sumber Daya Air', pengelola: 'Tim Survei Air', diperbarui: '18 Okt 2026', status: 'Active' },
  { id: 4, nama: 'Peta Risiko Kekeringan Per RT', format: 'GeoJSON • 4 Zona', kategori: 'Kebencanaan', pengelola: 'Tim Informatika', diperbarui: '18 Okt 2026', status: 'Pending' }
];

export default function App() {
  const mapRef = useRef(null);

  // States
  const [activeTab, setActiveTab] = useState('Ringkasan'); // Saat tab berubah, map tidak di-unmount
  const [datasetList] = useState(initialDatasets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Map Controls State
  const [showBatasDesa, setShowBatasDesa] = useState(true);
  const [showRisiko, setShowRisiko] = useState(true);
  const [showSumberAir, setShowSumberAir] = useState(true);
  const [showMapbox3D, setShowMapbox3D] = useState(true);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/satellite-streets-v12');

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFlyTo = (lat, lng, zoom = 16.5) => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lng, lat], zoom, pitch: 60, duration: 2000 });
    }
  };

  const filteredDatasets = datasetList.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">W</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">WebGIS Kemitir (Mapbox)</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <button onClick={() => setActiveTab('Ringkasan')} className={`font-semibold pb-1 ${activeTab === 'Ringkasan' ? 'border-b-2 border-emerald-500 text-slate-900' : 'hover:text-slate-900'}`}>Beranda</button>
            <a href="#berita" className="hover:text-slate-900 transition">Berita</a>
            <a href="#tentang" className="hover:text-slate-900 transition">Tentang</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 border-r border-slate-200 pr-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs border border-emerald-300">AD</div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight">Admin Desa Kemitir</p>
              <p className="text-[10px] text-slate-400">Mapbox 3D Optimized</p>
            </div>
          </div>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm">Logout</button>
        </div>
      </header>

      {/* 2. MAIN DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Kemitir Tangguh</h1>
            <p className="text-xs text-slate-500 mt-0.5">Sistem Informasi Geospasial • Native Mapbox 3D Architecture</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm">
            + Tambah dataset
          </button>
        </div>

        {/* 4 METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500">Total dataset spasial</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">128</h3>
              <p className="text-[11px] font-semibold text-emerald-600 mt-1">▲ +12 dataset baru</p>
            </div>
            <span className="p-2 bg-slate-100 rounded-lg text-slate-600 text-sm">🗂️</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500">Wilayah terpetakan</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">24 RT</h3>
              <p className="text-[11px] font-semibold text-emerald-600 mt-1">● 100% cakupan Desa Kemitir</p>
            </div>
            <span className="p-2 bg-slate-100 rounded-lg text-slate-600 text-sm">🗺️</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500">Permohonan data</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">18</h3>
              <p className="text-[11px] font-semibold text-amber-600 mt-1">● 6 laporan warga baru</p>
            </div>
            <span className="p-2 bg-slate-100 rounded-lg text-slate-600 text-sm">📄</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500">Partisipasi Warga</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">1.284</h3>
              <p className="text-[11px] font-semibold text-emerald-600 mt-1">▲ +8.2% minggu ini</p>
            </div>
            <span className="p-2 bg-slate-100 rounded-lg text-slate-600 text-sm">👥</span>
          </div>
        </div>

        {/* 5. MAP VIEWPORT & RIGHT PANEL */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${activeTab !== 'Ringkasan' ? 'hidden' : ''}`}>
          
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-2 border-b border-slate-100 gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900">Sebaran Data Spasial & Mapbox 3D</h2>
                <p className="text-xs text-slate-500">Node Batas Akurat 130+ Titik • Mapbox Access Token Integrated</p>
              </div>
              <button
                onClick={() => setMapStyle(mapStyle.includes('satellite') ? 'mapbox://styles/mapbox/streets-v12' : 'mapbox://styles/mapbox/satellite-streets-v12')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
              >
                {mapStyle.includes('satellite') ? '🗺️ Style Vektor' : '🛰️ Style Satelit'}
              </button>
            </div>

            <div className="h-[460px] w-full relative rounded-xl overflow-hidden border border-slate-200">
              <Map
                ref={mapRef}
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{ longitude: 110.2780, latitude: -7.2270, zoom: 14.8, pitch: 60, bearing: -15 }}
                style={{ width: '100%', height: '100%' }}
                mapStyle={mapStyle}
                terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
                preserveDrawingBuffer={true} // Membantu caching performa canvas
              >
                <NavigationControl position="bottom-right" />

                <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />

                {/* Poligon Batas Desa (130+ node) */}
                <Source id="wilayah-src" type="geojson" data={geoWilayahKemitir}>
                  <Layer id="risk-fill" type="fill" layout={{ visibility: showRisiko ? 'visible' : 'none' }} paint={{ 'fill-color': '#eab308', 'fill-opacity': 0.30 }} />
                  <Layer id="red-dashed-boundary" type="line" layout={{ visibility: showBatasDesa ? 'visible' : 'none' }} paint={{ 'line-color': '#ef4444', 'line-width': 3, 'line-dasharray': [3, 2] }} />
                </Source>

                {/* NATIVE MAPBOX 3D BUILDINGS */}
                {showMapbox3D && <Layer {...mapbox3DBuildingLayer} />}

                {/* Titik Air */}
                {showSumberAir && defaultSumberAir.map((item) => (
                  <Marker key={item.id} longitude={item.lng} latitude={item.lat} onClick={(e) => { e.originalEvent.stopPropagation(); setSelectedPoint(item); }}>
                    <div className="w-7 h-7 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-125 transition-transform">
                      <span className="text-xs">💧</span>
                    </div>
                  </Marker>
                ))}

                {/* Popup Titik Air */}
                {selectedPoint && (
                  <Popup longitude={selectedPoint.lng} latitude={selectedPoint.lat} onClose={() => setSelectedPoint(null)} closeButton={true}>
                    <div className="p-1 min-w-[130px]">
                      <h4 className="font-bold text-xs text-slate-900 mb-0.5">{selectedPoint.nama}</h4>
                      <p className="text-[11px] text-slate-600">Debit: {selectedPoint.debit}</p>
                      <p className="text-[11px] text-blue-600 font-bold mt-1">Jarak: {selectedPoint.jarak}</p>
                    </div>
                  </Popup>
                )}
              </Map>

              {/* FLOATING CONTROLS IN MAP */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-md text-xs space-y-1.5 z-10 w-52">
                <p className="font-bold text-[11px] text-slate-700 uppercase tracking-wider mb-1">Layer Toggle Peta</p>
                <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={showBatasDesa} onChange={(e) => setShowBatasDesa(e.target.checked)} className="rounded text-red-600 focus:ring-0" />
                  <span className="text-[11px] font-semibold">Garis Batas Merah Desa</span>
                </label>
                <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={showRisiko} onChange={(e) => setShowRisiko(e.target.checked)} className="rounded text-amber-600 focus:ring-0" />
                  <span className="text-[11px]">Area Wilayah Desa</span>
                </label>
                <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={showSumberAir} onChange={(e) => setShowSumberAir(e.target.checked)} className="rounded text-blue-600 focus:ring-0" />
                  <span className="text-[11px]">Titik Sumber Air</span>
                </label>
                <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={showMapbox3D} onChange={(e) => setShowMapbox3D(e.target.checked)} className="rounded text-purple-600 focus:ring-0" />
                  <span className="text-[11px] font-bold text-purple-700">Native Mapbox 3D Layer</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE PANEL FIGMA */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">Status Dataset Spasial</h2>
                <span className="text-slate-400">•••</span>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-slate-900">128</span>
                  <span className="text-xs text-slate-500">dataset terdaftar</span>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex my-4">
                  <div className="bg-emerald-500 h-full w-[75%]"></div>
                  <div className="bg-amber-400 h-full w-[14%]"></div>
                  <div className="bg-red-500 h-full w-[11%]"></div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Terpublikasi</span>
                    <span className="font-bold text-slate-900">96 • 75%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Menunggu tinjauan</span>
                    <span className="font-bold text-slate-900">18 • 14%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK FLYTO PINTASAN */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-800 mb-2">Pintasan Lokasi Kemitir</p>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-xs">
                <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition border border-slate-100">
                  <div><p className="font-bold text-slate-800">Dusun Ngoho</p><p className="text-[10px] text-slate-400">Area Barat</p></div>
                  <button onClick={() => handleFlyTo(-7.2280, 110.2672)} className="px-2 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded text-[10px] font-bold transition">Terbang ➔</button>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition border border-slate-100">
                  <div><p className="font-bold text-slate-800">Sukorini Foggy Village</p><p className="text-[10px] text-slate-400">Area Tengah</p></div>
                  <button onClick={() => handleFlyTo(-7.2255, 110.2748)} className="px-2 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded text-[10px] font-bold transition">Terbang ➔</button>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition border border-slate-100">
                  <div><p className="font-bold text-slate-800">Lapangan Kemitir</p><p className="text-[10px] text-slate-400">Area Timur</p></div>
                  <button onClick={() => handleFlyTo(-7.2272, 110.2810)} className="px-2 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded text-[10px] font-bold transition">Terbang ➔</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. TABEL DATASET SPASIAL BOTTOM */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-bold text-slate-900">Dataset Spasial Terbaru</h2>
            <div className="flex flex-wrap items-center gap-2">
              <input type="text" placeholder="Cari dataset..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs px-3 py-1.5 rounded-lg focus:outline-none w-48" />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs px-3 py-1.5 rounded-lg focus:outline-none font-medium">
                <option value="Semua">Semua kategori</option>
                <option value="Administrasi">Administrasi</option>
                <option value="Kebencanaan">Kebencanaan</option>
                <option value="Sumber Daya Air">Sumber Daya Air</option>
                <option value="Infrastruktur">Infrastruktur</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Nama Dataset</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Pengelola</th>
                  <th className="py-3 px-4">Diperbarui</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredDatasets.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-900"><div>{item.nama}<p className="text-[10px] font-normal text-slate-400">{item.format}</p></div></td>
                    <td className="py-3 px-4">{item.kategori}</td>
                    <td className="py-3 px-4 text-slate-500">{item.pengelola}</td>
                    <td className="py-3 px-4 text-slate-500">{item.diperbarui}</td>
                    <td className="py-3 px-4">
                      {item.status === 'Success' && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md font-bold text-[10px]">Success</span>}
                      {item.status === 'Active' && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md font-bold text-[10px]">Active</span>}
                      {item.status === 'Pending' && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md font-bold text-[10px]">Pending</span>}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-emerald-600 hover:text-emerald-800 font-bold text-xs">Lihat detail ➔</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* 7. MODAL FORM TAMBAH DATASET */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 font-bold hover:text-slate-800">✕</button>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Tambah Dataset / Lapor Kondisi</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Dataset/Laporan berhasil dikirim!"); setIsModalOpen(false); }} className="space-y-3 text-xs mt-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Nama Dataset / Lokasi</label>
                <input type="text" required placeholder="Contoh: Titik Air RW 02 Desa Kemitir" className="w-full border border-slate-300 rounded-lg p-2 text-xs" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-lg transition mt-2">Simpan & Unggah Dataset</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}