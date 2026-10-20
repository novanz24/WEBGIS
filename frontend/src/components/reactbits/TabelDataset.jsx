// src/components/reactbits/TabelDataset.jsx
import React from 'react';

// 1. Named Export (agar cocok dengan import { TabelDataset } di App.jsx)
export function TabelDataset({ filteredDatasets, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900">Dataset Spasial Terbaru</h2>
        <div className="flex flex-wrap items-center gap-2">
          <input 
            type="text" 
            placeholder="Cari dataset..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="bg-slate-50 border border-slate-200 text-xs px-3 py-1.5 rounded-lg focus:outline-none w-48" 
          />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="bg-slate-50 border border-slate-200 text-xs px-3 py-1.5 rounded-lg focus:outline-none font-medium"
          >
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
  );
}

// 2. Default Export (sebagai cadangan pengaman modul Vite)
export default TabelDataset;