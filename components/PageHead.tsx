import Link from "next/link";
import SwiftyLogo from "./Logo";

export default function PageHead({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  crumbs?: { href: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-[110px] sm:pb-14 lg:pt-[136px]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(760px 420px at 88% 0%, rgba(42,171,226,0.14), transparent 60%), radial-gradient(620px 380px at 2% 22%, rgba(124,194,66,0.16), transparent 62%)",
        }}
      />
      <div className="bubbles pointer-events-none absolute inset-0 opacity-70" />
      <SwiftyLogo
        withTools={false}
        className="pointer-events-none absolute -right-6 top-16 h-[190px] w-auto opacity-[0.07] lg:right-6 lg:h-[240px]"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 font-display text-[12px] font-bold uppercase tracking-[0.14em] text-slate/45">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-leaf">/</span>}
                  <Link href={c.href} className="transition-colors hover:text-leaf-deep">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow text-leaf-deep">{eyebrow}</p>
        <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(2.2rem,6.6vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-[54ch] text-[17px] leading-relaxed text-slate sm:text-[18px]">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
