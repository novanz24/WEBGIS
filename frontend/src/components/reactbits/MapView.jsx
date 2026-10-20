// src/components/reactbits/MapView.jsx
import React from 'react';
import Map, { Source, Layer, Marker, Popup, NavigationControl } from 'react-map-gl';
import { geoWilayahKemitir, mapbox3DBuildingLayer } from '../../data/wilayahkemitir';
import { defaultSumberAir } from '../../data/sumberair';

// 1. Named Export (agar cocok dengan import { MapView } di App.jsx)
export function MapView({
  mapRef,
  MAPBOX_TOKEN,
  mapStyle,
  setMapStyle,
  showBatasDesa,
  setShowBatasDesa,
  showRisiko,
  setShowRisiko,
  showSumberAir,
  setShowSumberAir,
  showMapbox3D,
  setShowMapbox3D,
  selectedPoint,
  setSelectedPoint
}) {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-2 border-b border-slate-100 gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900">Sebaran Data Spasial & Mapbox 3D</h2>
          <p className="text-xs text-slate-500">Node Batas Akurat 130+ Titik • Mapbox Access Token Integrated</p>
        </div>
        <button
          onClick={() => setMapStyle(mapStyle.includes('satellite') ? 'mapbox://styles/mapbox/streets-v12' : 'mapbox://styles/mapbox/satellite-streets-v12')}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
        >
          {mapStyle.includes('satellite') ? '🗺️ Style Vektor' : '🛰️ Style Satelit'}
        </button>
      </div>

      <div className="h-[460px] w-full relative rounded-xl overflow-hidden border border-slate-200">
        <Map
          ref={mapRef}
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{ longitude: 110.2780, latitude: -7.2270, zoom: 14.8, pitch: 60, bearing: -15 }}
          style={{ width: '100%', height: '100%' }}
          mapStyle={mapStyle}
          terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
          preserveDrawingBuffer={true}
        >
          <NavigationControl position="bottom-right" />
          <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />

          {/* Poligon Batas Desa */}
          <Source id="wilayah-src" type="geojson" data={geoWilayahKemitir}>
            <Layer id="risk-fill" type="fill" layout={{ visibility: showRisiko ? 'visible' : 'none' }} paint={{ 'fill-color': '#eab308', 'fill-opacity': 0.30 }} />
            <Layer id="red-dashed-boundary" type="line" layout={{ visibility: showBatasDesa ? 'visible' : 'none' }} paint={{ 'line-color': '#ef4444', 'line-width': 3, 'line-dasharray': [3, 2] }} />
          </Source>

          {/* NATIVE MAPBOX 3D BUILDINGS */}
          {showMapbox3D && <Layer {...mapbox3DBuildingLayer} />}

          {/* Titik Air */}
          {showSumberAir && defaultSumberAir.map((item) => (
            <Marker key={item.id} longitude={item.lng} latitude={item.lat} onClick={(e) => { e.originalEvent.stopPropagation(); setSelectedPoint(item); }}>
              <div className="w-7 h-7 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-125 transition-transform">
                <span className="text-xs">💧</span>
              </div>
            </Marker>
          ))}

          {/* Popup Titik Air */}
          {selectedPoint && (
            <Popup longitude={selectedPoint.lng} latitude={selectedPoint.lat} onClose={() => setSelectedPoint(null)} closeButton={true}>
              <div className="p-1 min-w-[130px]">
                <h4 className="font-bold text-xs text-slate-900 mb-0.5">{selectedPoint.nama}</h4>
                <p className="text-[11px] text-slate-600">Debit: {selectedPoint.debit}</p>
                <p className="text-[11px] text-blue-600 font-bold mt-1">Jarak: {selectedPoint.jarak}</p>
              </div>
            </Popup>
          )}
        </Map>

        {/* FLOATING CONTROLS IN MAP */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-md text-xs space-y-1.5 z-10 w-52">
          <p className="font-bold text-[11px] text-slate-700 uppercase tracking-wider mb-1">Layer Toggle Peta</p>
          <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
            <input type="checkbox" checked={showBatasDesa} onChange={(e) => setShowBatasDesa(e.target.checked)} className="rounded text-red-600 focus:ring-0" />
            <span className="text-[11px] font-semibold">Garis Batas Merah Desa</span>
          </label>
          <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
            <input type="checkbox" checked={showRisiko} onChange={(e) => setShowRisiko(e.target.checked)} className="rounded text-amber-600 focus:ring-0" />
            <span className="text-[11px]">Area Wilayah Desa</span>
          </label>
          <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
            <input type="checkbox" checked={showSumberAir} onChange={(e) => setShowSumberAir(e.target.checked)} className="rounded text-blue-600 focus:ring-0" />
            <span className="text-[11px]">Titik Sumber Air</span>
          </label>
          <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
            <input type="checkbox" checked={showMapbox3D} onChange={(e) => setShowMapbox3D(e.target.checked)} className="rounded text-purple-600 focus:ring-0" />
            <span className="text-[11px] font-bold text-purple-700">Native Mapbox 3D Layer</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// 2. Default Export (sebagai cadangan pengaman modul Vite)
export default MapView;