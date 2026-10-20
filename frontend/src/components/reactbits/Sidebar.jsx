// src/components/reactbits/Sidebar.jsx
import React from 'react';

// 1. Named Export (agar cocok dengan import { Sidebar } di App.jsx)
export function Sidebar({ handleFlyTo }) {
  return (
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
  );
}

// 2. Default Export (sebagai cadangan pengaman modul Vite)
export default Sidebar;