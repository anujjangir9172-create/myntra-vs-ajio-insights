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
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = () => window.matchMedia("(pointer: fine)").matches;

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
    renderMarquee();
    initTheme();
    initMobileMenu();
    initBoomerangHero();
    initScrollReveal();
    initStatCounters();
    initScrollProgress();
    initStickyHeader();
    initHeroSpotlight();
    initCustomCursor();
    initMagneticButtons();
    initParallax();
  }

  // ---------- Marquee ticker ----------
  function renderMarquee() {
    const track = $("#marqueeTrack");
    if (!track) return;
    const rank = SITE_DATA.rankings[0];
    const bounce = SITE_DATA.kpis.find((k) => k.id === "bounce");
    const items = [
      "Myntra vs Ajio",
      `${fmtCompact(SITE_DATA.visits.myntra)} vs ${fmtCompact(SITE_DATA.visits.ajio)} monthly visits`,
      `Global rank ${rank.myntra} vs ${rank.ajio}`,
      `Bounce rate ${bounce.myntra.display} vs ${bounce.ajio.display}`,
      SITE_DATA.meta.asOf,
    ];
    const html = items.map((t) => `<span>${t}</span><span class="dot">✦</span>`).join("");
    track.innerHTML = html + html; // duplicated once for a seamless loop
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
        <div class="bar-track"><div class="bar-fill" style="--w:${pct}%; --fill:${color}"></div></div>
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
          <div class="meter-fill" style="--w:${pct}%; --fill:${fill}">${pct.toFixed(2)}%</div>
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
                ? `<div class="bar-fill" style="--w:${Math.max((m / max) * 100, 2)}%; --fill:var(--series-myntra)"></div>`
                : `<span style="font-size:11.5px;color:var(--text-muted)">no data</span>`
            }</div>
            <div class="val">${m != null ? m.toFixed(2) + "%" : "—"}</div>
          </div>
          <div class="row">
            <div class="cat"></div>
            <div class="bar-track">${
              a != null
                ? `<div class="bar-fill" style="--w:${Math.max((a / max) * 100, 2)}%; --fill:var(--series-ajio)"></div>`
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
            <div class="seg male" style="--w:${g.male}%">${g.male.toFixed(1)}%</div>
            <div class="seg female" style="--w:${g.female}%">${g.female.toFixed(1)}%</div>
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
    const stored = safeGet("theme");
    if (stored) document.documentElement.setAttribute("data-theme", stored);

    function toggle() {
      const current = document.documentElement.getAttribute("data-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = current ? current === "dark" : prefersDark;
      const next = isDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      safeSet("theme", next);
    }

    document.querySelectorAll("#themeToggle, #mobileThemeToggle").forEach((btn) => {
      btn.addEventListener("click", toggle);
    });
  }

  // ---------- Mobile menu drawer ----------
  function initMobileMenu() {
    const toggle = $("#menuToggle");
    const overlay = $("#mobileOverlay");
    const drawer = $("#mobileDrawer");
    if (!toggle || !overlay || !drawer) return;

    function setOpen(open) {
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      overlay.classList.toggle("is-open", open);
      drawer.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", () => setOpen(!drawer.classList.contains("is-open")));
    overlay.addEventListener("click", () => setOpen(false));
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // ---------- Boomerang hero video background ----------
  function initBoomerangHero() {
    const container = $("#heroBg");
    if (!container) return;

    const video = document.createElement("video");
    video.src = "assets/hero-loop.mp4";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("aria-hidden", "true");

    // If the video can't load (network error, unsupported format, stalls
    // past a reasonable timeout), just hide it — the scrim/spotlight over
    // the plain hero background is a fully fine fallback on its own.
    const failSafe = setTimeout(() => {
      video.style.display = "none";
    }, 6000);
    video.addEventListener("error", () => {
      clearTimeout(failSafe);
      video.style.display = "none";
    });
    video.addEventListener("loadedmetadata", () => clearTimeout(failSafe), { once: true });

    // Reduced motion: show a single still frame, no capture/playback loop.
    if (reduceMotion()) {
      video.loop = false;
      video.addEventListener(
        "loadeddata",
        () => {
          video.currentTime = 0;
          video.pause();
        },
        { once: true }
      );
      container.appendChild(video);
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.style.display = "none";
    container.append(video, canvas);

    const frames = [];
    const MAX_WIDTH = 720;
    let capturing = true;
    let lastTime = -1;

    function captureFrame() {
      if (!capturing || video.readyState < 2) return;
      if (video.currentTime === lastTime) return;
      lastTime = video.currentTime;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return;
      const scale = Math.min(1, MAX_WIDTH / vw);
      const w = Math.round(vw * scale);
      const h = Math.round(vh * scale);
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, w, h);
      frames.push(c);
    }

    const hasVFC = typeof video.requestVideoFrameCallback === "function";
    let rafId = 0;

    function rafLoop() {
      captureFrame();
      if (capturing) rafId = requestAnimationFrame(rafLoop);
    }
    function vfcLoop() {
      captureFrame();
      if (capturing) video.requestVideoFrameCallback(vfcLoop);
    }

    function startPingPong() {
      if (!frames.length) return;
      canvas.width = frames[0].width;
      canvas.height = frames[0].height;
      const ctx = canvas.getContext("2d");
      video.style.display = "none";
      canvas.style.display = "block";

      let index = 0;
      let direction = 1;
      let last = performance.now();
      const interval = 1000 / 30;

      requestAnimationFrame(function render(now) {
        if (now - last >= interval) {
          last = now;
          ctx.drawImage(frames[index], 0, 0);
          index += direction;
          if (index >= frames.length - 1) {
            index = frames.length - 1;
            direction = -1;
          } else if (index <= 0) {
            index = 0;
            direction = 1;
          }
        }
        requestAnimationFrame(render);
      });
    }

    video.addEventListener("ended", () => {
      capturing = false;
      cancelAnimationFrame(rafId);
      if (frames.length) startPingPong();
    });

    video.addEventListener(
      "loadedmetadata",
      () => {
        video.play().catch(() => {});
        if (hasVFC) video.requestVideoFrameCallback(vfcLoop);
        else rafId = requestAnimationFrame(rafLoop);
      },
      { once: true }
    );
  }

  // ---------- Scroll-triggered reveal (sections fade in, bars grow) ----------
  function initScrollReveal() {
    const sections = document.querySelectorAll("section.block");
    if (!sections.length) return;

    if (!("IntersectionObserver" in window)) {
      sections.forEach((s) => s.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    sections.forEach((s) => observer.observe(s));
  }

  // ---------- Hero stat counters ----------
  function initStatCounters() {
    const nums = document.querySelectorAll(".stat-num");
    if (!nums.length) return;

    nums.forEach((el) => {
      const target = parseInt(el.textContent.replace(/[^\d]/g, ""), 10);
      if (Number.isNaN(target) || reduceMotion()) return;

      const suffix = el.textContent.replace(/[\d,]/g, "");
      const duration = 900;
      const start = performance.now();

      el.textContent = "0" + suffix;
      requestAnimationFrame(function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      });
    });
  }

  // ---------- Scroll progress bar ----------
  function initScrollProgress() {
    const bar = $("#scrollProgress");
    if (!bar) return;
    let ticking = false;

    function update() {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      bar.style.width = (scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0) + "%";
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  // ---------- Sticky header glass effect ----------
  function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    function update() {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // ---------- Hero cursor-reactive spotlight ----------
  function initHeroSpotlight() {
    if (reduceMotion() || !finePointer()) return;
    const hero = document.querySelector(".hero");
    if (!hero) return;

    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--spot-x", ((e.clientX - r.left) / r.width) * 100 + "%");
      hero.style.setProperty("--spot-y", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  }

  // ---------- Custom cursor (fine-pointer devices, motion allowed) ----------
  function initCustomCursor() {
    if (reduceMotion() || !finePointer()) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    document.body.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    document.querySelectorAll("a, button, summary").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
    });

    (function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  }

  // ---------- Magnetic buttons ----------
  function initMagneticButtons() {
    if (reduceMotion() || !finePointer()) return;

    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // ---------- Parallax on hero brand photos ----------
  function initParallax() {
    if (reduceMotion()) return;
    const photos = document.querySelectorAll(".brand-photo");
    if (!photos.length) return;
    let ticking = false;

    function update() {
      photos.forEach((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - window.innerHeight / 2;
        const offset = Math.max(Math.min(center * -0.05, 16), -16);
        el.style.transform = `translateY(${offset}px)`;
      });
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
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
