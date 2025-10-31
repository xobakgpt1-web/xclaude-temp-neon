# 🚂 Deploy ke Railway - Panduan untuk Pemula

Panduan super mudah deploy Claude Temp Mail ke Railway (database + hosting dalam 1 tempat, 100% gratis untuk bulan pertama).

---

## 🎯 Kenapa Railway?

- ✅ **Paling mudah untuk pemula** - semua dalam 1 tempat
- ✅ **Database sudah included** - tidak perlu setup terpisah
- ✅ **Gratis $5/bulan** - cukup untuk 1 bulan penuh
- ✅ **Deploy otomatis** - push code langsung deploy
- ✅ **Custom domain gratis**

---

## 📋 Yang Anda Butuhkan

1. **Akun GitHub** (gratis) - untuk upload code
2. **Akun Railway** (gratis) - untuk hosting
3. **Gmail API credentials** - sudah punya
4. **Cloudflare API credentials** - sudah punya

---

## 🚀 Langkah 1: Upload Code ke GitHub (5 menit)

### 1.1 Download Source Code

Download semua file project dari Manus (Code panel → Download All Files).

### 1.2 Buat Akun GitHub

1. Buka https://github.com
2. Klik **"Sign up"**
3. Isi email, password, username
4. Verify email

### 1.3 Install Git di Komputer

**Windows:**
1. Download dari https://git-scm.com/download/win
2. Install dengan klik Next-Next-Next (pakai default settings)
3. Restart komputer

**Mac:**
```bash
# Buka Terminal, ketik:
xcode-select --install
```

**Linux:**
```bash
sudo apt install git
```

### 1.4 Upload Code ke GitHub

Buka Terminal/Command Prompt, ketik:

```bash
# Masuk ke folder project
cd Downloads/claude-temp-mail
# (sesuaikan dengan lokasi folder Anda)

# Setup Git (ganti dengan nama dan email Anda)
git config --global user.name "Nama Anda"
git config --global user.email "email@anda.com"

# Init Git
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit"
```

### 1.5 Buat Repository di GitHub

1. Buka https://github.com/new
2. Repository name: `claude-temp-mail`
3. **Private** atau **Public** (terserah Anda)
4. **JANGAN** centang "Add a README file"
5. Klik **"Create repository"**

### 1.6 Push ke GitHub

GitHub akan tampilkan instruksi. Copy dan paste ke Terminal:

```bash
git remote add origin https://github.com/username/claude-temp-mail.git
git branch -M main
git push -u origin main
```

**Jika diminta username/password:**
- Username: username GitHub Anda
- Password: **BUKAN password GitHub**, tapi **Personal Access Token**

**Cara buat Personal Access Token:**
1. GitHub → Settings (pojok kanan atas, klik foto profil)
2. Developer settings (paling bawah sidebar)
3. Personal access tokens → Tokens (classic)
4. Generate new token (classic)
5. Note: `railway-deploy`
6. Expiration: `No expiration`
7. Centang: `repo` (semua)
8. Generate token
9. **COPY TOKEN** (tidak akan muncul lagi!)
10. Paste sebagai password saat push

Setelah berhasil push, code Anda sudah di GitHub!

---

## 🚂 Langkah 2: Deploy ke Railway (3 menit)

### 2.1 Buat Akun Railway

1. Buka https://railway.app
2. Klik **"Login"**
3. Pilih **"Login with GitHub"**
4. Authorize Railway

### 2.2 Create New Project

1. Dashboard Railway → Klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository **"claude-temp-mail"**
4. Klik **"Deploy Now"**

Railway akan mulai deploy (tunggu 2-3 menit).

### 2.3 Add MySQL Database

1. Di project yang sama, klik **"New"** (tombol + di kanan atas)
2. Pilih **"Database"**
3. Pilih **"Add MySQL"**
4. Tunggu 30 detik (database sedang dibuat)

---

## 🔐 Langkah 3: Setup Environment Variables (5 menit)

### 3.1 Get Database URL

1. Klik **MySQL** service (kotak database)
2. Tab **"Variables"**
3. Cari variable **"MYSQL_URL"** atau **"DATABASE_URL"**
4. Klik icon **copy** di sebelah kanan
5. **SIMPAN** di Notepad (akan dipakai sebentar lagi)

### 3.2 Add Variables ke App

1. Klik service **"claude-temp-mail"** (kotak app, bukan database)
2. Tab **"Variables"**
3. Klik **"New Variable"**

### 3.3 Add Satu Per Satu

#### Variable 1: DATABASE_URL
```
Variable Name: DATABASE_URL
Value: (paste dari MySQL MYSQL_URL tadi)
```
Klik **"Add"**

#### Variable 2: GMAIL_CLIENT_ID
```
Variable Name: GMAIL_CLIENT_ID
Value: (paste Gmail client ID Anda)
```
Klik **"Add"**

#### Variable 3: GMAIL_CLIENT_SECRET
```
Variable Name: GMAIL_CLIENT_SECRET
Value: (paste Gmail client secret Anda)
```
Klik **"Add"**

#### Variable 4: GMAIL_REFRESH_TOKEN
```
Variable Name: GMAIL_REFRESH_TOKEN
Value: 1//04Fesqw4um4t6CgYIARAAGAQSNwF-L9IrkDeo05XmMCxyedN4DEKEVSASs2wQzKJXK82E_j2zwj7Y1Zex78by8uI9q1N6E3fYJUc
```
Klik **"Add"**

#### Variable 5: CLOUDFLARE_API_TOKEN
```
Variable Name: CLOUDFLARE_API_TOKEN
Value: (paste Cloudflare API token Anda)
```
Klik **"Add"**

#### Variable 6: CLOUDFLARE_ACCOUNT_ID
```
Variable Name: CLOUDFLARE_ACCOUNT_ID
Value: (paste Cloudflare account ID Anda)
```
Klik **"Add"**

#### Variable 7: CLOUDFLARE_ZONE_ID
```
Variable Name: CLOUDFLARE_ZONE_ID
Value: (paste Cloudflare zone ID Anda)
```
Klik **"Add"**

#### Variable 8: JWT_SECRET
```
Variable Name: JWT_SECRET
Value: (generate random string - lihat cara di bawah)
```

**Cara generate JWT_SECRET:**

**Windows (PowerShell):**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

**Online:**
Buka https://www.random.org/strings/ → Generate 1 string, 32 characters → Copy

**Manual:**
Ketik random 32+ karakter: `aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7lM9`

Klik **"Add"**

#### Variable 9: VITE_APP_TITLE
```
Variable Name: VITE_APP_TITLE
Value: Claude Temp Mail
```
Klik **"Add"**

#### Variable 10: VITE_APP_LOGO
```
Variable Name: VITE_APP_LOGO
Value: /logo.png
```
Klik **"Add"**

#### Variable 11: NODE_ENV
```
Variable Name: NODE_ENV
Value: production
```
Klik **"Add"**

#### Variable 12: PORT
```
Variable Name: PORT
Value: 3000
```
Klik **"Add"**

### 3.4 Redeploy

Setelah semua variable ditambahkan:

1. Tab **"Deployments"**
2. Klik **"..."** (3 dots) di deployment terakhir
3. Klik **"Redeploy"**

Atau Railway akan otomatis redeploy setelah add variables.

Tunggu 2-3 menit.

---

## 🗄️ Langkah 4: Setup Database Schema (2 menit)

### 4.1 Connect ke Database

Di Terminal/Command Prompt:

```bash
cd claude-temp-mail

# Install dependencies (jika belum)
npm install -g pnpm
pnpm install
```

### 4.2 Set DATABASE_URL

**Windows (Command Prompt):**
```cmd
set DATABASE_URL=mysql://root:password@containers-us-west-123.railway.app:1234/railway
```

**Windows (PowerShell):**
```powershell
$env:DATABASE_URL="mysql://root:password@containers-us-west-123.railway.app:1234/railway"
```

**Mac/Linux:**
```bash
export DATABASE_URL="mysql://root:password@containers-us-west-123.railway.app:1234/railway"
```

(Ganti dengan DATABASE_URL dari Railway)

### 4.3 Push Schema

```bash
pnpm db:push
```

Output:
```
✓ Database schema pushed successfully
```

**Jika error:**
- Cek DATABASE_URL benar
- Pastikan database Railway sudah running
- Cek koneksi internet

---

## 🌐 Langkah 5: Generate Public URL (1 menit)

### 5.1 Enable Public Networking

1. Klik service **"claude-temp-mail"**
2. Tab **"Settings"**
3. Scroll ke **"Networking"**
4. Klik **"Generate Domain"**

Railway akan generate URL: `https://claude-temp-mail-production-xxxx.up.railway.app`

### 5.2 Test Website

Buka URL tersebut di browser.

**Jika berhasil:**
- ✅ Website muncul
- ✅ Bisa search email
- ✅ Email tampil

**Jika error:**
- Cek Deployments → View Logs
- Pastikan semua environment variables sudah benar
- Redeploy

---

## 🎨 Langkah 6: Custom Domain (Optional - 5 menit)

### 6.1 Add Custom Domain

1. Service **"claude-temp-mail"** → Settings → **Networking**
2. Scroll ke **"Custom Domains"**
3. Klik **"Add Custom Domain"**
4. Masukkan domain (contoh: `mail.yourdomain.com`)
5. Klik **"Add"**

### 6.2 Setup DNS

Railway akan tampilkan instruksi DNS.

**Untuk Subdomain:**

Login ke DNS provider (Cloudflare/Namecheap/dll), tambahkan:

```
Type: CNAME
Name: mail
Value: claude-temp-mail-production-xxxx.up.railway.app
TTL: Auto
```

**Jika pakai Cloudflare:**
- Set Proxy Status: **DNS only** (abu-abu, bukan orange)

### 6.3 Verify

Tunggu 5-10 menit, Railway akan verify domain otomatis.

SSL certificate akan otomatis di-generate (gratis).

Website bisa diakses via: `https://mail.yourdomain.com` 🎉

---

## ✅ Selesai!

Website Claude Temp Mail sudah live 24/7!

**URL Website:**
- Railway default: `https://claude-temp-mail-production-xxxx.up.railway.app`
- Custom domain: `https://mail.yourdomain.com` (jika sudah setup)

**Features yang aktif:**
- ✅ Email search
- ✅ Inbox view
- ✅ Email detail modal
- ✅ OTP detection & copy
- ✅ Auto-refresh
- ✅ HTTPS/SSL
- ✅ Auto-scaling

---

## 💰 Biaya

**Bulan Pertama:** 100% GRATIS ($5 credit)

**Setelah Bulan Pertama:** ~$5-10/bulan
- Database MySQL: ~$5/bulan
- App hosting: ~$0-5/bulan (tergantung traffic)

**Tips hemat:**
- Jika traffic rendah, bisa pakai Neon (gratis selamanya) untuk database
- Atau pakai Railway hanya untuk testing, lalu pindah ke Vercel + Neon untuk production

---

## 🔄 Update Website di Masa Depan

Jika ada perubahan code:

```bash
# Di folder project
git add .
git commit -m "Update feature"
git push

# Railway akan otomatis deploy!
```

Tidak perlu klik apapun di Railway, auto-deploy!

---

## 🔧 Troubleshooting

### Error: "Application failed to respond"

**Penyebab:** Environment variables belum lengkap atau salah

**Solusi:**
1. Cek semua variables di Railway → Variables
2. Pastikan DATABASE_URL benar
3. Redeploy

### Error: "Database connection failed"

**Penyebab:** DATABASE_URL salah atau database tidak running

**Solusi:**
1. Cek MySQL service masih running (warna hijau)
2. Copy ulang DATABASE_URL dari MySQL Variables
3. Update DATABASE_URL di app Variables
4. Redeploy

### Error: "No emails found"

**Penyebab:** Email belum ada di Gmail inbox

**Solusi:**
1. Kirim test email ke address yang di-search
2. Tunggu 1-2 menit
3. Refresh page

### Website lambat

**Penyebab:** Railway free tier shared resources

**Solusi:**
1. Upgrade ke Railway Pro ($5/bulan)
2. Atau pindah ke Vercel (lebih cepat untuk frontend)

---

## 📊 Monitoring

### Check Deployment Status

Railway Dashboard → Project → Deployments

### Check Logs

Service → Deployments → Click deployment → View Logs

### Check Database

MySQL service → Data → Browse tables

### Check Usage

Project → Usage → Lihat credit remaining

---

## 🎓 Tips untuk Pemula

### 1. Backup Code

Selalu backup code di GitHub. Jika ada masalah, bisa rollback:

```bash
git log  # Lihat history
git reset --hard <commit-id>  # Rollback
git push -f  # Force push
```

### 2. Test di Local Dulu

Sebelum push ke GitHub, test di local:

```bash
pnpm dev  # Run local server
```

Buka http://localhost:3000

### 3. Gunakan .env untuk Local Development

Buat file `.env` di folder project (untuk local testing):

```env
DATABASE_URL=mysql://...
GMAIL_CLIENT_ID=...
# dst
```

**JANGAN commit file .env ke GitHub!** (sudah ada di .gitignore)

### 4. Monitor Credit Railway

Railway Dashboard → Project → Usage

Jika credit mau habis, bisa:
- Top up $5
- Pindah ke hosting lain
- Pause project (database akan tetap ada)

---

## 🆘 Butuh Bantuan?

### Error saat Git Push

```bash
# Jika error "failed to push"
git pull origin main
git push origin main
```

### Lupa Personal Access Token

Buat token baru di GitHub → Settings → Developer settings → Personal access tokens

### Railway Deploy Stuck

1. Check Deployments → View Logs
2. Cari error message
3. Fix error di code
4. Push lagi

### Database Schema Error

```bash
# Reset database (HATI-HATI: data akan hilang!)
pnpm db:push --force
```

---

## 📚 Resources

- **Railway Docs:** https://docs.railway.app
- **GitHub Docs:** https://docs.github.com
- **Git Tutorial:** https://www.atlassian.com/git/tutorials

---

## 🎉 Selamat!

Anda sudah berhasil deploy website pertama Anda!

Website sekarang online 24/7 dan bisa diakses dari mana saja di dunia.

**Next Steps:**
1. Share URL ke teman
2. Setup custom domain
3. Monitor usage di Railway
4. Update fitur sesuai kebutuhan

**Happy Coding! 🚀**
