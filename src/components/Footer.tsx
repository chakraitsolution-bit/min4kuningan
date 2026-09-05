import React from 'react';
import { Phone, MessageCircle, Heart, Shield, School, MapPin, Mail, ExternalLink } from 'lucide-react';
import { AppStateData } from '../types';

interface FooterProps {
  data: AppStateData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const waContact = (data.about?.contact?.whatsapp || '081460370700').replace(/[^0-9]/g, '');
  const formattedWa = waContact.startsWith('0') ? '62' + waContact.slice(1) : waContact;
  const whatsappUrl = `https://wa.me/${formattedWa}?text=${encodeURIComponent('Halo MIN 4 Kuningan / ChakraITSolutions, saya menghubungi melalui Portal Website Resmi MIN 4 Kuningan')}`;

  const displayWa = data.about?.contact?.whatsapp || data.profile.telepon || '081460370700';

  return (
    <>
      {/* Upper Content Footer (for rich information) */}
      <footer className="bg-[#091D3E] text-slate-300 border-t border-emerald-900/60 pt-10 pb-20 sm:pb-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Madrasah Profile */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-white rounded-lg">
                  <img
                    src={data.settings.logoUrl}
                    alt="Logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white leading-tight">
                    {data.profile.nama}
                  </h4>
                  <p className="text-[11px] text-emerald-400 font-semibold">
                    Kemenag Kab. Kuningan
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Madrasah Ibtidaiyah Negeri 4 Kuningan bertekad mewujudkan generasi muslim yang berakhlak mulia, cerdas, berprestasi, dan berwawasan teknologi.
              </p>
              <div className="pt-1 text-[11px] text-slate-400">
                <span className="font-semibold text-white">NSM:</span> {data.profile.nsm} | <span className="font-semibold text-white">NPSN:</span> {data.profile.npsm}
              </div>
            </div>

            {/* Column 2: Alamat & Kontak */}
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider border-b border-blue-800/80 pb-1.5 flex items-center">
                <MapPin className="w-4 h-4 mr-1.5 text-emerald-400" />
                Kontak & Alamat
              </h5>
              <div className="space-y-2 text-xs text-slate-300">
                <p className="leading-relaxed">
                  {data.profile.alamat}
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{data.profile.telepon}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{data.profile.email}</span>
                </p>
              </div>
            </div>

            {/* Column 3: Jam Layanan & Akreditasi */}
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider border-b border-blue-800/80 pb-1.5 flex items-center">
                <School className="w-4 h-4 mr-1.5 text-emerald-400" />
                Informasi Layanan
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• Status: <strong className="text-white">{data.profile.status}</strong></li>
                <li>• Akreditasi: <strong className="text-amber-300">{data.profile.akreditasi}</strong></li>
                <li>• Kurikulum: <span className="text-white">{data.profile.kurikulum || 'Kurikulum Merdeka Terpadu'}</span></li>
                <li>• Jam Belajar: <span className="text-slate-300">{data.profile.jamBelajar || '07.00 - 14.30 WIB'}</span></li>
              </ul>
            </div>

            {/* Column 4: Pengembang IT */}
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider border-b border-blue-800/80 pb-1.5 flex items-center">
                <Shield className="w-4 h-4 mr-1.5 text-amber-400" />
                Pengembang Website
              </h5>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-blue-900/60 space-y-2">
                <div className="text-xs font-bold text-amber-300">
                  ChakraITSolutions
                </div>
                <p className="text-[11px] text-slate-300">
                  Layanan Solusi Sistem Informasi, Web Madrasah, & Aplikasi Manajemen Pendidikan.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Hubungi WA: {displayWa}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* FIXED BOTTOM BAR (Posisi footer tidak bergerak pada saat halaman web di scroll) */}
      <div 
        id="fixed-bottom-footer-bar"
        className="fixed bottom-0 inset-x-0 z-40 bg-[#051326] text-white border-t-2 border-emerald-600 shadow-2xl py-2 px-4 select-none backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left text-xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-2">
            <span className="text-slate-400">
              © Hak Cipta MIN 4 Kuningan.
            </span>
            <span className="text-emerald-400 font-semibold">
              Dibuat oleh ChakraITSolutions
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 font-bold text-amber-300 hover:text-amber-200 transition-colors bg-emerald-950/80 border border-emerald-600/60 px-2.5 py-0.5 rounded-full"
            >
              <Phone className="w-3 h-3 text-emerald-400 mr-0.5" />
              <span>Kontak WA: {displayWa}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
