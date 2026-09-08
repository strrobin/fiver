import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { solutions, getSolution } from "@/data/solutions";
import { getProduct } from "@/data/products";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading, Button, Img } from "@/components/ui";
import { Icon } from "@/components/icon";
import { Accordion, LeadForm, Reveal } from "@/components/interactive";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  return { title: s ? `${s.title} — Solution` : "Solution", description: s?.tagline };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const recommended = solution.recommendedProductSlugs
    .map(getProduct)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: solution.name }]}
        eyebrow="Solution"
        title={solution.title}
        subtitle={solution.tagline}
        image={solution.image}
      />

      {/* Problem */}
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="max-w-xl">
              <SectionHeading eyebrow="The problem" title="A real issue in many homes" />
              <p className="mt-5 text-lg leading-relaxed text-ink-2">{solution.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-line">
              <Img src={solution.image} alt={solution.name} className="h-full w-full" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Approach */}
      <Section tone="cream" className="border-y border-line">
        <Container>
          <div className="max-w-2xl">
            <SectionHeading eyebrow="Our approach" title="How we solve it" subtitle={solution.approach} />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solution.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-cream p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive/12 text-olive-2">
                    <Icon name="check" size={18} />
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-charcoal">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-2">{b.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section>
        <Container>
          <SectionHeading eyebrow="How it works" title="A simple, repeatable process" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {solution.steps.map((st, i) => (
              <Reveal key={st.title} delay={i * 60}>
                <div className="relative h-full rounded-2xl border border-line bg-cream p-6">
                  <span className="font-serif text-5xl font-medium text-stone">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-serif text-lg text-charcoal">{st.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-2">{st.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Recommended products */}
      {recommended.length > 0 && (
        <Section tone="cream" className="border-t border-line">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Recommended products" title="Start with these" subtitle="A considered starting point, chosen to work together within this solution." />
              <Button href="/products" variant="outline" size="sm" icon="arrowRight">All products</Button>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recommended.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Expert advice */}
      <Section>
        <Container className="grid gap-10 rounded-3xl bg-charcoal p-8 lg:grid-cols-2 lg:p-12">
          <Reveal>
            <div className="text-cream">
              <p className="eyebrow text-sage">Expert advice</p>
              <h2 className="mt-3 font-serif text-2xl text-cream sm:text-3xl">Not sure where to begin?</h2>
              <p className="mt-3 max-w-md text-cream/70">
                Tell us a little about your home and we'll help you choose the right approach — no pressure, no over-selling.
              </p>
              <ul className="mt-6 space-y-2 text-cream/80">
                {["We'll ask about your home and needs", "We'll recommend realistic options", "We won't push the most expensive choice"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm">
                    <Icon name="check" size={16} className="text-sage" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <LeadForm solution={solution.name} />
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="cream" className="border-t border-line">
        <Container className="max-w-3xl">
          <SectionHeading align="center" eyebrow="Questions" title={`${solution.name} FAQs`} />
          <div className="mt-8">
            <Accordion items={solution.faqs} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container className="flex flex-col items-center text-center">
          <p className="eyebrow text-olive">Ready when you are</p>
          <h2 className="mt-3 max-w-2xl font-serif text-2xl text-charcoal sm:text-3xl">
            Explore the products that bring this solution to life
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/products" variant="primary" icon="arrowRight">Explore products</Button>
            <Button href="/contact" variant="outline">Contact us</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
