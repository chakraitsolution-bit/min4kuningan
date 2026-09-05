import React, { useState } from 'react';
import { 
  HelpCircle, 
  ArrowLeft, 
  School, 
  Award, 
  Users, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Send,
  MessageCircle,
  Building,
  Activity,
  Cpu,
  Monitor,
  Library
} from 'lucide-react';
import { AppStateData, ActiveView } from '../../types';

interface AboutUsViewProps {
  data: AppStateData;
  setActiveView: (view: ActiveView) => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ data, setActiveView }) => {
  const [pesanNama, setPesanNama] = useState('');
  const [pesanHp, setPesanHp] = useState('');
  const [pesanIsi, setPesanIsi] = useState('');
  const [kirimStatus, setKirimStatus] = useState(false);

  const handleKirimPesan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pesanNama || !pesanIsi) return;

    // Send via WhatsApp
    const rawWa = (data.about?.contact?.whatsapp || data.profile.telepon || '081460370700').replace(/[^0-9]/g, '');
    const formattedWa = rawWa.startsWith('0') ? '62' + rawWa.slice(1) : rawWa;
    const message = `Halo MIN 4 Kuningan, saya ${pesanNama} (${pesanHp || 'Wali/Masyarakat'}). Pesan: ${pesanIsi}`;
    const url = `https://wa.me/${formattedWa}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    setKirimStatus(true);
    setTimeout(() => {
      setPesanNama('');
      setPesanHp('');
      setPesanIsi('');
      setKirimStatus(false);
    }, 2000);
  };

  const stats = [
    { label: 'Peserta Didik Aktif', value: data.about.stats.jumlahSiswa, suffix: 'Siswa' },
    { label: 'Rombongan Belajar', value: data.about.stats.jumlahRombel, suffix: 'Kelas' },
    { label: 'Dewan Guru Profesional', value: data.about.stats.jumlahGuru, suffix: 'Ustadz/ah' },
    { label: 'Tenaga Kependidikan', value: data.about.stats.jumlahStaf, suffix: 'Staf' },
    { label: 'Peringkat Akreditasi', value: data.about.stats.akreditasi, suffix: 'BAN-S/M' },
    { label: 'Tahun Pendirian', value: data.about.stats.tahunBerdiri, suffix: 'M' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-10 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="space-y-4 pb-6 border-b border-slate-100">
        <button
          onClick={() => {
            setActiveView('beranda');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 uppercase tracking-wider">
              Profil Kelembagaan
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Tentang {data.profile.nama}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {data.about.historySummary}
            </p>
          </div>

          <div className="p-4 bg-gradient-to-br from-emerald-800 to-[#0B2545] text-white rounded-2xl shadow-md space-y-2 text-center md:text-left min-w-[200px]">
            <Award className="w-8 h-8 text-amber-300 mx-auto md:mx-0" />
            <div>
              <div className="text-xs text-emerald-200">Status Akreditasi</div>
              <div className="text-xl font-black text-amber-300">{data.profile.akreditasi}</div>
              <div className="text-[10px] text-slate-300 mt-0.5">BAN-S/M Jawa Barat</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((st, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1 hover:border-emerald-300 transition-colors"
          >
            <div className="text-xl font-black text-emerald-800">{st.value}</div>
            <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">{st.label}</div>
            <div className="text-[9px] text-slate-400">{st.suffix}</div>
          </div>
        ))}
      </div>

      {/* Fasilitas & Sarana Prasarana */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            Fasilitas & Sarana Prasarana
          </h3>
          <p className="text-xs text-slate-500">
            Dukungan fasilitas belajar kondusif, representatif, dan berbasis teknologi
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.about.facilities.map((fac, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-800">{fac.name}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">{fac.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kontak, Peta & Hubungi Kami */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
        {/* Kontak Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800">
            Informasi Kontak & Lokasi
          </h3>
          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">Alamat Madrasah:</span>
                  <p className="text-slate-600 mt-0.5">{data.about.contact.alamat}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2 border-t border-slate-200/60">
                <Phone className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Telepon Kantor:</span>
                  <p className="text-slate-600">{data.about.contact.telepon}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2 border-t border-slate-200/60">
                <MessageCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">WhatsApp Pelayanan / Humas:</span>
                  <p className="text-emerald-700 font-semibold">{data.about.contact.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2 border-t border-slate-200/60">
                <Mail className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Email Madrasah:</span>
                  <p className="text-slate-600">{data.about.contact.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2 border-t border-slate-200/60">
                <Clock className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Jam Operasional:</span>
                  <p className="text-slate-600">{data.about.contact.jamOperasional}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Kontak Cepat */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800">
            Kirim Pertanyaan / Pesan
          </h3>
          <form onSubmit={handleKirimPesan} className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            {kirimStatus && (
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pesan diarahkan ke WhatsApp Humas Madrasah...</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={pesanNama}
                onChange={(e) => setPesanNama(e.target.value)}
                placeholder="Nama Anda / Orang Tua Calon Siswa"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                No. WhatsApp / Telepon
              </label>
              <input
                type="text"
                value={pesanHp}
                onChange={(e) => setPesanHp(e.target.value)}
                placeholder="Contoh: 08123456789"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Isi Pesan / Pertanyaan
              </label>
              <textarea
                rows={3}
                value={pesanIsi}
                onChange={(e) => setPesanIsi(e.target.value)}
                placeholder="Tuliskan pertanyaan seputar PPDB, kurikulum, atau informasi madrasah..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Pesan ke WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
