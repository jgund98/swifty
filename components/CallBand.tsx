import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";
import SwiftyLogo from "./Logo";

export default function CallBand({
  heading = "Ready for someone else to do it?",
  sub,
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 420px at 12% 20%, rgba(124,194,66,0.28), transparent 62%), radial-gradient(620px 400px at 88% 78%, rgba(42,171,226,0.26), transparent 62%)",
        }}
      />
      <SwiftyLogo
        withTools={false}
        className="pointer-events-none absolute -right-8 top-1/2 h-[210px] w-auto -translate-y-1/2 opacity-[0.07] lg:right-10 lg:h-[280px]"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="max-w-[34ch]">
          <p className="eyebrow text-leaf-light">{site.hours}</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,5vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white">
            {heading}
          </h2>
          <p className="mt-4 max-w-[42ch] text-[16.5px] leading-relaxed text-white/70">
            {sub ??
              `Text or call ${site.ownerFirst} at ${site.phone}. Tell her what's bugging you about the house and she'll tell you what it costs to make it go away.`}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="btn btn-leaf text-[16px]"
              data-analytics="band-call"
            >
              <PhoneIcon className="h-[17px] w-[17px]" />
              {site.phone}
            </a>
            <Link href="/contact" className="btn btn-sky text-[16px]">
              Build my clean
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
