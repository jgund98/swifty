import Link from "next/link";
import SwiftyLogo from "./Logo";
import { site, services, allCities, counties } from "@/lib/site";
import { PhoneIcon } from "./Header";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-mist-2 bg-mist pb-[96px] pt-16 md:pb-14">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8 lg:gap-14">
          <div>
            <Link href="/" aria-label={`${site.legalName} — home`} className="inline-block">
              <SwiftyLogo className="h-[130px] w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate">
              {site.legalName} is {site.owner} and {site.partner} — two owners
              who do the cleaning themselves, across {site.areaLabel}.
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <a href={site.phoneHref} className="btn btn-leaf text-[15px]">
                <PhoneIcon />
                {site.phone}
              </a>
              <a href={site.smsHref} className="btn btn-outline text-[15px]">
                Text {site.ownerFirst}
              </a>
            </div>

            <dl className="mt-7 space-y-2.5 text-[14.5px]">
              <div className="flex gap-2">
                <dt className="w-[86px] shrink-0 font-semibold text-ink">
                  {site.partnerFirst}
                </dt>
                <dd>
                  <a
                    href={site.partnerPhoneHref}
                    className="text-slate underline-offset-4 hover:text-leaf-deep hover:underline"
                  >
                    {site.partnerPhone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[86px] shrink-0 font-semibold text-ink">Email</dt>
                <dd>
                  <a
                    href={site.emailHref}
                    className="break-all text-slate underline-offset-4 hover:text-leaf-deep hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-[86px] shrink-0 font-semibold text-ink">Based in</dt>
                <dd className="text-slate">
                  {site.city}, {site.region} · {site.county}
                </dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Services">
            <h3 className="eyebrow text-slate/55">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[15px] text-slate transition-colors hover:text-leaf-deep"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow text-slate/55">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                ["/about", "About Ashley & Summer"],
                ["/service-area", "Where We Clean"],
                ["/contact", "Build Your Clean"],
                [site.social.facebook, "Facebook"],
              ].map(([href, label]) => (
                <li key={label}>
                  {href.startsWith("http") ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-slate transition-colors hover:text-leaf-deep"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="text-[15px] text-slate transition-colors hover:text-leaf-deep"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <h3 className="eyebrow mt-8 text-slate/55">Hours</h3>
            <p className="mt-3 font-display text-[17px] font-bold text-ink">
              {site.hours}
            </p>
            <p className="text-[13.5px] text-slate">
              Early mornings and weekends included.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-white p-5 sm:p-6">
          <h3 className="eyebrow text-slate/50">Proudly cleaning</h3>
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate">
            {allCities.join(", ")} — and the rest of {counties.join(", ")}{" "}
            {counties.length > 1 ? "Counties" : "County"}.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-mist-2 pt-7 sm:flex-row sm:items-center">
          <p className="text-[13px] text-slate/70">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <a
            href="https://epicdevsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[13px] text-slate/70 transition-colors hover:text-ink"
          >
            Site by
            <span className="font-display font-extrabold text-slate transition-colors group-hover:text-leaf-deep">
              Epic Dev Solutions
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
