"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart";
import { Container, Button, Input, Field } from "@/components/ui";
import { Icon } from "@/components/icon";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  postcode: "",
  country: "Ireland",
  deliveryMethod: "standard",
  paymentMethod: "card",
  sameAsBilling: true,
  acceptTerms: false,
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [confirm, setConfirm] = useState<{ orderId: number } | null>(null);

  const hasBulk = items.some((i) => (i.unit ?? "").toLowerCase().includes("pallet"));
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 120 ? 0 : hasBulk ? 0 : 9;
  const total = subtotal + deliveryFee;

  const update = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  if (state === "done" && confirm) {
    return (
      <div className="bg-ivory py-16">
        <Container className="mx-auto max-w-xl">
          <div className="rounded-3xl border border-line bg-cream p-8 text-center sm:p-12">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-olive/12 text-olive-2">
              <Icon name="checkCircle" size={32} />
            </span>
            <h1 className="mt-5 font-serif text-3xl text-charcoal">Thank you — order placed</h1>
            <p className="mt-3 text-ink-2">Your order <span className="font-semibold text-charcoal">#{confirm.orderId}</span> has been received. A confirmation email is on its way.</p>
            <div className="mt-6 rounded-2xl border border-line bg-ivory p-5 text-left text-sm text-ink-2">
              <p className="flex items-center gap-2"><Icon name="package" size={16} className="text-olive-2" /> We'll start processing your order shortly.</p>
              <p className="mt-2 flex items-center gap-2"><Icon name="truck" size={16} className="text-olive-2" /> You'll receive tracking once it's dispatched.</p>
              <p className="mt-2 flex items-center gap-2"><Icon name="user" size={16} className="text-olive-2" /> You can track it in your account.</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button href="/account" variant="primary" icon="arrowRight">View account</Button>
              <Button href="/products" variant="outline">Continue shopping</Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-ivory py-16">
        <Container className="mx-auto max-w-lg text-center">
          <div className="rounded-3xl border border-line bg-cream p-10">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone text-olive"><Icon name="cart" size={26} /></span>
            <h1 className="mt-4 font-serif text-2xl text-charcoal">Your cart is empty</h1>
            <p className="mt-2 text-ink-2">Add products before you can checkout.</p>
            <Button href="/products" className="mt-6" icon="arrowRight">Explore products</Button>
          </div>
        </Container>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acceptTerms) return;
    setState("loading");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone },
          shipping: { line1: form.address1, line2: form.address2, city: form.city, postcode: form.postcode, country: form.country },
          billing: { line1: form.address1, line2: form.address2, city: form.city, postcode: form.postcode, country: form.country },
          deliveryMethod: form.deliveryMethod,
          paymentMethod: form.paymentMethod,
          deliveryFee,
          items: items.map((i) => ({
            productSlug: i.productSlug,
            productName: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("order failed");
      if (typeof window !== "undefined") localStorage.setItem("havenwell.customerId", String(data.customerId));
      setConfirm({ orderId: data.orderId });
      clearCart();
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="bg-ivory py-10 sm:py-16">
      <Container className="max-w-6xl">
        <div className="mb-8">
          <p className="eyebrow text-olive">Checkout</p>
          <h1 className="mt-2 font-serif text-[clamp(2rem,4vw,2.75rem)] text-charcoal">Complete your order</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-ink-2">
            <Icon name="lock" size={15} /> Secure · Encrypted · <Link href="/delivery" className="text-olive-2 underline underline-offset-4">Delivery info</Link>
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            {/* Contact */}
            <CheckoutSection title="1. Contact details" icon="user">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" htmlFor="firstName"><Input id="firstName" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required /></Field>
                <Field label="Last name" htmlFor="lastName"><Input id="lastName" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required /></Field>
                <Field label="Email" htmlFor="email"><Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required placeholder="you@email.com" /></Field>
                <Field label="Phone" htmlFor="phone"><Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></Field>
              </div>
            </CheckoutSection>

            {/* Delivery */}
            <CheckoutSection title="2. Delivery address" icon="location">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><Field label="Address line 1" htmlFor="address1"><Input id="address1" value={form.address1} onChange={(e) => update("address1", e.target.value)} required /></Field></div>
                <div className="sm:col-span-2"><Field label="Address line 2 (optional)" htmlFor="address2"><Input id="address2" value={form.address2} onChange={(e) => update("address2", e.target.value)} /></Field></div>
                <Field label="City" htmlFor="city"><Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} required /></Field>
                <Field label="Postcode" htmlFor="postcode"><Input id="postcode" value={form.postcode} onChange={(e) => update("postcode", e.target.value)} required /></Field>
                <Field label="Country" htmlFor="country"><Input id="country" value={form.country} onChange={(e) => update("country", e.target.value)} /></Field>
              </div>
            </CheckoutSection>

            {/* Delivery method */}
            <CheckoutSection title="3. Delivery method" icon="truck">
              <div className="grid gap-3 sm:grid-cols-2">
                <RadioCard active={form.deliveryMethod === "standard"} onClick={() => update("deliveryMethod", "standard")}
                  title={hasBulk ? "Bulk delivery" : "Standard delivery"}
                  desc={hasBulk ? "Planned pallet delivery" : "Tracked courier, 1–2 working days"}
                  price={deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                />
                <RadioCard active={form.deliveryMethod === "express"} onClick={() => update("deliveryMethod", "express")}
                  title="Express" desc="Priority, where available" price="+€9"
                />
              </div>
            </CheckoutSection>

            {/* Payment */}
            <CheckoutSection title="4. Payment method" icon="card">
              <div className="grid gap-3 sm:grid-cols-3">
                <RadioCard active={form.paymentMethod === "card"} onClick={() => update("paymentMethod", "card")} title="Card" desc="Visa, Mastercard" />
                <RadioCard active={form.paymentMethod === "paypal"} onClick={() => update("paymentMethod", "paypal")} title="PayPal" desc="Secure" />
                <RadioCard active={form.paymentMethod === "instalments"} onClick={() => update("paymentMethod", "instalments")} title="Instalments" desc="For larger purchases" />
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-ink-3"><Icon name="lock" size={14} /> Payments are processed over an encrypted connection.</p>
            </CheckoutSection>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-line bg-cream p-6">
              <h2 className="font-serif text-xl text-charcoal">Order summary</h2>
              <ul className="mt-4 space-y-3">
                {items.map((i) => (
                  <li key={i.productSlug} className="flex items-center gap-3">
                    <img src={i.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-charcoal">{i.name}</p>
                      <p className="text-xs text-ink-3">Qty {i.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-charcoal">{formatPrice(i.price * i.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-y border-line py-4 text-sm">
                <div className="flex justify-between"><span className="text-ink-2">Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-ink-2">Delivery</span><span className="font-medium">{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span></div>
              </div>
              <div className="mt-4 flex justify-between"><span className="font-serif text-lg text-charcoal">Total</span><span className="font-serif text-2xl text-charcoal">{formatPrice(total)}</span></div>

              <label className="mt-5 flex items-start gap-3 text-sm text-ink-2">
                <input type="checkbox" checked={form.acceptTerms} onChange={(e) => update("acceptTerms", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-line text-olive focus:ring-olive" />
                <span>I agree to the <a href="/delivery" className="text-olive-2 underline underline-offset-2">delivery &amp; returns</a> terms. <Link href="/faq" className="text-olive-2 underline underline-offset-2">Questions?</Link></span>
              </label>

              <Button type="submit" variant="primary" size="lg" className="mt-5 w-full" icon="lock" disabled={state === "loading" || !form.acceptTerms}>
                {state === "loading" ? "Placing order…" : `Place order · ${formatPrice(total)}`}
              </Button>

              {state === "error" ? <p className="mt-3 text-center text-sm text-clay-2">Something went wrong. Please try again.</p> : null}

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-3">
                <Icon name="shield" size={14} /> Protected by secure checkout
              </div>
            </div>
          </aside>
        </form>
      </Container>
    </div>
  );
}

function CheckoutSection({ title, icon, children }: { title: string; icon: "user" | "location" | "truck" | "card"; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-line bg-cream p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-olive/12 text-olive-2"><Icon name={icon} size={18} /></span>
        <h2 className="font-serif text-xl text-charcoal">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function RadioCard({ active, onClick, title, desc, price }: { active: boolean; onClick: () => void; title: string; desc?: string; price?: string }) {
  return (
    <button type="button" onClick={onClick} className={cn("flex flex-col rounded-2xl border p-4 text-left transition-colors", active ? "border-olive bg-olive/5" : "border-line bg-cream hover:border-olive/40")}>
      <div className="flex items-center justify-between">
        <span className="font-medium text-charcoal">{title}</span>
        <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border", active ? "border-olive bg-olive" : "border-line")}>
          {active ? <span className="h-2 w-2 rounded-full bg-cream" /> : null}
        </span>
      </div>
      {desc ? <span className="mt-1 text-xs text-ink-3">{desc}</span> : null}
      {price ? <span className="mt-1 text-sm font-medium text-olive-2">{price}</span> : null}
    </button>
  );
}
