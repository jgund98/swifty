"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";
import SwiftyLogo from "./Logo";

/*
 * ⚠️ JORDAN: there is no photo of Ashley or Summer anywhere public, so this
 * leans on the logo instead of borrowing a stranger's face. A real photo of
 * the two of them is the biggest upgrade left on this site.
 */

const KEY = "ss-owner-seen";

export default function OwnerPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      sessionStorage.setItem(KEY, "1");
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) fire();
    };
    const timer = setTimeout(fire, 10000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/55 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 0.9, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`A note from ${site.owner}`}
            className="relative w-full max-w-[430px] overflow-hidden rounded-3xl bg-white shadow-[0_40px_90px_-30px_rgba(21,24,28,0.55)]"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-mist text-slate transition-colors hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="bg-leaf-wash px-6 pb-4 pt-7">
              <SwiftyLogo className="mx-auto h-[150px] w-auto" />
            </div>

            <div className="px-6 pb-6 pt-5">
              <h3 className="font-display text-[25px] font-extrabold leading-tight">
                Just text {site.ownerFirst}.
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slate">
                No forms, no waiting on a quote. Tell her the town you&rsquo;re
                in and what needs doing, and she&rsquo;ll come back with a
                number and a day.
              </p>

              <div className="mt-5 grid gap-2.5">
                <a href={site.smsHref} className="btn btn-leaf w-full">
                  Text {site.phone}
                </a>
                <a href={site.phoneHref} className="btn btn-outline w-full text-[15px]">
                  <PhoneIcon />
                  Rather call
                </a>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-4 w-full text-center text-[13.5px] text-slate/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                No thanks — just looking around
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
