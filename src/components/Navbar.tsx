import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Info, 
  Newspaper, 
  Image as ImageIcon, 
  HelpCircle, 
  LogIn, 
  LogOut, 
  ChevronDown, 
  User, 
  ShieldCheck, 
  Menu, 
  X,
  BookOpen,
  Award,
  Users,
  GraduationCap,
  History,
  Compass,
  Target,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { ActiveView, AppStateData, UserAccount, InfoCategoryKey } from '../types';

interface NavbarProps {
  data: AppStateData;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currentUser: UserAccount | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  data,
  activeView,
  setActiveView,
  currentUser,
  onOpenLogin,
  onLogout,
}) => {
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setInfoDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const infoMenuItems: { key: InfoCategoryKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'sejarah', label: 'Sejarah Singkat Madrasah', icon: History },
    { key: 'visimisi', label: 'Visi dan Misi Madrasah', icon: Compass },
    { key: 'tujuan', label: 'Tujuan Madrasah', icon: Target },
    { key: 'kemasyarakatan', label: 'Kemasyarakatan', icon: Users },
    { key: 'kesiswaan', label: 'Kesiswaan', icon: GraduationCap },
    { key: 'gtk', label: 'Info GTK (Guru & Tendik)', icon: UserCheck },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setInfoDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isInfoActive = [
    'sejarah',
    'visimisi',
    'tujuan',
    'kemasyarakatan',
    'kesiswaan',
    'gtk',
  ].includes(activeView);

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg border-b border-emerald-800/40">
      {/* Top Bar with Ministry Header & Islamic Touch */}
      <div className="bg-[#091D3E] text-slate-200 border-b border-blue-900/60 px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-800/80 text-emerald-100 font-semibold text-[11px] tracking-wide">
              KEMENTERIAN AGAMA REPUBLIK INDONESIA
            </span>
            <span className="hidden sm:inline text-slate-300">
              KEMENAG Kab. Kuningan • NPSN: {data.profile.npsm} • NSM: {data.profile.nsm}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline-flex items-center text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
              Akreditasi {data.profile.akreditasi}
            </span>
            {currentUser && (
              <span className="inline-flex items-center text-amber-300 font-medium">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-4 h-4 rounded-full object-cover mr-1.5 border border-amber-400"
                  />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                )}
                Login: {currentUser.name} ({currentUser.role.toUpperCase()})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar Header: Dark Navy & Deep Green Palette */}
      <div className="bg-[#0B2545] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Madrasah Name */}
            <div 
              id="brand-logo-button"
              onClick={() => handleNavClick('beranda')}
              className="flex items-center space-x-3.5 cursor-pointer group select-none"
            >
              <div className="relative p-1.5 bg-white rounded-xl shadow-md border-2 border-emerald-600/60 group-hover:scale-105 transition-transform duration-200">
                <img
                  src={data.settings.logoUrl}
                  alt="Logo MIN 4 Kuningan"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 object-contain"
                  onError={(e) => {
                    // Fallback logo if broken url
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                    Kemenag Kab. Kuningan
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  {data.profile.nama}
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-300 max-w-xs sm:max-w-md truncate">
                  {data.profile.motto}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <button
                id="nav-beranda"
                onClick={() => handleNavClick('beranda')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  activeView === 'beranda'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Beranda</span>
              </button>

              {/* Dropdown Menu: Informasi */}
              <div className="relative" ref={dropdownRef}>
                <button
                  id="nav-dropdown-informasi"
                  onClick={() => setInfoDropdownOpen(!infoDropdownOpen)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                    isInfoActive
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  <span>Informasi</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      infoDropdownOpen ? 'rotate-180 text-emerald-300' : ''
                    }`}
                  />
                </button>

                {infoDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl py-2 z-50 border border-slate-200 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-50/60">
                      Menu Informasi Madrasah
                    </div>
                    {infoMenuItems.map((item) => {
                      const IconComponent = item.icon;
                      const isActive = activeView === item.key;
                      return (
                        <button
                          key={item.key}
                          id={`nav-info-${item.key}`}
                          onClick={() => handleNavClick(item.key)}
                          className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center space-x-2.5 transition-colors ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-900 font-semibold'
                              : 'hover:bg-slate-100 text-slate-700 hover:text-emerald-700'
                          }`}
                        >
                          <span className={`p-1 rounded-md ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <IconComponent className="w-3.5 h-3.5" />
                          </span>
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                id="nav-berita"
                onClick={() => handleNavClick('berita')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  activeView === 'berita' || activeView === 'berita-detail'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>Berita</span>
              </button>

              <button
                id="nav-gallery"
                onClick={() => handleNavClick('gallery')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  activeView === 'gallery'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Gallery</span>
              </button>

              <button
                id="nav-tentang"
                onClick={() => handleNavClick('tentang-kami')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  activeView === 'tentang-kami'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Tentang Kami</span>
              </button>

              {/* Login / Admin Dashboard Button */}
              {currentUser ? (
                <div className="flex items-center space-x-1.5 pl-2 border-l border-blue-800">
                  <button
                    id="nav-admin-dashboard"
                    onClick={() => handleNavClick('admin-dashboard')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                      activeView === 'admin-dashboard'
                        ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                        : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-5 h-5 rounded-full object-cover border border-emerald-400 shrink-0"
                      />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    <span>Panel {currentUser.role === 'admin' ? 'Admin' : 'User'}</span>
                  </button>
                  <button
                    id="nav-logout-btn"
                    onClick={onLogout}
                    title="Keluar / Logout"
                    className="p-2 rounded-lg text-slate-300 hover:bg-rose-900/80 hover:text-rose-200 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  id="nav-login-modal-btn"
                  onClick={onOpenLogin}
                  className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5 border border-emerald-400/40 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              {currentUser ? (
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-amber-500 text-slate-900 font-bold flex items-center space-x-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Panel</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="px-3 py-1.5 rounded-lg text-xs bg-emerald-600 text-white font-semibold flex items-center space-x-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              )}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07192F] border-t border-blue-900/80 px-4 pt-2 pb-6 space-y-1 text-sm">
            <button
              onClick={() => handleNavClick('beranda')}
              className={`w-full text-left px-3 py-2 rounded-md font-medium flex items-center space-x-2 ${
                activeView === 'beranda' ? 'bg-emerald-700 text-white' : 'text-slate-200'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </button>

            {/* Mobile Info Menu */}
            <div className="pt-2">
              <div className="px-3 py-1 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Informasi
              </div>
              <div className="pl-2 space-y-1">
                {infoMenuItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-2 ${
                      activeView === item.key ? 'bg-emerald-800 text-white' : 'text-slate-300'
                    }`}
                  >
                    <span>•</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick('berita')}
              className={`w-full text-left px-3 py-2 rounded-md font-medium flex items-center space-x-2 ${
                activeView === 'berita' ? 'bg-emerald-700 text-white' : 'text-slate-200'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Berita</span>
            </button>

            <button
              onClick={() => handleNavClick('gallery')}
              className={`w-full text-left px-3 py-2 rounded-md font-medium flex items-center space-x-2 ${
                activeView === 'gallery' ? 'bg-emerald-700 text-white' : 'text-slate-200'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Gallery</span>
            </button>

            <button
              onClick={() => handleNavClick('tentang-kami')}
              className={`w-full text-left px-3 py-2 rounded-md font-medium flex items-center space-x-2 ${
                activeView === 'tentang-kami' ? 'bg-emerald-700 text-white' : 'text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Tentang Kami</span>
            </button>

            {currentUser && (
              <div className="pt-3 border-t border-blue-900/60">
                <button
                  onClick={onLogout}
                  className="w-full text-left px-3 py-2 rounded-md font-medium bg-rose-950/80 text-rose-200 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar ({currentUser.name})</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
