import { db } from "@/db";
import { customers, orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const toCents = (n: number) => Math.round(n * 100);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, shipping, billing, deliveryMethod, paymentMethod, items, deliveryFee } = body;

    if (!customer?.email || !Array.isArray(items) || items.length === 0) {
      return Response.json({ ok: false, error: "invalid payload" }, { status: 400 });
    }

    const subtotalCents = items.reduce(
      (sum: number, it: { price: number; quantity: number }) => sum + toCents(it.price) * it.quantity,
      0
    );
    const deliveryCents = toCents(deliveryFee ?? 0);

    const result = await db.transaction(async (tx) => {
      const email = customer.email.toLowerCase().trim();
      let customerId: number;

      const existing = await tx.select({ id: customers.id }).from(customers).where(eq(customers.email, email)).limit(1);
      if (existing.length) {
        customerId = existing[0].id;
      } else {
        const inserted = await tx
          .insert(customers)
          .values({
            firstName: customer.firstName ?? "",
            lastName: customer.lastName ?? "",
            email,
            phone: customer.phone ?? "",
          })
          .returning({ id: customers.id });
        customerId = inserted[0].id;
      }

      const orderRes = await tx
        .insert(orders)
        .values({
          customerId,
          status: "placed",
          subtotal: subtotalCents,
          deliveryFee: deliveryCents,
          total: subtotalCents + deliveryCents,
          currency: "EUR",
          deliveryMethod,
          paymentMethod,
          billing,
          shipping,
        })
        .returning({ id: orders.id });

      const orderId = orderRes[0].id;

      for (const it of items) {
        const unitCents = toCents(it.price);
        await tx.insert(orderItems).values({
          orderId,
          productSlug: it.productSlug,
          productName: it.productName,
          quantity: it.quantity,
          unitPrice: unitCents,
          total: unitCents * it.quantity,
        });
      }

      return { orderId, customerId };
    });

    return Response.json({ ok: true, orderId: result.orderId, customerId: result.customerId });
  } catch {
    return Response.json({ ok: false, error: "could not place order" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    if (!customerId) return Response.json({ ok: true, orders: [] });

    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.customerId, Number(customerId)))
      .orderBy(orders.id);

    const withItems = await Promise.all(
      userOrders.map(async (o) => {
        const items = await db.select().from(orderItems).where(eq(orderItems.orderId, o.id));
        return { ...o, items };
      })
    );

    return Response.json({ ok: true, orders: withItems });
  } catch {
    return Response.json({ ok: false, error: "could not load orders" }, { status: 500 });
  }
}
