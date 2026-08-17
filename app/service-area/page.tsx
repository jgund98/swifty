import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ServiceArea from "@/components/ServiceArea";
import CallBand from "@/components/CallBand";
import { Stagger, Item } from "@/components/Reveal";
import { site, coreCities, allCities, counties } from "@/lib/site";

export const metadata: Metadata = {
  title: "Where We Clean — Liberty, Danville, Somerset & Central Kentucky",
  description: `${site.legalName} cleans across Casey, Lincoln, Boyle, Pulaski, Marion and Adair Counties — Liberty, Danville, Somerset, Stanford, Crab Orchard, Lebanon and more.`,
  alternates: { canonical: "/service-area" },
};

const notes: Record<string, string> = {
  Liberty:
    "Right next door to home base. If you're in Liberty they can usually work you in quickly.",
  Danville:
    "North up 127 — houses, offices and the rental turnovers around Centre.",
  Somerset:
    "South toward the lake, including the Lake Cumberland marinas and houseboat work.",
  "Crab Orchard":
    "East into Lincoln County, with Stanford and Waynesburg on the same run.",
  Stanford:
    "Lincoln County seat, an easy drive and a regular stop.",
  Lebanon:
    "West into Marion County. A little further, still very much in range.",
};

export default function ServiceAreaPage() {
  const extras = allCities.filter(
    (c) => !coreCities.includes(c as (typeof coreCities)[number]),
  );

  return (
    <>
      <PageHead
        eyebrow="Where we clean"
        title={
          <>
            Six counties,
            <br /> one hour&rsquo;s drive.
          </>
        }
        intro={`Based in ${site.city} in ${site.county}, which sits close enough to the middle of everything that most of Central Kentucky is a comfortable run.`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/service-area", label: "Where We Clean" },
        ]}
      />

      <ServiceArea compact />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <h2 className="font-display text-[clamp(1.8rem,4.6vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.035em]">
            The towns they name first
          </h2>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreCities.map((c) => (
              <Item key={c} className="h-full">
                <div className="card h-full p-6">
                  <h3 className="font-display text-[21px] font-bold">{c}, KY</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate">
                    {notes[c]}
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-4 inline-flex font-display text-[14px] font-bold text-leaf-deep underline-offset-4 hover:underline"
                  >
                    Cleaners in {c} → {site.phone}
                  </a>
                </div>
              </Item>
            ))}
          </Stagger>

          <div className="mt-10 rounded-[26px] bg-mist p-6 sm:p-7">
            <h3 className="font-display text-[19px] font-bold">Also cleaning in</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-slate">
              {extras.join(", ")} — plus the rest of {counties.join(", ")}{" "}
              Counties. Sitting just outside the list?{" "}
              <a
                href={site.phoneHref}
                className="font-semibold text-leaf-deep underline-offset-4 hover:underline"
              >
                Call and ask
              </a>
              . They&rsquo;d rather drive a little further than turn you away.
            </p>
          </div>
        </div>
      </section>

      <CallBand
        heading="If you can see a barn from your porch, they'll come."
        sub={`${site.owner} answers at ${site.phone}. Tell her the town and she'll tell you straight away.`}
      />
    </>
  );
}
