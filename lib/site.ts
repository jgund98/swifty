// ─────────────────────────────────────────────────────────────
//  Every business fact lives here. Change once, changes everywhere.
//  Sourced from Ashley's business card + her Facebook page.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Swifty Shines",
  legalName: "Swifty Shines Every Time LLC",
  fullName: "Swifty Shines Every Time",
  tagline: "Making your life better one mess at a time",
  logoTagline: "Every Time",

  // Ashley is the one who answers — she's the primary contact.
  owner: "Ashley Rayborn",
  ownerFirst: "Ashley",
  phone: "(606) 235-1824",
  phoneHref: "tel:+16062351824",
  smsHref: "sms:+16062351824",
  phoneRaw: "+16062351824",

  partner: "Summer Hall",
  partnerFirst: "Summer",
  partnerPhone: "(859) 516-5136",
  partnerPhoneHref: "tel:+18595165136",

  email: "Rayborn1989@icloud.com",
  emailHref: "mailto:Rayborn1989@icloud.com",

  // From the Facebook page's About panel
  street: "249 Howe Hollow Rd",
  city: "Middleburg",
  region: "KY",
  regionName: "Kentucky",
  postal: "42541",
  county: "Casey County",
  areaLabel: "Central Kentucky",

  hours: "Always open",
  hoursLong: "seven days a week, early or late",

  // ⚠️ JORDAN: she has 0 reviews on Facebook and no Google Business
  // Profile yet. Nothing on this site claims a rating or a review count.
  // Setting up her GMB is the single highest-value thing she could do next.
  hasReviews: false,

  social: {
    facebook: "https://www.facebook.com/SwiftyShinesEveryTimeLLC",
  },

  // Her own words, from the Facebook About panel — quoted, not invented.
  intro:
    "Hello we are a cleaning company. We clean residential and commercial. We pet sit, clean trash cans and more. And best of all we are insured and licensed we have experience in references.",
} as const;

/** Claims Ashley makes herself, in her own posts. Don't add to this list. */
export const promises = [
  {
    title: "Licensed & insured",
    body: "Both of those are in place before anyone sets foot in your house. Ask and she'll show you.",
  },
  {
    title: "Smoke-free crew",
    body: "Nobody who walks into your home smells like cigarettes, and nothing you own will either.",
  },
  {
    title: "No cross-contamination",
    body: "Fresh cloths and separate gear per room. The rag that did the bathroom never sees your kitchen.",
  },
  {
    title: "Built to your budget",
    body: "Tell her what matters and what it's worth to you. She builds the package around that, not a menu.",
  },
] as const;

/** Towns she names in her own posts, plus the drive-time radius around Middleburg. */
export const coreCities = [
  "Liberty",
  "Danville",
  "Somerset",
  "Crab Orchard",
  "Stanford",
  "Lebanon",
] as const;

export const allCities = [
  "Liberty",
  "Danville",
  "Somerset",
  "Crab Orchard",
  "Stanford",
  "Lebanon",
  "Middleburg",
  "Hustonville",
  "Junction City",
  "Perryville",
  "Nancy",
  "Science Hill",
  "Eubank",
  "Russell Springs",
  "Columbia",
  "Campbellsville",
  "Bradfordsville",
  "Dunnville",
  "Yosemite",
  "Waynesburg",
] as const;

export const counties = [
  "Casey",
  "Lincoln",
  "Boyle",
  "Pulaski",
  "Marion",
  "Adair",
] as const;

export type Service = {
  slug: string;
  name: string;
  navName: string;
  short: string;
  blurb: string;
  image: string;
  imageAlt: string;
  includes: string[];
  body: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "house-cleaning",
    name: "House Cleaning",
    navName: "House Cleaning",
    short: "Regular, one-time, or somewhere in between",
    blurb:
      "Weekly, every other week, monthly, or the one big reset before your mother-in-law visits. Same two people every time, so nobody has to be re-taught where anything goes.",
    image: "/img/svc-house.jpg",
    imageAlt: "A bright, freshly cleaned living room with sunlight across the floor",
    includes: [
      "Kitchens — counters, sink, stovetop, outside of appliances",
      "Bathrooms — tub, shower, toilet, mirrors, floors",
      "Bedrooms and living areas — dusted, vacuumed, beds made",
      "Floors throughout, vacuumed and mopped",
      "Trash out, surfaces wiped, everything put back where it was",
    ],
    body: [
      "Most cleaning companies hand you a checklist and charge you for all of it. Ashley does it the other way around: you tell her what actually bothers you, and she builds the visit around that.",
      "If what you need is the kitchen and the two bathrooms done properly every other Thursday, that's the job. If it's the whole house top to bottom once a season, that's the job too.",
      "Same two people every visit. No rotating crew, no strangers, no explaining your house over again each time.",
    ],
    faqs: [
      {
        q: "How much does house cleaning cost in Liberty or Danville?",
        a: "It depends on the size of the house and what you want done — which is why there's no price list here. Text Ashley at (606) 235-1824 with a rough idea and she'll give you a number, not a range.",
      },
      {
        q: "Do I need to be home while you clean?",
        a: "Not at all. Plenty of clients leave a key or a door code. She's licensed and insured, and she'll text you when she's done.",
      },
      {
        q: "Do you bring your own supplies?",
        a: "Yes, everything. If you'd rather she use a specific product on a particular surface, leave it out and say so.",
      },
      {
        q: "How often should I book?",
        a: "Every other week is the most common. Weekly if you have kids or pets and want to stay ahead of it. Monthly works if you keep up between visits.",
      },
    ],
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    navName: "Deep Cleaning",
    short: "The one that takes all day",
    blurb:
      "Baseboards, blinds, inside the oven, behind the toilet, the grime that has been building up in the corners since you moved in. This is the reset.",
    image: "/img/svc-deep.jpg",
    imageAlt: "Close-up of a hand cleaning a bathroom tile surface with a cloth",
    includes: [
      "Baseboards, door frames, switch plates and vents",
      "Inside the oven, inside the fridge, inside cabinets",
      "Blinds, window sills and interior glass",
      "Grout, shower tracks and behind fixtures",
      "Everything in a standard clean, done slower and further",
    ],
    body: [
      "A deep clean is not a regular clean that takes longer. It's a different job — it's every surface that a normal visit doesn't touch because touching it would eat the whole appointment.",
      "It's the right call before you move in, after you move out, after a renovation, before a holiday, or when a house has gone a long stretch without one and a regular visit would just skate over the top.",
      "Most people book one deep clean and then keep it that way with regular visits, which is far cheaper than doing a deep clean twice.",
    ],
    faqs: [
      {
        q: "How long does a deep clean take?",
        a: "Usually most of a day for an average house, with both Ashley and Summer working. Bigger or rougher jobs can run into a second day.",
      },
      {
        q: "Is it worth it if I already clean regularly?",
        a: "Once, yes — almost every house has build-up somewhere nobody has gotten to. After that, regular visits keep it there.",
      },
      {
        q: "Do you do move-in and move-out cleans?",
        a: "Yes, both. Empty houses are the easiest deep cleans to do properly because nothing is in the way.",
      },
    ],
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    navName: "Commercial",
    short: "Offices, shops, rentals, churches",
    blurb:
      "Small business cleaning that runs on your schedule, not a corporate route. After hours, before you open, or Sunday afternoon — whatever keeps it out of your way.",
    image: "/img/svc-commercial.jpg",
    imageAlt: "A clean, empty small office with tidy desks and clear floors",
    includes: [
      "Offices, waiting rooms and break rooms",
      "Restrooms restocked and sanitized",
      "Retail floors, entryways and glass",
      "Churches, clinics and community buildings",
      "Short-term rentals turned over between guests",
    ],
    body: [
      "Big janitorial companies sell you a contract and then send whoever is on the route that night. You end up explaining the alarm code to a different person every month.",
      "This is two people who show up themselves, learn your building once, and keep it the same way every time. For a small office or a shop, that's the whole difference.",
      "Short-term rental turnovers are a good fit too — she'll get it back to photo-ready between guests.",
    ],
    faqs: [
      {
        q: "Do you clean after hours?",
        a: "Yes. Nights, early mornings and weekends are normal for commercial work — the goal is that your customers and staff never see it happen.",
      },
      {
        q: "Do you require a contract?",
        a: "No. Book it how it suits you and change it when your needs change.",
      },
      {
        q: "Can you handle Airbnb turnovers?",
        a: "Yes, including tight same-day windows if you give her the schedule ahead of time.",
      },
    ],
  },
  {
    slug: "trash-can-cleaning",
    name: "Trash Can Cleaning",
    navName: "Trash Cans",
    short: "The one nobody else offers",
    blurb:
      "Your garbage cans get scrubbed, deodorized and handed back smelling like nothing at all. It sounds small until the first hot week in July.",
    image: "/img/svc-cans.jpg",
    imageAlt: "Curbside garbage and recycling bins on a residential street",
    includes: [
      "Household garbage and recycling carts",
      "Scrubbed inside and out, not just rinsed",
      "Deodorized so the smell doesn't come straight back",
      "Commercial dumpster pads and enclosures",
      "Add it onto a regular clean or book it on its own",
    ],
    body: [
      "Almost nobody in Central Kentucky offers this, and almost everybody needs it. A garbage cart that has been sitting in the sun all summer holds onto that smell no matter how many bags you put in it.",
      "It takes a proper scrub, not a hose. That's what this is.",
      "Easiest thing in the world to bolt onto a regular house cleaning — she's already there.",
    ],
    faqs: [
      {
        q: "How often should trash cans be cleaned?",
        a: "Twice a year keeps most households ahead of it. Quarterly in summer if your cans sit in direct sun or you have a lot of food waste.",
      },
      {
        q: "Can you clean cans without cleaning my house?",
        a: "Yes, it books on its own. It's just cheapest bundled with a visit that's already happening.",
      },
    ],
  },
  {
    slug: "houseboat-cleaning",
    name: "Houseboat Cleaning",
    navName: "Houseboats",
    short: "Lake Cumberland turnovers",
    blurb:
      "Galley, heads, bunks, decks and all the surfaces that go green in lake air. Cleaned between trips or opened up at the start of the season.",
    image: "/img/svc-boat.jpg",
    imageAlt: "Houseboats moored at a marina dock on a calm lake",
    includes: [
      "Galley and dining areas",
      "Heads, showers and staterooms",
      "Decks, rails and vinyl seating",
      "Interior glass, mildew-prone corners and cushions",
      "Season opening and season closing cleans",
    ],
    body: [
      "Lake Cumberland is a short run from Middleburg, and houseboats are their own kind of cleaning job — small spaces, damp air, and every surface picks up mildew if you leave it a few weeks.",
      "Cleaned between trips so the next group steps onto a boat that smells like nothing, or opened up in spring after a winter shut in.",
      "Give her the marina and the slip and she'll come to the dock.",
    ],
    faqs: [
      {
        q: "Which marinas do you cover?",
        a: "Lake Cumberland and the Somerset side generally. Call with your marina and she'll tell you straight away whether it's a drive she'll make.",
      },
      {
        q: "Can you do a turnover between rentals?",
        a: "Yes — that's most of this work. Give her the window and she'll fit it.",
      },
    ],
  },
  {
    slug: "pet-sitting",
    name: "Pet Sitting",
    navName: "Pet Sitting",
    short: "While you're away",
    blurb:
      "Feeding, fresh water, letting out, litter boxes and company. She's already trusted with your house key, so this is the easy part.",
    image: "/img/svc-pets.jpg",
    imageAlt: "A dog resting on a clean floor in a bright living room",
    includes: [
      "Drop-in visits while you travel",
      "Feeding, water and medication on schedule",
      "Letting dogs out, walks and yard time",
      "Litter boxes, cages and clean-up",
      "A text and a photo so you know they're fine",
    ],
    body: [
      "This started because cleaning clients kept asking. If someone already has your key and you already trust them in your house, asking them to feed the cat for a weekend is not a stretch.",
      "It's a real service now, and it pairs well with a clean while you're gone — you come home to a fed animal and a house that's better than you left it.",
    ],
    faqs: [
      {
        q: "Do you stay overnight?",
        a: "Drop-in visits are the standard. Ask about anything beyond that and she'll tell you what's possible.",
      },
      {
        q: "Can you give medication?",
        a: "Usually yes — walk her through it before you leave and leave written instructions out.",
      },
    ],
  },
];

export function serviceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
