# Myntra vs Ajio — Website Performance Insights

A static HTML5 site comparing the website performance of **Myntra.com** and
**Ajio.com** — traffic, engagement, marketing channels, geography,
demographics, search performance, referral traffic, rankings and the wider
category landscape — built from [SimilarWeb](https://www.similarweb.com)
Pro data.

Live site: `https://<your-username>.github.io/<repo-name>/` (see **Deploy**
below once GitHub Pages is enabled).

## Stack

Plain HTML5 + CSS + vanilla JS. No build step, no framework, no dependencies.

```
index.html          Page structure
css/styles.css       Theming (light/dark), layout, chart components
js/data.js            The dataset — edit this to refresh numbers
js/app.js              Renders data.js into the DOM
assets/                Brand logos + category photography (see below)
```

## Assets

`assets/` holds real brand marks and representative photography, used for
identification purposes on this independent comparison site (no
affiliation with or endorsement by Myntra or Reliance/Ajio implied):

- `myntra-logo.png` — Myntra's own wordmark, served from their site
  (`constant.myntassets.com`).
- `ajio-icon.avif` — Ajio's official app icon, served from their site
  (`assets-jiocdn.ajio.com`). Ajio's own header uses styled text rather
  than a logo image, so the "AJIO" wordmark on this site is recreated in
  CSS to match.
- `myntra-fashion.jpg`, `ajio-fashion.jpg` — category-representative
  fashion photography from [Unsplash](https://unsplash.com), used under
  the [Unsplash License](https://unsplash.com/license) (free for
  commercial and personal use).
- `hero-loop.mp4` — a short clothing-shop clip from [Pexels](https://www.pexels.com)
  by Kampus Production, used under the
  [Pexels License](https://www.pexels.com/license/) (free for commercial
  use, no attribution required). Captured client-side into a forward/
  reverse "boomerang" canvas loop for the hero background (see
  `initBoomerangHero` in `js/app.js`); falls back to a static first frame
  under `prefers-reduced-motion`, and hides itself entirely if it fails
  to load.

## Data

Sourced from a **SimilarWeb Pro** trial session — Website Performance,
Marketing Channels, Audience (Geography, Demographics), Search and Referral
reports — for `myntra.com` and `ajio.com`, Worldwide, All traffic, trailing
3-month window (May–Jul 2026). Retrieved 2026-09-04. Covers:

- Headline KPIs (visits, rank, bounce rate, pages/visit, duration, audience)
- Full 10-channel marketing-channel breakdown (direct, search, social, etc.)
- Audience geography (top secondary markets) and demographics (gender + age)
- Search performance (organic vs. paid, keywords, spend, branded share)
- Incoming referral traffic and top referring sites
- Global / country / category / industry rankings
- Closest competitors by affinity, and the wider category landscape
  (Amazon.in, Flipkart, Nykaa Fashion) for context

**To refresh with newer numbers**: open `js/data.js` and update the
`SITE_DATA` object — every section of the page re-renders from that one file,
nothing else needs to change. Update `SITE_DATA.meta.retrieved` /
`SITE_DATA.meta.asOf` too. A SimilarWeb Pro login (even a trial) is needed for
the channel/search/referral breakdowns; the free public tier only exposes the
headline KPIs and top-line geography/demographics.

## Run locally

Any static file server works, e.g.:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in a browser.

## Deploy to GitHub Pages

1. Push this repo to GitHub (already done if you're reading this from the
   repo).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)` → **Save**.
5. GitHub publishes the site at `https://<username>.github.io/<repo>/`
   within a minute or two.

(If this repo was created via the API as part of an automated setup, Pages
may already be enabled — check **Settings → Pages** for the live URL.)
