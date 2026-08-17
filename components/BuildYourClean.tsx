"use client";

/*
 * ── BUILD YOUR CLEAN ────────────────────────────────────────────────────
 * The showpiece.
 *
 * Ashley's own pitch, in her own posts, is "we will customize a cleaning
 * package to fit your needs and budget." Every competitor sells three tiers
 * in a pricing table. So this site sells the thing she actually does: you
 * pick the rooms and the extras, the estimate assembles itself, and it hands
 * her a job sheet instead of a blank "tell us about your project" box.
 *
 * Built in DOM and SVG — no canvas, nothing that traps a scroll, nothing
 * that can silently fail to paint on a phone.
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";

const EASE = [0.22, 0.9, 0.3, 1] as const;

type Room = { id: string; label: string; mins: number };

const ROOMS: Room[] = [
  { id: "kitchen", label: "Kitchen", mins: 60 },
  { id: "bath", label: "Bathrooms", mins: 45 },
  { id: "living", label: "Living areas", mins: 40 },
  { id: "bedrooms", label: "Bedrooms", mins: 45 },
  { id: "floors", label: "All floors", mins: 45 },
  { id: "laundry", label: "Laundry room", mins: 15 },
];

const EXTRAS: Room[] = [
  { id: "oven", label: "Inside the oven", mins: 45 },
  { id: "fridge", label: "Inside the fridge", mins: 35 },
  { id: "windows", label: "Interior windows", mins: 50 },
  { id: "baseboards", label: "Baseboards & blinds", mins: 50 },
  { id: "cabinets", label: "Inside cabinets", mins: 30 },
  { id: "cans", label: "Trash cans scrubbed", mins: 25 },
  { id: "pets", label: "Pet sitting while away", mins: 0 },
];

const FREQUENCY = [
  { id: "weekly", label: "Every week" },
  { id: "biweekly", label: "Every other week" },
  { id: "monthly", label: "Once a month" },
  { id: "once", label: "Just the once" },
];

const SIZE = [
  { id: "small", label: "1–2 bedrooms", mult: 0.8 },
  { id: "mid", label: "3 bedrooms", mult: 1 },
  { id: "large", label: "4+ bedrooms", mult: 1.3 },
  { id: "biz", label: "It's a business", mult: 1.2 },
];

export default function BuildYourClean() {
  const [rooms, setRooms] = useState<string[]>(["kitchen", "bath", "floors"]);
  const [extras, setExtras] = useState<string[]>([]);
  const [freq, setFreq] = useState("biweekly");
  const [size, setSize] = useState("mid");

  const toggle = (
    list: string[],
    set: (v: string[]) => void,
    id: string,
  ) => set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const { hours, label } = useMemo(() => {
    const mult = SIZE.find((s) => s.id === size)?.mult ?? 1;
    const base =
      ROOMS.filter((r) => rooms.includes(r.id)).reduce((a, r) => a + r.mins, 0) +
      EXTRAS.filter((r) => extras.includes(r.id)).reduce((a, r) => a + r.mins, 0);
    const total = (base * mult) / 60;
    // Two people on site, so wall-clock is roughly half the labour.
    const onSite = Math.max(1, total / 2);
    const lo = Math.floor(onSite * 2) / 2;
    const hi = lo + (onSite > 2.5 ? 1 : 0.5);
    return {
      hours: onSite,
      label: `${lo === Math.floor(lo) ? lo : lo.toFixed(1)}–${hi === Math.floor(hi) ? hi : hi.toFixed(1)} hours`,
    };
  }, [rooms, extras, size]);

  const picked = rooms.length + extras.length;
  const summary = [
    ...ROOMS.filter((r) => rooms.includes(r.id)).map((r) => r.label),
    ...EXTRAS.filter((r) => extras.includes(r.id)).map((r) => r.label),
  ];

  const query = new URLSearchParams({
    rooms: rooms.join(","),
    extras: extras.join(","),
    freq,
    size,
  }).toString();

  return (
    <section
      id="build"
      className="relative scroll-mt-24 overflow-hidden bg-mist py-20 sm:py-24"
    >
      <div className="bubbles pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1120px] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-leaf-deep">Build your clean</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,5.4vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">
            You pick what matters.
            <br className="hidden sm:block" /> She prices that.
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[16.5px] leading-relaxed text-slate">
            Most cleaners hand you three packages and hope one fits.{" "}
            {site.ownerFirst} builds the visit around what actually bothers you
            — so tick the things you want done and send it over.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          {/* ── the picker ───────────────────────────────── */}
          <div className="card p-6 sm:p-8">
            <Group label="How big is the place?">
              {SIZE.map((s) => (
                <Chip key={s.id} on={size === s.id} onClick={() => setSize(s.id)}>
                  {s.label}
                </Chip>
              ))}
            </Group>

            <Group label="Which rooms?" className="mt-7">
              {ROOMS.map((r) => (
                <Chip
                  key={r.id}
                  on={rooms.includes(r.id)}
                  onClick={() => toggle(rooms, setRooms, r.id)}
                >
                  {r.label}
                </Chip>
              ))}
            </Group>

            <Group label="Anything extra?" className="mt-7">
              {EXTRAS.map((r) => (
                <Chip
                  key={r.id}
                  on={extras.includes(r.id)}
                  onClick={() => toggle(extras, setExtras, r.id)}
                  tone="sky"
                >
                  {r.label}
                </Chip>
              ))}
            </Group>

            <Group label="How often?" className="mt-7">
              {FREQUENCY.map((f) => (
                <Chip key={f.id} on={freq === f.id} onClick={() => setFreq(f.id)}>
                  {f.label}
                </Chip>
              ))}
            </Group>
          </div>

          {/* ── the running estimate ─────────────────────── */}
          <div className="card overflow-hidden lg:sticky lg:top-28">
            <div className="bg-ink px-6 py-5">
              <p className="eyebrow text-white/50">Your visit</p>
              <div className="mt-2 flex items-end gap-2">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="font-display text-[30px] font-extrabold leading-none text-white"
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                Rough time on site with both of them working. The price comes
                from {site.ownerFirst}, not a calculator.
              </p>
            </div>

            {/* fill meter — the bar fills as the job grows */}
            <div className="px-6 pt-5">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-mist-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg,#8ccf50,#2aabe2)",
                  }}
                  animate={{ width: `${Math.min(100, (hours / 6) * 100)}%` }}
                  transition={{ duration: 0.45, ease: EASE }}
                />
              </div>
            </div>

            <div className="px-6 py-5">
              <p className="eyebrow text-slate/50">
                {picked} {picked === 1 ? "item" : "items"} on the list
              </p>
              {summary.length === 0 ? (
                <p className="mt-3 text-[14.5px] italic text-slate/70">
                  Nothing picked yet — tick a few things on the left.
                </p>
              ) : (
                <ul className="mt-3 grid gap-1.5">
                  {summary.map((s) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22 }}
                      className="flex items-start gap-2 text-[14.5px] leading-snug text-ink"
                    >
                      <Tick />
                      {s}
                    </motion.li>
                  ))}
                </ul>
              )}

              <div className="mt-6 grid gap-2.5">
                <Link
                  href={`/contact?${query}`}
                  className="btn btn-leaf w-full text-[15.5px]"
                >
                  Send this to {site.ownerFirst}
                </Link>
                <a
                  href={site.phoneHref}
                  className="btn btn-outline w-full text-[15px]"
                  data-analytics="build-call"
                >
                  <PhoneIcon />
                  Or just call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Group({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="eyebrow mb-3 text-slate/55">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  on,
  onClick,
  children,
  tone = "leaf",
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone?: "leaf" | "sky";
}) {
  const active =
    tone === "sky"
      ? "border-sky bg-sky-wash text-sky-deep"
      : "border-leaf bg-leaf-wash text-leaf-deep";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border-2 px-4 py-2.5 font-display text-[14.5px] font-semibold transition-all duration-200 ${
        on
          ? `${active} shadow-[0_6px_16px_-8px_rgba(21,24,28,0.35)]`
          : "border-mist-2 bg-white text-slate hover:border-slate/30 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[3px] h-4 w-4 shrink-0" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="#7CC242" />
      <path
        d="M6 10.4l2.6 2.6L14.2 7.4"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
