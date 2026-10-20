// src/components/reactbits/Navbar.jsx
import React, { useState, useEffect } from 'react';

export function Navbar({ activeTab, setActiveTab }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Muncul jika scroll ke atas atau di posisi paling atas, sembunyi jika scroll ke bawah
      if (currentScrollY <= 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scroll Down -> Sembunyi
      } else {
        setIsVisible(true);  // Scroll Up -> Muncul
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Invisible Hover Detector Area di Paling Atas Layar */}
      <div 
        onMouseEnter={() => setIsVisible(true)} 
        className="fixed top-0 left-0 right-0 h-4 z-50 pointer-events-auto"
      />

      {/* Header Utama Full-Width Tanpa Border Mengotak (Hanya Border Bawah) */}
      <header
        onMouseEnter={() => setIsVisible(true)}
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } navbar-liquid-glass border-b border-white/20 px-6 py-3.5 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-teal-300 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-emerald-500/20">
              W
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white block leading-none drop-shadow-sm">
                WebGIS Kemitir
              </span>
              <span className="text-[10px] text-emerald-300 font-semibold tracking-wider uppercase">
                MAPBOX 3D INTEGRATED
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-bold text-slate-200">
            <button 
              onClick={() => setActiveTab('Ringkasan')} 
              className={`transition-all pb-1 ${
                activeTab === 'Ringkasan' 
                  ? 'border-b-2 border-emerald-400 text-white' 
                  : 'hover:text-white'
              }`}
            >
              Beranda Dashboard
            </button>
            <a href="#berita" className="hover:text-white transition">Berita Wilayah</a>
            <a href="#tentang" className="hover:text-white transition">Tentang Sistem</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 border-r border-white/15 pr-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs border border-emerald-400/30 backdrop-blur-md">
              AD
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-white leading-tight drop-shadow-sm">Admin Desa Kemitir</p>
              <p className="text-[10px] text-emerald-300 font-semibold">Online • Tangguh Bencana</p>
            </div>
          </div>
          <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-bold transition backdrop-blur-md shadow-sm">
            Logout
          </button>
        </div>
      </header>
    </>
  );
}

export default Navbar;