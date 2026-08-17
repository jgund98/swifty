"use client";

import { useSearchParams } from "next/navigation";
import QuoteForm from "@/components/QuoteForm";

/* Carries the Build Your Clean picks over into the form. */
const ROOM_TO_JOB: Record<string, string> = {
  oven: "deep",
  fridge: "deep",
  windows: "deep",
  baseboards: "deep",
  cabinets: "deep",
  cans: "cans",
  pets: "pets",
};

export default function ContactClient() {
  const params = useSearchParams();

  const rooms = (params.get("rooms") ?? "").split(",").filter(Boolean);
  const extras = (params.get("extras") ?? "").split(",").filter(Boolean);
  const size = params.get("size") ?? "";

  const jobs = new Set<string>();
  if (rooms.length) jobs.add(size === "biz" ? "commercial" : "house");
  extras.forEach((e) => {
    const j = ROOM_TO_JOB[e];
    if (j) jobs.add(j);
  });

  const sizeLabel =
    size === "small"
      ? "1–2 bedrooms"
      : size === "mid"
        ? "3 bedrooms"
        : size === "large"
          ? "4+ bedrooms"
          : size === "biz"
            ? "A business"
            : "";

  const notes =
    rooms.length || extras.length
      ? `From the website: ${[...rooms, ...extras].join(", ")}.`
      : "";

  return (
    <QuoteForm
      prefill={{
        jobs: [...jobs],
        size: sizeLabel,
        notes,
      }}
    />
  );
}
