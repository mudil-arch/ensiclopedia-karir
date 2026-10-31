# KARTU KARIER — Career Explorer

Website edukasi dan eksplorasi karier interaktif berbasis QR code untuk siswa SMA/SMK di Indonesia. Dirancang sebagai pendamping kartu profesi fisik (*Career Profile Trading Card*) dalam layanan Bimbingan dan Konseling (BK).

---

## 1. Ringkasan Arsitektur & Teknologi

- **Framework**: Next.js 15 (App Router) dengan React 19 & TypeScript
- **Styling**: Tailwind CSS (Mobile-first, aksesibel, mendukung mode cetak profil)
- **QR Engine**: `qrcode` (pembuatan SVG vektor & PNG kontras tinggi dengan Level Koreksi H dan *quiet zone* margin=4) serta `jsqr` + `pngjs` untuk pengujian dekode optik otomatis
- **Penyimpanan Data**: Sistem penyimpanan JSON terstruktur di sisi server (`src/data/db.json`) yang diinisialisasi otomatis dari `src/data/initial-data.ts` dan siap dihubungkan ke basis data eksternal (seperti PostgreSQL/Supabase)
- **Autentikasi Admin**: Cookie sesi `httpOnly` bertanda tangan kriptografis (`HMAC-SHA256`) di sisi server tanpa menyimpan kata sandi di kode frontend

---

## 2. Cara Menjalankan Website Secara Lokal

1. Pastikan **Node.js** (v18+) dan **npm** telah terpasang.
2. Instal dependensi proyek:
   ```bash
   npm install
   ```
3. Buat atau perbarui serta verifikasi seluruh QR code awal:
   ```bash
   npm run generate-qr
   ```
4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
5. Buka peramban di alamat `http://localhost:3000`.

Untuk menjalankan mode produksi:
```bash
npm run build
npm run start
```

---

## 3. Cara Mengganti Nama Produk & Domain Produksi

Seluruh identitas produk dan domain dasar untuk QR code dikonfigurasi secara terpusat di:
- File konfigurasi: [`src/config/site.ts`](src/config/site.ts)
- Variabel lingkungan (`.env.local` atau pengaturan hosting):
  ```env
  NEXT_PUBLIC_SITE_NAME="KARTU KARIER — Career Explorer"
  NEXT_PUBLIC_SITE_SHORT_NAME="KARTU KARIER"
  NEXT_PUBLIC_SITE_SUBTITLE="Career Explorer"
  NEXT_PUBLIC_SITE_URL="https://domain-produksi-anda.id"
  ADMIN_PASSWORD="KataSandiAdminAnda"
  ADMIN_SESSION_SECRET="rahasia-sesi-server-minimal-32-karakter"
  ```

Setelah mengubah `NEXT_PUBLIC_SITE_URL`, jalankan `npm run generate-qr` agar file QR statis di `/public/qr/` diperbarui menggunakan domain produksi baru Anda.

---

## 4. Cara Menambahkan Profesi Baru & Membuat QR Code

### A. Melalui Panel Admin (`/admin`)
1. Buka halaman `/admin` dan masuk menggunakan kata sandi admin (`ADMIN_PASSWORD`).
2. Klik tombol **Tambah Profesi Baru**.
3. Isi nama profesi, slug URL (mis. `psikolog-klinis`), nomor kartu, rumpun pekerjaan, warna aksen, kode RIASEC, 3 soft skill utama, tugas, pendidikan, dan sumber referensi resmi.
4. Klik **Simpan Profesi & Buat QR Code**.
5. Sistem secara otomatis membuat halaman `/profesi/<slug>` serta file QR code di `/public/qr/<slug>.svg` dan `/public/qr/<slug>.png`.
6. Buka tab **Generator & Unduh QR Code** di Panel Admin untuk mengunduh QR code dalam format PNG atau SVG siap cetak.

### B. Melalui Data Terstruktur
Anda juga dapat menambahkan objek profesi baru yang mengikuti tipe `Profession` pada [`src/types/career.ts`](src/types/career.ts) ke dalam [`src/data/initial-data.ts`](src/data/initial-data.ts).

