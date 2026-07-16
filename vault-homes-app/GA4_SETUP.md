# Google Analytics 4 — Setup Guide for Vault Homes

This guide walks you through creating and connecting a Google Analytics 4 property to your Vault Homes website.

---

## Step 1 — Create a Google Account

If you don't already have a Google account, go to [accounts.google.com](https://accounts.google.com) and create one. Use a business or admin email address you'll always have access to.

---

## Step 2 — Create a GA4 Account and Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **"Start measuring"** (or the **Admin** gear icon if you already have an account)
3. Click **"+ Create"** → **"Account"**
4. Enter **Account Name**: `Vault Homes`
5. Click **Next**
6. Enter **Property Name**: `VaultHomes.com`
7. Set **Reporting time zone**: `Nigeria (GMT+1)`
8. Set **Currency**: `Nigerian Naira (NGN)`
9. Click **Next** → Fill in your business details → Click **Create**

---

## Step 3 — Create a Web Data Stream

1. After creating the property, you'll be prompted to add a data stream
2. Choose **"Web"**
3. Enter:
   - **Website URL**: `https://vaulthomes.com`
   - **Stream Name**: `Vault Homes Website`
4. Leave **Enhanced Measurement** turned **on** (tracks scrolls, clicks, etc. automatically)
5. Click **"Create stream"**

---

## Step 4 — Copy Your Measurement ID

After creating the stream, you'll see a **Measurement ID** that looks like: `G-XXXXXXXXXX`

Copy this value — you'll need it in the next step.

---

## Step 5 — Add to Your Local Environment

Open the file `.env.local` in your project root (create it if it doesn't exist — it's based on `.env.example`):

```env
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

> ⚠️ **Never commit `.env.local` to git.** It's already in `.gitignore`.

---

## Step 6 — Add to Vercel (Production)

When you deploy to Vercel, add the environment variable in your project settings:

1. Go to [vercel.com](https://vercel.com) → Your project
2. Click **Settings** → **Environment Variables**
3. Add:
   - **Name**: `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX`
   - **Environment**: Production (and Preview if you want)
4. Click **Save** and redeploy

---

## Step 7 — Verify It's Working

**Option A — GA4 DebugView (Recommended)**

1. Install the [Google Analytics Debugger](https://chromewebstore.google.com/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Enable the extension (click the icon → turn it on)
3. Visit your **live/production site** (not localhost — GA4 only fires in production)
4. In GA4: go to **Admin** → **DebugView**
5. You should see events flowing in within 30 seconds

**Option B — Realtime Report**

1. In GA4: click **Reports** → **Realtime**
2. Visit your production site from a different device
3. You should see yourself as an active user

---

## Step 8 — Mark Key Events as Conversions

These events are tracked automatically by the site. Mark them as conversions in GA4:

1. In GA4: go to **Admin** → **Events**
2. Find these events and toggle **"Mark as conversion"** on:
   - `seller_form_submit` → Primary conversion
   - `investor_form_submit` → Primary conversion
   - `contact_form_submit` → Secondary conversion
   - `whatsapp_click` → Secondary conversion

---

## Step 9 — Connect to Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → Choose **"URL prefix"** → Enter `https://vaulthomes.com`
3. Verify ownership (easiest method: HTML tag or DNS record through your domain registrar)
4. Back in GA4: **Admin** → **Product Links** → **Search Console Links** → Link your property

This connects organic search data (keywords, impressions, clicks) to your analytics.

---

## Step 10 — Set Up Weekly Email Reports

1. In GA4: go to **Reports** → Any report you care about (e.g., Acquisition → Traffic)
2. Click the **Share** icon (top right) → **"Schedule email"**
3. Set:
   - **Recipients**: `adelajajoseph10@gmail.com`
   - **Frequency**: Weekly
   - **Day**: Monday
4. Click **Schedule**

Recommended reports to schedule weekly:
- Traffic acquisition (where users come from)
- Conversions (form submissions, WhatsApp clicks)
- Pages and screens (best-performing pages)

---

## Key Events Being Tracked

| Event | Trigger |
|---|---|
| `cta_click` | Any CTA button click |
| `seller_form_submit` | Seller form successful submission |
| `investor_form_submit` | Investor form successful submission |
| `contact_form_submit` | Contact form successful submission |
| `whatsapp_click` | WhatsApp button click |
| `insight_article_click` | Insights article card click |
| `scroll_depth` | 25%, 50%, 75%, 90%, 100% scroll milestones |
| `form_start` | User focuses first form field |
| `form_error` | Validation error on form submit |

---

## Need Help?

Contact your developer or refer to the [GA4 documentation](https://support.google.com/analytics/answer/9304153).
