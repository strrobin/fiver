"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { formatPrice } from "@/lib/utils";
import { Button, Input, Textarea, Field, Label } from "./ui";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/types";

// ---------- Reveal on view ----------
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}

// ---------- Accordion ----------
export function Accordion({
  items,
  defaultOpen = 0,
  className,
}: {
  items: FaqItem[];
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen === undefined ? 0 : defaultOpen);
  return (
    <div className={cn("divide-y divide-line rounded-2xl border border-line bg-cream", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-charcoal">{item.q}</span>
              <Icon
                name="plus"
                size={18}
                className={cn("shrink-0 text-olive transition-transform duration-200", isOpen && "rotate-45")}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-ink-2">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Tabs ----------
export function TabButtonBar({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1 overflow-x-auto border-b border-line no-scrollbar", className)}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "relative whitespace-nowrap px-4 py-3 text-sm font-medium text-ink-3 transition-colors hover:text-charcoal",
            active === t.id && "text-charcoal"
          )}
        >
          {t.label}
          {active === t.id ? <span className="absolute inset-x-4 -bottom-px h-0.5 bg-olive" /> : null}
        </button>
      ))}
    </div>
  );
}

export function Tabs({
  tabs,
  active,
  onChange,
  children,
  className,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <TabButtonBar tabs={tabs} active={active} onChange={onChange} />
      <div className="pt-6">{children}</div>
    </div>
  );
}

// ---------- Newsletter ----------
export function NewsletterForm({ dark }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setState("done");
        setEmail("");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <p className="text-sm text-sage">
        Thank you — you're on the list. We'll keep you informed of new products and guides.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className={cn(
          "h-11 flex-1 rounded-full border px-4 text-sm focus:outline-none",
          dark ? "border-cream/20 bg-cream/10 text-cream placeholder:text-cream/50 focus:border-sage" : "border-line bg-cream text-charcoal placeholder:text-ink-3 focus:border-olive"
        )}
        required
      />
      <button
        type="submit"
        className="inline-flex h-11 items-center gap-2 rounded-full bg-cream px-6 text-sm font-medium text-charcoal transition-colors hover:bg-white"
        disabled={state === "loading"}
      >
        {state === "loading" ? "Joining…" : "Join"}
      </button>
    </form>
  );
}

// ---------- Contact form ----------
export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setState("done");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-cream p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-olive/12 text-olive-2">
          <Icon name="checkCircle" size={28} />
        </span>
        <h3 className="font-serif text-2xl text-charcoal">Message sent</h3>
        <p className="max-w-sm text-ink-2">
          Thank you for reaching out. Our team will get back to you within one business day.
        </p>
        <Button variant="outline" size="sm" onClick={() => { setState("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-line bg-cream p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="c-name">
          <Input id="c-name" value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="Your full name" />
        </Field>
        <Field label="Email" htmlFor="c-email">
          <Input id="c-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required placeholder="you@email.com" />
        </Field>
      </div>
      <Field label="Subject" htmlFor="c-subject">
        <Input id="c-subject" value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="How can we help?" />
      </Field>
      <Field label="Message" htmlFor="c-message">
        <Textarea id="c-message" value={form.message} onChange={(e) => update("message", e.target.value)} required placeholder="Tell us about your enquiry…" />
      </Field>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-ink-3">We reply within one business day.</p>
        <Button type="submit" variant="primary" disabled={state === "loading"}>
          {state === "loading" ? "Sending…" : "Send message"}
        </Button>
      </div>
      {state === "error" ? <p className="text-sm text-clay-2">Something went wrong. Please try again.</p> : null}
    </form>
  );
}

// ---------- Lead form (solutions) ----------
export function LeadForm({ solution }: { solution: string }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", notes: "" });
  if (done) {
    return (
      <div className="rounded-3xl bg-charcoal p-8 text-cream">
        <Icon name="checkCircle" size={32} className="text-sage" />
        <h3 className="mt-4 font-serif text-2xl">Request received</h3>
        <p className="mt-2 text-cream/70">
          Thanks for your interest in {solution}. A specialist will be in touch shortly.
        </p>
      </div>
    );
  }
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <div>
        <Label htmlFor="lead-name">Name</Label>
        <Input id="lead-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
      </div>
      <div>
        <Label htmlFor="lead-email">Email</Label>
        <Input id="lead-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
      </div>
      <div>
        <Label htmlFor="lead-notes">What would you like help with?</Label>
        <Textarea id="lead-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="A few details about your home or project…" />
      </div>
      <Button type="submit" variant="light" size="md" className="w-full">
        Request guidance
      </Button>
      <p className="text-center text-xs text-cream/60">We'll only use your details to respond to your enquiry.</p>
    </form>
  );
}

// ---------- Table of contents ----------
export function TableOfContents({ items }: { items: string[] }) {
  const [active, setActive] = useState(items[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    items.forEach((h) => {
      const el = document.getElementById(h);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="rounded-2xl border border-line bg-cream p-5">
      <p className="eyebrow text-ink-3">On this page</p>
      <ul className="mt-3 space-y-1.5">
        {items.map((h) => (
          <li key={h}>
            <a
              href={`#${h}`}
              className={cn(
                "block border-l-2 py-1 pl-3 text-sm transition-colors",
                active === h ? "border-olive font-medium text-olive-2" : "border-transparent text-ink-2 hover:text-charcoal"
              )}
            >
              {h}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Re-exports for convenience
export const prettyPrice = formatPrice;
