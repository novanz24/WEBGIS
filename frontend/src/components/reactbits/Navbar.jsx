// src/components/reactbits/Navbar.jsx
import React from 'react';

// 1. Named Export (agar cocok dengan import { Navbar } di App.jsx)
export function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">W</div>
          <span className="font-bold text-xl tracking-tight text-slate-900">WebGIS Kemitir (Mapbox)</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
          <button 
            onClick={() => setActiveTab('Ringkasan')} 
            className={`font-semibold pb-1 ${activeTab === 'Ringkasan' ? 'border-b-2 border-emerald-500 text-slate-900' : 'hover:text-slate-900'}`}
          >
            Beranda
          </button>
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
  );
}

// 2. Default Export (sebagai cadangan pengaman modul Vite)
export default Navbar;