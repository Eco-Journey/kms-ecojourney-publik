import React, { useState, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { VARITIES_DATA } from '../data/mockData';

export default function Varietas({ onSelectVariety, searchQueryFromNav }) {
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState(['Umbi', 'Sayur']); // Default tags as in wireframe
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedLandType, setSelectedLandType] = useState('');
  
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync search query from global navbar search
  useEffect(() => {
    if (searchQueryFromNav !== undefined) {
      setSearchQuery(searchQueryFromNav);
    }
  }, [searchQueryFromNav]);

  // Remove tag keyword helper
  const handleRemoveKeyword = (keywordToRemove) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keywordToRemove));
  };

  // Filter Logic
  const filteredVarieties = VARITIES_DATA.filter((variety) => {
    // Search filter
    const matchesSearch = 
      variety.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      variety.physicalDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      variety.village.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Commodity filter
    const matchesCommodity = selectedCommodity ? variety.commodity === selectedCommodity : true;
    
    // Status filter
    const matchesStatus = selectedStatus ? variety.conservationStatus === selectedStatus : true;
    
    // Village filter
    const matchesVillage = selectedVillage ? variety.village === selectedVillage : true;
    
    // LandType filter
    const matchesLandType = selectedLandType ? variety.landType.toLowerCase().includes(selectedLandType.toLowerCase()) : true;

    return matchesSearch && matchesCommodity && matchesStatus && matchesVillage && matchesLandType;
  });

  // Extract unique filter options for dropdowns
  const commodities = [...new Set(VARITIES_DATA.map(v => v.commodity))];
  const statuses = [...new Set(VARITIES_DATA.map(v => v.conservationStatus))];
  const villages = [...new Set(VARITIES_DATA.map(v => v.village))];
  const landTypes = ["Tanah", "Sawah", "Pekarangan", "Kebun"];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedKeywords([]);
    setSelectedCommodity('');
    setSelectedStatus('');
    setSelectedVillage('');
    setSelectedLandType('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile filter toggle */}
      <div className="flex md:hidden justify-between items-center mb-6">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md font-bold text-sm"
        >
          <SlidersHorizontal size={16} />
          <span>Filter & Keywords</span>
        </button>
        <span className="text-xs text-neutral-500 font-semibold">
          Menampilkan {filteredVarieties.length} Varietas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Filter Container (Desktop) / Drawer (Mobile) */}
        <div className={`
          md:block md:col-span-1 space-y-6
          ${mobileFilterOpen ? 'block fixed inset-0 z-40 bg-white p-6 overflow-y-auto' : 'hidden'}
        `}>
          {/* Mobile filter header */}
          <div className="flex justify-between items-center md:hidden mb-6 pb-3 border-b">
            <h2 className="text-lg font-bold text-primary">Filter Pencarian</h2>
            <button onClick={() => setMobileFilterOpen(false)} className="text-neutral-500 p-1">
              <X size={24} />
            </button>
          </div>

          <div className="bg-accent-light/50 border border-accent/30 rounded-xl p-6 space-y-6 shadow-sm">
            
            {/* Keywords/Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
                Keywords
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedKeywords.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center gap-1 bg-white border border-neutral-300 text-neutral-700 text-xs font-bold px-2.5 py-1 rounded-md"
                  >
                    <span>{tag}</span>
                    <button 
                      onClick={() => handleRemoveKeyword(tag)}
                      className="text-neutral-400 hover:text-neutral-600 focus:outline-none"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedKeywords.length === 0 && (
                  <span className="text-xs text-neutral-400 italic">Tidak ada tag</span>
                )}
              </div>
            </div>

            {/* Dropdown Komoditas */}
            <div className="space-y-2">
              <label htmlFor="commodity" className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
                Komoditas
              </label>
              <select
                id="commodity"
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Pilih...</option>
                {commodities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Dropdown Status Konservasi */}
            <div className="space-y-2">
              <label htmlFor="status" className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
                Status Konservasi
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Pilih...</option>
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Dropdown Desa */}
            <div className="space-y-2">
              <label htmlFor="village" className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
                Desa
              </label>
              <select
                id="village"
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Pilih...</option>
                {villages.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* Dropdown Ekosistem/Lahan */}
            <div className="space-y-2">
              <label htmlFor="landType" className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
                Ekosistem
              </label>
              <select
                id="landType"
                value={selectedLandType}
                onChange={(e) => setSelectedLandType(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Pilih...</option>
                {landTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="w-full border border-secondary text-secondary hover:bg-neutralBg font-bold text-xs py-2 rounded transition-all"
            >
              Reset Filter
            </button>

          </div>
        </div>

        {/* Main Content (Right) */}
        <div className="md:col-span-3 space-y-6">
          
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f2f2f2] border border-neutral-300 rounded-md pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-3 text-neutral-400" size={18} />
          </div>

          {/* Catalog grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVarieties.map((variety) => (
              <div
                key={variety.id}
                onClick={() => onSelectVariety(variety.id)}
                className="bg-accent-light border border-accent/40 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-neutral-200 mb-4 border border-accent/20">
                    <img
                      src={variety.images[0]}
                      alt={variety.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-primary line-clamp-1">
                      {variety.name}
                    </h3>
                    <p className="text-xs text-neutral-600">
                      Desa: <span className="font-semibold">{variety.village}</span>
                    </p>
                    <p className="text-xs text-neutral-600">
                      Komoditas: <span className="font-semibold text-secondary-light">{variety.commodity}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-accent/20 flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                    {variety.conservationStatus}
                  </span>
                  <span className="text-xs text-primary font-bold hover:underline">
                    Detail &rarr;
                  </span>
                </div>
              </div>
            ))}

            {filteredVarieties.length === 0 && (
              <div className="col-span-full py-16 text-center text-neutral-500 space-y-3 bg-neutral-50 rounded-xl border border-dashed">
                <p className="text-lg font-bold">Varietas tidak ditemukan</p>
                <p className="text-sm font-light">Coba sesuaikan kata kunci pencarian atau bersihkan filter filter di panel kiri.</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-4 py-2 rounded shadow-sm"
                >
                  Reset Semua Filter
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
