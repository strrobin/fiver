import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/data/guides";
import { getProduct } from "@/data/products";
import { Container, Section, SectionHeading, Breadcrumbs, Badge, Img, Button } from "@/components/ui";
import { Accordion, TableOfContents, Reveal } from "@/components/interactive";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  return { title: g ? g.title : "Guide", description: g?.excerpt };
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const headings = guide.sections.map((s) => s.heading);
  const related = guide.relatedSlugs.map(getGuide).filter(Boolean);
  const recommended = guide.recommendedProductSlugs.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs
          className="border-b border-line pb-6"
          items={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/guides" },
            { label: guide.category, href: `/guides?category=${guide.categorySlug}` },
            { label: guide.title },
          ]}
        />

        <header className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="olive">{guide.category}</Badge>
            <span className="text-xs text-ink-3">{guide.readTime} read</span>
          </div>
          <h1 className="mt-4 font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-tight text-charcoal">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg text-ink-2">{guide.excerpt}</p>
          <div className="mt-6 flex items-center gap-4 border-b border-line pb-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive/12 font-serif text-lg text-olive-2">
              {guide.author.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-medium text-charcoal">{guide.author}</p>
              <p className="text-xs text-ink-3">{guide.authorRole} · {formatDate(guide.date)}</p>
            </div>
          </div>
        </header>

        {/* Featured image */}
        <div className="mx-auto mt-8 max-w-5xl">
          <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-line">
            <Img src={guide.image} alt={guide.title} className="h-full w-full" />
          </div>
        </div>

        {/* Body + TOC */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <TableOfContents items={headings} />
          </aside>

          <div className="prose-article">
            {guide.sections.map((s) => (
              <section key={s.heading}>
                <h2 id={slugify(s.heading)}>{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.list ? (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <div className="mt-10 rounded-3xl bg-charcoal p-8 text-cream">
              <p className="eyebrow text-sage">Need help deciding?</p>
              <h3 className="mt-2 font-serif text-2xl text-cream">Talk to our specialist team</h3>
              <p className="mt-2 text-cream/70">We'll help you choose the right products for your home, with honest advice.</p>
              <Button href="/contact" variant="light" className="mt-5" icon="arrowRight">Get in touch</Button>
            </div>

            <div className="mt-8 rounded-3xl border border-line bg-cream p-6">
              <p className="text-sm text-ink-2">Share this guide: practical advice, worth passing on.</p>
              <div className="mt-3 flex gap-3">
                {["Twitter / X", "Facebook", "Email"].map((s) => (
                  <button key={s} className="rounded-full border border-line px-4 py-2 text-xs font-medium text-ink-2 hover:border-olive hover:text-olive-2">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Recommended products */}
      {recommended.length > 0 ? (
        <Section tone="cream" className="mt-16 border-t border-line">
          <Container>
            <SectionHeading eyebrow="Shop the guide" title="Recommended products" subtitle="The products we'd choose for this task." />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recommended.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* FAQ */}
      {guide.faqs.length > 0 ? (
        <Section>
          <Container className="max-w-3xl">
            <SectionHeading align="center" eyebrow="Questions" title="FAQ" />
            <div className="mt-8">
              <Accordion items={guide.faqs} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Related */}
      {related.length > 0 ? (
        <Section tone="cream" className="border-t border-line">
          <Container>
            <SectionHeading eyebrow="Keep reading" title="Related guides" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((g) => g ? (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="group block overflow-hidden rounded-2xl border border-line bg-cream transition-shadow hover:shadow-lift">
                  <div className="aspect-[16/10] overflow-hidden">
                    <Img src={g.image} alt={g.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-ink-3">{g.category} · {g.readTime} read</p>
                    <h3 className="mt-2 font-serif text-lg leading-snug text-charcoal group-hover:text-olive-2">{g.title}</h3>
                  </div>
                </Link>
              ) : null)}
            </div>
          </Container>
        </Section>
      ) : null}
    </article>
  );
}

function formatDate(d: string): string {
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
