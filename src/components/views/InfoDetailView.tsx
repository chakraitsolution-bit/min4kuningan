import React, { useState } from 'react';
import { 
  History, 
  Compass, 
  Target, 
  Users, 
  GraduationCap, 
  UserCheck, 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Edit3, 
  Award, 
  BookOpen, 
  Sparkles,
  Share2,
  Printer,
  Plus,
  Trash2,
  X,
  Save,
  Check
} from 'lucide-react';
import { AppStateData, InfoCategoryKey, UserAccount, ActiveView } from '../../types';
import { GtkView } from './GtkView';
import { maskNip } from '../../utils';

interface InfoDetailViewProps {
  infoKey: InfoCategoryKey;
  data: AppStateData;
  currentUser: UserAccount | null;
  setActiveView: (view: ActiveView) => void;
  onEditInAdmin: (section: string) => void;
  onUpdateData?: (newData: AppStateData) => void;
}

export const InfoDetailView: React.FC<InfoDetailViewProps> = ({
  infoKey,
  data,
  currentUser,
  setActiveView,
  onEditInAdmin,
  onUpdateData,
}) => {
  // Ketika pengunjung web memilih menu Info GTK, tampilkan secara khusus daftar informasi GTK berupa tabel dengan foto & klik detail selengkapnya
  if (infoKey === 'gtk') {
    return (
      <GtkView
        gtkList={data.gtkList || []}
        profile={data.profile}
        currentUser={currentUser}
        setActiveView={setActiveView}
        onEditInAdmin={onEditInAdmin}
      />
    );
  }

  const item = data.informations[infoKey] || data.informations.sejarah;

  const isAdmin = currentUser?.role === 'admin';

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPointIdx, setEditingPointIdx] = useState<number | null>(null);
  const [pointForm, setPointForm] = useState({ title: '', desc: '' });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const iconMap: Record<InfoCategoryKey, React.ComponentType<{ className?: string }>> = {
    sejarah: History,
    visimisi: Compass,
    tujuan: Target,
    kemasyarakatan: Users,
    kesiswaan: GraduationCap,
    gtk: UserCheck,
  };

  const IconComponent = iconMap[infoKey] || History;

  const handlePrint = () => {
    window.print();
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleOpenAddPoint = () => {
    if (!isAdmin) {
      showToast('Akses ditolak: Hanya admin yang dapat menambah informasi.');
      return;
    }
    setEditingPointIdx(null);
    setPointForm({ title: '', desc: '' });
    setShowAddModal(true);
  };

  const handleOpenEditPoint = (index: number) => {
    if (!isAdmin) {
      showToast('Akses ditolak: Hanya admin yang dapat mengubah informasi.');
      return;
    }
    const existing = item.points ? item.points[index] : null;
    if (existing) {
      setEditingPointIdx(index);
      setPointForm({ title: existing.title, desc: existing.desc });
      setShowAddModal(true);
    }
  };

  const handleSavePoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      showToast('Akses ditolak: Hanya admin yang dapat menyimpan informasi.');
      return;
    }
    if (!pointForm.title.trim()) return;

    const currentPoints = item.points ? [...item.points] : [];
    
    if (editingPointIdx !== null) {
      currentPoints[editingPointIdx] = {
        title: pointForm.title.trim(),
        desc: pointForm.desc.trim(),
      };
    } else {
      currentPoints.push({
        title: pointForm.title.trim(),
        desc: pointForm.desc.trim(),
      });
    }

    const updatedInformations = {
      ...data.informations,
      [infoKey]: {
        ...item,
        points: currentPoints,
        lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      },
    };

    const updatedData = { ...data, informations: updatedInformations };
    if (onUpdateData) {
      onUpdateData(updatedData);
    }

    setShowAddModal(false);
    setEditingPointIdx(null);
    setPointForm({ title: '', desc: '' });
    showToast(editingPointIdx !== null ? 'Informasi berhasil diperbarui.' : 'Informasi baru berhasil ditambahkan!');
  };

  const handleDeletePoint = (index: number) => {
    if (!isAdmin) {
      showToast('Akses ditolak: Hanya admin yang dapat menghapus informasi.');
      return;
    }
    if (!window.confirm('Apakah Anda yakin ingin menghapus poin informasi ini?')) return;

    const currentPoints = item.points ? [...item.points] : [];
    currentPoints.splice(index, 1);

    const updatedInformations = {
      ...data.informations,
      [infoKey]: {
        ...item,
        points: currentPoints,
        lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      },
    };

    const updatedData = { ...data, informations: updatedInformations };
    if (onUpdateData) {
      onUpdateData(updatedData);
    }
    showToast('Informasi berhasil dihapus.');
  };

  const isKesiswaanOrKemasyarakatan = infoKey === 'kesiswaan' || infoKey === 'kemasyarakatan';
  const categoryLabel = infoKey === 'kesiswaan' ? 'Kesiswaan' : infoKey === 'kemasyarakatan' ? 'Kemasyarakatan' : item.title;

  return (
    <article className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden animate-in fade-in duration-200 relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-14 right-6 z-50 bg-emerald-800 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-500/40 text-xs font-semibold flex items-center space-x-2 animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Banner with Image & Title */}
      <div className="relative bg-gradient-to-br from-[#0B2545] via-[#091D3E] to-[#065F46] p-6 sm:p-10 text-white overflow-hidden">
        {item.bannerImage && (
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <img
              src={item.bannerImage}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="relative z-10 space-y-3 max-w-3xl">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200">
            <button
              onClick={() => {
                setActiveView('beranda');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-1.5 hover:text-white transition-colors bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </button>

            <div className="flex items-center space-x-3 text-[11px]">
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1 text-amber-300" />
                Diperbarui: {item.lastUpdated}
              </span>
              
              {/* Tombol Tambah Informasi Khusus Admin */}
              {isAdmin && (
                <button
                  id={`btn-tambah-info-${infoKey}`}
                  onClick={handleOpenAddPoint}
                  className="inline-flex items-center space-x-1 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-3 py-1 rounded-full shadow-sm transition-all"
                  title={`Tambah data informasi program ${categoryLabel}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Tambah Informasi {isKesiswaanOrKemasyarakatan ? categoryLabel : ''}</span>
                </button>
              )}

              {currentUser && (
                <button
                  onClick={() => onEditInAdmin('informasi')}
                  className="inline-flex items-center space-x-1 bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded-full hover:bg-amber-300 transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Data (Admin)</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-emerald-300">
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Informasi Resmi MIN 4 Kuningan
              </span>
              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {item.title}
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {item.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6 sm:p-10 space-y-8">
        {/* Action toolbar (Print, Share, Info tags, + Tambah Informasi) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
              Dokumen Resmi Madrasah
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
              MIN 4 Kuningan
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {isAdmin && (
              <button
                onClick={handleOpenAddPoint}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Informasi {isKesiswaanOrKemasyarakatan ? categoryLabel : ''}</span>
              </button>
            )}
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Halaman</span>
            </button>
          </div>
        </div>

        {/* Highlights Callout Box */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/80 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Poin Pokok & Sorotan:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {item.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Paragraphs Text */}
        <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4 whitespace-pre-line">
          {item.content}
        </div>

        {/* Points & Sections List */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Uraian & Rincian Program {categoryLabel}</span>
            </h3>

            {isAdmin && (
              <button
                onClick={handleOpenAddPoint}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Informasi</span>
              </button>
            )}
          </div>

          {item.points && item.points.length > 0 ? (
            <div className="grid grid-cols-1 gap-3.5">
              {item.points.map((pt, pIdx) => (
                <div 
                  key={pIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors space-y-1.5 group relative"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {pIdx + 1}
                      </span>
                      <span>{pt.title}</span>
                    </h4>

                    {/* Quick Edit/Delete buttons (Only for admin) */}
                    {isAdmin && (
                      <div className="flex items-center space-x-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEditPoint(pIdx)}
                          title="Edit Informasi ini"
                          className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePoint(pIdx)}
                          title="Hapus Informasi ini"
                          className="p-1 rounded-md text-rose-600 hover:bg-rose-100 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
              <p className="text-xs text-slate-500">Belum ada poin rincian informasi program.</p>
              {isAdmin && (
                <button
                  onClick={handleOpenAddPoint}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Informasi Pertama</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Special Section: GTK Members Grid if viewing 'gtk' */}
        {infoKey === 'gtk' && data.gtkList && data.gtkList.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Daftar Dewan Guru & Tenaga Kependidikan
                </h3>
                <p className="text-xs text-slate-500">
                  Pendidik dan Tenaga Kependidikan MIN 4 Kuningan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.gtkList.map((gtk) => (
                <div
                  key={gtk.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-emerald-300 space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-600 flex-shrink-0 bg-slate-100">
                      <img
                        src={gtk.photo}
                        alt={gtk.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80';
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate leading-snug">
                        {gtk.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono">
                        NIP: {maskNip(gtk.nip)}
                      </p>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {gtk.role}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Bidang/Mapel:</span>
                      <span className="font-medium text-slate-800 text-right">{gtk.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pendidikan:</span>
                      <span className="font-medium text-slate-800 text-right">{gtk.education}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              setActiveView('beranda');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>

          {currentUser && (
            <button
              onClick={() => onEditInAdmin('informasi')}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-sm transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Informasi di Panel Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* MODAL POPUP: TAMBAH / EDIT INFORMASI */}
      {showAddModal && (
        <div 
          id="modal-tambah-informasi-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div 
            id="modal-tambah-informasi-content"
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150"
          >
            <div className="bg-gradient-to-r from-[#0B2545] to-[#065F46] p-5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-white/10 rounded-xl">
                  <IconComponent className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">
                    {editingPointIdx !== null ? 'Edit Informasi Program' : `Tambah Informasi ${categoryLabel}`}
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    Portal Informasi Resmi MIN 4 Kuningan
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePoint} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Judul Informasi / Kegiatan / Program *
                </label>
                <input
                  type="text"
                  value={pointForm.title}
                  onChange={(e) => setPointForm({ ...pointForm, title: e.target.value })}
                  placeholder={
                    infoKey === 'kesiswaan' 
                      ? 'Contoh: Ekstrakurikuler Robotik & Coding, Bimbingan KSM...' 
                      : infoKey === 'kemasyarakatan'
                      ? 'Contoh: Bakti Sosial Ramadhan Peduli, Majelis Taklim Wali Murid...'
                      : 'Contoh: Judul kegiatan atau uraian program baru...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs bg-slate-50/50 outline-hidden transition-all font-semibold text-slate-800"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Uraian / Deskripsi Rincian Informasi *
                </label>
                <textarea
                  rows={4}
                  value={pointForm.desc}
                  onChange={(e) => setPointForm({ ...pointForm, desc: e.target.value })}
                  placeholder="Tuliskan rincian penjelasan program, waktu pelaksanaan, tujuan, atau mekanisme kegiatan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs bg-slate-50/50 outline-hidden transition-all text-slate-700 leading-relaxed font-sans"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingPointIdx !== null ? 'Simpan Perubahan' : 'Simpan Informasi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </article>
  );
};
