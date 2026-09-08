import type { Metadata } from "next";
import { solutions } from "@/data/solutions";
import { PageHero } from "@/components/page-hero";
import { Container, Section, Button, Img, Eyebrow } from "@/components/ui";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/interactive";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Our considered approach to home comfort, energy efficiency, property care and seasonal living.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        eyebrow="Solutions"
        title="A considered approach to a better home"
        subtitle="Solutions are how we bring products together. Explore the four areas we focus on — and how the right combination makes your home more comfortable, efficient and easier to live in."
      />

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 60}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream transition-shadow hover:shadow-lift">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Img src={s.image} alt={s.name} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cream/95 text-olive-2">
                      <Icon name={s.icon} size={20} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <Eyebrow className="text-olive">Solution {String(i + 1).padStart(2, "0")}</Eyebrow>
                    <h2 className="mt-2 font-serif text-2xl text-charcoal sm:text-3xl">{s.name}</h2>
                    <p className="mt-1 text-ink-3">{s.tagline}</p>
                    <p className="mt-4 leading-relaxed text-ink-2">{s.description}</p>

                    <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {s.benefits.slice(0, 2).map((b) => (
                        <div key={b.title} className="flex items-start gap-2 text-sm text-ink-2">
                          <Icon name="check" size={16} className="mt-0.5 shrink-0 text-olive" />
                          {b.title}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
                      <Button href={`/solutions/${s.slug}`} variant="primary" size="sm" icon="arrowRight">
                        Explore the solution
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="charcoal">
        <Container className="flex flex-col items-center text-center">
          <p className="eyebrow text-sage">How it works</p>
          <h2 className="mt-3 max-w-2xl font-serif text-2xl text-cream sm:text-3xl">
            Start with a solution. Let us guide you through it.
          </h2>
          <p className="mt-3 max-w-xl text-cream/70">
            Explore the relevant solution, see the recommended products, and if you're unsure, our team is here to help you make the right choice.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/products" variant="light" icon="arrowRight">Start shopping</Button>
            <Button href="/contact" variant="ghost" className="text-cream hover:bg-cream/10">Talk to our team</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
