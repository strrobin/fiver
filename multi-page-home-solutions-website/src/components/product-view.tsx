"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Button, Badge, Stars } from "./ui";
import { useCart, Quantity } from "./cart";
import { Icon } from "./icon";
import { Reveal, Accordion, Tabs } from "./interactive";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const images = product.images;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[active]} alt={product.name} className="h-full w-full object-cover" />
        {product.badge ? (
          <Badge tone={product.badge === "Coming soon" ? "charcoal" : "olive"} className="absolute left-4 top-4">
            {product.badge}
          </Badge>
        ) : null}
        {product.compareAtPrice ? (
          <span className="absolute right-4 top-4 rounded-full bg-clay px-3 py-1 text-xs font-semibold text-cream">
            Save {formatPrice(product.compareAtPrice - product.price)}
          </span>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-xl border-2 bg-cream transition-colors",
                active === i ? "border-olive" : "border-transparent hover:border-line"
              )}
              aria-label={`View image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const availability = {
    "in-stock": { label: "In stock", tone: "olive" as const },
    "low-stock": { label: "Low stock", tone: "clay" as const },
    "made-to-order": { label: "Made to order", tone: "sage" as const },
    preorder: { label: "Pre-order — coming soon", tone: "charcoal" as const },
  }[product.availability];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2">
          <Badge tone="outline">{product.categoryName}</Badge>
          <span className="text-xs text-ink-3">{product.brand}</span>
        </div>
        <h1 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-charcoal">
          {product.name}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink-2">{product.shortDescription}</p>
      </div>

      <div className="flex items-center gap-3">
        <Stars rating={product.rating} />
        <span className="text-sm text-ink-2">{product.rating} · {product.reviewCount} reviews</span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-serif text-4xl text-charcoal">{formatPrice(product.price)}</span>
        {product.compareAtPrice ? (
          <span className="text-lg text-ink-3 line-through">{formatPrice(product.compareAtPrice)}</span>
        ) : null}
        {product.priceUnit ? <span className="text-sm text-ink-3">{product.priceUnit}</span> : null}
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className={cn("inline-flex h-2 w-2 rounded-full", availability.tone === "olive" ? "bg-olive" : availability.tone === "clay" ? "bg-clay" : availability.tone === "sage" ? "bg-sage" : "bg-charcoal")} />
        <span className="font-medium text-charcoal">{availability.label}</span>
        <span className="text-ink-3">· Usually dispatched in 1–2 working days</span>
      </div>

      <div className="space-y-3 border-y border-line py-5">
        <div className="flex items-center gap-3">
          <Quantity value={qty} onChange={setQty} />
          <Button
            onClick={() => addItem(product, qty)}
            variant="primary"
            size="lg"
            icon="cart"
            className="flex-1"
            ariaLabel={`Add ${product.name} to cart`}
          >
            Add to cart
          </Button>
        </div>
        <div className="flex gap-3">
          <Button href="/products" variant="outline" size="md" className="flex-1">
            Continue shopping
          </Button>
          <Button href="/why-us" variant="ghost" size="md" className="flex-1">
            Why shop with us
          </Button>
        </div>
      </div>

      <ul className="grid gap-2 text-sm text-ink-2 sm:grid-cols-2">
        {[
          { icon: "truck", t: "Free delivery over €120" },
          { icon: "refresh", t: "Easy returns within 30 days" },
          { icon: "shield", t: "Warranty & quality checked" },
          { icon: "lock", t: "Secure encrypted checkout" },
        ].map((x) => (
          <li key={x.t} className="flex items-center gap-2">
            <Icon name={x.icon as "truck"} size={16} className="text-olive-2" />
            {x.t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState("description");
  const tabs = [
    { id: "description", label: "Description" },
    { id: "benefits", label: "Benefits" },
    { id: "specs", label: "Specifications" },
    { id: "faq", label: "FAQ" },
    { id: "reviews", label: `Reviews (${product.reviewCount})` },
  ];

  return (
    <div>
      <Tabs tabs={tabs} active={active} onChange={setActive}>
        {active === "description" && <p className="prose-article">{product.description}</p>}
        {active === "benefits" && (
          <div className="grid gap-3 sm:grid-cols-3">
            {product.benefits.map((b) => (
              <div key={b} className="rounded-2xl border border-line bg-cream p-5">
                <Icon name="check" size={18} className="text-olive-2" />
                <p className="mt-2 text-sm text-ink-2">{b}</p>
              </div>
            ))}
          </div>
        )}
        {active === "specs" && <ProductSpecs product={product} />}
        {active === "faq" && <Accordion items={product.faqs} />}
        {active === "reviews" && <ProductReviews product={product} />}
      </Tabs>
    </div>
  );
}

function ProductSpecs({ product }: { product: Product }) {
  return (
    <dl className="divide-y divide-line rounded-2xl border border-line">
      {product.specs.map((s) => (
        <div key={s.label} className="grid grid-cols-2 gap-4 px-5 py-3.5 sm:grid-cols-3">
          <dt className="text-sm text-ink-2">{s.label}</dt>
          <dd className="col-span-2 text-sm font-medium text-charcoal sm:col-span-2">{s.value}</dd>
        </div>
      ))}
      {product.technical
        ? Object.entries(product.technical).map(([k, v]) => (
            <div key={k} className="grid grid-cols-2 gap-4 px-5 py-3.5 sm:grid-cols-3">
              <dt className="text-sm text-ink-2">{k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</dt>
              <dd className="col-span-2 text-sm font-medium text-charcoal sm:col-span-2">{v}</dd>
            </div>
          ))
        : null}
    </dl>
  );
}

function ProductReviews({ product }: { product: Product }) {
  const sample = [
    { name: "Verified buyer", text: "Exactly as described and arrived quickly. Quality feels excellent and it works as expected." },
    { name: "Verified buyer", text: "Great value for money. Clear delivery updates and the product does exactly what it promises." },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-line bg-cream p-5">
        <div className="flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-sm font-medium text-charcoal">{product.rating}</span>
        </div>
        <p className="mt-2 text-sm text-ink-2">Based on {product.reviewCount} verified reviews.</p>
      </div>
      {sample.map((r, i) => (
        <div key={i} className="rounded-2xl border border-line bg-cream p-5">
          <div className="flex items-center justify-between">
            <Stars rating={5} size={14} />
            <span className="text-xs text-ink-3">{r.name}</span>
          </div>
          <p className="mt-3 text-sm text-ink-2">{r.text}</p>
        </div>
      ))}
    </div>
  );
}

export function RecentlyViewed({
  currentSlug,
  products,
}: {
  currentSlug: string;
  products: Product[];
}) {
  const [recent, setRecent] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const key = "havenwell.recent.v1";
    const list: string[] = JSON.parse(localStorage.getItem(key) ?? "[]");
    const updated = [currentSlug, ...list.filter((s) => s !== currentSlug)].slice(0, 6);
    localStorage.setItem(key, JSON.stringify(updated));
    setRecent(updated.filter((s) => s !== currentSlug));
    setReady(true);
  }, [currentSlug]);

  if (!ready || recent.length === 0) return null;
  const items = recent.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as Product[];
  if (items.length === 0) return null;
  return (
    <Reveal>
      <div className="flex items-end justify-between">
        <h2 className="font-serif text-2xl text-charcoal">Recently viewed</h2>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((p) => (
          <a key={p.slug} href={`/product/${p.slug}`} className="group rounded-2xl border border-line bg-cream p-3 transition-shadow hover:shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.images[0]} alt={p.name} className="aspect-square w-full rounded-xl object-cover" />
            <p className="mt-3 truncate text-sm font-medium text-charcoal group-hover:text-olive-2">{p.name}</p>
            <p className="text-sm text-ink-3">{formatPrice(p.price)}</p>
          </a>
        ))}
      </div>
    </Reveal>
  );
}
