import { db } from "@/db";
import { messages } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();
    if (!email || typeof email !== "string") {
      return Response.json({ ok: false, error: "email required" }, { status: 400 });
    }
    await db.insert(messages).values({
      name: name ?? "",
      email: email.toLowerCase().trim(),
      subject: subject ?? "",
      body: message ?? "",
    });
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: "message not sent" }, { status: 500 });
  }
}
