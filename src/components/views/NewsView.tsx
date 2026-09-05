import React, { useState } from 'react';
import { Newspaper, Search, Calendar, Eye, ArrowRight, ArrowLeft, Tag, Sparkles } from 'lucide-react';
import { NewsItem, ActiveView } from '../../types';

interface NewsViewProps {
  news: NewsItem[];
  setActiveView: (view: ActiveView) => void;
  onSelectNews: (item: NewsItem) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  news,
  setActiveView,
  onSelectNews,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Prestasi', 'Akademik', 'Kegiatan', 'Pengumuman', 'Keagamaan'];

  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <Newspaper className="w-6 h-6 text-emerald-700" />
            <span>Warta & Berita MIN 4 Kuningan</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Semua publikasi informasi, prestasi, dan aktivitas terkini
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berita atau kegiatan..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-hidden bg-slate-50/50"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
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

      {/* News Grid (All Thumbnails as requested in 3.c) */}
      {filteredNews.length === 0 ? (
        <div className="p-12 text-center text-slate-400 space-y-2">
          <Newspaper className="w-10 h-10 mx-auto text-slate-300" />
          <p className="text-sm font-medium">Tidak ada berita yang sesuai dengan pencarian Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative h-44 overflow-hidden bg-slate-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-800/90 text-white shadow-sm uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center space-x-3 text-[10px] text-slate-400">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {item.views} views
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
