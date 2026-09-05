import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Clock, 
  Calendar as CalendarIcon, 
  Globe, 
  Shield, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Monitor, 
  Sparkles,
  LogIn,
  CheckCircle2,
  Camera
} from 'lucide-react';
import { AppStateData, UserAccount, ActiveView } from '../types';
import { maskNip } from '../utils';
import { ChangeUserPhotoModal } from './ChangeUserPhotoModal';

interface LeftSidebarProps {
  data: AppStateData;
  currentUser: UserAccount | null;
  onOpenLogin: () => void;
  setActiveView: (view: ActiveView) => void;
  onUpdateUserPhoto?: (newAvatarUrl: string) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  data,
  currentUser,
  onOpenLogin,
  setActiveView,
  onUpdateUserPhoto,
}) => {
  // Real-time Clock State
  const [time, setTime] = useState<Date>(new Date());
  
  // State for user photo modal
  const [isChangePhotoOpen, setIsChangePhotoOpen] = useState(false);
  
  // Calendar navigation state
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  // Client info state
  const [clientInfo, setClientInfo] = useState({
    ip: '180.252.164.72',
    browser: 'Chrome / Webkit',
    os: 'Windows / Linux',
    region: 'Kuningan, Jawa Barat, ID',
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Detect basic browser info & try public ip
    try {
      const ua = navigator.userAgent;
      let browserName = 'Browser Web';
      if (ua.includes('Chrome')) browserName = 'Google Chrome';
      else if (ua.includes('Firefox')) browserName = 'Mozilla Firefox';
      else if (ua.includes('Safari')) browserName = 'Apple Safari';
      else if (ua.includes('Edge')) browserName = 'Microsoft Edge';

      let osName = 'Desktop';
      if (ua.includes('Win')) osName = 'Windows';
      else if (ua.includes('Mac')) osName = 'macOS';
      else if (ua.includes('Android')) osName = 'Android';
      else if (ua.includes('Linux')) osName = 'Linux';

      setClientInfo((prev) => ({
        ...prev,
        browser: browserName,
        os: osName,
      }));

      // Try fetching real client IP asynchronously
      fetch('https://api.ipify.org?format=json')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.ip) {
            setClientInfo((prev) => ({ ...prev, ip: data.ip }));
          }
        })
        .catch(() => {
          // fallback stays as simulated realistic Indonesian ISP IP
        });
    } catch {
      // ignore
    }
  }, []);

  // Calendar calculations
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const prevMonth = () => {
    setCalendarDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCalendarDate(new Date(year, month + 1, 1));
  };
  const resetToToday = () => {
    setCalendarDate(new Date());
  };

  // Format dates for Indonesian display
  const hariIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][time.getDay()];
  const tanggalIndo = `${time.getDate()} ${monthNames[time.getMonth()]} ${time.getFullYear()}`;
  const jamIndo = time.toLocaleTimeString('id-ID', { hour12: false });

  // Approximate Hijriah date
  const hijriYear = 1448; // Current 2026 approx
  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi’ul Awwal', 'Rabi’ul Akhir', 'Jumadil Awal', 'Jumadil Akhir',
    'Rajab', 'Sya’ban', 'Ramadhan', 'Syawal', 'Dzulqa’dah', 'Dzulhijjah'
  ];
  const approxHijriMonth = hijriMonths[(month + 2) % 12];
  const approxHijriDay = Math.min(29, (time.getDate() + 4) % 30 || 1);

  return (
    <aside className="space-y-5">
      {/* 1. BAGIAN ATAS: INFORMASI LENGKAP USER (GUEST / LOGGED IN) */}
      <div 
        id="sidebar-user-card" 
        className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#0B2545] to-[#065F46] p-3 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-xs">
              <User className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">Status Pengunjung</h3>
              <p className="text-[10px] text-emerald-200">Informasi Akses & Sesi</p>
            </div>
          </div>
          <span className="flex items-center text-[11px] font-medium bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
            Online
          </span>
        </div>

        <div className="p-4 space-y-3">
          {currentUser ? (
            /* Logged in User Card */
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setIsChangePhotoOpen(true)}
                  />
                  <button
                    type="button"
                    onClick={() => setIsChangePhotoOpen(true)}
                    title="Ubah Foto Profil"
                    className="absolute -bottom-1 -right-1 p-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full border-2 border-white shadow-xs transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</h4>
                  <p className="text-[11px] text-slate-500 truncate">NIP: {maskNip(currentUser.nip)}</p>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      currentUser.role === 'admin' 
                        ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                        : 'bg-blue-100 text-blue-900 border border-blue-200'
                    }`}>
                      {currentUser.role === 'admin' ? '🛡️ ADMINISTRATOR' : '👤 USER MADRASAH'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsChangePhotoOpen(true)}
                      className="text-[10px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center space-x-0.5"
                    >
                      <Camera className="w-2.5 h-2.5 mr-0.5" />
                      <span>Ubah Foto</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1 text-[11px] text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Username:</span>
                  <span className="font-semibold text-slate-700">@{currentUser.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-medium text-slate-700 truncate max-w-[140px]">{currentUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IP Sesi:</span>
                  <span className="font-mono text-emerald-700 font-semibold">{clientInfo.ip}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveView('admin-dashboard')}
                className="w-full py-2 px-3 bg-[#0B2545] hover:bg-[#064E3B] text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center space-x-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Buka Panel Dashboard</span>
              </button>
            </div>
          ) : (
            /* Guest Card with IP information */
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                  <Globe className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <h4 className="text-xs font-bold text-slate-800">Tamu (Guest User)</h4>
                  </div>
                  <p className="text-[11px] text-slate-500">Akses Terbuka Publik</p>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center">
                    <Globe className="w-3 h-3 mr-1 text-slate-400" /> Alamat IP:
                  </span>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {clientInfo.ip}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center">
                    <Monitor className="w-3 h-3 mr-1 text-slate-400" /> Perangkat:
                  </span>
                  <span className="font-medium text-slate-700">
                    {clientInfo.browser} ({clientInfo.os})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-slate-400" /> Wilayah:
                  </span>
                  <span className="font-medium text-slate-700 truncate max-w-[130px]">
                    {clientInfo.region}
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  id="guest-login-trigger"
                  onClick={onOpenLogin}
                  className="w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center space-x-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login Staff / Admin</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. BAGIAN TENGAH: PETA LOKASI GOOGLE MIN 4 KUNINGAN */}
      <div 
        id="sidebar-maps-card"
        className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#0B2545] to-[#065F46] p-3 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-xs">
              <MapPin className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">Lokasi Madrasah</h3>
              <p className="text-[10px] text-emerald-200">Peta Google MIN 4 Kuningan</p>
            </div>
          </div>
        </div>

        <div className="p-3 space-y-2.5">
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
            <iframe
              src={data.settings.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi MIN 4 Kuningan"
              className="w-full h-full"
            />
          </div>

          <div className="text-[11px] text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800 leading-tight">
              {data.profile.nama}
            </p>
            <p className="text-slate-500 text-[10px] leading-relaxed">
              {data.profile.alamat}
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Madrasah+Ibtidaiyah+Negeri+4+Kuningan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 px-3 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg text-[11px] font-medium border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-center space-x-1"
          >
            <span>Buka Rute di Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>


      {/* 3. BAGIAN BAWAH: JAM & KALENDER LENGKAP MASEHI + BULANAN */}
      <div 
        id="sidebar-clock-calendar-card"
        className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#0B2545] to-[#065F46] p-3 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-xs">
              <Clock className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">Waktu & Kalender</h3>
              <p className="text-[10px] text-emerald-200">Masehi & Hijriah</p>
            </div>
          </div>
          <button 
            onClick={resetToToday}
            title="Kembali ke Hari Ini"
            className="p-1 hover:bg-white/10 rounded text-[10px] text-emerald-200 hover:text-white transition-colors"
          >
            Hari Ini
          </button>
        </div>

        <div className="p-3.5 space-y-3.5">
          {/* Live Digital Clock Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0B2545] text-white p-3 rounded-xl text-center shadow-inner relative overflow-hidden">
            <div className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
              WAKTU INDONESIA BARAT (WIB)
            </div>
            <div className="text-2xl font-black tracking-widest font-mono text-amber-300 my-1 drop-shadow-sm">
              {jamIndo}
            </div>
            <div className="text-xs font-medium text-slate-200">
              {hariIndo}, {tanggalIndo}
            </div>
            <div className="mt-1 pt-1 border-t border-slate-800 text-[10px] text-emerald-300 font-serif">
              🕌 {approxHijriDay} {approxHijriMonth} {hijriYear} H
            </div>
          </div>

          {/* Interactive Month Calendar */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            {/* Calendar Header with Navigation */}
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={prevMonth}
                className="p-1 rounded-md hover:bg-slate-200 text-slate-600 transition-colors"
                title="Bulan Sebelumnya"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className="text-xs font-bold text-slate-800">
                {monthNames[month]} {year}
              </div>
              <button
                onClick={nextMonth}
                className="p-1 rounded-md hover:bg-slate-200 text-slate-600 transition-colors"
                title="Bulan Berikutnya"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Day Names Grid */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {dayNames.map((dn, idx) => (
                <div 
                  key={dn} 
                  className={`text-[10px] font-bold py-0.5 ${idx === 0 ? 'text-rose-600' : idx === 5 ? 'text-emerald-700' : 'text-slate-600'}`}
                >
                  {dn}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {/* Empty placeholder cells for previous month offset */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="py-1 text-slate-300 text-[10px]">
                  •
                </div>
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const isToday = isCurrentMonth && dayNum === today.getDate();
                const dayOfWeek = (firstDayIndex + i) % 7;
                const isSunday = dayOfWeek === 0;
                const isFriday = dayOfWeek === 5;

                return (
                  <div
                    key={`day-${dayNum}`}
                    className={`py-1 rounded-md text-[11px] font-medium transition-all ${
                      isToday
                        ? 'bg-emerald-700 text-white font-bold shadow-xs'
                        : isSunday
                        ? 'text-rose-600 hover:bg-rose-50'
                        : isFriday
                        ? 'text-emerald-800 font-semibold hover:bg-emerald-50'
                        : 'text-slate-700 hover:bg-slate-200/70'
                    }`}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ubah Foto User */}
      <ChangeUserPhotoModal
        isOpen={isChangePhotoOpen}
        user={currentUser}
        onClose={() => setIsChangePhotoOpen(false)}
        onSavePhoto={(newPhotoUrl) => {
          onUpdateUserPhoto?.(newPhotoUrl);
        }}
      />
    </aside>
  );
};
