/**
 * Website performance dataset — Myntra.com vs Ajio.com
 *
 * Source: SimilarWeb website analytics (similarweb.com/website/<domain>),
 * the same underlying analytics engine as the SimilarWeb Pro "Website
 * Performance" dashboard (pro.similarweb.com), covering the trailing
 * 3-month window, Total web traffic (desktop + mobile web).
 *
 * Retrieved: 2026-09-04. Figures reflect SimilarWeb's most recently
 * published period (dated by SimilarWeb as of July 2026) and will drift
 * as SimilarWeb refreshes its estimates — re-pull periodically.
 *
 * NOTE: Some Pro-only breakdowns (exact % for every traffic channel, full
 * monthly time series) are not exposed on the public overview and are
 * intentionally left out rather than estimated. Swap in Pro-dashboard
 * numbers here once pulled from the live session.
 */

const SITE_DATA = {
  meta: {
    title: "Myntra vs Ajio — Website Performance Insights",
    timeframe: "Last 3 months · Total traffic",
    retrieved: "2026-09-04",
    asOf: "SimilarWeb data as of July 2026",
    source: "similarweb.com",
    sourceUrls: {
      myntra: "https://www.similarweb.com/website/myntra.com/",
      ajio: "https://www.similarweb.com/website/ajio.com/",
    },
  },

  brands: {
    myntra: { key: "myntra", label: "Myntra", domain: "myntra.com" },
    ajio: { key: "ajio", label: "Ajio", domain: "ajio.com" },
  },

  // Headline KPIs — one row of comparison stat tiles
  kpis: [
    {
      id: "visits",
      label: "Total visits (3 mo.)",
      myntra: { value: 133_700_000, display: "133.7M", trend: "-0.68%", trendDir: "down" },
      ajio: { value: 27_500_000, display: "27.5M", trend: "-19.32%", trendDir: "down" },
      unit: "visits",
    },
    {
      id: "globalRank",
      label: "Global rank",
      myntra: { value: 229, display: "#229", trend: "was #206", trendDir: "down" },
      ajio: { value: 1543, display: "#1,543", trend: "was #1,103", trendDir: "down" },
      unit: "rank",
      lowerIsBetter: true,
    },
    {
      id: "bounce",
      label: "Bounce rate",
      myntra: { value: 45.16, display: "45.16%" },
      ajio: { value: 56.87, display: "56.87%" },
      unit: "%",
      lowerIsBetter: true,
    },
    {
      id: "pagesPerVisit",
      label: "Pages per visit",
      myntra: { value: 5.77, display: "5.77" },
      ajio: { value: 4.96, display: "4.96" },
      unit: "pages",
    },
    {
      id: "avgDuration",
      label: "Avg. visit duration",
      myntra: { value: 212, display: "3m 32s" },
      ajio: { value: 198, display: "3m 18s" },
      unit: "seconds",
    },
  ],

  // Visits — headline magnitude comparison
  visits: {
    myntra: 133_700_000,
    ajio: 27_500_000,
  },

  // Direct traffic share vs. all other channels combined (Pro-only channel
  // splits not published on the free tier — shown honestly as known/unknown)
  trafficSources: {
    myntra: { direct: 33.09, otherKnownOrder: ["Organic Search", "Paid Search", "Gen AI (emerging)"] },
    ajio: { direct: 31.99, otherKnownOrder: ["Organic Search", "Paid Search"] },
  },

  // Top secondary (non-India) markets — India excluded from the chart since
  // it dominates both (92%+) and would flatten the rest of the comparison
  geo: {
    indiaShare: { myntra: 92.39, ajio: 92.86 },
    countries: [
      { country: "United States", myntra: 3.23, ajio: 2.34 },
      { country: "United Arab Emirates", myntra: 0.6, ajio: 0.19 },
      { country: "United Kingdom", myntra: 0.53, ajio: 0.34 },
      { country: "Australia", myntra: 0.31, ajio: null },
      { country: "Germany", myntra: null, ajio: 0.32 },
    ],
  },

  demographics: {
    myntra: { male: 58.23, female: 41.77, topAge: "25-34" },
    ajio: { male: 62.48, female: 37.52, topAge: "25-34" },
  },

  rankings: [
    { label: "Global rank", myntra: "#229", ajio: "#1,543" },
    { label: "India country rank", myntra: "#21", ajio: "#156" },
    { label: "Category rank — Fashion & Apparel (India)", myntra: "#1", ajio: "#2" },
  ],

  competitors: {
    myntra: [
      { domain: "ajio.com", affinity: 100 },
      { domain: "nykaafashion.com", affinity: 96 },
      { domain: "flipkart.com", affinity: 92 },
      { domain: "amazon.in", affinity: 90 },
    ],
    ajio: [
      { domain: "thredup.com", affinity: 100 },
      { domain: "depop.com", affinity: 98 },
      { domain: "vestiairecollective.com", affinity: 92 },
    ],
  },
};
