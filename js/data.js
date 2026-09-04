/**
 * Website performance dataset — Myntra.com vs Ajio.com
 *
 * Source: SimilarWeb Pro — Website Analysis (Website Performance, Traffic &
 * Engagement, Marketing Channels, Audience, Search, Referral), Worldwide,
 * All Traffic, trailing 3-month window (May 2026 – Jul 2026), pulled live
 * from a SimilarWeb Pro trial session on 2026-09-04.
 *
 * NOTE: SimilarWeb re-estimates continuously, so a handful of figures
 * (avg. visit duration for Myntra) that weren't re-pulled this round are
 * carried over from the prior public-tier pull and may lag slightly.
 */

const SITE_DATA = {
  meta: {
    title: "Myntra vs Ajio — Website Performance Insights",
    timeframe: "May 2026 – Jul 2026 (3 months) · Worldwide · All traffic",
    retrieved: "2026-09-04",
    asOf: "SimilarWeb Pro data as of Jul 2026",
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
      id: "totalVisits3mo",
      label: "Total visits (3 mo., Worldwide)",
      myntra: { value: 385_200_000, display: "385.2M" },
      ajio: { value: 99_600_000, display: "99.6M" },
    },
    {
      id: "monthlyVisits",
      label: "Monthly visits (latest month)",
      myntra: { value: 128_400_000, display: "128.4M" },
      ajio: { value: 33_190_000, display: "33.19M", trend: "-19.3% MoM", trendDir: "down" },
    },
    {
      id: "globalRank",
      label: "Global rank",
      myntra: { value: 229, display: "#229" },
      ajio: { value: 1543, display: "#1,543" },
      unit: "rank",
      lowerIsBetter: true,
    },
    {
      id: "industryRank",
      label: "Industry rank — Fashion & Apparel (Global)",
      myntra: { value: 4, display: "#4" },
      ajio: { value: 39, display: "#39" },
      unit: "rank",
      lowerIsBetter: true,
    },
    {
      id: "bounce",
      label: "Bounce rate",
      myntra: { value: 45.16, display: "45.16%" },
      ajio: { value: 57.52, display: "57.52%" },
      unit: "%",
      lowerIsBetter: true,
    },
    {
      id: "pagesPerVisit",
      label: "Pages per visit",
      myntra: { value: 6.09, display: "6.09" },
      ajio: { value: 5.12, display: "5.12" },
      unit: "pages",
    },
    {
      id: "avgDuration",
      label: "Avg. visit duration",
      myntra: { value: 212, display: "3m 32s" },
      ajio: { value: 200, display: "3m 20s" },
      unit: "seconds",
    },
    {
      id: "dedupAudience",
      label: "Deduplicated audience (3 mo.)",
      myntra: { value: 50_630_000, display: "50.63M" },
      ajio: { value: 16_270_000, display: "16.27M" },
    },
  ],

  // Total visits — 3-month cumulative, Worldwide, All traffic (headline bar)
  visits: {
    myntra: 385_200_000,
    ajio: 99_600_000,
  },

  // Device split
  devices: {
    myntra: { desktop: 11.84, mobile: 88.16 },
    ajio: { desktop: 9.81, mobile: 90.19 },
  },

  // Full marketing-channel breakdown (sums to ~100% per brand)
  marketingChannels: {
    myntra: {
      direct: 34.37,
      organicSearch: 21.70,
      paidSearch: 15.33,
      display: 11.05,
      organicSocial: 7.03,
      referrals: 3.64,
      paidSocial: 3.03,
      affiliates: 1.77,
      email: 1.32,
      genAI: 0.75,
    },
    ajio: {
      direct: 29.27,
      organicSearch: 20.90,
      affiliates: 12.31,
      display: 12.29,
      paidSearch: 14.64,
      paidSocial: 3.77,
      referrals: 2.79,
      email: 1.30,
      organicSocial: 1.98,
      genAI: 0.77,
    },
  },
  channelLabels: {
    direct: "Direct",
    organicSearch: "Organic search",
    paidSearch: "Paid search",
    display: "Display",
    organicSocial: "Organic social",
    referrals: "Referrals",
    paidSocial: "Paid social",
    affiliates: "Affiliates",
    email: "Email",
    genAI: "Gen AI",
  },

  // Top secondary (non-India) markets — India excluded from the chart since
  // it dominates both (~98%) and would flatten the rest of the comparison
  geo: {
    indiaShare: { myntra: 98.02, ajio: 97.95 },
    countries: [
      { country: "United States", myntra: 0.57, ajio: 0.51 },
      { country: "United Arab Emirates", myntra: 0.16, ajio: 0.14 },
      { country: "United Kingdom", myntra: 0.11, ajio: 0.10 },
      { country: "Canada", myntra: 0.08, ajio: null },
      { country: "Singapore", myntra: null, ajio: 0.11 },
    ],
  },

  demographics: {
    myntra: {
      male: 58.36,
      female: 41.64,
      topAge: "25-34",
      age: { "18-24": 23.03, "25-34": 39.58, "35-44": 14.59, "45-54": 9.92, "55-64": 7.29, "65+": 5.59 },
    },
    ajio: {
      male: 62.27,
      female: 37.73,
      topAge: "25-34",
      age: { "18-24": 23.43, "25-34": 39.99, "35-44": 13.94, "45-54": 9.86, "55-64": 7.17, "65+": 5.61 },
    },
  },

  // Search performance — organic vs paid, keywords, spend, branded share
  search: {
    myntra: {
      searchTraffic: "47.56M",
      pctOfTotalTraffic: 37.03,
      organic: { display: "27.87M", pctOfSearch: 58.6, keywords: "31.1K", keywordsYoY: -11.3 },
      paid: { display: "19.69M", pctOfSearch: 41.4, keywords: "19.71K", keywordsYoY: 59.29 },
      ppcSpend: "$2.7M",
      costPerPaidVisit: 0.14,
      rank1to3Keywords: "70,825",
      pctKeywordsRank1to3: 34.09,
      branded: 47.09,
      nonBranded: 52.91,
      topSearchTerm: { term: "ajio", clicks: "481.4K", yoy: 482.77 },
    },
    ajio: {
      searchTraffic: "11.79M",
      pctOfTotalTraffic: 35.53,
      organic: { display: "6.94M", pctOfSearch: 58.81, keywords: "60.76K", keywordsYoY: -31.01 },
      paid: { display: "4.86M", pctOfSearch: 41.19, keywords: "30.01K", keywordsYoY: 122.92 },
      ppcSpend: "$442K",
      costPerPaidVisit: 0.09,
      rank1to3Keywords: "9,820",
      pctKeywordsRank1to3: 12.83,
      branded: 53.04,
      nonBranded: 46.96,
    },
  },

  // Incoming referral traffic — total + top referring sites
  referrals: {
    myntra: {
      visits: "14.00M",
      pctOfTotal: 3.64,
      topSites: [
        { domain: "flipkart.com", share: 7.92 },
        { domain: "myntr.store", share: 7.07 },
        { domain: "amazon.in", share: 6.41 },
        { domain: "ajio.com", share: 1.53 },
        { domain: "nykaafashion.com", share: 1.03 },
      ],
    },
    ajio: {
      visits: "2.77M",
      pctOfTotal: 2.79,
      topSites: [
        { domain: "linkredirect.in", share: 32.54 },
        { domain: "myntra.com", share: 19.19 },
      ],
    },
  },

  rankings: [
    { label: "Global rank", myntra: "#229", ajio: "#1,543" },
    { label: "India country rank", myntra: "#21", ajio: "#156" },
    { label: "Category rank — Fashion & Apparel (India)", myntra: "#1", ajio: "#2" },
    { label: "Industry rank — Fashion & Apparel (Global)", myntra: "#4", ajio: "#39" },
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

  // Wider category landscape — total visits (3 mo., Worldwide, All traffic)
  // for context around where Myntra and Ajio sit among Indian e-commerce
  categoryLeaders: [
    { domain: "amazon.in", display: "1.567B" },
    { domain: "flipkart.com", display: "695.7M" },
    { domain: "myntra.com", display: "385.2M" },
    { domain: "ajio.com", display: "99.57M" },
    { domain: "nykaafashion.com", display: "59.79M" },
  ],
};
