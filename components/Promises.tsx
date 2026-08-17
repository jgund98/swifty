import Image from "next/image";
import { promises, site } from "@/lib/site";
import Reveal, { Stagger, Item } from "./Reveal";

/*
 * The four claims Ashley makes herself, in her own posts. Nothing here is
 * invented — the smoke-free line and the no-cross-contamination line are
 * hers word for word, which is why they're worth putting this big.
 */
export default function Promises() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] shadow-[0_28px_60px_-30px_rgba(21,24,28,0.4)] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/img/detail-spray.jpg"
                  alt="A green spray bottle on a clean white surface"
                  fill
                  sizes="(max-width:1023px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-3 w-[44%] overflow-hidden rounded-2xl border-[6px] border-white shadow-[0_24px_48px_-20px_rgba(21,24,28,0.4)] sm:-right-6 sm:w-[38%]">
                <div className="relative aspect-square">
                  <Image
                    src="/img/real-bedroom.jpg"
                    alt="A bedroom Ashley cleaned, with fresh vacuum lines across the carpet"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <p className="mt-9 max-w-[62%] text-[12.5px] leading-relaxed text-slate/70">
              Right: one of {site.ownerFirst}&rsquo;s own jobs. Look at the
              carpet.
            </p>
          </Reveal>

          <div>
            <p className="eyebrow text-leaf-deep">Why them</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">
              You&rsquo;re handing
              <br className="hidden sm:block" /> someone your keys.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-slate">
              That&rsquo;s the actual decision here, and it&rsquo;s not a small
              one. So here is exactly what {site.ownerFirst} and {site.partnerFirst}{" "}
              promise, in their own words.
            </p>

            <Stagger className="mt-9 grid gap-4 sm:grid-cols-2">
              {promises.map((p) => (
                <Item key={p.title}>
                  <div className="h-full rounded-2xl bg-mist p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm">
                      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                        <path
                          d="M4 10.6l3.4 3.4L16 5.4"
                          stroke="#7CC242"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </span>
                    <h3 className="mt-3 font-display text-[17.5px] font-bold">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate">
                      {p.body}
                    </p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
