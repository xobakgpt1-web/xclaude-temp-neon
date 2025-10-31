# 🚀 Quick Deploy Guide - 5 Menit Go Live!

Panduan super cepat untuk deploy Claude Temp Mail ke Vercel + Railway MySQL (100% gratis).

---

## ⚡ Prerequisites

- [ ] Akun GitHub (gratis)
- [ ] Akun Vercel (gratis - signup dengan GitHub)
- [ ] Akun Railway (gratis - signup dengan GitHub)
- [ ] Gmail API credentials sudah ready
- [ ] Cloudflare API credentials sudah ready

---

## 📦 Step 1: Download Source Code (1 menit)

Anda sudah punya source code dari Manus. Download semua file project.

---

## 🗄️ Step 2: Setup Database di Railway (2 menit)

### 2.1 Create Account

1. Buka https://railway.app
2. Sign up dengan GitHub
3. Verify email

### 2.2 Create MySQL Database

1. Click **"New Project"**
2. Click **"Provision MySQL"**
3. Tunggu 30-60 detik (database sedang dibuat)

### 2.3 Get Connection String

1. Click MySQL service card
2. Click tab **"Variables"**
3. Scroll dan cari variable **"DATABASE_URL"**
4. Click icon **copy** di sebelah kanan
5. **SIMPAN** connection string ini (akan dipakai nanti)

Format connection string:
```
mysql://root:password@containers-us-west-123.railway.app:1234/railway
```

### 2.4 Push Database Schema

Di terminal/command prompt:

```bash
cd claude-temp-mail

# Set DATABASE_URL temporary (Windows)
set DATABASE_URL=mysql://root:password@containers-us-west-123.railway.app:1234/railway

# Set DATABASE_URL temporary (Mac/Linux)
export DATABASE_URL="mysql://root:password@containers-us-west-123.railway.app:1234/railway"

# Push schema
pnpm db:push
```

Output: "✓ Database schema pushed successfully"

**Jika error "pnpm not found":**
```bash
npm install -g pnpm
```

---

## 🚀 Step 3: Deploy ke Vercel (2 menit)

### 3.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 3.2 Login

```bash
vercel login
```

Browser akan terbuka → Login dengan GitHub

### 3.3 Deploy

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

Tunggu deploy selesai (1-2 menit).

Output:
```
✅ Production: https://claude-temp-mail-xxx.vercel.app
```

**JANGAN BUKA DULU** - website belum bisa jalan karena environment variables belum diset.

---

## 🔐 Step 4: Setup Environment Variables (3 menit)

### 4.1 Buka Vercel Dashboard

1. Buka https://vercel.com/dashboard
2. Click project **"claude-temp-mail"**
3. Click tab **"Settings"**
4. Click **"Environment Variables"** di sidebar

### 4.2 Add Variables

Click **"Add New"** untuk setiap variable:

#### Variable 1: DATABASE_URL
```
Key: DATABASE_URL
Value: (paste connection string dari Railway)
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
Value: 1//04Fesqw4um4t6CgYIARAAGAQSNwF-L9IrkDeo05XmMCxyedN4DEKEVSASs2wQzKJXK82E_j2zwj7Y1Zex78by8uI9q1N6E3fYJUc
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
Value: (generate random string - lihat cara di bawah)
Environment: Production, Preview, Development
```

**Cara generate JWT_SECRET:**
```bash
# Option 1: OpenSSL
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Manual
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

### 4.3 Save

Click **"Save"** setelah semua variable ditambahkan.

---

## 🔄 Step 5: Redeploy (30 detik)

Environment variables baru akan aktif setelah redeploy.

### Option A: Via Dashboard

1. Click tab **"Deployments"**
2. Click **"..."** (3 dots) di deployment terakhir
3. Click **"Redeploy"**
4. Click **"Redeploy"** lagi untuk confirm

### Option B: Via CLI

```bash
vercel --prod
```

Tunggu 1-2 menit.

---

## ✅ Step 6: Test Website (1 menit)

1. Buka URL production: `https://claude-temp-mail-xxx.vercel.app`
2. Masukkan email address di search box
3. Click **"Submit"**
4. Cek apakah email muncul

**Jika berhasil:** ✅ Website sudah live!

**Jika error:** Cek troubleshooting di bawah.

---

## 🌐 Step 7: Setup Custom Domain (Optional - 5 menit)

### 7.1 Add Domain di Vercel

1. Vercel Dashboard → Project → Settings → **Domains**
2. Click **"Add"**
3. Masukkan domain (contoh: `mail.yourdomain.com`)
4. Click **"Add"**

### 7.2 Setup DNS

Vercel akan tampilkan instruksi DNS.

**Untuk Subdomain** (contoh: `mail.yourdomain.com`):

Login ke DNS provider (Cloudflare/Namecheap/dll), tambahkan:
```
Type: CNAME
Name: mail
Value: cname.vercel-dns.com
TTL: Auto
```

**Jika pakai Cloudflare:**
- Set Proxy Status: **DNS only** (abu-abu, bukan orange)

**Untuk Root Domain** (contoh: `yourdomain.com`):

```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto
```

### 7.3 Verify

Tunggu 5-10 menit, refresh page Vercel.

Status akan berubah:
- ❌ Invalid Configuration → ✅ Valid Configuration

SSL certificate akan otomatis di-generate (gratis).

Website bisa diakses via: `https://mail.yourdomain.com` 🎉

---

## 🎉 Selesai!

Website Claude Temp Mail sudah live 24/7!

**URL Production:**
- Vercel default: `https://claude-temp-mail-xxx.vercel.app`
- Custom domain: `https://mail.yourdomain.com` (jika sudah setup)

**Features yang aktif:**
- ✅ Email search
- ✅ Inbox view
- ✅ Email detail modal
- ✅ OTP detection & copy
- ✅ Auto-refresh
- ✅ HTTPS/SSL
- ✅ Global CDN
- ✅ Auto-scaling

---

## 🔧 Troubleshooting

### Error: "Database connection failed"

**Penyebab:** DATABASE_URL salah

**Solusi:**
1. Cek DATABASE_URL di Vercel env vars
2. Pastikan format benar: `mysql://user:pass@host:port/db`
3. Test connection di Railway dashboard
4. Redeploy

### Error: "Gmail API error"

**Penyebab:** Gmail credentials invalid

**Solusi:**
1. Cek GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN
2. Regenerate refresh token jika expired
3. Pastikan Gmail API enabled di Google Cloud Console
4. Redeploy

### Error: "No emails found"

**Penyebab:** Email belum ada di Gmail inbox

**Solusi:**
1. Kirim test email ke address yang di-search
2. Tunggu 1-2 menit
3. Refresh page atau click Submit lagi

### Website tidak bisa diakses

**Penyebab:** Deployment failed

**Solusi:**
1. Vercel Dashboard → Deployments → View Logs
2. Cek error message
3. Fix error
4. Redeploy

---

## 📊 Monitoring

### Check Deployment Status

Vercel Dashboard → Project → Deployments

### Check Logs

Vercel Dashboard → Deployments → Click deployment → View Function Logs

### Check Analytics

Vercel Dashboard → Project → Analytics

---

## 🔄 Update Website

Jika ada perubahan code di masa depan:

```bash
# Pull latest code
git pull

# Deploy
vercel --prod
```

Atau push ke GitHub dan connect Vercel ke repo untuk auto-deploy.

---

## 💰 Cost

**100% GRATIS!**

- **Vercel Free Tier:** 
  - Unlimited deployments
  - 100GB bandwidth/bulan
  - Serverless functions
  - Custom domains

- **Railway Free Tier:**
  - $5 credit/bulan (cukup untuk database kecil)
  - 500MB storage
  - Shared CPU
  - 500MB RAM

Cukup untuk traffic menengah (1000-10000 visitors/hari).

**Note:** Railway $5 credit akan habis dalam 1 bulan jika database aktif 24/7. Setelah itu perlu upgrade ($5/bulan) atau migrasi ke database lain.

---

## 🔄 Alternative Database (Jika Railway Credit Habis)

### Option 1: Neon (PostgreSQL - Gratis Selamanya)

**Keuntungan:**
- ✅ Gratis selamanya (tidak ada credit limit)
- ✅ 3GB storage
- ✅ Unlimited queries
- ⚠️ Perlu konversi schema MySQL → PostgreSQL

**Setup:**
1. Daftar di https://neon.tech
2. Create project
3. Copy connection string (postgresql://...)
4. **Konversi schema** (lihat DEPLOYMENT_GUIDE.md)
5. Update DATABASE_URL di Vercel
6. Redeploy

### Option 2: Turso (SQLite - Gratis)

**Keuntungan:**
- ✅ Gratis 9GB storage
- ✅ 1 billion row reads/bulan
- ⚠️ Perlu konversi schema MySQL → SQLite

**Setup:**
1. Daftar di https://turso.tech
2. Install CLI: `curl -sSfL https://get.tur.so/install.sh | bash`
3. Create database: `turso db create claude-temp-mail`
4. Get token: `turso db tokens create claude-temp-mail`
5. Connection string: `libsql://[db].turso.io?authToken=[token]`
6. **Konversi schema** (kompleks)
7. Update DATABASE_URL
8. Redeploy

### Option 3: Aiven (MySQL - Gratis 1 Bulan Trial)

**Keuntungan:**
- ✅ MySQL native (no schema conversion)
- ✅ 1 bulan gratis
- ⚠️ Setelah trial perlu bayar

**Setup:**
1. Daftar di https://aiven.io
2. Create MySQL service
3. Copy connection string
4. Update DATABASE_URL
5. Redeploy

---

## 📞 Need Help?

Jika masih ada masalah, cek:
1. Vercel deployment logs
2. Railway database status
3. Environment variables lengkap
4. Gmail API credentials valid

---

**Happy Deploying! 🚀**

Website Anda sekarang online 24/7 tanpa khawatir server mati!
