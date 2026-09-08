import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading, Button, Img, Stat } from "@/components/ui";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/interactive";
import { site, stats } from "@/data/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story, approach and promise behind Havenwell — a modern home-solutions company.",
};

const pillars = [
  { icon: "shield", title: "Quality over quantity", text: "We'd rather stock fewer, better products than a shelf of average ones." },
  { icon: "info", title: "Transparent by default", text: "Clear specifications, honest pricing and no confusing small print." },
  { icon: "heart", title: "Guidance, not selling", text: "We help you make the right choice — even when it's not the expensive one." },
  { icon: "leaf", title: "Built to last", text: "We favour durable, considered products and lower-emission options." },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="Our story"
        title={<>A company built around <span className="text-olive-2">home, comfort</span> and living well</>}
        subtitle="Havenwell exists to make your home more comfortable, efficient and easier to live in — through considered products and honest guidance."
        image={img.livingWood}
      />

      {/* Our Story */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <Img src={img.brickHouseB} alt="A modern home" className="h-full w-full" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <SectionHeading eyebrow="Our story" title="It started with a simple observation" />
            <div className="mt-5 space-y-4 text-ink-2">
              <p>
                We noticed that the world of home living was split in two. On one side, big stores full of mass-market products
                with little thought about how they actually work in a real home. On the other, a search for quality that often
                ends in confusion and over-priced guesswork.
              </p>
              <p>
                {site.name} was founded to be the middle ground — a company that curates genuinely useful products for home
                comfort, energy, property care and seasonal living, and backs them with clear, honest, expert guidance.
              </p>
              <p>
                We're not a catalogue. We're a partner who understands that the right product, in the right place, makes
                everyday life genuinely better.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Beliefs */}
      <Section tone="cream" className="border-y border-line">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading align="center" eyebrow="What we believe" title="Principles that shape how we work" />
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-cream p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-olive/12 text-olive-2">
                    <Icon name={p.icon as "shield"} size={20} />
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-charcoal">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-2">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Different + Quality */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="What makes us different" title="A different kind of home-solutions company" />
            <ul className="mt-6 space-y-3.5">
              {[
                "We solve problems, not sell products",
                "We explain the 'why' — not just the spec sheet",
                "Every product is assessed before it's listed",
                "We plan delivery like it matters, because it does",
                "We build long-term relationships, not one-off sales",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink-2">
                  <Icon name="checkCircle" size={20} className="mt-0.5 shrink-0 text-olive-2" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-3xl border border-line bg-cream p-8">
              <SectionHeading eyebrow="Our approach to quality" title="Quality is a process, not a promise" />
              <p className="mt-4 text-ink-2">
                Every product we list goes through a considered assessment — quality of materials, safety, performance and
                how well it serves the intended purpose. It's why we're confident enough to stand behind the things we sell.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { v: "3-step", l: "selection process" },
                  { v: "A+", l: "low-emission focus" },
                  { v: "100%", l: "honestly described" },
                ].map((x) => (
                  <div key={x.l} className="rounded-xl border border-line bg-ivory p-4 text-center">
                    <div className="font-serif text-2xl text-charcoal">{x.v}</div>
                    <div className="mt-1 text-xs text-ink-3">{x.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Selection */}
      <Section tone="cream" className="border-y border-line">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-line">
              <Img src={img.ceramicVase} alt="A considered product" className="h-full w-full" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <SectionHeading eyebrow="How we select products" title="Chosen with care, tested against real life" />
            <div className="mt-6 space-y-4">
              {[
                { n: "01", t: "We look for genuine value", d: "A product has to earn its place — not just look good on paper." },
                { n: "02", t: "We assess materials & safety", d: "We check quality, durability and safety before listing." },
                { n: "03", t: "We think about you", d: "We consider how you'll actually use it in a real home, every day." },
              ].map((s) => (
                <div key={s.n} className="flex gap-4 rounded-2xl border border-line bg-cream p-5">
                  <span className="font-serif text-2xl font-medium text-olive-2">{s.n}</span>
                  <div>
                    <p className="font-serif text-lg text-charcoal">{s.t}</p>
                    <p className="mt-1 text-sm text-ink-2">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Mission / promise */}
      <Section>
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Our promise" title="Our commitment to customers" subtitle="We're committed to being honest, helpful and reliable — from the first question to the last delivery, and long after." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { icon: "mail", t: "We reply within a day" },
                { icon: "truck", t: "We deliver carefully" },
                { icon: "refresh", t: "Returns that are simple" },
                { icon: "heart", t: "We're here after the sale" },
              ].map((x) => (
                <div key={x.t} className="flex items-center gap-3 rounded-2xl border border-line bg-cream p-4">
                  <Icon name={x.icon as "mail"} size={20} className="text-olive-2" />
                  <span className="text-sm font-medium text-charcoal">{x.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-charcoal p-8 text-cream">
              <p className="eyebrow text-sage">Our mission</p>
              <p className="mt-4 font-serif text-2xl leading-snug">
                “To make every home more comfortable, more efficient and easier to live in — through products we believe in
                and guidance we're proud of.”
              </p>
              <Button href="/products" variant="light" size="sm" className="mt-7" icon="arrowRight">
                Explore the range
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="cream" className="border-t border-line">
        <Container className="flex flex-col items-center text-center">
          <p className="eyebrow text-olive">Get started</p>
          <h2 className="mt-3 max-w-2xl font-serif text-2xl text-charcoal sm:text-3xl">Let's make your home a better place to live</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/products" variant="primary" size="lg" icon="arrowRight">Explore products</Button>
            <Button href="/contact" variant="outline" size="lg">Contact us</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
