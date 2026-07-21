# Personal Portfolio — Rachmat Febrian

Website portofolio personal Full Stack Software Engineer. Dibangun dengan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Framer Motion**. Mendukung dua bahasa (Indonesia & Inggris), intro loader, cursor spotlight, scroll progress, dan animasi scroll yang halus.

## ✨ Fitur

- **Bilingual (ID / EN)** — toggle bahasa instan, preferensi tersimpan di `localStorage`.
- **Desain modern** — light/dark theme, layout responsif dengan sticky header.
- **Animasi** — intro loader, scroll reveal (Framer Motion), cursor spotlight, scroll progress bar.
- **Responsif** — tampil rapi di mobile, tablet, dan desktop.
- **SEO-ready** — metadata Open Graph, JSON-LD Person schema, sitemap, robots.txt.
- **Vercel-ready** — siap deploy tanpa konfigurasi tambahan.

## 🚀 Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 📝 Mengganti konten

Semua konten ada di satu tempat agar mudah diedit:

- **`src/lib/content.ts`** — data dirimu:
  - `profile` → nama, role, tagline, email, link sosial media, resume.
  - `about` → paragraf "Tentang Saya" (ID & EN).
  - `timeline` → riwayat pengalaman, pendidikan, sertifikasi.
  - `projects` → daftar projek (judul, deskripsi, tech, link, repo).
  - `skills` → keahlian per kategori.
  - `ui` → label UI (tombol, heading section, dsb).
- **`src/lib/i18n.tsx`** — context bahasa + helper `t()`.

Setiap field bilingual punya kunci `en` dan `id`.

## 📄 Resume

CV tersedia di `public/resume.pdf`. Ganti file tersebut untuk memperbarui link download di Hero.

## 🛠️ Build untuk produksi

```bash
npm run build
npm start
```

## ☁️ Deploy ke Vercel

1. Push repo ini ke GitHub (`github.com/febrianrachmat/profile`).
2. Import project di [vercel.com](https://vercel.com).
3. Set env `NEXT_PUBLIC_SITE_URL` ke URL production (opsional, untuk sitemap/OG).
4. Vercel mendeteksi Next.js otomatis — klik **Deploy**. Selesai.

## 📂 Struktur

```
src/
├── app/
│   ├── globals.css       # Tailwind + custom styles
│   ├── layout.tsx        # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx          # Perakitan halaman
│   ├── sitemap.ts        # Sitemap otomatis
│   ├── robots.ts         # Robots.txt
│   └── not-found.tsx     # Halaman 404
├── components/
│   ├── Header.tsx        # Navigasi + toggle tema & bahasa
│   ├── Loader.tsx        # Intro loader
│   ├── ScrollProgress.tsx
│   ├── Spotlight.tsx     # Efek cahaya mengikuti kursor
│   └── sections/         # Hero, About, Experience, Skills, Projects, Contact
└── lib/
    ├── content.ts        # ← Konten utama (edit di sini)
    └── i18n.tsx          # Context bahasa + helper
```

---

Dibuat dengan ❤️ menggunakan Next.js & Tailwind CSS.
