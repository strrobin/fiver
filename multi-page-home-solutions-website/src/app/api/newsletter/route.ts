import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return Response.json({ ok: false, error: "email required" }, { status: 400 });
    }
    await db
      .insert(newsletterSubscribers)
      .values({ email: email.toLowerCase().trim() })
      .onConflictDoNothing({ target: newsletterSubscribers.email });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "could not subscribe" }, { status: 500 });
  }
}
