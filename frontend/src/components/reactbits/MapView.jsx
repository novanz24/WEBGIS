// src/components/reactbits/MapView.jsx
import React from 'react';
import Map, { Source, Layer, Marker, Popup, NavigationControl } from 'react-map-gl';
import { geoWilayahKemitir, mapbox3DBuildingLayer } from '../../data/wilayahkemitir';
import { defaultSumberAir } from '../../data/sumberair';

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
    <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-white/10 gap-2">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">Sebaran Data Spasial & Mapbox 3D</h2>
          <p className="text-xs text-slate-400">Node Batas Akurat 130+ Titik • Dynamic Vector/Satellite Layer</p>
        </div>
        <button
          onClick={() => setMapStyle(mapStyle.includes('satellite') ? 'mapbox://styles/mapbox/streets-v12' : 'mapbox://styles/mapbox/satellite-streets-v12')}
          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-semibold rounded-xl transition backdrop-blur-md"
        >
          {mapStyle.includes('satellite') ? '🗺️ Style Vektor' : '🛰️ Style Satelit'}
        </button>
      </div>

      <div className="h-[460px] w-full relative rounded-xl overflow-hidden border border-white/10 shadow-inner">
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

          {/* GeoJSON Polygon & Line */}
          <Source id="wilayah-src" type="geojson" data={geoWilayahKemitir}>
            <Layer id="risk-fill" type="fill" layout={{ visibility: showRisiko ? 'visible' : 'none' }} paint={{ 'fill-color': '#eab308', 'fill-opacity': 0.30 }} />
            <Layer id="red-dashed-boundary" type="line" layout={{ visibility: showBatasDesa ? 'visible' : 'none' }} paint={{ 'line-color': '#ef4444', 'line-width': 3, 'line-dasharray': [3, 2] }} />
          </Source>

          {/* Mapbox 3D Buildings */}
          {showMapbox3D && <Layer {...mapbox3DBuildingLayer} />}

          {/* Markers */}
          {showSumberAir && defaultSumberAir.map((item) => (
            <Marker key={item.id} longitude={item.lng} latitude={item.lat} onClick={(e) => { e.originalEvent.stopPropagation(); setSelectedPoint(item); }}>
              <div className="w-8 h-8 bg-blue-600/90 border-2 border-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-125 transition-transform backdrop-blur-md">
                <span className="text-xs">💧</span>
              </div>
            </Marker>
          ))}

          {/* Popup */}
          {selectedPoint && (
            <Popup longitude={selectedPoint.lng} latitude={selectedPoint.lat} onClose={() => setSelectedPoint(null)} closeButton={true}>
              <div className="p-1 min-w-[130px] text-slate-800">
                <h4 className="font-bold text-xs mb-0.5">{selectedPoint.nama}</h4>
                <p className="text-[11px] text-slate-600">Debit: {selectedPoint.debit}</p>
                <p className="text-[11px] text-blue-600 font-bold mt-1">Jarak: {selectedPoint.jarak}</p>
              </div>
            </Popup>
          )}
        </Map>

        {/* Floating Controls Inside Map */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xl p-3.5 rounded-2xl border border-white/10 shadow-2xl text-xs space-y-2 z-10 w-56 text-slate-200">
          <p className="font-bold text-[10px] text-emerald-400 uppercase tracking-wider mb-1">Layer Toggle Peta</p>
          <label className="flex items-center space-x-2 cursor-pointer hover:text-white transition">
            <input type="checkbox" checked={showBatasDesa} onChange={(e) => setShowBatasDesa(e.target.checked)} className="rounded text-red-500 focus:ring-0" />
            <span className="text-[11px] font-semibold">Garis Batas Merah Desa</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:text-white transition">
            <input type="checkbox" checked={showRisiko} onChange={(e) => setShowRisiko(e.target.checked)} className="rounded text-amber-500 focus:ring-0" />
            <span className="text-[11px]">Area Wilayah Desa</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:text-white transition">
            <input type="checkbox" checked={showSumberAir} onChange={(e) => setShowSumberAir(e.target.checked)} className="rounded text-blue-500 focus:ring-0" />
            <span className="text-[11px]">Titik Sumber Air</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:text-white transition">
            <input type="checkbox" checked={showMapbox3D} onChange={(e) => setShowMapbox3D(e.target.checked)} className="rounded text-purple-500 focus:ring-0" />
            <span className="text-[11px] font-bold text-purple-300">Native Mapbox 3D Layer</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default MapView;