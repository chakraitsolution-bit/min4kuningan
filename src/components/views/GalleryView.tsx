import React, { useState } from 'react';
import { Image as ImageIcon, ArrowLeft, X, Calendar, MapPin, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem, ActiveView } from '../../types';

interface GalleryViewProps {
  gallery: GalleryItem[];
  setActiveView: (view: ActiveView) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  gallery,
  setActiveView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['Semua', 'Kegiatan', 'Prestasi', 'Fasilitas', 'Pembelajaran', 'Ekstrakurikuler'];

  const filteredGallery = gallery.filter((item) => {
    return selectedCategory === 'Semua' || item.category === selectedCategory;
  });

  const activePhoto = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  const prevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredGallery.length - 1 : lightboxIndex - 1);
  };

  const nextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <button
            onClick={() => {
              setActiveView('beranda');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center space-x-2">
            <ImageIcon className="w-6 h-6 text-emerald-700" />
            <span>Galeri Foto MIN 4 Kuningan</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dokumentasi visual aktivitas belajar, fasilitas, pembiasaan karakter, dan prestasi
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          Total {gallery.length} Foto Tersimpan
        </span>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setLightboxIndex(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredGallery.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer h-60 flex flex-col justify-end"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            <div className="relative z-10 p-4 space-y-1 text-white">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white mb-1 uppercase">
                {item.category}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1 group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center space-x-2 text-[10px] text-slate-400 pt-1">
                <span>{item.date}</span>
                {item.location && <span>• {item.location}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left arrow */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-emerald-600 text-white transition-all shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right arrow */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-emerald-600 text-white transition-all shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <div className="relative max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 text-white bg-slate-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-400">
                  Foto {lightboxIndex! + 1} dari {filteredGallery.length}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activePhoto.description}
              </p>
              {activePhoto.location && (
                <div className="flex items-center text-xs text-emerald-300 pt-1">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  <span>{activePhoto.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
