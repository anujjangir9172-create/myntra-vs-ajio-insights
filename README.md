# Myntra vs Ajio — Website Performance Insights

A static HTML5 site comparing the website performance of **Myntra.com** and
**Ajio.com** — traffic, engagement, geography, demographics and rankings —
built from [SimilarWeb](https://www.similarweb.com) analytics.

Live site: `https://<your-username>.github.io/<repo-name>/` (see **Deploy**
below once GitHub Pages is enabled).

## Stack

Plain HTML5 + CSS + vanilla JS. No build step, no framework, no dependencies.

```
index.html          Page structure
css/styles.css       Theming (light/dark), layout, chart components
js/data.js            The dataset — edit this to refresh numbers
js/app.js              Renders data.js into the DOM
```

## Data

Sourced from SimilarWeb's public website-analytics pages
([myntra.com](https://www.similarweb.com/website/myntra.com/),
[ajio.com](https://www.similarweb.com/website/ajio.com/)), which use the same
estimation engine as the SimilarWeb Pro "Website Performance" dashboard, for
the trailing 3-month / Total-traffic window. Retrieved 2026-09-04.

**To refresh with newer numbers** (e.g. pulled from the SimilarWeb Pro
dashboard via the browser extension): open `js/data.js` and update the
`SITE_DATA` object — every section of the page re-renders from that one file,
nothing else needs to change. Update `SITE_DATA.meta.retrieved` /
`SITE_DATA.meta.asOf` too.

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
