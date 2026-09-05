import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Calendar, Layers } from 'lucide-react';
import { GalleryItem } from '../types';

interface SlideshowProps {
  items: GalleryItem[];
  onExploreGallery?: () => void;
}

export const Slideshow: React.FC<SlideshowProps> = ({ items, onExploreGallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div 
      id="body-top-slideshow"
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-emerald-800/30 bg-slate-900 group select-none mb-6 sm:mb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides container */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover brightness-90"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            {/* Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Slide Content Caption Overlay */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-6 md:p-8 text-white">
        <div className="max-w-2xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600/90 text-white shadow-sm backdrop-blur-xs">
              <Layers className="w-3 h-3 mr-1" />
              {currentItem.category}
            </span>
            {currentItem.location && (
              <span className="hidden sm:inline-flex items-center text-slate-300 text-xs">
                <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                {currentItem.location}
              </span>
            )}
            <span className="inline-flex items-center text-slate-300 text-xs">
              <Calendar className="w-3.5 h-3.5 mr-1 text-amber-400" />
              {currentItem.date}
            </span>
          </div>

          <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
            {currentItem.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 drop-shadow leading-relaxed">
            {currentItem.description}
          </p>
        </div>
      </div>

      {/* Left / Right Arrow Controls */}
      <button
        onClick={prevSlide}
        aria-label="Slide sebelumnya"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-slate-950/50 hover:bg-emerald-700 text-white backdrop-blur-xs transition-all opacity-80 hover:opacity-100 border border-white/20 shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide berikutnya"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-slate-950/50 hover:bg-emerald-700 text-white backdrop-blur-xs transition-all opacity-80 hover:opacity-100 border border-white/20 shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-slate-950/60 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
        {items.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setCurrentIndex(dotIdx)}
            className={`transition-all rounded-full ${
              dotIdx === currentIndex
                ? 'w-6 h-2 bg-emerald-400 shadow-sm'
                : 'w-2 h-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Pindah ke slide ${dotIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
