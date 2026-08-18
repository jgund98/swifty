/*
 * Polish audit — line breaks, orphans, balance and scaling.
 *
 * Screenshots hide these. This measures where text actually breaks by
 * ranging over every word and grouping by rendered top edge, then checks
 * grid columns for lopsided weight and text for scaling blowouts.
 *
 *   node scripts/audit-polish.js            all checks
 *   node scripts/audit-polish.js text       line breaks / orphans only
 *   node scripts/audit-polish.js balance    column weight only
 */
const puppeteer = require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");

const BASE = "http://localhost:3470";
const ROUTES = [
  "/",
  "/services",
  "/service-area",
  "/about",
  "/contact",
  "/services/house-cleaning",
  "/services/deep-cleaning",
  "/services/commercial-cleaning",
  "/services/trash-can-cleaning",
  "/services/houseboat-cleaning",
  "/services/pet-sitting",
];
// phone sizes that actually ship, plus the awkward in-betweens
const WIDTHS = [320, 360, 375, 390, 430, 600, 768, 900, 1024, 1280, 1440, 1920];

const MEASURE = () => {
  const lineup = (el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const lines = new Map();
    let node;
    while ((node = walker.nextNode())) {
      if (!node.textContent.trim()) continue;
      if (node.parentElement.closest("[aria-hidden='true']")) continue;
      const re = /\S+/g;
      let m;
      while ((m = re.exec(node.textContent))) {
        const r = document.createRange();
        r.setStart(node, m.index);
        r.setEnd(node, m.index + m[0].length);
        const rect = r.getBoundingClientRect();
        if (!rect.width) continue;
        const key = Math.round(rect.top / 4) * 4;
        if (!lines.has(key)) lines.set(key, { words: [], l: Infinity, r: 0 });
        const L = lines.get(key);
        L.words.push(m[0]);
        L.l = Math.min(L.l, rect.left);
        L.r = Math.max(L.r, rect.right);
      }
    }
    return [...lines.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => ({ t: v.words.join(" "), w: Math.round(v.r - v.l) }));
  };

  const visible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0")
      return false;
    return !!el.offsetParent || cs.position === "fixed";
  };

  const text = [];
  for (const el of document.querySelectorAll("h1,h2,h3,p,a.btn,button")) {
    if (!visible(el)) continue;
    if (el.closest("footer")) continue;
    const words = el.textContent.trim().split(/\s+/);
    if (words.length < 2) continue;
    const lines = lineup(el);
    if (lines.length < 2) continue;
    text.push({
      tag: el.tagName + (el.classList.contains("btn") ? ".btn" : ""),
      label: el.textContent.replace(/\s+/g, " ").trim().slice(0, 58),
      lines,
      fs: parseFloat(getComputedStyle(el).fontSize),
    });
  }

  // grid columns that end up wildly different heights read as "unbalanced"
  const balance = [];
  for (const g of document.querySelectorAll("div[class*='grid']")) {
    if (!visible(g)) continue;
    const cs = getComputedStyle(g);
    if (cs.display !== "grid") continue;
    const cols = cs.gridTemplateColumns.split(" ").filter(Boolean).length;
    if (cols < 2) continue;
    const kids = [...g.children].filter(visible);
    if (kids.length < 2 || kids.length > 4) continue;
    const hs = kids.map((k) => Math.round(k.getBoundingClientRect().height));
    const tops = kids.map((k) => Math.round(k.getBoundingClientRect().top));
    // only compare things actually sitting on the same row
    if (new Set(tops.map((t) => Math.round(t / 30))).size > 1) continue;
    const max = Math.max(...hs);
    const min = Math.min(...hs);
    if (max > 260 && min / max < 0.62)
      balance.push({
        cls: g.className.slice(0, 70),
        heights: hs,
        ratio: +(min / max).toFixed(2),
      });
  }

  return { text, balance };
};

(async () => {
  const mode = process.argv[2] || "all";
  const browser = await puppeteer.launch({ headless: "new", args: ["--hide-scrollbars"] });
  let n = 0;
  const seen = new Set();

  for (const w of WIDTHS) {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: w < 500 ? 800 : 900 });
      await page.evaluateOnNewDocument(() => {
        try {
          sessionStorage.setItem("ss-owner-seen", "1");
        } catch {}
      });
      await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 1800));
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.85) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 70));
        }
        scrollTo(0, 0);
      });
      await new Promise((r) => setTimeout(r, 700));
      const { text, balance } = await page.evaluate(MEASURE);

      if (mode !== "balance") {
        for (const t of text) {
          const maxW = Math.max(...t.lines.map((l) => l.w));
          const last = t.lines[t.lines.length - 1];
          const flags = [];
          const isHead = /^H[123]/.test(t.tag);

          t.lines.forEach((l, i) => {
            const ws = l.t.split(" ");
            if (ws.length === 1 && ws[0].length <= 13)
              flags.push(`orphan line ${i + 1}: "${l.t}"`);
          });
          if (last.w < maxW * (isHead ? 0.3 : 0.16))
            flags.push(`runt last line: "${last.t}"`);
          if (isHead && w < 500 && t.lines.length >= 4)
            flags.push(`${t.lines.length} lines on a ${w}px phone`);
          if (t.tag.endsWith(".btn") || t.tag === "BUTTON")
            flags.push(`wraps to ${t.lines.length} lines`);

          if (flags.length) {
            const key = `${t.tag}|${t.label}|${flags[0]}`;
            if (seen.has(key)) continue;
            seen.add(key);
            n++;
            console.log(`\n✗ ${route} @${w} <${t.tag}> ${t.label}`);
            t.lines.forEach((l, i) => console.log(`    ${i + 1}| ${l.t}`));
            flags.forEach((f) => console.log(`    → ${f}`));
          }
        }
      }

      if (mode !== "text") {
        for (const b of balance) {
          const key = `bal|${route}|${b.cls}`;
          if (seen.has(key)) continue;
          seen.add(key);
          n++;
          console.log(
            `\n⚖ ${route} @${w} lopsided columns ${b.heights.join(" vs ")} (${b.ratio})`,
          );
          console.log(`    ${b.cls}`);
        }
      }
      await page.close();
    }
  }
  await browser.close();
  console.log(n === 0 ? "\nClean." : `\n${n} issue(s).`);
})();
