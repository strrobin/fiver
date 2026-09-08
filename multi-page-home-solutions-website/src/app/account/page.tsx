"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart";
import { Container, Button, Input, Field, Badge } from "@/components/ui";
import { Icon, type IconName } from "@/components/icon";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Order {
  id: number;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
  items: { productName: string; quantity: number; unitPrice: number; total: number }[];
}

const PROFILE_KEY = "havenwell.profile";
const tabs = [
  { id: "dashboard", label: "Dashboard", icon: "home" as IconName },
  { id: "orders", label: "Orders", icon: "package" as IconName },
  { id: "wishlist", label: "Wishlist", icon: "heart" as IconName },
  { id: "details", label: "Account details", icon: "user" as IconName },
  { id: "addresses", label: "Addresses", icon: "location" as IconName },
];

export default function AccountPage() {
  const [active, setActive] = useState("dashboard");
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<{ firstName: string; lastName: string; email: string; phone: string }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [expanded, setExpanded] = useState<number | null>(null);
  const { wishlist } = useCart();

  useEffect(() => {
    const customerId = typeof window !== "undefined" ? localStorage.getItem("havenwell.customerId") : null;
    const savedProfile = typeof window !== "undefined" ? localStorage.getItem(PROFILE_KEY) : null;
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    else if (customerId) setProfile({ firstName: "Guest", lastName: "Customer", email: "guest@havenwell.eu", phone: "" });
    if (customerId) {
      fetch(`/api/orders?customerId=${customerId}`)
        .then((r) => r.json())
        .then((d) => setOrders(d.orders ?? []))
        .catch(() => setOrders([]));
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setProfile((p) => ({ ...p }));
  };

  const logout = useCallback(() => {
    localStorage.removeItem("havenwell.customerId");
    localStorage.removeItem(PROFILE_KEY);
    setOrders([]);
    setProfile({ firstName: "", lastName: "", email: "", phone: "" });
  }, []);

  const wishlisted = wishlist.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) as typeof products;
  const totalSpent = orders.reduce((s, o) => s + o.total, 0) / 100;
  const orderCount = orders.length;

  const greeting = profile.firstName ? `Hi, ${profile.firstName}` : "Welcome back";

  return (
    <div className="bg-ivory py-10 sm:py-16">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-olive">My account</p>
            <h1 className="mt-2 font-serif text-[clamp(2rem,4vw,3rem)] text-charcoal">{greeting}</h1>
            <p className="mt-2 text-ink-2">{profile.email || "Sign in to view your orders, wishlist and saved details."}</p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium text-charcoal hover:border-olive">
            <Icon name="logout" size={16} /> Log out
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Tabs */}
          <aside>
            <nav className="flex gap-2 overflow-x-auto no-scrollbar rounded-2xl border border-line bg-cream p-2 lg:flex-col lg:overflow-visible">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    active === t.id ? "bg-olive text-cream" : "text-ink-2 hover:bg-stone"
                  )}
                >
                  <Icon name={t.icon} size={17} />
                  {t.label}
                  {t.id === "wishlist" && wishlist.length > 0 ? (
                    <span className={cn("ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold", active === t.id ? "bg-cream/20 text-cream" : "bg-stone text-ink-3")}>{wishlist.length}</span>
                  ) : null}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div>
            {active === "dashboard" && (
              <DashboardTab orderCount={orderCount} totalSpent={totalSpent} wishlistCount={wishlist.length} onNavigate={setActive} />
            )}

            {active === "orders" && (
              <OrdersTab orders={orders} expanded={expanded} setExpanded={setExpanded} />
            )}

            {active === "wishlist" && (
              <div>
                <h2 className="font-serif text-2xl text-charcoal">Your wishlist</h2>
                {wishlisted.length === 0 ? (
                  <EmptyState icon="heart" title="Your wishlist is empty" text="Save products you love and they'll appear here." ctaHref="/products" ctaLabel="Explore products" />
                ) : (
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {wishlisted.map((p) => <ProductCard key={p.slug} product={p} />)}
                  </div>
                )}
              </div>
            )}

            {active === "details" && (
              <div>
                <h2 className="font-serif text-2xl text-charcoal">Account details</h2>
                <div className="mt-6 max-w-xl space-y-4 rounded-3xl border border-line bg-cream p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First name"><Input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} /></Field>
                    <Field label="Last name"><Input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} /></Field>
                  </div>
                  <Field label="Email"><Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></Field>
                  <Field label="Phone"><Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></Field>
                  <Button onClick={saveProfile} variant="primary">Save changes</Button>
                  <p className="text-xs text-ink-3">This is a demo account. Details are stored locally in your browser.</p>
                </div>
              </div>
            )}

            {active === "addresses" && (
              <div>
                <h2 className="font-serif text-2xl text-charcoal">Saved addresses</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <AddressCard default label="Default delivery" name={profile.firstName || "Guest"} address="14 Rosewood Avenue" city="Dublin 4" country="Ireland" />
                  <AddressCard label="Billing" name={profile.firstName || "Guest"} address="14 Rosewood Avenue" city="Dublin 4" country="Ireland" />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

function DashboardTab({ orderCount, totalSpent, wishlistCount, onNavigate }: { orderCount: number; totalSpent: number; wishlistCount: number; onNavigate: (t: string) => void }) {
  const cards = [
    { icon: "package" as IconName, label: "Orders", value: String(orderCount), tab: "orders" },
    { icon: "wallet" as IconName, label: "Total spent", value: formatPrice(totalSpent), tab: "orders" },
    { icon: "heart" as IconName, label: "Wishlist", value: String(wishlistCount), tab: "wishlist" },
    { icon: "location" as IconName, label: "Addresses", value: "2", tab: "addresses" },
  ];
  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal">Dashboard</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <button key={c.label} onClick={() => onNavigate(c.tab)} className="rounded-2xl border border-line bg-cream p-5 text-left transition-shadow hover:shadow-lift">
            <Icon name={c.icon} size={20} className="text-olive-2" />
            <div className="mt-3 font-serif text-2xl text-charcoal">{c.value}</div>
            <div className="text-sm text-ink-3">{c.label}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-charcoal p-6 text-cream">
          <Icon name="spark" size={20} className="text-sage" />
          <h3 className="mt-3 font-serif text-xl text-cream">Reorder your essentials</h3>
          <p className="mt-2 text-sm text-cream/70">Seasonal items are easy to re-order from your past purchases.</p>
          <Button href="/products" variant="light" size="sm" className="mt-4">Start shopping</Button>
        </div>
        <div className="rounded-3xl border border-line bg-cream p-6">
          <Icon name="mail" size={20} className="text-olive-2" />
          <h3 className="mt-3 font-serif text-xl text-charcoal">Seasonal reminder</h3>
          <p className="mt-2 text-sm text-ink-2">Join the newsletter to get timely seasonal checklists and product news.</p>
          <Button href="/guides" variant="outline" size="sm" className="mt-4">Browse guides</Button>
        </div>
      </div>
    </div>
  );
}

function OrdersTab({ orders, expanded, setExpanded }: { orders: Order[]; expanded: number | null; setExpanded: (n: number | null) => void }) {
  if (orders.length === 0) {
    return <EmptyState icon="package" title="No orders yet" text="When you place an order it'll show up here, ready to track or re-order." ctaHref="/products" ctaLabel="Start shopping" />;
  }
  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal">Your orders</h2>
      <div className="mt-6 space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-3xl border border-line bg-cream p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive/12 text-olive-2"><Icon name="box" size={20} /></span>
                <div>
                  <p className="font-serif text-lg text-charcoal">Order #{o.id}</p>
                  <p className="text-xs text-ink-3">{fmtDate(o.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={o.status === "placed" ? "olive" : "outline"}>{o.status}</Badge>
                <span className="font-serif text-lg text-charcoal">{formatPrice(o.total / 100)}</span>
                <button onClick={() => setExpanded(expanded === o.id ? null : o.id)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line hover:bg-stone" aria-label="View order">
                  <Icon name="chevronDown" size={16} className={cn("transition-transform", expanded === o.id && "rotate-180")} />
                </button>
              </div>
            </div>
            {expanded === o.id && (
              <div className="mt-4 rounded-2xl border border-line bg-ivory p-5">
                <ul className="space-y-2">
                  {o.items.map((it, i) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span className="text-ink-2">{it.productName} × {it.quantity}</span>
                      <span className="font-medium text-charcoal">{formatPrice(it.total / 100)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-end">
                  <Button href="/products" variant="outline" size="sm" icon="refresh">Re-order</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ icon, title, text, ctaHref, ctaLabel }: { icon: IconName; title: string; text: string; ctaHref: string; ctaLabel: string }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-line bg-cream px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-stone text-olive"><Icon name={icon} size={26} /></span>
      <h2 className="mt-4 font-serif text-xl text-charcoal">{title}</h2>
      <p className="mt-2 max-w-sm text-ink-2">{text}</p>
      <Button href={ctaHref} className="mt-5" icon="arrowRight">{ctaLabel}</Button>
    </div>
  );
}

function AddressCard({ label, name, address, city, country, default: isDefault }: { label: string; name: string; address: string; city: string; country: string; default?: boolean }) {
  return (
    <div className="rounded-3xl border border-line bg-cream p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-ink-3">{label}</p>
        {isDefault ? <Badge tone="olive">Default</Badge> : null}
      </div>
      <p className="mt-3 font-serif text-lg text-charcoal">{name}</p>
      <p className="mt-1 text-sm text-ink-2">{address}</p>
      <p className="text-sm text-ink-2">{city}, {country}</p>
      <button className="mt-4 text-sm font-medium text-olive-2 hover:text-olive">Edit</button>
    </div>
  );
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
