// src/components/reactbits/TabelDataset.jsx
import React from 'react';

export function TabelDataset({ filteredDatasets, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-base font-bold text-white tracking-tight">Dataset Spasial Terbaru</h2>
        <div className="flex flex-wrap items-center gap-2">
          <input 
            type="text" 
            placeholder="Cari dataset..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 text-xs px-3 py-1.5 rounded-xl focus:outline-none focus:border-emerald-500/50 w-48" 
          />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="bg-slate-900/60 border border-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-xl focus:outline-none font-medium"
          >
            <option value="Semua" className="bg-slate-900">Semua kategori</option>
            <option value="Administrasi" className="bg-slate-900">Administrasi</option>
            <option value="Kebencanaan" className="bg-slate-900">Kebencanaan</option>
            <option value="Sumber Daya Air" className="bg-slate-900">Sumber Daya Air</option>
            <option value="Infrastruktur" className="bg-slate-900">Infrastruktur</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900/60 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Nama Dataset</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Pengelola</th>
              <th className="py-3 px-4">Diperbarui</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filteredDatasets.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition">
                <td className="py-3 px-4 font-bold text-white">
                  <div>
                    {item.nama}
                    <p className="text-[10px] font-normal text-slate-400">{item.format}</p>
                  </div>
                </td>
                <td className="py-3 px-4">{item.kategori}</td>
                <td className="py-3 px-4 text-slate-400">{item.pengelola}</td>
                <td className="py-3 px-4 text-slate-400">{item.diperbarui}</td>
                <td className="py-3 px-4">
                  {item.status === 'Success' && <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-md font-bold text-[10px]">Success</span>}
                  {item.status === 'Active' && <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md font-bold text-[10px]">Active</span>}
                  {item.status === 'Pending' && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-md font-bold text-[10px]">Pending</span>}
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-emerald-400 hover:text-emerald-300 font-bold text-xs transition">
                    Lihat detail ➔
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabelDataset;