// src/components/reactbits/MetricsGrid.jsx
import React from 'react';

export function MetricsGrid() {
  return (
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
  );
}