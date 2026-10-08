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
  document.querySelectorAll("#diy-tiles [data-diy-type]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.diyType === diyActive)));
  box.innerHTML = list.map(d => `
    <article class="card">
      <img src="${d.img}" alt="" width="900" height="600" loading="lazy" decoding="async" onerror="this.src='img/meals/08.jpg'" />
      <div>
        <p class="card-meta">${d.time} · Makes ${d.makes}</p>
        <h3><a href="#diy-${d.id}" data-diy="${d.id}">${d.title}</a></h3>
        <p>${d.blurb}</p>
        <span class="more" aria-hidden="true">See the make →</span>
      </div>
    </article>`).join("");
}

function showDiy(id) {
  const d = (window.EMMA_DIY || []).find(x => x.id === Number(id));
  if (!d) return;
  const materials = (d.materials || []).map(i => `<li>${i}</li>`).join("");
  const steps = (d.steps || []).map((s, i) => {
    const text = typeof s === "string" ? s : s.text;
    const img = (s && s.img) ? `<img class="step-img" src="${s.img}" alt="" width="1000" height="667" loading="lazy" decoding="async" />` : "";
    return `<li><span class="n" aria-hidden="true">${i + 1}</span><div><p>${text}</p>${img}</div></li>`;
  }).join("");
  const stepText = (d.steps || []).map(s => typeof s === "string" ? s : s.text);
  const related = (typeof relatedShop === "function")
    ? relatedShop([d.title, d.blurb, ...(d.materials || []), ...stepText].join(" "))
    : [];
  const shop = (typeof shopLinks === "function") ? shopLinks(related) : "";
  const page = document.getElementById("recipe");
  page.innerHTML = `
    <div class="recipe-bar">
      <button class="back" type="button" id="backBtn">← DIY</button>
      <span>Make</span>
    </div>
    <img class="hero" src="${d.img}" alt="${d.title.replace(/"/g, "&quot;")}" width="900" height="600" onerror="this.src='img/meals/08.jpg'" />
    <div class="recipe-wrap">
    <div class="recipe-body">
      <p class="eyebrow">DIY</p>
      <h2>${d.title}</h2>
      <p class="meta">${d.time} · Makes ${d.makes}</p>
      <p class="quote">“${d.hook}”</p>
      <p class="lede-r">${d.blurb}</p>
      <section class="ing-box"><h3>You need</h3>
      <ul class="ings">${materials}</ul></section>
      <h3>How to build</h3>
      <ol class="steps">${steps}</ol>
      ${d.tweak ? `<p class="tweak">${d.tweak}</p>` : ""}
    </div>
    <aside class="need">
      <p class="eyebrow">For this make</p>
      <p class="need-note">Shop bits that match this project.</p>
      <div class="need-list">${shop}</div>
    </aside>
    </div>`;
  document.getElementById("backBtn").onclick = () => {
    history.pushState("", document.title, location.pathname + location.search + "#diy");
    if (typeof closeOverlay === "function") closeOverlay(page);
    showSection("diy");
  };
  if (typeof openOverlay === "function") openOverlay(page, d.title);
  if (window.posthog && typeof posthog.capture === "function") {
    posthog.capture("diy_opened", { id: d.id, title: d.title, type: d.type });
  }
}

function openDiy(id) {
  if (location.hash !== "#diy-" + id) location.hash = "diy-" + id;
  else showDiy(id);
}

function onDiyHash() {
  const diy = location.hash.match(/^#diy-(\d+)/);
  if (diy) { showSection("diy"); showDiy(diy[1]); return; }
  if (location.hash === "#diy") showSection("diy");
  else if (location.hash === "#shop") showSection("shop");
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
