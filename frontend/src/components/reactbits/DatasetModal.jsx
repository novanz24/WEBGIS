// src/components/reactbits/DatasetModal.jsx
import React from 'react';

export function DatasetModal({ isModalOpen, setIsModalOpen }) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 max-w-md w-full relative shadow-2xl text-slate-200 backdrop-blur-xl">
        <button 
          onClick={() => setIsModalOpen(false)} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold transition"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold text-white mb-1 tracking-tight">Tambah Dataset / Lapor Kondisi</h3>
        <p className="text-xs text-slate-400 mb-4">Unggah data spasial GeoJSON atau lokasi titik air baru.</p>

        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            alert("Dataset/Laporan berhasil dikirim!"); 
            setIsModalOpen(false); 
          }} 
          className="space-y-3.5 text-xs"
        >
          <div>
            <label className="block text-slate-300 font-medium mb-1">Nama Dataset / Lokasi</label>
            <input 
              type="text" 
              required 
              placeholder="Contoh: Titik Air RW 02 Desa Kemitir" 
              className="w-full bg-slate-800/80 border border-white/10 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition mt-2 shadow-lg shadow-emerald-500/20"
          >
            Simpan & Unggah Dataset
          </button>
        </form>
      </div>
    </div>
  );
}

export default DatasetModal;