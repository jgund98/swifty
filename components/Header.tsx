"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SwiftyWordmark } from "./Logo";
import { site, services } from "@/lib/site";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/service-area", label: "Where We Clean" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Get a Quote" },
];

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6.6 3h-.9A2.7 2.7 0 0 0 3 5.7C3 14.7 9.3 21 18.3 21a2.7 2.7 0 0 0 2.7-2.7v-.9a1.2 1.2 0 0 0-.83-1.14l-3.4-1.13a1.2 1.2 0 0 0-1.3.38l-.94 1.16a12.4 12.4 0 0 1-5.9-5.9l1.16-.94a1.2 1.2 0 0 0 .38-1.3L8.04 3.83A1.2 1.2 0 0 0 6.9 3h-.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_rgba(21,24,28,0.07),0_10px_30px_-22px_rgba(21,24,28,0.4)] backdrop-blur-xl"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center gap-3 px-4 py-2.5 sm:px-6 lg:gap-8">
        <Link href="/" aria-label={`${site.legalName} — home`} className="shrink-0">
          <SwiftyWordmark className="h-[52px] w-auto sm:h-[60px]" />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.slice(0, 3).map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-4 py-2 font-display text-[15px] font-semibold transition-colors ${
                pathname.startsWith(n.href)
                  ? "bg-leaf-wash text-leaf-deep"
                  : "text-slate hover:bg-mist hover:text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href={site.phoneHref}
            className="btn btn-outline hidden px-4 py-2.5 text-[14.5px] sm:inline-flex"
            data-analytics="header-call"
          >
            <PhoneIcon />
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="btn btn-leaf hidden px-5 py-2.5 text-[14.5px] md:inline-flex"
          >
            Get a Quote
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full bg-mist lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-[2.5px] w-5 rounded bg-ink transition-all duration-300 ${
                  open ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-[2.5px] w-5 rounded bg-ink transition-all duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2.5px] w-5 rounded bg-ink transition-all duration-300 ${
                  open ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 0.9, 0.3, 1] }}
            className="overflow-hidden border-t border-mist-2 bg-white lg:hidden"
          >
            <div className="max-h-[calc(100svh-84px)] overflow-y-auto px-4 pb-6 pt-3">
              <p className="eyebrow px-2 pb-1 pt-2 text-leaf-deep">Services</p>
              <div className="grid gap-0.5">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-xl px-3 py-2.5 font-display text-[16px] font-semibold text-slate transition-colors hover:bg-mist hover:text-ink"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
              <div className="my-3 h-px bg-mist-2" />
              <div className="grid gap-0.5">
                {nav.slice(1).map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="rounded-xl px-3 py-2.5 font-display text-[16px] font-semibold text-slate transition-colors hover:bg-mist hover:text-ink"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 grid gap-2">
                <a href={site.phoneHref} className="btn btn-sky w-full">
                  <PhoneIcon />
                  {site.phone}
                </a>
                <Link href="/contact" className="btn btn-leaf w-full">
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
