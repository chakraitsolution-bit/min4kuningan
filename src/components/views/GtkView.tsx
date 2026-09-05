import React, { useState, useMemo } from 'react';
import { 
  UserCheck, 
  Search, 
  ArrowLeft, 
  Eye, 
  X, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  BookOpen,
  Filter,
  Edit3
} from 'lucide-react';
import { GTKMember, UserAccount, ActiveView, SchoolProfile } from '../../types';
import { maskNip } from '../../utils';

interface GtkViewProps {
  gtkList: GTKMember[];
  profile?: SchoolProfile;
  currentUser: UserAccount | null;
  setActiveView: (view: ActiveView) => void;
  onEditInAdmin?: (section: string) => void;
}

export const GtkView: React.FC<GtkViewProps> = ({
  gtkList = [],
  profile,
  currentUser,
  setActiveView,
  onEditInAdmin,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('Semua');
  const [selectedGtk, setSelectedGtk] = useState<GTKMember | null>(null);
  const [copiedNip, setCopiedNip] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  // Filter list by search term and role
  const filteredGtkList = useMemo(() => {
    return gtkList.filter((gtk) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !term ||
        gtk.name.toLowerCase().includes(term) ||
        gtk.nip.toLowerCase().includes(term) ||
        gtk.role.toLowerCase().includes(term) ||
        gtk.subject.toLowerCase().includes(term) ||
        gtk.education.toLowerCase().includes(term);

      const matchesRole = 
        selectedRoleFilter === 'Semua' ||
        (selectedRoleFilter === 'Pimpinan' && (gtk.role.toLowerCase().includes('kepala') || gtk.role.toLowerCase().includes('wakil'))) ||
        (selectedRoleFilter === 'Guru' && gtk.role.toLowerCase().includes('guru')) ||
        (selectedRoleFilter === 'Tendik' && (gtk.role.toLowerCase().includes('tata usaha') || gtk.role.toLowerCase().includes('operator') || gtk.role.toLowerCase().includes('staf') || gtk.role.toLowerCase().includes('tendik')));

      return matchesSearch && matchesRole;
    });
  }, [gtkList, searchTerm, selectedRoleFilter]);

  // Current GTK index for next/prev navigation in modal
  const currentIndex = useMemo(() => {
    if (!selectedGtk) return -1;
    return filteredGtkList.findIndex((item) => item.id === selectedGtk.id);
  }, [selectedGtk, filteredGtkList]);

  const handleNextGtk = () => {
    if (currentIndex >= 0 && currentIndex < filteredGtkList.length - 1) {
      setSelectedGtk(filteredGtkList[currentIndex + 1]);
      setCopiedNip(false);
    }
  };

  const handlePrevGtk = () => {
    if (currentIndex > 0) {
      setSelectedGtk(filteredGtkList[currentIndex - 1]);
      setCopiedNip(false);
    }
  };

  const handleCopyNip = (nip: string) => {
    navigator.clipboard.writeText(nip).then(() => {
      setCopiedNip(true);
      setTimeout(() => setCopiedNip(false), 2000);
    });
  };

  // Keyboard navigation for modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedGtk) return;
      if (e.key === 'Escape') setSelectedGtk(null);
      if (e.key === 'ArrowRight') handleNextGtk();
      if (e.key === 'ArrowLeft') handlePrevGtk();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGtk, currentIndex, filteredGtkList]);

  return (
    <div className="space-y-6">
      {/* Container Utama Daftar Informasi GTK */}
      <div 
        id="info-gtk-container"
        className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden"
      >
        {/* Header Bersih Khusus Info GTK */}
        <div className="bg-gradient-to-r from-[#0B2545] to-[#047857] p-6 sm:p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 text-xs">
            <button
              id="btn-back-home"
              onClick={() => {
                setActiveView('beranda');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-300" />
              <span>Kembali ke Beranda</span>
            </button>

            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[11px] font-semibold">
                <ShieldCheck className="w-3 h-3 mr-1 text-emerald-300" />
                Data Resmi Madrasah
              </span>

              {isAdmin && onEditInAdmin && (
                <button
                  onClick={() => onEditInAdmin('informasi')}
                  className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Kelola GTK (Admin)</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center space-x-3.5">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/20 text-emerald-300">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">
                Tenaga Pendidik & Kependidikan
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                Daftar Informasi GTK
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                Pendidik dan Tenaga Kependidikan {profile?.nama || 'MIN 4 Kuningan'}
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar: Pencarian & Filter & Petunjuk Klik */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Input Pencarian */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="search-gtk-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama guru, NIP, jabatan, mapel..."
                className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-2xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Kategori Filter Peran */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
              {['Semua', 'Pimpinan', 'Guru', 'Tendik'].map((filterName) => (
                <button
                  key={filterName}
                  onClick={() => setSelectedRoleFilter(filterName)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedRoleFilter === filterName
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {filterName}
                </button>
              ))}
            </div>
          </div>

          {/* Banner Petunjuk Interaktif */}
          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                Menampilkan <strong className="text-slate-900">{filteredGtkList.length}</strong> dari{' '}
                <strong className="text-slate-900">{gtkList.length}</strong> GTK terdaftar
              </span>
            </span>
            <span className="hidden sm:inline-flex items-center text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              💡 Klik baris tabel mana saja untuk melihat info GTK selengkapnya
            </span>
          </div>
        </div>

        {/* Tabel Informasi GTK dengan Foto */}
        <div className="overflow-x-auto">
          <table 
            id="tabel-informasi-gtk"
            className="w-full text-left text-xs border-collapse"
          >
            <thead className="bg-slate-100/90 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200 text-[11px]">
              <tr>
                <th scope="col" className="py-3.5 px-4 text-center w-12">No</th>
                <th scope="col" className="py-3.5 px-4 text-center w-20">Foto</th>
                <th scope="col" className="py-3.5 px-4">Nama Lengkap & NIP</th>
                <th scope="col" className="py-3.5 px-4">Jabatan</th>
                <th scope="col" className="py-3.5 px-4 hidden md:table-cell">Mata Pelajaran / Tugas</th>
                <th scope="col" className="py-3.5 px-4 hidden lg:table-cell">Pendidikan</th>
                <th scope="col" className="py-3.5 px-4 text-center w-28">Info Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGtkList.length > 0 ? (
                filteredGtkList.map((gtk, idx) => (
                  <tr
                    key={gtk.id}
                    id={`gtk-row-${gtk.id}`}
                    onClick={() => {
                      setSelectedGtk(gtk);
                      setCopiedNip(false);
                    }}
                    className="hover:bg-emerald-50/70 active:bg-emerald-100/60 transition-colors cursor-pointer group"
                    title="Klik untuk melihat info GTK selengkapnya"
                  >
                    {/* Nomor Urut */}
                    <td className="py-3 px-4 text-center text-slate-500 font-medium">
                      {idx + 1}
                    </td>

                    {/* Foto GTK */}
                    <td className="py-3 px-4 text-center">
                      <div className="relative inline-block">
                        <img
                          src={gtk.photo}
                          alt={gtk.name}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-emerald-600/40 shadow-xs group-hover:scale-105 group-hover:border-emerald-600 transition-transform duration-200 bg-slate-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                      </div>
                    </td>

                    {/* Nama Lengkap & NIP */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors text-sm sm:text-xs md:text-sm">
                        {gtk.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center space-x-1">
                        <span>NIP:</span>
                        <span className="font-medium text-slate-700">{maskNip(gtk.nip)}</span>
                      </div>
                      {/* Tampilan responsif untuk mapel di layar mobile */}
                      <div className="md:hidden mt-1 text-[11px] text-slate-600">
                        <span className="text-slate-400">Mapel: </span>
                        <span>{gtk.subject}</span>
                      </div>
                    </td>

                    {/* Jabatan */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 group-hover:bg-emerald-100 transition-colors">
                        {gtk.role}
                      </span>
                    </td>

                    {/* Mata Pelajaran / Bidang Tugas */}
                    <td className="py-3 px-4 hidden md:table-cell text-slate-700 font-medium">
                      {gtk.subject}
                    </td>

                    {/* Pendidikan Terakhir */}
                    <td className="py-3 px-4 hidden lg:table-cell text-slate-600">
                      <div className="flex items-center space-x-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{gtk.education}</span>
                      </div>
                    </td>

                    {/* Tombol Aksi Detail */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGtk(gtk);
                          setCopiedNip(false);
                        }}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-700 group-hover:bg-emerald-600 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Detail</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <UserCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-slate-700">Data GTK tidak ditemukan</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Coba ganti kata kunci pencarian atau bersihkan filter peran.
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedRoleFilter('Semua');
                        }}
                        className="mt-3 px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Ringkas Tabel */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-slate-700">
              Total Tenaga GTK: {gtkList.length} orang
            </span>
            <span>•</span>
            <span>MIN 4 Kuningan</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Pembaruan berkala melalui EMIS Kemenag
          </div>
        </div>
      </div>

      {/* ========================================================
          MODAL DETAIL INFO GTK LENGKAP
          Muncul ketika salah satu baris tabel GTK diklik
         ======================================================== */}
      {selectedGtk && (
        <div 
          id="gtk-detail-modal-backdrop"
          onClick={() => setSelectedGtk(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div 
            id="gtk-detail-modal-content"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B2545] to-[#047857] p-5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-xs">
                  <UserCheck className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Profil Lengkap GTK</h3>
                  <p className="text-[11px] text-emerald-200">
                    Tenaga Pendidik & Kependidikan MIN 4 Kuningan
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {/* Tombol Tutup */}
                <button
                  id="btn-close-gtk-modal"
                  onClick={() => setSelectedGtk(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Profil Detail GTK */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Header Kartu GTK dengan Foto Besar */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-slate-50 border border-emerald-100">
                <div className="relative flex-shrink-0">
                  <img
                    src={selectedGtk.photo}
                    alt={selectedGtk.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-3 border-emerald-600 shadow-md bg-white"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-emerald-600 text-white shadow-xs border-2 border-white">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-700 text-white shadow-2xs">
                    {selectedGtk.role}
                  </span>

                  <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {selectedGtk.name}
                  </h2>

                  {/* NIP dengan Tombol Salin */}
                  <div className="inline-flex items-center space-x-2 bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs">
                    <span>NIP: {selectedGtk.nip ? maskNip(selectedGtk.nip) : 'Belum Terdaftar'}</span>
                    {selectedGtk.nip && (
                      <button
                        onClick={() => handleCopyNip(maskNip(selectedGtk.nip))}
                        title="Salin NIP"
                        className="text-emerald-700 hover:text-emerald-800 cursor-pointer"
                      >
                        {copiedNip ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                  {copiedNip && (
                    <span className="text-[10px] text-emerald-600 font-semibold ml-2">
                      NIP berhasil disalin!
                    </span>
                  )}
                </div>
              </div>

              {/* Rincian Atribut Informasi Lengkap GTK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Jabatan */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold uppercase text-[10px]">Jabatan / Tugas Pokok</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {selectedGtk.role}
                  </p>
                </div>

                {/* Mata Pelajaran / Bidang */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold uppercase text-[10px]">Bidang / Mata Pelajaran</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {selectedGtk.subject || '-'}
                  </p>
                </div>

                {/* Kualifikasi Pendidikan */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold uppercase text-[10px]">Pendidikan Terakhir</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {selectedGtk.education || '-'}
                  </p>
                </div>

                {/* Satuan Kerja */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold uppercase text-[10px]">Satuan Kerja</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {profile?.nama || 'MIN 4 Kuningan'}
                  </p>
                </div>
              </div>

              {/* Status & Legalisasi */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5">
                <div className="flex items-center space-x-1.5 text-emerald-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Status Kepegawaian & Kualifikasi:</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Tercatat aktif dalam data Pendidik dan Tenaga Kependidikan Kementerian Agama Kabupaten Kuningan. Bertugas melaksanakan tugas pembelajaran dan kependidikan di lingkungan MIN 4 Kuningan.
                </p>
              </div>
            </div>

            {/* Modal Footer: Navigasi Sebelumnya / Selanjutnya & Tutup */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handlePrevGtk}
                  disabled={currentIndex <= 0}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
                    currentIndex > 0
                      ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-transparent'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  onClick={handleNextGtk}
                  disabled={currentIndex >= filteredGtkList.length - 1}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
                    currentIndex < filteredGtkList.length - 1
                      ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-transparent'
                  }`}
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setSelectedGtk(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
