import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { getSolution } from "@/data/solutions";
import { getGuide } from "@/data/guides";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading, Button, Badge, Img } from "@/components/ui";
import { Accordion, NewsletterForm } from "@/components/interactive";
import { Shop } from "@/components/shop";
import { ProductCard } from "@/components/product-card";
import { Icon } from "@/components/icon";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  return {
    title: cat ? `${cat.name} — Products` : "Category",
    description: cat?.tagline,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const catProducts = getProductsByCategory(category);
  const otherCategories = categories
    .filter((c) => c.slug !== category)
    .map((c) => ({ label: c.navLabel, href: `/products/${c.slug}` }));

  if (cat.future) {
    return <FutureCategory cat={cat} products={catProducts} otherCategories={otherCategories} />;
  }

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: cat.name }]}
        eyebrow={cat.breadcrumb}
        title={cat.name}
        subtitle={cat.description}
        image={cat.heroImage}
      />

      {/* Subcategories */}
      <Section tone="cream" className="!py-10 border-b border-line">
        <Container>
          <SectionHeading eyebrow="Shop by need" title="Browse the collection" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {cat.subcategories.map((s) => (
              <div key={s.slug} className="rounded-2xl border border-line bg-cream p-5">
                <Icon name="spark" size={18} className="text-olive-2" />
                <h3 className="mt-3 font-serif text-lg text-charcoal">{s.name}</h3>
                <p className="mt-1 text-sm text-ink-2">{s.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Grid + filters */}
      <Section>
        <Container>
          <Shop
            products={catProducts}
            otherCategories={otherCategories}
            locked
            pageSize={8}
          />
        </Container>
      </Section>

      {/* Educational content */}
      <Section tone="cream" className="border-t border-line">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Why this matters" title={`A note on ${cat.name.toLowerCase()}`} subtitle={cat.educationalNote} />
            <div className="mt-6 flex flex-wrap gap-3">
              {cat.solutionSlugs.map((slug) => {
                const s = getSolution(slug);
                return s ? (
                  <Button key={slug} href={`/solutions/${s.slug}`} variant="outline" size="sm" icon="arrowRight">
                    Explore the {s.name} solution
                  </Button>
                ) : null;
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-cream p-6">
            <p className="eyebrow text-ink-3">Related guides</p>
            <ul className="mt-4 space-y-3">
              {cat.guideSlugs.map((slug) => {
                const g = getGuide(slug);
                return g ? (
                  <li key={slug}>
                    <a href={`/guides/${g.slug}`} className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-ivory px-4 py-3 hover:border-olive">
                      <span>
                        <span className="block text-sm font-medium text-charcoal group-hover:text-olive-2">{g.title}</span>
                        <span className="text-xs text-ink-3">{g.category} · {g.readTime} read</span>
                      </span>
                      <Icon name="chevronRight" size={16} className="text-ink-3 group-hover:text-olive-2" />
                    </a>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading align="center" eyebrow="Questions" title={`${cat.name} FAQs`} />
          <div className="mt-8">
            <Accordion items={cat.faqs} />
          </div>
        </Container>
      </Section>

      {/* Related categories */}
      <Section tone="cream" className="border-t border-line">
        <Container>
          <SectionHeading eyebrow="Keep exploring" title="Related categories" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cat.relatedCategories.map((slug) => {
              const rc = getCategory(slug);
              if (!rc) return null;
              return (
                <a key={slug} href={`/products/${rc.slug}`} className="group relative flex h-40 flex-col justify-end overflow-hidden rounded-2xl border border-line">
                  <Img src={rc.image} alt="" className="absolute inset-0 h-full w-full opacity-80 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                  <div className="relative p-4">
                    <p className="font-serif text-lg text-cream group-hover:text-white">{rc.name}</p>
                    <p className="text-xs text-cream/70">{rc.tagline}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}

function FutureCategory({
  cat,
  products,
  otherCategories,
}: {
  cat: NonNullable<ReturnType<typeof getCategory>>;
  products: ReturnType<typeof getProductsByCategory>;
  otherCategories: { label: string; href: string }[];
}) {
  const specProduct = products[0];
  const brands = [...new Set(products.map((p) => p.brand))];
  const specRows = specProduct?.technical
    ? Object.entries(specProduct.technical).map(([k, v]) => [k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()), v] as const)
    : [];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: cat.name }]}
        eyebrow="Energy & Efficiency · Coming soon"
        title={cat.name}
        subtitle={cat.description}
        image={cat.heroImage}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="charcoal">Future category</Badge>
          <Badge tone="outline">Quality certified</Badge>
          <Badge tone="outline">Bulk pallet delivery</Badge>
        </div>
      </PageHero>

      {/* Technical specification preview */}
      <Section tone="cream" className="!py-12 border-b border-line">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="The specification"
              title="Built around honest, verifiable quality"
              subtitle="When the range launches, you'll be able to filter pellets by brand, certification, diameter, bag and pallet weight, calorific value, ash content, moisture and availability — with bulk ordering from the catalogue."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {brands.map((b) => (
                <span key={b} className="rounded-full border border-line bg-cream px-4 py-1.5 text-sm text-ink-2">{b}</span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-cream">
            <div className="border-b border-line bg-charcoal px-5 py-3">
              <p className="flex items-center gap-2 text-sm font-medium text-cream">
                <Icon name="info" size={16} className="text-sage" />
                Typical specification
              </p>
            </div>
            <dl className="divide-y divide-line">
              {specRows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-5 py-3">
                  <dt className="text-sm text-ink-2">{k}</dt>
                  <dd className="text-sm font-semibold text-charcoal">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Range */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="The range" title="NordPel wood pellets" subtitle="A snapshot of the quality-first range we intend to bring to market." />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Delivery note */}
      <Section tone="cream" className="border-t border-line">
        <Container className="grid items-center gap-8 rounded-3xl bg-charcoal p-8 text-cream lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-sage">Bulk delivery, planned properly</p>
            <h2 className="mt-3 font-serif text-2xl text-cream">Pallet delivery you can rely on</h2>
            <p className="mt-2 max-w-xl text-cream/70">
              Wood pellets are a bulk product. Our delivery page explains pallet delivery, unloading logistics and access requirements in detail, so you know exactly what to expect.
            </p>
          </div>
          <Button href="/delivery" variant="light" size="lg" icon="arrowRight">
            Delivery details
          </Button>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading align="center" eyebrow="Questions" title="Wood pellet FAQs" />
          <div className="mt-8">
            <Accordion items={cat.faqs} />
          </div>
          <div className="mt-6 text-center text-sm text-ink-2">
            Need help? <a href="/contact" className="font-medium text-olive-2 underline underline-offset-4">Contact our team</a>
          </div>
        </Container>
      </Section>

      {/* Related + notify */}
      <Section tone="cream" className="border-t border-line">
        <Container className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <div>
            <p className="eyebrow text-ink-3">Categories</p>
            <div className="mt-3 space-y-1">
              {otherCategories.map((c) => (
                <a key={c.href} href={c.href} className="block rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-stone">{c.label}</a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-cream p-8">
            <h3 className="font-serif text-2xl text-charcoal">Be first to know when pellets launch</h3>
            <p className="mt-2 text-ink-2">Join the newsletter to hear about the range, technical specifications and bulk delivery options.</p>
            <div className="mt-5"><NewsletterForm /></div>
          </div>
        </Container>
      </Section>
    </>
  );
}
