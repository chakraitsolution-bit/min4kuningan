import React, { useState, useEffect } from 'react';
import { 
  AppStateData, 
  ActiveView, 
  UserAccount, 
  InfoCategoryKey, 
  NewsItem 
} from './types';
import { 
  loadAppData, 
  saveAppData, 
  getCurrentUser, 
  setCurrentUser, 
  logoutUser,
  subscribeToLiveAppData 
} from './services/storage';

// Public Layout Components
import { Navbar } from './components/Navbar';
import { RunningText } from './components/RunningText';
import { Slideshow } from './components/Slideshow';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';

// Public Views
import { HomeView } from './components/views/HomeView';
import { InfoDetailView } from './components/views/InfoDetailView';
import { NewsView } from './components/views/NewsView';
import { NewsDetailView } from './components/views/NewsDetailView';
import { GalleryView } from './components/views/GalleryView';
import { AboutUsView } from './components/views/AboutUsView';
import { GtkView } from './components/views/GtkView';

// Admin Workspace
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [appData, setAppData] = useState<AppStateData>(() => loadAppData());
  const [currentUser, setLoggedInUser] = useState<UserAccount | null>(() => getCurrentUser());
  const [activeView, setActiveView] = useState<ActiveView>('beranda');
  const [activeInfoKey, setActiveInfoKey] = useState<InfoCategoryKey | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showAdminMode, setShowAdminMode] = useState<boolean>(false);

  // Live real-time database listener across all browsers and devices
  useEffect(() => {
    const unsubscribe = subscribeToLiveAppData((liveData) => {
      setAppData(liveData);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Sync state changes with persistence
  const handleUpdateData = (newData: AppStateData) => {
    setAppData(newData);
    saveAppData(newData);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setLoggedInUser(user);
    setCurrentUser(user);
    setIsLoginModalOpen(false);
    // As requested: "setelah user login sebagai admin bersihkan semua halaman tampilkan sidebar menu pada sisi kiri..."
    setShowAdminMode(true);
  };

  const handleLogout = () => {
    logoutUser();
    setLoggedInUser(null);
    setShowAdminMode(false);
    setActiveView('beranda');
    setActiveInfoKey(null);
  };

  const handleUpdateCurrentUser = (updatedUser: UserAccount) => {
    setLoggedInUser(updatedUser);
    setCurrentUser(updatedUser);
    const updatedUsers = appData.users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    handleUpdateData({ ...appData, users: updatedUsers });
  };

  const handleUpdateCurrentUserPhoto = (newPhotoUrl: string) => {
    if (!currentUser) return;
    const updatedUser: UserAccount = { ...currentUser, avatar: newPhotoUrl };
    handleUpdateCurrentUser(updatedUser);
  };

  // View Navigation Helpers
  const handleSelectInfo = (key: InfoCategoryKey) => {
    setActiveInfoKey(key);
    setActiveView('informasi-detail');
    setSelectedNews(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNews = (item: NewsItem) => {
    // Increment view count in state & storage
    const updatedNews = appData.news.map((n) =>
      n.id === item.id ? { ...n, views: (n.views || 0) + 1 } : n
    );
    const updatedData = { ...appData, news: updatedNews };
    handleUpdateData(updatedData);

    setSelectedNews({ ...item, views: (item.views || 0) + 1 });
    setActiveView('berita-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateView = (view: ActiveView) => {
    setActiveView(view);
    if (view !== 'informasi-detail') {
      setActiveInfoKey(null);
    }
    if (view !== 'berita-detail') {
      setSelectedNews(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is logged in and admin mode is active, render the dedicated Admin Workspace
  if (currentUser && showAdminMode) {
    return (
      <AdminDashboard
        data={appData}
        currentUser={currentUser}
        onUpdateData={handleUpdateData}
        onUpdateCurrentUser={handleUpdateCurrentUser}
        onLogout={handleLogout}
        onBackToPublic={() => setShowAdminMode(false)}
      />
    );
  }

  // Dynamic Background Style
  const hasCustomBackground = !!appData.settings.backgroundUrl;
  const backgroundPattern = appData.settings.backgroundPattern || 'islamic';

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans relative text-slate-900 ${
        backgroundPattern === 'islamic' ? 'bg-pattern-islamic' : 
        backgroundPattern === 'dots' ? 'bg-pattern-dots' : 
        backgroundPattern === 'grid' ? 'bg-pattern-grid' : 'bg-slate-100'
      }`}
      style={{
        backgroundColor: '#F3F4F6',
        backgroundImage: hasCustomBackground ? `url("${appData.settings.backgroundUrl}")` : undefined,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      {/* Background Soft Overlay for readable contrast */}
      <div className="fixed inset-0 bg-slate-900/10 pointer-events-none z-0" />

      {/* Main Container Wrapper */}
      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* ====================================================
            1. TOP NAVBAR (Requirement 1, 2, 3)
            - Dark blue (#0B2545), White, Dark green (#064e3b)
            - Menus: Beranda, Informasi (Dropdown), Berita, Gallery, Tentang Kami, Login
           ==================================================== */}
        <Navbar
          data={appData}
          activeView={activeView}
          setActiveView={handleNavigateView}
          currentUser={currentUser}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* ====================================================
            2. RUNNING TEXT (Requirement 4)
            - Sticky under navbar
            - Does not scroll away with the page
            - Editable by admin
           ==================================================== */}
        <RunningText 
          text={appData.settings.runningText} 
          speed={appData.settings.runningTextSpeed}
          bgColor={appData.settings.runningTextBgColor}
          textColor={appData.settings.runningTextColor}
          badgeBg={appData.settings.runningTextBadgeBg}
        />

        {/* ====================================================
            3. MAIN CONTENT CONTAINER (Sidebars + Center Canvas)
           ==================================================== */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 w-full flex-1">
          
          {/* Main Grid: Left Sidebar (3 cols) | Center Content (6 cols) | Right Sidebar (3 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* --------------------------------------------------
                LEFT SIDEBAR (Requirement 6)
                - Profil lengkap pengunjung / guest IP / sesi
                - Lokasi Google Maps MIN 4 Kuningan
                - Jam digital & Kalender Masehi/Hijriah
               -------------------------------------------------- */}
            <div className="lg:col-span-3">
              <LeftSidebar
                data={appData}
                currentUser={currentUser}
                onOpenLogin={() => setIsLoginModalOpen(true)}
                setActiveView={handleNavigateView}
                onUpdateUserPhoto={handleUpdateCurrentUserPhoto}
              />
            </div>

            {/* --------------------------------------------------
                CENTER MAIN VIEW CANVAS (Requirement 3, 3.b, 3.c, 5)
                - On 'beranda': Shows Gallery Slideshow at the top, then articles, vision banner, etc.
                - On 'sejarah', 'visimisi', 'tujuan', 'kemasyarakatan', 'kesiswaan', 'gtk', or other info: Slideshow is removed as required in 3.b!
                - On 'berita' & 'berita-detail': Slideshow is removed.
                - On 'gallery' & 'tentang-kami': Slideshow is removed.
               -------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Requirement 5: Slideshow only on Home View right below Running text */}
              {activeView === 'beranda' && (
                <div className="space-y-6">
                  <Slideshow
                    items={appData.gallery}
                    onExploreGallery={() => handleNavigateView('gallery')}
                  />
                  <HomeView
                    data={appData}
                    setActiveView={handleNavigateView}
                    onSelectNews={handleSelectNews}
                  />
                </div>
              )}

              {/* Requirement: Info GTK Tampilan Khusus Tabel Informasi GTK dengan Foto & Klik Detail */}
              {activeView === 'gtk' && (
                <GtkView
                  gtkList={appData.gtkList || []}
                  profile={appData.profile}
                  currentUser={currentUser}
                  setActiveView={handleNavigateView}
                  onEditInAdmin={(section) => setShowAdminMode(true)}
                />
              )}

              {/* Requirement 3.b: Info Detail Pages (Sejarah, Visi Misi, Tujuan, Kemasyarakatan, Kesiswaan) */}
              {['sejarah', 'visimisi', 'tujuan', 'kemasyarakatan', 'kesiswaan'].includes(activeView) && (
                <InfoDetailView
                  infoKey={activeView as InfoCategoryKey}
                  data={appData}
                  currentUser={currentUser}
                  setActiveView={handleNavigateView}
                  onEditInAdmin={(section) => setShowAdminMode(true)}
                  onUpdateData={handleUpdateData}
                />
              )}

              {/* Alternative explicit info view route */}
              {activeView === 'informasi-detail' && activeInfoKey && (
                <InfoDetailView
                  infoKey={activeInfoKey}
                  data={appData}
                  currentUser={currentUser}
                  setActiveView={handleNavigateView}
                  onEditInAdmin={(section) => setShowAdminMode(true)}
                  onUpdateData={handleUpdateData}
                />
              )}

              {/* Requirement 3.c: All News Thumbnails */}
              {activeView === 'berita' && (
                <NewsView
                  news={appData.news}
                  setActiveView={handleNavigateView}
                  onSelectNews={handleSelectNews}
                />
              )}

              {/* Requirement 3.c: Full News Article View */}
              {activeView === 'berita-detail' && selectedNews && (
                <NewsDetailView
                  newsItem={selectedNews}
                  allNews={appData.news}
                  setActiveView={handleNavigateView}
                  onSelectNews={handleSelectNews}
                />
              )}

              {/* Requirement 3.d: Gallery View with Lightbox */}
              {activeView === 'gallery' && (
                <GalleryView
                  gallery={appData.gallery}
                  setActiveView={handleNavigateView}
                />
              )}

              {/* Requirement 3.e: Tentang Kami View */}
              {activeView === 'tentang-kami' && (
                <AboutUsView
                  data={appData}
                  setActiveView={handleNavigateView}
                />
              )}
            </div>

            {/* --------------------------------------------------
                RIGHT SIDEBAR (Requirement 7)
                - Foto dan Informasi Kepala Madrasah
                - Ringkasan Menu Informasi
                - Ringkasan Berita Terkini
               -------------------------------------------------- */}
            <div className="lg:col-span-3">
              <RightSidebar
                data={appData}
                setActiveView={handleNavigateView}
                onSelectNews={handleSelectNews}
              />
            </div>

          </div>
        </main>

        {/* ====================================================
            4. FOOTER (Requirement 8)
            - Hak Cipta & Pembuat: ChakraITSolutions
            - Kontak WA: 0989-0037-631
            - Fixed Bottom Bar
           ==================================================== */}
        <Footer
          data={appData}
        />
      </div>

      {/* Login Modal Popup */}
      <LoginModal
        isOpen={isLoginModalOpen}
        data={appData}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onUpdateData={handleUpdateData}
      />
    </div>
  );
}
