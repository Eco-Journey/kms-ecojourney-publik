import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Varietas from './pages/Varietas';
import DetailVarietas from './pages/DetailVarietas';
import PetaSebaran from './pages/PetaSebaran';
import Pengetahuan from './pages/Pengetahuan';
import DetailPengetahuan from './pages/DetailPengetahuan';
import DetailDesa from './pages/DetailDesa';

function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedVarietyId, setSelectedVarietyId] = useState<string | null>(null);
  const [searchQueryFromNav, setSearchQueryFromNav] = useState<string>('');

  // Handle global search from Navbar
  const handleSearch = (query: string) => {
    setSearchQueryFromNav(query);
    setCurrentRoute('varietas');
  };

  // Handle variety select and route redirect
  const handleSelectVariety = (id: string) => {
    setSelectedVarietyId(id);
    setCurrentRoute(`detail-varietas-${id}`);
  };

  // State-based routing renderer
  const renderContent = () => {
    if (currentRoute === 'home') {
      return (
        <Home 
          setCurrentRoute={setCurrentRoute} 
          setSelectedVarietyId={handleSelectVariety} 
        />
      );
    }
    
    if (currentRoute === 'peta') {
      return (
        <PetaSebaran 
          onSelectVariety={handleSelectVariety} 
        />
      );
    }
    
    if (currentRoute === 'varietas') {
      return (
        <Varietas 
          onSelectVariety={handleSelectVariety} 
          searchQueryFromNav={searchQueryFromNav}
        />
      );
    }
    
    if (currentRoute === 'pengetahuan') {
      return (
        <Pengetahuan 
          setCurrentRoute={setCurrentRoute} 
        />
      );
    }

    // Handle detail routes
    if (currentRoute.startsWith('detail-varietas-')) {
      const varietyId = currentRoute.replace('detail-varietas-', '');
      return (
        <DetailVarietas 
          varietyId={varietyId} 
          onBack={() => setCurrentRoute('varietas')} 
          setCurrentRoute={setCurrentRoute}
        />
      );
    }

    if (currentRoute.startsWith('detail-pengetahuan-')) {
      const articleId = currentRoute.replace('detail-pengetahuan-', '');
      return (
        <DetailPengetahuan 
          articleId={articleId} 
          onBack={() => setCurrentRoute('pengetahuan')} 
        />
      );
    }

    if (currentRoute.startsWith('detail-desa-')) {
      const villageId = currentRoute.replace('detail-desa-', '');
      return (
        <DetailDesa 
          villageId={villageId} 
          onBack={() => setCurrentRoute('peta')} 
          setCurrentRoute={setCurrentRoute}
          setSelectedVarietyId={setSelectedVarietyId}
        />
      );
    }

    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-primary">Halaman tidak ditemukan</h2>
        <button 
          onClick={() => setCurrentRoute('home')} 
          className="bg-primary text-white px-6 py-2.5 rounded font-semibold hover:bg-primary-light transition-all"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutralBg font-sans">
      {/* Global Navbar */}
      <Navbar 
        currentRoute={currentRoute} 
        setCurrentRoute={setCurrentRoute} 
        onSearch={handleSearch}
      />
      
      {/* Main Content viewport */}
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      {/* Global Footer */}
      <Footer setCurrentRoute={setCurrentRoute} />
    </div>
  );
}

export default App;
