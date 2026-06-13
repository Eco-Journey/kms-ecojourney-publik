import React, { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal, Info, Eye } from 'lucide-react';
import { getMapPins, getVarieties } from '../services/dataService';
import { MapPin, Variety } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PetaSebaranProps {
  onSelectVariety: (id: string) => void;
}

export default function PetaSebaran({ onSelectVariety }: PetaSebaranProps) {
  const [pins, setPins] = useState<MapPin[]>([]);
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedEcosystem, setSelectedEcosystem] = useState('');
  
  const [activePin, setActivePin] = useState<(MapPin & { image?: string; desc?: string }) | null>(null);

  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.FeatureGroup | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [pinsData, varietiesData] = await Promise.all([
          getMapPins(),
          getVarieties()
        ]);
        setPins(pinsData);
        setVarieties(varietiesData);
      } catch (err) {
        console.error("Failed to load map page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter logic
  const filteredPins = pins.filter(pin => {
    const matchComm = !selectedCommodity || pin.commodity === selectedCommodity;
    const matchProv = !selectedProvince || pin.province === selectedProvince;
    const matchStatus = !selectedStatus || pin.status === selectedStatus;
    const matchEco = !selectedEcosystem || pin.ecosystem === selectedEcosystem;
    return matchComm && matchProv && matchStatus && matchEco;
  });

  // Helper to get coordinates for mock map pins in Leaflet
  const getCoordinates = (varietyId: string): [number, number] => {
    switch (varietyId) {
      case 'varietas-a': return [-6.8123, 107.6152]; // West Java / SukoJaya
      case 'varietas-b': return [-6.5971, 106.7986]; // West Java / Cihideung
      case 'varietas-c': return [-6.9536, 106.4953]; // West Java / Ciptagelar
      case 'varietas-d': return [-4.5321, 129.8972]; // Banda Island, Maluku / Lonthoir
      case 'varietas-e': return [0.7911, 127.3619];  // Ternate, Maluku Utara / Marikurubu
      case 'varietas-f': return [-6.8123, 107.6152]; // West Java / SukoJaya
      case 'varietas-g': return [-6.5971, 106.7986]; // West Java / Cihideung
      default: return [-2.5, 118.0];
    }
  };

  const createCustomIcon = (commodity: string) => {
    let color = '#10b981'; // Emerald (Padi)
    if (commodity === 'Talas') color = '#f59e0b'; // Amber
    if (commodity === 'Uwi') color = '#6366f1'; // Indigo
    if (commodity === 'Pala') color = '#f97316'; // Orange
    if (commodity === 'Cengkeh') color = '#f43f5e'; // Rose

    const svgHtml = `
      <div class="relative flex items-center justify-center">
        <span class="absolute inline-flex h-6 w-6 rounded-full bg-white opacity-45 animate-ping"></span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32" class="drop-shadow-lg relative z-10">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `;
    return L.divIcon({
      html: svgHtml,
      className: 'custom-leaflet-icon-container',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  const handlePinClick = (pin: MapPin) => {
    const varietyData = varieties.find(v => v.id === pin.varietyId);
    setActivePin({
      ...pin,
      image: varietyData?.images[0] || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400',
      desc: varietyData?.physicalDescription || ''
    });
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!loading && !mapInstanceRef.current) {
      // Create map container centred on Indonesia
      const map = L.map('map-leaflet', {
        center: [-2.5, 118.0],
        zoom: 5,
        minZoom: 4,
        maxZoom: 12,
        scrollWheelZoom: true
      });

      // Add high quality tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = L.featureGroup().addTo(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, [loading]);

  // Update Markers when Filtered Pins change
  useEffect(() => {
    if (markersLayerRef.current && mapInstanceRef.current && !loading) {
      markersLayerRef.current.clearLayers();

      filteredPins.forEach(pin => {
        const coords = getCoordinates(pin.varietyId);
        const marker = L.marker(coords, {
          icon: createCustomIcon(pin.commodity)
        });

        marker.on('click', () => {
          handlePinClick(pin);
        });

        markersLayerRef.current?.addLayer(marker);
      });

      // Fit bounds if markers exist
      if (filteredPins.length > 0) {
        const bounds = markersLayerRef.current.getBounds();
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
      } else {
        mapInstanceRef.current.setView([-2.5, 118.0], 5);
      }
    }
  }, [filteredPins, varieties, loading]);

  // Extract filter list values
  const commoditiesList = [...new Set(pins.map(p => p.commodity))];
  const provincesList = [...new Set(pins.map(p => p.province).filter(Boolean))];
  const statusesList = [...new Set(pins.map(p => p.status))];
  const ecosystemsList = [...new Set(pins.map(p => p.ecosystem).filter(Boolean))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Peta Sebaran Varietas</h1>
        <p className="text-sm text-neutral-500">Pemetaan partisipatif (citizen science) sebaran varietas lokal berbasis Leaflet Map.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6 bg-accent-light/50 border border-accent/30 rounded-xl p-6 shadow-sm h-fit">
          <div className="flex items-center gap-2 text-primary font-extrabold border-b border-accent/20 pb-3">
            <SlidersHorizontal size={18} />
            <span>Filter Peta</span>
          </div>

          {/* Komoditas */}
          <div className="space-y-2">
            <label htmlFor="commodity" className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
              Komoditas
            </label>
            <select
              id="commodity"
              value={selectedCommodity}
              onChange={(e) => { setSelectedCommodity(e.target.value); setActivePin(null); }}
              className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Pilih...</option>
              {commoditiesList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Provinsi */}
          <div className="space-y-2">
            <label htmlFor="province" className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
              Provinsi
            </label>
            <select
              id="province"
              value={selectedProvince}
              onChange={(e) => { setSelectedProvince(e.target.value); setActivePin(null); }}
              className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Pilih...</option>
              {provincesList.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Status Konservasi */}
          <div className="space-y-2">
            <label htmlFor="status" className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
              Status Konservasi
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setActivePin(null); }}
              className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Pilih...</option>
              {statusesList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Ekosistem */}
          <div className="space-y-2">
            <label htmlFor="ecosystem" className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
              Ekosistem
            </label>
            <select
              id="ecosystem"
              value={selectedEcosystem}
              onChange={(e) => { setSelectedEcosystem(e.target.value); setActivePin(null); }}
              className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Pilih...</option>
              {ecosystemsList.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              setSelectedCommodity('');
              setSelectedProvince('');
              setSelectedStatus('');
              setSelectedEcosystem('');
              setActivePin(null);
            }}
            className="w-full border border-secondary text-secondary hover:bg-neutralBg font-bold text-xs py-2 rounded transition-all"
          >
            Reset Peta
          </button>
        </div>

        {/* Map View Area */}
        <div className="lg:col-span-3 bg-white border border-neutral-200 rounded-xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="relative border border-neutral-100 rounded-lg overflow-hidden min-h-[450px]">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 text-neutral-500 animate-pulse">
                Memuat peta sebaran...
              </div>
            ) : (
              <div id="map-leaflet" className="absolute inset-0 z-0" style={{ height: '450px', width: '100%' }}></div>
            )}

            {/* Popup details card */}
            {activePin && (
              <div className="absolute bottom-6 right-6 w-80 bg-white border border-neutral-200 rounded-xl p-4 shadow-xl flex gap-4 animate-slideUp z-[1000]">
                <img 
                  src={activePin.image} 
                  alt={activePin.label}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-primary line-clamp-1">{activePin.label}</h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Provinsi: {activePin.province}</p>
                    <p className="text-[11px] text-neutral-600 font-bold mt-1">Ecosystem: {activePin.ecosystem}</p>
                  </div>
                  <button
                    onClick={() => onSelectVariety(activePin.varietyId)}
                    className="mt-2 text-xs bg-primary hover:bg-primary-light text-white font-bold py-1 px-3 rounded flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Lihat Detail</span>
                  </button>
                </div>
                <button 
                  onClick={() => setActivePin(null)} 
                  className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600 text-sm font-bold"
                >
                  &times;
                </button>
              </div>
            )}

          </div>

          {/* Information footer */}
          <div className="mt-4 bg-accent-light/30 p-4 rounded-lg border border-accent/20 text-xs text-neutral-600 flex gap-2">
            <Info className="text-primary flex-shrink-0" size={16} />
            <p>Menampilkan sebaran verified in-situ observations. Anda dapat menyaring data berdasarkan komoditas tanaman, wilayah administratif provinsi, status perlindungan kelestarian, serta ekosistem/jenis lahan tanam.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
