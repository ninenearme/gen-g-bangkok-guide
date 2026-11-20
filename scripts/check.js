#!/usr/bin/env node
// Static sanity checks (no dependencies). Run: npm run check
//  1. js/app.js and js/videos.js parse as valid JavaScript
//  2. every image referenced in js/app.js exists in img/
//  3. every file in img/ is referenced (warns about unused files)
//  4. every image credit entry has src, title, author, license and page
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
let errors = 0;
const fail = (msg) => {
  errors++;
  console.error("✗ " + msg);
};

for (const f of ["js/app.js", "js/videos.js"]) {
  try {
    new vm.Script(read(f), { filename: f });
    console.log("✓ " + f + " parses");
  } catch (e) {
    fail(`${f} does not parse: ${e.message}`);
  }
}

const app = read("js/app.js");
const refs = new Set([...app.matchAll(/["'`](img\/[\w.-]+\.(?:jpe?g|png|webp|svg))["'`]/g)].map((m) => m[1]));
for (const r of refs) if (!fs.existsSync(path.join(root, r))) fail(`missing image file: ${r}`);
console.log(`✓ ${refs.size} referenced images checked`);

const unused = fs.readdirSync(path.join(root, "img")).filter((f) => !refs.has("img/" + f));
if (unused.length) console.warn(`! ${unused.length} image file(s) not referenced: ${unused.join(", ")}`);

const credit = /"([\w-]+(?:\/[\w-]+)?)":\s*\{\s*src:\s*"img\/[^"]+",([\s\S]*?)\}/g;
let n = 0;
for (const m of app.matchAll(credit)) {
  n++;
  for (const k of ["title", "author", "license", "page"])
    if (!new RegExp(`\\b${k}:`).test(m[2])) fail(`credit "${m[1]}" has no ${k}`);
}
console.log(`✓ ${n} image credit entries checked`);

if (errors) {
  console.error(`\n${errors} problem(s) found`);
  process.exit(1);
}
console.log("\nAll checks passed");
