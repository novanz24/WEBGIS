// src/components/reactbits/DatasetModal.jsx
import React from 'react';

// 1. Named Export (agar cocok dengan import { DatasetModal })
export function DatasetModal({ isModalOpen, setIsModalOpen }) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 max-w-md w-full relative shadow-2xl">
        <button 
          onClick={() => setIsModalOpen(false)} 
          className="absolute top-4 right-4 text-slate-400 font-bold hover:text-slate-800"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Tambah Dataset / Lapor Kondisi</h3>
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            alert("Dataset/Laporan berhasil dikirim!"); 
            setIsModalOpen(false); 
          }} 
          className="space-y-3 text-xs mt-3"
        >
          <div>
            <label className="block text-slate-700 font-medium mb-1">Nama Dataset / Lokasi</label>
            <input 
              type="text" 
              required 
              placeholder="Contoh: Titik Air RW 02 Desa Kemitir" 
              className="w-full border border-slate-300 rounded-lg p-2 text-xs" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-lg transition mt-2"
          >
            Simpan & Unggah Dataset
          </button>
        </form>
      </div>
    </div>
  );
}

// 2. Default Export (sebagai cadangan pengaman modul Vite)
export default DatasetModal;