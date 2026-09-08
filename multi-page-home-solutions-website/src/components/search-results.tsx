"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product, Guide, Solution } from "@/lib/types";
import { ProductCard } from "./product-card";
import { Img } from "./ui";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";

export function SearchResults({
  query,
  products,
  guides,
  solutions,
}: {
  query: string;
  products: Product[];
  guides: Guide[];
  solutions: Solution[];
}) {
  const [tab, setTab] = useState<"all" | "products" | "guides" | "solutions">("all");
  const total = products.length + guides.length + solutions.length;

  const tabs = [
    { id: "all" as const, label: "All", count: total },
    { id: "products" as const, label: "Products", count: products.length },
    { id: "guides" as const, label: "Guides", count: guides.length },
    { id: "solutions" as const, label: "Solutions", count: solutions.length },
  ];

  if (total === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-line bg-cream px-6 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-stone text-olive"><Icon name="search" size={24} /></span>
        <h2 className="mt-4 font-serif text-xl text-charcoal">No results for “{query}”</h2>
        <p className="mt-2 max-w-sm text-ink-2">Try a different term, or browse a category to find what you need.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link href="/products" className="rounded-full bg-olive px-5 py-2.5 text-sm font-medium text-cream">Browse products</Link>
          <Link href="/guides" className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-charcoal">Read guides</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === t.id ? "bg-olive text-cream" : "border border-line bg-cream text-ink-2 hover:border-olive hover:text-olive-2"
            )}
          >
            {t.label}
            <span className={cn("text-xs", tab === t.id ? "text-cream/80" : "text-ink-3")}>{t.count}</span>
          </button>
        ))}
      </div>

      {(tab === "all" || tab === "products") && products.length > 0 && (
        <section className="mt-8">
          <SectionLabel label={`Products (${products.length})`} />
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, tab === "all" ? 4 : products.length).map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}

      {(tab === "all" || tab === "guides") && guides.length > 0 && (
        <section className={cn("mt-8", tab === "all" && "mt-12")}>
          <SectionLabel label={`Guides (${guides.length})`} />
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.slice(0, tab === "all" ? 3 : guides.length).map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group flex gap-4 rounded-2xl border border-line bg-cream p-4 transition-shadow hover:shadow-lift">
                <Img src={g.image} alt={g.title} className="h-20 w-24 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="text-xs text-ink-3">{g.category} · {g.readTime} read</p>
                  <p className="mt-1 font-serif leading-snug text-charcoal group-hover:text-olive-2">{g.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {(tab === "all" || tab === "solutions") && solutions.length > 0 && (
        <section className={cn("mt-8", tab === "all" && "mt-12")}>
          <SectionLabel label={`Solutions (${solutions.length})`} />
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.slice(0, tab === "all" ? 4 : solutions.length).map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-cream transition-shadow hover:shadow-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <Img src={s.image} alt={s.name} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="font-serif text-lg text-charcoal group-hover:text-olive-2">{s.name}</p>
                  <p className="mt-1 text-sm text-ink-3">{s.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return <h2 className="font-serif text-xl text-charcoal">{label}</h2>;
}
