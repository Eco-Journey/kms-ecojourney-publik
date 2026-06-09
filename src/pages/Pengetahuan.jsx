import React, { useState } from 'react';
import { Search, BookOpen, Clock, Calendar } from 'lucide-react';
import { ARTICLES_DATA } from '../data/mockData';

export default function Pengetahuan() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Budidaya', 'Konservasi', 'Ritual Adat', 'Pasca Panen'];

  // Add category tagging mock detail to articles for filtering
  const articles = ARTICLES_DATA.map((art, idx) => {
    let category = 'Budidaya';
    if (idx === 1) category = 'Ritual Adat';
    if (idx === 2) category = 'Pasca Panen';
    
    return {
      ...art,
      category,
      date: '12 Mei 2026',
      author: 'Tim Peneliti CDC UI'
    };
  });

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Repositori Pengetahuan Lokal</h1>
        <p className="text-sm text-neutral-500">Transformasi kearifan lokal lisan dan praktik tradisional (Tacit Knowledge) menjadi terdokumentasi secara eksplisit.</p>
      </div>

      {/* Search and Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-neutral-600 hover:bg-neutralBg border-neutral-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Cari artikel pengetahuan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f2f2f2] border border-neutral-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all shadow-sm"
          />
          <Search className="absolute left-3 top-2.5 text-neutral-400" size={16} />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {filteredArticles.map(article => (
          <article 
            key={article.id}
            className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="h-48 overflow-hidden bg-neutral-100 relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#1e2d42] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    5 mnt baca
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-primary hover:text-primary-light transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-sm text-neutral-600 line-clamp-4 leading-relaxed font-light">
                  {article.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-semibold">
                Oleh: <span className="font-bold text-neutral-700">{article.author}</span>
              </span>
              <button 
                className="text-xs text-[#2b6cb0] hover:underline font-bold inline-flex items-center gap-1"
              >
                <BookOpen size={14} />
                <span>Baca</span>
              </button>
            </div>
          </article>
        ))}

        {filteredArticles.length === 0 && (
          <div className="col-span-full py-16 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-dashed">
            <p className="text-lg font-bold">Artikel tidak ditemukan</p>
            <p className="text-sm font-light">Coba sesuaikan kata kunci pencarian Anda.</p>
          </div>
        )}

      </div>
    </div>
  );
}
