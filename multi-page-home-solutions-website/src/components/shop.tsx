"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { Icon } from "./icon";
import { ProductCard } from "./product-card";
import { Input } from "./ui";
import { cn } from "@/lib/utils";

interface FilterChip {
  slug: string;
  name: string;
  count: number;
}

const priceBuckets = [
  { id: "all", label: "All prices", test: () => true },
  { id: "under100", label: "Under €100", test: (p: Product) => p.price < 100 },
  { id: "100-500", label: "€100 – €500", test: (p: Product) => p.price >= 100 && p.price <= 500 },
  { id: "over500", label: "Over €500", test: (p: Product) => p.price > 500 },
];

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
];

export function Shop({
  products,
  facetCategories,
  otherCategories,
  locked,
  pageSize = 8,
}: {
  products: Product[];
  facetCategories?: FilterChip[];
  otherCategories?: { label: string; href: string }[];
  locked?: boolean;
  pageSize?: number;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [price, setPrice] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);

  const filtered = useMemo(() => {
    let list = products;
    const bucket = priceBuckets.find((b) => b.id === price) ?? priceBuckets[0];
    if (category !== "all") list = list.filter((p) => p.categorySlug === category);
    if (bucket.id !== "all") list = list.filter(bucket.test);
    if (inStockOnly) list = list.filter((p) => p.availability === "in-stock");
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.brand, p.shortDescription, p.categoryName, ...(p.tags ?? [])].join(" ").toLowerCase().includes(q)
      );
    }
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.rating - a.rating);
    }
    return sorted;
  }, [products, category, price, inStockOnly, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setCategory("all");
    setPrice("all");
    setInStockOnly(false);
    setQuery("");
    setPage(1);
  };

  const activeFilterCount = (category !== "all" ? 1 : 0) + (price !== "all" ? 1 : 0) + (inStockOnly ? 1 : 0);

  const filtersPanel = (
    <div className="space-y-7">
      {facetCategories ? (
        <section>
          <h3 className="eyebrow text-ink-3">Categories</h3>
          <div className="mt-3 space-y-1">
            <CategoryRow
              active={category === "all"}
              label="All products"
              count={products.length}
              onClick={() => { setCategory("all"); setPage(1); }}
            />
            {facetCategories.map((c) => (
              <CategoryRow
                key={c.slug}
                active={category === c.slug}
                label={c.name}
                count={c.count}
                onClick={() => { setCategory(category === c.slug ? "all" : c.slug); setPage(1); }}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h3 className="eyebrow text-ink-3">Price</h3>
        <div className="mt-3 space-y-1">
          {priceBuckets.map((b) => (
            <CategoryRow
              key={b.id}
              active={price === b.id}
              label={b.label}
              onClick={() => { setPrice(b.id); setPage(1); }}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="eyebrow text-ink-3">Availability</h3>
        <label className="mt-3 flex cursor-pointer items-center justify-between">
          <span className="text-sm text-ink-2">In stock only</span>
          <button
            type="button"
            role="switch"
            aria-checked={inStockOnly}
            onClick={() => setInStockOnly((v) => !v)}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors",
              inStockOnly ? "bg-olive" : "bg-line"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-cream transition-all",
                inStockOnly ? "left-[22px]" : "left-0.5"
              )}
            />
          </button>
        </label>
      </section>

      {activeFilterCount > 0 ? (
        <button onClick={resetFilters} className="text-sm font-medium text-olive-2 hover:text-olive">
          Clear all filters ({activeFilterCount})
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-7">
          {otherCategories && (
            <section>
              <h3 className="eyebrow text-ink-3">Categories</h3>
              <div className="mt-3 space-y-1">
                {otherCategories.map((c) => (
                  <Link key={c.href} href={c.href} className="block rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-stone">
                    {c.label}
                  </Link>
                ))}
              </div>
            </section>
          )}
          {filtersPanel}
        </div>
      </aside>

      {/* Main */}
      <div>
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-line pb-5">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Icon name="search" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
              <Input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search products…"
                className="pl-11"
              />
            </div>
            <button
              onClick={() => setDrawer(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-cream px-4 text-sm font-medium text-charcoal lg:hidden"
            >
              <Icon name="filter" size={16} />
              Filters
              {activeFilterCount > 0 ? <span className="rounded-full bg-olive px-1.5 text-[11px] font-bold text-cream">{activeFilterCount}</span> : null}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-2">
              <span className="font-semibold text-charcoal">{filtered.length}</span> {filtered.length === 1 ? "product" : "products"}
            </p>
            <label className="flex items-center gap-2 text-sm text-ink-2">
              <span className="hidden sm:inline">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-line bg-cream px-4 py-2 text-sm text-charcoal focus:border-olive focus:outline-none"
              >
                {sortOptions.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-stone text-olive">
              <Icon name="search" size={24} />
            </span>
            <p className="mt-4 font-serif text-xl text-charcoal">No products found</p>
            <p className="mt-1 text-sm text-ink-2">Try adjusting your search or filters.</p>
            <button onClick={resetFilters} className="mt-4 text-sm font-medium text-olive-2 hover:text-olive">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-10 flex items-center justify-center gap-1.5">
            <PagerBtn disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} label="Previous">
              <Icon name="chevronRight" size={16} className="rotate-180" />
            </PagerBtn>
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={cn(
                  "h-9 w-9 rounded-full text-sm font-medium transition-colors",
                  currentPage === i + 1 ? "bg-olive text-cream" : "text-ink-2 hover:bg-stone"
                )}
              >
                {i + 1}
              </button>
            ))}
            <PagerBtn disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} label="Next">
              <Icon name="chevronRight" size={16} />
            </PagerBtn>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={() => setDrawer(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-cream shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h3 className="font-serif text-lg text-charcoal">Filters</h3>
              <button onClick={() => setDrawer(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5" aria-label="Close filters">
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="h-[calc(100%-4rem)] overflow-y-auto p-5">
              {filtersPanel}
            </div>
            <div className="border-t border-line p-5">
              <button onClick={() => setDrawer(false)} className="w-full rounded-full bg-olive py-3 text-sm font-medium text-cream">
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryRow({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
        active ? "bg-olive/10 font-medium text-olive-2" : "text-ink-2 hover:bg-stone"
      )}
    >
      <span>{label}</span>
      {count !== undefined ? <span className="text-xs text-ink-3">{count}</span> : null}
    </button>
  );
}

function PagerBtn({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-stone disabled:opacity-40"
    >
      {children}
    </button>
  );
}
