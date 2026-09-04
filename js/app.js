/**
 * Renders SITE_DATA (js/data.js) into the DOM. No build step, no
 * dependencies — plain HTML/CSS components per the mark specs:
 * 24px-max bar thickness, 4px rounded data-ends, 2px surface gaps,
 * legend for every 2+ series chart, direct labels at the bar tip.
 */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const brandIcon = (k) =>
    k === "myntra"
      ? `<img class="brand-icon" src="assets/myntra-logo.png" alt="" />`
      : `<img class="brand-icon brand-icon-ajio" src="assets/ajio-icon.avif" alt="" />`;
  const fmtCompact = (n) =>
    n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + "M" : n >= 1_000 ? (n / 1_000).toFixed(1) + "K" : String(n);

  function init() {
    renderMeta();
    renderKpis();
    renderVisits();
    renderSources();
    renderGeo();
    renderDemo();
    renderRankings();
    renderCompetitors();
    renderFullTable();
    initTheme();
  }

  function renderMeta() {
    $("#pillTimeframe").textContent = SITE_DATA.meta.timeframe;
    $("#pillAsOf").textContent = SITE_DATA.meta.asOf;
  }

  // ---------- KPI tiles ----------
  function renderKpis() {
    const grid = $("#kpiGrid");
    grid.innerHTML = SITE_DATA.kpis
      .map((k) => {
        const trendMyntra = k.myntra.trend
          ? `<span class="trend ${k.myntra.trendDir || "flat"}">${k.myntra.trend}</span>`
          : "";
        const trendAjio = k.ajio.trend
          ? `<span class="trend ${k.ajio.trendDir || "flat"}">${k.ajio.trend}</span>`
          : "";
        return `
        <div class="kpi-tile">
          <div class="kpi-label">${k.label}</div>
          <div class="kpi-row">
            <span class="who">${brandIcon("myntra")}Myntra</span>
            <span class="val">${k.myntra.display}${trendMyntra}</span>
          </div>
          <div class="kpi-row">
            <span class="who">${brandIcon("ajio")}Ajio</span>
            <span class="val">${k.ajio.display}${trendAjio}</span>
          </div>
        </div>`;
      })
      .join("");
  }

  // ---------- Visits bar chart ----------
  function renderVisits() {
    const { myntra, ajio } = SITE_DATA.visits;
    const max = Math.max(myntra, ajio);

    $("#visitsLegend").innerHTML = legendHtml([
      ["Myntra", "var(--series-myntra)"],
      ["Ajio", "var(--series-ajio)"],
    ]);

    $("#visitsChart").innerHTML = [
      barRow("Myntra", myntra, max, "var(--series-myntra)", fmtCompact(myntra)),
      barRow("Ajio", ajio, max, "var(--series-ajio)", fmtCompact(ajio)),
    ].join("");
  }

  function barRow(label, value, max, color, displayVal) {
    const pct = Math.max((value / max) * 100, 2);
    return `
      <div class="row">
        <div class="cat">${label}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%; --fill:${color}"></div></div>
        <div class="val">${displayVal}</div>
      </div>`;
  }

  // ---------- Traffic sources (meter: known vs other) ----------
  function renderSources() {
    const { myntra, ajio } = SITE_DATA.trafficSources;
    $("#sourcesChart").innerHTML = [
      sourceMeter("Myntra", myntra.direct, "var(--series-myntra)", "var(--series-myntra-track)"),
      sourceMeter("Ajio", ajio.direct, "var(--series-ajio)", "var(--series-ajio-track)"),
    ].join("");
    $("#sourcesNote").innerHTML =
      `Remaining channels (in descending order) — Myntra: ${myntra.otherKnownOrder.join(", ")}. ` +
      `Ajio: ${ajio.otherKnownOrder.join(", ")}. Exact per-channel percentages require SimilarWeb Pro access ` +
      `and are left out here rather than estimated.`;
  }

  function sourceMeter(label, pct, fill, track) {
    return `
      <div>
        <div class="col-title"><span class="dot" style="background:${fill}"></span>${label} · Direct</div>
        <div class="meter" style="--track:${track}">
          <div class="meter-fill" style="width:${pct}%; --fill:${fill}">${pct.toFixed(2)}%</div>
        </div>
      </div>`;
  }

  // ---------- Geography ----------
  function renderGeo() {
    $("#geoLegend").innerHTML = legendHtml([
      ["Myntra", "var(--series-myntra)"],
      ["Ajio", "var(--series-ajio)"],
    ]);

    const rows = SITE_DATA.geo.countries;
    const max = Math.max(...rows.flatMap((r) => [r.myntra || 0, r.ajio || 0]));

    $("#geoChart").innerHTML = rows
      .map((r) => {
        const m = r.myntra;
        const a = r.ajio;
        return `
        <div class="bar-group">
          <div class="row">
            <div class="cat">${r.country}</div>
            <div class="bar-track">${
              m != null
                ? `<div class="bar-fill" style="width:${Math.max((m / max) * 100, 2)}%; --fill:var(--series-myntra)"></div>`
                : `<span style="font-size:11.5px;color:var(--text-muted)">no data</span>`
            }</div>
            <div class="val">${m != null ? m.toFixed(2) + "%" : "—"}</div>
          </div>
          <div class="row">
            <div class="cat"></div>
            <div class="bar-track">${
              a != null
                ? `<div class="bar-fill" style="width:${Math.max((a / max) * 100, 2)}%; --fill:var(--series-ajio)"></div>`
                : `<span style="font-size:11.5px;color:var(--text-muted)">no data</span>`
            }</div>
            <div class="val">${a != null ? a.toFixed(2) + "%" : "—"}</div>
          </div>
        </div>`;
      })
      .join("");

    $("#geoNote").textContent =
      `India accounts for ${SITE_DATA.geo.indiaShare.myntra}% of Myntra's traffic and ` +
      `${SITE_DATA.geo.indiaShare.ajio}% of Ajio's — both platforms are overwhelmingly domestic. It's excluded ` +
      `above so the smaller international markets remain visible.`;
  }

  // ---------- Demographics ----------
  function renderDemo() {
    const grid = $("#demoGrid");
    const d = SITE_DATA.demographics;
    grid.innerHTML = ["myntra", "ajio"]
      .map((k) => {
        const brand = SITE_DATA.brands[k];
        const g = d[k];
        return `
        <div class="card">
          <div class="col-title">${brandIcon(k)}${brand.label}</div>
          <div class="legend">${legendHtml([
            ["Male", "var(--series-male)"],
            ["Female", "var(--series-female)"],
          ])}</div>
          <div class="stack-bar">
            <div class="seg male" style="width:${g.male}%">${g.male.toFixed(1)}%</div>
            <div class="seg female" style="width:${g.female}%">${g.female.toFixed(1)}%</div>
          </div>
          <p class="geo-note">Primary age group: ${g.topAge}</p>
        </div>`;
      })
      .join("");
  }

  // ---------- Rankings table ----------
  function renderRankings() {
    const rows = SITE_DATA.rankings;
    $("#rankTable").innerHTML = `
      <thead><tr><th>Metric</th><th>Myntra</th><th>Ajio</th></tr></thead>
      <tbody>
        ${rows.map((r) => `<tr><td>${r.label}</td><td class="num">${r.myntra}</td><td class="num">${r.ajio}</td></tr>`).join("")}
      </tbody>`;
  }

  // ---------- Competitors ----------
  function renderCompetitors() {
    const grid = $("#competitorGrid");
    const c = SITE_DATA.competitors;
    grid.innerHTML = ["myntra", "ajio"]
      .map((k) => {
        const brand = SITE_DATA.brands[k];
        const list = c[k];
        return `
        <div class="card">
          <div class="col-title">${brandIcon(k)}${brand.label}'s closest sites</div>
          ${list
            .map(
              (item) => `
            <div class="competitor-row">
              <span class="name">${item.domain}</span>
              <span class="aff">${item.affinity}%</span>
            </div>`
            )
            .join("")}
        </div>`;
      })
      .join("");
  }

  // ---------- Full accessible data table ----------
  function renderFullTable() {
    const rows = [];
    SITE_DATA.kpis.forEach((k) => rows.push([k.label, k.myntra.display, k.ajio.display]));
    rows.push(["Direct traffic share", SITE_DATA.trafficSources.myntra.direct + "%", SITE_DATA.trafficSources.ajio.direct + "%"]);
    SITE_DATA.geo.countries.forEach((r) =>
      rows.push([`Traffic share — ${r.country}`, r.myntra != null ? r.myntra + "%" : "—", r.ajio != null ? r.ajio + "%" : "—"])
    );
    rows.push(["Gender — male", SITE_DATA.demographics.myntra.male + "%", SITE_DATA.demographics.ajio.male + "%"]);
    rows.push(["Gender — female", SITE_DATA.demographics.myntra.female + "%", SITE_DATA.demographics.ajio.female + "%"]);
    SITE_DATA.rankings.forEach((r) => rows.push([r.label, r.myntra, r.ajio]));

    $("#fullTable").innerHTML = `
      <thead><tr><th>Metric</th><th>Myntra</th><th>Ajio</th></tr></thead>
      <tbody>${rows.map((r) => `<tr><td>${r[0]}</td><td class="num">${r[1]}</td><td class="num">${r[2]}</td></tr>`).join("")}</tbody>`;
  }

  function legendHtml(pairs) {
    return pairs
      .map(([label, color]) => `<span class="key"><span class="swatch" style="background:${color}"></span>${label}</span>`)
      .join("");
  }

  // ---------- Theme toggle ----------
  function initTheme() {
    const btn = $("#themeToggle");
    const stored = safeGet("theme");
    if (stored) document.documentElement.setAttribute("data-theme", stored);

    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = current ? current === "dark" : prefersDark;
      const next = isDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      safeSet("theme", next);
    });
  }

  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
  function safeSet(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {
      /* ignore */
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
