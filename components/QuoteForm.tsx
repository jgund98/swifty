"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, coreCities } from "@/lib/site";
import { PhoneIcon } from "./Header";

/*
 * ⚠️ JORDAN: submit POSTs to /api/quote, which validates and logs. Wire it
 * to the Brevo drop-in (epic\client-email-protocol) plus an SMS to Ashley
 * before launch or these leads go nowhere.
 */

const EASE = [0.22, 0.9, 0.3, 1] as const;

const JOBS = [
  { id: "house", label: "Regular house cleaning" },
  { id: "deep", label: "One deep clean" },
  { id: "move", label: "Move-in or move-out" },
  { id: "commercial", label: "Office or business" },
  { id: "rental", label: "Rental turnover" },
  { id: "cans", label: "Trash cans" },
  { id: "boat", label: "Houseboat" },
  { id: "pets", label: "Pet sitting" },
];

const WHEN = [
  { id: "asap", label: "As soon as you can" },
  { id: "week", label: "This week" },
  { id: "month", label: "Within a month" },
  { id: "flexible", label: "No rush" },
];

type Data = {
  jobs: string[];
  when: string;
  city: string;
  size: string;
  name: string;
  phone: string;
  notes: string;
};

const EMPTY: Data = {
  jobs: [],
  when: "",
  city: "",
  size: "",
  name: "",
  phone: "",
  notes: "",
};

export default function QuoteForm({ prefill }: { prefill?: Partial<Data> }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(EMPTY);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefill) setData((d) => ({ ...d, ...prefill }));
  }, [prefill]);

  useEffect(() => {
    if (sent && doneRef.current) {
      doneRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [sent]);

  const toggleJob = (id: string) =>
    setData((d) => ({
      ...d,
      jobs: d.jobs.includes(id)
        ? d.jobs.filter((x) => x !== id)
        : [...d.jobs, id],
    }));

  const canNext =
    step === 0
      ? data.jobs.length > 0
      : step === 1
        ? !!data.when && data.city.trim().length > 0
        : data.name.trim().length > 0 && data.phone.replace(/\D/g, "").length >= 10;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canNext || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad");
      setSent(true);
    } catch {
      setError(
        `Something went wrong sending that. Please text ${site.ownerFirst} at ${site.phone} instead.`,
      );
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div
        ref={doneRef}
        className="mx-auto max-w-[560px] scroll-mt-24 rounded-3xl bg-leaf-wash p-8 text-center sm:p-10"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <h3 className="mt-5 font-display text-[26px] font-extrabold leading-tight">
          Got it, {data.name.split(" ")[0]}.
        </h3>
        <p className="mx-auto mt-3 max-w-[38ch] text-[16px] leading-relaxed text-slate">
          {site.owner} will get back to you at {data.phone} herself — usually
          the same day.
        </p>
        <p className="mt-5 text-[14.5px] text-slate/80">In a hurry?</p>
        <a href={site.phoneHref} className="btn btn-leaf mt-3 text-[16px]">
          <PhoneIcon />
          {site.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card mx-auto max-w-[720px] overflow-hidden">
      <div className="relative h-[5px] w-full bg-mist-2">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ background: "linear-gradient(90deg,#8ccf50,#2aabe2)" }}
          animate={{ width: `${((step + 1) / 3) * 100}%` }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      </div>

      <div className="p-6 sm:p-8">
        <p className="eyebrow text-leaf-deep">
          Step {step + 1} of 3
          <span className="pl-3 text-slate/50">
            {step === 0 ? "What you need" : step === 1 ? "Where and when" : "How to reach you"}
          </span>
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.26, ease: EASE }}
          >
            {step === 0 && (
              <div className="mt-4">
                <h3 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-extrabold leading-tight">
                  What needs cleaning?
                </h3>
                <p className="mt-2 text-[15px] text-slate">
                  Tick anything that applies. You can change your mind later.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {JOBS.map((j) => (
                    <Chip
                      key={j.id}
                      on={data.jobs.includes(j.id)}
                      onClick={() => toggleJob(j.id)}
                    >
                      {j.label}
                    </Chip>
                  ))}
                </div>
                <Field label="How big is the place?" optional>
                  <input
                    value={data.size}
                    onChange={(e) => setData({ ...data, size: e.target.value })}
                    placeholder="3 bedrooms, 2 baths"
                    className={inputCls}
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="mt-4">
                <h3 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-extrabold leading-tight">
                  Where are you, and how soon?
                </h3>
                <p className="mt-2 text-[15px] text-slate">
                  They cover {site.areaLabel} — if you&rsquo;re near the edge,
                  say so and they&rsquo;ll tell you straight.
                </p>

                <Field label="Your town">
                  <input
                    list="ss-cities"
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    placeholder={coreCities[0]}
                    className={inputCls}
                  />
                  <datalist id="ss-cities">
                    {coreCities.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>

                <p className="eyebrow mt-6 text-slate/50">You&rsquo;d like it</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {WHEN.map((w) => (
                    <Chip
                      key={w.id}
                      on={data.when === w.id}
                      onClick={() => setData({ ...data, when: w.id })}
                    >
                      {w.label}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-4">
                <h3 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-extrabold leading-tight">
                  Where does {site.ownerFirst} reach you?
                </h3>
                <p className="mt-2 text-[15px] text-slate">
                  First name is fine. She replies herself.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Name">
                    <input
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      placeholder="First name is fine"
                      autoComplete="given-name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      placeholder="(606) 555-0134"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Anything she should know" optional>
                  <textarea
                    value={data.notes}
                    onChange={(e) => setData({ ...data, notes: e.target.value })}
                    rows={3}
                    placeholder="Two dogs, and the kitchen is the main thing…"
                    className={`${inputCls} resize-y`}
                  />
                </Field>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <p className="mt-5 rounded-xl bg-sky-wash px-4 py-3 text-[14.5px] text-ink">
            {error}
          </p>
        )}

        <div className="mt-7 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn btn-outline px-5 py-3 text-[15px]"
            >
              Back
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
              className="btn btn-leaf flex-1 text-[16px] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:flex-none sm:px-8"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canNext || busy}
              className="btn btn-leaf flex-1 text-[16px] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {busy ? "Sending…" : `Send it to ${site.ownerFirst}`}
            </button>
          )}
        </div>

        <p className="mt-5 border-t border-mist-2 pt-5 text-[13.5px] leading-relaxed text-slate/80">
          Rather just text?{" "}
          <a
            href={site.smsHref}
            className="font-semibold text-leaf-deep underline-offset-4 hover:underline"
          >
            {site.phone}
          </a>{" "}
          goes straight to {site.owner}.
        </p>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border-2 border-mist-2 bg-white px-4 py-3 text-[15.5px] text-ink placeholder:text-slate/40 transition-colors focus:border-leaf focus:outline-none";

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="mt-5 block">
      <span className="mb-2 block font-display text-[13.5px] font-bold text-slate">
        {label}
        {optional && <span className="pl-2 font-normal text-slate/50">optional</span>}
      </span>
      {children}
    </label>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border-2 px-4 py-2.5 font-display text-[14.5px] font-semibold transition-all duration-200 ${
        on
          ? "border-leaf bg-leaf-wash text-leaf-deep shadow-[0_6px_16px_-8px_rgba(21,24,28,0.35)]"
          : "border-mist-2 bg-white text-slate hover:border-slate/30 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
