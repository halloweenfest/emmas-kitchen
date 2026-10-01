function showSection(name) {
  document.querySelectorAll("[data-panel]").forEach(el => {
    const on = el.dataset.panel === name;
    el.classList.toggle("on", on);
    if (el.id === "start") el.classList.toggle("off", name !== "recipes");
  });
  document.querySelectorAll("nav a[data-tab]").forEach(a => a.classList.toggle("on", a.dataset.tab === name));
}

let diyActive = "all";
function renderDiy() {
  const list = (window.EMMA_DIY || []).filter(d => diyActive === "all" || d.type === diyActive);
  const count = document.getElementById("diy-count");
  const box = document.getElementById("diy-list");
  if (!box) return;
  if (count) count.textContent = list.length + " projects from Emma's kitchen table";
  box.innerHTML = list.map(d => `
    <article class="card">
      <img src="${d.img}" alt="${d.title}" loading="lazy" onerror="this.src='img/meals/08.jpg'" />
      <div>
        <h3>${d.title}</h3>
        <p>${d.blurb}</p>
        <button class="more" data-diy="${d.id}" type="button">Continue Reading</button>
      </div>
    </article>`).join("");
}

function showDiy(id) {
  const d = (window.EMMA_DIY || []).find(x => x.id === Number(id));
  if (!d) return;
  const materials = (d.materials || []).map(i => `<li>${i}</li>`).join("");
  const steps = (d.steps || []).map((s, i) => `<li><span class="n">${i + 1}</span><p>${s}</p></li>`).join("");
  const related = (typeof relatedShop === "function")
    ? relatedShop([d.title, d.blurb, ...(d.materials || []), ...(d.steps || [])].join(" "))
    : [];
  const shop = (typeof shopLinks === "function") ? shopLinks(related) : "";
  const page = document.getElementById("recipe");
  page.innerHTML = `
    <div class="recipe-bar">
      <button class="back" type="button" id="backBtn">← DIY</button>
      <span>Make</span>
    </div>
    <img class="hero" src="${d.img}" alt="${d.title}" onerror="this.src='img/meals/08.jpg'" />
    <div class="recipe-wrap">
    <div class="recipe-body">
      <p class="eyebrow">DIY</p>
      <h2>${d.title}</h2>
      <p class="meta">${d.time} · Makes ${d.makes}</p>
      <p class="quote">“${d.hook}”</p>
      <p class="lede-r">${d.blurb}</p>
      <h3>You need</h3>
      <ul class="ings">${materials}</ul>
      <h3>How to build</h3>
      <ol class="steps">${steps}</ol>
      <p class="tweak">${d.tweak || ""}</p>
    </div>
    <aside class="need">
      <p class="eyebrow">For this make</p>
      <p class="need-note">Shop bits that match this project.</p>
      <div class="need-list">${shop}</div>
    </aside>
    </div>`;
  page.classList.add("open");
  document.body.classList.add("reading");
  page.scrollTop = 0;
  document.getElementById("backBtn").onclick = () => {
    history.pushState("", document.title, location.pathname + location.search + "#diy");
    page.classList.remove("open");
    page.innerHTML = "";
    document.body.classList.remove("reading");
    showSection("diy");
  };
}

function openDiy(id) {
  if (location.hash !== "#diy-" + id) location.hash = "diy-" + id;
  else showDiy(id);
}

function onDiyHash() {
  const diy = location.hash.match(/^#diy-(\d+)/);
  if (diy) { showSection("diy"); showDiy(diy[1]); return; }
  if (location.hash === "#diy") showSection("diy");
  else if (location.hash === "#recipes" || location.hash === "" || location.hash === "#") showSection("recipes");
}

document.addEventListener("DOMContentLoaded", () => {
  renderDiy();
  const diyTiles = document.getElementById("diy-tiles");
  if (diyTiles) diyTiles.onclick = e => {
    const b = e.target.closest("[data-diy-type]");
    if (!b) return;
    diyActive = b.dataset.diyType;
    renderDiy();
    document.getElementById("diy").scrollIntoView({ behavior: "smooth" });
  };
  const diyList = document.getElementById("diy-list");
  if (diyList) diyList.onclick = e => {
    const b = e.target.closest("[data-diy]");
    if (b) openDiy(Number(b.dataset.diy));
  };
  document.querySelectorAll("nav a[data-tab]").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const tab = a.dataset.tab;
      if (location.hash !== "#" + tab) location.hash = tab;
      else showSection(tab);
    });
  });
  window.addEventListener("hashchange", onDiyHash);
  onDiyHash();
});
