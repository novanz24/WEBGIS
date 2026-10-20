// src/App.jsx
import React, { useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Import Data & Komponen
import { initialDatasets } from './data/sumberair';
import { Topography } from './components/reactbits/Topography';
import { Navbar } from './components/reactbits/Navbar';
import { MetricsGrid } from './components/reactbits/MetricsGrid';
import { MapView } from './components/reactbits/MapView';
import { Sidebar } from './components/reactbits/Sidebar';
import { TabelDataset } from './components/reactbits/TabelDataset';
import { DatasetModal } from './components/reactbits/DatasetModal';

try {
  if (mapboxgl && mapboxgl.setGlobalMapCacheSize) {
    mapboxgl.setGlobalMapCacheSize(100);
  }
} catch (e) {
  console.log("Caching optimization not supported", e);
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function App() {
  const mapRef = useRef(null);

  const [activeTab, setActiveTab] = useState('Ringkasan');
  const [datasetList] = useState(initialDatasets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

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
    <div className="relative min-h-screen bg-transparent text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      
      {/* 🌐 Background Topography Fixed di Layer Paling Bawah */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Topography 
          color="#10b981" 
          lineCount={30} 
          speed={0.25} 
          opacity={0.8} 
        />
      </div>

      {/* Konten Utama WebGIS */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navbar Fixed di Atas */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content dengan pt-24 agar tidak tertutup header fixed */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-6 space-y-6 flex-grow w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight drop-shadow-md">Dashboard Kemitir Tangguh</h1>
              <p className="text-xs text-slate-200 mt-0.5 font-medium">Sistem Informasi Geospasial • Native Mapbox 3D Architecture</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-emerald-500/90 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/30 transition transform hover:scale-105 border border-emerald-300/40 backdrop-blur-md"
            >
              + Tambah dataset
            </button>
          </div>

          {/* Metrics Grid */}
          <MetricsGrid />

          {/* Map & Sidebar */}
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${activeTab !== 'Ringkasan' ? 'hidden' : ''}`}>
            <div className="lg:col-span-2 liquid-glass rounded-2xl p-4 shadow-2xl flex flex-col">
              <MapView 
                mapRef={mapRef}
                MAPBOX_TOKEN={MAPBOX_TOKEN}
                mapStyle={mapStyle}
                setMapStyle={setMapStyle}
                showBatasDesa={showBatasDesa}
                setShowBatasDesa={setShowBatasDesa}
                showRisiko={showRisiko}
                setShowRisiko={setShowRisiko}
                showSumberAir={showSumberAir}
                setShowSumberAir={setShowSumberAir}
                showMapbox3D={showMapbox3D}
                setShowMapbox3D={setShowMapbox3D}
                selectedPoint={selectedPoint}
                setSelectedPoint={setSelectedPoint}
              />
            </div>
            <div className="liquid-glass rounded-2xl p-1 shadow-2xl">
              <Sidebar handleFlyTo={handleFlyTo} />
            </div>
          </div>

          {/* Tabel Dataset */}
          <div className="liquid-glass rounded-2xl p-5 shadow-2xl">
            <TabelDataset 
              filteredDatasets={filteredDatasets}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </main>
      </div>

      <DatasetModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}