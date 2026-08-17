"use client";

/*
 * The territory, drawn from real coordinates. Middleburg is the hub; every
 * town sits at its true latitude and longitude relative to it, so the shape
 * you see is the shape of the drive.
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";

type Town = { name: string; lat: number; lng: number; core?: boolean; side?: "left" | "right" };

const TOWNS: Town[] = [
  { name: "Middleburg", lat: 37.318, lng: -84.892, core: true, side: "right" },
  { name: "Liberty", lat: 37.319, lng: -84.939, core: true, side: "left" },
  { name: "Danville", lat: 37.645, lng: -84.772, core: true, side: "right" },
  { name: "Somerset", lat: 37.092, lng: -84.604, core: true, side: "right" },
  { name: "Stanford", lat: 37.531, lng: -84.662, core: true, side: "right" },
  { name: "Lebanon", lat: 37.569, lng: -85.253, core: true, side: "left" },
  { name: "Crab Orchard", lat: 37.462, lng: -84.503, core: true, side: "right" },

  { name: "Hustonville", lat: 37.469, lng: -84.845, side: "left" },
  { name: "Junction City", lat: 37.585, lng: -84.799, side: "left" },
  { name: "Perryville", lat: 37.654, lng: -84.955, side: "left" },
  { name: "Science Hill", lat: 37.181, lng: -84.633, side: "right" },
  { name: "Eubank", lat: 37.283, lng: -84.652, side: "right" },
  { name: "Nancy", lat: 37.055, lng: -84.780, side: "left" },
  { name: "Russell Springs", lat: 37.055, lng: -85.088, side: "left" },
  { name: "Columbia", lat: 37.103, lng: -85.306, side: "left" },
  { name: "Campbellsville", lat: 37.343, lng: -85.341, side: "left" },
  { name: "Bradfordsville", lat: 37.494, lng: -85.146, side: "left" },
  { name: "Dunnville", lat: 37.211, lng: -84.936, side: "left" },
  { name: "Yosemite", lat: 37.335, lng: -84.797, side: "right" },
  { name: "Waynesburg", lat: 37.352, lng: -84.660, side: "right" },
];

const W = 840;
const H = 520;
const PAD_X = 110;
const PAD_Y = 56;
const LNG = [-85.42, -84.44];
const LAT = [36.99, 37.73];

const px = (lng: number) =>
  PAD_X + ((lng - LNG[0]) / (LNG[1] - LNG[0])) * (W - PAD_X * 2);
const py = (lat: number) =>
  PAD_Y + ((LAT[1] - lat) / (LAT[1] - LAT[0])) * (H - PAD_Y * 2);

export default function ServiceArea({ compact = false }: { compact?: boolean }) {
  const hub = TOWNS[0];
  const hx = px(hub.lng);
  const hy = py(hub.lat);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const extra = el.scrollWidth - el.clientWidth;
    if (extra > 0) el.scrollLeft = extra / 2;
  }, []);

  return (
    <section
      className={`relative overflow-hidden bg-mist ${
        compact ? "pb-20 pt-6 sm:pb-24" : "py-20 sm:py-24"
      }`}
    >
      <div className="bubbles pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div>
            {!compact && <p className="eyebrow text-sky-deep">Where they clean</p>}
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">
              About an hour
              <br className="hidden sm:block" /> in any direction.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[16.5px] leading-relaxed text-slate">
              They run out of {site.city} in {site.county} — which puts Liberty,
              Danville, Stanford and Somerset all inside a comfortable drive,
              and Lebanon and Columbia not much further.
            </p>
            <p className="mt-4 max-w-[42ch] text-[16.5px] leading-relaxed text-slate">
              Not sure if you&rsquo;re in range? Call and ask. The answer is
              usually yes.
            </p>
            {!compact && (
              <a href={site.phoneHref} className="btn btn-leaf mt-7 text-[16px]">
                <PhoneIcon className="h-[17px] w-[17px]" />
                {site.phone}
              </a>
            )}
          </div>

          {/* Plotted from real coordinates, so it can't just shrink — below sm
              it keeps a legible width and swipes sideways instead. */}
          <div
            ref={scroller}
            className="no-scrollbar relative -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0"
          >
            <div className="min-w-[600px] sm:min-w-0">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full"
                role="img"
                aria-label={`Towns served: ${TOWNS.map((t) => t.name).join(", ")}`}
              >
                <defs>
                  <radialGradient id="ss-hub">
                    <stop offset="0%" stopColor="#7CC242" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#7CC242" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="ss-spoke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7CC242" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#2AABE2" stopOpacity="0.12" />
                  </linearGradient>
                </defs>

                {[110, 190, 262].map((r, i) => (
                  <motion.circle
                    key={r}
                    cx={hx}
                    cy={hy}
                    r={r}
                    fill="none"
                    stroke="rgba(42,171,226,0.22)"
                    strokeWidth="1"
                    strokeDasharray="3 7"
                    initial={{ opacity: 0, scale: 0.86 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.12 }}
                    style={{ transformOrigin: `${hx}px ${hy}px` }}
                  />
                ))}

                <circle cx={hx} cy={hy} r="160" fill="url(#ss-hub)" />

                {TOWNS.slice(1).map((t, i) => (
                  <motion.line
                    key={t.name}
                    x1={hx}
                    y1={hy}
                    x2={px(t.lng)}
                    y2={py(t.lat)}
                    stroke="url(#ss-spoke)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.15 + i * 0.03 }}
                  />
                ))}

                {TOWNS.map((t, i) => {
                  const x = px(t.lng);
                  const y = py(t.lat);
                  const isHub = i === 0;
                  const anchor = t.side === "left" ? "end" : "start";
                  const dx = t.side === "left" ? -11 : 11;
                  return (
                    <motion.g
                      key={t.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.03 }}
                    >
                      {isHub && (
                        <circle
                          cx={x}
                          cy={y}
                          r="13"
                          fill="none"
                          stroke="#5FA32C"
                          strokeWidth="1.5"
                          opacity="0.55"
                        />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHub ? 6.5 : t.core ? 5 : 3.2}
                        fill={isHub ? "#5FA32C" : t.core ? "#2AABE2" : "#9AA6B2"}
                      />
                      <text
                        x={x + dx}
                        y={y + 4.5}
                        textAnchor={anchor}
                        className={
                          isHub
                            ? "fill-[#3E7A18] font-display text-[17px] font-extrabold"
                            : t.core
                              ? "fill-[#15181C] font-display text-[14px] font-bold"
                              : "fill-[#7B8794] font-display text-[12px] font-semibold"
                        }
                      >
                        {t.name}
                      </text>
                    </motion.g>
                  );
                })}

                <text
                  x={hx}
                  y={hy - 22}
                  textAnchor="middle"
                  className="fill-[#5FA32C] font-display text-[10px] font-bold tracking-[0.22em]"
                >
                  HOME BASE
                </text>
              </svg>
            </div>
          </div>
        </div>
        <p className="mt-2 text-center font-display text-[11px] font-bold uppercase tracking-[0.2em] text-slate/40 sm:hidden">
          Swipe the map →
        </p>
      </div>
    </section>
  );
}
