import { Variety, Article, Stat, Village, MapPin } from '../types';

export const VARITIES_DATA: Variety[] = [
  {
    id: "varietas-a",
    name: "Varietas A (Padi Genjah)",
    village: "SukoJaya",
    commodity: "Padi",
    physicalDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ipsum id magna pulvinar tempor. Pellentesque sit amet turpis finibus, placerat sem eget, cursus eros. Quisque vulputate mauris nibh, id dignissim felis pellentesque vel. Vivamus non faucibus velit. Cras ac aliquam sem.",
    conservationStatus: "Aman",
    altitude: "500 Mdpl",
    landType: "Tanah",
    rainfall: "Tinggi",
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&q=80&w=800"
    ],
    practices: [
      {
        id: "practice-1",
        title: "Praktik Lokal 1",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ipsum id magna pulvinar tempor. Pellentesque sit amet turpis finibus, aliquet lacus vitae, tristique lectus. Nullam finibus nulla vestibulum ornare lobortis. Aenean bibendum velit quam, in fringilla"
      },
      {
        id: "practice-2",
        title: "Praktik Lokal 2",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ipsum id magna pulvinar tempor. Pellentesque sit amet turpis finibus, aliquet lacus vitae, tristique lectus. Nullam finibus nulla vestibulum ornare lobortis. Aenean bibendum velit quam, in fringilla"
      },
      {
        id: "practice-3",
        title: "Praktik Lokal 3",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ipsum id magna pulvinar tempor. Pellentesque sit amet turpis finibus, aliquet lacus vitae, tristique lectus. Nullam finibus nulla vestibulum ornare lobortis. Aenean bibendum velit quam, in fringilla"
      }
    ],
    calendarEvents: {
      "29": ["Quotes"],
      "1": ["Quotes"],
      "3": ["Quotes", "Giveaway"],
      "5": ["Quotes", "Giveaway"],
      "7": ["Quotes"],
      "9": ["Quotes", "Giveaway"],
      "11": ["Quotes"],
      "13": ["Quotes"],
      "17": ["Quotes"],
      "19": ["Quotes", "Giveaway", "Reel"],
      "23": ["Quotes"],
      "25": ["Quotes", "Giveaway", "Reel"],
      "27": ["Quotes", "Giveaway", "Reel"],
      "31": ["Quotes"]
    }
  },
  {
    id: "varietas-b",
    name: "Varietas B (Talas Bogor)",
    village: "Desa Cihideung",
    commodity: "Talas",
    physicalDescription: "Varietas tanaman talas lokal dengan umbi besar dan tekstur pulen. Memiliki tangkai daun berwarna keunguan dan tahan terhadap hama busuk umbi. Sangat dihargai dalam upacara adat lokal.",
    conservationStatus: "Langka",
    altitude: "700 Mdpl",
    landType: "Sawah",
    rainfall: "Sedang",
    images: [
      "https://images.unsplash.com/photo-1550081699-79c1c2e48a77?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1563514223727-6fc964d300ee?auto=format&fit=crop&q=80&w=800"
    ],
    practices: [
      {
        id: "practice-1",
        title: "Praktik Penanaman Talas",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600",
        description: "Petani menanam talas di sela-sela tanaman pelindung untuk menjaga kelembapan tanah selama musim pancaroba."
      }
    ],
    calendarEvents: {
      "5": ["Quotes"],
      "12": ["Quotes", "Giveaway"],
      "20": ["Quotes", "Reel"]
    }
  },
  {
    id: "varietas-c",
    name: "Varietas C (Uwi Wulung)",
    village: "Kasepuhan Ciptagelar",
    commodity: "Uwi",
    physicalDescription: "Uwi ungu (Dioscorea alata) yang dibudidayakan secara tradisional di lahan pekarangan dan hutan adat. Memiliki kandungan antioksidan tinggi dan umur simpan pasca panen yang sangat lama.",
    conservationStatus: "Sangat Terancam",
    altitude: "650 Mdpl",
    landType: "Pekarangan",
    rainfall: "Tinggi",
    images: [
      "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1464200687423-63ff02851934?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=800"
    ],
    practices: [
      {
        id: "practice-1",
        title: "Penyimpanan Uwi Kolong Bale",
        image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600",
        description: "Uwi yang telah dipanen diletakkan di kolong bale kayu untuk diangin-anginkan agar bertahan hingga 6 bulan sebagai cadangan pangan."
      }
    ],
    calendarEvents: {
      "10": ["Quotes"],
      "15": ["Giveaway"],
      "28": ["Reel"]
    }
  },
  {
    id: "varietas-d",
    name: "Varietas D (Pala Banda)",
    village: "Desa Lonthoir",
    commodity: "Pala",
    physicalDescription: "Tanaman pala endemik Kepulauan Banda dengan kadar minyak atsiri yang sangat tinggi dan aroma khas yang kuat. Dibudidayakan dalam sistem perkebunan tradisional (perk pala) di bawah naungan pohon kenari.",
    conservationStatus: "Aman",
    altitude: "100 Mdpl",
    landType: "Kebun Campuran",
    rainfall: "Sedang",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800"
    ],
    practices: [
      {
        id: "practice-1",
        title: "Sistem Perhutanan Sosial Kenari-Pala",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600",
        description: "Menanam pohon pala di bawah naungan pohon kenari tua untuk melindungi tanaman pala dari terik matahari langsung dan angin kencang laut."
      }
    ],
    calendarEvents: {
      "1": ["Quotes"],
      "15": ["Quotes", "Giveaway"],
      "22": ["Reel"]
    }
  },
  {
    id: "varietas-e",
    name: "Varietas E (Cengkeh Afo)",
    village: "Marikurubu",
    commodity: "Cengkeh",
    physicalDescription: "Cengkeh tertua di dunia yang berada di lereng Gunung Gamalama. Memiliki daya tahan tinggi terhadap penyakit dan produktivitas buah yang stabil meskipun berusia ratusan tahun.",
    conservationStatus: "Terancam",
    altitude: "400 Mdpl",
    landType: "Lereng Gunung",
    rainfall: "Tinggi",
    images: [
      "https://images.unsplash.com/photo-1589151480107-334757352985?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&q=80&w=800"
    ],
    practices: [
      {
        id: "practice-1",
        title: "Pemangkasan Tradisional Cengkeh",
        image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600",
        description: "Pemangkasan dahan mati secara berkala menggunakan bambu panjang untuk merangsang tunas baru tanpa merusak struktur utama pohon."
      }
    ],
    calendarEvents: {
      "8": ["Quotes"],
      "18": ["Giveaway"],
      "24": ["Quotes", "Reel"]
    }
  },
  {
    id: "varietas-f",
    name: "Varietas F (Talas Ketan)",
    village: "SukoJaya",
    commodity: "Talas",
    physicalDescription: "Varietas talas lokal dengan keunikan aroma wangi seperti beras ketan saat dikukus. Tumbuh subur di tanah gembur dengan ketersediaan air melimpah.",
    conservationStatus: "Aman",
    altitude: "600 Mdpl",
    landType: "Sawah",
    rainfall: "Tinggi",
    images: [
      "https://images.unsplash.com/photo-1550081699-79c1c2e48a77?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1563514223727-6fc964d300ee?auto=format&fit=crop&q=80&w=800"
    ],
    practices: [
      {
        id: "practice-1",
        title: "Irigasi Subak untuk Talas",
        image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600",
        description: "Pengaturan aliran air berkala dari saluran irigasi subak ke bedengan talas untuk menjaga agar tanah tidak terlalu becek."
      }
    ],
    calendarEvents: {
      "4": ["Quotes"],
      "14": ["Quotes", "Giveaway"],
      "29": ["Reel"]
    }
  },
  {
    id: "varietas-g",
    name: "Varietas G (Uwi Pasir)",
    village: "Desa Cihideung",
    commodity: "Uwi",
    physicalDescription: "Jenis uwi yang toleran terhadap kondisi tanah berpasir dan kering. Memiliki ukuran umbi sedang dengan kulit berserat kasar, sangat tahan terhadap kekeringan ekstrem.",
    conservationStatus: "Aman",
    altitude: "300 Mdpl",
    landType: "Pasir",
    rainfall: "Rendah",
    images: [
      "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1464200687423-63ff02851934?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=800"
    ],
    practices: [
      {
        id: "practice-1",
        title: "Pembuatan Guludan Pasir",
        image: "https://images.unsplash.com/photo-1464200687423-63ff02851934?auto=format&fit=crop&q=80&w=600",
        description: "Membuat tumpukan tanah pasir berbentuk guludan tinggi untuk memudahkan uwi berkembang ke bawah tanpa hambatan batu."
      }
    ],
    calendarEvents: {
      "3": ["Quotes"],
      "19": ["Quotes", "Giveaway"],
      "26": ["Reel"]
    }
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: "artikel-1",
    title: "Pengetahuan 1 (Konservasi Padi Ladang Kuno)",
    subtitle: "Konservasi Varietas Padi Endemik Kasepuhan",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ipsum id magna pulvinar tempor. Pellentesque sit amet turpis finibus, aliquet lacus vitae, tristique lectus. Nullam finibus nulla vestibulum ornare lobortis. Aenean bibendum velit quam, in fringilla",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat, lorem non libero semper, placerat sem eget, cursus eros. Quisque vulputate mauris nibh, id dignissim felis pellentesque vel. Curabitur quis volutpat lectus, hendrerit eleifend risus. Maecenas ultrices ante ac tellus elementum dignissim. Cras finibus sapien nec maximus feugiat. Etiam dignissim tellus in efficitur porta. Duis hendrerit ullamcorper pharetra. Aliquam sit amet ipsum nulla.\n\nNullam posuere, nisi quis finibus ultrices, ligula metus tristique enim, sed molestie ante est nec elit. Donec efficitur tincidunt quam vel mollis. Donec euismod nunc egestas urna hendrerit, eu pharetra lorem viverra. Mauris sed aliquet quam, mollis tincidunt tortor. Quisque eget faucibus sapien, et auctor nibh. Nullam quis dolor ut dolor egestas ultricies. Curabitur facilisis est at lectus hendrerit vulputate eu vitae ante. Nullam quis volutpat elit. Praesent a diam vitae mi ultricies euismod.\n\nInterdum et malesuada fames ac ante ipsum primis in faucibus. Duis mattis lorem magna, non tincidunt lacus lacinia eu. Curabitur quam libero, sollicitudin in nisl a, ultricies posuere turpis. Nulla volutpat blandit felis, non elementum urna iaculis id. In nec nulla metus. Aenean porta dui mattis, dapibus nibh at, viverra ex. Cras accumsan nunc vitae orci vehicula, sodales blandit lacus elementum. Maecenas hendrerit ullamcorper condimentum. Vestibulum et.",
    category: "Konservasi",
    date: "12 Mei 2026",
    author_name: "Ria Sasmita",
    author_title: "Peneliti Etnobotani CDC UI",
    author_image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    is_verified: true,
    year: 2026,
    variety_id: "varietas-a"
  },
  {
    id: "artikel-2",
    title: "Pengetahuan 2 (Ritual Tanam Adat Talas)",
    subtitle: "Kearifan Lokal Penanaman Talas Bogor",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ipsum id magna pulvinar tempor. Pellentesque sit amet turpis finibus, aliquet lacus vitae, tristique lectus. Nullam finibus nulla vestibulum ornare lobortis. Aenean bibendum velit quam, in fringilla",
    content: "Upacara adat Sunda Wiwitan dalam menanam talas bogor. Pengetahuan adat mengajarkan sinkronisasi penanaman talas dengan rasi bintang Orion (Kidang). Budidaya partisipatif ini sangat menjaga keselarasan tanah dengan alam.\n\nPetani tidak diperkenankan menggunakan zat kimia buatan. Sebagai gantinya, pupuk kompos alami dari daun bambu kering yang melapuk di sekitar bedengan diletakkan di pangkal batang talas.\n\nMelalui praktik lisan tradisional ini, ketahanan pangan adat dapat terjaga lintas generasi secara mandiri dan berdaulat sesuai dengan kedaulatan pangan wilayah setempat.",
    category: "Ritual Adat",
    date: "24 April 2026",
    author_name: "Ki Bagus",
    author_title: "Ketua Adat Kasepuhan",
    author_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    is_verified: true,
    year: 2025,
    variety_id: "varietas-b"
  },
  {
    id: "artikel-3",
    title: "Pengetahuan 3 (Teknik Pengasapan Pala Tradisional)",
    subtitle: "Teknik Pasca Panen Pala Banda",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ipsum id magna pulvinar tempor. Pellentesque sit amet turpis finibus, aliquet lacus vitae, tristique lectus. Nullam finibus nulla vestibulum ornare lobortis. Aenean bibendum velit quam, in fringilla",
    content: "Proses pengeringan buah pala menggunakan asap kayu kenari secara tidak langsung. Teknik ini menjaga agar minyak atsiri pala tidak rusak dan jamur aflatoksin tidak berkembang.\n\nSuhu ruangan pengasapan dijaga konstan antara 40-50 derajat Celcius selama 7 hari berturut-turut sampai biji pala berbunyi nyaring saat dikocok.\n\nPraktik ini diwariskan secara turun-temurun oleh masyarakat pulau Banda untuk menjaga kualitas ekspor pala tingkat dunia.",
    category: "Pasca Panen",
    date: "08 Maret 2026",
    author_name: "Umar Banda",
    author_title: "Petani Pala Banda",
    author_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    is_verified: false,
    year: 2026,
    variety_id: "varietas-d"
  }
];

export const STATS_DATA: Stat[] = [
  {
    id: "stat-1",
    label: "Jumlah varietas terdokumentasi",
    value: "148 Varietas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    iconName: "Wheat"
  },
  {
    id: "stat-2",
    label: "Jumlah Desa",
    value: "32 Desa Adat",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    iconName: "Home"
  },
  {
    id: "stat-3",
    label: "Praktik tervalidasi",
    value: "54 Praktik",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    iconName: "UserCheck"
  },
  {
    id: "stat-4",
    label: "Komunitas berkontribusi",
    value: "19 Komunitas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    iconName: "Users"
  }
];

export const VILLAGES_DATA: Village[] = [
  {
    id: "sukojaya",
    name: "SukoJaya",
    varieties: "Padi Genjah, Talas Ketan",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
    description: "Desa SukoJaya terletak di kaki bukit dengan ketinggian rata-rata 500 mdpl. Masyarakat desa sangat memegang teguh adat bertani secara selaras alam dan menolak pupuk kimia buatan. SukoJaya terkenal sebagai produsen padi genjah terbaik dan pusat konservasi talas lokal.",
    practices_count: 50,
    varieties_count: 100,
    conservation_status: "Aman",
    location_map_url: "Jawa Barat",
    latitude: -6.8123,
    longitude: 107.6152
  },
  {
    id: "cihideung",
    name: "Desa Cihideung",
    varieties: "Talas Bogor, Uwi Pasir",
    image: "https://images.unsplash.com/photo-1464200687423-63ff02851934?auto=format&fit=crop&q=80&w=600",
    description: "Cihideung merupakan desa adat yang melestarikan keanekaragaman umbi-umbian nusantara. Terkenal dengan talas bogor pulen dan jenis-jenis uwi langka yang ditanam di perkarangan rumah warga.",
    practices_count: 35,
    varieties_count: 85,
    conservation_status: "Aman",
    location_map_url: "Jawa Barat",
    latitude: -6.5971,
    longitude: 106.7986
  },
  {
    id: "ciptagelar",
    name: "Kasepuhan Ciptagelar",
    varieties: "Uwi Wulung",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600",
    description: "Masyarakat Kasepuhan Ciptagelar melestarikan lebih dari 150 varietas padi lokal kuno. Memiliki kedaulatan pangan kokoh dengan lumbung padi (leuit) tradisional yang tersebar di perkampungan.",
    practices_count: 70,
    varieties_count: 150,
    conservation_status: "Sangat Terancam",
    location_map_url: "Jawa Barat",
    latitude: -6.9536,
    longitude: 106.4953
  },
  {
    id: "lonthoir",
    name: "Desa Lonthoir",
    varieties: "Pala Banda",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
    description: "Desa Lonthoir di Kepulauan Banda Neira merupakan warisan perkebunan pala pusaka dunia. Pohon-pohon pala berusia ratusan tahun tumbuh subur di bawah naungan rindang kenari purba.",
    practices_count: 20,
    varieties_count: 40,
    conservation_status: "Aman",
    location_map_url: "Maluku",
    latitude: -4.5321,
    longitude: 129.8972
  },
  {
    id: "marikurubu",
    name: "Marikurubu",
    varieties: "Cengkeh Afo",
    image: "https://images.unsplash.com/photo-1589151480107-334757352985?auto=format&fit=crop&q=80&w=600",
    description: "Kelurahan Marikurubu di lereng Gunung Gamalama, Ternate, adalah rumah bagi Cengkeh Afo, cengkeh tertua di dunia yang menjadi pemicu jalur rempah global.",
    practices_count: 45,
    varieties_count: 60,
    conservation_status: "Terancam",
    location_map_url: "Maluku Utara",
    latitude: 0.7911,
    longitude: 127.3619
  }
];

export const MAP_PINS_DATA: MapPin[] = [
  { varietyId: 'varietas-a', cx: 280, cy: 260, label: 'Varietas A (SukoJaya)', commodity: 'Padi', status: 'Aman', province: 'Jawa Barat', ecosystem: 'Tanah' },
  { varietyId: 'varietas-b', cx: 340, cy: 260, label: 'Varietas B (Talas Bogor)', commodity: 'Talas', status: 'Langka', province: 'Jawa Barat', ecosystem: 'Sawah' },
  { varietyId: 'varietas-c', cx: 220, cy: 260, label: 'Varietas C (Uwi Wulung)', commodity: 'Uwi', status: 'Sangat Terancam', province: 'Jawa Barat', ecosystem: 'Pekarangan' },
  { varietyId: 'varietas-d', cx: 680, cy: 190, label: 'Varietas D (Pala Banda)', commodity: 'Pala', status: 'Aman', province: 'Maluku', ecosystem: 'Kebun Campuran' },
  { varietyId: 'varietas-e', cx: 620, cy: 110, label: 'Varietas E (Cengkeh Afo)', commodity: 'Cengkeh', status: 'Terancam', province: 'Maluku Utara', ecosystem: 'Lereng Gunung' },
  { varietyId: 'varietas-f', cx: 300, cy: 260, label: 'Varietas F (Talas Ketan)', commodity: 'Talas', status: 'Aman', province: 'Jawa Barat', ecosystem: 'Sawah' },
  { varietyId: 'varietas-g', cx: 360, cy: 260, label: 'Varietas G (Uwi Pasir)', commodity: 'Uwi', status: 'Aman', province: 'Jawa Barat', ecosystem: 'Pasir' }
];
