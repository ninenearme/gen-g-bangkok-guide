# Gen.G Bangkok Survival Guide

An unofficial, fan-made Bangkok guide for Korean-speaking esports players and staff. It is a static single-page site in English, 한국어 and ไทย.

It covers:

- Thai food explorer
- Thai phrasebook
- transport
- Gen Z experiences
- hidden gems
- shopping
- mini-games
- a map
- emergency info

> Not affiliated with Gen.G Esports.

## Quick start

Requires Node.js 18 or later. There are no dependencies to install.

```bash
npm run dev     # http://localhost:5173
npm run check   # sanity checks (JS syntax, images, photo credits)
```

## Project structure

```
index.html        HTML shell
css/styles.css    all styles
js/app.js         app: data + router + pages + games + map
js/videos.js      YouTube previews for experiences
img/              photos (credits are listed in js/app.js, map "D")
scripts/          dev server + checks
AGENTS.md         full guide for AI coding agents (Codex) and developers
```

See **[AGENTS.md](AGENTS.md)** for:

- the symbol map of `js/app.js`
- content rules: trilingual text, Korean style, photo rules
- how to verify changes

## Photo credits

All photos are from Wikimedia Commons or Flickr, under the Creative Commons licenses shown on each detail page. Map data is © OpenStreetMap contributors.

---

## ภาษาไทย (สรุปสั้นๆ)

- **เปิดดูเว็บในเครื่อง:** ติดตั้ง Node.js แล้วรัน `npm run dev` จากนั้นเปิด http://localhost:5173
- **ไฟล์หลักที่แก้บ่อย:**
  - `js/app.js` เก็บข้อมูลและหน้าทั้งหมด
  - `css/styles.css` เก็บดีไซน์
  - `img/` เก็บรูปภาพ
- **ก่อนสั่งงาน Codex:** ให้ Codex อ่าน `AGENTS.md` ก่อน (Codex อ่านไฟล์นี้อัตโนมัติ) ในไฟล์มีกฎของโปรเจกต์ครบ เช่น ต้องมี 3 ภาษา ห้ามใช้รูป placeholder และต้องใส่เครดิตรูป
- **ตรวจหลังแก้ทุกครั้ง:** รัน `npm run check`
