// Simple page switching
const links = document.querySelectorAll(".nav-link");
const pageHome = document.getElementById("page-home");
const pageAbout = document.getElementById("page-about");

links.forEach(btn => {
  btn.addEventListener("click", () => {
    links.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const page = btn.dataset.page;
    if (page === "about") {
      pageHome.classList.add("is-hidden");
      pageAbout.classList.remove("is-hidden");
    } else {
      pageAbout.classList.add("is-hidden");
      pageHome.classList.remove("is-hidden");
    }
  });
});

// Kanji overlay generation
const overlay = document.querySelector(".kanji-overlay");

// Feel free to swap these for the exact vibe you want
const KANJI = [
  "機","神","鋼","刃","雷","影","白","青","赤","零","光","電",
  "戦","夢","蒼","閃","界","空","星","心","道","形","静","速"
];

function rand(min, max) { return Math.random() * (max - min) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function makeColumn(index) {
  const col = document.createElement("div");
  col.className = "kanji-col";

  // spread columns across the screen
  const x = rand(4, 96);
  col.style.left = `${x}vw`;

  // timing variety
  const duration = rand(10, 22); // seconds
  col.style.animationDuration = `${duration}s`;

  // stagger start so they don't all line up
  const delay = rand(-20, 0);
  col.style.animationDelay = `${delay}s`;

  // build the vertical stack
  const count = Math.floor(rand(10, 18));
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "kanji";
    s.textContent = pick(KANJI);

    // occasional accent pops
    const r = Math.random();
    if (r < 0.08) s.classList.add("hot");
    else if (r < 0.16) s.classList.add("cold");

    col.appendChild(s);
  }

  // slight per-column opacity variance
  col.style.opacity = `${rand(0.10, 0.22)}`;

  overlay.appendChild(col);
}

function initKanji() {
  // mobile: fewer columns
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const columns = isMobile ? 7 : 12;

  overlay.innerHTML = "";
  for (let i = 0; i < columns; i++) makeColumn(i);
}

initKanji();
window.addEventListener("resize", () => {
  // debounce-ish
  clearTimeout(window.__kanjiT);
  window.__kanjiT = setTimeout(initKanji, 180);
});
