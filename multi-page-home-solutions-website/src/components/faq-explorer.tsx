"use client";

import { useMemo, useState } from "react";
import type { Faq } from "@/lib/types";
import { Accordion } from "./interactive";
import { Icon } from "./icon";
import { Input } from "./ui";
import { cn } from "@/lib/utils";

export function FAQExplorer({ faqs, categories }: { faqs: Faq[]; categories: string[] }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = faqs;
    if (active !== "all") list = list.filter((f) => f.category === active);
    if (q) list = list.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q));
    return list;
  }, [faqs, active, query]);

  const grouped = useMemo(() => {
    const byCat = new Map<string, { q: string; a: string }[]>();
    for (const f of filtered) {
      const arr = byCat.get(f.category) ?? [];
      arr.push({ q: f.question, a: f.answer });
      byCat.set(f.category, arr);
    }
    return [...byCat.entries()];
  }, [filtered]);

  const visibleCats = query.trim() ? [...new Set(filtered.map((f) => f.category))] : categories;

  return (
    <div>
      {/* Search */}
      <div className="mx-auto max-w-xl">
        <div className="relative">
          <Icon name="search" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a question…"
            className="h-13 pl-11"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <TabButton label="All" active={active === "all"} onClick={() => setActive("all")} />
        {visibleCats.map((c) => (
          <TabButton key={c} label={c} active={active === c} onClick={() => setActive(c)} />
        ))}
      </div>

      {/* Groups */}
      <div className="mx-auto mt-10 max-w-3xl space-y-10">
        {grouped.length === 0 ? (
          <p className="py-10 text-center text-ink-2">No questions match “{query}”. Try a different search.</p>
        ) : (
          grouped.map(([category, items]) => (
            <div key={category}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="font-serif text-2xl text-charcoal">{category}</h2>
                <span className="rounded-full bg-stone px-2.5 py-0.5 text-xs font-semibold text-ink-3">{items.length}</span>
              </div>
              <Accordion items={items} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active ? "bg-olive text-cream" : "border border-line bg-cream text-ink-2 hover:border-olive hover:text-olive-2"
      )}
    >
      {label}
    </button>
  );
}
