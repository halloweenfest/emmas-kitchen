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
  { name: "Candy eyes", q: "candy eyes", in: "https://www.amazon.in/dp/B0CJ98W882/?tag=emmathegoodwi-21" },
  { name: "Edible markers", q: "edible ink markers", in: "https://www.amazon.in/dp/B07M9VYZ7C/?tag=emmathegoodwi-21" },
  { name: "Black gel colour", q: "black gel food color", in: "https://www.amazon.in/dp/B08R7ZCT4X/?tag=emmathegoodwi-21" },
  { name: "Orange gel colour", q: "orange gel food color", in: "https://www.amazon.in/dp/B08R7ZMV2T/?tag=emmathegoodwi-21" },
  { name: "Green gel colour", q: "green gel food color", in: "https://www.amazon.in/dp/B07MDGYRB1/?tag=emmathegoodwi-21" },
  { name: "Blue food colour", q: "blue liquid food color", in: "https://www.amazon.in/dp/B06XPFWW66/?tag=emmathegoodwi-21" },
  { name: "Gummy worms", q: "gummy worms", in: "https://www.amazon.in/dp/B07Z5MVJBC/?tag=emmathegoodwi-21" },
  { name: "Mini marshmallows", q: "mini marshmallows", in: "https://www.amazon.in/dp/B09412FYDP/?tag=emmathegoodwi-21" },
  { name: "Large marshmallows", q: "large marshmallows", in: "https://www.amazon.in/dp/B08CRT3SSQ/?tag=emmathegoodwi-21" },
  { name: "Chocolate kisses", q: "chocolate kisses", in: "https://www.amazon.in/dp/B07RX7CHP4/?tag=emmathegoodwi-21" },
  { name: "Pretzel rods", q: "pretzel rods", in: "https://www.amazon.in/dp/B0CPM56W7N/?tag=emmathegoodwi-21" },
  { name: "Lolly sticks", q: "lolly sticks", in: "https://www.amazon.in/dp/B0BYVHJNQ5/?tag=emmathegoodwi-21" },
  { name: "Food-safe gloves", q: "food safe gloves", in: "https://www.amazon.in/dp/B0895PLYW2/?tag=emmathegoodwi-21" },
  { name: "Cupcake liners", q: "cupcake liners", in: "https://www.amazon.in/dp/B07NTJYQTK/?tag=emmathegoodwi-21" },
  { name: "Brownie pan", q: "brownie pan", in: "https://www.amazon.in/dp/B077L1W8RG/?tag=emmathegoodwi-21" },
  { name: "Muffin tin", q: "muffin tin", in: "https://www.amazon.in/dp/B096S4F6K4/?tag=emmathegoodwi-21" },
  { name: "Brain mould", q: "brain mold", in: "https://www.amazon.in/dp/B08QD1QV1B/?tag=emmathegoodwi-21" },
  { name: "Cookie cutters", q: "halloween cookie cutters", in: "https://www.amazon.in/dp/B0872BL33D/?tag=emmathegoodwi-21" },
  { name: "Wooden board", q: "wooden serving board", in: "https://www.amazon.in/dp/B01M0VD650/?tag=emmathegoodwi-21" },
  { name: "Dessert cups", q: "clear dessert cups", in: "https://www.amazon.in/dp/B09S3QX63B/?tag=emmathegoodwi-21" },
  { name: "Punch ladle", q: "punch ladle", in: "https://www.amazon.in/dp/B083ZFV1RV/?tag=emmathegoodwi-21" },
  { name: "Toothpicks", q: "toothpicks", in: "https://www.amazon.in/dp/B01N3KK7Z0/?tag=emmathegoodwi-21" },
  { name: "Piping bags", q: "piping bags tips", in: "https://www.amazon.in/dp/B07G5FYNMF/?tag=emmathegoodwi-21" },
  { name: "Candy thermometer", q: "candy thermometer", in: "https://www.amazon.in/dp/B07Z7NJ7HN/?tag=emmathegoodwi-21" }
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
function shopLinks() {
  const extra = inAppBrowser() ? "" : " target=\"_blank\" rel=\"noopener sponsored\"";
  return SHOP.map(s => `<a href="${shopUrl(s)}"${extra}>${s.name}</a>`).join("");
}
function paintShop() {
  const grid = document.querySelector(".shop-grid");
  if (grid) grid.innerHTML = shopLinks();
  const fine = document.querySelector(".shop .fine");
  if (fine) fine.textContent = "Shop links open " + visitor.store.label + " for your country.";
  document.querySelectorAll(".kit-row").forEach(el => { el.innerHTML = shopLinks(); });
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
  const prep = (m.prep || []).map(p => {
    const src = typeof p === "string" ? p : p.src;
    const cap = typeof p === "string" ? "" : (p.cap || "");
    return `<figure><img src="${src}" alt="${cap || m.title}" onerror="this.parentNode.style.display='none'" /><figcaption>${cap}</figcaption></figure>`;
  }).join("");
  const ingredients = (m.ingredients || []).map(i => `<li>${i}</li>`).join("");
  const steps = (m.steps || []).map((s, i) => `<li><span class="n">${i + 1}</span><p>${s}</p></li>`).join("");
  const page = document.getElementById("recipe");
  page.innerHTML = `
    <div class="recipe-bar"><button class="back" type="button" id="backBtn">\u2190 Kitchen</button><span>Night ${m.night}</span></div>
    <img class="hero" src="${pic(m)}" alt="${m.title}" />
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
      <div class="kit"><p class="eyebrow">Emma uses</p><div class="kit-row">${shopLinks()}</div></div>
      <aside class="haunt"><p>Food in the oven? <a href="https://isardeepg.github.io/">Play Holly Haunt</a></p></aside>
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
