# NEXAURO — Smart Infrastructure for Modern Retail Businesses

> Premium B2B website for NEXAURO, built with vanilla HTML, CSS, and JavaScript.

## 🚀 Quick Start

```bash
# Serve locally
npx serve . -p 3000

# Open http://localhost:3000
```

## 📁 Project Structure

```
NexAuro/
├── index.html           # Main page (all 10 sections)
├── css/                 # Modular CSS (10 files)
│   ├── variables.css    # Brand tokens & custom properties
│   ├── base.css         # Resets, typography, utilities
│   ├── navbar.css       # Sticky nav + mobile hamburger
│   ├── hero.css         # Hero + particles + floating cards
│   ├── sections.css     # How It Works + Solutions
│   ├── social-proof.css # Case Study + Testimonials
│   ├── pricing.css      # Pricing + FAQ + Team
│   ├── contact.css      # Contact form + info
│   ├── footer.css       # Footer + WhatsApp + responsive
│   └── polish.css       # Micro-animations + premium effects
├── js/                  # Component-based JavaScript (8 files)
│   ├── particles.js     # Canvas particle animation
│   ├── navbar.js        # Scroll state + progress bar
│   ├── animations.js    # Reveal, count-up, hero entrance
│   ├── solutions.js     # Industry detail panel
│   ├── testimonials.js  # Carousel + touch swipe
│   ├── faq.js           # Accordion
│   ├── contact.js       # Form validation + dual submission
│   └── main.js          # Preloader, cursor, parallax
├── api/
│   └── google-sheets-handler.gs  # Google Apps Script (copy to script.google.com)
├── robots.txt
├── sitemap.xml
├── manifest.json        # PWA manifest
└── vercel.json          # Deployment config with security headers
```

## 🔧 Setup Checklist

### 1. Form Submission (Choose One or Both)

**Option A: Google Sheets (Recommended)**
1. Create a Google Sheet named "NEXAURO Leads"
2. Go to [script.google.com](https://script.google.com)
3. Paste contents of `api/google-sheets-handler.gs`
4. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your Sheet ID
5. Deploy as Web App (Execute as: Me, Access: Anyone)
6. Copy the Web App URL into `js/contact.js` → `GOOGLE_SCRIPT_URL`

**Option B: Formspree**
1. Create account at [formspree.io](https://formspree.io)
2. Create a form pointed to `aman310762@gmail.com`
3. Replace `xpwrjkqv` in `js/contact.js` with your form ID

### 2. Analytics (Replace placeholder IDs)

In `index.html`, find and replace:
- `G-XXXXXXXXXX` → Your Google Analytics 4 ID
- `PIXEL_ID` → Your Meta Pixel ID
- `CLARITY_ID` → Your Microsoft Clarity ID

### 3. Social Links

Update `href="#"` in footer social icons with actual URLs.

### 4. LinkedIn URLs

Update founder LinkedIn buttons in the Team section.

## 🚢 Deployment

```bash
# Deploy to Vercel
npx vercel --prod

# Or deploy to Netlify
npx netlify deploy --prod --dir=.
```

## 📊 Features

- **10 sections**: Hero, How It Works, Solutions, Case Study, Testimonials, Pricing, FAQ, Team, Contact, Footer
- **Secure form**: Honeypot + math CAPTCHA + validation + XSS sanitization
- **Lead storage**: Google Sheets + Formspree dual submission
- **Email notifications**: Professionally formatted HTML emails
- **WhatsApp redirect**: Auto-redirect after form submission
- **Analytics**: GA4 + Meta Pixel + Microsoft Clarity + conversion tracking
- **SEO**: JSON-LD, OG tags, Twitter Cards, sitemap, robots.txt
- **PWA ready**: Web manifest + mobile meta tags
- **Performance**: Preconnect, preloader, lazy loading, CSS/JS separation
- **Security**: CSP headers, X-Frame-Options, honeypot, CAPTCHA

## 👥 Team

- **Aman Soni** — CEO & Founder
- **Vishal Soni** — Co-Founder & CMO
