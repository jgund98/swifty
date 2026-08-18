/*
 * Performance audit. Measures what actually ships and how fast it paints,
 * on a throttled connection so the numbers mean something.
 *
 *   node scripts/audit-perf.js
 */
const puppeteer = require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");

const BASE = "http://localhost:3470";
const ROUTES = ["/", "/services", "/contact", "/about", "/service-area"];

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--hide-scrollbars"] });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 800, deviceScaleFactor: 2 });

    const cdp = await page.createCDPSession();
    await cdp.send("Network.enable");
    // roughly a good 4G phone
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 70,
      downloadThroughput: (4 * 1024 * 1024) / 8,
      uploadThroughput: (1 * 1024 * 1024) / 8,
    });
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

    const bytes = { total: 0, image: 0, script: 0, font: 0, css: 0, doc: 0 };
    const kinds = new Map();
    cdp.on("Network.responseReceived", (e) => kinds.set(e.requestId, e.type));
    cdp.on("Network.loadingFinished", (e) => {
      const n = e.encodedDataLength || 0;
      bytes.total += n;
      const t = (kinds.get(e.requestId) || "").toLowerCase();
      if (t === "image") bytes.image += n;
      else if (t === "script") bytes.script += n;
      else if (t === "font") bytes.font += n;
      else if (t === "stylesheet") bytes.css += n;
      else if (t === "document") bytes.doc += n;
    });
    // LCP needs an observer registered before the page paints
    await page.evaluateOnNewDocument(() => {
      window.__lcp = 0;
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__lcp = Math.round(e.startTime);
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });

    const t0 = Date.now();
    await page.goto(BASE + route, { waitUntil: "load", timeout: 90000 });
    const loadMs = Date.now() - t0;
    await new Promise((r) => setTimeout(r, 2600));

    const m = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] || {};
      const lcp = window.__lcp;
      const fcp = performance.getEntriesByName("first-contentful-paint")[0];
      let cls = 0;
      for (const e of performance.getEntriesByType("layout-shift"))
        if (!e.hadRecentInput) cls += e.value;
      return {
        fcp: fcp ? Math.round(fcp.startTime) : null,
        lcp: lcp || null,
        dcl: Math.round(nav.domContentLoadedEventEnd || 0),
        cls: +cls.toFixed(4),
        imgs: document.images.length,
        nodes: document.querySelectorAll("*").length,
      };
    });

    const kb = (n) => `${Math.round(n / 1024)}KB`;
    console.log(
      `${route.padEnd(16)} FCP ${String(m.fcp).padStart(5)}ms  LCP ${String(m.lcp).padStart(5)}ms  CLS ${String(m.cls).padStart(6)}  load ${String(loadMs).padStart(5)}ms  ` +
        `total ${kb(bytes.total).padStart(7)} (js ${kb(bytes.script)}, img ${kb(bytes.image)}, font ${kb(bytes.font)})  nodes ${m.nodes}`,
    );
    await page.close();
  }
  await browser.close();
})();
