import React from 'react';
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

interface FooterProps {
  setCurrentRoute: (route: string) => void;
}

export default function Footer({ setCurrentRoute }: FooterProps) {
  const socialLinks = [
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Youtube size={20} />, href: "#", label: "YouTube" },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-2xl font-extrabold tracking-tight cursor-pointer block" onClick={() => setCurrentRoute('home')}>
              Logo/Nama Website
            </span>
            <p className="text-white/70 text-[14px] leading-relaxed max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non libero semper, placerat sem eget, cursus eros. Quisque vulputate mauris nibh, id dignissim felis pellentesque vel. Vivamus non faucibus velit. Cras ac aliquam sem..
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-primary transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer for spacing in grid */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Exploration Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[16px] font-bold tracking-wider uppercase text-accent-light">
              Eksplorasi
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setCurrentRoute('peta')} className="text-white/70 hover:text-white transition-colors duration-200 text-[14px] text-left">
                  Peta Sebaran Varietas
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('pengetahuan')} className="text-white/70 hover:text-white transition-colors duration-200 text-[14px] text-left">
                  Repositori Pengetahuan
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentRoute('varietas')} className="text-white/70 hover:text-white transition-colors duration-200 text-[14px] text-left">
                  Katalog Varietas
                </button>
              </li>
            </ul>
          </div>

          {/* Contribution Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[16px] font-bold tracking-wider uppercase text-accent-light">
              Kontribusi
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-[14px]">
                  Cara Berkontribusi
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-[14px]">
                  Proses Validasi Pengetahuan
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-200 text-[14px]">
                  Metodologi Pengumpulan Data
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Info Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[16px] font-bold tracking-wider uppercase text-accent-light">
              Kolaborasi & Informasi
            </h3>
            <div className="space-y-3 text-[14px] text-white/70">
              <div>
                <span className="font-bold text-white block">Email:</span>
                <a href="mailto:kms@contoh.id" className="hover:text-white transition-colors">
                  kms@contoh.id
                </a>
              </div>
              <div>
                <span className="font-bold text-white block">Institusi:</span>
                <span>Pusat Kajian Pengetahuan Lokal dan Keanekaragaman Hayati</span>
              </div>
              <div>
                <span className="font-bold text-white block">Alamat:</span>
                <span>Jalan Sutioso No. 5</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-[12px]">
          &copy; {new Date().getFullYear()} KMS SDG Pertanian. Seluruh hak cipta dilindungi undang-undang.
        </div>
      </div>
    </footer>
  );
}
