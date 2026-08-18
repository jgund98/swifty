import type { Metadata } from "next";
import Hero from "@/components/Hero";
import BuildYourClean from "@/components/BuildYourClean";
import MirrorTest from "@/components/MirrorTest";
import Promises from "@/components/Promises";
import ServicesGrid from "@/components/ServicesGrid";
import ServiceArea from "@/components/ServiceArea";
import CallBand from "@/components/CallBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `House & Commercial Cleaning in Central Kentucky | ${site.legalName}`,
  description: `${site.owner} and ${site.partner} clean homes and businesses across Central Kentucky — Liberty, Danville, Somerset, Stanford, Crab Orchard and Lebanon. Licensed, insured, smoke-free. Call ${site.phone}.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <BuildYourClean />
      <MirrorTest />
      <Promises />
      <ServicesGrid intro="Six things they do. Mix and match them — nobody here is going to sell you a package you didn't ask for." />
      <ServiceArea />
      <CallBand />
    </>
  );
}
