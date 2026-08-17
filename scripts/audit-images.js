/* Walks every route and reports any <img> that failed to load. */
const puppeteer = require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");

const BASE = "http://localhost:3470";
const ROUTES = [
  "/","/services","/service-area","/about","/contact",
  "/services/house-cleaning","/services/deep-cleaning","/services/commercial-cleaning",
  "/services/trash-can-cleaning","/services/houseboat-cleaning","/services/pet-sitting",
];

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  let bad = 0;
  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    const failed = [];
    page.on("requestfailed", (r) => failed.push(r.url()));
    page.on("response", (r) => {
      if (r.status() >= 400 && /image|\.jpg|\.png|_next\/image/.test(r.url()))
        failed.push(`${r.status()} ${r.url()}`);
    });
    await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const step = () => {
          y += innerHeight * 0.8;
          scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 80);
          else setTimeout(res, 900);
        };
        step();
      });
    });
    const broken = await page.evaluate(() =>
      [...document.images]
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src || i.getAttribute("src")),
    );
    const count = await page.evaluate(() => document.images.length);
    if (broken.length || failed.length) {
      bad += broken.length + failed.length;
      console.log(`✗ ${route}  (${count} imgs)`);
      [...new Set([...broken, ...failed])].forEach((b) =>
        console.log(`    ${decodeURIComponent(b).slice(0, 160)}`),
      );
    } else {
      console.log(`✓ ${route}  (${count} imgs all loaded)`);
    }
    await page.close();
  }
  await browser.close();
  console.log(bad === 0 ? "\nALL IMAGES OK" : `\n${bad} PROBLEM(S)`);
})();
