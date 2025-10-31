# Claude Temp Mail - Deployment Guide

Panduan lengkap untuk deploy website Claude Temp Mail ke hosting sendiri (Vercel/Railway/VPS).

---

## 🚀 Option 1: Deploy ke Vercel (Recommended - Paling Mudah)

### Keuntungan Vercel:
- ✅ **100% Gratis** (free tier sangat generous)
- ✅ **Custom domain gratis** (HTTPS otomatis)
- ✅ **Auto-scaling** (traffic tinggi tetap cepat)
- ✅ **Global CDN** (akses cepat dari seluruh dunia)
- ✅ **Zero downtime** (tidak akan mati seperti server biasa)
- ✅ **Deploy dalam 5 menit**

### Langkah Deploy ke Vercel:

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login ke Vercel

```bash
vercel login
```

Browser akan terbuka, pilih metode login (GitHub/Email).

#### 3. Deploy Project

```bash
# Masuk ke folder project
cd claude-temp-mail

# Deploy
vercel

# Jawab pertanyaan:
# ? Set up and deploy? → Yes
# ? Which scope? → (pilih account Anda)
# ? Link to existing project? → No
# ? What's your project's name? → claude-temp-mail
# ? In which directory is your code located? → ./
# ? Want to override the settings? → No
```

Vercel akan memberikan URL preview: `https://claude-temp-mail-xxx.vercel.app`

#### 4. Setup Environment Variables

**Via Vercel Dashboard:**

1. Buka https://vercel.com/dashboard
2. Pilih project "claude-temp-mail"
3. Klik **Settings** → **Environment Variables**
4. Tambahkan satu per satu:

```env
DATABASE_URL=mysql://user:password@host:port/database
GMAIL_CLIENT_ID=your-gmail-client-id
GMAIL_CLIENT_SECRET=your-gmail-client-secret
GMAIL_REFRESH_TOKEN=1//04Fesqw4um4t6CgYIARAAGAQSNwF-L9IrkDeo05XmMCxyedN4DEKEVSASs2wQzKJXK82E_j2zwj7Y1Zex78by8uI9q1N6E3fYJUc
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
CLOUDFLARE_ZONE_ID=your-cloudflare-zone-id
JWT_SECRET=generate-random-string-min-32-characters
VITE_APP_TITLE=Claude Temp Mail
VITE_APP_LOGO=/logo.png
NODE_ENV=production
```

5. Pilih environment: **Production, Preview, Development** (centang semua)
6. Klik **Save**

#### 5. Setup Database (Wajib!)

Vercel tidak include database, pilih salah satu:

**Option A: Railway (MySQL - Recommended untuk Kemudahan)**

1. Daftar di https://railway.app
2. New Project → Provision MySQL
3. Copy `DATABASE_URL` dari Variables tab
4. Paste ke Vercel env vars
5. Push schema:
   ```bash
   DATABASE_URL="mysql://..." pnpm db:push
   ```
6. **Gratis:** $5 credit/bulan (cukup untuk 1 bulan), setelah itu $5/bulan

**Option B: Neon (PostgreSQL - Gratis Selamanya)**

1. Daftar di https://neon.tech
2. Create project → Copy connection string (postgresql://...)
3. Paste ke Vercel env vars
4. **PENTING:** Perlu konversi schema MySQL → PostgreSQL:
   - Edit `drizzle/schema.ts`
   - Ganti `import { mysqlTable } from "drizzle-orm/mysql-core"`
   - Jadi `import { pgTable } from "drizzle-orm/pg-core"`
   - Ganti semua `mysqlTable` → `pgTable`
   - Ganti `mysqlEnum` → `pgEnum`
   - Ganti `varchar` → `text`
5. Push schema: `DATABASE_URL="postgresql://..." pnpm db:push`
6. **Gratis:** 3GB storage, unlimited queries, gratis selamanya

**Option C: Turso (SQLite - Gratis)**

1. Daftar di https://turso.tech
2. Install CLI: `curl -sSfL https://get.tur.so/install.sh | bash`
3. Create database:
   ```bash
   turso auth login
   turso db create claude-temp-mail
   turso db tokens create claude-temp-mail
   ```
4. Connection string: `libsql://[db].turso.io?authToken=[token]`
5. **PENTING:** Perlu konversi schema MySQL → SQLite (kompleks)
6. **Gratis:** 9GB storage, 1B row reads/bulan

**Rekomendasi:**
- **Untuk kemudahan:** Railway (no schema conversion, tapi perlu bayar setelah 1 bulan)
- **Untuk gratis selamanya:** Neon (perlu konversi schema, tapi worth it)

#### 6. Deploy Production

```bash
vercel --prod
```

Website akan live di: `https://claude-temp-mail.vercel.app`

#### 7. Setup Custom Domain

**Via Vercel Dashboard:**

1. Project → Settings → **Domains**
2. Klik **Add**
3. Masukkan domain Anda (contoh: `mail.yourdomain.com`)
4. Vercel akan berikan instruksi DNS

**Setup DNS di Domain Provider:**

**Untuk Subdomain** (contoh: `mail.yourdomain.com`):
```
Type: CNAME
Name: mail
Value: cname.vercel-dns.com
TTL: Auto
```

**Untuk Root Domain** (contoh: `yourdomain.com`):
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto
```

**Jika pakai Cloudflare:**
- Set Proxy Status: **DNS only** (abu-abu, bukan orange)

Tunggu 5-10 menit, domain akan aktif dengan HTTPS otomatis!

---

## 🚂 Option 2: Deploy ke Railway (Alternative)

### Keuntungan Railway:
- ✅ Database included (MySQL/PostgreSQL/Redis)
- ✅ Gratis $5/bulan credit
- ✅ Deploy via GitHub (auto-deploy on push)

### Langkah Deploy ke Railway:

#### 1. Upload ke GitHub

```bash
# Init git (jika belum)
git init
git add .
git commit -m "Initial commit"

# Create repo di GitHub, lalu:
git remote add origin https://github.com/username/claude-temp-mail.git
git push -u origin main
```

#### 2. Deploy di Railway

1. Buka https://railway.app
2. Login dengan GitHub
3. Klik **New Project**
4. Pilih **Deploy from GitHub repo**
5. Pilih repo `claude-temp-mail`
6. Railway akan auto-detect Node.js

#### 3. Add Database

1. Klik **New** → **Database** → **Add MySQL**
2. Copy `DATABASE_URL` dari Variables tab
3. Add ke environment variables project

#### 4. Setup Environment Variables

1. Klik project → **Variables**
2. Tambahkan semua env vars (sama seperti Vercel)

#### 5. Deploy

Railway akan auto-deploy. Tunggu 2-3 menit.

#### 6. Custom Domain

1. Project → **Settings** → **Domains**
2. Add custom domain
3. Setup CNAME di DNS provider

---

## 🖥️ Option 3: Deploy ke VPS (Advanced)

Jika punya VPS (DigitalOcean, Vultr, Linode, dll):

### Requirements:
- Ubuntu 22.04 atau lebih baru
- Node.js 18+
- MySQL/MariaDB
- Nginx (reverse proxy)

### Langkah Deploy:

#### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2 pnpm
```

#### 2. Setup Database

```bash
sudo mysql

# Di MySQL prompt:
CREATE DATABASE claude_temp_mail;
CREATE USER 'tempmail'@'localhost' IDENTIFIED BY 'strong-password-here';
GRANT ALL PRIVILEGES ON claude_temp_mail.* TO 'tempmail'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Upload Project

```bash
# Via Git
cd /var/www
sudo git clone https://github.com/username/claude-temp-mail.git
cd claude-temp-mail

# Atau upload via SCP/SFTP
```

#### 4. Setup Environment Variables

```bash
# Create .env file
sudo nano .env

# Paste:
DATABASE_URL=mysql://tempmail:strong-password-here@localhost:3306/claude_temp_mail
GMAIL_CLIENT_ID=your-client-id
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token
CLOUDFLARE_API_TOKEN=your-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ZONE_ID=your-zone-id
JWT_SECRET=random-secret-min-32-chars
VITE_APP_TITLE=Claude Temp Mail
NODE_ENV=production
PORT=3000

# Save: Ctrl+O, Enter, Ctrl+X
```

#### 5. Install & Build

```bash
# Install dependencies
pnpm install

# Push database schema
pnpm db:push

# Build project
pnpm build
```

#### 6. Start with PM2

```bash
# Start server
pm2 start npm --name "claude-temp-mail" -- start

# Auto-restart on reboot
pm2 startup
pm2 save

# Check status
pm2 status
```

#### 7. Setup Nginx Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/claude-temp-mail

# Paste:
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Save dan enable
sudo ln -s /etc/nginx/sites-available/claude-temp-mail /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 8. Setup SSL (HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 📋 Checklist Sebelum Go Live

- [ ] Database sudah setup dan bisa diakses
- [ ] Environment variables sudah lengkap
- [ ] Gmail API credentials sudah valid (test dengan send email)
- [ ] Cloudflare API credentials sudah valid
- [ ] Custom domain sudah pointing ke hosting
- [ ] SSL/HTTPS sudah aktif
- [ ] Test email search berfungsi
- [ ] Test email detail modal berfungsi
- [ ] Test OTP detection berfungsi
- [ ] Test auto-refresh berfungsi

---

## 🔧 Troubleshooting

### Error: "Database connection failed"

**Penyebab:** DATABASE_URL salah atau database tidak running

**Solusi:**
```bash
# Cek format DATABASE_URL
# Format: mysql://username:password@host:port/database

# Test connection
mysql -u username -p -h host database
```

### Error: "Gmail API error"

**Penyebab:** Refresh token expired atau invalid

**Solusi:**
1. Generate refresh token baru di Google Cloud Console
2. Update `GMAIL_REFRESH_TOKEN` di environment variables
3. Redeploy

### Error: "Module not found"

**Penyebab:** Dependencies tidak terinstall

**Solusi:**
```bash
pnpm install
pnpm build
```

### Website lambat atau timeout

**Penyebab:** Database query lambat atau server overload

**Solusi:**
- Upgrade database plan (jika pakai free tier)
- Add database indexes
- Enable caching

---

## 💡 Rekomendasi

**Untuk pemula:** Pakai **Vercel** + **PlanetScale**
- Setup paling mudah
- Gratis selamanya
- Auto-scaling
- Zero maintenance

**Untuk kontrol penuh:** Pakai **VPS** + **MySQL**
- Full control
- Bisa custom apapun
- Perlu maintenance

**Untuk yang sudah punya GitHub:** Pakai **Railway**
- Auto-deploy on push
- Database included
- Simple setup

---

## 📞 Support

Jika ada masalah saat deployment:

1. Cek logs:
   - Vercel: Dashboard → Deployments → View Logs
   - Railway: Project → Deployments → Logs
   - VPS: `pm2 logs claude-temp-mail`

2. Cek environment variables sudah lengkap

3. Test database connection

4. Pastikan Node.js version 18+

---

## 🎉 Selesai!

Website Claude Temp Mail sudah live dan bisa diakses 24/7 tanpa khawatir server mati!

Untuk update website di masa depan:
- **Vercel:** `vercel --prod`
- **Railway:** `git push` (auto-deploy)
- **VPS:** `git pull && pnpm build && pm2 restart claude-temp-mail`
