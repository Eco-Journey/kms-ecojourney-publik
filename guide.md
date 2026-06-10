# Panduan Integrasi Supabase - KMS SDG Pertanian

Dokumen ini menjelaskan cara menyelaraskan antarmuka React + Vite dengan database Supabase, serta menyediakan skrip DDL SQL untuk membuat tabel-tabel database yang sesuai.

---

## 1. Konfigurasi Variabel Lingkungan (.env)

Kredensial database Supabase Anda telah dikonfigurasi secara otomatis dalam berkas [`.env`](file:///c:/Users/naufa/OneDrive/Documents/Semester%206/Capstone/Projects/kms-ecojourney-publik/.env) di root proyek:

```env
VITE_SUPABASE_URL=https://zdxvagxatsrvhlmpptpg.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_w6fzGz4_jnusfUDHQzyqIA_IUAiQWlN
```

Modul inisialisasi client Supabase terletak di [`src/lib/supabase.ts`](file:///c:/Users/naufa/OneDrive/Documents/Semester%206/Capstone/Projects/kms-ecojourney-publik/src/lib/supabase.ts).

---

## 2. Skema Tabel Database Supabase (DDL SQL)

Untuk menyelaraskan data dinamis dengan antarmuka aplikasi, buatlah tabel-tabel berikut di Supabase melalui **SQL Editor** Supabase Dashboard. Salin dan jalankan skrip SQL di bawah ini:

```sql
-- 1. TABEL DESA (villages)
CREATE TABLE villages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    varieties TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    practices_count INT DEFAULT 0,
    varieties_count INT DEFAULT 0,
    conservation_status TEXT,
    location_map_url TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. TABEL VARIETAS (varieties)
CREATE TABLE varieties (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    village TEXT NOT NULL,
    commodity TEXT NOT NULL,
    physicalDescription TEXT,
    conservationStatus TEXT NOT NULL,
    altitude TEXT,
    landType TEXT,
    rainfall TEXT,
    images TEXT[] NOT NULL, -- Array URL gambar
    practices JSONB DEFAULT '[]'::jsonb, -- Array object praktik lokal
    calendarEvents JSONB DEFAULT '{}'::jsonb, -- Mapping kalender adat
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TABEL ARTIKEL PENGETAHUAN (articles)
CREATE TABLE articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'Konservasi',
    date TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_title TEXT,
    author_image TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    year INT,
    variety_id TEXT REFERENCES varieties(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TABEL MARKER PETA SEBARAN (mappins)
CREATE TABLE mappins (
    varietyId TEXT PRIMARY KEY REFERENCES varieties(id) ON DELETE CASCADE,
    cx INT NOT NULL,
    cy INT NOT NULL,
    label TEXT NOT NULL,
    commodity TEXT NOT NULL,
    status TEXT NOT NULL,
    province TEXT,
    ecosystem TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. TABEL STATISTIK METRIK (stats)
CREATE TABLE stats (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    iconName TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

---

## 3. Kebijakan Keamanan (Row Level Security - RLS)

Karena aplikasi ini diakses oleh publik (tanpa login wajib untuk membaca), pastikan Anda mengaktifkan **Row Level Security (RLS)** pada setiap tabel dan membuat kebijakan izin baca (*Select Policy*) untuk publik (*anon role*):

```sql
-- Contoh mengizinkan akses baca untuk umum pada tabel varieties
ALTER TABLE varieties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON varieties 
    FOR SELECT TO anon USING (true);

-- Lakukan hal yang sama untuk tabel villages, articles, mappins, dan stats
ALTER TABLE villages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON villages FOR SELECT TO anon USING (true);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON articles FOR SELECT TO anon USING (true);

ALTER TABLE mappins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON mappins FOR SELECT TO anon USING (true);

ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON stats FOR SELECT TO anon USING (true);
```

---

## 4. Mekanisme Kerja Pengambilan Data (dataService)

Aplikasi menggunakan layer [`src/services/dataService.ts`](file:///c:/Users/naufa/OneDrive/Documents/Semester%206/Capstone/Projects/kms-ecojourney-publik/src/services/dataService.ts) untuk mengonsumsi data:

1. **Supabase Konek:** Apabila koneksi internet aktif dan tabel di Supabase terisi, komponen web akan menampilkan data dinamis langsung dari database online Supabase Anda.
2. **Koneksi Gagal / Tabel Kosong:** Jika Supabase belum di-setup atau koneksi terputus, kueri database akan mendeteksi kegagalan tersebut secara otomatis di dalam blok `try/catch` dan langsung menyajikan data dari berkas mock lokal [`src/data/mockData.ts`](file:///c:/Users/naufa/OneDrive/Documents/Semester%206/Capstone/Projects/kms-ecojourney-publik/src/data/mockData.ts).
