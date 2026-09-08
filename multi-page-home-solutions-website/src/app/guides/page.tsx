import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading, Button, Badge, Img } from "@/components/ui";
import { NewsletterForm, Reveal } from "@/components/interactive";
import { guides, featuredGuides, popularGuides, getGuide } from "@/data/guides";
import { guideCategories } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Guides & Journal",
  description: "Practical guides, buying advice and seasonal checklists for a better home.",
};

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category ?? "all";

  const featured = featuredGuides[0];
  const list = guides.filter((g) => (active === "all" ? true : g.categorySlug === active));
  const popular = popularGuides.slice(0, 4);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
        eyebrow="Guides & journal"
        title="Practical knowledge for a better home"
        subtitle="Buying guides, energy advice and seasonal checklists — written to help you make better decisions with confidence."
      />

      {/* Category pills */}
      <Section tone="cream" className="!py-8 border-b border-line">
        <Container>
          <div className="flex flex-wrap gap-2">
            <CategoryPill label="All" href="/guides" active={active === "all"} />
            {guideCategories.map((c) => (
              <CategoryPill key={c.slug} label={c.label} href={`/guides?category=${c.slug}`} active={active === c.slug} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured */}
      {active === "all" && featured ? (
        <Section>
          <Container>
            <div className="grid overflow-hidden rounded-3xl border border-line bg-cream lg:grid-cols-2">
              <div className="relative min-h-72 overflow-hidden">
                <Img src={featured.image} alt={featured.title} className="absolute inset-0 h-full w-full" />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="flex items-center gap-2">
                  <Badge tone="olive">Featured</Badge>
                  <span className="text-xs text-ink-3">{featured.category} · {featured.readTime} read</span>
                </div>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-charcoal">{featured.title}</h2>
                <p className="mt-3 text-ink-2">{featured.excerpt}</p>
                <p className="mt-4 text-sm text-ink-3">By {featured.author} · {formatDate(featured.date)}</p>
                <Button href={`/guides/${featured.slug}`} variant="primary" className="mt-6 self-start" icon="arrowRight">
                  Read the guide
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Latest */}
      <Section tone={active === "all" ? "ivory" : "cream"}>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Latest"
              title={active === "all" ? "All guides" : `${active.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")} guides`}
              subtitle="Up-to-date, practical and written for real homes."
            />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((g, i) => (
              <Reveal key={g.slug} delay={(i % 3) * 60}>
                <GuideCard slug={g.slug} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Popular */}
      <Section tone="charcoal">
        <Container>
          <SectionHeading tone="dark" eyebrow="Most read" title="Popular guides" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <p className="text-xs text-sage">{g.category}</p>
                <p className="mt-2 font-serif text-lg leading-snug text-cream group-hover:text-white">{g.title}</p>
                <p className="mt-3 text-sm text-cream/50">{g.readTime} read</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-cream p-8 text-center">
            <p className="eyebrow text-olive">Stay informed</p>
            <h2 className="mt-3 font-serif text-2xl text-charcoal">Get new guides in your inbox</h2>
            <p className="mt-2 text-ink-2">Seasonal checklists, buying advice and energy tips — no spam, ever.</p>
            <div className="mt-6 flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function CategoryPill({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active ? "bg-olive text-cream" : "border border-line bg-cream text-ink-2 hover:border-olive hover:text-olive-2"
      )}
    >
      {label}
    </Link>
  );
}

function GuideCard({ slug }: { slug: string }) {
  const g = getGuide(slug);
  if (!g) return null;
  return (
    <Link href={`/guides/${g.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-line bg-cream transition-shadow hover:shadow-lift">
      <div className="aspect-[16/10] overflow-hidden">
        <Img src={g.image} alt={g.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-col p-5">
        <div className="flex items-center gap-2">
          <Badge tone="outline">{g.category}</Badge>
          <span className="text-xs text-ink-3">{g.readTime} read</span>
        </div>
        <h3 className="mt-3 font-serif text-xl leading-snug text-charcoal group-hover:text-olive-2">{g.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-2">{g.excerpt}</p>
      </div>
    </Link>
  );
}

function formatDate(d: string): string {
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
