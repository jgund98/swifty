/*
 * Screenshot rig.
 *
 * Captures viewport-sized panels while scrolling, rather than one fullPage
 * shot. Two reasons: framer-motion's whileInView reveals need a real viewport
 * to fire, and the hero is sized in svh — growing the viewport to capture the
 * whole page would distort the very layout we're checking.
 *
 *   node scripts/shoot.js                  → every page, every width
 *   node scripts/shoot.js /contact 390     → one page, one width
 *   node scripts/shoot.js / 1440 fold      → first viewport only
 */
const puppeteer = require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = "http://localhost:3470";
const OUT = path.join(__dirname, "..", "_shots");

const PAGES = [
  ["/", "home"],
  ["/services", "services"],
  ["/services/house-cleaning", "svc-house"],
  ["/services/trash-can-cleaning", "svc-cans"],
  ["/service-area", "area"],
  ["/about", "about"],
  ["/contact", "contact"],
];
const WIDTHS = [375, 768, 1440, 1920];

(async () => {
  const argPath = process.argv[2];
  const argW = process.argv[3] ? Number(process.argv[3]) : null;
  const foldOnly = process.argv[4] === "fold";

  const pages = argPath
    ? [
        [
          argPath,
          argPath.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home",
        ],
      ]
    : PAGES;
  const widths = argW ? [argW] : WIDTHS;

  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--force-device-scale-factor=1", "--hide-scrollbars"],
  });

  for (const w of widths) {
    for (const [url, name] of pages) {
      const vh = w < 500 ? 812 : 900;
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: vh });
      await page.evaluateOnNewDocument(() => {
        try {
          sessionStorage.setItem("ss-owner-seen", "1");
        } catch {}
      });
      await page.goto(BASE + url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 2200));

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      const docH = await page.evaluate(() => document.body.scrollHeight);
      const panels = foldOnly ? 1 : Math.ceil(docH / vh);

      // clear old panels for this page/width
      fs.readdirSync(OUT)
        .filter((f) => f.startsWith(`${name}-${w}-s`))
        .forEach((f) => fs.unlinkSync(path.join(OUT, f)));

      for (let i = 0; i < panels; i++) {
        await page.evaluate((y) => window.scrollTo(0, y), i * vh);
        await new Promise((r) => setTimeout(r, i === 0 ? 900 : 650));
        const file = path.join(
          OUT,
          foldOnly ? `${name}-${w}-fold.png` : `${name}-${w}-s${i + 1}.png`,
        );
        await page.screenshot({ path: file });
      }
      console.log(`${name} @${w}  overflow:${overflow}px  panels:${panels}`);
      await page.close();
    }
  }
  await browser.close();
})();
