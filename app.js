const IMGS = Object.fromEntries(Array.from({length:31}, (_,i) => [i+1, `img/meals/${String(i+1).padStart(2,"0")}.jpg?v=4`]));
const THEMES = {
  kitchen: { label: "Everyday", ribbon: "\uD83C\uDF3F   \uD83C\uDF4B   \uD83C\uDF3F", props: ["\uD83C\uDF4B", "\uD83C\uDF3F", "\uD83E\uDDC4", "\uD83C\uDF5E"] },
  halloween: { label: "Halloween", ribbon: "\uD83C\uDF83   \uD83D\uDD6F   \uD83C\uDF83", props: ["\uD83C\uDF83", "\uD83E\uDD87", "\uD83D\uDD6F", "\uD83D\uDD78"] },
  diwali: { label: "Diwali", ribbon: "\uD83E\uDE94   \u2728   \uD83E\uDE94", props: ["\uD83E\uDE94", "\u2728", "\uD83D\uDD6F", "\uD83C\uDF15"] },
  christmas: { label: "Christmas", ribbon: "\uD83C\uDF84   \u2B50   \uD83C\uDF84", props: ["\uD83C\uDF84", "\uD83C\uDF81", "\u2744\uFE0F", "\u2B50"] },
  holi: { label: "Holi", ribbon: "\uD83C\uDF38   \uD83C\uDFA8   \uD83C\uDF38", props: ["\uD83C\uDF38", "\uD83C\uDFA8", "\uD83D\uDC9B", "\uD83E\uDEF6"] },
  eid: { label: "Eid", ribbon: "\uD83C\uDF19   \u2728   \uD83C\uDF19", props: ["\uD83C\uDF19", "\u2728", "\uD83D\uDD4C", "\uD83D\uDD6F"] },
  thanksgiving: { label: "Thanksgiving", ribbon: "\uD83C\uDF42   \uD83E\uDD67   \uD83C\uDF42", props: ["\uD83C\uDF42", "\uD83E\uDD83", "\uD83E\uDD67", "\uD83C\uDF41"] },
  newyear: { label: "New Year", ribbon: "\u2728   \uD83E\uDD42   \u2728", props: ["\u2728", "\uD83E\uDD42", "\uD83C\uDF86", "\u2B50"] },
  easter: { label: "Easter", ribbon: "\uD83C\uDF38   \uD83D\uDC23   \uD83C\uDF38", props: ["\uD83D\uDC23", "\uD83C\uDF38", "\uD83E\uDD5A", "\uD83D\uDC30"] }
};
function placeProps(list) {
  ["p1","p2","p3","p4"].forEach((id,i) => { const el = document.getElementById(id); if (el) el.textContent = list[i] || ""; });
}
function applyTheme(id) {
  const theme = THEMES[id] || THEMES.halloween;
  document.documentElement.dataset.theme = id;
  localStorage.setItem("emma-theme", id);
  document.getElementById("festiveLabel").textContent = theme.label;
  document.getElementById("ribbon").textContent = theme.ribbon;
  const season = document.getElementById("season");
  if (season) {
    season.hidden = id === "kitchen";
    season.textContent = id === "halloween" ? "Halloween" : theme.label;
    season.classList.toggle("on-halloween", id === "halloween");
  }
  placeProps(theme.props);
  document.querySelectorAll("[data-theme-id]").forEach(b => b.classList.toggle("on", b.dataset.themeId === id));
}
function inAppBrowser() { return /Instagram|FBAN|FBAV|Line\//i.test(navigator.userAgent || ""); }
function fixInAppLinks() {
  if (!inAppBrowser()) return;
  document.documentElement.classList.add("in-ig");
  document.querySelectorAll("a[target='_blank']").forEach(a => a.removeAttribute("target"));
}
function pic(m) { return m.img || IMGS[m.night]; }
const SHOP = [
  { name: "Candy eyes", file: "01.jpg", q: "candy eyes", in: "https://www.amazon.in/dp/B0CJ98W882/?tag=emmathegoodwi-21" },
  { name: "Edible markers", file: "02.jpg", q: "edible ink markers", in: "https://www.amazon.in/dp/B07M9VYZ7C/?tag=emmathegoodwi-21" },
  { name: "Black gel colour", file: "03.jpg", q: "black gel food color", in: "https://www.amazon.in/dp/B08R7ZCT4X/?tag=emmathegoodwi-21" },
  { name: "Orange gel colour", file: "04.jpg", q: "orange gel food color", in: "https://www.amazon.in/dp/B08R7ZMV2T/?tag=emmathegoodwi-21" },
  { name: "Green gel colour", file: "05.jpg", q: "green gel food color", in: "https://www.amazon.in/dp/B07MDGYRB1/?tag=emmathegoodwi-21" },
  { name: "Blue food colour", file: "06.jpg", q: "blue liquid food color", in: "https://www.amazon.in/dp/B06XPFWW66/?tag=emmathegoodwi-21" },
  { name: "Gummy worms", file: "07.jpg", q: "gummy worms", in: "https://www.amazon.in/dp/B07Z5MVJBC/?tag=emmathegoodwi-21" },
  { name: "Mini marshmallows", file: "08.jpg", q: "mini marshmallows", in: "https://www.amazon.in/dp/B09412FYDP/?tag=emmathegoodwi-21" },
  { name: "Large marshmallows", file: "09.jpg", q: "large marshmallows", in: "https://www.amazon.in/dp/B08CRT3SSQ/?tag=emmathegoodwi-21" },
  { name: "Chocolate kisses", file: "10.jpg", q: "chocolate kisses", in: "https://www.amazon.in/dp/B07RX7CHP4/?tag=emmathegoodwi-21" },
  { name: "Pretzel rods", file: "11.jpg", q: "pretzel rods", in: "https://www.amazon.in/dp/B0CPM56W7N/?tag=emmathegoodwi-21" },
  { name: "Lolly sticks", file: "12.jpg", q: "lolly sticks", in: "https://www.amazon.in/dp/B0BYVHJNQ5/?tag=emmathegoodwi-21" },
  { name: "Food-safe gloves", file: "13.jpg", q: "food safe gloves", in: "https://www.amazon.in/dp/B0895PLYW2/?tag=emmathegoodwi-21" },
  { name: "Cupcake liners", file: "14.jpg", q: "cupcake liners", in: "https://www.amazon.in/dp/B07NTJYQTK/?tag=emmathegoodwi-21" },
  { name: "Brownie pan", file: "15.jpg", q: "brownie pan", in: "https://www.amazon.in/dp/B077L1W8RG/?tag=emmathegoodwi-21" },
  { name: "Muffin tin", file: "16.jpg", q: "muffin tin", in: "https://www.amazon.in/dp/B096S4F6K4/?tag=emmathegoodwi-21" },
  { name: "Brain mould", file: "17.jpg", q: "brain mold", in: "https://www.amazon.in/dp/B08QD1QV1B/?tag=emmathegoodwi-21" },
  { name: "Cookie cutters", file: "18.jpg", q: "halloween cookie cutters", in: "https://www.amazon.in/dp/B0872BL33D/?tag=emmathegoodwi-21" },
  { name: "Wooden board", file: "19.jpg", q: "wooden serving board", in: "https://www.amazon.in/dp/B01M0VD650/?tag=emmathegoodwi-21" },
  { name: "Dessert cups", file: "20.jpg", q: "clear dessert cups", in: "https://www.amazon.in/dp/B09S3QX63B/?tag=emmathegoodwi-21" },
  { name: "Punch ladle", file: "21.jpg", q: "punch ladle", in: "https://www.amazon.in/dp/B083ZFV1RV/?tag=emmathegoodwi-21" },
  { name: "Toothpicks", file: "22.jpg", q: "toothpicks", in: "https://www.amazon.in/dp/B01N3KK7Z0/?tag=emmathegoodwi-21" },
  { name: "Piping bags", file: "23.jpg", q: "piping bags tips", in: "https://www.amazon.in/dp/B07G5FYNMF/?tag=emmathegoodwi-21" },
  { name: "Candy thermometer", file: "24.jpg", q: "candy thermometer", in: "https://www.amazon.in/dp/B07Z7NJ7HN/?tag=emmathegoodwi-21" }
];
const STORES = {
  US:{host:"www.amazon.com",label:"Amazon.com",tag:""},
  IN:{host:"www.amazon.in",label:"Amazon.in",tag:"emmathegoodwi-21"},
  GB:{host:"www.amazon.co.uk",label:"Amazon.co.uk",tag:""},
  UK:{host:"www.amazon.co.uk",label:"Amazon.co.uk",tag:""},
  CA:{host:"www.amazon.ca",label:"Amazon.ca",tag:""},
  AU:{host:"www.amazon.com.au",label:"Amazon.com.au",tag:""}
};
let visitor = { country: "IN", store: STORES.IN };
function storeFor(code) { return STORES[String(code||"IN").toUpperCase()] || STORES.US; }
function shopUrl(item) {
  const s = visitor.store;
  if (s.host === "www.amazon.in" && item.in) return item.in;
  let url = "https://" + s.host + "/s?k=" + encodeURIComponent(item.q);
  if (s.tag) url += "&tag=" + encodeURIComponent(s.tag);
  return url;
}
function shopLinks(items) {
  const list = items && items.length ? items : SHOP;
  const extra = inAppBrowser() ? "" : " target=\"_blank\" rel=\"noopener sponsored\"";
  return list.map(s => `<a href="${shopUrl(s)}"${extra}>${s.name}</a>`).join("");
}
function relatedShop(text) {
  const blob = String(text || "").toLowerCase();
  const keys = {
    "Candy eyes": ["eye", "cupcake", "mummy", "spider"],
    "Edible markers": ["marker", "label", "potion", "write", "ink"],
    "Black gel colour": ["black", "paint", "gel", "colour", "color"],
    "Orange gel colour": ["orange", "pumpkin", "paint"],
    "Green gel colour": ["green", "stem", "paint"],
    "Blue food colour": ["blue", "paint"],
    "Gummy worms": ["gummy", "worm"],
    "Mini marshmallows": ["marshmallow", "ghost", "cocoa"],
    "Large marshmallows": ["marshmallow", "ghost"],
    "Chocolate kisses": ["chocolate", "kiss", "cupcake"],
    "Pretzel rods": ["pretzel"],
    "Lolly sticks": ["stick", "lolly", "broom"],
    "Food-safe gloves": ["paint", "glove"],
    "Cupcake liners": ["cupcake", "liner"],
    "Brownie pan": ["brownie", "pan", "bake"],
    "Muffin tin": ["muffin", "cupcake", "tin"],
    "Brain mould": ["mould", "mold", "brain"],
    "Cookie cutters": ["cutter", "bat", "pumpkin", "cut"],
    "Wooden board": ["board", "serve", "wreath"],
    "Dessert cups": ["cup", "eyeball", "dessert"],
    "Punch ladle": ["punch", "ladle"],
    "Toothpicks": ["toothpick", "broom"],
    "Piping bags": ["frosting", "piping", "cupcake"],
    "Candy thermometer": ["thermometer", "cocoa", "candy"]
  };
  const scored = SHOP.map(s => ({
    s,
    score: (keys[s.name] || [s.name.toLowerCase()]).reduce((n, k) => n + (blob.includes(k) ? 1 : 0), 0)
  })).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
  const picks = scored.map(x => x.s);
  return (picks.length ? picks : SHOP.slice(0, 4)).slice(0, 6);
}
function shopCards() {
  const extra = inAppBrowser() ? "" : " target=\"_blank\" rel=\"noopener sponsored\"";
  return SHOP.map(s => `<a class="shop-card" href="${shopUrl(s)}"${extra}><img src="img/shop/${s.file}" alt="${s.name}"><span>${s.name}</span></a>`).join("");
}
function paintShop() {
  const grid = document.querySelector(".shop-grid");
  if (grid) grid.innerHTML = shopCards();
  const fine = document.querySelector(".shop .fine");
  if (fine) fine.textContent = "Shop links open " + visitor.store.label + " for your country.";
}
async function detectCountry() {
  const cached = sessionStorage.getItem("emma-country");
  if (cached) { visitor = { country: cached, store: storeFor(cached) }; paintShop(); return; }
  let code = "";
  try {
    const t = await fetch("https://www.cloudflare.com/cdn-cgi/trace").then(r => r.text());
    const line = t.split("\n").find(l => l.startsWith("loc="));
    if (line) code = line.slice(4).trim();
  } catch (e) {}
  code = (code || "IN").toUpperCase();
  if (code === "XX" || code === "T1") code = "IN";
  sessionStorage.setItem("emma-country", code);
  visitor = { country: code, store: storeFor(code) };
  paintShop();
}
let active = "all";
function render() {
  const list = EMMA_MEALS.filter(m => active === "all" || m.type === active);
  document.getElementById("count").textContent = list.length + " recipes";
  document.getElementById("list").innerHTML = list.map(m => `
    <article class="card">
      <img src="${pic(m)}" alt="${m.title}" loading="lazy" />
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
  const prep = (m.prep || []).map(p => {
    const src = typeof p === "string" ? p : p.src;
    const cap = typeof p === "string" ? "" : (p.cap || "");
    return `<figure><img src="${src}" alt="${cap || m.title}" onerror="this.parentNode.style.display='none'" /><figcaption>${cap}</figcaption></figure>`;
  }).join("");
  const ingredients = (m.ingredients || []).map(i => `<li>${i}</li>`).join("");
  const steps = (m.steps || []).map((s, i) => {
    const text = typeof s === "string" ? s : s.text;
    const img = (s && s.img) ? `<img class="step-img" src="${s.img}" alt="" />` : "";
    return `<li><span class="n">${i + 1}</span><div><p>${text}</p>${img}</div></li>`;
  }).join("");
  const stepText = (m.steps || []).map(s => typeof s === "string" ? s : s.text);
  const related = relatedShop([m.title, m.blurb, ...(m.ingredients || []), ...stepText].join(" "));
  const page = document.getElementById("recipe");
  page.innerHTML = `
    <div class="recipe-bar"><button class="back" type="button" id="backBtn">\u2190 Kitchen</button><span>Night ${m.night}</span></div>
    <img class="hero" src="${pic(m)}" alt="${m.title}" />
    <div class="recipe-wrap">
    <div class="recipe-body">
      <p class="eyebrow">Night ${m.night} \u00b7 ${m.date}</p>
      <h2>${m.title}</h2>
      <p class="meta">${m.time} \u00b7 Serves ${m.serves}</p>
      <p class="quote">\u201c${m.hook}\u201d</p>
      <p class="lede-r">${m.blurb}</p>
      <h3>In the kitchen</h3>
      <div class="prep">${prep}</div>
      <h3>Ingredients</h3>
      <ul class="ings">${ingredients}</ul>
      <h3>Method, step by step</h3>
      <ol class="steps">${steps}</ol>
      <p class="tweak">${m.tweak || ""}</p>
      <aside class="haunt"><p>Food in the oven? <a href="https://halloweenfest.github.io/">Play Holly Haunt</a></p></aside>
    </div>
    <aside class="need">
      <p class="eyebrow">For this recipe</p>
      <p class="need-note">The shop bits this one actually uses.</p>
      <div class="need-list">${shopLinks(related)}</div>
    </aside>
    </div>`;
  page.classList.add("open");
  document.body.classList.add("reading");
  page.scrollTop = 0;
  document.getElementById("backBtn").onclick = closeMeal;
  if (window.posthog && typeof posthog.capture === "function") {
    posthog.capture("recipe_opened", { night: m.night, title: m.title, type: m.type });
  }
}
function hideRecipe() {
  const page = document.getElementById("recipe");
  page.classList.remove("open");
  page.innerHTML = "";
  document.body.classList.remove("reading");
}
function onHash() {
  const match = location.hash.match(/^#night-(\d+)/);
  if (match) showRecipe(match[1]); else hideRecipe();
}
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("festiveMenu");
  menu.innerHTML = Object.entries(THEMES).map(([id, t]) => `<button type="button" data-theme-id="${id}">${t.label}</button>`).join("");
  document.getElementById("festiveBtn").onclick = e => { e.stopPropagation(); document.getElementById("festive").classList.toggle("open"); };
  menu.onclick = e => { const id = e.target.dataset.themeId; if (!id) return; applyTheme(id); document.getElementById("festive").classList.remove("open"); };
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
  fixInAppLinks();
});
