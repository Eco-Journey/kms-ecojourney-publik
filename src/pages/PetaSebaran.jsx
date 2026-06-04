import React, { useState } from 'react';
import { MapPin, SlidersHorizontal, Info, Eye } from 'lucide-react';
import { VARITIES_DATA } from '../data/mockData';

export default function PetaSebaran({ onSelectVariety }) {
  const [selectedCommodity, setSelectedCommodity] = useState('Semua');
  const [selectedStatus, setSelectedStatus] = useState('Semua');
  const [activePin, setActivePin] = useState(null);

  // Mock geographic positions for our 7 varieties on the simplified Indonesia map coordinate space (1000 x 400)
  const mapPins = [
    { varietyId: 'varietas-a', cx: 280, cy: 260, label: 'Varietas A (SukoJaya)', commodity: 'Padi', status: 'Aman' },
    { varietyId: 'varietas-b', cx: 340, cy: 260, label: 'Varietas B (Desa A)', commodity: 'Talas', status: 'Langka' },
    { varietyId: 'varietas-c', cx: 220, cy: 260, label: 'Varietas C (Ciptagelar)', commodity: 'Uwi', status: 'Sangat Terancam' },
    { varietyId: 'varietas-d', cx: 680, cy: 190, label: 'Varietas D (Desa Lonthoir)', commodity: 'Pala', status: 'Aman' },
    { varietyId: 'varietas-e', cx: 620, cy: 110, label: 'Varietas E (Marikurubu)', commodity: 'Cengkeh', status: 'Terancam' },
    { varietyId: 'varietas-f', cx: 300, cy: 260, label: 'Varietas F (SukoJaya)', commodity: 'Talas', status: 'Aman' },
    { varietyId: 'varietas-g', cx: 360, cy: 260, label: 'Varietas G (Desa A)', commodity: 'Uwi', status: 'Aman' }
  ];

  // Filters logic
  const filteredPins = mapPins.filter(pin => {
    const matchComm = selectedCommodity === 'Semua' || pin.commodity === selectedCommodity;
    const matchStatus = selectedStatus === 'Semua' || pin.status === selectedStatus;
    return matchComm && matchStatus;
  });

  const getPinColor = (commodity) => {
    switch (commodity) {
      case 'Padi': return 'fill-emerald-500 stroke-emerald-800';
      case 'Talas': return 'fill-amber-500 stroke-amber-800';
      case 'Uwi': return 'fill-indigo-500 stroke-indigo-800';
      case 'Pala': return 'fill-orange-500 stroke-orange-800';
      case 'Cengkeh': return 'fill-rose-500 stroke-rose-800';
      default: return 'fill-neutral-500 stroke-neutral-800';
    }
  };

  const handlePinClick = (pin) => {
    const varietyData = VARITIES_DATA.find(v => v.id === pin.varietyId);
    if (varietyData) {
      setActivePin({
        ...pin,
        ...varietyData
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Peta Sebaran GIS SDG Pertanian</h1>
        <p className="text-sm text-neutral-500">Visualisasi sebaran observasi in-situ dan on-farm oleh penyuluh dan petani (Citizen Science).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6 bg-accent-light/40 border border-accent/30 rounded-xl p-5 shadow-sm h-fit">
          <div className="flex items-center gap-2 text-primary font-bold border-b pb-3">
            <SlidersHorizontal size={18} />
            <span>Filter Peta</span>
          </div>

          {/* Filter Komoditas */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
              Komoditas
            </label>
            <div className="space-y-2">
              {['Semua', 'Padi', 'Talas', 'Uwi', 'Pala', 'Cengkeh'].map(comm => (
                <button
                  key={comm}
                  onClick={() => { setSelectedCommodity(comm); setActivePin(null); }}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-all flex items-center justify-between ${
                    selectedCommodity === comm
                      ? 'bg-primary text-white font-bold'
                      : 'bg-white border text-neutral-700 hover:bg-neutralBg'
                  }`}
                >
                  <span>{comm}</span>
                  {comm !== 'Semua' && (
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      comm === 'Padi' ? 'bg-emerald-500' :
                      comm === 'Talas' ? 'bg-amber-500' :
                      comm === 'Uwi' ? 'bg-indigo-500' :
                      comm === 'Pala' ? 'bg-orange-500' : 'bg-rose-500'
                    }`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Status Konservasi */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
              Status Konservasi
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setActivePin(null); }}
              className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none"
            >
              <option value="Semua">Semua Status</option>
              <option value="Aman">Aman</option>
              <option value="Terancam">Terancam</option>
              <option value="Langka">Langka</option>
              <option value="Sangat Terancam">Sangat Terancam</option>
            </select>
          </div>

          {/* Information box */}
          <div className="bg-white p-4 rounded-lg border text-xs text-neutral-600 leading-relaxed flex gap-2">
            <Info className="text-primary flex-shrink-0" size={16} />
            <p>Klik pada penanda lokasi (pin) di peta untuk melihat ringkasan varietas lokal dan menavigasi ke halaman profil lengkapnya.</p>
          </div>
        </div>

        {/* Map View */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="bg-neutralBg/30 border border-neutral-100 rounded-lg p-2 flex items-center justify-center min-h-[400px]">
              
              <svg 
                viewBox="0 0 1000 400" 
                className="w-full h-auto text-primary/10 fill-current opacity-90 transition-all select-none"
                aria-label="Peta Interaktif Indonesia"
              >
                {/* Indonesia Simplified Shape Path */}
                <path d="M50 150 Q100 130 150 140 T250 160 T350 130 T450 170 T550 150 T650 140 T750 130 T850 160 T950 140" stroke="#aaa" strokeWidth="6" fill="none"/>
                <path d="M120 180 Q160 190 200 180 T300 200 T400 190 T500 210 T600 200 T700 190 T800 220" stroke="#aaa" strokeWidth="4" fill="none"/>
                
                {/* Sumatra */}
                <path d="M100 100 L200 200 L180 220 L80 120 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
                {/* Java */}
                <path d="M220 250 L400 250 L380 270 L200 270 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
                {/* Kalimantan */}
                <path d="M300 100 L420 80 L440 180 L320 190 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
                {/* Sulawesi */}
                <path d="M500 120 L580 100 L560 200 L480 180 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
                {/* Maluku & Nusa Tenggara */}
                <circle cx="610" cy="210" r="10" fill="#D5E2C4" stroke="#284027" strokeWidth="2" />
                <circle cx="640" cy="180" r="8" fill="#D5E2C4" stroke="#284027" strokeWidth="2" />
                <path d="M580 260 L700 260 L690 270 L590 270 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2" />
                {/* Papua */}
                <path d="M750 130 L900 150 L880 240 L730 220 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
                
                {/* Render Filtered Pins */}
                {filteredPins.map((pin) => (
                  <g 
                    key={pin.varietyId} 
                    className="cursor-pointer group"
                    onClick={() => handlePinClick(pin)}
                  >
                    <circle 
                      cx={pin.cx} 
                      cy={pin.cy} 
                      r="16" 
                      className={`fill-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300`} 
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

              {/* Popup card on selection */}
              {activePin && (
                <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white border border-neutral-200 rounded-xl p-4 shadow-xl flex gap-4 animate-slideUp z-10">
                  <img 
                    src={activePin.images[0]} 
                    alt={activePin.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-primary line-clamp-1">{activePin.name}</h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5">Asal: {activePin.village}</p>
                      <p className="text-[11px] text-neutral-600 font-bold mt-1">Komoditas: {activePin.commodity}</p>
                    </div>
                    <button
                      onClick={() => onSelectVariety(activePin.varietyId)}
                      className="mt-2 text-xs bg-primary hover:bg-primary-light text-white font-bold py-1 px-3 rounded flex items-center justify-center gap-1 transition-all"
                    >
                      <Eye size={12} />
                      <span>Detail Varietas</span>
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
          </div>
        </div>

      </div>
    </div>
  );
}
