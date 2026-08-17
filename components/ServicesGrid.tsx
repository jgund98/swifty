import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/site";
import { Stagger, Item } from "./Reveal";

export default function ServicesGrid({
  heading = "Everything they'll take off your plate",
  intro,
  exclude,
}: {
  heading?: string;
  intro?: string;
  exclude?: string;
}) {
  /* On a service page this is a related strip — a clean row of three.
     On the home page it's all six, which fills a 3-column grid exactly. */
  const related = Boolean(exclude);
  const list = related
    ? services.filter((s) => s.slug !== exclude).slice(0, 3)
    : services;

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-xl">
            <p className="eyebrow text-sky-deep">Services</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">
              {heading}
            </h2>
            {intro && (
              <p className="mt-4 text-[16.5px] leading-relaxed text-slate">
                {intro}
              </p>
            )}
          </div>
          <Link href="/services" className="btn btn-outline px-5 py-2.5 text-[14.5px]">
            All services →
          </Link>
        </div>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <Item key={s.slug} className="h-full">
              <Link
                href={`/services/${s.slug}`}
                className="card group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(max-width:639px) 100vw, (max-width:1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[19px] font-bold text-ink transition-colors group-hover:text-leaf-deep">
                    {s.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-slate">
                    {s.short}
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
  );
}
