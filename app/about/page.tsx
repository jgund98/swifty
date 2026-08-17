import type { Metadata } from "next";
import Image from "next/image";
import PageHead from "@/components/PageHead";
import CallBand from "@/components/CallBand";
import Reveal from "@/components/Reveal";
import { PhoneIcon } from "@/components/Header";
import { site, promises } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.owner} & ${site.partner} — Cleaners in Central Kentucky`,
  description: `${site.legalName} is two owners who do the cleaning themselves. Licensed, insured, smoke-free, based in ${site.city}, ${site.region}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="Meet the two of us"
        title={
          <>
            The people who clean it
            <br /> are the people who own it.
          </>
        }
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />

      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
            <div className="space-y-5 text-[17px] leading-relaxed text-slate">
              <p className="text-[19px] font-medium text-ink">
                We&rsquo;re {site.owner} and {site.partner}. Swifty Shines is
                the two of us — not a franchise, not a crew we send out. When
                you book, you get us.
              </p>
              <p>
                That matters more than it sounds. Cleaning companies rotate
                staff, so every few weeks somebody new is in your house
                wondering which cabinet the glasses go in and whether they&rsquo;re
                allowed to move the thing on the counter. You end up
                re-explaining your own home over and over.
              </p>
              <p>
                We learn your house once. We know that the guest bath only needs
                a wipe, that the dog bowl area needs the most work, and that you
                like the throw folded a particular way. By the third visit
                nobody has to say anything.
              </p>
              <p>
                We&rsquo;re licensed and insured, we don&rsquo;t smoke, and we
                don&rsquo;t cross-contaminate — the cloth that cleaned your
                bathroom never touches your kitchen. Those aren&rsquo;t selling
                points to us, they&rsquo;re just the baseline. But enough people
                have been burned that they&rsquo;re worth saying out loud.
              </p>
              <p>
                And we don&rsquo;t sell packages. Tell us what actually bothers
                you about your house and what it&rsquo;s worth to you, and
                we&rsquo;ll build around that. Sometimes that&rsquo;s the whole
                house every week. Sometimes it&rsquo;s the kitchen and two
                bathrooms twice a month. Both are real jobs.
              </p>

              <div className="pt-4">
                <p className="font-script text-[42px] leading-none text-leaf-deep">
                  {site.owner} &amp; {site.partner}
                </p>
                <p className="mt-2 text-[14px] text-slate/80">
                  Owners &amp; cleaners · {site.legalName} · {site.city}, {site.region}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <a href={site.phoneHref} className="btn btn-leaf text-[16px]">
                  <PhoneIcon className="h-[17px] w-[17px]" />
                  {site.ownerFirst} — {site.phone}
                </a>
                <a href={site.partnerPhoneHref} className="btn btn-outline text-[16px]">
                  {site.partnerFirst} — {site.partnerPhone}
                </a>
              </div>
            </div>

            <Reveal delay={0.08}>
              <div className="space-y-5">
                <div className="relative overflow-hidden rounded-[26px] shadow-[0_28px_60px_-30px_rgba(21,24,28,0.4)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/img/real-bedroom.jpg"
                      alt="A bedroom after cleaning, with fresh vacuum lines across the carpet"
                      fill
                      sizes="(max-width:1023px) 100vw, 44vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="bg-white px-5 py-4 text-[13px] leading-relaxed text-slate">
                    One of ours. The vacuum lines are the part we care about —
                    it means the whole floor got covered, not just the parts you
                    can see from the door.
                  </p>
                </div>

                <div className="rounded-[26px] bg-sky-wash p-6">
                  <p className="eyebrow text-sky-deep">What we promise</p>
                  <ul className="mt-4 space-y-3.5">
                    {promises.map((p) => (
                      <li key={p.title}>
                        <p className="font-display text-[15.5px] font-bold text-ink">
                          {p.title}
                        </p>
                        <p className="mt-0.5 text-[14px] leading-relaxed text-slate">
                          {p.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CallBand
        heading="Come see if we're a fit."
        sub={`Text ${site.ownerFirst} at ${site.phone}. Worst case you get an honest number and decide it isn't for you.`}
      />
    </>
  );
}
