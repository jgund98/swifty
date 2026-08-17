import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import CallBand from "@/components/CallBand";
import { Stagger, Item } from "@/components/Reveal";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cleaning Services in Liberty, Danville & Somerset KY",
  description: `House cleaning, deep cleans, commercial, trash cans, houseboats and pet sitting across Central Kentucky. ${site.owner} and ${site.partner} do the work themselves. Call ${site.phone}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        eyebrow="Services"
        title={
          <>
            Six things they do,
            <br /> and one way they do them.
          </>
        }
        intro="Every one of these can be booked on its own or bundled into a regular visit. Nothing here is a package — you pick, and Ashley prices what you picked."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
        ]}
      />

      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <Stagger className="grid gap-5 md:grid-cols-2">
            {services.map((s) => (
              <Item key={s.slug} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="card group flex h-full flex-col overflow-hidden sm:flex-row"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-[40%]">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width:639px) 100vw, 280px"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-[20px] font-bold text-ink transition-colors group-hover:text-leaf-deep">
                      {s.name}
                    </h2>
                    <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-slate">
                      {s.blurb}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-leaf-deep">
                      See what&rsquo;s included
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <CallBand
        heading="Not sure which one you need?"
        sub={`Describe the house and what's bothering you. ${site.ownerFirst} has been doing this long enough to tell you what it actually needs.`}
      />
    </>
  );
}
