import {
  PersonalInfo,
  StatItem,
  SkillCategory,
  Project,
  ExperienceItem,
  ServiceItem,
  SocialLink
} from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Alin Dwi Ramadhan',
  nickname: 'Alin / Driver Tangki Glukosa BUDI',
  role: 'Spesialis Pengemudi Truk Tangki Glukosa Cair & Sweetener | PT Budi Starch & Sweetener Tbk',
  subRole: 'Pengemudi Truk Tangki Food Grade Stainless Steel (Glukosa Cair, Fruktosa, Sorbitol & Sirup Pati) • Sungai Budi Group',
  location: 'Lampung - Jawa Timur - Banten / Rute Antar Pabrik & Industri Makanan Minuman (F&B)',
  email: 'alindwiramadhan381@gmail.com',
  phone: '+62 857-3203-3278',
  licenseType: 'SIM BII Umum & Sertifikasi Pengemudi Food Grade / GMP & HACCP Logistics',
  availability: 'Siap Distribusi Tangki Glukosa Cair & Sirup Pemanis Makanan (24/7)',
  bio: 'Pengemudi truk tangki profesional berlisensi SIM BII Umum spesialis distribusi muatan cair Food Grade (Glukosa Cair / Liquid Glucose, Fruktosa, Sorbitol, dan Sirup Pati Singkong) dari PT Budi Starch & Sweetener Tbk (Sungai Budi Group). Berpengalaman lebih dari 8 tahun mengemudikan armada Tangki Stainless Steel SUS 304/316 berinsulasi thermo (16KL - 32KL) melintasi rute pabrik di Lampung, Banten, Jabodetabek, Jawa Tengah, hingga Jawa Timur dengan komitmen Zero Contamination, integritas sanitasi CIP (Clean In Place), dan Zero Accident.',
  detailedBio: [
    'Saya mengemudikan armada truk tangki khusus bahan makanan cair (Food Grade Tanker) PT Budi Starch & Sweetener Tbk (Sungai Budi Group), melayani pasokan glukosa cair berkualitas tinggi ke berbagai industri makanan, minuman, permen (confectionery), biskuit, bakery, dan farmasi terkemuka di Indonesia.',
    'Sangat memahami karakteristik fisika glukosa cair yang memiliki viskositas (kekentalan) tinggi dan densitas berat, sehingga membutuhkan teknik pengendalian guncangan cairan kental (slosh dynamics) yang halus, pemeliharaan suhu tangki berinsulasi, pengoperasian pompa lobe/rotor discharge higienis, serta kepatuhan ketat terhadap segel keamanan Food Safety, BPOM, dan Halal MUI.',
    'Mengedepankan profesionalisme tinggi: inspeksi rutin manhole ber-gasket food grade, selang sanitasi stainless, sertifikat pencucian CIP (Clean In Place), serta koordinasi tracking GPS real-time demi ketepatan jadwal bongkar muat di tangki silo pabrik konsumen.'
  ],
  resumeUrl: '#',
  avatarUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80'
};

export const statsData: StatItem[] = [
  {
    label: 'Pengalaman Tangki Glukosa',
    value: '8+ Thn',
    numericValue: 8,
    suffix: '+',
    description: 'PT Budi Starch & Sweetener / F&B Logistics'
  },
  {
    label: 'Total Jarak Distribusi',
    value: '500K+ KM',
    numericValue: 500,
    suffix: 'K+ KM',
    description: 'Jalur Pabrik Lampung - Jawa Tanpa Kontaminasi & Zero Accident'
  },
  {
    label: 'Integritas Sanitasi & Segel',
    value: '100%',
    numericValue: 100,
    suffix: '%',
    description: 'Standar Food Grade, CIP Sanitized & Halal MUI'
  },
  {
    label: 'Ketepatan Suplai Industri F&B',
    value: '99.9%',
    numericValue: 99.9,
    suffix: '%',
    description: 'Zero Tumpah, Zero Susut & Presisi Jadwal Bongkar Silo'
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Penguasaan Armada Tangki Glukosa (PT Budi Starch & Sweetener)',
    description: 'Pengalaman mengoperasikan tangki Stainless Steel SUS 304/316 berinsulasi untuk muatan pemanis cair kental.',
    icon: 'Truck',
    skills: [
      { name: 'Truk Tangki Stainless Steel SUS 304/316 (16KL, 24KL, 32KL Insulasi Suhu)', level: 98, levelLabel: 'Expert', iconName: 'Truck', color: '#7C3AED' },
      { name: 'Head Tractor Tronton & Trailer 6x4 (Hino 500, Isuzu Giga, Fuso Fighter)', level: 96, levelLabel: 'Expert', iconName: 'Layers', color: '#06B6D4' },
      { name: 'Pompa Discharge Viskositas Tinggi (Sanitary Lobe / Rotor Pump)', level: 95, levelLabel: 'Expert', iconName: 'Zap', color: '#F59E0B' },
      { name: 'Sistem Insulasi Termal & Steam Coil Tangki Glukosa', level: 94, levelLabel: 'Expert', iconName: 'Flame', color: '#10B981' },
      { name: 'Sistem Segel Tera, Gasket Silikon Food Grade & Manhole Higienis', level: 99, levelLabel: 'Expert', iconName: 'ShieldCheck', color: '#818CF8' }
    ]
  },
  {
    title: 'Higienitas Pangan & Manuver Cairan Kental (Slosh Dynamics)',
    description: 'Teknik pengendalian pergerakan cairan glukosa kental, pencegahan kontaminasi, dan standar Food Safety.',
    icon: 'Shield',
    skills: [
      { name: 'Pengendalian Inersia Cairan Kental (High-Viscosity Slosh Dynamic Control)', level: 99, levelLabel: 'Expert', iconName: 'Gauge', color: '#06B6D4' },
      { name: 'Standar Sanitasi Tangki CIP (Clean In Place) & Verifikasi Sertifikat Cuci', level: 98, levelLabel: 'Expert', iconName: 'CheckCircle2', color: '#10B981' },
      { name: 'Kepatuhan Keamanan Pangan (HACCP, GMP & Halal Logistics Compliance)', level: 97, levelLabel: 'Expert', iconName: 'Award', color: '#7C3AED' },
      { name: 'Prosedur Sampling BRIX, Suhu, dan Kejernihan Sirup Glukosa', level: 95, levelLabel: 'Expert', iconName: 'FileText', color: '#F59E0B' },
      { name: 'Pengereman Halus Anti-Kocok Mencegah Kerusakan Struktur Gula Cair', level: 98, levelLabel: 'Expert', iconName: 'ShieldCheck', color: '#38BDF8' }
    ]
  },
  {
    title: 'Rute Distribusi Pabrik BUDI & Kawasan Industri F&B',
    description: 'Jalur transportasi dari pabrik pengolahan pati & pemanis ke sentra industri makanan nasional.',
    icon: 'Navigation',
    skills: [
      { name: 'Pabrik Lampung (Way Jepara/Terbanggi) -> Penyeberangan Bakauheni - Merak', level: 99, levelLabel: 'Expert', iconName: 'Globe', color: '#06B6D4' },
      { name: 'Koridor Tol Trans-Jawa ke Kawasan Industri Cikarang, Karawang & Tangerang', level: 98, levelLabel: 'Expert', iconName: 'MapPin', color: '#7C3AED' },
      { name: 'Rute Pabrik Jawa Timur (Surabaya, Sidoarjo, Pasuruan, Pandaan)', level: 96, levelLabel: 'Expert', iconName: 'Compass', color: '#38BDF8' },
      { name: 'Distribusi Sentra F&B Jawa Tengah (Semarang, Solo, Salatiga, Kudus)', level: 95, levelLabel: 'Expert', iconName: 'Gauge', color: '#10B981' },
      { name: 'Eco-Driving Muatan Berat & Ketepatan Jadwal Bongkar di Silo Pabrik', level: 97, levelLabel: 'Expert', iconName: 'Clock', color: '#F59E0B' }
    ]
  },
  {
    title: 'Inspeksi Kesiapan & Perawatan Tangki Sanitasi (Pre-Trip Inspection)',
    description: 'Pengecekan sistem mekanikal, pengereman, selang food grade, dan kebersihan tangki.',
    icon: 'Wrench',
    skills: [
      { name: 'Pre-Trip Sanitasi Tangki (Manhole, Pipa Discharge, Filter Udara Mikro)', level: 98, levelLabel: 'Expert', iconName: 'CheckCircle2', color: '#10B981' },
      { name: 'Sistem Rem Angin Penuh (Full Air Brake) & Retarder Muatan Berat Glukosa', level: 97, levelLabel: 'Expert', iconName: 'ShieldCheck', color: '#06B6D4' },
      { name: 'Inspeksi Selang Bongkar Food Grade (Sanitary Hose) & Camlock Stainless', level: 96, levelLabel: 'Expert', iconName: 'Wrench', color: '#F59E0B' },
      { name: 'Troubleshooting Mesin Diesel Common-Rail di Jalur Distribusi Antar Kota', level: 93, levelLabel: 'Advanced', iconName: 'Cpu', color: '#7C3AED' },
      { name: 'Monitoring Tekanan Ban & Torsi Roda Penahan Beban Cairan Berat', level: 98, levelLabel: 'Expert', iconName: 'Wrench', color: '#818CF8' }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: 'trip-1',
    title: 'Distribusi Tangki Glukosa Cair 32.000L: Pabrik BUDI Lampung - Kawasan Industri Cikarang (F&B Hub)',
    description: 'Pengiriman 32.000 liter Liquid Glucose Food Grade menggunakan Trailer Tangki Stainless Steel SUS 304 dari fasilitas pengolahan PT Budi Starch & Sweetener Tbk di Lampung melintasi Selat Sunda hingga kawasan pabrik makanan Cikarang.',
    category: 'Tangki Glukosa & Food Grade',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    tags: ['PT Budi Starch & Sweetener', 'Liquid Glucose 32KL', 'Stainless SUS 304', 'Food Grade CIP', 'Lampung - Cikarang'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    metrics: 'Zero Contamination | 100% Halal',
    routeDetails: 'Pabrik BUDI Lampung -> Tol Trans Sumatra -> Pelabuhan Bakauheni-Merak -> Tol Jakarta-Cikampek -> Kawasan Industri GIIC Cikarang',
    highlights: [
      'Pemeriksaan ganda segel sanitasi manhole dan kran pembuangan berbahan stainless food grade',
      'Pengendalian manuver anti-surge cairan kental pada tanjakan dan pengereman dermaga kapal feri',
      'Penerimaan di silo pabrik biskuit & confectionery dengan parameter BRIX dan kejernihan sempurna'
    ]
  },
  {
    id: 'trip-2',
    title: 'Suplai Glukosa & Sirup Fruktosa 24.000L: Pabrik BUDI Jawa Timur - Pasuruan F&B Manufacturing',
    description: 'Transportasi cairan glukosa bermutu tinggi untuk industri minuman dan olahan susu menggunakan Truk Tangki Tronton 24 KL berinsulasi suhu dengan pompa rotor discharge mandiri.',
    category: 'Tangki Glukosa & Food Grade',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Glukosa & Fruktosa 24KL', 'Tronton Tangki', 'Insulasi Suhu', 'Pasuruan Food Hub'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    metrics: 'Suhu Stabil 100% | Zero Susut',
    routeDetails: 'Pabrik BUDI Jawa Timur -> Tol Gempol-Pasuruan -> Kawasan Industri PIER Pasuruan',
    highlights: [
      'Menjaga suhu sirup glukosa tetap stabil agar tidak mengkristal selama perjalanan',
      'Pemasangan selang food grade bersertifikasi FDA saat proses bongkar di tangki penerima',
      'Penyelesaian serah terima dokumen sertifikat analisis (CoA) dan pencatatan tera resmi'
    ]
  },
  {
    id: 'trip-3',
    title: 'Pengiriman Glukosa Industri Kembang Gula & Permen 28.000L: Lampung - Tangerang / Cikupa',
    description: 'Pengangkutan glukosa pati singkong murni dari pabrik PT Budi Starch & Sweetener Tbk ke produsen permen dan jeli terkemuka di Tangerang dengan komitmen higienitas tingkat tinggi.',
    category: 'Tangki Glukosa & Food Grade',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Glukosa Manis 28KL', 'Sungai Budi Group', 'Standar BPOM', 'Tangerang Cikupa'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    metrics: 'Food Safety Grade A | On-Time',
    routeDetails: 'Pabrik Lampung -> Lintas Sumatra -> Bakauheni -> Pelabuhan Merak -> Tol Jakarta-Tangerang -> Cikupa',
    highlights: [
      'Pengecekan sertifikat pencucian CIP (Clean In Place) sebelum pengisian di pabrik',
      'Pencegahan kontaminasi udara dengan filter mikro pada breathing valve tangki',
      'Tiba tepat waktu sesuai jadwal produksi pabrik tanpa hambatan'
    ]
  },
  {
    id: 'trip-4',
    title: 'Transportasi Sirup Sorbitol & Maltodextrin Cair 24.000L: Surabaya - Semarang / Solo',
    description: 'Distribusi sirup turunan pati singkong (Sorbitol Liquid) dari pabrik grup ke sentra industri farmasi sirup obat dan makanan diet di Jawa Tengah via Tol Trans-Jawa.',
    category: 'Tangki Glukosa & Food Grade',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sorbitol Cair 24KL', 'Trans-Jawa Express', 'Pharma & Food Grade', 'Tol Trans Jawa'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    metrics: 'Standar Farmasi SUS 316 | 100%',
    routeDetails: 'Depo Pasokan Surabaya -> Tol Trans Jawa -> Solo -> Kawasan Industri Terboyo Semarang',
    highlights: [
      'Penggunaan tangki khusus Stainless SUS 316 dengan standar kebersihan tertinggi',
      'Pengendalian torsi mesin dan rem hidrolik di turunan tol Trans-Jawa',
      'Verifikasi segel bersama tim Quality Assurance (QA) pabrik penerima'
    ]
  },
  {
    id: 'trip-5',
    title: 'Distribusi Glukosa Cair Industri Bakery & Biskuit: Lampung - Kawasan Industri Karawang KIIC',
    description: 'Suplai rutin glukosa cair 30.000L untuk lini produksi biskuit dan roti skala nasional dengan sistem pemantauan telemetri GPS dan jadwal pengiriman terjadwal.',
    category: 'Tangki Glukosa & Food Grade',
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
    tags: ['Glukosa Bakery 30KL', 'Karawang KIIC', 'Trailer Tangki', 'GPS Tracking'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    metrics: 'Presisi Jadwal 100% | Zero Delay',
    routeDetails: 'Pabrik BUDI Lampung -> Bakauheni -> Merak -> Tol Japek Elevated -> Karawang KIIC',
    highlights: [
      'Koordinasi waktu tiba dengan tim silo discharge agar tidak terjadi antrean armada',
      'Pemeriksaan kekedapan paking manhole dan kran anti-tetes',
      'Bongkar muat efisien menggunakan pompa discharge debit 40.000 L/jam'
    ]
  },
  {
    id: 'trip-6',
    title: 'Pengangkutan Glukosa Cair Kebutuhan Industri Es Krim & Olahan Susu: Jawa Timur - Mojokerto',
    description: 'Pengiriman glukosa cair 20.000L dengan standar dingin dan higienis tinggi ke pabrik pengolahan es krim di Jawa Timur.',
    category: 'Tangki Glukosa & Food Grade',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Glukosa Es Krim 20KL', 'Tronton Tangki', 'Food Grade Higienis', 'Mojokerto F&B'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    metrics: 'Uji Mikrobiologi Lolos 100%',
    routeDetails: 'Pabrik BUDI -> Tol Surabaya-Mojokerto -> Kawasan Industri Ngoro Mojokerto',
    highlights: [
      'Pengecekan sterilitas koneksi pipa dan selang discharge food grade',
      'Pengoperasian pompa rotor halus tanpa menimbulkan buih pada glukosa',
      'Dokumentasi lengkap surat jalan dan sertifikat halal produk'
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2021 - Sekarang',
    role: 'Lead Heavy Tanker Driver (Glukosa Cair, Fruktosa & Food Grade)',
    company: 'PT Budi Starch & Sweetener Tbk (Sungai Budi Group)',
    location: 'Lampung - Jawa / Rute Nasional',
    type: 'Work',
    description: 'Memimpin armada pengemudi truk tangki Stainless Steel SUS 304/316 (Tronton 24KL dan Trailer 32KL) untuk distribusi produk glukosa cair, fruktosa, dan sirup pemanis dari pabrik PT Budi Starch & Sweetener Tbk ke pelanggan industri makanan, minuman, dan farmasi di seluruh Jawa dan Sumatra.',
    achievements: [
      'Mencatatkan rekor 350.000+ KM tanpa insiden kecelakaan, tanpa tumpahan (Zero Spill), dan tanpa kontaminasi produk pangan cair.',
      'Dipercaya memegang pengiriman prioritas ke produsen makanan multinasional berkat kepatuhan ketat terhadap standar sanitasi CIP, GMP, dan Halal MUI.',
      'Menjaga tingkat ketepatan waktu pengantaran (On-Time Delivery) 99.9% di seluruh fasilitas silo pabrik konsumen.'
    ],
    technologies: ['Trailer Tangki Glukosa 32KL', 'Stainless Steel SUS 304/316', 'Sanitary Lobe Pump', 'CIP Sanitation System', 'Defensive Tanker Driving']
  },
  {
    id: 'exp-2',
    period: '2018 - 2021',
    role: 'Senior Food Grade Tanker Driver (Glukosa, Sorbitol & Minyak Nabati)',
    company: 'PT Sungai Budi Logistik Distribusi',
    location: 'Lampung & Surabaya / Trayek Jawa-Sumatra',
    type: 'Work',
    description: 'Mengoperasikan truk tangki Tronton 24KL mengangkut glukosa cair, sirup sorbitol, dan minyak nabati curah melintasi jalur penyeberangan Bakauheni-Merak dan Tol Trans-Jawa.',
    achievements: [
      'Menyelesaikan lebih dari 600+ rit perjalanan distribusi cairan pemanis dengan tingkat susut 0% dan integritas segel sempurna.',
      'Melakukan inspeksi berkala pada katup buang sanitasi, gasket food grade, dan sistem pengereman udara tanpa insiden.',
      'Menghemat konsumsi bahan bakar hingga 8% melalui teknik pengendalian momentum cairan kental (viscous slosh control).'
    ],
    technologies: ['Hino 500 Tronton Tangki', 'Isuzu Giga 24KL', 'Full Air Brake Retarder', 'Food Grade Sealing', 'GPS Telematics']
  },
  {
    id: 'exp-3',
    period: '2016 - 2018',
    role: 'Fleet Tanker Driver (Cairan Industri & Bahan Makanan)',
    company: 'PT Budi Acid Jaya / Divisi Transportasi Muatan Cair',
    location: 'Lampung / Banten / Jakarta',
    type: 'Work',
    description: 'Mengemudikan truk tangki 16KL-20KL untuk suplai cairan asam sitrat dan produk turunan pati ke pabrik-pabrik manufaktur di wilayah Jabodetabek dan Jawa Barat.',
    achievements: [
      'Lulus pelatihan Defensive Driving dan sertifikasi Standar Penanganan Muatan Cairan Industri dengan nilai tertinggi.',
      'Menerapkan protokol inspeksi pra-perjalanan (Pre-Trip Inspection) pada kompartemen tangki, pompa, dan selang secara disiplin.',
      'Diberikan penghargaan Driver Teladan atas dedikasi dan catatan bebas pelanggaran lalu lintas.'
    ],
    technologies: ['Truk Tangki 16KL', 'Sanitary Camlock System', 'Inspeksi Pre-Trip', 'SOP Tangki Pangan', 'Safety Driving']
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'Distribusi Tangki Glukosa Cair Jarak Jauh (Long-Haul Glucose Tanker)',
    description: 'Layanan pengemudi profesional spesialis transportasi glukosa cair, fruktosa, dan sirup pemanis dari pabrik PT Budi Starch & Sweetener Tbk ke seluruh kawasan industri F&B di Jawa dan Sumatra.',
    icon: 'Truck',
    features: [
      'Trayek Pabrik Lampung, Tol Trans-Sumatra, Selat Sunda & Tol Trans-Jawa',
      'Pengendalian inersia cairan kental (Anti-Surge & Viscous Slosh Dynamics)',
      'Zero contamination, zero leakage & perlindungan segel mutu pabrik',
      'Pengemudi berlisensi SIM BII Umum & Paham Standar Food Safety'
    ]
  },
  {
    id: 'serv-2',
    title: 'Operasional Tangki Stainless Steel SUS 304/316 Berinsulasi',
    description: 'Penguasaan ahli pengemudian armada tangki khusus Food Grade (Tronton 24KL & Trailer 32KL) lengkap dengan pemanas suhu dan pompa discharge higienis.',
    icon: 'Shield',
    features: [
      'Pengoperasian pompa rotor/lobe untuk cairan glukosa viskositas tinggi',
      'Monitoring suhu tangki berinsulasi agar glukosa tidak mengkristal',
      'Pemeriksaan manhole ber-gasket silikon food grade dan breathing valve steril',
      'Penanganan tangki multi-kompartemen untuk aneka varian sirup pemanis'
    ]
  },
  {
    id: 'serv-3',
    title: 'Inspeksi Sanitasi & Kesiapan Tangki K3 (Food Safety & CIP Check)',
    description: 'Pemeriksaan ketat pra-perjalanan meliputi sistem pengereman udara, verifikasi sertifikat cuci CIP (Clean In Place), kelayakan selang food grade, dan kebersihan kompartemen.',
    icon: 'Wrench',
    features: [
      'Pengecekan katup pelepasan sanitasi stainless & coupling camlock',
      'Inspeksi sistem rem angin (Full Air Brake) & retarder muatan berat',
      'Pemeriksaan kelayakan APAR dan kelengkapan keselamatan armada',
      'Protokol tanggap darurat jika terjadi kendala teknis di perjalanan'
    ]
  },
  {
    id: 'serv-4',
    title: 'Eco-Driving & Manajemen Distribusi Muatan Cair Efisien',
    description: 'Teknik mengemudi cerdas yang memperhitungkan momentum cairan berat, menjaga efisiensi konsumsi solar, mencegah keausan komponen, dan menjamin ketepatan waktu.',
    icon: 'Gauge',
    features: [
      'Akselerasi & deselerasi halus meminimalisir gelombang cairan kental',
      'Pemilihan rute perjalanan terbaik menghindari kemacetan dan jalan rusak',
      'Disiplin jadwal istirahat berkala mencegah kelelahan pengemudi',
      'Laporan logsheet muatan, parameter BRIX/suhu, dan tracking GPS real-time'
    ]
  }
];

export const socialLinks: SocialLink[] = [
  { platform: 'WhatsApp', url: 'https://wa.me/6285732033278', icon: 'MessageSquare', handle: '+62 857-3203-3278' },
  { platform: 'Phone', url: 'tel:+6285732033278', icon: 'Phone', handle: '0857-3203-3278' },
  { platform: 'Email', url: 'mailto:alindwiramadhan381@gmail.com', icon: 'Mail', handle: 'alindwiramadhan381@gmail.com' },
  { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', handle: '@alin_tankerglukosa' }
];
