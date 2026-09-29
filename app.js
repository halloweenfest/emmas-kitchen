const IMGS = Object.fromEntries(Array.from({length:31}, (_,i) => [i+1, `img/meals/${String(i+1).padStart(2,"0")}.jpg?v=4`]));

const THEMES = {
  kitchen: { label: "Everyday", ribbon: "🌿   🍋   🌿", props: ["🍋", "🌿", "🧄", "🍞"] },
  halloween: { label: "Halloween", ribbon: "🎃   🕯   🎃", props: ["🎃", "🦇", "🕯", "🕸️"] },
  diwali: { label: "Diwali", ribbon: "🪔   ✨   🪔", props: ["🪔", "✨", "🕯", "🌕"] },
  christmas: { label: "Christmas", ribbon: "🎄   ⭐   🎄", props: ["🎄", "🎁", "❄️", "⭐"] },
  holi: { label: "Holi", ribbon: "🌸   🎨   🌸", props: ["🌸", "🎨", "💛", "🩷"] },
  eid: { label: "Eid", ribbon: "🌙   ✨   🌙", props: ["🌙", "✨", "🕌", "🕯"] },
  thanksgiving: { label: "Thanksgiving", ribbon: "🍂   🥧   🍂", props: ["🍂", "🦃", "🥧", "🍁"] },
  newyear: { label: "New Year", ribbon: "✨   🥂   ✨", props: ["✨", "🥂", "🎆", "⭐"] },
  easter: { label: "Easter", ribbon: "🌸   🐣   🌸", props: ["🐣", "🌸", "🥚", "🐰"] }
};

function placeProps(list) {
  ["p1", "p2", "p3", "p4"].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = list[i] || "";
  });
}

function applyTheme(id) {
  const theme = THEMES[id] || THEMES.halloween;
  document.documentElement.dataset.theme = id;
  localStorage.setItem("emma-theme", id);
  document.getElementById("festiveLabel").textContent = theme.label;
  document.getElementById("ribbon").textContent = theme.ribbon;
  placeProps(theme.props);
  document.querySelectorAll("[data-theme-id]").forEach(b => b.classList.toggle("on", b.dataset.themeId === id));
}

function pic(m) { return m.img || IMGS[m.night]; }

const SHOP = [
  { name: "Saucepan", q: "saucepan" },
  { name: "Skillet", q: "cast iron skillet" },
  { name: "Baking sheet", q: "baking sheet" },
  { name: "Mixing bowl", q: "mixing bowl" },
  { name: "Piping bag", q: "piping bag" },
  { name: "Candy eyes", q: "candy eyes" }
];

const STORES = {
  US: { host: "www.amazon.com", label: "Amazon.com", tag: "" },
  IN: { host: "www.amazon.in", label: "Amazon.in", tag: "" },
  GB: { host: "www.amazon.co.uk", label: "Amazon.co.uk", tag: "" },
  UK: { host: "www.amazon.co.uk", label: "Amazon.co.uk", tag: "" },
  CA: { host: "www.amazon.ca", label: "Amazon.ca", tag: "" },
  AU: { host: "www.amazon.com.au", label: "Amazon.com.au", tag: "" },
  DE: { host: "www.amazon.de", label: "Amazon.de", tag: "" },
  AT: { host: "www.amazon.de", label: "Amazon.de", tag: "" },
  FR: { host: "www.amazon.fr", label: "Amazon.fr", tag: "" },
  BE: { host: "www.amazon.fr", label: "Amazon.fr", tag: "" },
  IT: { host: "www.amazon.it", label: "Amazon.it", tag: "" },
  ES: { host: "www.amazon.es", label: "Amazon.es", tag: "" },
  NL: { host: "www.amazon.nl", label: "Amazon.nl", tag: "" },
  SE: { host: "www.amazon.se", label: "Amazon.se", tag: "" },
  PL: { host: "www.amazon.pl", label: "Amazon.pl", tag: "" },
  JP: { host: "www.amazon.co.jp", label: "Amazon.co.jp", tag: "" },
  AE: { host: "www.amazon.ae", label: "Amazon.ae", tag: "" },
  SA: { host: "www.amazon.sa", label: "Amazon.sa", tag: "" },
  EG: { host: "www.amazon.eg", label: "Amazon.eg", tag: "" },
  BR: { host: "www.amazon.com.br", label: "Amazon.com.br", tag: "" },
  MX: { host: "www.amazon.com.mx", label: "Amazon.com.mx", tag: "" },
  SG: { host: "www.amazon.sg", label: "Amazon.sg", tag: "" }
};

let visitor = { country: "IN", store: STORES.IN };

function storeFor(code) {
  const id = String(code || "IN").toUpperCase();
  return STORES[id] || STORES.US;
}

function shopUrl(q) {
  const s = visitor.store;
  let url = "https://" + s.host + "/s?k=" + encodeURIComponent(q);
  if (s.tag) url += "&tag=" + encodeURIComponent(s.tag);
  return url;
}

function shopLinks() {
  return SHOP.map(s => `<a href="${shopUrl(s.q)}" target="_blank" rel="noopener sponsored">${s.name}</a>`).join("");
}

function paintShop() {
  const grid = document.querySelector(".shop-grid");
  if (grid) grid.innerHTML = shopLinks();
  const fine = document.querySelector(".shop .fine");
  if (fine) fine.textContent = "Shop links open " + visitor.store.label + " for your country. We only use country, not your address.";
  document.querySelectorAll(".kit-row").forEach(el => { el.innerHTML = shopLinks(); });
}

async function detectCountry() {
  const cached = sessionStorage.getItem("emma-country");
  if (cached) {
    visitor = { country: cached, store: storeFor(cached) };
    paintShop();
    return;
  }
  let code = "";
  try {
    const t = await fetch("https://www.cloudflare.com/cdn-cgi/trace").then(r => r.text());
    const line = t.split("\n").find(l => l.startsWith("loc="));
    if (line) code = line.slice(4).trim();
  } catch (e) {}
  if (!code) {
    try {
      const j = await fetch("https://ipapi.co/json/").then(r => r.json());
      code = j && j.country_code;
    } catch (e) {}
  }
  code = (code || "IN").toUpperCase();
  if (code === "XX" || code === "T1") code = "IN";
  sessionStorage.setItem("emma-country", code);
  visitor = { country: code, store: storeFor(code) };
  paintShop();
}

let active = "all";

function render() {
  const list = EMMA_MEALS.filter(m => active === "all" || m.type === active);
  document.getElementById("count").textContent = list.length + " recipes from Emma's kitchen";
  document.getElementById("list").innerHTML = list.map(m => `
    <article class="row">
      <img class="thumb" src="${pic(m)}" alt="${m.title}" loading="lazy" />
      <div>
        <h3>${m.title}</h3>
        <p>${m.blurb}</p>
        <button class="more" data-night="${m.night}" type="button">Continue Reading</button>
      </div>
    </article>`).join("");
}

function openMeal(night) {
  if (location.hash !== "#night-" + night) location.hash = "night-" + night;
  else showRecipe(night);
}

function closeMeal() {
  if (location.hash.indexOf("night-") === 1) history.pushState("", document.title, location.pathname + location.search);
  hideRecipe();
}

function showRecipe(night) {
  const m = EMMA_MEALS.find(x => x.night === Number(night));
  if (!m) return hideRecipe();
  const prep = (m.prep || []).map(src => `<img src="${src}" alt="Prep for ${m.title}" />`).join("");
  const ingredients = (m.ingredients || []).map(i => `<li>${i}</li>`).join("");
  const steps = (m.steps || []).map((s, i) => `<li><span class="n">${i + 1}</span><p>${s}</p></li>`).join("");
  const page = document.getElementById("recipe");
  page.innerHTML = `
    <div class="recipe-bar">
      <button class="back" type="button" id="backBtn">← Kitchen</button>
      <span>Night ${m.night}</span>
    </div>
    <img class="hero" src="${pic(m)}" alt="${m.title}" />
    <div class="recipe-body">
      <p class="eyebrow">Night ${m.night} · ${m.date}</p>
      <h2>${m.title}</h2>
      <p class="meta">${m.time} · Serves ${m.serves}</p>
      <p class="quote">“${m.hook}”</p>
      <p class="lede-r">${m.blurb}</p>
      <h3>In the kitchen</h3>
      <div class="prep">${prep}</div>
      <h3>Ingredients</h3>
      <ul class="ings">${ingredients}</ul>
      <h3>Method</h3>
      <ol class="steps">${steps}</ol>
      <p class="tweak">${m.tweak || ""}</p>
      <div class="kit">
        <p class="eyebrow">Emma uses</p>
        <div class="kit-row">${shopLinks()}</div>
      </div>
      <aside class="haunt">
        <p>Food in the oven? <a href="https://isardeepg.github.io/" target="_blank" rel="noopener">Play Holly Haunt</a> while it bakes.</p>
      </aside>
    </div>`;
  page.classList.add("open");
  document.body.classList.add("reading");
  page.scrollTop = 0;
  document.getElementById("backBtn").onclick = closeMeal;
}

function hideRecipe() {
  const page = document.getElementById("recipe");
  page.classList.remove("open");
  page.innerHTML = "";
  document.body.classList.remove("reading");
}

function onHash() {
  const match = location.hash.match(/^#night-(\d+)/);
  if (match) showRecipe(match[1]);
  else hideRecipe();
}

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("festiveMenu");
  menu.innerHTML = Object.entries(THEMES).map(([id, t]) =>
    `<button type="button" data-theme-id="${id}">${t.label}</button>`
  ).join("");
  document.getElementById("festiveBtn").onclick = e => {
    e.stopPropagation();
    document.getElementById("festive").classList.toggle("open");
  };
  menu.onclick = e => {
    const id = e.target.dataset.themeId;
    if (!id) return;
    applyTheme(id);
    document.getElementById("festive").classList.remove("open");
  };
  document.addEventListener("click", () => document.getElementById("festive").classList.remove("open"));

  document.querySelector(".tiles").onclick = e => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    active = b.dataset.cat;
    render();
    document.getElementById("recipes").scrollIntoView({ behavior: "smooth" });
  };

  document.getElementById("list").onclick = e => {
    const b = e.target.closest("[data-night]");
    if (b) openMeal(Number(b.dataset.night));
  };

  window.addEventListener("hashchange", onHash);
  applyTheme(localStorage.getItem("emma-theme") || "halloween");
  render();
  paintShop();
  detectCountry();
  onHash();
});
