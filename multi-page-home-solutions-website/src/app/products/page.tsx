import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { PageHero } from "@/components/page-hero";
import { Container, Section, Img, Button } from "@/components/ui";
import { Icon } from "@/components/icon";
import { Shop } from "@/components/shop";

export const metadata: Metadata = {
  title: "Products & Shop",
  description: "Explore our curated range of products for home comfort, efficiency, property care and seasonal living.",
};

export default function ProductsPage() {
  const parent = categories.filter((c) => !c.future);
  const facetCategories = categories.map((c) => ({
    slug: c.slug,
    name: c.navLabel,
    count: products.filter((p) => p.categorySlug === c.slug).length,
  }));

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        eyebrow="The shop"
        title="Products for a more comfortable home"
        subtitle="A carefully curated range across home comfort, energy efficiency, property care and seasonal living. Filter, sort and find exactly what your home needs."
      />

      {/* Category navigation pills */}
      <Section tone="cream" className="!py-8 border-b border-line">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {parent.map((c) => (
              <a key={c.slug} href={`/products/${c.slug}`} className="group flex items-center gap-3 rounded-2xl border border-line bg-cream px-4 py-4 transition-shadow hover:shadow-lift">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                  <Img src={c.image} alt="" className="h-full w-full" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-serif text-charcoal group-hover:text-olive-2">{c.navLabel}</p>
                  <p className="truncate text-xs text-ink-3">{c.tagline}</p>
                </div>
                <Icon name="arrowRight" size={16} className="ml-auto shrink-0 text-ink-3 group-hover:text-olive-2" />
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <Shop products={products} facetCategories={facetCategories} />
        </Container>
      </Section>

      <Section tone="cream" className="border-t border-line">
        <Container className="flex flex-col items-center text-center">
          <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">Not sure where to start?</h2>
          <p className="mt-3 max-w-xl text-ink-2">
            Explore our solutions to understand how products work together, or read a guide to make a confident decision.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/solutions" variant="primary" icon="arrowRight">Explore solutions</Button>
            <Button href="/guides" variant="outline">Read the guides</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
