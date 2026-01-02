// Home/About toggle
const navButtons = document.querySelectorAll(".nav-link");
const home = document.getElementById("page-home");
const about = document.getElementById("page-about");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    if (btn.dataset.page === "about") {
      home.classList.add("is-hidden");
      about.classList.remove("is-hidden");
    } else {
      about.classList.add("is-hidden");
      home.classList.remove("is-hidden");
    }
  });
});

// Kanji overlay generation (inside hero)
const overlay = document.querySelector(".kanji-overlay");

const KANJI = ["機","鋼","戦","零","光","雷","影","白","青","赤","蒼","閃","界","空","星","心","道","形","静","速"];

function rand(min, max){ return Math.random() * (max - min) + min; }
function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

function makeColumn(){
  const col = document.createElement("div");
  col.className = "kanji-col";

  col.style.left = `${rand(3, 97)}%`;
  col.style.animationDuration = `${rand(12, 24)}s`;
  col.style.animationDelay = `${rand(-22, 0)}s`;
  col.style.opacity = `${rand(0.12, 0.18)}`;

  const count = Math.floor(rand(10, 18));
  for(let i=0;i<count;i++){
    const s = document.createElement("span");
    s.className = "kanji";
    s.textContent = pick(KANJI);

    const r = Math.random();
    if (r < 0.08) s.classList.add("red");
    else if (r < 0.16) s.classList.add("teal");
    else if (r < 0.22) s.classList.add("yellow");

    col.appendChild(s);
  }

  overlay.appendChild(col);
}

function initKanji(){
  overlay.innerHTML = "";
  const mobile = window.matchMedia("(max-width: 700px)").matches;
  const columns = mobile ? 7 : 12;
  for(let i=0;i<columns;i++) makeColumn();
}

initKanji();
window.addEventListener("resize", () => {
  clearTimeout(window.__k);
  window.__k = setTimeout(initKanji, 180);
});
