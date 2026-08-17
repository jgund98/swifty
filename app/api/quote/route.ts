import { NextResponse } from "next/server";

/*
 * Lead intake.
 *
 * ⚠️ JORDAN — stub. It validates and logs; it does not deliver. Wire it to
 * the Brevo drop-in (epic\client-email-protocol) and an SMS to Ashley on
 * (606) 235-1824 before this goes live, or leads fall on the floor.
 */

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const d = body as Record<string, unknown>;
  const name = typeof d.name === "string" ? d.name.trim() : "";
  const phone = typeof d.phone === "string" ? d.phone.trim() : "";

  if (!name || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "name and phone required" },
      { status: 422 },
    );
  }

  console.log("[swifty-shines] quote request", {
    at: new Date().toISOString(),
    name,
    phone,
    jobs: d.jobs,
    when: d.when,
    city: d.city,
    size: d.size,
    notes: d.notes,
  });

  return NextResponse.json({ ok: true });
}
