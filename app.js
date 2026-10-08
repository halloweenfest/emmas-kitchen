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
function store(kind, key, val) {
  try {
    const st = window[kind];
    if (val === undefined) return st.getItem(key);
    st.setItem(key, val);
  } catch (e) { return null; }
}
function esc(t) { return String(t == null ? "" : t).replace(/"/g, "&quot;"); }
function placeProps(list) {
  ["p1","p2","p3","p4"].forEach((id,i) => { const el = document.getElementById(id); if (el) el.textContent = list[i] || ""; });
}
function applyTheme(id) {
  const theme = THEMES[id] || THEMES.halloween;
  document.documentElement.dataset.theme = id;
  store("localStorage", "emma-theme", id);
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
  { name: "Candy thermometer", file: "24.jpg", q: "candy thermometer", in: "https://www.amazon.in/dp/B07Z7NJ7HN/?tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Cocoa powder", file: "25.jpg", q: "unsweetened cocoa powder", in: "https://www.amazon.in/s?k=unsweetened+cocoa+powder&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Puff pastry", file: "26.jpg", q: "puff pastry sheet", in: "https://www.amazon.in/s?k=puff+pastry+sheet&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Pizza dough", file: "27.jpg", q: "pizza dough", in: "https://www.amazon.in/s?k=pizza+dough&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Sausages", file: "28.jpg", q: "chicken sausages", in: "https://www.amazon.in/s?k=chicken+sausages&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Mozzarella", file: "29.jpg", q: "mozzarella balls", in: "https://www.amazon.in/s?k=mozzarella+balls&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "White chocolate", file: "30.jpg", q: "white chocolate", in: "https://www.amazon.in/s?k=white+chocolate&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Chocolate biscuits", file: "31.jpg", q: "chocolate biscuits", in: "https://www.amazon.in/s?k=chocolate+biscuits&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Cream cheese", file: "32.jpg", q: "cream cheese", in: "https://www.amazon.in/s?k=cream+cheese&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Chicken wings", file: "33.jpg", q: "chicken wings", in: "https://www.amazon.in/s?k=chicken+wings&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Ginger ale", file: "34.jpg", q: "ginger ale", in: "https://www.amazon.in/s?k=ginger+ale&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Tortillas", file: "35.jpg", q: "flour tortillas", in: "https://www.amazon.in/s?k=flour+tortillas&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Icing sugar", file: "36.jpg", q: "icing sugar", in: "https://www.amazon.in/s?k=icing+sugar&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Pumpkin", file: "37.jpg", q: "small pumpkin", in: "https://www.amazon.in/s?k=small+pumpkin&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Apple juice", file: "38.jpg", q: "apple juice", in: "https://www.amazon.in/s?k=apple+juice&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Chocolate pudding", file: "39.jpg", q: "chocolate pudding mix", in: "https://www.amazon.in/s?k=chocolate+pudding+mix&tag=emmathegoodwi-21" },
  { group: "From the recipes", name: "Slivered almonds", file: "40.jpg", q: "slivered almonds", in: "https://www.amazon.in/s?k=slivered+almonds&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Cheesecloth", file: "41.jpg", q: "cheesecloth gauze", in: "https://www.amazon.in/s?k=cheesecloth&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Tissue paper", file: "42.jpg", q: "white tissue paper", in: "https://www.amazon.in/s?k=white+tissue+paper&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Battery tea lights", file: "43.jpg", q: "battery tea lights", in: "https://www.amazon.in/s?k=battery+tea+lights&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Black paint", file: "44.jpg", q: "matte black paint", in: "https://www.amazon.in/s?k=matte+black+acrylic+paint&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Orange paint", file: "45.jpg", q: "orange acrylic paint", in: "https://www.amazon.in/s?k=orange+acrylic+paint&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "White glue", file: "46.jpg", q: "white craft glue", in: "https://www.amazon.in/s?k=white+craft+glue&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Black card", file: "47.jpg", q: "black card paper", in: "https://www.amazon.in/s?k=black+card+paper&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "White yarn", file: "48.jpg", q: "white yarn", in: "https://www.amazon.in/s?k=white+yarn&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Glass jars", file: "49.jpg", q: "glass jars", in: "https://www.amazon.in/s?k=glass+jars&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Cinnamon sticks", file: "50.jpg", q: "cinnamon sticks", in: "https://www.amazon.in/s?k=cinnamon+sticks&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Googly eyes", file: "51.jpg", q: "googly eyes", in: "https://www.amazon.in/s?k=googly+eyes&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Ping-pong balls", file: "52.jpg", q: "ping pong balls", in: "https://www.amazon.in/s?k=ping+pong+balls&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Kitchen twine", file: "53.jpg", q: "kitchen twine", in: "https://www.amazon.in/s?k=kitchen+twine&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Coffee filters", file: "54.jpg", q: "coffee filters", in: "https://www.amazon.in/s?k=coffee+filters&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Black ribbon", file: "55.jpg", q: "black ribbon", in: "https://www.amazon.in/s?k=black+ribbon&tag=emmathegoodwi-21" },
  { group: "From the makes", name: "Foam board", file: "56.jpg", q: "foam board", in: "https://www.amazon.in/s?k=foam+board&tag=emmathegoodwi-21" }
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
  return list.map(s => `<a href="${shopUrl(s)}"${extra}><img src="img/shop/${s.file}" alt="" width="56" height="56" loading="lazy" decoding="async" /><span>${s.name}</span></a>`).join("");
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
    score: (keys[s.name] || [s.name.toLowerCase()]).reduce((n, k) => n + (new RegExp("\\b" + k).test(blob) ? 1 : 0), 0)
  })).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
  const picks = scored.map(x => x.s);
  return (picks.length ? picks : SHOP.slice(0, 4)).slice(0, 6);
}
function shopCards() {
  const extra = inAppBrowser() ? "" : " target=\"_blank\" rel=\"noopener sponsored\"";
  const order = ["From the recipes", "From the makes", "Candy & decorating"];
  const groups = {};
  SHOP.forEach(s => {
    const g = s.group || "Candy & decorating";
    (groups[g] = groups[g] || []).push(s);
  });
  return order.filter(g => groups[g]).map(g => {
    const cards = groups[g].map(s => `<a class="shop-card" href="${shopUrl(s)}"${extra}><img src="img/shop/${s.file}" alt="" width="240" height="180" loading="lazy" decoding="async" /><span class="shop-name">${s.name}</span><span class="shop-go">View on Amazon</span></a>`).join("");
    return `<h3 class="shop-h">${g} <small>${groups[g].length}</small></h3><div class="shop-grid">${cards}</div>`;
  }).join("");
}
function paintShop() {
  const grid = document.getElementById("shop-groups");
  if (grid) grid.innerHTML = shopCards();
  const fine = document.querySelector(".shop .fine");
  if (fine) fine.textContent = "Shop links open " + visitor.store.label + " for your country. " + SHOP.length + " things this site uses. As an Amazon Associate, Emma earns from qualifying purchases.";
}
async function detectCountry() {
  const cached = store("sessionStorage", "emma-country");
  if (cached) { visitor = { country: cached, store: storeFor(cached) }; paintShop(); return; }
  let code = "";
  // Same-origin trace first (Cloudflare Pages serves it and ad blockers leave it alone), then cloudflare.com.
  const traces = location.protocol === "https:" ? ["/cdn-cgi/trace", "https://www.cloudflare.com/cdn-cgi/trace"] : ["https://www.cloudflare.com/cdn-cgi/trace"];
  for (const url of traces) {
    try {
      const r = await fetch(url);
      if (!r.ok) continue;
      const line = (await r.text()).split("\n").find(l => l.startsWith("loc="));
      if (line) { code = line.slice(4).trim(); break; }
    } catch (e) {}
  }
  code = (code || "IN").toUpperCase();
  if (code === "XX" || code === "T1") code = "IN";
  store("sessionStorage", "emma-country", code);
  visitor = { country: code, store: storeFor(code) };
  paintShop();
}
let active = "all";
function render() {
  const list = EMMA_MEALS.filter(m => active === "all" || m.type === active);
  document.getElementById("count").textContent = list.length + " recipes";
  document.querySelectorAll("#start [data-cat]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.cat === active)));
  document.getElementById("list").innerHTML = list.map(m => `
    <article class="card">
      <img src="${pic(m)}" alt="" width="900" height="600" loading="lazy" decoding="async" />
      <div>
        <p class="card-meta">Night ${m.night} \u00b7 ${m.time}</p>
        <h3><a href="#night-${m.night}" data-night="${m.night}">${m.title}</a></h3>
        <p>${m.blurb}</p>
        <span class="more" aria-hidden="true">Read the recipe \u2192</span>
      </div>
    </article>`).join("");
}
const BASE_TITLE = document.title;
let lastFocus = null;
function openOverlay(page, title) {
  if (!page.classList.contains("open")) lastFocus = document.activeElement;
  page.classList.add("open");
  document.body.classList.add("reading");
  page.scrollTop = 0;
  page.setAttribute("aria-label", title);
  document.title = title + " \u2014 Emma's Festive Vibes";
  page.setAttribute("tabindex", "-1");
  page.focus({ preventScroll: true });
}
function closeOverlay(page) {
  const wasOpen = page.classList.contains("open");
  page.classList.remove("open");
  page.innerHTML = "";
  document.body.classList.remove("reading");
  document.title = BASE_TITLE;
  if (wasOpen && lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  lastFocus = null;
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
  // The prep gallery repeated the first two method photos on every recipe; only show prep shots the method does not use.
  const stepSrcs = (m.steps || []).map(s => s && s.img && s.img.split("?")[0]);
  const prep = (m.prep || []).map(p => typeof p === "string" ? { src: p, cap: "" } : p)
    .filter(p => stepSrcs.indexOf(p.src.split("?")[0]) === -1)
    .map(p => `<figure><img src="${p.src}" alt="${esc(p.cap || m.title)}" width="1000" height="667" loading="lazy" decoding="async" onerror="this.parentNode.style.display='none'" />${p.cap ? `<figcaption>${p.cap}</figcaption>` : ""}</figure>`).join("");
  const ingredients = (m.ingredients || []).map(i => `<li>${i}</li>`).join("");
  const steps = (m.steps || []).map((s, i) => {
    const text = typeof s === "string" ? s : s.text;
    const img = (s && s.img) ? `<img class="step-img" src="${s.img}" alt="" width="1000" height="667" loading="lazy" decoding="async" />` : "";
    return `<li><span class="n" aria-hidden="true">${i + 1}</span><div><p>${text}</p>${img}</div></li>`;
  }).join("");
  const stepText = (m.steps || []).map(s => typeof s === "string" ? s : s.text);
  const related = relatedShop([m.title, m.blurb, ...(m.ingredients || []), ...stepText].join(" "));
  const page = document.getElementById("recipe");
  page.innerHTML = `
    <div class="recipe-bar"><button class="back" type="button" id="backBtn">\u2190 Kitchen</button><span>Night ${m.night}</span></div>
    <img class="hero" src="${pic(m)}" alt="${esc(m.title)}" width="900" height="600" />
    <div class="recipe-wrap">
    <div class="recipe-body">
      <p class="eyebrow">Night ${m.night} \u00b7 ${m.date}</p>
      <h2>${m.title}</h2>
      <p class="meta">${m.time} \u00b7 Serves ${m.serves}</p>
      <p class="quote">\u201c${m.hook}\u201d</p>
      <p class="lede-r">${m.blurb}</p>
      ${prep ? `<h3>In the kitchen</h3><div class="prep">${prep}</div>` : ""}
      <section class="ing-box"><h3>Ingredients</h3>
      <ul class="ings">${ingredients}</ul></section>
      <h3>Method, step by step</h3>
      <ol class="steps">${steps}</ol>
      ${m.tweak ? `<p class="tweak">${m.tweak}</p>` : ""}
      <aside class="haunt"><p>Food in the oven? <a href="https://halloweenfest.github.io/">Play Holly Haunt</a></p></aside>
    </div>
    <aside class="need">
      <p class="eyebrow">For this recipe</p>
      <p class="need-note">The shop bits this one actually uses.</p>
      <div class="need-list">${shopLinks(related)}</div>
    </aside>
    </div>`;
  document.getElementById("backBtn").onclick = closeMeal;
  openOverlay(page, m.title);
  if (window.posthog && typeof posthog.capture === "function") {
    posthog.capture("recipe_opened", { night: m.night, title: m.title, type: m.type });
  }
}
// Newsletter signups go to PostHog: the email becomes a person property and a
// newsletter_signup event, so the list lives under People in the PostHog project.
function setupNewsletter() {
  const form = document.getElementById("mail-form");
  if (!form) return;
  const input = document.getElementById("mail-in");
  const msg = document.getElementById("mail-msg");
  const btn = form.querySelector("button");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = input.value.trim().toLowerCase();
    if (!input.checkValidity() || !email) { msg.textContent = "Please enter a valid email address."; return; }
    const ph = window.posthog;
    if (!ph || typeof ph.capture !== "function" || !ph.__loaded) {
      msg.textContent = "We couldn’t save that (an ad blocker may be stopping it). Email info@merahissa.co.in and we’ll add you.";
      return;
    }
    ph.identify(email, { email, newsletter: true, newsletter_signed_up_at: new Date().toISOString() });
    ph.capture("newsletter_signup", { email, page: location.pathname + location.hash }, { send_instantly: true });
    btn.textContent = "Subscribed";
    btn.disabled = true;
    input.disabled = true;
    msg.textContent = "You’re on the list. New recipes will come to " + email + ".";
  });
}
function hideRecipe() {
  closeOverlay(document.getElementById("recipe"));
}
function onHash() {
  const match = location.hash.match(/^#night-(\d+)/);
  if (match) showRecipe(match[1]); else hideRecipe();
}
document.addEventListener("DOMContentLoaded", () => {
  setupNewsletter();
  const menu = document.getElementById("festiveMenu");
  menu.innerHTML = Object.entries(THEMES).map(([id, t]) => `<button type="button" data-theme-id="${id}">${t.label}</button>`).join("");
  const festBtn = document.getElementById("festiveBtn");
  const setFest = open => { document.getElementById("festive").classList.toggle("open", open); festBtn.setAttribute("aria-expanded", String(open)); };
  festBtn.onclick = e => { e.stopPropagation(); setFest(!document.getElementById("festive").classList.contains("open")); };
  menu.onclick = e => { const id = e.target.dataset.themeId; if (!id) return; applyTheme(id); setFest(false); festBtn.focus(); };
  document.addEventListener("click", () => setFest(false));
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
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const fest = document.getElementById("festive");
    if (fest.classList.contains("open")) { fest.classList.remove("open"); document.getElementById("festiveBtn").setAttribute("aria-expanded", "false"); return; }
    const back = document.getElementById("backBtn");
    if (back && document.getElementById("recipe").classList.contains("open")) back.click();
  });
  applyTheme(store("localStorage", "emma-theme") || "halloween");
  render();
  paintShop();
  detectCountry();
  onHash();
  fixInAppLinks();
});
