import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar({ currentRoute, setCurrentRoute, onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'peta', label: 'Peta Sebaran' },
    { id: 'varietas', label: 'Varietas' },
    { id: 'pengetahuan', label: 'Pengetahuan' },
  ];

  const handleNavClick = (routeId) => {
    setCurrentRoute(routeId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Logo/Nama Website
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[16px] lg:text-[18px] font-medium transition-colors duration-200 py-2 hover:text-accent-light border-b-2 ${
                  currentRoute === item.id || (item.id === 'varietas' && currentRoute.startsWith('detail-'))
                    ? 'border-accent text-accent'
                    : 'border-transparent text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search, Signin, Register */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Hinted search text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1f301e] text-white placeholder-white/40 text-[14px] rounded-md pl-4 pr-10 py-2 w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-accent-light/50 transition-all border border-transparent"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-white/60 hover:text-white">
                <Search size={18} />
              </button>
            </form>

            <button className="bg-white text-primary hover:bg-neutralBg font-bold text-[14px] px-5 py-2 rounded-md transition-all active:scale-95">
              Sign in
            </button>
            <button className="bg-[#1e2d42] hover:bg-[#2b3f5c] text-white font-bold text-[14px] px-5 py-2 rounded-md transition-all active:scale-95 border border-[#2b3f5c]">
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-light border-t border-white/10 px-4 pt-2 pb-6 space-y-4 shadow-inner">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  currentRoute === item.id
                    ? 'bg-primary text-accent font-bold'
                    : 'text-white/80 hover:bg-primary hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Hinted search text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1f301e] text-white placeholder-white/40 text-sm rounded-md pl-4 pr-10 py-2.5 w-full focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-3 text-white/60">
                <Search size={18} />
              </button>
            </form>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white text-primary hover:bg-neutralBg font-bold text-sm py-2.5 rounded-md transition-all text-center">
                Sign in
              </button>
              <button className="bg-[#1e2d42] hover:bg-[#2b3f5c] text-white font-bold text-sm py-2.5 rounded-md transition-all text-center">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
