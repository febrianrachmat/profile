# Personal Portfolio — Febrian Rachmat

Website portofolio personal Full Stack Software Engineer. Dibangun dengan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Framer Motion**. Mendukung dua bahasa (Indonesia & Inggris) dengan tombol toggle, intro loader, cursor spotlight, dan animasi scroll yang halus.

## ✨ Fitur

- **Bilingual (ID / EN)** — toggle bahasa instan, preferensi tersimpan di `localStorage`.
- **Desain modern** — dark theme, layout sidebar sticky terinspirasi referensi terbaik.
- **Animasi** — intro loader, scroll reveal (Framer Motion), dan cursor spotlight.
- **Responsif** — tampil rapi di mobile, tablet, dan desktop.
- **SEO-ready** — metadata Open Graph & semantic HTML.
- **Vercel-ready** — siap deploy tanpa konfigurasi tambahan.

## 🚀 Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 📝 Mengganti konten

Semua konten (placeholder) ada di satu tempat agar mudah diedit:

- **`src/lib/content.ts`** — data dirimu:
  - `profile` → nama, role, tagline, email, link sosial media, resume.
  - `about` → paragraf "Tentang Saya" (ID & EN).
  - `experiences` → riwayat pengalaman kerja.
  - `projects` → daftar projek (judul, deskripsi, tech, link, repo).
  - `skills` → keahlian per kategori.
- **`src/lib/i18n.tsx`** — teks UI/label (judul section, tombol, dsb).

Cukup ganti teks placeholder dengan datamu sendiri. Setiap field bahasa punya kunci `id` dan `en`.

## 🛠️ Build untuk produksi

```bash
npm run build
npm start
```

## ☁️ Deploy ke Vercel

1. Push repo ini ke GitHub (`github.com/febrianrachmat/profile`).
2. Import project di [vercel.com](https://vercel.com).
3. Vercel mendeteksi Next.js otomatis — klik **Deploy**. Selesai.

## 📂 Struktur

```
src/
├── app/
│   ├── globals.css       # Tailwind + custom styles
│   ├── layout.tsx        # Root layout, fonts, metadata
│   └── page.tsx          # Perakitan halaman
├── components/
│   ├── Icons.tsx         # Ikon SVG inline
│   ├── Loader.tsx        # Intro loader
│   ├── Reveal.tsx        # Wrapper animasi scroll
│   ├── Sidebar.tsx       # Kolom kiri: nama, nav, sosial, toggle bahasa
│   ├── Spotlight.tsx     # Efek cahaya mengikuti kursor
│   └── sections/         # About, Projects, Skills, Contact
└── lib/
    ├── content.ts        # ← Konten utama (edit di sini)
    └── i18n.tsx          # Context bahasa + label UI
```

---

Dibuat dengan ❤️ menggunakan Next.js & Tailwind CSS.
