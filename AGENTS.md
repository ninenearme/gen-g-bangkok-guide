# AGENTS.md — Gen.G Bangkok Survival Guide

Instructions for AI coding agents (Codex etc.) working in this repository. Read this first.

## What this is

An **unofficial, fan-made**, trilingual (English / 한국어 / ไทย) Bangkok survival guide for Korean-speaking esports players and staff. It is a **static single-page app**:

- no framework
- no build step
- no npm dependencies

It is plain HTML + CSS + one large JavaScript file, served as static files.

It is **not** affiliated with Gen.G Esports. Do not add Gen.G logos, official branding or claims of partnership.

## Run it

```bash
npm run dev      # → http://localhost:5173  (zero-dependency Node static server, Node ≥ 18)
npm run check    # syntax + image/credit sanity checks — run after every change
```

Opening `index.html` directly from disk mostly works, but use the dev server: `fetch`, the map and video embeds behave better over http.

## File layout

| Path | What it is |
|---|---|
| `index.html` | HTML shell: header, `<main id="view">`, footer, overlays. The JavaScript renders all page content into `#view`. |
| `css/styles.css` | All styles, in three sections. **Base** is the reset. **Main theme** holds the design tokens on `:root` (`--bg`, `--gold`, …). **Additions** covers map tiles, the video block and Korean/Thai typography. |
| `js/videos.js` | YouTube preview data (`V`, keyed by experience/gem id) and `window.gengVideo(...)`. It renders a click-to-load `youtube-nocookie` embed. |
| `js/app.js` | The whole app: data, router, views, games and the map. |
| `img/` | Photos. Naming is `<prefix>-<id>[-v2].{jpg,webp}`. The prefix is one of `food`, `noodle`, `exp`, `gem`, `shop`, `snack`, `t`, `hood` or `hero`. |
| `scripts/serve.js` | Dev server. |
| `scripts/check.js` | Sanity checks. |

## Important: `js/app.js` was recovered from a minified bundle

The original source was lost. `js/app.js` was **re-printed from a minified esbuild bundle** and then formatted with Prettier. Consequences:

- **Identifiers are short and meaningless** (`o`, `h`, `D`, `Qo`, `lt`, …). Use the symbol map below, and search by **string ids** (e.g. `id: "pad-thai"`) rather than variable names.
- **Modules are lazy-init closures.** They look like `var X, Y = S(() => { … })`. `S(fn)` runs `fn` once, on first call. The router in `Tn` calls these closures to load a page.
- **Keep edits surgical.** Do not rename symbols across the file or run broad refactors without testing every page in all three languages. If you rename something, rename it in one place and verify with `npm run check` plus the browser.
- **Some unreachable code from removed sections is still present.** That covers the day planner, neighborhoods (`be`), Korean-taste guide (`Xn`), team page, about/credits page, budget, passport and vibe quiz. These routes were removed on purpose. **Do not re-add them** unless asked. Deleting the dead code is fine if you test afterwards.

### Symbol map (search for these in `js/app.js`)

| Symbol | Meaning |
|---|---|
| `I()` | Current language: `"en" \| "ko" \| "th"`. |
| `o(en, ko, th)` | Pick the UI string for the current language. An empty or missing `ko`/`th` falls back to English. |
| `h(obj)` | Pick from a `{ en, ko, th }` object. |
| `w` | Persistent state in `localStorage` key `gengbkk.v1`: language, favourites, quiz stats, …. Use `w.get(k)` and `w.set(k, v)`. |
| `D` | **Image credit map**: `"food/pad-thai": { src, title, author, license, page }`. Every photo shown must have an entry here. |
| `F(key, opts)` | Renders a `<figure>` for image key `key`. If the key is missing it renders a grey placeholder. **Placeholders must never ship.** |
| `fe(key)` | Renders the credit link (author · license · Flickr or Wikimedia Commons). |
| `Qo` | Food data: main dishes. Categories are classics, soups, spicy and street. |
| `Ko` | Food data: street food, desserts and drinks. `j = [...Qo, ...Ko]` is the full food list. |
| `va` | Noodle types. |
| `Oo` | Experiences, part 1: cafe, photo, fashion. |
| `Do` | Experiences, part 2: active, group, night. |
| `W` | Hidden gems. |
| `Re` | Shopping, convenience stores, SIMs, snacks and souvenirs. |
| `U` | Thai phrasebook. `{P}` in a phrase is the polite particle ครับ/ค่ะ, based on the user's gender setting. |
| `Ge` | Transport modes. |
| `lo` | Maps transport id → image key. |
| `We` | Emergency/survival topics. |
| `eo` | Date-checked events. |
| `qe` | Main sections (drawer menu). |
| `Cn` | Tools (map, saved). |
| `Ss` | Top-nav section ids. |
| `Tn` | Route table: hash `#/<id>` → page module. |
| `Qn` | Home dashboard tiles: `[sectionId, imageKey \| null, size, "wide" \| "tall"]`. |
| `no` | Tile subtitles: `[en, ko, th]`. |
| `Wn` | Weather code → `[en, ko, th]`. |
| `Gt` | Playground tabs: roulette, bingo, random challenge, Thai quiz. |
| `lt(item, kind)` | Detail sheet for an experience or gem. It calls `window.gengVideo`. |
| `c(sel)`, `R(sel)` | `querySelector` and `querySelectorAll`. |
| `s(str)` | HTML-escape. **Always escape data inserted into HTML templates.** |
| `m(name, size)` | Inline SVG icon. |
| `A(kicker, title, sub)` | Page header. |
| `C(label, attrs, on)` | Filter chip. |
| `Y(type, id)` | Favourite (heart) button. |

Routing is hash-based: `#/food`, `#/food/<id>`, `#/experiences/<id>`, `#/gems/<id>`, `#/shopping/<id>`, `#/transport/<id>`, `#/play/<tab>`, `#/language`, `#/emergency`, `#/map`, `#/saved`. Unknown routes fall back to home.

## Content rules (keep these)

1. **Every user-visible string is trilingual.**
   - Data uses `{ en, ko, th }` objects.
   - UI strings use `o("English", "한국어", "ไทย")`.
   - Long descriptions may be English-only for Thai. The site shows a notice about this in Thai mode.
2. **Korean must be natural Korean** (해요체), not a literal translation.
   - Counters attach to the number: `146개 표현`, not `146 개 표현`.
   - When a number is followed by a translated unit, put the space inside the English and Thai strings, not in the template: `` `${n}${o(" phrases", "개 표현", " วลี")}` ``.
   - Keep Korean place-name spellings consistent: 딸랏 노이, 짜런끄룽, 마하나콘, 야오와랏, 수쿰윗, 아이콘시암, 짜오프라야, 시암, 통로, 에카마이, 프롬퐁.
3. **Korean/Thai typography.**
   - No wide `letter-spacing` and no tight `line-height` on Korean or Thai text. `css/styles.css` has `html:lang(ko)` and `html:lang(th)` overrides at the end; keep them working.
   - `document.documentElement.lang` is set to the current language.
4. **Photos.**
   - Every item must show a real photo that actually matches the item, and it should look good.
   - No placeholders. If no good photo exists, remove the item rather than ship a placeholder.
   - Add an entry to `D` with the real author, license and source page for every new photo. Free-licensed sources only: Wikimedia Commons, Flickr CC, Openverse.
   - Never hotlink or use copyrighted photos.
   - Keep files around ≤ 400 KB, 1024 px wide.
5. **Facts.** Prices are estimates and are labelled as such. Never invent opening hours, fares or travel times; link to Google Maps instead. Thai emergency numbers: 191 police, 1669 ambulance, 199 fire, 1155 tourist police, 1672 TAT info.
6. **Accessibility.** Keep `aria-*` labels, keyboard focus and `alt` text (`imgAlt`) when changing markup.

## How to verify a change

There is no automated UI test suite.

1. Run `npm run check`. It must pass.
2. Run `npm run dev` and open the site. Then:
   - Switch EN / 한국어 / ไทย with the header switcher and look at every page you touched.
   - Open the browser console. There must be **no errors**.
   - Check a phone width (≈ 375 px). There must be no horizontal scrolling.
   - If you touched data, open a few detail pages (`#/food/<id>`, …). Each needs a photo and a credit link.
3. For larger changes, also smoke-test:
   - search (magnifier)
   - favourites (heart, then `#/saved`)
   - food filters
   - phrasebook "Show to a local"
   - flashcards
   - roulette, bingo and quiz
   - the map
   - the emergency `tel:` links

## Deployment notes

- Any static host works: GitHub Pages, Netlify, Vercel static, S3. Upload the repo contents as-is.
- `sw.js` caches the four core files and all local photos referenced in `js/app.js`. For each release, including photo-only updates, increment `VERSION` in `sw.js` (for example, `v1` to `v2`). Deploy the assets before or alongside the updated worker. The new worker activates after tabs using the old worker close. Use `/?pwa=1` to test registration on localhost.
- The map uses Leaflet 1.9.4 from unpkg and OpenStreetMap tiles, darkened with a CSS filter. The weather and exchange-rate widgets call public APIs at runtime and fall back to "last known" values.
