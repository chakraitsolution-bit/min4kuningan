import React from 'react';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  GraduationCap, 
  Sparkles, 
  Users, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Star,
  Quote
} from 'lucide-react';
import { AppStateData, ActiveView, NewsItem } from '../../types';
import { maskNip } from '../../utils';

interface HomeViewProps {
  data: AppStateData;
  setActiveView: (view: ActiveView) => void;
  onSelectNews: (news: NewsItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  data,
  setActiveView,
  onSelectNews,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Sambutan Kepala Madrasah Section */}
      <section 
        id="sambutan-kepala-section"
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 text-center md:text-left">
            <div className="relative inline-block">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-emerald-600/80 shadow-md bg-slate-100">
                <img
                  src={data.profile.fotoKepala}
                  alt={data.profile.kepalaMadrasah}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
              <span className="absolute -bottom-2 -right-2 bg-emerald-700 text-white p-1.5 rounded-xl text-xs shadow-md">
                <Award className="w-4 h-4 text-amber-300" />
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold uppercase tracking-wider">
                Sambutan Kepala Madrasah
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Selamat Datang di {data.profile.nama}
            </h2>

            <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
              <Quote className="w-5 h-5 text-emerald-600/30 mb-1" />
              {data.profile.sambutan}
            </div>

            <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-slate-800">{data.profile.kepalaMadrasah}</p>
                <p className="text-[11px] text-slate-500">Kepala Madrasah • NIP: {maskNip(data.profile.nip)}</p>
              </div>

              <button
                onClick={() => {
                  setActiveView('sejarah');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0B2545] hover:bg-[#064E3B] text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                <span>Baca Sejarah Madrasah</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Program & Keunggulan Madrasah (Bento Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Layanan & Program Unggulan
            </h3>
            <p className="text-xs text-slate-500">
              Pilar keunggulan pendidikan madrasah berstandar mutu terpadu
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            onClick={() => { setActiveView('visimisi'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-emerald-300 cursor-pointer group space-y-2.5"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
              Tahfidz Qur'an Juz 30
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Program halaqah intensif pagi dan bimbingan tahsin berirama hingga lulus menuntaskan hafalan Juz 30.
            </p>
            <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 group-hover:underline">
              Lihat Detail Visi Misi <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>

          <div 
            onClick={() => { setActiveView('tujuan'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-emerald-300 cursor-pointer group space-y-2.5"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
              Sains & Smart Classroom
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pembelajaran berbasis IT multimedia, laboratorium komputer modern, dan bimbingan intensif KSM.
            </p>
            <span className="inline-flex items-center text-[11px] font-semibold text-blue-700 group-hover:underline">
              Lihat Tujuan Madrasah <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>

          <div 
            onClick={() => { setActiveView('kesiswaan'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-emerald-300 cursor-pointer group space-y-2.5 sm:col-span-2 lg:col-span-1"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
              Ekstrakurikuler & Karakter
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pramuka Gugus Depan, Marawis, Hadroh, Tapak Suci, Dokter Kecil UKS, dan pembiasaan shalat dhuha.
            </p>
            <span className="inline-flex items-center text-[11px] font-semibold text-amber-800 group-hover:underline">
              Lihat Kesiswaan <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>
      </section>

      {/* Berita Utama & Berita Terbaru */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Berita & Informasi Terbaru
            </h3>
            <p className="text-xs text-slate-500">
              Update kabar, prestasi, dan kegiatan madrasah
            </p>
          </div>
          <button
            onClick={() => {
              setActiveView('berita');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>Lihat Semua Berita</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.news.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-800/90 text-white shadow-sm backdrop-blur-xs uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {item.views} views
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cuplikan Galeri Foto */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Galeri Kegiatan Madrasah
            </h3>
            <p className="text-xs text-slate-500">
              Dokumentasi aktivitas, fasilitas, dan prestasi MIN 4 Kuningan
            </p>
          </div>
          <button
            onClick={() => {
              setActiveView('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>Lihat Semua Foto ({data.gallery.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.gallery.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveView('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative rounded-xl overflow-hidden h-32 group cursor-pointer border border-slate-200 shadow-xs"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 inset-x-2 text-white text-[11px] font-medium line-clamp-1">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
