"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { topNav, site, guideCategories } from "@/data/site";
import { categories } from "@/data/categories";
import { solutions } from "@/data/solutions";
import { guides, featuredGuides } from "@/data/guides";
import { searchProducts } from "@/data/products";
import { useCart } from "./cart";
import { Icon, type IconName } from "./icon";
import { Button } from "./ui";
import { cn } from "@/lib/utils";

const parentCategories = categories.filter((c) => !c.future);
const pelletCategory = categories.find((c) => c.slug === "wood-pellets");

export function Header() {
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen, searchOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <div className="relative z-50">
        {/* Announcement bar */}
        <div className="bg-charcoal py-2.5 text-cream">
          <div className="container-x flex items-center justify-center gap-2 text-center text-xs sm:text-[13px]">
            <span className="flex items-center gap-1.5">
              <Icon name="truck" size={15} className="text-sage" />
              <span className="hidden sm:inline">Free standard delivery on orders over €120</span>
              <span className="sm:hidden">Free delivery over €120</span>
            </span>
            <span className="hidden text-cream/30 sm:inline">·</span>
            <Link href="/products/wood-pellets" className="hover:text-sage">
              Wood Pellets coming soon
            </Link>
          </div>
        </div>

        {/* Main header */}
        <header className="sticky top-0 border-b border-line bg-cream/90 backdrop-blur-md">
          <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-18">
            {/* Mobile menu button */}
            <button
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" size={22} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-olive text-cream">
                <Icon name="home" size={20} />
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight text-charcoal">
                {site.name}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              ref={navRef}
              onMouseLeave={() => setOpenMega(null)}
            >
              {topNav.map((item) => (
                <div key={item.label} className="relative">
                  <Link
                    href={item.href}
                    onMouseEnter={() => setOpenMega(item.mega ?? null)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-charcoal",
                      isActive(item.href) && "text-charcoal"
                    )}
                  >
                    {item.label}
                    {item.mega ? (
                      <Icon name="chevronDown" size={14} className={cn("transition-transform", openMega === item.mega && "rotate-180")} />
                    ) : null}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-ink/5"
                aria-label="Search"
              >
                <Icon name="search" size={20} />
              </button>
              <Link
                href="/account"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-ink/5 sm:inline-flex"
                aria-label="Account"
              >
                <Icon name="user" size={20} />
              </Link>
              <Link
                href="/cart"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-ink/5"
                aria-label="Cart"
              >
                <Icon name="cart" size={20} />
                {count > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[11px] font-bold text-cream">
                    {count}
                  </span>
                ) : null}
              </Link>
              <Button href="/products" variant="primary" size="sm" className="hidden sm:inline-flex">
                Explore products
              </Button>
            </div>
          </div>

          {/* Mega menu */}
          {openMega && <MegaMenu mega={openMega} onClose={() => setOpenMega(null)} />}
        </header>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}

      {/* Search overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function MegaMenu({ mega, onClose }: { mega: string; onClose: () => void }) {
  const megas: Record<string, { title: string; href: string; heading?: string }[]> = {
    products: parentCategories.map((c) => ({ title: c.navLabel, href: `/products/${c.slug}`, heading: c.tagline })),
    solutions: solutions.map((s) => ({ title: s.name, href: `/solutions/${s.slug}` })),
    guides: guideCategories.map((g) => ({ title: g.label, href: `/guides?category=${g.slug}` })),
  };

  const featuredTitle = mega === "products" ? "Featured products" : mega === "solutions" ? "Popular solutions" : "From the journal";

  return (
    <>
      <div className="fixed inset-0 top-[8.5rem] z-30 hidden bg-charcoal/10 lg:block" onClick={onClose} />
      <div className="absolute inset-x-0 z-40 hidden border-t border-line bg-cream shadow-lift lg:block">
        <div className="container-x grid gap-10 py-10" style={{ gridTemplateColumns: mega === "guides" ? "1fr 1.4fr" : "1.6fr 1fr" }}>
          <div>
            <p className="eyebrow text-olive capitalize">{mega}</p>
            <div className="mt-5 grid gap-6" style={{ gridTemplateColumns: mega === "products" ? "repeat(2,1fr)" : "1fr" }}>
              {megas[mega].map((i) => (
                <Link key={i.title} href={i.href} onClick={onClose} className="group block">
                  <span className="flex items-center gap-2 font-serif text-lg text-charcoal group-hover:text-olive-2">
                    {i.title}
                    <Icon name="arrowRight" size={15} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  {"heading" in i && i.heading ? (
                    <span className="mt-0.5 block text-sm text-ink-3">{i.heading}</span>
                  ) : null}
                </Link>
              ))}
              {mega === "products" && pelletCategory ? (
                <Link href={`/products/${pelletCategory.slug}`} onClick={onClose} className="group block">
                  <span className="flex items-center gap-2 font-serif text-lg text-olive-2">
                    {pelletCategory.name}
                    <span className="rounded-full bg-stone px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-3">
                      Coming soon
                    </span>
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-3">{pelletCategory.tagline}</span>
                </Link>
              ) : null}
            </div>
            <div className="mt-8">
              <Button href={`/${mega}`} variant="outline" size="sm" icon="arrowRight">
                View all {mega}
              </Button>
            </div>
          </div>

          <div className="border-l border-line pl-10">
            <p className="eyebrow text-ink-3">{featuredTitle}</p>
            <div className="mt-5 grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {featuredGuides.slice(0, 4).map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} onClick={onClose} className="group">
                  <img src={g.image} alt={g.title} className="aspect-[4/3] w-full rounded-xl object-cover" />
                  <p className="mt-2 line-clamp-2 text-sm font-medium text-charcoal group-hover:text-olive-2">{g.title}</p>
                  <p className="mt-0.5 text-xs text-ink-3">{g.category} · {g.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>("products");
  const { count } = useCart();

  const sections: Record<string, { label: string; href: string; children: { label: string; href: string }[] }> = {
    products: {
      label: "Products",
      href: "/products",
      children: [
        ...categories.map((c) => ({ label: c.navLabel, href: `/products/${c.slug}` })),
        { label: "All products", href: "/products" },
      ],
    },
    solutions: {
      label: "Solutions",
      href: "/solutions",
      children: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
    },
    guides: {
      label: "Guides",
      href: "/guides",
      children: [
        ...guideCategories.map((g) => ({ label: g.label, href: `/guides?category=${g.slug}` })),
        { label: "All guides", href: "/guides" },
      ],
    },
  };

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 flex h-full w-full max-w-sm flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-olive text-cream">
              <Icon name="home" size={18} />
            </span>
            <span className="font-serif text-lg font-semibold text-charcoal">{site.name}</span>
          </Link>
          <button onClick={onClose} className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5" aria-label="Close menu">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <nav className="space-y-1">
            {topNav.map((item) =>
              item.mega ? (
                <div key={item.label} className="border-b border-line pb-2">
                  <button
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium text-charcoal"
                    onClick={() => setExpanded(expanded === item.mega ? null : item.mega ?? null)}
                  >
                    {item.label}
                    <Icon name="chevronDown" size={18} className={cn("transition-transform", expanded === item.mega && "rotate-180")} />
                  </button>
                  {expanded === item.mega && (
                    <div className="space-y-0.5 px-3 pb-2">
                      {sections[item.mega].children.map((c) => (
                        <Link key={c.label} href={c.href} onClick={onClose} className="block rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-stone">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-charcoal hover:bg-stone"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="border-t border-line p-5">
          <div className="mb-3 grid grid-cols-2 gap-3">
            <Link href="/cart" onClick={onClose} className="relative flex items-center justify-center gap-2 rounded-full border border-line py-3 text-sm font-medium text-charcoal">
              <Icon name="cart" size={18} />
              Cart
              {count > 0 ? <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[11px] font-bold text-cream">{count}</span> : null}
            </Link>
            <Link href="/account" onClick={onClose} className="flex items-center justify-center gap-2 rounded-full border border-line py-3 text-sm font-medium text-charcoal">
              <Icon name="user" size={18} />
              Account
            </Link>
          </div>
          <Button href="/products" variant="primary" size="lg" className="w-full" onClick={onClose}>
            Explore products
          </Button>
        </div>
      </div>
    </div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const productResults = q.trim() ? searchProducts(q).slice(0, 4) : [];
  const guideResults = q.trim()
    ? guides.filter((g) => (g.title + " " + g.category + " " + g.excerpt).toLowerCase().includes(q.toLowerCase())).slice(0, 3)
    : [];
  const solutionResults = q.trim()
    ? solutions.filter((s) => (s.name + " " + s.tagline + " " + s.description).toLowerCase().includes(q.toLowerCase())).slice(0, 2)
    : [];
  const popular = ["smart thermostat", "winter", "heat pump", "paint", "energy"];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-charcoal/60 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto mt-0 flex h-full w-full max-w-2xl flex-col bg-cream shadow-2xl sm:mt-24 sm:rounded-3xl sm:border sm:border-line sm:h-auto">
        <form onSubmit={submit} className="flex items-center gap-3 border-b border-line px-6 py-4">
          <Icon name="search" size={20} className="text-ink-3" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, guides, solutions…"
            className="flex-1 bg-transparent text-lg text-charcoal placeholder:text-ink-3 focus:outline-none"
          />
          <button type="button" onClick={onClose} className="hidden text-sm text-ink-3 hover:text-charcoal sm:block">
            Esc
          </button>
          <button type="button" onClick={onClose} className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5 sm:hidden" aria-label="Close search">
            <Icon name="close" size={18} />
          </button>
        </form>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {!q.trim() && (
            <>
              <p className="eyebrow text-ink-3">Popular searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {popular.map((p) => (
                  <button key={p} onClick={() => setQ(p)} className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-2 hover:border-olive hover:text-olive-2">
                    {p}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <p className="eyebrow text-ink-3">Categories</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link href="/products" onClick={onClose} className="rounded-2xl border border-line p-4 hover:border-olive">
                    <span className="text-sm font-medium text-charcoal">Shop all products</span>
                    <span className="mt-1 block text-xs text-ink-3">Home Comfort · Energy &amp; Efficiency</span>
                  </Link>
                  <Link href="/guides" onClick={onClose} className="rounded-2xl border border-line p-4 hover:border-olive">
                    <span className="text-sm font-medium text-charcoal">Guides &amp; journal</span>
                    <span className="mt-1 block text-xs text-ink-3">Buying guides and seasonal advice</span>
                  </Link>
                </div>
              </div>
            </>
          )}

          {q.trim() && (
            <>
              {productResults.length + guideResults.length + solutionResults.length === 0 ? (
                <p className="py-6 text-center text-sm text-ink-2">
                  No results for “{q}”. Try a different search.
                </p>
              ) : (
                <>
                  {productResults.length > 0 && (
                    <ResultGroup title="Products" href={`/search?q=${encodeURIComponent(q)}&type=products`} onClose={onClose}>
                      {productResults.map((p) => (
                        <ResultItem key={p.slug} href={`/product/${p.slug}`} onClose={onClose} icon="box">
                          <span>{p.name}</span>
                          <span className="ml-auto shrink-0 font-medium text-charcoal">{/* price */}—</span>
                        </ResultItem>
                      ))}
                    </ResultGroup>
                  )}
                  {guideResults.length > 0 && (
                    <ResultGroup title="Guides" href={`/search?q=${encodeURIComponent(q)}&type=guides`} onClose={onClose}>
                      {guideResults.map((g) => (
                        <ResultItem key={g.slug} href={`/guides/${g.slug}`} onClose={onClose} icon="spark">
                          {g.title}
                        </ResultItem>
                      ))}
                    </ResultGroup>
                  )}
                  {solutionResults.length > 0 && (
                    <ResultGroup title="Solutions" href={`/search?q=${encodeURIComponent(q)}&type=solutions`} onClose={onClose}>
                      {solutionResults.map((s) => (
                        <ResultItem key={s.slug} href={`/solutions/${s.slug}`} onClose={onClose} icon="home">
                          {s.name}
                        </ResultItem>
                      ))}
                    </ResultGroup>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultGroup({ title, href, children, onClose }: { title: string; href: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-ink-3">{title}</p>
        <Link href={href} onClick={onClose} className="text-sm font-medium text-olive-2 hover:text-olive">
          View all
        </Link>
      </div>
      <div className="mt-2 divide-y divide-line rounded-2xl border border-line">{children}</div>
    </div>
  );
}

function ResultItem({ href, onClose, icon, children }: { href: string; onClose: () => void; icon: IconName; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClose} className="flex items-center gap-3 px-4 py-3 text-sm text-ink-2 hover:bg-stone">
      <Icon name={icon} size={16} className="shrink-0 text-olive" />
      {children}
    </Link>
  );
}
