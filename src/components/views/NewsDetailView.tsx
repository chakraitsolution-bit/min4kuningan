import React from 'react';
import { ArrowLeft, Calendar, Eye, User, Share2, Tag, Printer, Sparkles, Newspaper } from 'lucide-react';
import { NewsItem, ActiveView } from '../../types';

interface NewsDetailViewProps {
  newsItem: NewsItem;
  allNews: NewsItem[];
  setActiveView: (view: ActiveView) => void;
  onSelectNews: (item: NewsItem) => void;
}

export const NewsDetailView: React.FC<NewsDetailViewProps> = ({
  newsItem,
  allNews,
  setActiveView,
  onSelectNews,
}) => {
  const relatedNews = allNews.filter((n) => n.id !== newsItem.id).slice(0, 3);

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden animate-in fade-in duration-200">
      {/* Top Header & Breadcrumb */}
      <div className="p-6 sm:p-8 border-b border-slate-100 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <button
            onClick={() => {
              setActiveView('berita');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-1.5 text-emerald-700 hover:text-emerald-800 font-semibold transition-colors bg-emerald-50 px-3 py-1.5 rounded-full"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Berita</span>
          </button>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-800 text-white uppercase tracking-wider">
            {newsItem.category}
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">
          {newsItem.title}
        </h1>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center">
            <User className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
            Penulis: <strong className="ml-1 text-slate-700">{newsItem.author}</strong>
          </span>
          <span className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
            Tanggal: <strong className="ml-1 text-slate-700">{newsItem.date}</strong>
          </span>
          <span className="flex items-center">
            <Eye className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
            Dibaca: <strong className="ml-1 text-slate-700">{newsItem.views} kali</strong>
          </span>

          <div className="ml-auto">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Berita</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Thumbnail Image */}
      <div className="w-full max-h-[460px] overflow-hidden bg-slate-900 relative">
        <img
          src={newsItem.thumbnail}
          alt={newsItem.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80';
          }}
        />
      </div>

      {/* Content Text */}
      <div className="p-6 sm:p-10 space-y-6">
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-950 italic leading-relaxed">
          &ldquo;{newsItem.summary}&rdquo;
        </div>

        <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
          {newsItem.content}
        </div>

        {/* Tags */}
        {newsItem.tags && newsItem.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center mr-1">
              <Tag className="w-3.5 h-3.5 mr-1" /> Label Tag:
            </span>
            {newsItem.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="pt-8 border-t border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
              <Newspaper className="w-4 h-4 text-emerald-700" />
              <span>Berita & Kabar Lainnya</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedNews.map((rn) => (
                <div
                  key={rn.id}
                  onClick={() => {
                    onSelectNews(rn);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer group p-3 space-y-2"
                >
                  <div className="h-28 rounded-xl overflow-hidden bg-slate-200">
                    <img
                      src={rn.thumbnail}
                      alt={rn.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 line-clamp-2 leading-snug">
                    {rn.title}
                  </h4>
                  <p className="text-[10px] text-slate-400">{rn.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation bottom */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              setActiveView('berita');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Semua Berita</span>
          </button>
        </div>
      </div>
    </article>
  );
};
