import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin as PinIcon, ArrowRight, Eye, Landmark } from 'lucide-react';
import { getVillageById, getVarieties } from '../services/dataService';
import { Village, Variety, Practice } from '../types';

interface DetailDesaProps {
  villageId: string;
  onBack: () => void;
  setCurrentRoute: (route: string) => void;
  setSelectedVarietyId: (id: string) => void;
}

export default function DetailDesa({ villageId, onBack, setCurrentRoute, setSelectedVarietyId }: DetailDesaProps) {
  const [village, setVillage] = useState<Village | null>(null);
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [villageData, varietiesData] = await Promise.all([
          getVillageById(villageId),
          getVarieties()
        ]);
        setVillage(villageData);
        setVarieties(varietiesData);
      } catch (err) {
        console.error("Failed to load village details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [villageId]);

  // Filter varieties belonging to this village
  const localVarieties = varieties.filter(v => 
    v.village.toLowerCase().replace(/\s+/g, '-') === villageId ||
    (village && v.village.toLowerCase() === village.name.toLowerCase())
  );

  // Extract practices associated with local varieties
  const localPractices: (Practice & { varietyId: string; varietyName: string })[] = [];
  localVarieties.forEach(v => {
    v.practices.forEach(p => {
      localPractices.push({
        ...p,
        varietyId: v.id,
        varietyName: v.name
      });
    });
  });

  const handleVarietyClick = (id: string) => {
    setSelectedVarietyId(id);
    setCurrentRoute(`detail-varietas-${id}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8 animate-pulse">
        <div className="h-10 w-32 bg-neutral-200 rounded"></div>
        <div className="h-96 bg-neutral-200 rounded-xl"></div>
      </div>
    );
  }

  if (!village) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">Desa tidak ditemukan</h2>
        <button onClick={onBack} className="bg-primary text-white px-6 py-2.5 rounded font-bold">
          Kembali ke Peta
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Back Button */}
      <div>
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-bold text-sm"
        >
          <ArrowLeft size={16} />
          <span>Kembali</span>
        </button>
      </div>

      {/* Top Header Panel (soft green background) */}
      <div className="bg-accent-light/60 border border-accent/40 rounded-xl p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left column: Village Thumbnail */}
          <div className="lg:col-span-3 aspect-[4/3] w-full rounded-lg overflow-hidden border border-accent/20 bg-neutral-100 shadow-sm">
            <img 
              src={village.image} 
              alt={village.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Middle column: Village Stats info */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Nama</span>
                <span className="text-2xl font-extrabold text-primary flex items-center gap-2">
                  <Landmark size={20} />
                  <span>{village.name}</span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Jumlah Varietas</span>
                  <span className="text-2xl font-extrabold text-neutral-800">{village.varieties_count || 100}</span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Jumlah Praktik</span>
                  <span className="text-2xl font-extrabold text-neutral-800">{village.practices_count || 50}</span>
                </div>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Status Konservasi</span>
                <span className="inline-block mt-1 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {village.conservation_status || "Aman"}
                </span>
              </div>
            </div>
          </div>

          {/* Right column: Description & Location Mini Map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">Deskripsi</span>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                {village.description}
              </p>
            </div>
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">Lokasi</span>
              {/* Mini Map */}
              <div className="bg-white border rounded-lg p-2 h-28 relative flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 1000 400" className="w-full h-full text-neutral-300 fill-current opacity-70">
                  <path d="M50 150 Q100 130 150 140 T250 160 T350 130 T450 170 T550 150 T650 140 T750 130 T850 160 T950 140" stroke="#ccc" strokeWidth="4" fill="none"/>
                  <path d="M120 180 Q160 190 200 180 T300 200 T400 190 T500 210 T600 200 T700 190 T800 220" stroke="#ccc" strokeWidth="2" fill="none"/>
                  
                  {/* Sumatra */}
                  <path d="M100 100 L200 200 L180 220 L80 120 Z" fill="#eee" stroke="#ddd" strokeWidth="1"/>
                  {/* Java */}
                  <path d="M220 250 L400 250 L380 270 L200 270 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="1"/>
                  {/* Kalimantan */}
                  <path d="M300 100 L420 80 L440 180 L320 190 Z" fill="#eee" stroke="#ddd" strokeWidth="1"/>
                  {/* Sulawesi */}
                  <path d="M500 120 L580 100 L560 200 L480 180 Z" fill="#eee" stroke="#ddd" strokeWidth="1"/>
                  {/* Papua */}
                  <path d="M750 130 L900 150 L880 240 L730 220 Z" fill="#eee" stroke="#ddd" strokeWidth="1"/>
                  
                  {/* Village location pin */}
                  <circle cx="280" cy="260" r="14" fill="#284027" className="animate-ping opacity-30" />
                  <circle cx="280" cy="260" r="8" fill="#284027" />
                  <circle cx="280" cy="260" r="3" fill="white" />
                </svg>
                <div className="absolute top-2 left-2 bg-neutral-900/80 text-[10px] text-white px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                  <PinIcon size={10} />
                  <span>{village.location_map_url || 'Jawa Barat'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Varietas Lokal Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-primary/20 pb-3">
          <h2 className="text-2xl font-extrabold text-primary">Varietas Lokal</h2>
          <button 
            onClick={() => setCurrentRoute('varietas')}
            className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 bg-[#2b6cb0]/10 hover:bg-[#2b6cb0]/20 px-3.5 py-1.5 rounded transition-all"
          >
            <span>Jelajahi Varietas</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {localVarieties.slice(0, 4).map((variety) => (
            <div
              key={variety.id}
              onClick={() => handleVarietyClick(variety.id)}
              className="bg-accent-light/40 border border-accent/40 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
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
                    Komoditas: <span className="font-semibold text-secondary">{variety.commodity}</span>
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-accent/20 flex justify-between items-center text-xs">
                <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                  {variety.conservationStatus}
                </span>
                <span className="text-primary font-bold hover:underline">
                  Detail &rarr;
                </span>
              </div>
            </div>
          ))}

          {localVarieties.length === 0 && (
            <div className="col-span-full py-8 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-dashed text-sm">
              Belum ada data varietas lokal terdokumentasi untuk desa ini.
            </div>
          )}
        </div>
      </div>

      {/* Praktik Lokal Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-primary/20 pb-3">
          <h2 className="text-2xl font-extrabold text-primary">Praktik Lokal</h2>
          <button 
            onClick={() => setCurrentRoute('pengetahuan')}
            className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 bg-[#2b6cb0]/10 hover:bg-[#2b6cb0]/20 px-3.5 py-1.5 rounded transition-all"
          >
            <span>Lihat Pengetahuan</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {localPractices.slice(0, 3).map((practice, idx) => (
            <div
              key={idx}
              className="bg-accent-light/40 border border-accent/30 rounded-xl p-5 flex flex-col md:flex-row gap-6 hover:shadow-sm transition-all duration-300"
            >
              <img
                src={practice.image}
                alt={practice.title}
                className="w-full md:w-48 h-28 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex flex-col justify-center space-y-1.5">
                <h3 className="text-lg font-extrabold text-primary">
                  {practice.title}
                </h3>
                <p className="text-xs text-neutral-500 font-medium italic">
                  Terkait Varietas: <button onClick={() => handleVarietyClick(practice.varietyId)} className="text-secondary font-bold hover:underline">{practice.varietyName}</button>
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed font-light line-clamp-2">
                  {practice.description}
                </p>
              </div>
            </div>
          ))}

          {localPractices.length === 0 && (
            <div className="py-8 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-dashed text-sm">
              Belum ada data praktik lokal tradisional tercatat untuk desa ini.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
