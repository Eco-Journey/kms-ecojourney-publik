import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { getVarietyById } from '../services/dataService';
import { Variety } from '../types';

interface DetailVarietasProps {
  varietyId: string;
  onBack: () => void;
  setCurrentRoute?: (route: string) => void;
}

export default function DetailVarietas({ varietyId, onBack, setCurrentRoute }: DetailVarietasProps) {
  const [variety, setVariety] = useState<Variety | null>(null);
  const [loading, setLoading] = useState(true);

  // Tabs state: 'galeri' | 'kalender' | 'praktik'
  const [activeTab, setActiveTab] = useState('kalender'); // Default to kalender as in image 1

  // Calendar state
  const [calendarYear] = useState(2025);
  const [calendarMonth] = useState('January');

  useEffect(() => {
    async function loadVariety() {
      try {
        const data = await getVarietyById(varietyId);
        setVariety(data);
      } catch (err) {
        console.error("Error loading variety detail:", err);
      } finally {
        setLoading(false);
      }
    }
    loadVariety();
  }, [varietyId]);

  const tabs = [
    { id: 'galeri', label: 'Galeri' },
    { id: 'kalender', label: 'Kalender Tanam Adat' },
    { id: 'praktik', label: 'Praktik Lokal' }
  ];

  // Helper to render calendar days
  const renderCalendarDays = () => {
    if (!variety) return null;
    
    // Generate dates for January 2025 specifically to match the wireframe
    // Mon to Sun layout
    const days = [
      { date: 29, currentMonth: false },
      { date: 30, currentMonth: false },
      { date: 31, currentMonth: false },
      { date: 1, currentMonth: true },
      { date: 2, currentMonth: true },
      { date: 3, currentMonth: true },
      { date: 4, currentMonth: true },
      
      { date: 5, currentMonth: true },
      { date: 6, currentMonth: true },
      { date: 7, currentMonth: true },
      { date: 8, currentMonth: true },
      { date: 9, currentMonth: true },
      { date: 10, currentMonth: true },
      { date: 11, currentMonth: true },
      
      { date: 12, currentMonth: true },
      { date: 13, currentMonth: true },
      { date: 14, currentMonth: true },
      { date: 15, currentMonth: true },
      { date: 16, currentMonth: true },
      { date: 17, currentMonth: true },
      { date: 18, currentMonth: true },
      
      { date: 19, currentMonth: true },
      { date: 20, currentMonth: true },
      { date: 21, currentMonth: true },
      { date: 22, currentMonth: true },
      { date: 23, currentMonth: true },
      { date: 24, currentMonth: true },
      { date: 25, currentMonth: true },
      
      { date: 26, currentMonth: true },
      { date: 27, currentMonth: true },
      { date: 28, currentMonth: true },
      { date: 29, currentMonth: true },
      { date: 30, currentMonth: true },
      { date: 31, currentMonth: true },
      { date: 32, currentMonth: false } // Next month
    ];

    return days.map((day, idx) => {
      const dateStr = day.date.toString();
      // Get events for this specific date from variety calendarEvents
      const events = day.currentMonth || dateStr === "29" ? (variety.calendarEvents[dateStr] || []) : [];

      return (
        <div 
          key={idx} 
          className={`min-h-[100px] border-r border-b border-neutral-200 p-2 flex flex-col justify-between ${
            day.currentMonth ? 'bg-white' : 'bg-neutral-50 text-neutral-400'
          }`}
        >
          <span className={`text-sm font-bold ${day.currentMonth ? 'text-neutral-800' : 'text-neutral-400'}`}>
            {day.date}
          </span>
          <div className="space-y-1.5 mt-1">
            {events.map((event, eventIdx) => {
              let colorClass = "";
              if (event === "Quotes") colorClass = "bg-blue-100 text-blue-700 text-[10px] py-0.5 px-1.5 rounded font-semibold inline-block w-fit";
              if (event === "Giveaway") colorClass = "bg-orange-100 text-orange-700 text-[10px] py-0.5 px-1.5 rounded font-semibold inline-block w-fit";
              if (event === "Reel") colorClass = "bg-rose-100 text-rose-700 text-[10px] py-0.5 px-1.5 rounded font-semibold inline-block w-fit";
              return (
                <div key={eventIdx} className="block">
                  <span className={colorClass}>{event}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  const handleVillageClick = () => {
    if (variety && setCurrentRoute) {
      // Find village id by name
      const villageId = variety.village.toLowerCase().replace(/\s+/g, '-');
      setCurrentRoute(`detail-desa-${villageId}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8 animate-pulse">
        <div className="h-10 w-32 bg-neutral-200 rounded"></div>
        <div className="h-96 bg-neutral-200 rounded-xl"></div>
      </div>
    );
  }

  if (!variety) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">Varietas tidak ditemukan</h2>
        <button onClick={onBack} className="bg-primary text-white px-6 py-2.5 rounded font-bold">
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <div>
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-bold text-sm"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Katalog</span>
        </button>
      </div>

      {/* Detail Metadata Card */}
      <div className="bg-accent-light/60 border border-accent/40 rounded-xl p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main crop image */}
          <div className="lg:col-span-4 aspect-square w-full rounded-lg overflow-hidden bg-neutral-200 border border-accent/20 shadow-sm">
            <img 
              src={variety.images[0]} 
              alt={variety.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Metadata detail list */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Nama</span>
                <span className="text-base font-semibold text-primary">{variety.name}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Desa</span>
                <button 
                  onClick={handleVillageClick}
                  className="text-base font-semibold text-neutral-800 hover:text-primary hover:underline transition-all text-left"
                >
                  {variety.village}
                </button>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Komoditas</span>
                <span className="text-base font-semibold text-neutral-800">{variety.commodity}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Deskripsi Fisik</span>
                <p className="text-[14px] text-neutral-600 leading-relaxed font-light mt-1">
                  {variety.physicalDescription}
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Status Konservasi</span>
                <span className="inline-block mt-1 bg-primary text-white text-[12px] font-bold px-3 py-1 rounded-full">
                  {variety.conservationStatus}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Ketinggian</span>
                <span className="text-base font-semibold text-neutral-800">{variety.altitude}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Jenis Lahan</span>
                <span className="text-base font-semibold text-neutral-800">{variety.landType}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Curah Hujan</span>
                <span className="text-base font-semibold text-neutral-800">{variety.rainfall}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Tabs list */}
      <div className="space-y-6">
        <div className="flex justify-center border-b border-primary/20 pb-0.5">
          <div className="flex space-x-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-lg font-bold pb-3.5 transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="py-2">
          
          {/* GALERI TAB PANEL */}
          {activeTab === 'galeri' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fadeIn">
              {variety.images.map((img, index) => (
                <div 
                  key={index}
                  className="aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm cursor-zoom-in hover:shadow-md transition-all duration-200"
                >
                  <img 
                    src={img} 
                    alt={`Galeri ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* KALENDER TANAM ADAT TAB PANEL */}
          {activeTab === 'kalender' && (
            <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm animate-fadeIn">
              {/* Calendar header bar */}
              <div className="bg-secondary text-white px-6 py-4 flex items-center justify-between">
                <button className="p-1 hover:bg-white/10 rounded transition-all">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <CalendarIcon size={18} />
                  <span className="font-bold text-base md:text-lg">
                    {calendarMonth} {calendarYear}
                  </span>
                </div>
                <button className="p-1 hover:bg-white/10 rounded transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Day names row */}
              <div className="grid grid-cols-7 bg-neutral-100 text-neutral-500 font-bold text-center text-xs border-b border-neutral-200">
                <div className="py-3 border-r">MON</div>
                <div className="py-3 border-r">TUE</div>
                <div className="py-3 border-r">WED</div>
                <div className="py-3 border-r">THUR</div>
                <div className="py-3 border-r">FRI</div>
                <div className="py-3 border-r">SAT</div>
                <div className="py-3">SUN</div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 text-left border-l">
                {renderCalendarDays()}
              </div>
            </div>
          )}

          {/* PRAKTIK LOKAL TAB PANEL */}
          {activeTab === 'praktik' && (
            <div className="space-y-6 animate-fadeIn">
              {variety.practices.map((practice) => (
                <div 
                  key={practice.id}
                  className="bg-secondary/10 border border-secondary/20 hover:border-secondary/40 rounded-xl p-6 flex flex-col md:flex-row gap-6 transition-all duration-200 shadow-sm"
                >
                  <img 
                    src={practice.image} 
                    alt={practice.title}
                    className="w-full md:w-56 h-36 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex flex-col justify-center space-y-3">
                    <h3 className="text-lg md:text-xl font-extrabold text-secondary">
                      {practice.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed font-light">
                      {practice.description}
                    </p>
                  </div>
                </div>
              ))}

              {variety.practices.length === 0 && (
                <div className="py-12 text-center text-neutral-500 bg-neutral-50 rounded-xl border border-dashed">
                  Belum ada catatan praktik lokal untuk varietas ini.
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
