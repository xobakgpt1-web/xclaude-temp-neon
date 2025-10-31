# 🌟 Deploy ke Vercel + Neon - 100% Gratis Selamanya!

Panduan lengkap deploy Claude Temp Mail ke Vercel (hosting) + Neon (database PostgreSQL) - **GRATIS SELAMANYA** tanpa perlu bayar!

---

## 🎯 Kenapa Vercel + Neon?

- ✅ **100% GRATIS SELAMANYA** - tidak ada biaya bulanan
- ✅ **Neon:** 3GB storage database, unlimited queries
- ✅ **Vercel:** 100GB bandwidth/bulan, unlimited deployments
- ✅ **Custom domain gratis** dengan HTTPS otomatis
- ✅ **Auto-scaling** - traffic tinggi tetap cepat
- ✅ **Zero downtime** - tidak akan mati

---

## ⚠️ Perbedaan dengan MySQL

Project ini awalnya pakai **MySQL**, tapi Neon pakai **PostgreSQL**. Kita perlu konversi schema dulu (sudah saya siapkan file-nya).

**Jangan khawatir!** Saya sudah siapkan semua file yang dibutuhkan.

---

## 📋 Yang Anda Butuhkan

1. **Akun GitHub** (gratis)
2. **Akun Vercel** (gratis - signup dengan GitHub)
3. **Akun Neon** (gratis - signup dengan GitHub)
4. **Gmail API credentials** - sudah punya
5. **Cloudflare API credentials** - sudah punya

---

## 🗄️ Langkah 1: Setup Database di Neon (3 menit)

### 1.1 Buat Akun Neon

1. Buka https://neon.tech
2. Klik **"Sign Up"**
3. Pilih **"Continue with GitHub"**
4. Authorize Neon

### 1.2 Create Project

1. Dashboard Neon → Klik **"Create a project"**
2. **Project name:** `claude-temp-mail`
3. **PostgreSQL version:** 16 (latest)
4. **Region:** Pilih terdekat (contoh: AWS us-east-1)
5. Klik **"Create project"**

Tunggu 30 detik (database sedang dibuat).

### 1.3 Get Connection String

Setelah project dibuat, Neon akan tampilkan connection string otomatis.

1. Copy **"Connection string"** (yang ada tulisan `postgresql://...`)
2. **SIMPAN** di Notepad (format seperti ini):

```
postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Jangan tutup tab Neon dulu!** Kita akan pakai connection string ini nanti.

---

## 📦 Langkah 2: Konversi Schema ke PostgreSQL (5 menit)

### 2.1 Download Source Code

Download semua file project dari Manus (Code panel → Download All Files).

Extract ke folder, misalnya: `Downloads/claude-temp-mail`

### 2.2 Backup Schema Lama

```bash
# Buka Terminal/Command Prompt
cd Downloads/claude-temp-mail

# Backup schema MySQL (optional)
cp drizzle/schema.ts drizzle/schema-mysql-backup.ts
```

### 2.3 Ganti dengan Schema PostgreSQL

Saya sudah buatkan file `drizzle/schema-postgresql.ts` yang sudah dikonversi.

**Cara 1: Manual Copy (Mudah)**

1. Buka file `drizzle/schema-postgresql.ts` (sudah ada di project)
2. Copy semua isinya
3. Paste ke `drizzle/schema.ts` (replace semua isi)
4. Save

**Cara 2: Via Terminal**

```bash
# Ganti schema.ts dengan versi PostgreSQL
cp drizzle/schema-postgresql.ts drizzle/schema.ts
```

### 2.4 Install Dependencies

```bash
# Install pnpm (jika belum)
npm install -g pnpm

# Install dependencies
pnpm install

# Install PostgreSQL driver
pnpm add pg
```

### 2.5 Push Schema ke Neon

```bash
# Set DATABASE_URL (ganti dengan connection string dari Neon)

# Windows (Command Prompt):
set DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require

# Windows (PowerShell):
$env:DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Mac/Linux:
export DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Push schema
pnpm db:push
```

**Output yang diharapkan:**
```
✓ Database schema pushed successfully
✓ Tables created: users, emails
```

**Jika error:**
- Cek DATABASE_URL benar (copy ulang dari Neon)
- Pastikan internet stabil
- Cek Neon database masih running (buka dashboard Neon)

---

## 📤 Langkah 3: Upload ke GitHub (5 menit)

### 3.1 Install Git

**Windows:**
1. Download dari https://git-scm.com/download/win
2. Install (klik Next-Next-Next)
3. Restart komputer

**Mac:**
```bash
xcode-select --install
```

**Linux:**
```bash
sudo apt install git
```

### 3.2 Setup Git

```bash
# Buka Terminal di folder project
cd Downloads/claude-temp-mail

# Setup Git (ganti dengan nama dan email Anda)
git config --global user.name "Nama Anda"
git config --global user.email "email@anda.com"
```

### 3.3 Init Git Repository

```bash
# Init Git
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit with PostgreSQL schema"
```

### 3.4 Buat Repository di GitHub

1. Buka https://github.com/new
2. **Repository name:** `claude-temp-mail`
3. **Private** atau **Public** (terserah)
4. **JANGAN** centang "Add a README"
5. Klik **"Create repository"**

### 3.5 Push ke GitHub

GitHub akan tampilkan instruksi. Copy dan paste ke Terminal:

```bash
git remote add origin https://github.com/username/claude-temp-mail.git
git branch -M main
git push -u origin main
```

**Jika diminta login:**
- Username: username GitHub Anda
- Password: **Personal Access Token** (bukan password GitHub)

**Cara buat Personal Access Token:**
1. GitHub → Settings (pojok kanan atas)
2. Developer settings (paling bawah)
3. Personal access tokens → Tokens (classic)
4. Generate new token (classic)
5. Note: `vercel-deploy`
6. Expiration: `No expiration`
7. Centang: `repo` (semua)
8. Generate token
9. **COPY TOKEN** (tidak akan muncul lagi!)
10. Paste sebagai password

---

## 🚀 Langkah 4: Deploy ke Vercel (3 menit)

### 4.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 4.2 Login

```bash
vercel login
```

Browser akan terbuka → Login dengan GitHub

### 4.3 Deploy

```bash
cd claude-temp-mail
vercel
```

Jawab pertanyaan:
```
? Set up and deploy? → Y
? Which scope? → (pilih account Anda)
? Link to existing project? → N
? What's your project's name? → claude-temp-mail
? In which directory is your code located? → ./
? Want to override the settings? → N
```

Tunggu 1-2 menit.

Output:
```
✅ Production: https://claude-temp-mail-xxx.vercel.app
```

**JANGAN BUKA DULU** - website belum bisa jalan karena environment variables belum diset.

---

## 🔐 Langkah 5: Setup Environment Variables (5 menit)

### 5.1 Buka Vercel Dashboard

1. Buka https://vercel.com/dashboard
2. Klik project **"claude-temp-mail"**
3. Klik tab **"Settings"**
4. Klik **"Environment Variables"** di sidebar

### 5.2 Add Variables Satu Per Satu

Klik **"Add New"** untuk setiap variable:

#### Variable 1: DATABASE_URL
```
Key: DATABASE_URL
Value: (paste connection string dari Neon)
Environment: Production, Preview, Development (centang semua)
```

#### Variable 2: GMAIL_CLIENT_ID
```
Key: GMAIL_CLIENT_ID
Value: (paste Gmail client ID Anda)
Environment: Production, Preview, Development
```

#### Variable 3: GMAIL_CLIENT_SECRET
```
Key: GMAIL_CLIENT_SECRET
Value: (paste Gmail client secret Anda)
Environment: Production, Preview, Development
```

#### Variable 4: GMAIL_REFRESH_TOKEN
```
Key: GMAIL_REFRESH_TOKEN
Value: (paste refresh token Anda)
Environment: Production, Preview, Development
```

#### Variable 5: CLOUDFLARE_API_TOKEN
```
Key: CLOUDFLARE_API_TOKEN
Value: (paste Cloudflare API token Anda)
Environment: Production, Preview, Development
```

#### Variable 6: CLOUDFLARE_ACCOUNT_ID
```
Key: CLOUDFLARE_ACCOUNT_ID
Value: (paste Cloudflare account ID Anda)
Environment: Production, Preview, Development
```

#### Variable 7: CLOUDFLARE_ZONE_ID
```
Key: CLOUDFLARE_ZONE_ID
Value: (paste Cloudflare zone ID Anda)
Environment: Production, Preview, Development
```

#### Variable 8: JWT_SECRET
```
Key: JWT_SECRET
Value: (generate random string)
Environment: Production, Preview, Development
```

**Cara generate JWT_SECRET:**
```bash
# Windows (PowerShell):
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})

# Mac/Linux:
openssl rand -base64 32

# Manual:
# Ketik random 32+ karakter: aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7lM9
```

#### Variable 9: VITE_APP_TITLE
```
Key: VITE_APP_TITLE
Value: Claude Temp Mail
Environment: Production, Preview, Development
```

#### Variable 10: VITE_APP_LOGO
```
Key: VITE_APP_LOGO
Value: /logo.png
Environment: Production, Preview, Development
```

#### Variable 11: NODE_ENV
```
Key: NODE_ENV
Value: production
Environment: Production, Preview, Development
```

### 5.3 Save

Klik **"Save"** setelah semua variable ditambahkan.

---

## 🔄 Langkah 6: Redeploy (1 menit)

Environment variables baru akan aktif setelah redeploy.

### Option A: Via Dashboard

1. Klik tab **"Deployments"**
2. Klik **"..."** (3 dots) di deployment terakhir
3. Klik **"Redeploy"**
4. Confirm

### Option B: Via CLI

```bash
vercel --prod
```

Tunggu 1-2 menit.

---

## ✅ Langkah 7: Test Website (1 menit)

1. Buka URL: `https://claude-temp-mail-xxx.vercel.app`
2. Masukkan email address di search box
3. Klik **"Submit"**
4. Cek apakah email muncul

**Jika berhasil:** ✅ Website sudah live!

**Jika error:** Lihat troubleshooting di bawah.

---

## 🌐 Langkah 8: Custom Domain (Optional - 5 menit)

### 8.1 Add Domain di Vercel

1. Vercel Dashboard → Project → Settings → **Domains**
2. Klik **"Add"**
3. Masukkan domain (contoh: `mail.yourdomain.com`)
4. Klik **"Add"**

### 8.2 Setup DNS

**Untuk Subdomain** (contoh: `mail.yourdomain.com`):

Login ke DNS provider, tambahkan:
```
Type: CNAME
Name: mail
Value: cname.vercel-dns.com
TTL: Auto
```

**Jika pakai Cloudflare:**
- Set Proxy Status: **DNS only** (abu-abu)

**Untuk Root Domain** (contoh: `yourdomain.com`):
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto
```

### 8.3 Verify

Tunggu 5-10 menit, refresh page Vercel.

SSL akan otomatis aktif (gratis).

Website bisa diakses: `https://mail.yourdomain.com` 🎉

---

## 🎉 Selesai!

Website Claude Temp Mail sudah live 24/7!

**URL Production:**
- Vercel: `https://claude-temp-mail-xxx.vercel.app`
- Custom domain: `https://mail.yourdomain.com` (jika sudah setup)

**Features:**
- ✅ Email search
- ✅ Inbox view
- ✅ Email detail modal
- ✅ OTP detection & copy
- ✅ Auto-refresh
- ✅ HTTPS/SSL
- ✅ Global CDN

---

## 💰 Biaya

**100% GRATIS SELAMANYA!**

- **Neon Free Tier:**
  - 3GB storage
  - Unlimited queries
  - Unlimited databases
  - Gratis selamanya

- **Vercel Free Tier:**
  - 100GB bandwidth/bulan
  - Unlimited deployments
  - Custom domains
  - Gratis selamanya

**Cukup untuk:**
- 10,000-50,000 visitors/bulan
- 100,000+ email records
- Unlimited email searches

---

## 🔄 Update Website di Masa Depan

Jika ada perubahan code:

```bash
# Di folder project
git add .
git commit -m "Update feature"
git push

# Deploy ke Vercel
vercel --prod
```

Atau connect Vercel ke GitHub untuk auto-deploy:
1. Vercel Dashboard → Project → Settings → Git
2. Connect GitHub repository
3. Setiap push ke GitHub akan otomatis deploy!

---

## 🔧 Troubleshooting

### Error: "Database connection failed"

**Penyebab:** DATABASE_URL salah

**Solusi:**
1. Buka Neon dashboard
2. Copy ulang connection string
3. Update DATABASE_URL di Vercel env vars
4. Redeploy

### Error: "relation does not exist"

**Penyebab:** Schema belum di-push ke Neon

**Solusi:**
```bash
export DATABASE_URL="postgresql://..."
pnpm db:push
```

### Error: "Gmail API error"

**Penyebab:** Gmail credentials invalid

**Solusi:**
1. Cek GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN
2. Regenerate refresh token jika expired
3. Update di Vercel env vars
4. Redeploy

### Error: "No emails found"

**Penyebab:** Email belum ada di Gmail inbox

**Solusi:**
1. Kirim test email
2. Tunggu 1-2 menit
3. Refresh page

### Website lambat

**Penyebab:** Neon free tier cold start

**Solusi:**
- Normal untuk free tier (database sleep setelah 5 menit idle)
- First request akan lambat (1-2 detik)
- Request berikutnya cepat
- Upgrade ke Neon Pro ($19/bulan) untuk always-on

---

## 📊 Monitoring

### Vercel Analytics

Vercel Dashboard → Project → Analytics

### Neon Database

Neon Dashboard → Project → Monitoring
- Query performance
- Storage usage
- Connection count

### Check Logs

Vercel Dashboard → Deployments → Click deployment → View Logs

---

## 🎓 Tips untuk Pemula

### 1. Backup Database

Neon otomatis backup setiap hari (gratis).

Manual backup:
```bash
# Export database
pg_dump "postgresql://..." > backup.sql

# Import database
psql "postgresql://..." < backup.sql
```

### 2. Monitor Storage

Neon Dashboard → Project → Storage

Jika mendekati 3GB:
- Delete old emails
- Atau upgrade ke Neon Pro (unlimited storage)

### 3. Test di Local

```bash
export DATABASE_URL="postgresql://..."
pnpm dev
```

Buka http://localhost:3000

### 4. Gunakan .env untuk Local

Buat file `.env` di folder project:
```env
DATABASE_URL=postgresql://...
GMAIL_CLIENT_ID=...
# dst
```

**JANGAN commit .env ke GitHub!**

---

## 🆘 Butuh Bantuan?

### Error saat Git Push

```bash
git pull origin main
git push origin main
```

### Lupa Personal Access Token

Buat token baru di GitHub → Settings → Developer settings

### Vercel Deploy Stuck

1. Check Deployments → View Logs
2. Cari error message
3. Fix error
4. Push lagi

### Neon Database Error

1. Check Neon Dashboard → Project → Operations
2. Pastikan database status: Active
3. Test connection string

---

## 📚 Resources

- **Neon Docs:** https://neon.tech/docs
- **Vercel Docs:** https://vercel.com/docs
- **PostgreSQL Tutorial:** https://www.postgresql.org/docs/

---

## 🎉 Selamat!

Anda sudah berhasil deploy website dengan database gratis selamanya!

Website sekarang online 24/7 tanpa biaya bulanan.

**Next Steps:**
1. Share URL ke teman
2. Setup custom domain
3. Monitor usage di Neon dan Vercel
4. Add fitur baru sesuai kebutuhan

**Happy Coding! 🚀**

---

## 📋 Checklist Deployment

- [ ] Akun Neon dibuat
- [ ] Database Neon dibuat
- [ ] Connection string disimpan
- [ ] Schema dikonversi ke PostgreSQL
- [ ] Schema di-push ke Neon (pnpm db:push)
- [ ] Code di-upload ke GitHub
- [ ] Akun Vercel dibuat
- [ ] Project di-deploy ke Vercel
- [ ] Environment variables ditambahkan
- [ ] Website di-redeploy
- [ ] Website di-test dan berfungsi
- [ ] Custom domain di-setup (optional)

**Jika semua checklist ✅, website Anda sudah live!**
