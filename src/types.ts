export interface SchoolProfile {
  nama: string;
  nsm: string;
  npsm: string;
  kepalaMadrasah: string;
  nip: string;
  alamat: string;
  email: string;
  telepon: string;
  akreditasi: string;
  status: string;
  motto: string;
  sambutan: string;
  fotoKepala: string;
  kurikulum?: string;
  jamBelajar?: string;
}

export type InfoCategoryKey =
  | 'sejarah'
  | 'visimisi'
  | 'tujuan'
  | 'kemasyarakatan'
  | 'kesiswaan'
  | 'gtk';

export interface InformationItem {
  id: string;
  key: InfoCategoryKey;
  title: string;
  subtitle: string;
  content: string;
  highlights?: string[];
  points?: { title: string; desc: string }[];
  lastUpdated: string;
  iconName: string;
  bannerImage?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'Akademik' | 'Prestasi' | 'Kegiatan' | 'Pengumuman' | 'Keagamaan';
  author: string;
  date: string;
  thumbnail: string;
  views: number;
  featured?: boolean;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'Kegiatan' | 'Prestasi' | 'Fasilitas' | 'Pembelajaran' | 'Ekstrakurikuler';
  imageUrl: string;
  date: string;
  location?: string;
}

export interface GTKMember {
  id: string;
  name: string;
  nip: string;
  role: string;
  subject: string;
  education: string;
  photo: string;
  order: number;
}

export interface UserAccount {
  id: string;
  name: string;
  nip: string;
  username: string;
  email: string;
  whatsapp: string;
  role: 'admin' | 'user';
  password?: string;
  avatar?: string;
  createdAt: string;
}

export interface AppSettings {
  logoUrl: string;
  backgroundUrl: string;
  backgroundPattern: 'none' | 'dots' | 'grid' | 'islamic';
  runningText: string;
  runningTextSpeed?: number;
  runningTextBgColor?: string;
  runningTextColor?: string;
  runningTextBadgeBg?: string;
  googleMapsEmbedUrl: string;
  themePrimaryColor: string;
  themeSecondaryColor: string;
}

export interface AboutUsData {
  historySummary: string;
  stats: {
    jumlahSiswa: number;
    jumlahRombel: number;
    jumlahGuru: number;
    jumlahStaf: number;
    akreditasi: string;
    tahunBerdiri: number;
  };
  facilities: { name: string; desc: string; icon: string }[];
  contact: {
    alamat: string;
    telepon: string;
    whatsapp: string;
    email: string;
    jamOperasional: string;
  };
}

export interface AppStateData {
  profile: SchoolProfile;
  informations: Record<InfoCategoryKey, InformationItem>;
  news: NewsItem[];
  gallery: GalleryItem[];
  gtkList: GTKMember[];
  users: UserAccount[];
  settings: AppSettings;
  about: AboutUsData;
}

export type ActiveView =
  | 'beranda'
  | 'informasi-detail'
  | 'sejarah'
  | 'visimisi'
  | 'tujuan'
  | 'kemasyarakatan'
  | 'kesiswaan'
  | 'gtk'
  | 'berita'
  | 'berita-detail'
  | 'gallery'
  | 'tentang-kami'
  | 'admin-dashboard';

export type AdminSection =
  | 'profil'
  | 'informasi'
  | 'berita'
  | 'gallery'
  | 'tentang-kami'
  | 'pengaturan';
