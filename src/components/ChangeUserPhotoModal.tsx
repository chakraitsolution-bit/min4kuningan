import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  Camera, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { UserAccount } from '../types';
import { maskNip } from '../utils';

interface ChangeUserPhotoModalProps {
  isOpen: boolean;
  user: UserAccount | null;
  onClose: () => void;
  onSavePhoto: (newAvatarUrl: string) => void;
}

// Koleksi preset avatar resmi & islami yang ramah dan representatif
const PRESET_AVATARS = [
  {
    name: 'Pendidik Pria 1',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Pendidik Pria 2',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Pendidik Pria 3',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Pendidik Pria 4',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Pendidik Wanita 1',
    url: 'https://images.unsplash.com/photo-1580894732410-b98a09618c7f?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Pendidik Wanita 2',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Pendidik Wanita 3',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Pendidik Wanita 4',
    url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
  },
];

export const ChangeUserPhotoModal: React.FC<ChangeUserPhotoModalProps> = ({
  isOpen,
  user,
  onClose,
  onSavePhoto,
}) => {
  if (!isOpen || !user) return null;

  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [photoPreview, setPhotoPreview] = useState<string>(
    user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
  );
  const [urlInput, setUrlInput] = useState<string>(user.avatar || '');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resize and compress image using HTML5 Canvas to keep storage footprint lightweight
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          // Export as JPEG with 0.85 quality for sharp yet lightweight storage
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(compressedDataUrl);
        };
        img.onerror = () => reject(new Error('Gagal memproses berkas gambar.'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Gagal membaca berkas gambar.'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await processFile(files[0]);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Format berkas harus berupa gambar (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Ukuran berkas maksimal 10MB.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);
    try {
      const dataUrl = await compressImage(file);
      setPhotoPreview(dataUrl);
      setUrlInput(dataUrl);
    } catch (err) {
      console.error(err);
      setErrorMessage('Terjadi kesalahan saat memproses gambar.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setErrorMessage('Silakan masukkan link URL gambar terlebih dahulu.');
      return;
    }
    setErrorMessage(null);
    setPhotoPreview(urlInput.trim());
  };

  const handleSelectPreset = (presetUrl: string) => {
    setPhotoPreview(presetUrl);
    setUrlInput(presetUrl);
    setErrorMessage(null);
  };

  const handleResetToDefault = () => {
    const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80';
    setPhotoPreview(defaultAvatar);
    setUrlInput(defaultAvatar);
    setErrorMessage(null);
  };

  const handleSave = () => {
    onSavePhoto(photoPreview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="modal-ubah-foto-user"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
      >
        {/* Header Modal */}
        <div className="bg-[#0B2545] text-white px-5 py-4 flex items-center justify-between border-b-2 border-emerald-500">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-400/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Ubah Foto Profil User</h3>
              <p className="text-[11px] text-slate-300">
                Pembaruan foto avatar untuk akun: <span className="text-emerald-300 font-semibold">{user.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            title="Tutup Modal"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-slate-800">
          {/* Section 1: Pratinjau Foto User */}
          <div className="bg-gradient-to-br from-slate-50 to-emerald-50/40 p-4 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-emerald-600 shadow-md bg-white">
                <img
                  src={photoPreview}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback jika url gagal dimuat
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80';
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Pilih foto dari komputer"
                className="absolute bottom-0 right-0 p-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full shadow-md border-2 border-white transition-all cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-center sm:text-left flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate">{user.name}</h4>
              <p className="text-xs text-slate-500 font-mono">NIP: {maskNip(user.nip)}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-1">
                <span className="text-[11px] font-mono font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                  @{user.username}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  user.role === 'admin'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-blue-100 text-blue-900 border border-blue-200'
                }`}>
                  {user.role === 'admin' ? '🛡️ Administrator' : '👤 User Madrasah'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Pratinjau langsung avatar yang akan tampil</p>
            </div>
          </div>

          {/* Pesan Error jika ada */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {errorMessage}
            </div>
          )}

          {/* Section 2: Pilihan Metode Ubah Foto (Tabs) */}
          <div className="space-y-3">
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                  activeTab === 'upload'
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>1. Upload Berkas</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                  activeTab === 'url'
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>2. Link URL</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                  activeTab === 'presets'
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>3. Avatar Preset</span>
              </button>
            </div>

            {/* TAB 1: UPLOAD BERKAS (DRAG AND DROP & CLICK) */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                  id="input-file-avatar"
                />

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-emerald-600 bg-emerald-50/80 scale-[0.99]'
                      : 'border-slate-300 hover:border-emerald-600 bg-slate-50/60 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    {isProcessing ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <Upload className="w-6 h-6" />
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    {isProcessing ? 'Sedang Memproses Gambar...' : 'Klik untuk Memilih Foto atau Tarik & Lepas (Drag & Drop)'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Mendukung format JPG, PNG, atau WebP (Foto akan dioptimalkan otomatis)
                  </p>
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-white border border-slate-300 text-slate-700 hover:text-emerald-700 hover:border-emerald-500 rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Jelajahi Berkas Galeri / Komputer</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: LINK URL GAMBAR */}
            {activeTab === 'url' && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Masukkan Alamat URL Gambar (Link Langsung)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/foto-profil.jpg"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 text-xs font-mono bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shrink-0"
                  >
                    Terapkan
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Tips: Anda dapat menyematkan URL gambar dari penyimpanan cloud publik seperti Unsplash, Google Drive (direct link), atau CDN sekolah.
                </p>
              </div>
            )}

            {/* TAB 3: KOLEKSI AVATAR PRESET */}
            {activeTab === 'presets' && (
              <div className="space-y-2">
                <p className="text-xs text-slate-600 font-medium">
                  Pilih salah satu avatar profesional siap pakai di bawah ini:
                </p>
                <div className="grid grid-cols-4 gap-2.5 pt-1">
                  {PRESET_AVATARS.map((preset, index) => {
                    const isSelected = photoPreview === preset.url;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        className={`relative group rounded-xl p-1.5 border-2 transition-all cursor-pointer flex flex-col items-center ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 shadow-sm ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:border-emerald-400 bg-white'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden mb-1">
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 truncate w-full text-center">
                          {preset.name}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1 right-1 p-0.5 bg-emerald-600 rounded-full text-white">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Modal Action Buttons */}
        <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset ke Foto Standar</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Foto Profil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
