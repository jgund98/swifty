import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import CallBand from "@/components/CallBand";
import ServicesGrid from "@/components/ServicesGrid";
import Reveal from "@/components/Reveal";
import { PhoneIcon } from "@/components/Header";
import { services, serviceBySlug, site, coreCities } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.name} in Liberty, Danville & Somerset, KY`,
    description: `${s.blurb} ${site.owner} and ${site.partner}, serving ${coreCities.slice(0, 4).join(", ")} and Central Kentucky. Call ${site.phone}.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.name} — ${site.name}`, description: s.blurb, images: [{ url: s.image }] },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      description: s.blurb,
      serviceType: s.name,
      provider: { "@id": "https://swiftyshines.com/#business" },
      areaServed: coreCities.map((c) => ({ "@type": "City", name: `${c}, KY` })),
      url: `https://swiftyshines.com/services/${s.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://swiftyshines.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://swiftyshines.com/services" },
        {
          "@type": "ListItem",
          position: 3,
          name: s.name,
          item: `https://swiftyshines.com/services/${s.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHead
        eyebrow={s.short}
        title={s.name}
        intro={s.blurb}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${s.slug}`, label: s.name },
        ]}
      />

      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] shadow-[0_28px_60px_-30px_rgba(21,24,28,0.4)]">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  priority
                  sizes="(max-width:1023px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-[26px] bg-leaf-wash p-6 sm:p-7">
                <p className="eyebrow text-leaf-deep">What&rsquo;s included</p>
                <ul className="mt-4 space-y-3">
                  {s.includes.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-2.5 text-[15.5px] leading-snug text-ink"
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
                      {inc}
                    </li>
                  ))}
                </ul>
                <a
                  href={site.phoneHref}
                  className="btn btn-leaf mt-6 w-full text-[15.5px]"
                  data-analytics="service-call"
                >
                  <PhoneIcon />
                  {site.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <h2 className="font-display text-[clamp(1.7rem,4.4vw,2.5rem)] font-extrabold leading-[1.06] tracking-[-0.035em]">
                How it actually goes
              </h2>
              <div className="mt-6 space-y-5 text-[16.5px] leading-relaxed text-slate">
                {s.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
            <div className="card p-6 sm:p-7">
              <p className="eyebrow text-sky-deep">Book it</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-slate">
                Tell {site.ownerFirst} the town you&rsquo;re in and roughly what
                you want done. She&rsquo;ll come back with a price and a day —
                no site visit needed for most jobs.
              </p>
              <Link href="/contact" className="btn btn-leaf mt-5 w-full text-[15.5px]">
                Build my clean
              </Link>
              <a href={site.smsHref} className="btn btn-outline mt-2.5 w-full text-[15px]">
                Text {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[820px] px-4 sm:px-6">
          <p className="eyebrow text-leaf-deep">Straight answers</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4.6vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.035em]">
            {s.name} questions people ask
          </h2>

          <div className="mt-8 divide-y divide-mist-2 border-y border-mist-2">
            {s.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5">
                  <h3 className="font-display text-[17.5px] font-bold leading-snug text-ink transition-colors group-open:text-leaf-deep">
                    {f.q}
                  </h3>
                  <span className="mt-1 shrink-0 text-leaf transition-transform duration-300 group-open:rotate-45">
                    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                      <path
                        d="M10 3v14M3 10h14"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-slate">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-8 text-[15px] leading-relaxed text-slate">
            {s.name} in {coreCities.slice(0, 5).join(", ")} and the rest of
            Central Kentucky —{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-leaf-deep underline-offset-4 hover:underline"
            >
              {site.phone}
            </a>
            {"."}
          </p>
        </div>
      </section>

      <ServicesGrid heading="While they're there" exclude={s.slug} />
      <CallBand />
    </>
  );
}
