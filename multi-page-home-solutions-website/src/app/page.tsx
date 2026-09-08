import Link from "next/link";
import { Container, Section, SectionHeading, Button, Img, Stars, Badge } from "@/components/ui";
import { Icon, type IconName } from "@/components/icon";
import { Reveal } from "@/components/interactive";
import { ProductCard } from "@/components/product-card";
import { site, stats } from "@/data/site";
import { solutions } from "@/data/solutions";
import { featuredGuides, getGuide } from "@/data/guides";
import { getFeaturedProducts } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { img } from "@/lib/images";

export const metadata = {
  title: "Better Solutions for a Better Home",
  description:
    "Practical products and thoughtful solutions for home comfort, efficiency, property care and seasonal living.",
};

const trustItems = [
  { icon: "spark", title: "Expertly curated", text: "Products we're confident in, chosen with care." },
  { icon: "truck", title: "Free delivery over €120", text: "Clear, careful delivery on every order." },
  { icon: "lock", title: "Secure checkout", text: "Encrypted, safe and simple to use." },
  { icon: "refresh", title: "Easy returns", text: "Straightforward returns within a set window." },
] as const;

const valueProps = [
  { icon: "shield", title: "Quality, checked", text: "We assess product quality, safety and performance." },
  { icon: "info", title: "Honest guidance", text: "Clear specs and advice — no over-selling." },
  { icon: "box", title: "Simple delivery", text: "From standard courier to bulky pallet delivery." },
  { icon: "heart", title: "Long-term care", text: "We build relationships, not one-off sales." },
] as const;

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const guidePreview = featuredGuides.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-charcoal">
        <Img src={img.livingWood} alt="A warm, modern home interior" className="absolute inset-0 h-full w-full" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/60 to-charcoal/20" />
        <Container className="relative z-10 flex min-h-[82vh] flex-col justify-center py-20">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow text-sage">Home · Comfort · Property · Energy</p>
              <h1 className="mt-5 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.03] text-cream">
                Better solutions for a better home.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
                Practical products and thoughtful solutions designed around comfort, efficiency and everyday home living.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="/products" variant="light" size="lg" icon="arrowRight">
                  Explore Products
                </Button>
                <Button href="/solutions" variant="ghost" size="lg" className="text-cream hover:bg-cream/10">
                  Discover Our Solutions
                </Button>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-cream/15 pt-7">
                <div className="flex items-center gap-3">
                  <Stars rating={4.8} />
                  <span className="text-sm text-cream/80">4.8 average rating</span>
                </div>
                <div className="hidden h-8 w-px bg-cream/20 sm:block" />
                <p className="text-sm text-cream/80">
                  <span className="font-semibold text-cream">12,000+</span> orders delivered
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-line bg-cream">
        <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {trustItems.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-olive/12 text-olive-2">
                <Icon name={t.icon} size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-charcoal">{t.title}</p>
                <p className="mt-0.5 text-xs text-ink-2">{t.text}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* CORE SOLUTIONS */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our approach"
              title="Solutions that work around how you live"
              subtitle="Not just products — the way they come together. Explore the four areas we focus on for a more comfortable, efficient home."
            />
            <Button href="/solutions" variant="outline" icon="arrowRight">
              All solutions
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link href={`/solutions/${s.slug}`} className="group block overflow-hidden rounded-2xl border border-line bg-cream transition-shadow hover:shadow-lift">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Img src={s.image} alt={s.name} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-cream/95 text-olive-2">
                      <Icon name={s.icon} size={18} />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl text-charcoal group-hover:text-olive-2">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-olive-2">
                      Explore <Icon name="arrowRight" size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* FEATURED PRODUCTS */}
      <Section tone="cream">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="The shop"
              title="Featured products"
              subtitle="A considered selection across home comfort, efficiency, property care and seasonal essentials."
            />
            <Button href="/products" variant="outline" icon="arrowRight">
              Shop all
            </Button>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* SEASONAL LIVING */}
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Img src={img.autumnTable} alt="Preparing for the seasons at home" className="h-full w-full" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <SectionHeading
              eyebrow="Seasonal living"
              title="Be ready for every season, every time"
              subtitle="From autumn warmth to winter readiness, preparation makes the changing year easier — and your home more comfortable throughout it."
            />
            <ul className="mt-6 space-y-3">
              {["Plan ahead, not at the last minute", "Protect outdoor spaces and surfaces", "Keep warmth where it belongs"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-ink-2">
                  <Icon name="check" size={18} className="shrink-0 text-olive" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/solutions/seasonal-living" variant="primary" icon="arrowRight">
                Explore seasonal living
              </Button>
              <Button href="/guides?category=seasonal" variant="ghost">
                Read the guides
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* WHY CHOOSE US */}
      <Section tone="cream">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Why choose us"
                title="A home-solutions partner you can trust"
                subtitle="We combine careful product selection with honest guidance and reliable delivery — so you can make the right decision with confidence."
              />
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-8">
                {stats.slice(0, 2).map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-4xl text-charcoal">{s.value}</div>
                    <div className="mt-1 text-sm text-ink-2">{s.label}</div>
                  </div>
                ))}
              </div>
              <Button href="/why-us" variant="outline" icon="arrowRight" className="mt-8">
                Why choose us
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {valueProps.map((v) => (
                <Reveal key={v.title}>
                  <div className="h-full rounded-2xl border border-line bg-cream p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-olive/12 text-olive-2">
                      <Icon name={v.icon} size={21} />
                    </span>
                    <h3 className="mt-4 font-serif text-lg text-charcoal">{v.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-2">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* GUIDES PREVIEW */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Guides & journal"
              title="Practical knowledge for your home"
              subtitle="Buying guides, energy advice and seasonal checklists — written to help you make better decisions."
            />
            <Button href="/guides" variant="outline" icon="arrowRight">
              All guides
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {guidePreview.map((g, i) => (
              <Reveal key={g.slug} delay={i * 60}>
                <GuidePreviewCard slug={g.slug} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* TESTIMONIALS */}
      <Section tone="charcoal">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              align="center"
              eyebrow="Trusted by homeowners"
              title="What our customers say"
              tone="dark"
            />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 60}>
                <figure className="flex h-full flex-col rounded-2xl border border-cream/10 bg-cream/5 p-6">
                  <Stars rating={t.rating} />
                  <blockquote className="mt-4 flex-1 text-cream/80">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 border-t border-cream/10 pt-4">
                    <p className="font-medium text-cream">{t.name}</p>
                    <p className="text-sm text-cream/50">{t.location}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* DELIVERY EXPERIENCE */}
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Delivery & payment"
              title="Careful delivery, from a single box to a full pallet"
              subtitle="We treat delivery as a first-class part of the experience. Clear options, honest timelines and, for bulk items like wood pellets, proper pallet logistics right to the right point."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: "package", t: "Standard products", d: "Fast, tracked courier delivery." },
                { icon: "truck", t: "Large & bulk", d: "Dedicated handling for big items." },
                { icon: "box", t: "Pallet delivery", d: "Planned unloading for bulk fuel." },
                { icon: "card", t: "Flexible payments", d: "Secure card, PayPal and more." },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-line bg-cream p-5">
                  <Icon name={x.icon as IconName} size={22} className="text-olive-2" />
                  <p className="mt-3 font-serif text-charcoal">{x.t}</p>
                  <p className="mt-1 text-sm text-ink-2">{x.d}</p>
                </div>
              ))}
            </div>
            <Button href="/delivery" variant="primary" icon="arrowRight" className="mt-8">
              Delivery & payment
            </Button>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Img src={img.readingMagazine} alt="Enjoying a comfortable home" className="h-full w-full" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section tone="cream" className="border-t border-line">
        <Container className="flex flex-col items-center py-10 text-center">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <p className="eyebrow text-olive">{site.name}</p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] text-charcoal">
                Ready to make your home more comfortable?
              </h2>
              <p className="mt-4 text-lg text-ink-2">
                Explore the range, or start with a solution that fits how you live.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/products" variant="primary" size="lg" icon="arrowRight">
                  Explore products
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Talk to our team
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function GuidePreviewCard({ slug }: { slug: string }) {
  const g = getGuide(slug);
  if (!g) return null;
  return (
    <Link href={`/guides/${g.slug}`} className="group block overflow-hidden rounded-2xl border border-line bg-cream transition-shadow hover:shadow-lift">
      <div className="aspect-[16/10] overflow-hidden">
        <Img src={g.image} alt={g.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
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
