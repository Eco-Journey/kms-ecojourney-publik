import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Varietas from './pages/Varietas';
import DetailVarietas from './pages/DetailVarietas';
import PetaSebaran from './pages/PetaSebaran';
import Pengetahuan from './pages/Pengetahuan';

function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedVarietyId, setSelectedVarietyId] = useState(null);
  const [searchQueryFromNav, setSearchQueryFromNav] = useState('');

  // Handle global search in Navbar
  const handleSearch = (query) => {
    setSearchQueryFromNav(query);
    setCurrentRoute('varietas');
  };

  // Navigating to detail page
  const handleSelectVariety = (id) => {
    setSelectedVarietyId(id);
    setCurrentRoute(`detail-${id}`);
  };

  // State-based simple routing renderer
  const renderContent = () => {
    switch (currentRoute) {
      case 'home':
        return (
          <Home 
            setCurrentRoute={setCurrentRoute} 
            setSelectedVarietyId={handleSelectVariety} 
          />
        );
      case 'peta':
        return (
          <PetaSebaran 
            onSelectVariety={handleSelectVariety} 
          />
        );
      case 'varietas':
        return (
          <Varietas 
            onSelectVariety={handleSelectVariety} 
            searchQueryFromNav={searchQueryFromNav}
          />
        );
      case 'pengetahuan':
        return (
          <Pengetahuan />
        );
      default:
        // Handle detail variety routes: "detail-varietas-a"
        if (currentRoute.startsWith('detail-')) {
          const varietyId = currentRoute.replace('detail-', '');
          return (
            <DetailVarietas 
              varietyId={varietyId} 
              onBack={() => setCurrentRoute('varietas')} 
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
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutralBg font-sans select-none">
      {/* Global Navbar */}
      <Navbar 
        currentRoute={currentRoute} 
        setCurrentRoute={setCurrentRoute} 
        onSearch={handleSearch}
      />
      
      {/* Main Content Viewport */}
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      {/* Global Footer */}
      <Footer setCurrentRoute={setCurrentRoute} />
    </div>
  );
}

export default App;
