import Image from "next/image";
import Link from "next/link";
import { site, coreCities, allCities } from "@/lib/site";
import { PhoneIcon } from "./Header";
import SwiftyLogo from "./Logo";

/*
 * Deliberately a server component with a CSS-only entrance.
 *
 * This used to animate in with framer-motion, which meant the headline sat
 * at opacity 0 until React hydrated — LCP 2.7s on a throttled phone against
 * an FCP of 1.4s. The markup now ships visible and the entrance runs in CSS,
 * so the fold paints with the HTML and needs no JS at all.
 */

/** Four-point sparkles — the brand motif, drifting over the photo. */
function Sparkle({
  className = "",
  delay = 0,
  size = 26,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`pointer-events-none absolute ${className}`}
      style={{ animation: `ss-twinkle 3.6s ease-in-out ${delay}s infinite` }}
      aria-hidden
    >
      <path
        d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12 7-1.2 11.4-5.6 12-12Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-[92px] lg:pt-[104px]">
      {/* soft brand wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[86%]"
        style={{
          background:
            "radial-gradient(1100px 620px at 78% 8%, rgba(42,171,226,0.14), transparent 62%), radial-gradient(820px 520px at 8% 30%, rgba(124,194,66,0.15), transparent 64%)",
        }}
      />
      <div className="bubbles pointer-events-none absolute inset-0 opacity-70" />

      <div
        className="
          relative mx-auto grid max-w-[1240px] gap-7 px-4 pb-10 pt-5 sm:px-6
          [grid-template-areas:'head''media''copy']
          lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-x-14 lg:pb-16 lg:pt-4
          lg:[grid-template-areas:'head_media''copy_media']
        "
      >
        {/* ── headline ─────────────────────────────────────── */}
        <div className="[grid-area:head] lg:self-end">
          <div className="rise inline-flex items-center gap-2 rounded-full bg-leaf-wash px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
            </span>
            <span className="eyebrow text-leaf-deep">
              Licensed · Insured · Smoke-free
            </span>
          </div>

          <h1
            className="rise mt-4 font-display text-[clamp(2.3rem,5.2vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
            style={{ animationDelay: "60ms" }}
          >
            Come home to a
            <br className="hidden sm:block" />{" "}
            <span className="relative inline-block">
              <span className="relative z-10">house that shines.</span>
              <span
                className="absolute inset-x-0 bottom-[0.08em] -z-0 h-[0.34em] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(124,194,66,0.42), rgba(42,171,226,0.35))",
                }}
              />
            </span>
          </h1>
        </div>

        {/* ── media ────────────────────────────────────────── */}
        <div className="fade-scale relative [grid-area:media]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] shadow-[0_30px_70px_-32px_rgba(21,24,28,0.42)] sm:aspect-[16/11] lg:aspect-[5/4]">
            <Image
              src="/img/hero-bright.jpg"
              alt="A bright, freshly cleaned living room with sunlight falling across the floor"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 46vw"
              className="object-cover"
            />
            <Sparkle className="left-[8%] top-[14%] text-white/90" delay={0} size={30} />
            <Sparkle className="right-[14%] top-[26%] text-white/80" delay={1.1} size={20} />
            <Sparkle className="right-[26%] bottom-[18%] text-white/85" delay={2.1} size={24} />
          </div>

          {/* the two of them, named — this is a two-woman company */}
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_36px_-16px_rgba(21,24,28,0.34)] sm:left-6">
            <SwiftyLogo withTools={false} className="h-11 w-auto" />
            <div className="border-l border-mist-2 pl-3">
              <p className="font-display text-[13.5px] font-bold leading-tight text-ink">
                {site.ownerFirst} &amp; {site.partnerFirst}
              </p>
              <p className="text-[12px] leading-tight text-slate">
                Owners &amp; cleaners
              </p>
            </div>
          </div>
        </div>

        {/* ── copy + CTAs ──────────────────────────────────── */}
        <div className="mt-4 [grid-area:copy] lg:mt-0 lg:self-start">
          <p
            className="rise max-w-[40ch] text-[17px] leading-relaxed text-slate sm:text-[18.5px]"
            style={{ animationDelay: "120ms" }}
          >
            {site.owner} and {site.partner} clean houses and businesses across{" "}
            {site.areaLabel}. Two people, every visit, who learn your home once
            and keep it that way.
          </p>

          <div
            className="rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "180ms" }}
          >
            <Link href="/#build" className="btn btn-leaf w-full text-[16px] sm:w-auto">
              Build my clean
            </Link>
            <a
              href={site.phoneHref}
              className="btn btn-outline w-full text-[16px] sm:w-auto"
              data-analytics="hero-call"
            >
              <PhoneIcon className="h-[17px] w-[17px]" />
              {site.phone}
            </a>
          </div>

          <p
            className="rise mt-6 text-[14.5px] leading-relaxed text-slate/90"
            style={{ animationDelay: "240ms" }}
          >
            No contracts, no packages you didn&rsquo;t ask for. Tell them what
            matters and they price that.
          </p>
        </div>
      </div>

      {/* ── towns strip ──────────────────────────────────── */}
      <div className="relative border-y border-mist-2 bg-mist py-3.5">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="eyebrow shrink-0 pl-4 text-slate/50 sm:pl-6">
            Cleaning in
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex w-max animate-[ss-marquee_42s_linear_infinite] motion-reduce:animate-none">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex" aria-hidden={dup === 1}>
                  {allCities.map((c) => (
                    <span
                      key={c}
                      className={`whitespace-nowrap px-4 font-display text-[15px] font-bold ${
                        coreCities.includes(c as (typeof coreCities)[number])
                          ? "text-leaf-deep"
                          : "text-slate/45"
                      }`}
                    >
                      {c}
                      <span className="pl-4 text-sky/40">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-mist via-mist/85 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-mist to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
