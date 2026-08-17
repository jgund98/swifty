/*
 * Heading line-break audit.
 *
 * Eyeballing screenshots misses orphans. This measures where every heading
 * actually breaks by ranging over each word and grouping by its rendered
 * top edge, then flags:
 *
 *   ORPHAN   — a line with one short word (or a stray "it." / "that.")
 *   RUNT     — the last line is under a quarter the width of the longest
 *   CRAMPED  — four or more lines on a phone
 *
 *   node scripts/audit-headings.js
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
  "/services/trash-can-cleaning",
  "/services/commercial-cleaning",
];
const WIDTHS = [375, 414, 768, 1024, 1440, 1920];

const MEASURE = () => {
  const out = [];
  const els = document.querySelectorAll("h1, h2, h3");
  for (const el of els) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    if (!el.offsetParent && cs.position !== "fixed") continue;

    // group words by the top edge of their rendered rect
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const lines = new Map();
    let node;
    while ((node = walker.nextNode())) {
      const text = node.textContent;
      if (!text.trim()) continue;
      const re = /\S+/g;
      let m;
      while ((m = re.exec(text))) {
        const r = document.createRange();
        r.setStart(node, m.index);
        r.setEnd(node, m.index + m[0].length);
        const rect = r.getBoundingClientRect();
        if (!rect.width) continue;
        const key = Math.round(rect.top / 4) * 4;
        if (!lines.has(key)) lines.set(key, { words: [], left: Infinity, right: 0 });
        const L = lines.get(key);
        L.words.push(m[0]);
        L.left = Math.min(L.left, rect.left);
        L.right = Math.max(L.right, rect.right);
      }
    }
    const arr = [...lines.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => ({ words: v.words, width: v.right - v.left }));
    if (!arr.length) continue;
    out.push({
      tag: el.tagName,
      text: el.textContent.replace(/\s+/g, " ").trim().slice(0, 70),
      lines: arr.map((l) => ({ t: l.words.join(" "), w: Math.round(l.width) })),
    });
  }
  return out;
};

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--hide-scrollbars"] });
  let issues = 0;

  for (const w of WIDTHS) {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: w < 500 ? 812 : 900 });
      await page.evaluateOnNewDocument(() => {
        try {
          sessionStorage.setItem("ss-owner-seen", "1");
        } catch {}
      });
      await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 2000));
      const heads = await page.evaluate(MEASURE);

      for (const h of heads) {
        if (h.lines.length < 2) continue;
        const maxW = Math.max(...h.lines.map((l) => l.w));
        const last = h.lines[h.lines.length - 1];
        const flags = [];

        h.lines.forEach((l, i) => {
          const words = l.t.split(" ");
          if (words.length === 1 && words[0].length <= 12) {
            flags.push(`ORPHAN line ${i + 1}: "${l.t}"`);
          }
        });
        if (last.w < maxW * 0.25) flags.push(`RUNT last line: "${last.t}"`);
        if (w < 500 && h.lines.length >= 4)
          flags.push(`CRAMPED ${h.lines.length} lines on phone`);

        if (flags.length) {
          issues++;
          console.log(`\n✗ ${route} @${w}  <${h.tag}> ${h.text}`);
          h.lines.forEach((l, i) => console.log(`     ${i + 1}| ${l.t}`));
          flags.forEach((f) => console.log(`     → ${f}`));
        }
      }
      await page.close();
    }
  }

  await browser.close();
  console.log(issues === 0 ? "\nNo awkward headings found." : `\n${issues} heading issue(s).`);
})();
