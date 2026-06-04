// Mock data for KMS SDG Pertanian (Publik)

export const VARITIES_DATA = [
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
    name: "Varietas B (Jagung Manis)",
    village: "Desa A",
    commodity: "Talas",
    physicalDescription: "Varietas tanaman talas lokal dengan umbi besar dan tekstur pulen. Memiliki tangkai daun berwarna keunguan dan tahan terhadap hama busuk umbi. Sangat dihargai dalam upacara adat lokal.",
    conservationStatus: "Langka",
    altitude: "700 Mdpl",
    landType: "Sawah Tadah Hujan",
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
    landType: "Pekarangan / Hutan Adat",
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
    village: "Kelurahan Marikurubu",
    commodity: "Cengkeh",
    physicalDescription: "Cengkeh tertua di dunia yang berada di lereng Gunung Gamalama. Memiliki daya tahan tinggi terhadap penyakit dan produktivitas buah yang stabil meskipun berusia ratusan tahun.",
    conservationStatus: "Terancam",
    altitude: "400 Mdpl",
    landType: "Lereng Pegunungan",
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
    landType: "Sawah Basah",
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
    village: "Desa A",
    commodity: "Uwi",
    physicalDescription: "Jenis uwi yang toleran terhadap kondisi tanah berpasir dan kering. Memiliki ukuran umbi sedang dengan kulit berserat kasar, sangat tahan terhadap kekeringan ekstrem.",
    conservationStatus: "Aman",
    altitude: "300 Mdpl",
    landType: "Tanah Kering / Pasir",
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

export const ARTICLES_DATA = [
  {
    id: "artikel-1",
    title: "Pengetahuan 1 (Konservasi Padi Ladang Kuno)",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ipsum id magna pulvinar tempor. Pellentesque sit amet turpis finibus, aliquet lacus vitae, tristique lectus. Nullam finibus nulla vestibulum ornare lobortis. Aenean bibendum velit quam, in fringilla"
  },
  {
    id: "artikel-2",
    title: "Pengetahuan 2 (Ritual Tanam Adat Talas)",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ipsum id magna pulvinar tempor. Pellentesque sit amet turpis finibus, aliquet lacus vitae, tristique lectus. Nullam finibus nulla vestibulum ornare lobortis. Aenean bibendum velit quam, in fringilla"
  },
  {
    id: "artikel-3",
    title: "Pengetahuan 3 (Teknik Pengasapan Pala Tradisional)",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel ipsum id magna pulvinar tempor. Pellentesque sit amet turpis finibus, aliquet lacus vitae, tristique lectus. Nullam finibus nulla vestibulum ornare lobortis. Aenean bibendum velit quam, in fringilla"
  }
];

export const STATS_DATA = [
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

export const FEATURED_VILLAGES = [
  {
    id: "village-1",
    name: "Desa Unggulan 1",
    varieties: "Padi Genjah, Talas Ketan",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: "village-2",
    name: "Desa Unggulan 2",
    varieties: "Uwi Wulung, Cengkeh Afo",
    image: "https://images.unsplash.com/photo-1464200687423-63ff02851934?auto=format&fit=crop&q=80&w=400",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: "village-3",
    name: "Desa Unggulan 3",
    varieties: "Pala Banda, Uwi Pasir",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400",
    description: "Lorem ipsum dolor sit amet"
  }
];
