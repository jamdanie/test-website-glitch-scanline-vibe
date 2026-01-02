// Edit this array only
const PROJECTS = [
  {
    title: "Simple Hero + Image",
    tag: "LAYOUT",
    desc: "A clean hero with a Gundam backdrop and a readable gradient overlay.",
    links: [
      { label: "About", href: "#about" },
      { label: "Top", href: "#top" }
    ]
  },
  {
    title: "Card Grid System",
    tag: "UI",
    desc: "Basic 2-column grid with hover lift. Minimal, modern, and easy to expand.",
    links: [
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#contact" }
    ]
  },
  {
    title: "No Frameworks",
    tag: "PURE",
    desc: "Only HTML/CSS/JS. Built as a UW student test layout for GitHub Pages.",
    links: [
      { label: "Email", href: "mailto:jadanie@uw.edu" }
    ]
  },
  {
    title: "Color Pops",
    tag: "STYLE",
    desc: "Small gradients and accents to keep it eye-catching without being busy.",
    links: [
      { label: "Top", href: "#top" }
    ]
  }
];

const projectsEl = document.querySelector("#projects");

projectsEl.innerHTML = PROJECTS.map(p => `
  <article class="card">
    <div class="card-top">
      <h3>${escapeHtml(p.title)}</h3>
      <span class="tag">${escapeHtml(p.tag)}</span>
    </div>
    <p>${escapeHtml(p.desc)}</p>
    <div class="links">
      ${(p.links || []).map(l => `<a href="${l.href}">${escapeHtml(l.label)}</a>`).join("")}
    </div>
  </article>
`).join("");

document.querySelector("#year").textContent = String(new Date().getFullYear());

function escapeHtml(str="") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
