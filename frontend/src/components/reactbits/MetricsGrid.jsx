// src/components/reactbits/MetricsGrid.jsx
import React from 'react';

export function MetricsGrid() {
  const metrics = [
    { title: "Total Titik Air", value: "34 Titik", desc: "Aktif & Terverifikasi", icon: "💧", color: "from-blue-400/20 to-cyan-400/5" },
    { title: "Luas Wilayah", value: "142 Ha", desc: "Desa Kemitir, Jatinom", icon: "🗺️", color: "from-emerald-400/20 to-teal-400/5" },
    { title: "Indeks Risiko", value: "Rendah - Sedang", desc: "Kawasan Tangguh Bencana", icon: "🛡️", color: "from-amber-400/20 to-yellow-400/5" },
    { title: "Dataset Spasial", value: "128 Berkas", desc: "Format GeoJSON & SHP", icon: "📊", color: "from-purple-400/20 to-indigo-400/5" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item, idx) => (
        <div 
          key={idx} 
          className="liquid-glass relative group overflow-hidden rounded-2xl p-5 hover:scale-[1.02]"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-200 tracking-wide">{item.title}</p>
              <h3 className="text-xl font-extrabold text-white mt-1 tracking-tight drop-shadow-sm">{item.value}</h3>
              <p className="text-[11px] text-emerald-300 font-semibold mt-1 flex items-center gap-1.5 drop-shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {item.desc}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform duration-300 backdrop-blur-md">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MetricsGrid;