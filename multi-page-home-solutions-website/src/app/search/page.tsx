import type { Metadata } from "next";
import { searchProducts } from "@/data/products";
import { guides } from "@/data/guides";
import { solutions } from "@/data/solutions";
import { categories } from "@/data/categories";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui";
import { SearchResults } from "@/components/search-results";
import { Icon } from "@/components/icon";
import Link from "next/link";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const productResults = query ? searchProducts(query) : [];
  const guideResults = query
    ? guides.filter((g) => `${g.title} ${g.category} ${g.excerpt}`.toLowerCase().includes(query.toLowerCase()))
    : [];
  const solutionResults = query
    ? solutions.filter((s) => `${s.name} ${s.tagline} ${s.description}`.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
        eyebrow="Search"
        title={query ? `Results for “${query}”` : "Search the site"}
        subtitle="Find products, guides and solutions across Havenwell."
        compact
      />

      <Section>
        <Container>
          {query ? (
            <SearchResults
              query={query}
              products={productResults}
              guides={guideResults}
              solutions={solutionResults}
            />
          ) : (
            <div className="mx-auto max-w-2xl">
              <p className="eyebrow text-ink-3">Popular categories</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {categories.map((c) => (
                  <Link key={c.slug} href={`/products/${c.slug}`} className="group rounded-2xl border border-line bg-cream p-5 transition-shadow hover:shadow-lift">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive/12 text-olive-2"><Icon name="spark" size={18} /></span>
                      <div>
                        <p className="font-serif text-charcoal group-hover:text-olive-2">{c.navLabel}</p>
                        <p className="text-xs text-ink-3">{c.tagline}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-line bg-cream p-5">
                <p className="font-serif text-lg text-charcoal">Try searching for</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["smart thermostat", "heat pump", "winter", "paint", "wood pellets", "draught seal"].map((t) => (
                    <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-2 hover:border-olive hover:text-olive-2">
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
