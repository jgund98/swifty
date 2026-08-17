import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Grand_Hotel } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import OwnerPopup from "@/components/OwnerPopup";
import { site, allCities, services } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});
const grand = Grand_Hotel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-grand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swiftyshines.com"),
  title: {
    default: `House & Commercial Cleaning in Central Kentucky | ${site.legalName}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.owner} and ${site.partner} clean homes and businesses across Central Kentucky — Liberty, Danville, Somerset, Stanford and Crab Orchard. Licensed, insured, smoke-free. Call ${site.phone}.`,
  keywords: [
    "house cleaning Liberty KY",
    "cleaning service Danville KY",
    "maid service Somerset KY",
    "deep cleaning Casey County",
    "commercial cleaning Central Kentucky",
    "trash can cleaning Kentucky",
    "houseboat cleaning Lake Cumberland",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.legalName,
    title: `House & Commercial Cleaning in Central Kentucky | ${site.legalName}`,
    description: `Licensed, insured and smoke-free. ${site.tagline}.`,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#7cc242",
  width: "device-width",
  initialScale: 1,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  "@id": "https://swiftyshines.com/#business",
  name: site.legalName,
  alternateName: site.name,
  slogan: site.tagline,
  url: "https://swiftyshines.com",
  telephone: site.phoneRaw,
  email: site.email,
  description: site.intro,
  priceRange: "$",
  founder: [
    { "@type": "Person", name: site.owner },
    { "@type": "Person", name: site.partner },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postal,
    addressCountry: "US",
  },
  areaServed: allCities.map((c) => ({ "@type": "City", name: `${c}, KY` })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.short },
    })),
  },
  sameAs: [site.social.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${grand.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Header />
        <main id="top">{children}</main>
        <Footer />
        <MobileDock />
        <OwnerPopup />
      </body>
    </html>
  );
}
