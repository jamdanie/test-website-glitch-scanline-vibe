const overlay = document.querySelector(".kanji-overlay");

const KANJI = [
  "機","鋼","戦","零","光","雷","影","白","青","赤","蒼","閃","界","空","星"
];

function rand(min, max){
  return Math.random() * (max - min) + min;
}

function makeColumn(){
  const col = document.createElement("div");
  col.className = "kanji-col";

  col.style.left = `${rand(3,97)}%`;
  col.style.animationDuration = `${rand(12,24)}s`;

  for(let i=0;i<14;i++){
    const k = document.createElement("span");
    k.className = "kanji";
    k.textContent = KANJI[Math.floor(Math.random()*KANJI.length)];
    col.appendChild(k);
  }

  overlay.appendChild(col);
}

function initKanji(){
  overlay.innerHTML = "";
  const count = window.innerWidth < 700 ? 6 : 12;
  for(let i=0;i<count;i++) makeColumn();
}

initKanji();
window.addEventListener("resize", initKanji);
