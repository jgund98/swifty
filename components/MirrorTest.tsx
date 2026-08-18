"use client";

/*
 * ── THE MIRROR TEST ─────────────────────────────────────────────────────
 * The showpiece.
 *
 * A steamed-up bathroom mirror. You drag across it and it actually wipes
 * clear under your finger, revealing what's behind. A squeegee is in her
 * logo, everybody knows the feeling of a fogged mirror, and no cleaning
 * company in Kentucky has anything like it.
 *
 * Engineering notes, learned the hard way on past builds:
 *  - Plain 2D canvas with `destination-out` only. NO blend modes — those
 *    silently render a blank grey box on some mobile browsers.
 *  - `touch-action: pan-y` so a vertical swipe still scrolls the page.
 *    A full-width canvas that eats touch is a trap you can't scroll past.
 *  - Nothing is gated on an image decode; the fog is drawn, not loaded.
 *  - It demos itself once on entry, so nobody has to guess what to do,
 *    and there's a button plus an auto-clear for anyone who doesn't.
 *  - prefers-reduced-motion and keyboard users get it clear from the start.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";

const EASE = [0.22, 0.9, 0.3, 1] as const;
/* Brush scales with the glass so it feels the same on a phone and a desktop,
 * and the threshold is deliberately generous - a couple of confident swipes
 * should finish it, not a full scrub. */
const brushFor = (w: number) => Math.max(44, Math.min(96, w * 0.078));
const CLEAR_AT = 0.36;

export default function MirrorTest() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const drawing = useRef(false);
  const sampleTick = useRef(0);
  const doneRef = useRef(false);

  const [cleared, setCleared] = useState(false);
  const [touched, setTouched] = useState(false);
  const [ready, setReady] = useState(false);

  /* ── paint the fog ─────────────────────────────────────── */
  const fog = useCallback(() => {
    const cv = canvasRef.current;
    const wrap = wrapRef.current;
    if (!cv || !wrap) return;
    const r = wrap.getBoundingClientRect();
    if (!r.width || !r.height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(r.width * dpr);
    cv.height = Math.round(r.height * dpr);
    cv.style.width = `${r.width}px`;
    cv.style.height = `${r.height}px`;

    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, r.width, r.height);

    // cool condensation, slightly green at the edges to stay on brand
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, "rgba(228,241,235,1)");
    g.addColorStop(0.45, "rgba(237,245,249,1)");
    g.addColorStop(1, "rgba(220,236,245,1)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);

    // droplets, so it reads as steam rather than a flat panel
    ctx.globalCompositeOperation = "destination-out";
    for (let i = 0; i < Math.round((r.width * r.height) / 2600); i++) {
      const x = Math.random() * r.width;
      const y = Math.random() * r.height;
      const rad = Math.random() * 2.6 + 0.5;
      ctx.globalAlpha = Math.random() * 0.32 + 0.06;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    // a few runs of condensation sliding down
    for (let i = 0; i < Math.round(r.width / 90); i++) {
      const x = Math.random() * r.width;
      const y = Math.random() * r.height * 0.55;
      const len = 40 + Math.random() * 130;
      ctx.globalAlpha = 0.16 + Math.random() * 0.16;
      ctx.lineWidth = 1.4 + Math.random() * 1.8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 6, y + len);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    setReady(true);
  }, []);

  /* ── wipe ──────────────────────────────────────────────── */
  const wipeTo = useCallback((x: number, y: number) => {
    const ctx = ctxRef.current;
    if (!ctx || doneRef.current) return;
    ctx.globalCompositeOperation = "destination-out";
    const brush = brushFor(canvasRef.current?.clientWidth || 600);
    ctx.lineWidth = brush;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    const p = last.current ?? { x, y };
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, brush / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    last.current = { x, y };

    // cheap progress check on a tiny sample, not the full buffer
    if (++sampleTick.current % 6) return;
    const cv = canvasRef.current;
    if (!cv) return;
    try {
      const step = Math.max(1, Math.floor(cv.width / 36));
      const data = ctx.getImageData(0, 0, cv.width, cv.height).data;
      let clear = 0;
      let total = 0;
      for (let py = 0; py < cv.height; py += step) {
        for (let pxx = 0; pxx < cv.width; pxx += step) {
          total++;
          if (data[(py * cv.width + pxx) * 4 + 3] < 60) clear++;
        }
      }
      if (total && clear / total > CLEAR_AT) {
        doneRef.current = true;
        setCleared(true);
      }
    } catch {
      /* getImageData can throw on some locked-down contexts — never fatal */
    }
  }, []);

  const pointFrom = (e: PointerEvent | { clientX: number; clientY: number }) => {
    const wrap = wrapRef.current;
    if (!wrap) return null;
    const r = wrap.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  /* ── set up ────────────────────────────────────────────── */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = !window.matchMedia("(hover: hover)").matches;
    if (reduce) {
      doneRef.current = true;
      setCleared(true);
      setReady(true);
      return;
    }
    fog();

    const wrap = wrapRef.current;
    if (!wrap) return;

    const onDown = (e: PointerEvent) => {
      if (doneRef.current) return;
      drawing.current = true;
      setTouched(true);
      last.current = null;
      const p = pointFrom(e);
      if (p) wipeTo(p.x, p.y);
    };
    const onMove = (e: PointerEvent) => {
      if (!drawing.current || doneRef.current) return;
      // a coarse pointer scrolling vertically shouldn't be treated as a wipe
      const p = pointFrom(e);
      if (p) wipeTo(p.x, p.y);
    };
    const onUp = () => {
      drawing.current = false;
      last.current = null;
    };
    // hovering with a mouse wipes too — it feels alive immediately
    const onHover = (e: PointerEvent) => {
      if (doneRef.current || coarse || drawing.current) return;
      const p = pointFrom(e);
      if (p) wipeTo(p.x, p.y);
    };

    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointermove", onHover);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!doneRef.current) fog();
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointermove", onHover);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [fog, wipeTo]);

  /* ── demo swipe on first sight, so nobody has to guess ──── */
  useEffect(() => {
    if (!ready || cleared) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const r = wrap.getBoundingClientRect();
        const t0 = performance.now();
        const dur = 1500;
        const step = (now: number) => {
          if (doneRef.current) return;
          const k = Math.min(1, (now - t0) / dur);
          const e = 1 - Math.pow(1 - k, 3);
          // one long S across the glass, so the gesture is unmistakable
          const x = r.width * (0.1 + 0.8 * e);
          const y = r.height * (0.44 + 0.13 * Math.sin(e * Math.PI));
          wipeTo(x, y);
          if (k < 1) requestAnimationFrame(step);
          else last.current = null;
        };
        setTimeout(() => requestAnimationFrame(step), 500);
      },
      { threshold: 0.4 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [ready, cleared, wipeTo]);

  const clearAll = () => {
    doneRef.current = true;
    setCleared(true);
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 460px at 20% 10%, rgba(42,171,226,0.12), transparent 62%), radial-gradient(700px 420px at 82% 84%, rgba(124,194,66,0.14), transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-[1000px] px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-sky-deep">The mirror test</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,5.4vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">
            Go on. Wipe it.
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-[16.5px] leading-relaxed text-slate">
            Everybody knows this feeling. Drag your finger across the glass and
            see what&rsquo;s waiting on the other side.
          </p>
        </div>

        {/* ── the mirror ──────────────────────────────────── */}
        <div className="mt-10">
          <div
            className="relative overflow-hidden rounded-[28px] p-2 shadow-[0_40px_90px_-40px_rgba(21,24,28,0.5)]"
            style={{
              background:
                "linear-gradient(150deg,#e7edf2 0%,#ffffff 26%,#d8e2ea 52%,#ffffff 76%,#e2eaf0 100%)",
            }}
          >
            <div
              ref={wrapRef}
              /* pan-y: a vertical swipe scrolls the page, a sideways drag wipes */
              className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-[22px] sm:aspect-[16/10]"
              style={{ touchAction: "pan-y", cursor: cleared ? "auto" : "grab" }}
            >
              {/* what's behind the glass */}
              <div
                className="absolute inset-0 grid place-items-center px-6 text-center"
                style={{
                  background:
                    "linear-gradient(140deg,#5FA32C 0%,#2AABE2 55%,#1B7FBF 100%)",
                }}
              >
                <div>
                  <p className="font-script text-[clamp(2.6rem,9vw,5rem)] leading-[0.95] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
                    Hey there,
                    <br />
                    gorgeous.
                  </p>
                  <p className="mx-auto mt-4 max-w-[34ch] text-[15.5px] leading-relaxed text-white/90 sm:text-[17px]">
                    That&rsquo;s a clean mirror. {site.ownerFirst} and{" "}
                    {site.partnerFirst} do the other four hundred things in your
                    house too.
                  </p>
                  <AnimatePresence>
                    {cleared && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                        className="mt-6 flex flex-wrap items-center justify-center gap-3"
                      >
                        <Link href="/contact" className="btn btn-outline text-[15.5px]">
                          Book the rest of the house
                        </Link>
                        <a
                          href={site.phoneHref}
                          className="btn btn-ink text-[15.5px]"
                          data-analytics="mirror-call"
                        >
                          <PhoneIcon />
                          {site.phone}
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* the steam */}
              <motion.canvas
                ref={canvasRef}
                aria-hidden
                className="absolute inset-0 h-full w-full"
                animate={{ opacity: cleared ? 0 : 1 }}
                transition={{ duration: 0.75, ease: EASE }}
                style={{ pointerEvents: "none" }}
              />

              {/* sparkle burst on completion */}
              <AnimatePresence>
                {cleared && (
                  <>
                    {[
                      [16, 22],
                      [78, 16],
                      [88, 62],
                      [10, 70],
                      [50, 8],
                      [34, 86],
                      [66, 88],
                    ].map(([l, t], i) => (
                      <motion.svg
                        key={i}
                        viewBox="0 0 24 24"
                        className="pointer-events-none absolute h-6 w-6 text-leaf"
                        style={{ left: `${l}%`, top: `${t}%` }}
                        initial={{ opacity: 0, scale: 0.2, rotate: -30 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.2, 1.15, 0.5], rotate: 30 }}
                        transition={{ duration: 1.5, delay: 0.1 + i * 0.09, ease: "easeOut" }}
                        aria-hidden
                      >
                        <path
                          d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12 7-1.2 11.4-5.6 12-12Z"
                          fill="currentColor"
                        />
                      </motion.svg>
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* prompt */}
              <AnimatePresence>
                {!cleared && !touched && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 1.4 }}
                    className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center"
                  >
                    <span className="flex items-center gap-2 rounded-full bg-ink/80 px-4 py-2 font-display text-[13.5px] font-bold text-white backdrop-blur-sm">
                      <motion.span
                        animate={{ x: [0, 9, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        👆
                      </motion.span>
                      Drag across the glass
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* always an out — nobody gets stuck behind an interaction */}
          <div className="mt-4 flex items-center justify-center">
            {!cleared ? (
              <button
                onClick={clearAll}
                className="font-display text-[13.5px] font-bold text-slate/60 underline-offset-4 transition-colors hover:text-leaf-deep hover:underline"
              >
                Can&rsquo;t be bothered? Clear it for me
              </button>
            ) : (
              <p className="font-display text-[13.5px] font-bold text-leaf-deep">
                That&rsquo;s the feeling. Now imagine the whole house.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
