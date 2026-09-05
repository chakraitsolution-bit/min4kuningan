import React from 'react';
import { 
  Award, 
  ChevronRight, 
  Quote, 
  History, 
  Compass, 
  Target, 
  Users, 
  GraduationCap, 
  UserCheck, 
  Newspaper, 
  Calendar,
  Eye,
  ArrowRight
} from 'lucide-react';
import { AppStateData, ActiveView, NewsItem, InfoCategoryKey } from '../types';
import { maskNip } from '../utils';

interface RightSidebarProps {
  data: AppStateData;
  setActiveView: (view: ActiveView) => void;
  onSelectNews: (news: NewsItem) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  data,
  setActiveView,
  onSelectNews,
}) => {
  const infoSummaryItems: { key: InfoCategoryKey; title: string; subtitle: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'sejarah', title: 'Sejarah Singkat', subtitle: 'Akar sejarah & penegerian', icon: History },
    { key: 'visimisi', title: 'Visi & Misi', subtitle: 'Arah dan panduan madrasah', icon: Compass },
    { key: 'tujuan', title: 'Tujuan Pendidikan', subtitle: 'Target capaian lulusan', icon: Target },
    { key: 'kemasyarakatan', title: 'Kemasyarakatan', subtitle: 'Sinergi komite & masyarakat', icon: Users },
    { key: 'kesiswaan', title: 'Kesiswaan & Ekskul', subtitle: 'Pramuka, tahfidz, hadroh', icon: GraduationCap },
    { key: 'gtk', title: 'Info GTK', subtitle: 'Profil guru & tenaga kependidikan', icon: UserCheck },
  ];

  // Latest 4 news items
  const recentNews = data.news.slice(0, 4);

  return (
    <aside className="space-y-5">
      {/* 1. POSISI PALING ATAS: FOTO DAN INFORMASI DARI KEPALA MADRASAH */}
      <div 
        id="sidebar-kepala-madrasah-card"
        className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#065F46] to-[#0B2545] p-3 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-xs">
              <Award className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">Kepala Madrasah</h3>
              <p className="text-[10px] text-emerald-200">Pimpinan MIN 4 Kuningan</p>
            </div>
          </div>
        </div>

        <div className="p-4 text-center space-y-3">
          <div className="relative inline-block mx-auto">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-emerald-600/80 shadow-md mx-auto bg-slate-100">
              <img
                src={data.profile.fotoKepala}
                alt={data.profile.kepalaMadrasah}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>
            <span className="absolute bottom-1 right-2 bg-emerald-600 text-white p-1 rounded-full text-xs shadow">
              ✓
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-800 leading-snug">
              {data.profile.kepalaMadrasah}
            </h4>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              NIP: {maskNip(data.profile.nip)}
            </p>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-800 rounded-full text-[10px] font-semibold border border-emerald-200">
              Kepala Madrasah Ibtidaiyah Negeri
            </span>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-left relative">
            <Quote className="w-4 h-4 text-emerald-600/40 absolute top-2 right-2" />
            <p className="text-[11px] text-slate-600 italic line-clamp-3 leading-relaxed">
              &ldquo;{data.profile.sambutan.split('\n')[2] || data.profile.motto}&rdquo;
            </p>
          </div>

          <button
            onClick={() => {
              setActiveView('gtk');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-1.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center justify-center space-x-1"
          >
            <span>Lihat Profil GTK Lengkap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. POSISI TENGAH: RINGKASAN DARI INFORMASI */}
      <div 
        id="sidebar-ringkasan-informasi"
        className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#0B2545] to-[#065F46] p-3 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-xs">
              <Compass className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">Ringkasan Informasi</h3>
              <p className="text-[10px] text-emerald-200">Menu & Dokumen Madrasah</p>
            </div>
          </div>
        </div>

        <div className="p-2.5 space-y-1.5">
          {infoSummaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                id={`summary-info-${item.key}`}
                onClick={() => {
                  setActiveView(item.key);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left p-2 rounded-xl hover:bg-emerald-50/80 transition-all border border-transparent hover:border-emerald-200 group flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-600 transition-colors flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. POSISI BAWAH: RINGKASAN DARI BERITA */}
      <div 
        id="sidebar-ringkasan-berita"
        className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#0B2545] to-[#065F46] p-3 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-xs">
              <Newspaper className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">Ringkasan Berita</h3>
              <p className="text-[10px] text-emerald-200">Kabar & Agenda Terkini</p>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveView('berita');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[10px] text-emerald-200 hover:text-white flex items-center space-x-0.5"
          >
            <span>Semua</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="p-3 space-y-3">
          {recentNews.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="flex items-start space-x-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100 group"
            >
              <div className="w-16 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200 border border-slate-200">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[9px] font-semibold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                  {item.category}
                </span>
                <h5 className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors mt-0.5">
                  {item.title}
                </h5>
                <div className="flex items-center space-x-2 text-[9px] text-slate-400 mt-1">
                  <span className="flex items-center">
                    <Calendar className="w-2.5 h-2.5 mr-0.5" />
                    {item.date}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-2.5 h-2.5 mr-0.5" />
                    {item.views}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button
            id="view-all-news-sidebar-btn"
            onClick={() => {
              setActiveView('berita');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-2 px-3 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-xl text-xs font-semibold border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Buka Semua Berita ({data.news.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
