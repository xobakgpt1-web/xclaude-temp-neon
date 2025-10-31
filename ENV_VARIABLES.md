# Environment Variables Reference

Daftar lengkap environment variables yang dibutuhkan untuk menjalankan Claude Temp Mail.

---

## 🔑 Required Variables (Wajib)

### Database Configuration

```env
DATABASE_URL=mysql://username:password@host:port/database
```

**Deskripsi:** Connection string untuk MySQL database

**Format:** `mysql://[user]:[password]@[host]:[port]/[database]`

**Contoh:**
- Local: `mysql://root:password@localhost:3306/claude_temp_mail`
- PlanetScale: `mysql://user:pass@aws.connect.psdb.cloud/dbname?ssl={"rejectUnauthorized":true}`
- Railway: `mysql://root:password@containers-us-west-123.railway.app:1234/railway`

**Cara dapat:**
- PlanetScale: https://planetscale.com → Create database → Copy connection string
- Railway: https://railway.app → Add MySQL → Copy DATABASE_URL
- VPS: Setup MySQL sendiri

---

### Gmail API Credentials

```env
GMAIL_CLIENT_ID=your-gmail-client-id
GMAIL_CLIENT_SECRET=your-gmail-client-secret
GMAIL_REFRESH_TOKEN=your-gmail-refresh-token
```

**Deskripsi:** Credentials untuk mengakses Gmail API dan membaca email

**Cara dapat:**

1. **Buat Project di Google Cloud Console**
   - Buka https://console.cloud.google.com
   - Create New Project
   - Enable Gmail API

2. **Create OAuth Credentials**
   - APIs & Services → Credentials
   - Create Credentials → OAuth client ID
   - Application type: Web application
   - Authorized redirect URIs: `https://developers.google.com/oauthplayground`
   - Copy `Client ID` dan `Client Secret`

3. **Generate Refresh Token**
   - Buka https://developers.google.com/oauthplayground
   - Klik ⚙️ (Settings) → Use your own OAuth credentials
   - Paste Client ID dan Client Secret
   - Select & authorize APIs: `https://www.googleapis.com/auth/gmail.readonly`
   - Click "Authorize APIs"
   - Login dengan Gmail account yang akan digunakan
   - Click "Exchange authorization code for tokens"
   - Copy `Refresh token`

**Nilai yang Anda punya:**
```env
GMAIL_REFRESH_TOKEN=1//04Fesqw4um4t6CgYIARAAGAQSNwF-L9IrkDeo05XmMCxyedN4DEKEVSASs2wQzKJXK82E_j2zwj7Y1Zex78by8uI9q1N6E3fYJUc
```

---

### Cloudflare API Credentials

```env
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ZONE_ID=your-zone-id
```

**Deskripsi:** Credentials untuk Cloudflare Email Routing API

**Cara dapat:**

1. **API Token**
   - Login ke https://dash.cloudflare.com
   - My Profile → API Tokens
   - Create Token
   - Template: "Edit zone DNS"
   - Zone Resources: Include → Specific zone → (pilih domain Anda)
   - Copy token

2. **Account ID**
   - Dashboard → Pilih domain
   - Scroll ke bawah di sidebar kanan
   - Copy "Account ID"

3. **Zone ID**
   - Dashboard → Pilih domain
   - Scroll ke bawah di sidebar kanan
   - Copy "Zone ID"

---

### JWT Secret

```env
JWT_SECRET=random-secret-key-min-32-characters
```

**Deskripsi:** Secret key untuk signing JWT tokens (session management)

**Cara generate:**

```bash
# Option 1: OpenSSL
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online
# https://generate-secret.vercel.app/32
```

**Contoh:**
```env
JWT_SECRET=8f3d9a7b2e1c4f6a9d8b7e5c3a1f4d6b9e8c7a5f3d1b9e7c5a3f1d9b7e5c3a1f
```

---

## 📋 Application Configuration

```env
VITE_APP_TITLE=Claude Temp Mail
VITE_APP_LOGO=/logo.png
NODE_ENV=production
PORT=3000
```

**Deskripsi:**
- `VITE_APP_TITLE`: Nama aplikasi yang ditampilkan di browser
- `VITE_APP_LOGO`: Path ke logo (relative dari public folder)
- `NODE_ENV`: Environment mode (production/development)
- `PORT`: Port server (default: 3000)

---

## 🔧 Optional Variables (Opsional)

### Manus OAuth (Jika tidak pakai, bisa dihapus)

```env
OAUTH_SERVER_URL=
VITE_OAUTH_PORTAL_URL=
VITE_APP_ID=
OWNER_OPEN_ID=
OWNER_NAME=
```

**Deskripsi:** Hanya dibutuhkan jika menggunakan Manus OAuth system

**Jika deploy sendiri:** Bisa dihapus atau dikosongkan

---

## 📝 Complete Example

File `.env` lengkap untuk production:

```env
# Database
DATABASE_URL=mysql://tempmail:strongpass@db.example.com:3306/claude_temp_mail

# Gmail API
GMAIL_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=GOCSPX-abcdefghijklmnop
GMAIL_REFRESH_TOKEN=1//04Fesqw4um4t6CgYIARAAGAQSNwF-L9IrkDeo05XmMCxyedN4DEKEVSASs2wQzKJXK82E_j2zwj7Y1Zex78by8uI9q1N6E3fYJUc

# Cloudflare API
CLOUDFLARE_API_TOKEN=abcdefghijklmnopqrstuvwxyz123456
CLOUDFLARE_ACCOUNT_ID=1234567890abcdef1234567890abcdef
CLOUDFLARE_ZONE_ID=abcdef1234567890abcdef1234567890

# Security
JWT_SECRET=8f3d9a7b2e1c4f6a9d8b7e5c3a1f4d6b9e8c7a5f3d1b9e7c5a3f1d9b7e5c3a1f

# App Config
VITE_APP_TITLE=Claude Temp Mail
VITE_APP_LOGO=/logo.png
NODE_ENV=production
PORT=3000
```

---

## 🚀 Setup di Hosting Platform

### Vercel

1. Dashboard → Project → Settings → Environment Variables
2. Add satu per satu (klik "Add New")
3. Pilih environment: Production, Preview, Development
4. Save
5. Redeploy

### Railway

1. Project → Variables tab
2. Click "New Variable"
3. Paste semua variables
4. Deploy otomatis

### VPS

1. Create file `.env` di root project:
   ```bash
   nano .env
   ```
2. Paste semua variables
3. Save (Ctrl+O, Enter, Ctrl+X)
4. Restart server:
   ```bash
   pm2 restart claude-temp-mail
   ```

---

## ⚠️ Security Notes

1. **JANGAN commit file `.env` ke Git!**
   - File `.env` sudah ada di `.gitignore`
   - Jangan hapus dari `.gitignore`

2. **Jangan share credentials di public**
   - Jangan paste di chat/forum
   - Jangan screenshot dengan credentials visible

3. **Rotate credentials secara berkala**
   - Generate JWT_SECRET baru setiap 3-6 bulan
   - Regenerate API tokens jika ada security breach

4. **Use strong passwords**
   - Database password min 16 characters
   - Mix uppercase, lowercase, numbers, symbols

---

## 🔍 Troubleshooting

### Error: "Missing required environment variable"

**Solusi:** Pastikan semua required variables sudah diset

```bash
# Check variables (VPS)
cat .env

# Check variables (Vercel)
vercel env ls
```

### Error: "Invalid DATABASE_URL"

**Solusi:** Cek format connection string

```bash
# Test connection
mysql -h host -u user -p database
```

### Error: "Gmail API authentication failed"

**Solusi:**
1. Cek GMAIL_CLIENT_ID dan GMAIL_CLIENT_SECRET benar
2. Regenerate refresh token
3. Pastikan Gmail API enabled di Google Cloud Console

### Error: "Cloudflare API unauthorized"

**Solusi:**
1. Cek API token masih valid
2. Pastikan token punya permission "Edit zone DNS"
3. Cek Account ID dan Zone ID benar

---

## 📞 Need Help?

Jika masih ada masalah:

1. Cek logs untuk error message detail
2. Verify semua credentials valid
3. Test each API credential separately
4. Pastikan database accessible dari hosting

---

**Happy Deploying! 🎉**
