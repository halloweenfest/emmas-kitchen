# Emma's Kitchen

Static recipe site for Cloudflare Pages.

## Live (GitHub Pages, until Cloudflare is connected)

https://isardeepg.github.io/emma/

## Put this on Cloudflare Pages

1. Open https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
2. Select the `emmas-kitchen` repo
3. Framework preset: None. Build command empty. Output directory: `/`
4. Deploy. You get `emmas-kitchen.pages.dev`
5. Optional: attach `kitchen.merahissa.co.in` (or any domain already on Cloudflare)

No build step. The site is already HTML/CSS/JS at the repo root.
