import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, Info, Eye, MapPin as PinIcon } from 'lucide-react';
import { getMapPins, getVarieties } from '../services/dataService';
import { MapPin, Variety } from '../types';

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

  const getPinColor = (commodity: string) => {
    switch (commodity) {
      case 'Padi': return 'fill-emerald-500 stroke-emerald-800';
      case 'Talas': return 'fill-amber-500 stroke-amber-800';
      case 'Uwi': return 'fill-indigo-500 stroke-indigo-800';
      case 'Pala': return 'fill-orange-500 stroke-orange-800';
      case 'Cengkeh': return 'fill-rose-500 stroke-rose-800';
      default: return 'fill-neutral-500 stroke-neutral-800';
    }
  };

  const handlePinClick = (pin: MapPin) => {
    const varietyData = varieties.find(v => v.id === pin.varietyId);
    setActivePin({
      ...pin,
      image: varietyData?.images[0] || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400',
      desc: varietyData?.physicalDescription || ''
    });
  };

  // Extract filter lists
  const commoditiesList = [...new Set(pins.map(p => p.commodity))];
  const provincesList = [...new Set(pins.map(p => p.province).filter(Boolean))];
  const statusesList = [...new Set(pins.map(p => p.status))];
  const ecosystemsList = [...new Set(pins.map(p => p.ecosystem).filter(Boolean))];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-pulse">
        <div className="h-96 bg-neutral-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Peta Sebaran Varietas</h1>
        <p className="text-sm text-neutral-500">Pemetaan partisipatif (citizen science) oleh petani dan penyuluh untuk sebaran varietas di lahan.</p>
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
          <div className="bg-neutralBg/30 border border-neutral-100 rounded-lg p-4 flex items-center justify-center min-h-[450px]">
            
            <svg 
              viewBox="0 0 1000 400" 
              className="w-full h-auto text-primary/10 fill-current opacity-90 transition-all select-none"
              aria-label="Peta Interaktif Indonesia"
            >
              {/* Indonesia Map Path representation */}
              <path d="M50 150 Q100 130 150 140 T250 160 T350 130 T450 170 T550 150 T650 140 T750 130 T850 160 T950 140" stroke="#ccc" strokeWidth="6" fill="none"/>
              <path d="M120 180 Q160 190 200 180 T300 200 T400 190 T500 210 T600 200 T700 190 T800 220" stroke="#ccc" strokeWidth="4" fill="none"/>
              
              {/* Sumatra */}
              <path d="M100 100 L200 200 L180 220 L80 120 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
              {/* Java */}
              <path d="M220 250 L400 250 L380 270 L200 270 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
              {/* Kalimantan */}
              <path d="M300 100 L420 80 L440 180 L320 190 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
              {/* Sulawesi */}
              <path d="M500 120 L580 100 L560 200 L480 180 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
              {/* Maluku */}
              <circle cx="610" cy="210" r="10" fill="#D5E2C4" stroke="#284027" strokeWidth="2" />
              <circle cx="640" cy="180" r="8" fill="#D5E2C4" stroke="#284027" strokeWidth="2" />
              {/* Papua */}
              <path d="M750 130 L900 150 L880 240 L730 220 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
              
              <text x="600" y="320" className="text-[28px] font-bold fill-primary/30 tracking-widest select-none">
                Indonesia
              </text>

              {/* Render filtered markers */}
              {filteredPins.map((pin, index) => (
                <g 
                  key={index} 
                  className="cursor-pointer group"
                  onClick={() => handlePinClick(pin)}
                >
                  <circle 
                    cx={pin.cx} 
                    cy={pin.cy} 
                    r="16" 
                    className="fill-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300" 
                  />
                  <circle 
                    cx={pin.cx} 
                    cy={pin.cy} 
                    r="9" 
                    className={`${getPinColor(pin.commodity)} stroke-2 transition-all group-hover:scale-125 transform origin-center`} 
                  />
                  <circle 
                    cx={pin.cx} 
                    cy={pin.cy} 
                    r="3" 
                    fill="white" 
                  />
                </g>
              ))}
            </svg>

            {/* Popup details card */}
            {activePin && (
              <div className="absolute bottom-6 right-6 w-80 bg-white border border-neutral-200 rounded-xl p-4 shadow-xl flex gap-4 animate-slideUp z-10">
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
                    <Eye size={12} />
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
