import Link from "next/link";
import SwiftyLogo from "@/components/Logo";
import { site } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";

export default function NotFound() {
  return (
    <section className="grid min-h-[78svh] place-items-center bg-white px-4 pt-24">
      <div className="text-center">
        <SwiftyLogo className="mx-auto h-[200px] w-auto" />
        <p className="eyebrow mt-6 text-leaf-deep">Error 404</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">
          Nothing here but clean floors.
        </h1>
        <p className="mx-auto mt-4 max-w-[38ch] text-[16.5px] leading-relaxed text-slate">
          That link is broken, but the phone still works.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={site.phoneHref} className="btn btn-leaf text-[16px]">
            <PhoneIcon />
            {site.phone}
          </a>
          <Link href="/" className="btn btn-outline text-[16px]">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}