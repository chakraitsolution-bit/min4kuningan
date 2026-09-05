import { AppStateData } from '../types';

export const INITIAL_APP_DATA: AppStateData = {
  profile: {
    nama: 'MIN 4 KUNINGAN',
    nsm: '111132080004',
    npsm: '60708912',
    kepalaMadrasah: 'Didi Rohdiana, S.Ag., M.M',
    nip: '197608152005011004',
    alamat: 'Jl. Banijah No. 30 Dusun V Wage, RT.024/RW.010, Maleber, Kec. Maleber, Kabupaten Kuningan, Jawa Barat 45575',
    email: 'min4kuningan@kemenag.go.id',
    telepon: '0898 0037 631',
    akreditasi: 'B (Baik Sekali) BAN-S/M',
    status: 'Negeri (Kementerian Agama RI)',
    motto: 'Membentuk Generasi Qurani, Cerdas, Berakhlak Mulia dan Berprestasi',
    kurikulum: 'Kurikulum Berbasis Cinta (KBC)',
    jamBelajar: '06.30 - 14.30 WIB',
    sambutan: `Assalamu'alaikum Warahmatullahi Wabarakatuh.
Puji syukur kehadirat Allah SWT atas limpahan rahmat dan hidayah-Nya. Selamat datang di Portal Resmi Madrasah Ibtidaiyah Negeri (MIN) 4 Kuningan. 

MIN 4 Kuningan berkomitmen menyelenggarakan pendidikan dasar berciri khas Islam yang mengintegrasikan kecerdasan spiritual, intelektual, dan emosional. Melalui kurikulum terpadu berbasis karakter, penguatan tahfidz Al-Qur'an, sains modern, dan teknologi informasi, kami bertekad membimbing peserta didik menjadi insan beriman, berakhlakul karimah, mandiri, dan berprestasi di tingkat daerah maupun nasional.

Portal ini hadir sebagai sarana transparansi informasi, komunikasi, serta silaturahmi antara madrasah, orang tua, peserta didik, dan masyarakat. Semoga website ini membawa manfaat dan barokah bagi kemajuan pendidikan Islam di Kabupaten Kuningan dan Indonesia.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.`,
    fotoKepala: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
  },

  settings: {
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Kemenag_logo.png/600px-Kemenag_logo.png',
    backgroundUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=80',
    backgroundPattern: 'islamic',
    runningText: 'Selamat Datang di Portal Resmi MIN 4 Kuningan ★ Pendaftaran Peserta Didik Baru (PPDB) Telah Dibuka ★ Raih Prestasi Gemilang Bersama Madrasah Hebat Bermartabat ★ Terakreditasi B (Baik Sekali) BAN-S/M ★ Kurikulum Berbasis Cinta (KBC)',
    runningTextSpeed: 25,
    runningTextBgColor: '#064E3B',
    runningTextColor: '#FFFFFF',
    runningTextBadgeBg: '#FBBF24',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.43577322964!2d108.473523!3d-6.980645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f16f3dc8e4f13%3A0x264106509f6e80b2!2sKuningan%2C%20Kabupaten%20Kuningan%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
    themePrimaryColor: '#0F2B59',
    themeSecondaryColor: '#065F46',
  },

  informations: {
    sejarah: {
      id: 'info-sejarah',
      key: 'sejarah',
      title: 'Sejarah Singkat Madrasah',
      subtitle: 'Perjalanan Panjang Transformasi Menuju Madrasah Unggul di Kabupaten Kuningan',
      iconName: 'History',
      lastUpdated: '15 Agustus 2026',
      bannerImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      content: `Madrasah Ibtidaiyah Negeri (MIN) 4 Kuningan berawal dari inisiatif para tokoh ulama, kiai, dan masyarakat pecinta pendidikan Islam di Kabupaten Kuningan pada era tahun 1980-an yang mendirikan Madrasah Ibtidaiyah Filial untuk memfasilitasi kebutuhan pendidikan dasar Islam berkualitas bagi anak-anak di daerah Kuningan dan sekitarnya.

Seiring meningkatnya kepercayaan masyarakat dan prestasi akademis maupun non-akademis yang diraih, madrasah ini secara resmi dinegerikan oleh Kementerian Agama Republik Indonesia dengan status definitif menjadi Madrasah Ibtidaiyah Negeri (MIN) 4 Kuningan.

Dalam perkembangannya, MIN 4 Kuningan terus melakukan pembenahan kurikulum, peningkatan sarana dan prasarana belajar mengajar berbasis teknologi, digitalisasi ruang kelas, laboratorium komputer terpadu, serta laboratorium keagamaan. Saat ini MIN 4 Kuningan telah berhasil mempertahankan Akreditasi A (Unggul) dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) dan menjadi salah satu madrasah rujukan percontohan di Jawa Barat.`,
      highlights: [
        'Didirikan oleh para tokoh ulama dan pemerhati pendidikan Islam Kuningan',
        'Dinegerikan secara resmi melalui Surat Keputusan Menteri Agama RI',
        'Berpredikat Akreditasi A (Unggul) BAN-S/M dengan predikat nilai tertinggi',
        'Menjadi Madrasah Ibtidaiyah Rujukan Digital & Tahfidz di Jawa Barat',
      ],
      points: [
        {
          title: 'Fase Perintisan (1982 - 1995)',
          desc: 'Berdiri sebagai lembaga swadaya masyarakat untuk menyediakan akses pendidikan Islam setara SD yang diperkaya ilmu agama dan akhlak.',
        },
        {
          title: 'Fase Penegerian & Pengembangan (1996 - 2012)',
          desc: 'Resmi menyandang status Negeri oleh Kementerian Agama dengan peningkatan gedung representatif dan fasilitas belajar yang lengkap.',
        },
        {
          title: 'Fase Modernisasi & Unggulan Prestasi (2013 - Sekarang)',
          desc: 'Penerapan Kurikulum Merdeka Terpadu, digitalisasi madrasah (Smart Classroom), program unggulan Tahfidz Qur’an Juz 30, dan sains teknologi.',
        },
      ],
    },

    visimisi: {
      id: 'info-visimisi',
      key: 'visimisi',
      title: 'Visi dan Misi Madrasah',
      subtitle: 'Komitmen Menyelenggarakan Pendidikan Islam Holistik, Modern, dan Berkarakter',
      iconName: 'Compass',
      lastUpdated: '10 Agustus 2026',
      bannerImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      content: `Visi dan Misi MIN 4 Kuningan disusun sebagai arah panduan strategis dalam mencetak generasi muslim yang beriman teguh, berpengetahuan luas, berakhlak mulia, serta siap menghadapi tantangan zaman global abad ke-21.`,
      highlights: [
        'Visi Utama: Terwujudnya Generasi Qur’ani, Berakhlakul Karimah, Unggul dalam Prestasi, Berwawasan Lingkungan dan IPTEK',
        'Fokus Utama: Keseimbangan Fikih, Aqidah Akhlak, Tahfidz, Sains Modern, Bahasa Arab & Inggris, dan Keterampilan Hidup',
      ],
      points: [
        {
          title: 'Misi 1: Pendidikan Karakter & Keislaman',
          desc: 'Menumbuhkembangkan penghayatan dan pengamalan ajaran Islam berlandaskan Al-Qur’an dan As-Sunnah sehingga menjadi sumber kearifan dalam bersikap dan bertindak.',
        },
        {
          title: 'Misi 2: Kualitas Pembelajaran Berbasis IT & Sains',
          desc: 'Melaksanakan proses pembelajaran aktif, inovatif, kreatif, efektif, menyenangkan, dan berbobot dengan pemanfaatan teknologi informasi dan komunikasi.',
        },
        {
          title: 'Misi 3: Pembinaan Tahfidz & Bahasa Asing',
          desc: 'Mengembangkan potensi minat bakat tahfidzul Qur’an dan kecakapan berbahasa Arab serta Inggris melalui program bilingual dan halaqah harian.',
        },
        {
          title: 'Misi 4: Madrasah Adiwiyata & Ramah Anak',
          desc: 'Menciptakan lingkungan madrasah yang bersih, asri, religius, aman, dan nyaman yang menjamin tumbuh kembang potensi anak secara optimal.',
        },
        {
          title: 'Misi 5: Sinergi dengan Orang Tua & Masyarakat',
          desc: 'Membangun kemitraan strategis dengan komite madrasah, masyarakat, instansi pemerintah, dan lembaga keagamaan untuk peningkatan mutu berkelanjutan.',
        },
      ],
    },

    tujuan: {
      id: 'info-tujuan',
      key: 'tujuan',
      title: 'Tujuan Madrasah',
      subtitle: 'Target Capaian Pembelajaran, Karakter, dan Kompetensi Lulusan MIN 4 Kuningan',
      iconName: 'Target',
      lastUpdated: '12 Agustus 2026',
      bannerImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80',
      content: `Tujuan pendidikan MIN 4 Kuningan mengacu pada tujuan umum pendidikan dasar nasional serta tujuan khusus pendidikan madrasah di bawah naungan Kementerian Agama Republik Indonesia, untuk meletakkan dasar kecerdasan, pengetahuan, kepribadian, akhlak mulia, serta keterampilan untuk hidup mandiri dan mengikuti pendidikan lebih lanjut.`,
      highlights: [
        'Tercapainya hafalan Al-Qur’an minimal Juz 30 (Juz Amma) bagi seluruh lulusan',
        'Mencapai rata-rata nilai asesmen nasional dan madrasah dengan predikat sangat memuaskan',
        'Tuntas penguasaan ibadah praktis (Shalat fardhu, Shalat dhuha berjamaah, doa harian, dan zikir)',
      ],
      points: [
        {
          title: '1. Penguatan Aqidah dan Akhlak Terpuji',
          desc: 'Membentuk peserta didik yang taat beribadah, hormat kepada guru dan orang tua, bertutur kata santun, jujur, disiplin, dan bertanggung jawab.',
        },
        {
          title: '2. Capaian Akademik dan Kompetisi Sains',
          desc: 'Meraih kejuaraan di ajang Kompetisi Sains Madrasah (KSM), Olimpiade Matematika & IPA, serta lomba seni dan keagamaan tingkat kabupaten, provinsi, hingga nasional.',
        },
        {
          title: '3. Kemahiran Membaca dan Menghafal Al-Qur’an',
          desc: 'Setiap lulusan mampu membaca Al-Qur’an dengan tartil sesuai kaidah tajwid serta menuntaskan hafalan Juz 30 dan surat-surat pilihan.',
        },
        {
          title: '4. Literasi Digital dan Karakter Peduli Lingkungan',
          desc: 'Menumbuhkan kecakapan literasi digital yang bertanggung jawab serta melahirkan generasi pecinta lingkungan hidup melalui program Green School.',
        },
      ],
    },

    kemasyarakatan: {
      id: 'info-kemasyarakatan',
      key: 'kemasyarakatan',
      title: 'Informasi Kemasyarakatan',
      subtitle: 'Sinergi Harmonis Madrasah, Komite, Tokoh Masyarakat, dan Lingkungan Sekitar',
      iconName: 'Users',
      lastUpdated: '08 Agustus 2026',
      bannerImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      content: `MIN 4 Kuningan menjunjung tinggi filosofi bahwa pendidikan yang sukses adalah hasil kolaborasi erat antara madrasah, keluarga, dan masyarakat. Kami senantiasa membuka pintu kemitraan aktif dengan Komite Madrasah, Paguyuban Orang Tua Siswa (POT), Dewan Kemakmuran Masjid (DKM), pemerintah desa setempat, serta lembaga sosial kemasyarakatan.

Berbagai program kemasyarakatan rutin diselenggarakan seperti Bakti Sosial Ramadhan, Santunan Anak Yatim dan Dhuafa, Pembagian Daging Qurban, Program Khitanan Massal Berkah, serta Peringatan Hari Besar Islam (PHBI) bersama warga sekitar madrasah.`,
      highlights: [
        'Komite Madrasah yang aktif, transparan, dan berdedikasi tinggi',
        'Program Bakti Sosial, Zakat Fitrah, dan Qurban Peduli Ummat',
        'Majelis Taklim dan Parenting Islami Bulanan bersama wali murid',
        'Kemitraan dengan Puskesmas, Kepolisian, dan Balai Latihan Kerja',
      ],
      points: [
        {
          title: 'Kemitraan Komite Madrasah',
          desc: 'Musyawarah rutin antara pihak madrasah dan komite dalam penyusunan Rencana Kerja dan Anggaran Madrasah (RKAM) yang akuntabel.',
        },
        {
          title: 'Parenting & Kelas Orang Tua',
          desc: 'Seminar bulanan pola asuh anak di era digital berbasis nilai-nilai Islam bagi seluruh orang tua murid.',
        },
        {
          title: 'Kegiatan Sosial & Pengabdian Masyarakat',
          desc: 'Penyaluran sembako berkah, donor darah, dan bersih lingkungan desa bersama siswa dan guru MIN 4 Kuningan.',
        },
      ],
    },

    kesiswaan: {
      id: 'info-kesiswaan',
      key: 'kesiswaan',
      title: 'Informasi Kesiswaan',
      subtitle: 'Wadah Pembinaan Bakat, Minat, Kepemimpinan, dan Prestasi Peserta Didik',
      iconName: 'GraduationCap',
      lastUpdated: '14 Agustus 2026',
      bannerImage: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=80',
      content: `Bidang Kesiswaan MIN 4 Kuningan berfokus pada pengembangan potensi siswa secara menyeluruh (holistik), mencakup aspek kognitif, afektif, dan psikomotorik. Melalui berbagai kegiatan ekstrakurikuler, pembiasaan ibadah harian, dan pembinaan lomba, siswa didorong untuk menjadi pribadi yang mandiri, percaya diri, dan berprestasi.

Setiap pagi, siswa dibiasakan mengikuti shalat Dhuha berjamaah, tadarus Al-Qur'an, dan apel pembiasaan karakter 5S (Senyum, Sapa, Salam, Sopan, Santun).`,
      highlights: [
        'Pembiasaan Shalat Dhuha, Dzuhur Berjamaah, dan Kuliah Tujuh Menit (Kultum) Siswa',
        '10+ Pilihan Ekstrakurikuler Unggulan Akademik, Olahraga, Seni & Keagamaan',
        'Bimbingan Intensif Kompetisi Sains Madrasah (KSM) dan Aksioma',
        'Layanan Konseling dan Pembinaan Karakter Ramah Anak',
      ],
      points: [
        {
          title: 'Pramuka (Gugus Depan MIN 4 Kuningan)',
          desc: 'Ekstrakurikuler wajib pembentuk kedisiplinan, kemandirian, kepemimpinan, dan kecintaan pada alam dan tanah air.',
        },
        {
          title: 'Tahfidz & Tilawatil Qur’an',
          desc: 'Bimbingan khusus hafalan Juz 30 dan seni baca Al-Qur’an berirama (Nagham) bersama asatidz berpengalaman.',
        },
        {
          title: 'Seni Islami (Marawis, Hadroh, & Kaligrafi)',
          desc: 'Menyalurkan bakat seni musik perkusi Islam, lantunan shalawat nabi, dan keindahan tulisan khat Al-Qur’an.',
        },
        {
          title: 'Olahraga & Beladiri (Futsal, Bulutangkis, Pencak Silat Tapak Suci)',
          desc: 'Mengasah kebugaran fisik, sportivitas, daya tahan, serta seni beladiri tradisional Indonesia.',
        },
        {
          title: 'Dokter Kecil & UKS Madrasah',
          desc: 'Pelatihan dasar pertolongan pertama, pola hidup bersih sehat (PHBS), dan kepekaan kesehatan lingkungan sekolah.',
        },
      ],
    },

    gtk: {
      id: 'info-gtk',
      key: 'gtk',
      title: 'Informasi Guru dan Tenaga Kependidikan (GTK)',
      subtitle: 'Tenaga Pendidik & Kependidikan Profesional, Tersertifikasi, dan Berdedikasi',
      iconName: 'UserCheck',
      lastUpdated: '16 Agustus 2026',
      bannerImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      content: `Guru dan Tenaga Kependidikan (GTK) MIN 4 Kuningan terdiri dari pendidik-pendidik berkompeten lulusan perguruan tinggi terkemuka dengan kualifikasi S1 dan S2 di bidang Pendidikan Guru Madrasah Ibtidaiyah (PGMI/PGSD), Pendidikan Agama Islam (PAI), Bahasa Arab, Matematika, Sains, dan Manajemen Pendidikan.

Seluruh dewan guru telah tersertifikasi pendidik profesional, aktif mengikuti pelatihan kurikulum berkelanjutan, workshop inovasi pembelajaran digital, dan bimbingan kepenulisan karya ilmiah.`,
      highlights: [
        '100% Guru Berpendidikan Sarjana (S1) dan Magister (S2)',
        'Mayoritas Dewan Guru telah Lulus Sertifikasi Pendidik Profesional Kemenag RI',
        'Tenaga Kependidikan & Tata Usaha yang sigap dalam layanan administrasi digital Simpatika & EMIS 4.0',
        'Guru pembina berprestasi di tingkat Kabupaten Kuningan dan Provinsi Jawa Barat',
      ],
      points: [
        {
          title: 'Kepala Madrasah & Wakil Kepala',
          desc: 'Memimpin tata kelola kelembagaan, kurikulum, kesiswaan, humas, dan sarana prasarana dengan prinsip kepemimpinan transformasional.',
        },
        {
          title: 'Guru Kelas (Fase A, B, dan C)',
          desc: 'Pendidik berdedikasi yang mendampingi siswa kelas 1 sampai kelas 6 dengan pendekatan pedagogik yang ramah dan interaktif.',
        },
        {
          title: 'Guru Mata Pelajaran PAI & Bahasa Arab',
          desc: 'Mengampu materi Al-Qur’an Hadits, Aqidah Akhlak, Fikih, Sejarah Kebudayaan Islam (SKI), dan Bahasa Arab.',
        },
        {
          title: 'Tenaga Administrasi & Operator Madrasah',
          desc: 'Mengelola database kepegawaian, data kesiswaan EMIS, raport digital madrasah (RDM), serta pelayanan terpadu satu pintu (PTSP).',
        },
      ],
    },
  },

  news: [
    {
      id: 'news-1',
      title: 'Siswa MIN 4 Kuningan Raih Juara 1 Kompetisi Sains Madrasah (KSM) Tingkat Kabupaten',
      slug: 'siswa-min-4-kuningan-raih-juara-1-ksm-kabupaten',
      summary: 'Prestasi membanggakan kembali diukir oleh ananda Muhammad Rayhan yang berhasil menyabet medali emas bidang Matematika Terintegrasi.',
      content: `KUNINGAN — Prestasi membanggakan kembali ditorehkan oleh siswa-siswi Madrasah Ibtidaiyah Negeri (MIN) 4 Kuningan. Dalam ajang bergengsi Kompetisi Sains Madrasah (KSM) tingkat Kabupaten Kuningan tahun ini, peserta didik perwakilan MIN 4 Kuningan, Muhammad Rayhan Al-Fatih (Kelas 5), berhasil meraih Juara 1 (Medali Emas) pada cabang Matematika Terintegrasi Sains.

Kepala MIN 4 Kuningan, H. Ahmad Fauzi, S.Pd.I, M.Pd., menyampaikan rasa syukur dan apresiasi yang setinggi-tingginya kepada ananda Rayhan dan seluruh guru pembimbing yang telah bekerja keras mempersiapkan kompetisi ini.

"Alhamdulillah, ini adalah buah dari kerja keras, disiplin belajar, dan doa seluruh keluarga besar MIN 4 Kuningan. Kemenangan ini membuktikan bahwa madrasah mampu mencetak generasi yang unggul dalam ilmu pengetahuan dan kuat dalam pondasi keimanan," ungkap beliau saat ditemui di ruang kerjanya.

Selanjutnya, Muhammad Rayhan akan mewakili Kabupaten Kuningan untuk melaju ke KSM Tingkat Provinsi Jawa Barat. Mari kita doakan bersama agar ananda dapat memberikan hasil terbaik dan membawa nama harum madrasah kita.`,
      category: 'Prestasi',
      author: 'Tim Humas MIN 4',
      date: '14 Agustus 2026',
      thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      views: 342,
      featured: true,
      tags: ['KSM', 'Prestasi', 'Sains', 'Matematika'],
    },
    {
      id: 'news-2',
      title: 'Penerimaan Peserta Didik Baru (PPDB) MIN 4 Kuningan Tahun Ajaran 2026/2027 Resmi Dibuka',
      slug: 'ppdb-min-4-kuningan-resmi-dibuka',
      summary: 'MIN 4 Kuningan membuka pendaftaran calon peserta didik baru dengan kuota 4 rombongan belajar unggulan.',
      content: `KUNINGAN — Madrasah Ibtidaiyah Negeri (MIN) 4 Kuningan secara resmi membuka Penerimaan Peserta Didik Baru (PPDB) untuk Tahun Ajaran 2026/2027. Pada tahun ini, madrasah menyediakan kuota 4 rombongan belajar (rombel) dengan fasilitas ruang kelas digital modern dan program unggulan tahfidz Al-Qur'an.

Ketua Panitia PPDB MIN 4 Kuningan menjelaskan bahwa proses pendaftaran dapat dilakukan secara langsung di sekretariat madrasah maupun secara online melalui portal resmi.

Syarat pendaftaran meliputi:
1. Mengisi formulir pendaftaran
2. Berusia minimal 6 tahun pada 1 Juli 2026
3. Fotokopi Akta Kelahiran dan Kartu Keluarga (KK)
4. Pas foto ukuran 3x4 (3 lembar)
5. Fotokopi Ijazah RA/TK (bila ada)

Pendaftaran gelombang pertama dibuka mulai 1 Agustus hingga 30 September 2026. Orang tua dan wali calon siswa diimbau segera mendaftarkan putra-putrinya mengingat kuota yang tersedia sangat terbatas.`,
      category: 'Pengumuman',
      author: 'Panitia PPDB',
      date: '10 Agustus 2026',
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      views: 521,
      featured: true,
      tags: ['PPDB', 'Pendaftaran', 'Siswa Baru'],
    },
    {
      id: 'news-3',
      title: 'Semarak Peringatan Tahun Baru Islam 1448 H di MIN 4 Kuningan: Pawai Taaruf & Santunan Yatim',
      slug: 'semarak-tahun-baru-islam-pawai-taaruf-santunan',
      summary: 'Ratusan siswa, guru, dan wali murid memeriahkan peringatan 1 Muharram dengan pawai obor, karnaval islami, dan santunan.',
      content: `KUNINGAN — Suasana meriah dan penuh kekhidmatan menyelimuti lingkungan MIN 4 Kuningan dalam rangka memperingati Tahun Baru Islam 1 Muharram 1448 Hijriah. Acara diisi dengan Pawai Ta'aruf keliling desa, parade busana muslim daerah, lomba kaligrafi, dan pembagian santunan kepada 50 anak yatim dan dhuafa di lingkungan madrasah.

Para siswa tampil antusias mengenakan busana bernuansa putih dan membawa aneka poster bertemakan hijrah dan semangat belajar. Kegiatan ini ditutup dengan tausiyah motivasi dari ulama setempat tentang meneladani perjuangan Nabi Muhammad SAW dalam membangun peradaban berakhlak mulia.`,
      category: 'Keagamaan',
      author: 'Kesiswaan & PHBI',
      date: '02 Agustus 2026',
      thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      views: 289,
      featured: false,
      tags: ['Tahun Baru Islam', 'Pawai', 'Santunan', 'Keagamaan'],
    },
    {
      id: 'news-4',
      title: 'Penyelenggaraan Workshop Implementasi Kurikulum Merdeka & Smart Madrasah',
      slug: 'workshop-kurikulum-merdeka-smart-madrasah',
      summary: 'Dewan guru MIN 4 Kuningan mengikuti pelatihan intensif pemanfaatan media ajar berbasis teknologi digital.',
      content: `KUNINGAN — Meningkatkan kompetensi pedagogik guru di era transformasi digital, MIN 4 Kuningan menyelenggarakan Workshop Pengembangan Pembelajaran Berdiferensiasi dan Pemanfaatan Artificial Intelligence untuk Media Edukasi Islami.

Narasumber dari Balai Diklat Keagamaan Bandung memberikan materi praktis tentang pembuatan lembar kerja interaktif, modul ajar profil pelajar Pancasila & Rahmatan Lil Alamin, serta optimalisasi Raport Digital Madrasah (RDM).`,
      category: 'Kegiatan',
      author: 'Kurikulum MIN 4',
      date: '28 Juli 2026',
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      views: 198,
      featured: false,
      tags: ['Workshop', 'Guru', 'Kurikulum Merdeka'],
    },
    {
      id: 'news-5',
      title: 'Regu Pramuka Penggalang MIN 4 Kuningan Raih Juara Umum Lomba Tingkat (LT-II) Kwartir Ranting',
      slug: 'pramuka-min-4-juara-umum-lt-2',
      summary: 'Regu Elang dan Melati MIN 4 Kuningan memborong piala pada cabang semaphore, pioneering, dan ketangkasan tenda.',
      content: `KADUGEDE — Gugus Depan MIN 4 Kuningan berhasil menorehkan prestasi gemilang dengan dinobatkan sebagai Juara Umum dalam perhelatan Lomba Tingkat II (LT-II) Pramuka Penggalang tingkat Kwartir Ranting.

Regu Putra (Elang) dan Regu Putri (Melati) berhasil mengumpulkan total 7 piala dari berbagai mata lomba seperti Pionering tiang bendera kreatif, Sandi & Morse, PBB Tongkat, serta Pentas Seni Budaya Daerah.`,
      category: 'Prestasi',
      author: 'Pembina Pramuka',
      date: '20 Juli 2026',
      thumbnail: 'https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?auto=format&fit=crop&w=800&q=80',
      views: 245,
      featured: false,
      tags: ['Pramuka', 'Prestasi', 'Ekstrakurikuler'],
    },
  ],

  gallery: [
    {
      id: 'gal-1',
      title: 'Gedung Utama dan Halaman Asri MIN 4 Kuningan',
      description: 'Suasana lingkungan madrasah yang bersih, hijau, tertata rapi dan berwawasan adiwiyata.',
      category: 'Fasilitas',
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
      date: '2026-08-10',
      location: 'Kampus Utama MIN 4 Kuningan',
    },
    {
      id: 'gal-2',
      title: 'Pembiasaan Shalat Dhuha Berjamaah di Masjid',
      description: 'Rutinitas pagi siswa dan dewan guru dalam membina keistiqamahan ibadah dan spiritualitas.',
      category: 'Kegiatan',
      imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      date: '2026-08-12',
      location: 'Masjid Madrasah Al-Ikhlas',
    },
    {
      id: 'gal-3',
      title: 'Kegiatan Belajar Interaktif di Ruang Kelas Digital',
      description: 'Siswa aktif berdiskusi dan memanfaatkan media pembelajaran multimedia modern.',
      category: 'Pembelajaran',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      date: '2026-08-05',
      location: 'Smart Classroom Kelas 5',
    },
    {
      id: 'gal-4',
      title: 'Halaqah Tahfidzul Qur’an Pagi',
      description: 'Bimbingan setoran hafalan Juz 30 bersama ustadz dan ustadzah pembina.',
      category: 'Kegiatan',
      imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
      date: '2026-08-08',
      location: 'Serambi Tahfidz MIN 4',
    },
    {
      id: 'gal-5',
      title: 'Pentas Seni Hadroh dan Marawis Santri Madrasah',
      description: 'Penampilan tim marawis cilik MIN 4 Kuningan pada acara peringatan hari besar Islam.',
      category: 'Ekstrakurikuler',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      date: '2026-07-28',
      location: 'Panggung Utama Madrasah',
    },
    {
      id: 'gal-6',
      title: 'Latihan Pramuka Siaga dan Penggalang',
      description: 'Latihan formasi baris-berbaris dan ketangkasan tali-temali di lapangan madrasah.',
      category: 'Ekstrakurikuler',
      imageUrl: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=80',
      date: '2026-07-22',
      location: 'Lapangan Upacara',
    },
    {
      id: 'gal-7',
      title: 'Penyerahan Piala Juara Kompetisi Sains',
      description: 'Kepala Madrasah memberikan medali dan piagam penghargaan kepada siswa berprestasi.',
      category: 'Prestasi',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      date: '2026-08-14',
      location: 'Ruang Aula Kepala Madrasah',
    },
    {
      id: 'gal-8',
      title: 'Laboratorium Komputer dan Akses Internet Cepat',
      description: 'Sarana latihan asesmen berbasis komputer (ANBK) dan literasi digital siswa.',
      category: 'Fasilitas',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      date: '2026-07-15',
      location: 'Lab Komputer Terpadu',
    },
  ],

  gtkList: [
    {
      id: 'gtk-1',
      name: 'H. Ahmad Fauzi, S.Pd.I, M.Pd.',
      nip: '197608152005011004',
      role: 'Kepala Madrasah',
      subject: 'Manajemen Pendidikan Islam',
      education: 'S2 Magister Pendidikan Islam',
      photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      order: 1,
    },
    {
      id: 'gtk-2',
      name: 'Dra. Hj. Siti Nurhasanah, M.Pd.I',
      nip: '197805122006042008',
      role: 'Wakil Kepala Bid. Kurikulum',
      subject: 'Pendidikan Agama Islam & Fikih',
      education: 'S2 Manajemen Kurikulum',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      order: 2,
    },
    {
      id: 'gtk-3',
      name: 'Ust. Muhammad Ridwan, S.Pd.I',
      nip: '198203102008011012',
      role: 'Wakil Kepala Bid. Kesiswaan & Tahfidz',
      subject: 'Al-Qur’an Hadits & Bahasa Arab',
      education: 'S1 Pendidikan Bahasa Arab',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      order: 3,
    },
    {
      id: 'gtk-4',
      name: 'Dewi Lestari, S.Pd.',
      nip: '198809222014022005',
      role: 'Guru Kelas 5 & Pembina KSM',
      subject: 'Matematika & IPA Terpadu',
      education: 'S1 Pendidikan Guru Madrasah Ibtidaiyah',
      photo: 'https://images.unsplash.com/photo-1580894732410-b98a09618c7f?auto=format&fit=crop&w=400&q=80',
      order: 4,
    },
    {
      id: 'gtk-5',
      name: 'Budi Santoso, S.Pd.',
      nip: '199004162019031007',
      role: 'Guru PJOK & Pembina Pramuka',
      subject: 'Pendidikan Jasmani Olahraga Kesehatan',
      education: 'S1 Pendidikan Kepelatihan Olahraga',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      order: 5,
    },
    {
      id: 'gtk-6',
      name: 'Yuni Astuti, S.Kom.',
      nip: '199311052020122014',
      role: 'Kepala Tata Usaha & Operator EMIS',
      subject: 'Sistem Informasi & Data Pokok',
      education: 'S1 Teknik Informatika',
      photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
      order: 6,
    },
  ],

  users: [
    {
      id: 'usr-1',
      name: 'Administrator MIN 4',
      nip: '197608152005011004',
      username: 'admin',
      email: 'admin@min4kuningan.sch.id',
      whatsapp: '081234567890',
      role: 'admin',
      password: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      createdAt: '2026-01-01',
    },
    {
      id: 'usr-2',
      name: 'Chakra IT Solutions (Master Dev)',
      nip: '199501012023011001',
      username: 'chakrait',
      email: 'chakraitsolution@gmail.com',
      whatsapp: '09890037631',
      role: 'admin',
      password: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      createdAt: '2026-01-01',
    },
    {
      id: 'usr-3',
      name: 'Dewan Guru & Staf User',
      nip: '198809222014022005',
      username: 'user',
      email: 'guru@min4kuningan.sch.id',
      whatsapp: '085712345678',
      role: 'user',
      password: 'user',
      avatar: 'https://images.unsplash.com/photo-1580894732410-b98a09618c7f?auto=format&fit=crop&w=300&q=80',
      createdAt: '2026-02-10',
    },
  ],

  about: {
    historySummary: 'Madrasah Ibtidaiyah Negeri (MIN) 4 Kuningan merupakan lembaga pendidikan dasar Islam negeri terkemuka di bawah binaan Kantor Kementerian Agama Kabupaten Kuningan, Provinsi Jawa Barat. Bertekad melahirkan peserta didik yang unggul dalam integrasi imtak dan iptek dengan Kurikulum Berbasis Cinta (KBC).',
    stats: {
      jumlahSiswa: 428,
      jumlahRombel: 14,
      jumlahGuru: 24,
      jumlahStaf: 6,
      akreditasi: 'B (Baik Sekali) BAN-S/M',
      tahunBerdiri: 1982,
    },
    facilities: [
      {
        name: 'Ruang Kelas Nyaman & Smart Classroom',
        desc: 'Dilengkapi proyektor interaktif, kipas angin/AC, pencahayaan alami, dan koneksi internet WiFi terpadu.',
        icon: 'Monitor',
      },
      {
        name: 'Masjid & Serambi Tahfidz Al-Ikhlas',
        desc: 'Pusat pembinaan ibadah shalat dhuha/dzuhur berjamaah, pembiasaan tilawah, serta halaqah juz amma.',
        icon: 'BookOpen',
      },
      {
        name: 'Laboratorium Komputer & Digital Library',
        desc: 'Puluhan komputer modern untuk Asesmen Nasional Berbasis Komputer (ANBK) dan literasi digital.',
        icon: 'Cpu',
      },
      {
        name: 'Perpustakaan Madrasah "Cahaya Ilmu"',
        desc: 'Koleksi ribuan buku pelajaran, ensiklopedia Islam, kisah teladan nabi & sahabat, dan buku fiksi anak.',
        icon: 'Library',
      },
      {
        name: 'UKS & Ruang Dokter Kecil',
        desc: 'Layanan kesehatan pertama bagi siswa dan sarana pembiasaan Pola Hidup Bersih dan Sehat (PHBS).',
        icon: 'Activity',
      },
      {
        name: 'Lapangan Serbaguna & Olahraga',
        desc: 'Sarana upacara bendera, olahraga bulutangkis, futsal, senam kesegaran jasmani, dan latihan beladiri.',
        icon: 'Award',
      },
    ],
    contact: {
      alamat: 'Jl. Banijah No. 30 Dusun V Wage, RT.024/RW.010, Maleber, Kec. Maleber, Kabupaten Kuningan, Jawa Barat 45575',
      telepon: '0898 0037 631',
      whatsapp: '081460370700',
      email: 'min4kuningan@kemenag.go.id',
      jamOperasional: 'Senin - Sabtu: 06.30 - 14.30 WIB (Jumat sampai 11.30 WIB)',
    },
  },
};
