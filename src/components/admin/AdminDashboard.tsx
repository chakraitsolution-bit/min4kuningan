import React, { useState } from 'react';
import { 
  Building2, 
  Info, 
  Newspaper, 
  Image as ImageIcon, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Globe, 
  Save, 
  X, 
  Edit3, 
  Trash2, 
  Plus, 
  KeyRound, 
  ShieldCheck, 
  User as UserIcon, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  MapPin, 
  Volume2, 
  Layers, 
  ArrowLeft,
  School,
  Lock,
  Eye,
  RefreshCw,
  Sparkles,
  BookOpen,
  Gauge,
  Palette,
  FastForward,
  Camera
} from 'lucide-react';
import { 
  AppStateData, 
  UserAccount, 
  AdminSection, 
  SchoolProfile, 
  InfoCategoryKey, 
  NewsItem, 
  GalleryItem, 
  GTKMember 
} from '../../types';
import { maskNip } from '../../utils';
import { ChangeUserPhotoModal } from '../ChangeUserPhotoModal';

interface AdminDashboardProps {
  data: AppStateData;
  currentUser: UserAccount;
  onUpdateData: (newData: AppStateData) => void;
  onUpdateCurrentUser?: (user: UserAccount) => void;
  onLogout: () => void;
  onBackToPublic: () => void;
  initialSection?: AdminSection;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  data,
  currentUser,
  onUpdateData,
  onUpdateCurrentUser,
  onLogout,
  onBackToPublic,
  initialSection = 'profil',
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>(initialSection);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // ----------------------------------------------------
  // SECTION 1: PROFIL MADRASAH STATE
  // ----------------------------------------------------
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState<SchoolProfile>({ ...data.profile });

  // ----------------------------------------------------
  // SECTION 2: INFORMASI STATE
  // ----------------------------------------------------
  const [selectedInfoKey, setSelectedInfoKey] = useState<InfoCategoryKey>('sejarah');
  const [infoForm, setInfoForm] = useState({
    title: data.informations[selectedInfoKey].title,
    subtitle: data.informations[selectedInfoKey].subtitle,
    content: data.informations[selectedInfoKey].content,
    lastUpdated: data.informations[selectedInfoKey].lastUpdated,
  });

  // Info Points (Rincian Program/Informasi) modal & state
  const [showPointModal, setShowPointModal] = useState(false);
  const [editingPointIdx, setEditingPointIdx] = useState<number | null>(null);
  const [pointForm, setPointForm] = useState({ title: '', desc: '' });

  // GTK modal / state inside Informasi
  const [gtkList, setGtkList] = useState<GTKMember[]>([...(data.gtkList || [])]);
  const [editingGtk, setEditingGtk] = useState<GTKMember | null>(null);
  const [showGtkModal, setShowGtkModal] = useState(false);

  // ----------------------------------------------------
  // SECTION 3: BERITA STATE
  // ----------------------------------------------------
  const [newsList, setNewsList] = useState<NewsItem[]>([...data.news]);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newsForm, setNewsForm] = useState<Partial<NewsItem>>({
    title: '',
    summary: '',
    content: '',
    category: 'Akademik',
    author: currentUser.name,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    views: 0,
    tags: ['Madrasah', 'Pendidikan'],
  });

  // ----------------------------------------------------
  // SECTION 4: GALLERY STATE
  // ----------------------------------------------------
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([...data.gallery]);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [galleryForm, setGalleryForm] = useState<Partial<GalleryItem>>({
    title: '',
    description: '',
    category: 'Kegiatan',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    date: new Date().toISOString().split('T')[0],
    location: 'MIN 4 Kuningan',
  });

  // ----------------------------------------------------
  // SECTION 5: TENTANG KAMI STATE
  // ----------------------------------------------------
  const [aboutForm, setAboutForm] = useState({ ...data.about });

  // ----------------------------------------------------
  // SECTION 6: PENGATURAN STATE (Admin Only)
  // ----------------------------------------------------
  const [settingsForm, setSettingsForm] = useState({ 
    runningTextSpeed: 25,
    runningTextBgColor: '#064E3B',
    runningTextColor: '#FFFFFF',
    runningTextBadgeBg: '#FBBF24',
    ...data.settings 
  });
  
  // User Management Form State
  const [userList, setUserList] = useState<UserAccount[]>([...data.users]);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userForm, setUserForm] = useState<Partial<UserAccount>>({
    name: '',
    nip: '',
    username: '',
    email: '',
    whatsapp: '',
    role: 'user',
    password: '',
    avatar: '',
  });

  // Dedicated User Photo Modal State
  const [photoModalUser, setPhotoModalUser] = useState<UserAccount | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const showNotificationMsg = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  // ====================================================
  // HANDLERS FOR PROFIL MADRASAH
  // ====================================================
  const handleSaveProfile = () => {
    const updatedData = { ...data, profile: { ...profileForm } };
    onUpdateData(updatedData);
    setIsEditingProfile(false);
    showNotificationMsg('success', 'Profil Madrasah berhasil disimpan.');
  };

  const handleCancelProfile = () => {
    setProfileForm({ ...data.profile });
    setIsEditingProfile(false);
    showNotificationMsg('error', 'Perubahan profil madrasah dibatalkan.');
  };

  // ====================================================
  // HANDLERS FOR INFORMASI
  // ====================================================
  const handleSelectInfoCategory = (key: InfoCategoryKey) => {
    setSelectedInfoKey(key);
    setInfoForm({
      title: data.informations[key].title,
      subtitle: data.informations[key].subtitle,
      content: data.informations[key].content,
      lastUpdated: data.informations[key].lastUpdated,
    });
  };

  const handleSaveInfo = () => {
    const updatedInformations = {
      ...data.informations,
      [selectedInfoKey]: {
        ...data.informations[selectedInfoKey],
        title: infoForm.title,
        subtitle: infoForm.subtitle,
        content: infoForm.content,
        lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      },
    };
    const updatedData = { ...data, informations: updatedInformations, gtkList };
    onUpdateData(updatedData);
    showNotificationMsg('success', `Informasi ${infoForm.title} berhasil diperbarui.`);
  };

  // Info Point Handlers (Poin Program & Kegiatan Kesiswaan / Kemasyarakatan)
  const handleOpenAddPointAdmin = () => {
    setEditingPointIdx(null);
    setPointForm({ title: '', desc: '' });
    setShowPointModal(true);
  };

  const handleOpenEditPointAdmin = (index: number) => {
    const currentPoints = data.informations[selectedInfoKey].points || [];
    if (currentPoints[index]) {
      setEditingPointIdx(index);
      setPointForm({ title: currentPoints[index].title, desc: currentPoints[index].desc });
      setShowPointModal(true);
    }
  };

  const handleSavePointAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pointForm.title.trim()) return;

    const currentPoints = [...(data.informations[selectedInfoKey].points || [])];
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
      [selectedInfoKey]: {
        ...data.informations[selectedInfoKey],
        points: currentPoints,
        lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      },
    };

    const updatedData = { ...data, informations: updatedInformations, gtkList };
    onUpdateData(updatedData);
    setShowPointModal(false);
    setEditingPointIdx(null);
    setPointForm({ title: '', desc: '' });
    showNotificationMsg('success', editingPointIdx !== null ? 'Poin informasi berhasil diperbarui.' : 'Poin informasi baru berhasil ditambahkan.');
  };

  const handleDeletePointAdmin = (index: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus poin informasi ini?')) return;
    const currentPoints = [...(data.informations[selectedInfoKey].points || [])];
    currentPoints.splice(index, 1);

    const updatedInformations = {
      ...data.informations,
      [selectedInfoKey]: {
        ...data.informations[selectedInfoKey],
        points: currentPoints,
        lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      },
    };

    const updatedData = { ...data, informations: updatedInformations, gtkList };
    onUpdateData(updatedData);
    showNotificationMsg('success', 'Poin informasi berhasil dihapus.');
  };

  // GTK Handlers
  const handleSaveGtkMember = () => {
    if (!editingGtk?.name) return;
    let updated: GTKMember[];
    if (editingGtk.id.startsWith('new-')) {
      updated = [...gtkList, { ...editingGtk, id: `gtk-${Date.now()}` }];
    } else {
      updated = gtkList.map((g) => (g.id === editingGtk.id ? editingGtk : g));
    }
    setGtkList(updated);
    const updatedData = { ...data, gtkList: updated };
    onUpdateData(updatedData);
    setShowGtkModal(false);
    setEditingGtk(null);
    showNotificationMsg('success', 'Data Guru/Tendik berhasil disimpan.');
  };

  const handleDeleteGtk = (id: string) => {
    if (!window.confirm('Yakin ingin menghapus data GTK ini?')) return;
    const updated = gtkList.filter((g) => g.id !== id);
    setGtkList(updated);
    const updatedData = { ...data, gtkList: updated };
    onUpdateData(updatedData);
    showNotificationMsg('success', 'Data GTK berhasil dihapus.');
  };

  // ====================================================
  // HANDLERS FOR BERITA
  // ====================================================
  const handleSaveNews = () => {
    if (!newsForm.title || !newsForm.content) {
      showNotificationMsg('error', 'Judul dan isi berita wajib diisi.');
      return;
    }

    let updatedNews: NewsItem[];
    if (isAddingNews) {
      const newItem: NewsItem = {
        id: `news-${Date.now()}`,
        title: newsForm.title || '',
        slug: (newsForm.title || '').toLowerCase().replace(/\s+/g, '-'),
        summary: newsForm.summary || (newsForm.content || '').substring(0, 120),
        content: newsForm.content || '',
        category: (newsForm.category as any) || 'Akademik',
        author: newsForm.author || currentUser.name,
        date: newsForm.date || new Date().toLocaleDateString('id-ID'),
        thumbnail: newsForm.thumbnail || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
        views: 0,
        tags: Array.isArray(newsForm.tags) ? newsForm.tags : ['Madrasah'],
      };
      updatedNews = [newItem, ...newsList];
    } else if (editingNews) {
      updatedNews = newsList.map((n) =>
        n.id === editingNews.id
          ? {
              ...n,
              ...newsForm,
              title: newsForm.title || n.title,
              summary: newsForm.summary || n.summary,
              content: newsForm.content || n.content,
            }
          : n
      );
    } else {
      return;
    }

    setNewsList(updatedNews);
    const updatedData = { ...data, news: updatedNews };
    onUpdateData(updatedData);
    setIsAddingNews(false);
    setEditingNews(null);
    showNotificationMsg('success', 'Berita berhasil disimpan.');
  };

  const handleDeleteNews = (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;
    const updated = newsList.filter((n) => n.id !== id);
    setNewsList(updated);
    const updatedData = { ...data, news: updated };
    onUpdateData(updatedData);
    showNotificationMsg('success', 'Berita berhasil dihapus.');
  };

  // ====================================================
  // HANDLERS FOR GALLERY
  // ====================================================
  const handleSaveGallery = () => {
    if (!galleryForm.title || !galleryForm.imageUrl) {
      showNotificationMsg('error', 'Judul dan URL Foto wajib diisi.');
      return;
    }

    let updatedGallery: GalleryItem[];
    if (isAddingGallery) {
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        title: galleryForm.title || '',
        description: galleryForm.description || '',
        category: (galleryForm.category as any) || 'Kegiatan',
        imageUrl: galleryForm.imageUrl || '',
        date: galleryForm.date || new Date().toISOString().split('T')[0],
        location: galleryForm.location || 'MIN 4 Kuningan',
      };
      updatedGallery = [newItem, ...galleryList];
    } else if (editingGallery) {
      updatedGallery = galleryList.map((g) =>
        g.id === editingGallery.id ? ({ ...g, ...galleryForm } as GalleryItem) : g
      );
    } else {
      return;
    }

    setGalleryList(updatedGallery);
    const updatedData = { ...data, gallery: updatedGallery };
    onUpdateData(updatedData);
    setIsAddingGallery(false);
    setEditingGallery(null);
    showNotificationMsg('success', 'Foto galeri berhasil disimpan.');
  };

  const handleDeleteGallery = (id: string) => {
    if (!window.confirm('Yakin ingin menghapus foto dari galeri?')) return;
    const updated = galleryList.filter((g) => g.id !== id);
    setGalleryList(updated);
    const updatedData = { ...data, gallery: updated };
    onUpdateData(updatedData);
    showNotificationMsg('success', 'Foto berhasil dihapus.');
  };

  // ====================================================
  // HANDLERS FOR TENTANG KAMI
  // ====================================================
  const handleSaveAbout = () => {
    const updatedData = { ...data, about: aboutForm };
    onUpdateData(updatedData);
    showNotificationMsg('success', 'Data Tentang Kami berhasil disimpan.');
  };

  // ====================================================
  // HANDLERS FOR PENGATURAN (Logo, Background, Running text, Users)
  // ====================================================
  const handleSaveSettings = () => {
    const updatedData = {
      ...data,
      settings: { ...settingsForm },
    };
    onUpdateData(updatedData);
    showNotificationMsg('success', 'Pengaturan Website berhasil diperbarui.');
  };

  // User Management Handlers
  const handleSaveUser = () => {
    if (!userForm.name || !userForm.username) {
      showNotificationMsg('error', 'Nama dan Username wajib diisi.');
      return;
    }

    let updatedUsers: UserAccount[];
    if (isAddingUser) {
      const newUser: UserAccount = {
        id: `usr-${Date.now()}`,
        name: userForm.name || '',
        nip: userForm.nip || '',
        username: (userForm.username || '').toLowerCase().trim(),
        email: userForm.email || '',
        whatsapp: userForm.whatsapp || '',
        role: userForm.role || 'user',
        password: userForm.password || '123456',
        avatar: userForm.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        createdAt: new Date().toISOString().split('T')[0],
      };
      updatedUsers = [...userList, newUser];
    } else if (editingUser) {
      updatedUsers = userList.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              name: userForm.name || u.name,
              nip: userForm.nip || u.nip,
              username: userForm.username || u.username,
              email: userForm.email || u.email,
              whatsapp: userForm.whatsapp || u.whatsapp,
              role: userForm.role || u.role,
              password: userForm.password ? userForm.password : u.password,
              avatar: userForm.avatar !== undefined && userForm.avatar !== '' ? userForm.avatar : u.avatar,
            }
          : u
      );

      // If updating current logged in user, sync session
      if (editingUser.id === currentUser.id) {
        const updatedCurrent: UserAccount = {
          ...currentUser,
          name: userForm.name || currentUser.name,
          nip: userForm.nip || currentUser.nip,
          username: userForm.username || currentUser.username,
          email: userForm.email || currentUser.email,
          whatsapp: userForm.whatsapp || currentUser.whatsapp,
          role: userForm.role || currentUser.role,
          avatar: userForm.avatar !== undefined && userForm.avatar !== '' ? userForm.avatar : currentUser.avatar,
        };
        onUpdateCurrentUser?.(updatedCurrent);
      }
    } else {
      return;
    }

    setUserList(updatedUsers);
    const updatedData = { ...data, users: updatedUsers };
    onUpdateData(updatedData);
    setIsAddingUser(false);
    setEditingUser(null);
    setUserForm({
      name: '',
      nip: '',
      username: '',
      email: '',
      whatsapp: '',
      role: 'user',
      password: '',
      avatar: '',
    });
    showNotificationMsg('success', 'Data User berhasil disimpan.');
  };

  const handleCancelUserForm = () => {
    setIsAddingUser(false);
    setEditingUser(null);
    setUserForm({
      name: '',
      nip: '',
      username: '',
      email: '',
      whatsapp: '',
      role: 'user',
      password: '',
      avatar: '',
    });
    showNotificationMsg('error', 'Batal memproses formulir user.');
  };

  const handleDeleteUser = (id: string) => {
    if (userList.length <= 1) {
      showNotificationMsg('error', 'Tidak dapat menghapus user utama terakhir.');
      return;
    }
    if (id === currentUser.id) {
      showNotificationMsg('error', 'Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif.');
      return;
    }
    if (!window.confirm('Yakin ingin menghapus user ini?')) return;
    const updated = userList.filter((u) => u.id !== id);
    setUserList(updated);
    const updatedData = { ...data, users: updated };
    onUpdateData(updatedData);
    showNotificationMsg('success', 'User berhasil dihapus.');
  };

  const handleEditUserClick = (user: UserAccount) => {
    setEditingUser(user);
    setIsAddingUser(false);
    setUserForm({
      name: user.name,
      nip: user.nip,
      username: user.username,
      email: user.email,
      whatsapp: user.whatsapp,
      role: user.role,
      password: user.password || '',
      avatar: user.avatar || '',
    });
  };

  const handleOpenChangePhoto = (userToEdit: UserAccount) => {
    setPhotoModalUser(userToEdit);
    setIsPhotoModalOpen(true);
  };

  const handleSaveUserPhoto = (newAvatarUrl: string) => {
    if (!photoModalUser) return;
    const updatedUsers = userList.map((u) =>
      u.id === photoModalUser.id ? { ...u, avatar: newAvatarUrl } : u
    );
    setUserList(updatedUsers);
    const updatedData = { ...data, users: updatedUsers };
    onUpdateData(updatedData);

    // If current logged-in user's photo is changed, update session
    if (photoModalUser.id === currentUser.id) {
      const updatedCurrent = { ...currentUser, avatar: newAvatarUrl };
      onUpdateCurrentUser?.(updatedCurrent);
    }

    // If form is open for this user, also update the form preview
    if (editingUser && editingUser.id === photoModalUser.id) {
      setUserForm((prev) => ({ ...prev, avatar: newAvatarUrl }));
    }

    showNotificationMsg('success', `Foto profil ${photoModalUser.name} berhasil diperbarui.`);
    setIsPhotoModalOpen(false);
    setPhotoModalUser(null);
  };

  return (
    <div id="admin-panel-container" className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Bar */}
      <header className="bg-[#0B2545] text-white border-b-2 border-emerald-600 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-white rounded-lg">
              <img
                src={data.settings.logoUrl}
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 uppercase tracking-wider">
                  PANEL ADMINISTRASI
                </span>
                <span className="text-xs text-emerald-300 font-semibold hidden sm:inline">
                  • {data.profile.nama}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
                Sistem Informasi & Manajemen Madrasah
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Live Public Web Button */}
            <button
              id="admin-view-public-btn"
              onClick={onBackToPublic}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm transition-all flex items-center space-x-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lihat Website Publik</span>
              <span className="sm:hidden">Web</span>
            </button>

            {/* Logout Button */}
            <button
              id="admin-logout-btn"
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-900/80 hover:bg-rose-800 text-rose-100 shadow-sm transition-all flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-3 duration-200">
          <div className={`p-4 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-bold ${
            notification.type === 'success' ? 'bg-emerald-800 text-white' : 'bg-rose-800 text-white'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-300" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Admin Workspace (Left Sidebar + Center Content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ====================================================
            ADMIN LEFT SIDEBAR (Requirement 3.a)
            1. Profil Madrasah
            2. Informasi
            3. Berita
            4. Gallery
            5. Tentang Kami
            6. Pengaturan (Admin Only)
           ==================================================== */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 space-y-4">
            {/* User Session Mini Profile */}
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <div className="relative group shrink-0">
                <div 
                  onClick={() => handleOpenChangePhoto(currentUser)}
                  className="w-11 h-11 rounded-full overflow-hidden bg-slate-100 border-2 border-emerald-600 shadow-2xs cursor-pointer hover:opacity-90 transition-opacity"
                  title="Klik untuk ubah foto profil akun Anda"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenChangePhoto(currentUser)}
                  title="Ubah Foto Profil"
                  className="absolute -bottom-1 -right-1 p-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full border border-white shadow-xs cursor-pointer transition-transform hover:scale-110"
                >
                  <Camera className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</h4>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                    currentUser.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                  }`}>
                    {currentUser.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenChangePhoto(currentUser)}
                    className="text-[10px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center space-x-0.5 cursor-pointer"
                    title="Ubah Foto Profil"
                  >
                    <Camera className="w-2.5 h-2.5 mr-0.5" />
                    <span>Ubah Foto</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Menu List */}
            <div className="space-y-1">
              <button
                id="admin-menu-profil"
                onClick={() => setActiveSection('profil')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-all ${
                  activeSection === 'profil'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span>1. Profil Madrasah</span>
              </button>

              <button
                id="admin-menu-informasi"
                onClick={() => setActiveSection('informasi')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-all ${
                  activeSection === 'informasi'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>2. Informasi</span>
              </button>

              <button
                id="admin-menu-berita"
                onClick={() => setActiveSection('berita')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-all ${
                  activeSection === 'berita'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Newspaper className="w-4 h-4 flex-shrink-0" />
                <span>3. Berita</span>
              </button>

              <button
                id="admin-menu-gallery"
                onClick={() => setActiveSection('gallery')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-all ${
                  activeSection === 'gallery'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-4 h-4 flex-shrink-0" />
                <span>4. Gallery</span>
              </button>

              <button
                id="admin-menu-tentang"
                onClick={() => setActiveSection('tentang-kami')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-all ${
                  activeSection === 'tentang-kami'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <HelpCircle className="w-4 h-4 flex-shrink-0" />
                <span>5. Tentang Kami</span>
              </button>

              {/* Requirement: Selain User dengan kredensial Admin tidak dapat menggunakan Menu Pengaturan */}
              {currentUser.role === 'admin' ? (
                <button
                  id="admin-menu-pengaturan"
                  onClick={() => setActiveSection('pengaturan')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-all ${
                    activeSection === 'pengaturan'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-700 hover:bg-amber-50 hover:text-amber-900'
                  }`}
                >
                  <Settings className="w-4 h-4 flex-shrink-0" />
                  <span>6. Pengaturan (Admin)</span>
                </button>
              ) : (
                <div 
                  title="Menu Pengaturan hanya dapat diakses oleh akun Admin"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 bg-slate-50 flex items-center space-x-2.5 cursor-not-allowed border border-dashed border-slate-200"
                >
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  <span>6. Pengaturan (Terkunci)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ====================================================
            ADMIN WORKSPACE CONTENT BODY
           ==================================================== */}
        <div className="lg:col-span-9">

          {/* ----------------------------------------------------
              SECTION 1: PROFIL MADRASAH
              Ketentuan:
              - Nama Madrasah
              - NSM
              - NPSM
              - Kepala Madrasah
              - NIP
              - Alamat
              - Email Madrasah
              Tambahkan:
              - Tombol Simpan
              - Tombol Batal
              - Tombol Edit
             ---------------------------------------------------- */}
          {activeSection === 'profil' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center space-x-2">
                    <Building2 className="w-6 h-6 text-emerald-700" />
                    <span>Data Profil Madrasah</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Informasi identitas kelembagaan resmi MIN 4 Kuningan
                  </p>
                </div>

                {/* Top Action Buttons (Edit / Simpan / Batal) */}
                <div className="flex items-center space-x-2">
                  {!isEditingProfile ? (
                    <button
                      id="btn-edit-profil-madrasah"
                      onClick={() => setIsEditingProfile(true)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Tombol Edit</span>
                    </button>
                  ) : (
                    <>
                      <button
                        id="btn-batal-profil-madrasah"
                        onClick={handleCancelProfile}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Tombol Batal</span>
                      </button>
                      <button
                        id="btn-simpan-profil-madrasah"
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Tombol Simpan</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Profil Fields Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Madrasah *
                  </label>
                  <input
                    id="input-nama-madrasah"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.nama}
                    onChange={(e) => setProfileForm({ ...profileForm, nama: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    NSM (Nomor Statistik Madrasah) *
                  </label>
                  <input
                    id="input-nsm-madrasah"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.nsm}
                    onChange={(e) => setProfileForm({ ...profileForm, nsm: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    NPSM / NPSN *
                  </label>
                  <input
                    id="input-npsm-madrasah"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.npsm}
                    onChange={(e) => setProfileForm({ ...profileForm, npsm: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kepala Madrasah *
                  </label>
                  <input
                    id="input-kepala-madrasah"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.kepalaMadrasah}
                    onChange={(e) => setProfileForm({ ...profileForm, kepalaMadrasah: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    NIP Kepala Madrasah *
                  </label>
                  <input
                    id="input-nip-kepala"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.nip}
                    onChange={(e) => setProfileForm({ ...profileForm, nip: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Madrasah *
                  </label>
                  <input
                    id="input-email-madrasah"
                    type="email"
                    disabled={!isEditingProfile}
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nomor Telepon / Kontak Madrasah *
                  </label>
                  <input
                    id="input-telepon-madrasah"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.telepon || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, telepon: e.target.value })}
                    placeholder="Contoh: (0232) 871234 atau 0812-xxxx-xxxx"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Alamat Lengkap Madrasah *
                  </label>
                  <textarea
                    id="input-alamat-madrasah"
                    rows={2}
                    disabled={!isEditingProfile}
                    value={profileForm.alamat}
                    onChange={(e) => setProfileForm({ ...profileForm, alamat: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Sambutan Resmi Kepala Madrasah
                  </label>
                  <textarea
                    id="input-sambutan-kepala"
                    rows={4}
                    disabled={!isEditingProfile}
                    value={profileForm.sambutan}
                    onChange={(e) => setProfileForm({ ...profileForm, sambutan: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Foto Kepala Madrasah (URL)
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.fotoKepala}
                    onChange={(e) => setProfileForm({ ...profileForm, fotoKepala: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Motto / Slogan Madrasah
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.motto}
                    onChange={(e) => setProfileForm({ ...profileForm, motto: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Status Madrasah *
                  </label>
                  <input
                    id="input-status-madrasah"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.status}
                    onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                    placeholder="Contoh: Negeri (Kementerian Agama RI)"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Peringkat Akreditasi *
                  </label>
                  <input
                    id="input-akreditasi-madrasah"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.akreditasi}
                    onChange={(e) => setProfileForm({ ...profileForm, akreditasi: e.target.value })}
                    placeholder="Contoh: B (Unggul) BAN-S/M atau A (Unggul)"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kurikulum yang Diterapkan *
                  </label>
                  <input
                    id="input-kurikulum-madrasah"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.kurikulum || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, kurikulum: e.target.value })}
                    placeholder="Contoh: Kurikulum Berbasis Cinta (KBC)"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Jam Belajar / Jam Layanan *
                  </label>
                  <input
                    id="input-jambelajar-madrasah"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.jamBelajar || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, jamBelajar: e.target.value })}
                    placeholder="Contoh: 07.00 - 14.30 WIB"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-hidden transition-all ${
                      isEditingProfile
                        ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/10'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                </div>
              </div>

              {/* Bottom Action Buttons */}
              {isEditingProfile && (
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                  <button
                    onClick={handleCancelProfile}
                    className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    Tombol Batal
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Tombol Simpan Perubahan</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------
              SECTION 2: INFORMASI
              Allows editing: Sejarah, Visi Misi, Tujuan, Kemasyarakatan, Kesiswaan, Info GTK
             ---------------------------------------------------- */}
          {activeSection === 'informasi' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center space-x-2">
                    <Info className="w-6 h-6 text-emerald-700" />
                    <span>Kelola Data Informasi Madrasah</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pilih kategori informasi yang ingin diubah dan disimpan
                  </p>
                </div>

                <button
                  onClick={handleSaveInfo}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Informasi</span>
                </button>
              </div>

              {/* Sub Category Selector Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'sejarah', label: 'Sejarah Singkat' },
                  { key: 'visimisi', label: 'Visi dan Misi' },
                  { key: 'tujuan', label: 'Tujuan Madrasah' },
                  { key: 'kemasyarakatan', label: 'Kemasyarakatan' },
                  { key: 'kesiswaan', label: 'Kesiswaan' },
                  { key: 'gtk', label: 'Info GTK (Guru & Tendik)' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => handleSelectInfoCategory(tab.key as InfoCategoryKey)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedInfoKey === tab.key
                        ? 'bg-[#0B2545] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Form for selected Information Category */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Judul Informasi
                  </label>
                  <input
                    type="text"
                    value={infoForm.title}
                    onChange={(e) => setInfoForm({ ...infoForm, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 text-xs bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sub Judul / Ringkasan
                  </label>
                  <input
                    type="text"
                    value={infoForm.subtitle}
                    onChange={(e) => setInfoForm({ ...infoForm, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 text-xs bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Isi Lengkap Informasi (Mendukung paragraf)
                  </label>
                  <textarea
                    rows={8}
                    value={infoForm.content}
                    onChange={(e) => setInfoForm({ ...infoForm, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 text-xs bg-slate-50 leading-relaxed font-sans"
                  />
                </div>
              </div>

              {/* Point / Program Items Manager for Selected Category (Kesiswaan, Kemasyarakatan, etc.) */}
              {selectedInfoKey !== 'gtk' && (
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-emerald-700" />
                        <span>
                          Daftar Poin & Uraian Program {selectedInfoKey === 'kesiswaan' ? 'Kesiswaan' : selectedInfoKey === 'kemasyarakatan' ? 'Kemasyarakatan' : data.informations[selectedInfoKey].title}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        Kelola rincian informasi, ekstrakurikuler, dan kegiatan madrasah
                      </p>
                    </div>

                    <button
                      id={`btn-admin-add-point-${selectedInfoKey}`}
                      onClick={handleOpenAddPointAdmin}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>
                        + Tambah Informasi {selectedInfoKey === 'kesiswaan' ? 'Kesiswaan' : selectedInfoKey === 'kemasyarakatan' ? 'Kemasyarakatan' : ''}
                      </span>
                    </button>
                  </div>

                  {data.informations[selectedInfoKey]?.points && data.informations[selectedInfoKey].points.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-3 w-12 text-center">No</th>
                            <th className="p-3 w-1/3">Judul Program / Kegiatan</th>
                            <th className="p-3">Uraian & Deskripsi Lengkap</th>
                            <th className="p-3 w-24 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {data.informations[selectedInfoKey].points.map((pt, pIdx) => (
                            <tr key={pIdx} className="hover:bg-slate-50">
                              <td className="p-3 text-center font-bold text-slate-500">{pIdx + 1}</td>
                              <td className="p-3 font-bold text-slate-800">{pt.title}</td>
                              <td className="p-3 text-slate-600 leading-relaxed">{pt.desc}</td>
                              <td className="p-3 text-center space-x-1.5 whitespace-nowrap">
                                <button
                                  onClick={() => handleOpenEditPointAdmin(pIdx)}
                                  className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 transition-colors"
                                  title="Edit Poin Ini"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeletePointAdmin(pIdx)}
                                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors"
                                  title="Hapus Poin Ini"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                      <p className="text-xs text-slate-500">Belum ada rincian poin informasi yang ditambahkan.</p>
                      <button
                        onClick={handleOpenAddPointAdmin}
                        className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold inline-flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Poin Pertama</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Special GTK List Manager when 'gtk' is selected */}
              {selectedInfoKey === 'gtk' && (
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Manajemen Daftar Dewan Guru & Tenaga Kependidikan (GTK)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Tambah atau perbarui data staf pengajar MIN 4 Kuningan
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingGtk({
                          id: `new-${Date.now()}`,
                          name: '',
                          nip: '',
                          role: 'Guru Kelas',
                          subject: '',
                          education: 'S1 PGMI',
                          photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
                          order: gtkList.length + 1,
                        });
                        setShowGtkModal(true);
                      }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Guru/Tendik</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Foto</th>
                          <th className="p-3">Nama Lengkap</th>
                          <th className="p-3">NIP</th>
                          <th className="p-3">Jabatan</th>
                          <th className="p-3">Mapel / Bidang</th>
                          <th className="p-3 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {gtkList.map((gtk) => (
                          <tr key={gtk.id} className="hover:bg-slate-50">
                            <td className="p-3">
                              <img
                                src={gtk.photo}
                                alt={gtk.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            </td>
                            <td className="p-3 font-bold text-slate-800">{gtk.name}</td>
                            <td className="p-3 font-mono text-slate-500">{gtk.nip}</td>
                            <td className="p-3">{gtk.role}</td>
                            <td className="p-3">{gtk.subject}</td>
                            <td className="p-3 text-center space-x-2">
                              <button
                                onClick={() => {
                                  setEditingGtk(gtk);
                                  setShowGtkModal(true);
                                }}
                                className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteGtk(gtk.id)}
                                className="p-1 rounded-md text-rose-600 hover:bg-rose-100"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------
              SECTION 3: BERITA
             ---------------------------------------------------- */}
          {activeSection === 'berita' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center space-x-2">
                    <Newspaper className="w-6 h-6 text-emerald-700" />
                    <span>Manajemen Berita & Artikel</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kelola publikasi warta berita, prestasi, dan pengumuman madrasah
                  </p>
                </div>

                {!isAddingNews && !editingNews && (
                  <button
                    onClick={() => {
                      setIsAddingNews(true);
                      setNewsForm({
                        title: '',
                        summary: '',
                        content: '',
                        category: 'Akademik',
                        author: currentUser.name,
                        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                        thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
                        views: 0,
                        tags: ['Madrasah'],
                      });
                    }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Berita Baru</span>
                  </button>
                )}
              </div>

              {/* Form Add / Edit News */}
              {(isAddingNews || editingNews) ? (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center justify-between">
                    <span>{isAddingNews ? 'Form Tambah Berita Baru' : 'Form Edit Berita'}</span>
                    <button
                      onClick={() => {
                        setIsAddingNews(false);
                        setEditingNews(null);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-700"
                    >
                      Batal
                    </button>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Judul Berita *
                      </label>
                      <input
                        type="text"
                        value={newsForm.title || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                        placeholder="Contoh: Siswa MIN 4 Kuningan Raih Medali Emas..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Kategori Berita
                      </label>
                      <select
                        value={newsForm.category}
                        onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                      >
                        <option value="Akademik">Akademik</option>
                        <option value="Prestasi">Prestasi</option>
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Keagamaan">Keagamaan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Penulis / Humas
                      </label>
                      <input
                        type="text"
                        value={newsForm.author || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Gambar Thumbnail (URL Gambar)
                      </label>
                      <input
                        type="text"
                        value={newsForm.thumbnail || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, thumbnail: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Ringkasan Singkat Berita
                      </label>
                      <textarea
                        rows={2}
                        value={newsForm.summary || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                        placeholder="Ringkasan 1-2 kalimat..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Isi Berita Lengkap *
                      </label>
                      <textarea
                        rows={6}
                        value={newsForm.content || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                        placeholder="Tuliskan isi berita secara lengkap di sini..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white leading-relaxed"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => {
                        setIsAddingNews(false);
                        setEditingNews(null);
                      }}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSaveNews}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm"
                    >
                      Simpan Berita
                    </button>
                  </div>
                </div>
              ) : (
                /* News List Table */
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Thumbnail</th>
                        <th className="p-3">Judul Berita</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Tanggal</th>
                        <th className="p-3">Penulis</th>
                        <th className="p-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {newsList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="p-3">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-12 h-10 object-cover rounded-lg"
                            />
                          </td>
                          <td className="p-3 font-bold text-slate-800 max-w-xs truncate">
                            {item.title}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {item.category}
                            </span>
                          </td>
                          <td className="p-3 text-slate-500">{item.date}</td>
                          <td className="p-3 text-slate-600">{item.author}</td>
                          <td className="p-3 text-center space-x-2">
                            <button
                              onClick={() => {
                                setEditingNews(item);
                                setNewsForm({ ...item });
                              }}
                              className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 transition-colors"
                              title="Edit Berita"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteNews(item.id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors"
                              title="Hapus Berita"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------
              SECTION 4: GALLERY
             ---------------------------------------------------- */}
          {activeSection === 'gallery' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center space-x-2">
                    <ImageIcon className="w-6 h-6 text-emerald-700" />
                    <span>Manajemen Galeri Foto</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tambah, edit, dan hapus dokumentasi foto madrasah
                  </p>
                </div>

                {!isAddingGallery && !editingGallery && (
                  <button
                    onClick={() => {
                      setIsAddingGallery(true);
                      setGalleryForm({
                        title: '',
                        description: '',
                        category: 'Kegiatan',
                        imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
                        date: new Date().toISOString().split('T')[0],
                        location: 'MIN 4 Kuningan',
                      });
                    }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Foto Baru</span>
                  </button>
                )}
              </div>

              {/* Form Add / Edit Gallery */}
              {(isAddingGallery || editingGallery) ? (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center justify-between">
                    <span>{isAddingGallery ? 'Tambah Foto Galeri' : 'Edit Foto Galeri'}</span>
                    <button
                      onClick={() => {
                        setIsAddingGallery(false);
                        setEditingGallery(null);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-700"
                    >
                      Batal
                    </button>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Judul / Nama Kegiatan Foto *
                      </label>
                      <input
                        type="text"
                        value={galleryForm.title || ''}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Kategori Foto
                      </label>
                      <select
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                      >
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Prestasi">Prestasi</option>
                        <option value="Fasilitas">Fasilitas</option>
                        <option value="Pembelajaran">Pembelajaran</option>
                        <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Lokasi Pengambilan
                      </label>
                      <input
                        type="text"
                        value={galleryForm.location || ''}
                        onChange={(e) => setGalleryForm({ ...galleryForm, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        URL Gambar Foto *
                      </label>
                      <input
                        type="text"
                        value={galleryForm.imageUrl || ''}
                        onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">
                        Deskripsi Foto
                      </label>
                      <textarea
                        rows={3}
                        value={galleryForm.description || ''}
                        onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => {
                        setIsAddingGallery(false);
                        setEditingGallery(null);
                      }}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSaveGallery}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm"
                    >
                      Simpan Foto
                    </button>
                  </div>
                </div>
              ) : (
                /* Gallery Grid in Admin */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryList.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-2 p-3"
                    >
                      <div className="h-32 rounded-xl overflow-hidden bg-slate-100 relative">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-slate-900/80 text-white">
                          {item.category}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-slate-400">{item.date}</span>
                        <div className="space-x-1">
                          <button
                            onClick={() => {
                              setEditingGallery(item);
                              setGalleryForm({ ...item });
                            }}
                            className="p-1 rounded text-emerald-700 hover:bg-emerald-100"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteGallery(item.id)}
                            className="p-1 rounded text-rose-600 hover:bg-rose-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------
              SECTION 5: TENTANG KAMI
             ---------------------------------------------------- */}
          {activeSection === 'tentang-kami' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center space-x-2">
                    <HelpCircle className="w-6 h-6 text-emerald-700" />
                    <span>Kelola Konten Tentang Kami</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pengaturan statistik madrasah, deskripsi sejarah, dan kontak
                  </p>
                </div>

                <button
                  onClick={handleSaveAbout}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Data</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ringkasan Sejarah Singkat Tentang Kami
                  </label>
                  <textarea
                    rows={3}
                    value={aboutForm.historySummary}
                    onChange={(e) => setAboutForm({ ...aboutForm, historySummary: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 bg-slate-50"
                  />
                </div>

                {/* Statistics Editor */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-800 mb-2">Statistik Madrasah</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Jumlah Siswa</label>
                      <input
                        type="number"
                        value={aboutForm.stats.jumlahSiswa}
                        onChange={(e) =>
                          setAboutForm({
                            ...aboutForm,
                            stats: { ...aboutForm.stats, jumlahSiswa: parseInt(e.target.value) || 0 },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Jumlah Rombel</label>
                      <input
                        type="number"
                        value={aboutForm.stats.jumlahRombel}
                        onChange={(e) =>
                          setAboutForm({
                            ...aboutForm,
                            stats: { ...aboutForm.stats, jumlahRombel: parseInt(e.target.value) || 0 },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Jumlah Guru</label>
                      <input
                        type="number"
                        value={aboutForm.stats.jumlahGuru}
                        onChange={(e) =>
                          setAboutForm({
                            ...aboutForm,
                            stats: { ...aboutForm.stats, jumlahGuru: parseInt(e.target.value) || 0 },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Jumlah Staf</label>
                      <input
                        type="number"
                        value={aboutForm.stats.jumlahStaf}
                        onChange={(e) =>
                          setAboutForm({
                            ...aboutForm,
                            stats: { ...aboutForm.stats, jumlahStaf: parseInt(e.target.value) || 0 },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              SECTION 6: PENGATURAN (Admin Only)
              Ketentuan:
              - Ubah Logo Madrasah
              - Ubah Gambar Latar Belakang Website
              - Ubah Running Text
              - Tambah dan Ubah Jenis User dengan ketentuan:
                a. Nama User
                b. NIP
                c. Username
                d. Alamat Email User
                e. No Wa User
                f. Jenis Kredensial User (Dropdown: Admin, User)
                g. Tampilkan Daftar User dalam bentuk tabel dengan tambahan icon edit, hapus
                h. Tombol Simpan dan Batal
                i. Ubah/Ganti Password
             ---------------------------------------------------- */}
          {activeSection === 'pengaturan' && currentUser.role === 'admin' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center space-x-2">
                    <Settings className="w-6 h-6 text-amber-600" />
                    <span>Pengaturan Sistem & Manajemen User</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kustomisasi logo, latar belakang, running text, dan akun pengguna
                  </p>
                </div>

                <button
                  id="save-general-settings-btn"
                  onClick={handleSaveSettings}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Pengaturan Web</span>
                </button>
              </div>

              {/* Sub-section A: Ubah Logo Madrasah */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-emerald-700" />
                  <span>1. Ubah Logo Madrasah</span>
                </h4>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs flex-shrink-0">
                    <img
                      src={settingsForm.logoUrl}
                      alt="Preview Logo"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      URL Gambar Logo (Format PNG/SVG Transparan disarankan):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.logoUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                    />
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                      <span>Pilihan cepat:</span>
                      <button
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Kemenag_logo.png/600px-Kemenag_logo.png' })}
                        className="text-emerald-700 hover:underline font-semibold"
                      >
                        Logo Kemenag RI
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg' })}
                        className="text-emerald-700 hover:underline font-semibold"
                      >
                        Logo Tut Wuri
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-section B: Ubah Gambar Latar Belakang Website */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  <span>2. Ubah Gambar Latar Belakang Website</span>
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      URL Gambar Latar Belakang:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.backgroundUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, backgroundUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Pola Latar Belakang (Motif Pattern):
                    </label>
                    <select
                      value={settingsForm.backgroundPattern}
                      onChange={(e) => setSettingsForm({ ...settingsForm, backgroundPattern: e.target.value as any })}
                      className="w-full sm:w-64 px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="islamic">Motif Ornamen Islam Halus</option>
                      <option value="dots">Titik Halus (Dots)</option>
                      <option value="grid">Kotak Grid Elegan</option>
                      <option value="none">Polos (Solid)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sub-section C: Ubah Running Text (Teks, Kecepatan, dan Warna) */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-emerald-700" />
                    <span>3. Pengaturan Running Text (Teks, Kecepatan & Warna)</span>
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Sticky Bar Bawah Menu
                  </span>
                </div>

                {/* 1. Isi Pengumuman Teks Berjalan */}
                <div className="space-y-1.5 text-xs">
                  <label className="block font-semibold text-slate-700">
                    Isi Pengumuman Teks Berjalan:
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.runningText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, runningText: e.target.value })}
                    placeholder="Tuliskan teks berjalan pengumuman madrasah di sini..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white font-medium text-slate-800"
                  />
                  <p className="text-[11px] text-slate-400">
                    Teks ini akan selalu tampil pada pita pengumuman di bawah navbar web.
                  </p>
                </div>

                {/* 2. Opsi Pengatur Kecepatan Running Text */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 flex items-center space-x-2">
                      <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Kecepatan Berjalan (Durasi Animasi):</span>
                    </label>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {settingsForm.runningTextSpeed || 25} detik / putaran
                    </span>
                  </div>

                  {/* Tombol Preset Kecepatan Cepat */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { label: 'Sangat Lambat', sec: 45, icon: '🐢' },
                      { label: 'Lambat', sec: 35, icon: '🚶' },
                      { label: 'Normal (Standar)', sec: 25, icon: '⚖️' },
                      { label: 'Cepat', sec: 18, icon: '⚡' },
                      { label: 'Sangat Cepat', sec: 12, icon: '🚀' },
                    ].map((preset) => {
                      const isActive = (settingsForm.runningTextSpeed || 25) === preset.sec;
                      return (
                        <button
                          key={preset.sec}
                          type="button"
                          onClick={() => setSettingsForm({ ...settingsForm, runningTextSpeed: preset.sec })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                            isActive
                              ? 'bg-emerald-700 text-white font-bold shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <span>{preset.icon}</span>
                          <span>{preset.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Slider Pengatur Detik */}
                  <div className="space-y-1 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Makin Cepat (10 dtk)</span>
                      <span>Geser untuk atur durasi manual</span>
                      <span>Makin Lambat (60 dtk)</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      step={1}
                      value={settingsForm.runningTextSpeed || 25}
                      onChange={(e) => setSettingsForm({ ...settingsForm, runningTextSpeed: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* 3. Pengaturan Warna Running Text */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-4">
                  <div className="flex items-center space-x-2 pb-1 border-b border-slate-100">
                    <Palette className="w-3.5 h-3.5 text-emerald-600" />
                    <label className="text-xs font-bold text-slate-800">
                      Pengaturan Warna Pita & Teks Pengumuman:
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* A. Warna Latar Belakang (Background) */}
                    <div className="space-y-2 text-xs">
                      <label className="block font-semibold text-slate-700">
                        Warna Latar Belakang (Pita):
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={settingsForm.runningTextBgColor || '#064E3B'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, runningTextBgColor: e.target.value })}
                          className="w-9 h-9 rounded-lg border border-slate-300 p-0.5 cursor-pointer bg-white"
                          title="Pilih warna latar"
                        />
                        <input
                          type="text"
                          value={settingsForm.runningTextBgColor || '#064E3B'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, runningTextBgColor: e.target.value })}
                          placeholder="#064E3B"
                          className="w-24 px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-700"
                        />
                      </div>
                      {/* Pilihan Cepat Warna Latar */}
                      <div className="flex items-center space-x-1 pt-1">
                        {[
                          { name: 'Hijau Kemenag', hex: '#064E3B' },
                          { name: 'Biru Navy', hex: '#0B2545' },
                          { name: 'Zamrud', hex: '#047857' },
                          { name: 'Marun', hex: '#7F1D1D' },
                          { name: 'Cokelat Emas', hex: '#78350F' },
                          { name: 'Hitam', hex: '#0F172A' },
                        ].map((c) => (
                          <button
                            key={c.hex}
                            type="button"
                            onClick={() => setSettingsForm({ ...settingsForm, runningTextBgColor: c.hex })}
                            title={c.name}
                            style={{ backgroundColor: c.hex }}
                            className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${
                              (settingsForm.runningTextBgColor || '#064E3B') === c.hex ? 'border-amber-400 scale-110 ring-1 ring-amber-400' : 'border-white'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* B. Warna Teks Berjalan */}
                    <div className="space-y-2 text-xs">
                      <label className="block font-semibold text-slate-700">
                        Warna Teks Berjalan:
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={settingsForm.runningTextColor || '#FFFFFF'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, runningTextColor: e.target.value })}
                          className="w-9 h-9 rounded-lg border border-slate-300 p-0.5 cursor-pointer bg-white"
                          title="Pilih warna teks"
                        />
                        <input
                          type="text"
                          value={settingsForm.runningTextColor || '#FFFFFF'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, runningTextColor: e.target.value })}
                          placeholder="#FFFFFF"
                          className="w-24 px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-700"
                        />
                      </div>
                      {/* Pilihan Cepat Warna Teks */}
                      <div className="flex items-center space-x-1 pt-1">
                        {[
                          { name: 'Putih Bersih', hex: '#FFFFFF' },
                          { name: 'Kuning Emas', hex: '#FDE047' },
                          { name: 'Kuning Muda', hex: '#FEF08A' },
                          { name: 'Hijau Muda', hex: '#86EFAC' },
                          { name: 'Cyan Muda', hex: '#A5F3FC' },
                        ].map((c) => (
                          <button
                            key={c.hex}
                            type="button"
                            onClick={() => setSettingsForm({ ...settingsForm, runningTextColor: c.hex })}
                            title={c.name}
                            style={{ backgroundColor: c.hex }}
                            className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${
                              (settingsForm.runningTextColor || '#FFFFFF') === c.hex ? 'border-amber-500 scale-110 ring-1 ring-amber-500' : 'border-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* C. Warna Lencana INFORMASI TERKINI */}
                    <div className="space-y-2 text-xs">
                      <label className="block font-semibold text-slate-700">
                        Warna Lencana (Badge Info):
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={settingsForm.runningTextBadgeBg || '#FBBF24'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, runningTextBadgeBg: e.target.value })}
                          className="w-9 h-9 rounded-lg border border-slate-300 p-0.5 cursor-pointer bg-white"
                          title="Pilih warna badge"
                        />
                        <input
                          type="text"
                          value={settingsForm.runningTextBadgeBg || '#FBBF24'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, runningTextBadgeBg: e.target.value })}
                          placeholder="#FBBF24"
                          className="w-24 px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-700"
                        />
                      </div>
                      {/* Pilihan Cepat Warna Lencana */}
                      <div className="flex items-center space-x-1 pt-1">
                        {[
                          { name: 'Kuning Amber', hex: '#FBBF24' },
                          { name: 'Hijau Terang', hex: '#10B981' },
                          { name: 'Putih Bersih', hex: '#FFFFFF' },
                          { name: 'Merah Aksen', hex: '#EF4444' },
                        ].map((c) => (
                          <button
                            key={c.hex}
                            type="button"
                            onClick={() => setSettingsForm({ ...settingsForm, runningTextBadgeBg: c.hex })}
                            title={c.name}
                            style={{ backgroundColor: c.hex }}
                            className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${
                              (settingsForm.runningTextBadgeBg || '#FBBF24') === c.hex ? 'border-slate-900 scale-110 ring-1 ring-slate-900' : 'border-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Tinjauan Langsung (Live Preview Box) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center space-x-1.5">
                      <FastForward className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tinjauan Langsung (Live Preview):</span>
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Kecepatan: {settingsForm.runningTextSpeed || 25}s • Arahkan kursor untuk jeda
                    </span>
                  </div>

                  <div 
                    style={{ backgroundColor: settingsForm.runningTextBgColor || '#064E3B' }}
                    className="w-full rounded-xl border border-slate-300 shadow-inner overflow-hidden flex items-center h-10 px-3 transition-colors duration-300"
                  >
                    <div 
                      style={{ backgroundColor: settingsForm.runningTextBadgeBg || '#FBBF24' }}
                      className="flex-shrink-0 flex items-center space-x-1 text-slate-950 px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wide mr-2.5 select-none shadow-2xs"
                    >
                      <Volume2 className="w-3 h-3 text-slate-900" />
                      <span>INFORMASI TERKINI:</span>
                    </div>

                    <div className="flex-1 overflow-hidden relative whitespace-nowrap">
                      <div 
                        className="animate-marquee inline-block text-xs font-medium tracking-wide drop-shadow-sm"
                        style={{ 
                          animationDuration: `${settingsForm.runningTextSpeed || 25}s`,
                          color: settingsForm.runningTextColor || '#FFFFFF' 
                        }}
                      >
                        <span className="mr-8 inline-flex items-center">
                          ★ {settingsForm.runningText || 'Teks pengumuman madrasah...'} ★
                        </span>
                        <span className="mr-8 inline-flex items-center opacity-85">
                          Portal Resmi MIN 4 Kuningan — Madrasah Hebat Bermartabat
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-section D: Ubah Embed Google Maps */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>4. Ubah URL Embed Google Maps MIN 4 Kuningan</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    value={settingsForm.googleMapsEmbedUrl}
                    onChange={(e) => setSettingsForm({ ...settingsForm, googleMapsEmbedUrl: e.target.value })}
                    placeholder="https://www.google.com/maps/embed?..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white"
                  />
                </div>
              </div>

              {/* Sub-section E: MANAJEMEN USER (Requirement 3.6.4)
                  Ketentuan:
                  a. Nama User
                  b. NIP
                  c. Username
                  d. Alamat Email User
                  e. No Wa User
                  f. Jenis Kredensial User (Dropdown: Admin, User)
                  g. Tampilkan Daftar User dalam tabel dengan icon edit, hapus
                  h. Tombol Simpan dan Batal
                  i. Ubah/Ganti Password
              */}
              <div className="p-6 rounded-3xl bg-slate-50 border-2 border-emerald-800/20 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-800 flex items-center space-x-2">
                      <UserIcon className="w-5 h-5 text-emerald-700" />
                      <span>5. Manajemen Pengguna & Kredensial User</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Kelola hak akses Admin dan User Madrasah
                    </p>
                  </div>

                  {!isAddingUser && !editingUser && (
                    <button
                      id="btn-tambah-user-baru"
                      onClick={() => {
                        setIsAddingUser(true);
                        setEditingUser(null);
                        setUserForm({
                          name: '',
                          nip: '',
                          username: '',
                          email: '',
                          whatsapp: '',
                          role: 'user',
                          password: '',
                        });
                      }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah User Baru</span>
                    </button>
                  )}
                </div>

                {/* Form Tambah / Ubah User */}
                {(isAddingUser || editingUser) && (
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {isAddingUser ? 'Formulir Tambah User Baru' : `Ubah Data User: ${editingUser?.name}`}
                      </h5>
                      <button
                        onClick={handleCancelUserForm}
                        className="text-xs text-slate-500 hover:text-slate-700"
                      >
                        Batal
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      {/* a. Nama User */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          a. Nama Lengkap User *
                        </label>
                        <input
                          id="input-user-nama"
                          type="text"
                          value={userForm.name || ''}
                          onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                          placeholder="Contoh: Ust. Ahmad Fauzi, M.Pd."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-slate-50"
                          required
                        />
                      </div>

                      {/* b. NIP */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          b. NIP Pegawai
                        </label>
                        <input
                          id="input-user-nip"
                          type="text"
                          value={userForm.nip || ''}
                          onChange={(e) => setUserForm({ ...userForm, nip: e.target.value })}
                          placeholder="197608152005011004"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-slate-50"
                        />
                      </div>

                      {/* c. Username */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          c. Username Login *
                        </label>
                        <input
                          id="input-user-username"
                          type="text"
                          value={userForm.username || ''}
                          onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                          placeholder="username_login"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-slate-50 font-mono"
                          required
                        />
                      </div>

                      {/* d. Alamat Email User */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          d. Alamat Email User
                        </label>
                        <input
                          id="input-user-email"
                          type="email"
                          value={userForm.email || ''}
                          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                          placeholder="user@min4kuningan.sch.id"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-slate-50"
                        />
                      </div>

                      {/* e. No WA User */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          e. No. WhatsApp User
                        </label>
                        <input
                          id="input-user-wa"
                          type="text"
                          value={userForm.whatsapp || ''}
                          onChange={(e) => setUserForm({ ...userForm, whatsapp: e.target.value })}
                          placeholder="08123456789"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-slate-50"
                        />
                      </div>

                      {/* f. Jenis Kredensial User (Dropdown: Admin, User) */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          f. Jenis Kredensial User *
                        </label>
                        <select
                          id="select-user-role"
                          value={userForm.role}
                          onChange={(e) => setUserForm({ ...userForm, role: e.target.value as 'admin' | 'user' })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-slate-50 font-semibold"
                        >
                          <option value="admin">1. Admin (Akses Penuh & Pengaturan)</option>
                          <option value="user">2. User (Staff / Guru Madrasah)</option>
                        </select>
                      </div>

                      {/* i. Ubah/Ganti Password */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          i. {editingUser ? 'Ganti Kata Sandi (Password)' : 'Kata Sandi (Password) Login *'}
                        </label>
                        <div className="relative">
                          <input
                            id="input-user-password"
                            type="password"
                            value={userForm.password || ''}
                            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                            placeholder={editingUser ? 'Kosongkan jika tidak ingin mengubah password' : 'Buat password login'}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-slate-50"
                          />
                        </div>
                      </div>

                      {/* j. Foto Profil / Avatar User */}
                      <div className="sm:col-span-2 bg-slate-100/70 p-3 rounded-xl border border-slate-200">
                        <label className="block font-semibold text-slate-700 mb-2">
                          j. Foto Profil / Avatar Pengguna
                        </label>
                        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                          <div className="relative group shrink-0">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-600 bg-white shadow-xs">
                              <img
                                src={userForm.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'}
                                alt="Pratinjau Avatar"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {editingUser && (
                              <button
                                type="button"
                                onClick={() => handleOpenChangePhoto(editingUser)}
                                title="Buka Dialog Unggah Foto"
                                className="absolute -bottom-1 -right-1 p-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full border border-white shadow-xs cursor-pointer"
                              >
                                <Camera className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <div className="flex-1 w-full space-y-2">
                            <div className="flex space-x-2">
                              <input
                                id="input-user-avatar"
                                type="text"
                                value={userForm.avatar || ''}
                                onChange={(e) => setUserForm({ ...userForm, avatar: e.target.value })}
                                placeholder="Link URL foto (contoh: https://images.unsplash.com/...)"
                                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 bg-white font-mono text-xs"
                              />
                              {editingUser ? (
                                <button
                                  type="button"
                                  onClick={() => handleOpenChangePhoto(editingUser)}
                                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5 shrink-0 cursor-pointer"
                                >
                                  <Camera className="w-3.5 h-3.5" />
                                  <span>Unggah / Pilih Foto</span>
                                </button>
                              ) : (
                                <span className="text-[11px] text-slate-400 self-center">
                                  (Atau simpan dulu untuk upload langsung)
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500">
                              Masukkan alamat URL foto atau klik tombol "Unggah / Pilih Foto" untuk upload file dari galeri / komputer Anda.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* h. Tombol Simpan dan Batal */}
                    <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                      <button
                        id="btn-batal-user-form"
                        type="button"
                        onClick={handleCancelUserForm}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Tombol Batal
                      </button>
                      <button
                        id="btn-simpan-user-form"
                        type="button"
                        onClick={handleSaveUser}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Tombol Simpan User</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* g. Tampilkan Daftar User dalam bentuk tabel dengan tambahan icon edit, hapus */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700">
                    g. Daftar Pengguna Terdaftar (Total: {userList.length} Akun)
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3 text-center">Foto</th>
                          <th className="p-3">Nama User</th>
                          <th className="p-3">NIP</th>
                          <th className="p-3">Username</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">No. WhatsApp</th>
                          <th className="p-3">Kredensial</th>
                          <th className="p-3 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {userList.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 text-center">
                              <div className="relative inline-block group">
                                <img
                                  src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'}
                                  alt={user.name}
                                  onClick={() => handleOpenChangePhoto(user)}
                                  className="w-8 h-8 rounded-full object-cover border border-emerald-600 shadow-2xs mx-auto cursor-pointer hover:opacity-80 transition-opacity"
                                  title={`Klik untuk ubah foto ${user.name}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleOpenChangePhoto(user)}
                                  title="Ubah Foto Profil"
                                  className="absolute -bottom-1 -right-1 p-0.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full border border-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                >
                                  <Camera className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </td>
                            <td className="p-3 font-bold text-slate-800">
                              <div className="flex items-center space-x-2">
                                <span>{user.name}</span>
                              </div>
                            </td>
                            <td className="p-3 font-mono text-slate-500">{maskNip(user.nip)}</td>
                            <td className="p-3 font-mono font-semibold text-emerald-800">@{user.username}</td>
                            <td className="p-3 text-slate-600">{user.email || '-'}</td>
                            <td className="p-3 text-slate-600">{user.whatsapp || '-'}</td>
                            <td className="p-3">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                user.role === 'admin'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-blue-100 text-blue-900 border border-blue-200'
                              }`}>
                                {user.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                              </span>
                            </td>
                            <td className="p-3 text-center space-x-1.5">
                              <button
                                id={`change-photo-user-${user.id}`}
                                onClick={() => handleOpenChangePhoto(user)}
                                className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                                title="Ubah Foto Profil Pengguna"
                              >
                                <Camera className="w-3.5 h-3.5" />
                              </button>
                              <button
                                id={`edit-user-${user.id}`}
                                onClick={() => handleEditUserClick(user)}
                                className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                                title="Edit Data User"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                id={`delete-user-${user.id}`}
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                                title="Hapus User"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GTK Member Modal Edit/Create */}
      {showGtkModal && editingGtk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <h4 className="text-sm font-bold text-slate-800">
              {editingGtk.id.startsWith('new-') ? 'Tambah Guru / Tendik' : 'Edit Data Guru / Tendik'}
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  value={editingGtk.name}
                  onChange={(e) => setEditingGtk({ ...editingGtk, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">NIP Pegawai</label>
                <input
                  type="text"
                  value={editingGtk.nip}
                  onChange={(e) => setEditingGtk({ ...editingGtk, nip: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Jabatan / Posisi</label>
                <input
                  type="text"
                  value={editingGtk.role}
                  onChange={(e) => setEditingGtk({ ...editingGtk, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Mata Pelajaran / Bidang</label>
                <input
                  type="text"
                  value={editingGtk.subject}
                  onChange={(e) => setEditingGtk({ ...editingGtk, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Pendidikan Terakhir</label>
                <input
                  type="text"
                  value={editingGtk.education}
                  onChange={(e) => setEditingGtk({ ...editingGtk, education: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">URL Foto Profil</label>
                <input
                  type="text"
                  value={editingGtk.photo}
                  onChange={(e) => setEditingGtk({ ...editingGtk, photo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => {
                  setShowGtkModal(false);
                  setEditingGtk(null);
                }}
                className="px-4 py-2 bg-slate-200 rounded-xl text-xs font-bold"
              >
                Batal
              </button>
              <button
                onClick={handleSaveGtkMember}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                Simpan GTK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Point (Program & Kegiatan) Modal Edit/Create */}
      {showPointModal && (
        <div 
          id="modal-admin-info-point-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="bg-gradient-to-r from-[#0B2545] to-[#065F46] p-5 text-white flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold">
                  {editingPointIdx !== null 
                    ? 'Edit Poin Informasi Program' 
                    : `Tambah Informasi ${selectedInfoKey === 'kesiswaan' ? 'Kesiswaan' : selectedInfoKey === 'kemasyarakatan' ? 'Kemasyarakatan' : data.informations[selectedInfoKey].title}`}
                </h4>
                <p className="text-[11px] text-emerald-200">
                  Panel Administrator MIN 4 Kuningan
                </p>
              </div>
              <button
                onClick={() => {
                  setShowPointModal(false);
                  setEditingPointIdx(null);
                }}
                className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePointAdmin} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Judul Informasi / Kegiatan / Program *
                </label>
                <input
                  type="text"
                  value={pointForm.title}
                  onChange={(e) => setPointForm({ ...pointForm, title: e.target.value })}
                  placeholder={
                    selectedInfoKey === 'kesiswaan'
                      ? 'Contoh: Ekstrakurikuler Robotik, Bimbingan KSM, Dokter Kecil...'
                      : selectedInfoKey === 'kemasyarakatan'
                      ? 'Contoh: Bakti Sosial Ramadhan Peduli, Majelis Taklim...'
                      : 'Contoh: Judul rincian informasi atau program...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs bg-slate-50 outline-hidden font-semibold"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Uraian & Deskripsi Lengkap *
                </label>
                <textarea
                  rows={4}
                  value={pointForm.desc}
                  onChange={(e) => setPointForm({ ...pointForm, desc: e.target.value })}
                  placeholder="Tuliskan uraian detail mengenai kegiatan, jadwal, peserta, atau deskripsi capaian..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs bg-slate-50 outline-hidden leading-relaxed font-sans"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowPointModal(false);
                    setEditingPointIdx(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingPointIdx !== null ? 'Simpan Perubahan' : 'Simpan Informasi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ubah Foto User */}
      <ChangeUserPhotoModal
        isOpen={isPhotoModalOpen}
        user={photoModalUser}
        onClose={() => {
          setIsPhotoModalOpen(false);
          setPhotoModalUser(null);
        }}
        onSavePhoto={handleSaveUserPhoto}
      />
    </div>
  );
};
