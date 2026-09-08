import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading, Button, Img, Stat } from "@/components/ui";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/interactive";
import { stats } from "@/data/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description: "Why homeowners trust Havenwell for quality products, honest guidance and reliable delivery.",
};

const pillars = [
  { icon: "shield", title: "Quality", text: "We assess every product for quality, safety and performance." },
  { icon: "box", title: "Reliable products", text: "We stock considered products that do what they promise." },
  { icon: "info", title: "Transparent info", text: "Clear specifications, honest pricing and honest advice." },
  { icon: "faq", title: "Expert guidance", text: "Real answers, tailored to your home and your needs." },
  { icon: "heart", title: "Customer support", text: "Helpful, responsive and here long after the sale." },
  { icon: "truck", title: "Reliable delivery", text: "Careful, clear delivery from a single box to a pallet." },
  { icon: "check", title: "Product selection", text: "A curated range — fewer, better, genuinely useful products." },
  { icon: "spark", title: "Long-term care", text: "We build relationships, not one-off transactions." },
] as const;

const selection = [
  { n: "01", t: "Research", d: "We identify products worth considering and understand how they perform in real homes." },
  { n: "02", t: "Assess", d: "We check materials, safety, durability and efficiency before anything is listed." },
  { n: "03", t: "Describe honestly", d: "We set clear expectations — what it does, what it doesn't, and trade-offs." },
  { n: "04", t: "Stand behind it", d: "We're confident enough to back the products we sell with easy returns." },
] as const;

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Why Choose Us" }]}
        eyebrow="Why choose us"
        title="The reasons people keep coming back"
        subtitle="Quality, honesty and reliability — in every product, every order and every conversation."
        image={img.livingRustic}
      />

      {/* Pillars */}
      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 60}>
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

      {/* Numbers */}
      <Section tone="charcoal">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center text-cream sm:text-left">
                <div className="font-serif text-5xl text-cream">{s.value}</div>
                <div className="mt-2 text-sm text-cream/60">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quality philosophy */}
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Quality philosophy" title="We'd rather do fewer things well" subtitle="Anyone can sell a large catalogue. We believe the better approach is to curate a smaller range of products we genuinely trust — and to stand behind them." />
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { v: "A+", l: "low-emission focus" },
                { v: "3-step", l: "selection process" },
                { v: "30 day", l: "easy returns" },
                { v: "4.8★", l: "average rating" },
              ].map((x) => (
                <div key={x.l} className="rounded-2xl border border-line bg-cream p-5 text-center">
                  <div className="font-serif text-3xl text-charcoal">{x.v}</div>
                  <div className="mt-1 text-xs text-ink-3">{x.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-line">
              <Img src={img.livingWood} alt="A comfortable home" className="h-full w-full" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Selection process */}
      <Section tone="cream" className="border-y border-line">
        <Container>
          <SectionHeading align="center" eyebrow="Product selection" title="How we choose what we sell" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {selection.map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <div className="relative h-full rounded-2xl border border-line bg-cream p-6">
                  <span className="font-serif text-5xl font-medium text-stone">{s.n}</span>
                  <h3 className="mt-3 font-serif text-lg text-charcoal">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-ink-2">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Customer promise */}
      <Section>
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Our customer promise" title="What we commit to, every single time" />
            <ul className="mt-6 space-y-3.5">
              {[
                "Honest product descriptions — no over-claiming",
                "Clear, upfront pricing and delivery costs",
                "Responsive, helpful support within a business day",
                "Careful delivery, including for large and bulk items",
                "Simple returns when something isn't right",
                "Guidance that puts your home first, not our margin",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink-2">
                  <Icon name="checkCircle" size={20} className="mt-0.5 shrink-0 text-olive-2" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-cream p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-olive/12 text-olive-2">
                  <Icon name="quote" size={22} />
                </span>
                <p className="font-serif text-lg text-charcoal">A simple philosophy</p>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-ink-2">
                “If we wouldn't happily use it in our own home, we won't sell it to yours.”
              </p>
              <Button href="/products" variant="primary" className="mt-6 w-full" icon="arrowRight">
                Browse the range
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="cream" className="border-t border-line">
        <Container className="flex flex-col items-center text-center">
          <h2 className="max-w-2xl font-serif text-2xl text-charcoal sm:text-3xl">Experience the difference for yourself</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/products" variant="primary" size="lg" icon="arrowRight">Start shopping</Button>
            <Button href="/about" variant="outline" size="lg">Read our story</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
