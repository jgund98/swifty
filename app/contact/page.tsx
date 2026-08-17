import type { Metadata } from "next";
import { Suspense } from "react";
import PageHead from "@/components/PageHead";
import ContactClient from "./ContactClient";
import { site, coreCities, promises } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";

export const metadata: Metadata = {
  title: "Get a Cleaning Quote — Central Kentucky",
  description: `Tell ${site.owner} what needs cleaning and she'll come back with a price and a day. Or just call ${site.phone}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="Build your clean"
        title={<>Tell {site.ownerFirst} what needs doing.</>}
        intro="Three quick questions. She answers herself — no call centre, no automated quote, no salesperson."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Get a Quote" },
        ]}
      />

      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-12">
            <Suspense
              fallback={<div className="card h-[520px] w-full bg-mist" />}
            >
              <ContactClient />
            </Suspense>

            <aside className="space-y-4 lg:sticky lg:top-28">
              <div className="card p-6">
                <p className="eyebrow text-leaf-deep">Faster than a form</p>
                <p className="mt-3 font-display text-[25px] font-extrabold leading-tight">
                  {site.phone}
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate">
                  Goes straight to {site.owner}.
                </p>
                <a
                  href={site.smsHref}
                  className="btn btn-leaf mt-5 w-full text-[15.5px]"
                >
                  Text her
                </a>
                <a
                  href={site.phoneHref}
                  className="btn btn-outline mt-2.5 w-full text-[15px]"
                  data-analytics="contact-call"
                >
                  <PhoneIcon />
                  Call instead
                </a>
                <p className="mt-4 border-t border-mist-2 pt-4 text-[13.5px] text-slate">
                  {site.partner} &middot;{" "}
                  <a
                    href={site.partnerPhoneHref}
                    className="text-leaf-deep underline-offset-4 hover:underline"
                  >
                    {site.partnerPhone}
                  </a>
                </p>
              </div>

              <div className="card p-6">
                <dl className="space-y-4 text-[14.5px]">
                  <div>
                    <dt className="eyebrow text-slate/50">Hours</dt>
                    <dd className="mt-1.5 font-display text-[17px] font-bold">
                      {site.hours}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-slate/50">Based in</dt>
                    <dd className="mt-1.5 text-slate">
                      {site.city}, {site.region} · {site.county}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-slate/50">Covering</dt>
                    <dd className="mt-1.5 leading-relaxed text-slate">
                      {coreCities.join(", ")} and the rest of Central Kentucky.
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-slate/50">Email</dt>
                    <dd className="mt-1.5">
                      <a
                        href={site.emailHref}
                        className="break-all text-slate underline-offset-4 hover:text-leaf-deep hover:underline"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-[20px] bg-leaf-wash p-6">
                <ul className="space-y-2.5">
                  {promises.map((p) => (
                    <li
                      key={p.title}
                      className="flex items-start gap-2 text-[14.5px] font-medium text-ink"
                    >
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
                      {p.title}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
