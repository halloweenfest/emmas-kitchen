const IMGS = Object.fromEntries(Array.from({length:31}, (_,i) => [i+1, `img/meals/${String(i+1).padStart(2,"0")}.jpg?v=4`]));

function prepItem(p, title) {
  if (!p) return "";
  if (typeof p === "string") {
    return `<figure class="prep-fig"><img src="${p}" alt="Prep for ${title}" /><figcaption></figcaption></figure>`;
  }
  const src = p.src || "";
  const cap = p.cap || "";
  return `<figure class="prep-fig"><img src="${src}" alt="${cap || ("Prep for " + title)}" /><figcaption>${cap}</figcaption></figure>`;
}

function showRecipe(night) {
  const m = EMMA_MEALS.find(x => x.night === Number(night));
  if (!m) return;
  const prep = (m.prep || []).map(p => prepItem(p, m.title)).join("");
  try {
    if (typeof posthog !== "undefined" && posthog && typeof posthog.capture === "function") {
      posthog.capture("recipe_opened", { night: m.night, title: m.title, type: m.type });
  } } catch (e) {}
  document.getElementById("recipe").innerHTML = `<div class="recipe-bar"><button class="back" type="button" id="backBtn">← Kitchen</button><span>Night ${m.night}</span></div><img class="hero" src="${m.img}" alt="${m.title}" /><div class="recipe-body"><h2>${m.title}</h2><div class="prep">${prep}</div><ol class="steps">${(m.steps||[]).map((s,i)=>`<li><span class="n">${i+1}</span><p>${s}</p></li>`).join("")}</ol></div>`;
  document.getElementById("recipe").classList.add("open");
  document.getElementById("backBtn").onclick = () => { document.getElementById("recipe").classList.remove("open"); };
}

// TEMP stub while full app.js deploy awaits gh auth — site must not stay PLACEHOLDER
console.warn("Emma Kitchen: temporary stub app.js; full file pending auth");
document.addEventListener("DOMContentLoaded", () => {
  if (typeof EMMA_MEALS !== "undefined") {
    const list = document.getElementById("list");
    if (list) list.innerHTML = EMMA_MEALS.map(m => `<article class="row"><div><h3>${m.title}</h3><button class="more" data-night="${m.night}" type="button">Continue Reading</button></div></article>`).join("");
    list && (list.onclick = e => { const b=e.target.closest("[data-night]"); if (b) showRecipe(Number(b.dataset.night)); });
  }
});
