# Claude Temp Mail User Guide

**Purpose:** Search and view emails received at your domain addresses through an easy-to-use web interface.

**Access:** Public - No login required

---

## Technical Stack

Claude Temp Mail is built with modern web technologies for reliability and performance.

**Tech Stack:**
- **Frontend:** React 19 with TypeScript, styled using Tailwind CSS 4 and shadcn/ui components for a polished dark theme interface
- **Backend:** Express 4 server with tRPC 11 for type-safe API communication
- **Database:** MySQL/TiDB with Drizzle ORM for efficient email storage and retrieval
- **Email Integration:** Gmail API for receiving emails and Cloudflare Email Routing API for domain email management
- **Deployment:** Auto-scaling infrastructure with global CDN for fast worldwide access

This cutting-edge stack ensures your temporary email service runs smoothly with instant updates and reliable email delivery.

---

## Using Your Website

**Search for Emails:**
1. Enter your email address in the search box on the homepage
2. Click "Submit" to fetch all emails sent to that address
3. Toggle "Auto Refresh" to automatically check for new emails every 14 seconds

**View Your Inbox:**
After submitting an email address, you'll see a list of received emails showing the subject, sender, and date. Each email displays in a card format with key details at a glance.

**Read Email Content:**
Click the "Text" button on any email card to open the full message. You can view both HTML-formatted emails and plain text content in an easy-to-read modal window. Click "Close" or anywhere outside the modal to return to your inbox.

---

## Managing Your Website

**Update API Credentials:**
Navigate to Settings → Secrets in the Management UI to view or update your Cloudflare and Gmail API credentials. These credentials enable email routing and inbox access.

**Monitor Usage:**
Open the Dashboard panel to view website analytics including visitor counts and email search activity. You can also control website visibility settings from this panel.

**Database Management:**
Access the Database panel to view stored emails directly. The full connection information is available in the bottom-left settings menu if you need to connect external database tools.

**Custom Domain:**
Visit Settings → Domains to modify your auto-generated domain prefix or bind a custom domain for professional branding.

---

## Next Steps

Try searching for an email address to see your inbox come to life instantly.

### Production Readiness

Before going live with real users, update these API credentials:

- **Gmail API:** Update GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REFRESH_TOKEN in Settings → Secrets
- **Cloudflare API:** Update CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, and CLOUDFLARE_ZONE_ID in Settings → Secrets

Get production keys from the Gmail API Console (console.cloud.google.com) and Cloudflare Dashboard (dash.cloudflare.com) before going live.
