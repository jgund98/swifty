"use client";

/*
 * Swifty Shines Every Time — logo, rebuilt as vector.
 *
 * Her original is a low-resolution raster: bubbly script lettering with a
 * white keyline and a black outer, sitting in a fan of cleaning tools —
 * two spray bottles, a squeegee, a scrub brush, a sponge, a scrub pad, and
 * a scatter of bubbles. This redraws all of it so it stays sharp at any
 * size and can be recoloured.
 *
 * The script is Grand Hotel — a 1930s-style sign script with the same round
 * bowls, high ascenders and single-storey 'a' as her original. It's set with
 * a triple stroke (black outer, white keyline, green fill) via stacked
 * paint-order text, which is how the original gets its layered look.
 */

import { useId } from "react";

export const BRAND = {
  green: "#7CC242",
  greenDeep: "#5FA32C",
  greenLight: "#A8DB6E",
  blue: "#2AABE2",
  blueDeep: "#1B7FBF",
  blueLight: "#8FD8F2",
  ink: "#15181C",
} as const;

/* ── the tool fan that sits behind the lettering ─────────────── */
function Tools({ id }: { id: string }) {
  return (
    <g>
      {/* soft blue splash behind everything */}
      <path
        d="M196 150 C150 178 128 236 148 292 C166 342 150 384 176 424
           C206 470 286 486 344 462 C404 438 452 452 494 424
           C548 388 556 316 528 262 C500 208 512 156 470 124
           C420 86 340 92 288 110 C244 126 226 132 196 150 Z"
        fill={`url(#${id}-splash)`}
        opacity="0.55"
      />

      {/* ── green spray bottle, upper left ───────────────────── */}
      <g transform="translate(112 30) rotate(-18)">
        <rect x="18" y="72" width="78" height="104" rx="16" fill={BRAND.green} />
        <rect x="18" y="72" width="30" height="104" rx="15" fill={BRAND.greenLight} opacity="0.5" />
        <rect x="34" y="50" width="46" height="26" rx="6" fill={BRAND.greenDeep} />
        {[0, 8, 16, 24].map((d) => (
          <rect key={d} x="34" y={52 + d / 1.4} width="46" height="3.5" rx="1.75" fill={BRAND.green} />
        ))}
        <path d="M40 50 L40 30 Q40 18 54 18 L70 18 L70 32 L56 32 Q52 32 52 38 L52 50 Z" fill={BRAND.green} />
        <path d="M70 18 L104 6 L110 20 L74 32 Z" fill={BRAND.green} />
        <path d="M24 34 L44 26 L44 40 L24 46 Z" fill={BRAND.greenDeep} />
      </g>

      {/* ── blue spray bottle, top centre ────────────────────── */}
      <g transform="translate(342 4) rotate(8)">
        <rect x="16" y="78" width="82" height="112" rx="17" fill={BRAND.blue} />
        <rect x="16" y="78" width="30" height="112" rx="15" fill={BRAND.blueLight} opacity="0.55" />
        <rect x="32" y="54" width="50" height="28" rx="6" fill={BRAND.blueDeep} />
        {[0, 9, 18, 27].map((d) => (
          <rect key={d} x="32" y={56 + d / 1.5} width="50" height="3.5" rx="1.75" fill={BRAND.blue} />
        ))}
        <path d="M38 54 L38 32 Q38 20 52 20 L70 20 L70 34 L54 34 Q50 34 50 40 L50 54 Z" fill={BRAND.blue} />
        <path d="M70 20 L106 8 L112 22 L74 34 Z" fill={BRAND.blue} />
        <path d="M22 36 L44 28 L44 42 L22 48 Z" fill={BRAND.blueDeep} />
      </g>

      {/* ── squeegee, upper right ────────────────────────────── */}
      <g transform="translate(516 26) rotate(36)">
        <rect x="0" y="0" width="34" height="128" rx="10" fill={BRAND.blueLight} />
        <rect x="0" y="0" width="34" height="128" rx="10" fill={BRAND.blue} opacity="0.35" />
        <rect x="4" y="124" width="26" height="86" rx="8" fill={BRAND.blue} />
        <rect x="-4" y="200" width="42" height="20" rx="6" fill={BRAND.blueDeep} /><rect x="-8" y="216" width="50" height="62" rx="6" fill={BRAND.ink} />
        <rect x="-8" y="216" width="12" height="62" rx="4" fill={BRAND.blueLight} opacity="0.45" />
      </g>

      {/* ── scrub brush, left ────────────────────────────────── */}
      <g transform="translate(20 300) rotate(-40)">
        <rect x="0" y="26" width="150" height="34" rx="10" fill={BRAND.ink} />
        <rect x="0" y="26" width="150" height="12" rx="6" fill="#3A4048" />
        <rect x="6" y="0" width="128" height="30" rx="8" fill={BRAND.blueLight} />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={12 + i * 14} y="-16" width="7" height="20" rx="3.5" fill={BRAND.blue} />
        ))}
      </g>

      {/* ── green sponge, bottom left ────────────────────────── */}
      <g transform="translate(112 502)">
        <path
          d="M8 34 Q0 8 30 6 L188 0 Q220 0 216 30 L214 74 Q212 100 182 100 L36 104 Q6 104 6 76 Z"
          fill={BRAND.green}
        />
        <path
          d="M8 34 Q0 8 30 6 L188 0 Q220 0 216 30 L215 44 L6 52 Z"
          fill={BRAND.greenLight}
          opacity="0.55"
        />
        {[
          [46, 72],
          [86, 82],
          [128, 70],
          [168, 80],
          [66, 46],
          [108, 40],
          [150, 46],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill={BRAND.greenDeep} opacity="0.75" />
        ))}
      </g>

      {/* ── dark scrub pad, bottom right ─────────────────────── */}
      <g transform="translate(468 496) rotate(-7)">
        <path
          d="M6 30 Q0 6 28 4 L156 0 Q186 0 184 26 L182 66 Q180 90 152 92 L30 96 Q4 96 4 72 Z"
          fill={BRAND.ink}
        />
        {[
          [40, 62],
          [78, 70],
          [118, 58],
          [152, 66],
          [58, 34],
          [98, 28],
          [138, 34],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill={BRAND.blue} opacity="0.9" />
        ))}
      </g>

      {/* ── green scrubber block, right ──────────────────────── */}
      <g transform="translate(576 316) rotate(14)">
        <rect x="0" y="0" width="118" height="112" rx="10" fill={BRAND.green} />
        <rect x="0" y="0" width="118" height="112" rx="10" fill={BRAND.greenDeep} opacity="0.25" />
        {[26, 56, 86].map((x) => (
          <rect key={x} x={x} y="6" width="8" height="100" rx="4" fill={BRAND.greenLight} opacity="0.85" />
        ))}
        {[28, 58, 88].map((y) => (
          <rect key={y} x="6" y={y} width="106" height="8" rx="4" fill={BRAND.greenLight} opacity="0.85" />
        ))}
      </g>

      {/* ── bubbles ──────────────────────────────────────────── */}
      {[
        [86, 96, 22, BRAND.green],
        [128, 60, 13, BRAND.green],
        [64, 156, 15, BRAND.green],
        [104, 196, 9, BRAND.greenLight],
        [596, 148, 18, BRAND.blue],
        [640, 206, 11, BRAND.blueLight],
        [568, 252, 9, BRAND.blue],
        [286, 22, 12, BRAND.blueLight],
        [620, 92, 9, BRAND.green],
      ].map(([cx, cy, r, fill], i) => (
        <circle key={i} cx={cx as number} cy={cy as number} r={r as number} fill={fill as string} />
      ))}
    </g>
  );
}

/** Full logo: tools + script lockup. */
export function SwiftyLogo({
  className = "",
  withTools = true,
  title = "Swifty Shines Every Time",
}: {
  className?: string;
  withTools?: boolean;
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 720 640"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${uid}-splash`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={BRAND.blueLight} />
          <stop offset="55%" stopColor={BRAND.blue} stopOpacity="0.7" />
          <stop offset="100%" stopColor={BRAND.greenLight} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {withTools && <Tools id={uid} />}

      {/* ── the lockup ───────────────────────────────────────
          Each line is painted three times: a fat black outer, a white
          keyline, then the fill. paint-order:stroke keeps the strokes
          outside the glyph so the letterforms stay crisp. */}
      <g
        fontFamily="var(--font-script), 'Grand Hotel', cursive"
        textAnchor="middle"
        style={{ paintOrder: "stroke" }}
      >
        {/* Swifty — black fill, white keyline, green outer. Same for all three
            lines; it's the layering that gives the original its depth. */}
        <g transform="translate(348 292) rotate(-5)">
          <text fontSize="172" stroke={BRAND.green} strokeWidth="40" strokeLinejoin="round" fill="none">
            Swifty
          </text>
          <text fontSize="172" stroke="#fff" strokeWidth="24" strokeLinejoin="round" fill="none">
            Swifty
          </text>
          <text fontSize="172" fill={BRAND.ink}>
            Swifty
          </text>
        </g>

        {/* Shines */}
        <g transform="translate(336 412) rotate(-4)">
          <text fontSize="164" stroke={BRAND.green} strokeWidth="38" strokeLinejoin="round" fill="none">
            Shines
          </text>
          <text fontSize="164" stroke="#fff" strokeWidth="23" strokeLinejoin="round" fill="none">
            Shines
          </text>
          <text fontSize="164" fill={BRAND.ink}>
            Shines
          </text>
        </g>

        {/* Every Time */}
        <g transform="translate(356 548) rotate(-4)">
          <text fontSize="120" stroke={BRAND.green} strokeWidth="30" strokeLinejoin="round" fill="none">
            Every Time
          </text>
          <text fontSize="120" stroke="#fff" strokeWidth="17" strokeLinejoin="round" fill="none">
            Every Time
          </text>
          <text fontSize="120" fill={BRAND.ink}>
            Every Time
          </text>
        </g>
      </g>
    </svg>
  );
}

/** Compact horizontal lockup for the header — lettering only. */
export function SwiftyWordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 210"
      className={className}
      role="img"
      aria-label="Swifty Shines Every Time"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fontFamily="var(--font-script), 'Grand Hotel', cursive"
        textAnchor="middle"
        style={{ paintOrder: "stroke" }}
      >
        <g transform="translate(280 84) rotate(-3)">
          <text fontSize="104" stroke={BRAND.ink} strokeWidth="19" strokeLinejoin="round" fill="none">
            Swifty Shines
          </text>
          <text fontSize="104" stroke="#fff" strokeWidth="10" strokeLinejoin="round" fill="none">
            Swifty Shines
          </text>
          <text fontSize="104" fill={BRAND.green}>
            Swifty Shines
          </text>
        </g>
        <g transform="translate(288 168) rotate(-3)">
          <text fontSize="72" stroke={BRAND.ink} strokeWidth="15" strokeLinejoin="round" fill="none">
            Every Time
          </text>
          <text fontSize="72" stroke="#fff" strokeWidth="8" strokeLinejoin="round" fill="none">
            Every Time
          </text>
          <text fontSize="72" fill={BRAND.ink}>
            Every Time
          </text>
        </g>
      </g>
    </svg>
  );
}

export default SwiftyLogo;
