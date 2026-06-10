import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
import { getArticleById } from '../services/dataService';
import { Article } from '../types';

interface DetailPengetahuanProps {
  articleId: string;
  onBack: () => void;
}

export default function DetailPengetahuan({ articleId, onBack }: DetailPengetahuanProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        const data = await getArticleById(articleId);
        
        // Ensure defaults if missing from DB
        if (data) {
          setArticle({
            ...data,
            subtitle: data.subtitle || 'Dokumentasi Kearifan Lokal Rempah & Pangan',
            content: data.content || 'Isi artikel kosong.',
            date: data.date || '12 Mei 2026',
            category: data.category || 'Konservasi',
            author_name: data.author_name || 'Tim Peneliti CDC UI',
            author_title: data.author_title || 'Peneliti Etnobotani CDC UI',
            author_image: data.author_image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
          });
        }
      } catch (err) {
        console.error("Error loading article details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8 animate-pulse">
        <div className="h-10 w-32 bg-neutral-200 rounded"></div>
        <div className="h-6 w-3/4 bg-neutral-200 rounded"></div>
        <div className="h-96 bg-neutral-200 rounded-xl"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">Artikel tidak ditemukan</h2>
        <button onClick={onBack} className="bg-primary text-white px-6 py-2.5 rounded font-bold">
          Kembali ke Repositori
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-bold text-sm"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Repositori</span>
        </button>
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded font-bold uppercase tracking-wider">
            {article.category}
          </span>
          {article.is_verified && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded font-bold">
              Tervalidasi Pakar
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-neutral-500 font-light italic">
          {article.subtitle}
        </p>
      </div>

      {/* Hero Banner Image */}
      <div className="aspect-[21/9] w-full rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
        
        {/* Left Column: Author Bio (1/4 width) */}
        <div className="md:col-span-1 space-y-4 border-r border-neutral-200 pr-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent shadow-sm bg-neutral-100">
              <img 
                src={article.author_image} 
                alt={article.author_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-primary">{article.author_name}</h4>
              <p className="text-xs text-neutral-500 font-medium">{article.author_title}</p>
            </div>
          </div>
          
          <div className="space-y-2.5 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
            <p className="flex items-center gap-2">
              <Calendar size={14} className="text-primary/70" />
              <span>{article.date}</span>
            </p>
            <p className="flex items-center gap-2">
              <BookOpen size={14} className="text-primary/70" />
              <span>{article.category}</span>
            </p>
          </div>
        </div>

        {/* Right Column: Rich Text Content (3/4 width) */}
        <div className="md:col-span-3 space-y-6">
          <div className="prose max-w-none text-neutral-700 leading-relaxed font-light text-base space-y-6 whitespace-pre-line">
            {article.content}
          </div>
        </div>

      </div>
    </div>
  );
}
