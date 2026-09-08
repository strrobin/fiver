"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, Quantity } from "@/components/cart";
import { Container, Button } from "@/components/ui";
import { Icon } from "@/components/icon";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, count } = useCart();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState<string | null>(null);

  const hasBulk = items.some((i) => (i.unit ?? "").toLowerCase().includes("pallet"));
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 120 ? 0 : hasBulk ? 0 : 9;
  const discount = applied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="bg-ivory py-10 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-olive">Your cart</p>
            <h1 className="mt-2 font-serif text-[clamp(2rem,5vw,3rem)] text-charcoal">Shopping cart</h1>
            <p className="mt-2 text-ink-2">{count} {count === 1 ? "item" : "items"} in your cart</p>
          </div>
          <Button href="/products" variant="outline" icon="arrowRight">Continue shopping</Button>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-line bg-cream px-6 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone text-olive">
              <Icon name="cart" size={28} />
            </span>
            <h2 className="mt-5 font-serif text-2xl text-charcoal">Your cart is empty</h2>
            <p className="mt-2 max-w-sm text-ink-2">Add some products to get started. Explore our carefully selected range for a more comfortable home.</p>
            <Button href="/products" variant="primary" size="lg" className="mt-6" icon="arrowRight">
              Explore products
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Items */}
            <div className="space-y-4">
              {items.map((i) => (
                <div key={i.productSlug} className="flex gap-5 rounded-3xl border border-line bg-cream p-4 sm:p-5">
                  <Link href={`/product/${i.productSlug}`} className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/product/${i.productSlug}`} className="font-serif text-lg text-charcoal hover:text-olive-2">
                          {i.name}
                        </Link>
                        <p className="text-xs text-ink-3">{i.brand}{i.categoryName ? ` · ${i.categoryName}` : ""}</p>
                        {i.unit ? <p className="mt-0.5 text-xs text-ink-3">{i.unit}</p> : null}
                      </div>
                      <button onClick={() => removeItem(i.productSlug)} className="text-ink-3 hover:text-clay" aria-label={`Remove ${i.name}`}>
                        <Icon name="close" size={18} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <Quantity value={i.quantity} onChange={(v) => updateQuantity(i.productSlug, v)} size="sm" />
                      <div className="text-right">
                        <p className="font-serif text-lg text-charcoal">{formatPrice(i.price * i.quantity)}</p>
                        <p className="text-xs text-ink-3">{formatPrice(i.price)} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-line bg-cream p-6">
                <h2 className="font-serif text-xl text-charcoal">Order summary</h2>

                {/* Promo */}
                <div className="mt-5">
                  <label className="mb-1.5 block text-sm font-medium text-ink-2">Promo code</label>
                  {applied ? (
                    <div className="flex items-center justify-between rounded-2xl border border-olive bg-olive/10 px-4 py-3 text-sm">
                      <span className="font-medium text-olive-2">{applied} applied</span>
                      <button onClick={() => { setApplied(null); setPromo(""); }} className="text-olive-2 hover:text-olive">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder="Enter code"
                        className="min-w-0 flex-1 rounded-full border border-line bg-cream px-4 py-2.5 text-sm focus:border-olive focus:outline-none"
                      />
                      <button
                        onClick={() => ifFulfilled(promo, () => setApplied(promo.toUpperCase()))}
                        className="rounded-full bg-olive px-4 py-2.5 text-sm font-medium text-cream hover:bg-olive-2"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  <p className="mt-1.5 text-xs text-ink-3">Try <span className="font-medium text-olive-2">WELCOME</span> for 10% off.</p>
                </div>

                <div className="mt-5 space-y-3 border-y border-line py-5 text-sm">
                  <Row label="Subtotal" value={formatPrice(subtotal)} />
                  <Row label="Delivery" value={deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)} />
                  {hasBulk ? <p className="text-xs text-ink-3">Bulk/pallet delivery is arranged separately — no charge shown here.</p> : null}
                  {discount > 0 ? <Row label="Promo discount" value={`−${formatPrice(discount)}`} accent /> : null}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-serif text-lg text-charcoal">Order total</span>
                  <span className="font-serif text-2xl text-charcoal">{formatPrice(total)}</span>
                </div>
                <p className="mt-1 text-xs text-ink-3">Taxes included. Delivery calculated at checkout.</p>

                <Button href="/checkout" variant="primary" size="lg" className="mt-5 w-full" icon="arrowRight">
                  Proceed to checkout
                </Button>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-ink-3">
                  <Icon name="lock" size={14} />
                  Secure encrypted checkout
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {["Visa", "MC", "PayPal", "Klarna", "Apple Pay"].map((p) => (
                    <span key={p} className="rounded-md border border-line px-2 py-1 text-[10px] font-semibold text-ink-3">{p}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-olive/10 p-4 text-sm text-olive-2">
                <Icon name="truck" size={20} className="shrink-0" />
                {subtotal >= 120 ? "You've unlocked free standard delivery." : `Add ${formatPrice(120 - subtotal)} more for free delivery.`}
              </div>
            </aside>
          </div>
        )}
      </Container>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-2">{label}</span>
      <span className={accent ? "font-semibold text-olive-2" : "font-medium text-charcoal"}>{value}</span>
    </div>
  );
}

function ifFulfilled(code: string, cb: () => void) {
  if (code.trim().length > 0) cb();
}
