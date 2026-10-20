// src/App.jsx
import React, { useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Import Data
import { initialDatasets } from './data/sumberair';

// Import Komponen Menggunakan Named Export (Kurung Kurawal)
import { Navbar } from './components/reactbits/Navbar';
import { MetricsGrid } from './components/reactbits/MetricsGrid';
import { MapView } from './components/reactbits/MapView';
import { Sidebar } from './components/reactbits/Sidebar';
import { TabelDataset } from './components/reactbits/TabelDataset';
import { DatasetModal } from './components/reactbits/DatasetModal';

// Optimasi Cache Mapbox
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

  // States
  const [activeTab, setActiveTab] = useState('Ringkasan');
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
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
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

        {/* 4 Metric Cards */}
        <MetricsGrid />

        {/* Map Viewport & Right Panel */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${activeTab !== 'Ringkasan' ? 'hidden' : ''}`}>
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
          <Sidebar handleFlyTo={handleFlyTo} />
        </div>

        {/* Tabel Dataset Spasial */}
        <TabelDataset 
          filteredDatasets={filteredDatasets}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </main>

      {/* Modal Tambah Dataset */}
      <DatasetModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}