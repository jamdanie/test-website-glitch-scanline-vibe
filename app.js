// ====== Data-driven projects (edit this array only) ======
const PROJECTS = [
  {
    title: "Neon Grid Cards",
    tag: "UI",
    desc: "Card system with hover sweep + cursor-reactive preview gradient. Minimal but loud.",
    links: [
      { label: "Details", href: "#about" },
      { label: "Top", href: "#top" }
    ],
    glyph: "SYSTEM / CARDS"
  },
  {
    title: "Scroll Reveal + Motion",
    tag: "MOTION",
    desc: "Subtle entrance animation using IntersectionObserver. Respects reduced motion settings.",
    links: [
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#contact" }
    ],
    glyph: "REVEAL / GRID"
  },
  {
    title: "Dark Premium Hero",
    tag: "LAYOUT",
    desc: "Bold type, scanline overlay, and Gundam wallpaper backdrop for an eye-catching first hit.",
    links: [
      { label: "Swap Image", href: "#top" }
    ],
    glyph: "HERO / BACKDROP"
  },
  {
    title: "Ticker + Micro UI",
    tag: "DETAILS",
    desc: "Marquee ticker, chips, stats, and clean navigation—all framework-free.",
    links: [
      { label: "About", href: "#about" }
    ],
    glyph: "MICRO / UI"
  }
];

// ====== Render ======
const projectsEl = document.querySelector("#projects");

function renderProjects() {
  projectsEl.innerHTML = PROJECTS.map(p => `
    <article class="card" tabindex="0">
      <header class="card-top">
        <h3 class="card-title">${escapeHtml(p.title)}</h3>
        <span class="card-tag">${escapeHtml(p.tag)}</span>
      </header>

      <div class="card-body">
        <p class="card-desc">${escapeHtml(p.desc)}</p>

        <div class="card-actions">
          ${p.links.map(l => `<a href="${l.href}">${escapeHtml(l.label)}</a>`).join("")}
        </div>
      </div>

      <div class="preview" aria-hidden="true">
        <div class="glyph"><span class="dot"></span>${escapeHtml(p.glyph || "TEST / CARD")}</div>
      </div>
    </article>
  `).join("");
}

function escapeHtml(str="") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

renderProjects();

// ====== Cursor glow (whole page) ======
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (e) => {
  // store in CSS variables as percentages
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  glow.style.setProperty("--x", `${x}%`);
  glow.style.setProperty("--y", `${y}%`);
});

// ====== Card preview reacts to hover position ======
projectsEl.addEventListener("pointermove", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const preview = card.querySelector(".preview");
  if (!preview) return;

  const r = preview.getBoundingClientRect();
  const px = ((e.clientX - r.left) / r.width) * 100;
  const py = ((e.clientY - r.top) / r.height) * 100;
  preview.style.setProperty("--px", `${Math.max(0, Math.min(100, px))}%`);
  preview.style.setProperty("--py", `${Math.max(0, Math.min(100, py))}%`);
});

// ====== Reveal on scroll ======
const cards = () => Array.from(document.querySelectorAll(".card"));
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  }
}, { threshold: 0.15 });

cards().forEach(c => io.observe(c));

// ====== Count-up stats ======
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  const stats = Array.from(document.querySelectorAll("[data-count]"));
  const startCount = (el) => {
    const target = Number(el.dataset.count || 0);
    const dur = 650;
    const t0 = performance.now();
    const from = 0;

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const val = Math.round(from + (target - from) * eased);
      el.textContent = String(val);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  stats.forEach(startCount);
} else {
  document.querySelectorAll("[data-count]").forEach(el => {
    el.textContent = String(el.dataset.count || "0");
  });
}

// ====== Footer year ======
document.querySelector("#year").textContent = String(new Date().getFullYear());
