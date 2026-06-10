import React, { useState, useEffect } from 'react';
import { Search, X, Check, BookOpen, Clock, Calendar } from 'lucide-react';
import { getArticles, getVarieties } from '../services/dataService';
import { Article, Variety } from '../types';

interface PengetahuanProps {
  setCurrentRoute: (route: string) => void;
}

export default function Pengetahuan({ setCurrentRoute }: PengetahuanProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariety, setSelectedVariety] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [articlesData, varietiesData] = await Promise.all([
          getArticles(),
          getVarieties()
        ]);
        
        // Ensure articles have the needed fields
        const formattedArticles = articlesData.map((art, idx) => {
          let category = art.category || 'Budidaya';
          let date = art.date || '12 Mei 2026';
          let author = art.author_name || 'Tim Peneliti CDC UI';
          let year = art.year || (idx === 1 ? 2025 : 2026);
          let is_verified = art.is_verified !== undefined ? art.is_verified : idx < 2; // Default verified for Pengetahuan 1 & 2
          let variety_id = art.variety_id || (idx === 0 ? 'varietas-a' : idx === 1 ? 'varietas-b' : 'varietas-d');

          return {
            ...art,
            category,
            date,
            author_name: author,
            year,
            is_verified,
            variety_id
          };
        });

        setArticles(formattedArticles);
        setVarieties(varietiesData);
      } catch (err) {
        console.error("Failed to load articles:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter logic
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesVariety = !selectedVariety || article.variety_id === selectedVariety;
    const matchesYear = !selectedYear || article.year?.toString() === selectedYear;
    
    // Find variety village if matches village filter
    let matchesVillage = true;
    if (selectedVillage) {
      const varietyData = varieties.find(v => v.id === article.variety_id);
      matchesVillage = varietyData ? varietyData.village === selectedVillage : false;
    }

    const matchesVerified = !isVerifiedOnly || article.is_verified;

    return matchesSearch && matchesVariety && matchesYear && matchesVillage && matchesVerified;
  });

  // Extract filter option lists
  const yearsList = [...new Set(articles.map(a => a.year?.toString()).filter(Boolean))];
  const villagesList = [...new Set(varieties.map(v => v.village))];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedVariety('');
    setSelectedYear('');
    setSelectedVillage('');
    setIsVerifiedOnly(false);
  };

  const handleArticleClick = (id: string) => {
    setCurrentRoute(`detail-pengetahuan-${id}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="h-64 bg-neutral-200 rounded-xl"></div>
          <div className="md:col-span-3 space-y-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-40 bg-neutral-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Repositori Pengetahuan</h1>
        <p className="text-sm text-neutral-500">Transformasi kearifan lokal lisan dan praktik tradisional menjadi terdokumentasi secara digital.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="md:col-span-1 space-y-6 bg-accent-light/50 border border-accent/30 rounded-xl p-6 shadow-sm h-fit">
          <div className="flex items-center gap-2 text-primary font-extrabold border-b border-accent/20 pb-3">
            <Search size={18} />
            <span>Cari & Filter</span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute left-3 top-2.5 text-neutral-400" size={16} />
          </div>

          {/* Dropdown Varietas */}
          <div className="space-y-2">
            <label htmlFor="variety" className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
              Varietas
            </label>
            <select
              id="variety"
              value={selectedVariety}
              onChange={(e) => setSelectedVariety(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Pilih...</option>
              {varieties.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          {/* Dropdown Tahun */}
          <div className="space-y-2">
            <label htmlFor="year" className="text-xs font-bold text-neutral-500 block uppercase tracking-wider">
              Tahun
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Pilih...</option>
              {yearsList.map(y => (
                <option key={y} value={y}>{y}</option>
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
              {villagesList.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Checkbox Tervalidasi Pakar */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="verified"
              checked={isVerifiedOnly}
              onChange={(e) => setIsVerifiedOnly(e.target.checked)}
              className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
            />
            <label htmlFor="verified" className="text-sm font-bold text-neutral-700 cursor-pointer">
              Tervalidasi Pakar
            </label>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="w-full border border-secondary text-secondary hover:bg-neutralBg font-bold text-xs py-2 rounded transition-all"
          >
            Reset Filter
          </button>
        </div>

        {/* Main Content: Vertically Stacked Cards */}
        <div className="md:col-span-3 space-y-6">
          {filteredArticles.map((article, index) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
              className="bg-accent-light/50 border border-accent/40 rounded-xl p-6 flex flex-col md:flex-row gap-6 transition-all duration-300 hover:shadow-md cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.99]"
            >
              {/* Thumbnail Image */}
              <div className="w-full md:w-56 h-36 rounded-lg overflow-hidden bg-neutral-200 flex-shrink-0 border border-accent/30 shadow-sm">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="flex-grow flex flex-col justify-between py-1 space-y-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded font-extrabold uppercase">
                      {article.category || 'Konservasi'}
                    </span>
                    {article.is_verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded font-extrabold">
                        <Check size={10} className="stroke-[3]" />
                        <span>Tervalidasi Pakar</span>
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-primary hover:text-primary-light transition-colors line-clamp-1">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed font-light">
                    {article.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500 pt-2 border-t border-accent/20">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {article.year ? `Tahun ${article.year}` : 'Tahun 2026'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={13} />
                    Oleh: <span className="font-bold text-neutral-700">{article.author_name}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="py-16 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-dashed">
              <p className="text-lg font-bold">Artikel tidak ditemukan</p>
              <p className="text-sm font-light">Coba sesuaikan kata kunci pencarian atau bersihkan filter di panel kiri.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 bg-primary hover:bg-primary-light text-white font-bold text-xs px-4 py-2 rounded shadow-sm"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
