import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { getStats, getVillages, getArticles, getVarieties } from '../services/dataService';
import { Stat, Village, Article, Variety } from '../types';

interface HomeProps {
  setCurrentRoute: (route: string) => void;
  setSelectedVarietyId: (id: string) => void;
}

export default function Home({ setCurrentRoute, setSelectedVarietyId }: HomeProps) {
  const [stats, setStats] = useState<Stat[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, villagesData, articlesData, varietiesData] = await Promise.all([
          getStats(),
          getVillages(),
          getArticles(),
          getVarieties()
        ]);
        setStats(statsData);
        setVillages(villagesData);
        setArticles(articlesData);
        setVarieties(varietiesData);
      } catch (err) {
        console.error("Error loading home data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Dynamically resolve icons for the stats cards
  const renderIcon = (iconName: string, colorClass = "text-primary") => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={`${colorClass} w-10 h-10`} />;
    }
    return <Icons.HelpCircle className={`${colorClass} w-10 h-10`} />;
  };

  const handleVarietyClick = (varietyId: string) => {
    setSelectedVarietyId(varietyId);
  };

  const handleVillageClick = (villageId: string) => {
    setCurrentRoute(`detail-desa-${villageId}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12 animate-pulse">
        <div className="h-64 bg-neutral-200 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-32 bg-neutral-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative bg-primary h-[500px] flex items-center overflow-hidden">
        {/* Background Image with Dark Green Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=1600')" 
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-white space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
            KMS SDG Pertanian
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light leading-relaxed">
            Sistem Manajemen Pengetahuan Sumber Daya Genetik Pertanian Lokal dan Kerabat Liarnya. Mengintegrasikan data plasma nutfah ilmiah dengan kearifan lokal masyarakat adat untuk mendukung konservasi in-situ dan on-farm secara berkelanjutan.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => setCurrentRoute('peta')}
              className="bg-[#2b6cb0] hover:bg-[#23538a] active:bg-[#1a3e68] text-white font-bold text-base px-8 py-3.5 rounded-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
            >
              Jelajahi peta
            </button>
            <button 
              onClick={() => setCurrentRoute('pengetahuan')}
              className="bg-[#2b6cb0] hover:bg-[#23538a] active:bg-[#1a3e68] text-white font-bold text-base px-8 py-3.5 rounded-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
            >
              Lihat Pengetahuan
            </button>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-accent-light/50 border border-accent/40 p-6 rounded-lg flex flex-col items-center text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-white p-3 rounded-full shadow-sm mb-4 border border-accent/20">
                {renderIcon(stat.iconName)}
              </div>
              <h3 className="text-xl font-extrabold text-primary mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-semibold text-primary/80 mb-2">
                {stat.label}
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Map & Featured Villages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Column (Left) */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-neutral-200 p-6 flex flex-col justify-between">
            <div className="mb-4">
              <h2 className="text-2xl font-extrabold text-primary">Peta Sebaran Observasi</h2>
              <p className="text-sm text-neutral-500">Visualisasi sebaran varietas tanaman adat di Indonesia.</p>
            </div>
            
            {/* Interactive/Beautiful SVG Map Representation */}
            <div className="bg-neutralBg/50 border border-neutral-100 rounded-lg p-4 flex items-center justify-center min-h-[300px] relative overflow-hidden">
              <svg 
                viewBox="0 0 1000 400" 
                className="w-full h-auto text-primary/10 fill-current opacity-70 transition-all"
                aria-label="Peta Indonesia"
              >
                {/* Indonesia Simplified Shape Path */}
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
                {/* Papua */}
                <path d="M750 130 L900 150 L880 240 L730 220 Z" fill="#D5E2C4" stroke="#284027" strokeWidth="2"/>
                
                {/* Dots representing villages */}
                <circle cx="150" cy="150" r="10" fill="#7A5535" className="animate-ping" />
                <circle cx="150" cy="150" r="8" fill="#7A5535" />
                <circle cx="320" cy="255" r="8" fill="#284027" />
                <circle cx="360" cy="120" r="8" fill="#EB3131" />
                <circle cx="530" cy="140" r="8" fill="#384166" />
                <circle cx="810" cy="180" r="8" fill="#7A5535" />
              </svg>
              
              {/* Overlay labels */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded border border-neutral-200 space-y-1">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Padi</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Talas & Uwi</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Pala & Cengkeh</div>
              </div>
            </div>
            
            <button 
              onClick={() => setCurrentRoute('peta')}
              className="mt-4 w-full bg-primary hover:bg-primary-light active:bg-[#1a2d1b] text-white font-bold py-2.5 rounded text-center text-sm transition-all shadow-sm"
            >
              Lihat Peta Lengkap
            </button>
          </div>

          {/* Featured Villages Column (Right) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {villages.slice(0, 3).map((village) => (
              <div 
                key={village.id} 
                className="bg-accent-light/40 hover:bg-accent-light/60 border border-accent/30 rounded-xl p-4 flex gap-4 transition-all duration-200 shadow-sm cursor-pointer transform hover:-translate-x-1"
                onClick={() => handleVillageClick(village.id)}
              >
                <img 
                  src={village.image} 
                  alt={village.name}
                  className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-extrabold text-primary mb-1">
                    {village.name}
                  </h3>
                  <p className="text-xs text-secondary font-medium">
                    Varietas Unggulan:
                  </p>
                  <p className="text-xs text-neutral-700 font-bold line-clamp-1">
                    {village.varieties}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-1 italic line-clamp-1">
                    Status: {village.conservation_status || "Aman"}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Pengetahuan Terbaru Section */}
      <section className="relative overflow-hidden py-10 bg-white/40">
        {/* Banner background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=1200" 
            alt="Padi"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutralBg via-neutralBg/80 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="text-3xl font-extrabold text-primary mb-8 border-b-2 border-primary/20 pb-3">
            Pengetahuan Terbaru
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9 space-y-4">
              {articles.slice(0, 3).map((article) => (
                <div 
                  key={article.id}
                  className="bg-white/95 backdrop-blur-sm hover:bg-white border border-neutral-200 hover:border-primary/30 rounded-xl p-4 flex flex-col sm:flex-row gap-4 transition-all duration-200 shadow-sm cursor-pointer"
                  onClick={() => setCurrentRoute(`detail-pengetahuan-${article.id}`)}
                >
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full sm:w-36 h-28 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <div className="flex gap-2 mb-1">
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase">
                          {article.category || 'Konservasi'}
                        </span>
                        {article.is_verified && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">
                            Tervalidasi Pakar
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-1 line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                    <span className="text-xs text-[#2b6cb0] font-semibold hover:underline mt-2 inline-block">
                      Baca selengkapnya &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3">
              <button 
                onClick={() => setCurrentRoute('pengetahuan')}
                className="w-full bg-[#2b6cb0] hover:bg-[#23538a] active:bg-[#1a3e68] text-white font-bold px-6 py-3.5 rounded-md shadow-md text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Lihat Pengetahuan</span>
                <Icons.ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Varietas Unggulan Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-primary mb-8 border-b-2 border-primary/20 pb-3">
          Varietas Unggulan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {varieties.slice(0, 4).map((variety) => (
            <div 
              key={variety.id}
              className="bg-accent-light/40 border border-accent/30 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleVarietyClick(variety.id)}
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-neutral-100">
                  <img 
                    src={variety.images[0]} 
                    alt={variety.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {variety.commodity}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-extrabold text-primary line-clamp-1">
                    {variety.name}
                  </h3>
                  
                  <div className="space-y-1.5 text-xs text-neutral-700">
                    <p className="flex justify-between">
                      <span className="text-neutral-500">Daerah:</span>
                      <span className="font-bold text-right">{variety.village}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-neutral-500">Status:</span>
                      <span className={`font-bold ${
                        variety.conservationStatus === 'Aman' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>{variety.conservationStatus}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-neutral-500">Ketinggian:</span>
                      <span className="font-medium">{variety.altitude}</span>
                    </p>
                  </div>
                  
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed pt-2 border-t border-accent/20">
                    {variety.physicalDescription}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button 
                  className="w-full bg-secondary hover:bg-secondary-light text-white font-bold text-xs py-2.5 rounded transition-all active:scale-95"
                >
                  Detail Varietas
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => setCurrentRoute('varietas')}
            className="bg-[#2b6cb0] hover:bg-[#23538a] active:bg-[#1a3e68] text-white font-bold text-base px-8 py-3.5 rounded-md transition-all shadow-md transform active:scale-95"
          >
            Jelajahi Varietas
          </button>
        </div>
      </section>

    </div>
  );
}
