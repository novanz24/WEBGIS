// src/components/reactbits/Sidebar.jsx
import React from 'react';

export function Sidebar({ handleFlyTo }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-2xl flex flex-col justify-between text-slate-200">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h2 className="text-base font-bold text-white tracking-tight">Status Dataset Spasial</h2>
          <span className="text-slate-400">•••</span>
        </div>

        <div className="mt-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">128</span>
            <span className="text-xs text-slate-400">dataset terdaftar</span>
          </div>

          <div className="w-full bg-slate-900/60 h-2.5 rounded-full overflow-hidden flex my-4 border border-white/5">
            <div className="bg-emerald-500 h-full w-[75%]"></div>
            <div className="bg-amber-400 h-full w-[14%]"></div>
            <div className="bg-red-500 h-full w-[11%]"></div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Terpublikasi</span>
              <span className="font-bold text-emerald-400">96 • 75%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Menunggu tinjauan</span>
              <span className="font-bold text-amber-400">18 • 14%</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK FLYTO PINTASAN */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-xs font-bold text-white mb-2.5 tracking-wide">Pintasan Lokasi Kemitir</p>
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-slate-900/40 hover:bg-slate-900/60 rounded-xl transition border border-white/5">
            <div>
              <p className="font-bold text-white">Dusun Ngoho</p>
              <p className="text-[10px] text-slate-400">Area Barat Desa</p>
            </div>
            <button 
              onClick={() => handleFlyTo(-7.2280, 110.2672)} 
              className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white rounded-lg text-[10px] font-bold border border-emerald-500/30 transition"
            >
              Terbang ➔
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-900/40 hover:bg-slate-900/60 rounded-xl transition border border-white/5">
            <div>
              <p className="font-bold text-white">Sukorini Foggy Village</p>
              <p className="text-[10px] text-slate-400">Area Tengah</p>
            </div>
            <button 
              onClick={() => handleFlyTo(-7.2255, 110.2748)} 
              className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white rounded-lg text-[10px] font-bold border border-emerald-500/30 transition"
            >
              Terbang ➔
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-900/40 hover:bg-slate-900/60 rounded-xl transition border border-white/5">
            <div>
              <p className="font-bold text-white">Lapangan Kemitir</p>
              <p className="text-[10px] text-slate-400">Area Timur</p>
            </div>
            <button 
              onClick={() => handleFlyTo(-7.2272, 110.2810)} 
              className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white rounded-lg text-[10px] font-bold border border-emerald-500/30 transition"
            >
              Terbang ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;