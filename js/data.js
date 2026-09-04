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

  // Written analysis — a digital-marketer's read of the data, not just a
  // restatement of it. `summary` is the cross-cutting executive take;
  // everything else keys to the `data-analysis` attribute on each section's
  // callout in index.html. Every inference here traces back to a number
  // elsewhere in this file — update this alongside the numbers when the
  // dataset refreshes.
  // Inline `<span class="fig m|a">` markup color-codes each figure to the
  // brand it belongs to (blue = Myntra, orange = Ajio, gold = neutral/combined)
  // so the narrative reads as a continuation of the chart's own color
  // language, not separate commentary. Rendered via innerHTML — see
  // renderAnalysis() in app.js.
  analysis: {
    summary:
      "This isn't just a traffic gap — it's two growth strategies caught mid-execution. Myntra reads like a brand in the harvest phase: strong organic pull, stickier engagement, and enough equity that shoppers search its rival's name and land on Myntra's own turf. Ajio reads like a brand still in acquisition mode — leaning on affiliates and paid channels to manufacture volume, then bleeding a chunk of it straight back out through a bounce rate <span class=\"fig a\">12+ points</span> higher and a referral graph that flows overwhelmingly toward its competitor, not away from it. Unless the channel mix shifts, the CAC-to-retention math only gets harder from here.",
    kpis:
      "Read this row as a funnel health check, not a scoreboard. Myntra's lower bounce rate (<span class=\"fig m\">45.2%</span> vs <span class=\"fig a\">57.5%</span>) and higher pages/visit (<span class=\"fig m\">6.09</span> vs <span class=\"fig a\">5.12</span>) point to a stickier on-site experience — the kind that compounds into better conversion economics over time — while Ajio's numbers look more like a brand still fighting for the first impression than nurturing a relationship.",
    visits:
      "A <span class=\"fig\">3.9×</span> visit gap that's widening, not narrowing: Ajio's <span class=\"fig a\">-19.3% MoM</span> move is the kind of trendline that should force a hard look at the acquisition mix, because scale alone never fixes a leaky funnel. The real question this chart raises for a growth team isn't 'how do we get more traffic' — it's 'why isn't the traffic we already have converting into share.'",
    channels:
      "The clearest tell of two different playbooks in the whole dataset. Ajio's affiliate share (<span class=\"fig a\">12.31%</span>, ~<span class=\"fig\">7×</span> Myntra's <span class=\"fig m\">1.77%</span>) is a performance-marketing crutch — it buys volume but rents it, since affiliate traffic typically converts at a discount and evaporates the moment commissions get cut. Myntra's edge in organic social (<span class=\"fig m\">7.03%</span> vs <span class=\"fig a\">1.98%</span>) is the opposite: audience built rather than rented, exactly the mix a CMO wants scaling because it doesn't vanish when the budget does.",
    geo:
      "With <span class=\"fig\">~98%</span> of traffic domestic for both, neither brand has an international lever doing any real work yet. The near-identical footprint abroad (US, UK and UAE leading for either) means any global expansion play starts from the same blank page for both — the entire battle, for now, is still 100% about winning India.",
    demographics:
      "Near-identical audience shape — both skew male, both peak at <span class=\"fig\">25-34</span>, both fall off a cliff past 45 — means demographic targeting isn't the differentiator and can't explain the performance gap. Whatever's driving Myntra's edge, it isn't who they're reaching. It's what happens after that person lands.",
    search:
      "The standout signal in the entire dataset: Myntra's #1 search term driving traffic is literally \"ajio\", up <span class=\"fig m\">483% YoY</span>. That's Myntra intercepting comparison-intent search for its own rival — arguably the highest-value keyword real estate in this category, since anyone typing a competitor's name is already mid-decision, and Myntra is winning that moment on its own site. Ajio's SEO footprint is the mirror opposite: <span class=\"fig a\">2×</span> the organic keywords but a third of Myntra's top-3 ranking rate — breadth without depth, a content strategy optimized for coverage rather than intent.",
    referral:
      "The one chart every Ajio growth marketer should already have on a dashboard: Myntra is Ajio's single most identifiable referral source (<span class=\"fig m\">19.19%</span>), while Ajio barely registers for Myntra (<span class=\"fig a\">1.53%</span>, 9th place — behind its own coupon microsite). Traffic is flowing from the smaller brand to the bigger one far more than the reverse, a pattern that, left alone, reinforces the incumbent rather than erodes it.",
    rankings:
      "The gap doesn't just persist across every ranking cut, it compounds as the lens narrows to India specifically — from a global rank <span class=\"fig\">6.7×</span> apart to a virtual tie in category standing that's nonetheless still a loss. In a two-horse domestic race, #2 is a very different market position than a #229-vs-#1,543 global chart makes it look.",
    competitors:
      "Worth noting for what it implies about brand perception: SimilarWeb's own affinity model can't find Ajio a closer domestic peer than international resale marketplaces (ThredUp, Depop, Vestiaire Collective) — its audience behavior doesn't cleanly resemble any other major Indian fashion e-tailer's, for better or worse. Myntra, by contrast, sits in a competitive set (Flipkart, Amazon.in, Nykaa Fashion) any category strategist would recognize instantly.",
    landscape:
      "Zoom out one level and this whole rivalry is a subplot: Amazon.in and Flipkart's combined visits run roughly <span class=\"fig\">4.7×</span> Myntra and Ajio's combined total. Neither fashion-first platform is fighting for overall e-commerce share in India right now — they're fighting for the fashion vertical specifically, and that's a fight Myntra is currently winning by a wide margin.",
  },
};
