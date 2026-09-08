import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading, Button, Img, Badge } from "@/components/ui";
import { Accordion, Reveal } from "@/components/interactive";
import { Icon } from "@/components/icon";
import { faqs } from "@/data/faqs";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Delivery & Payment",
  description: "Clear, careful delivery and payment options — from a single box to a full pallet.",
};

const options = [
  {
    icon: "package",
    title: "Standard products",
    tag: "Courier",
    text: "For smaller, standard items we use tracked courier delivery. Most orders are dispatched within 1–2 working days.",
    points: ["Tracked and insured", "Delivery updates by email", "Free over €120"],
  },
  {
    icon: "truck",
    title: "Large & bulk",
    tag: "Tail-lift courier",
    text: "For larger or heavier products we arrange dedicated handling and delivery to a suitable point — typically to the kerbside or a convenient drop point.",
    points: ["Trained handlers", "Access checked before dispatch", "Delivery slot confirmed"],
  },
  {
    icon: "box",
    title: "Pallet delivery",
    tag: "Wood pellets etc.",
    text: "For bulk goods such as wood pellets, delivery arrives on pallets. We'll plan the logistics carefully and confirm access, unloading and storage before dispatch.",
    points: ["Tail-lift or crane", "Access & unloading confirmed", "Bulk and repeat orders supported"],
  },
] as const;

const timeline = [
  { n: "01", t: "Order placed", d: "You get an email confirmation straight away." },
  { n: "02", t: "We process", d: "We pick, prepare and pack your order carefully." },
  { n: "03", t: "You're updated", d: "We confirm a delivery window and any access notes." },
  { n: "04", t: "Delivered", d: "You receive your order, right to the right point." },
];

const payments = [
  { icon: "card", t: "Card", d: "Visa, Mastercard & more" },
  { icon: "wallet", t: "PayPal", d: "Secure online payment" },
  { icon: "clock", t: "Instalments", d: "For larger purchases" },
  { icon: "globe", t: "Bank transfer", d: "For business / bulk orders" },
] as const;

const important = [
  "We'll always confirm the delivery method and any access requirements before dispatch.",
  "Please ensure someone is available to receive large or bulk deliveries.",
  "For pallet deliveries, please note a tail-lift requires reasonable truck access.",
  "Deliveries are to the entrance / kerbside by default; in-home placement may be available on request.",
  "If you can't be present, please arrange an authorised person to receive the order.",
];

export default function DeliveryPage() {
  const deliveryFaqs = faqs
    .filter((f) => ["Delivery", "Payments", "Returns"].includes(f.category))
    .map((f) => ({ q: f.question, a: f.answer }));

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Delivery & Payment" }]}
        eyebrow="Delivery & payment"
        title="Delivery that is careful, clear and reliable"
        subtitle="From a single box to a full pallet, we treat delivery as a first-class part of the experience — with honest options, clear timelines and proper logistics."
        image={img.backyard}
      />

      {/* Delivery options */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Delivery options" title="Choose the right delivery for your order" />
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {options.map((o, i) => (
              <div key={o.title} className="flex h-full flex-col rounded-3xl border border-line bg-cream p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-olive/12 text-olive-2">
                    <Icon name={o.icon} size={23} />
                  </span>
                  <Badge tone="outline">{o.tag}</Badge>
                </div>
                <h3 className="mt-5 font-serif text-xl text-charcoal">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{o.text}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {o.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-ink-2">
                      <Icon name="check" size={15} className="shrink-0 text-olive" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section tone="cream" className="border-y border-line">
        <Container>
          <SectionHeading align="center" eyebrow="Order processing" title="From checkout to your door" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((s, i) => (
              <div key={s.n} className="relative rounded-2xl border border-line bg-cream p-6">
                <span className="font-serif text-5xl font-medium text-stone">{s.n}</span>
                <h3 className="mt-3 font-serif text-lg text-charcoal">{s.t}</h3>
                <p className="mt-1.5 text-sm text-ink-2">{s.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Payments */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <RevealWrap>
            <SectionHeading eyebrow="Payment methods" title="Secure, flexible ways to pay" subtitle="All payments are processed over encrypted connections. We never store your full card details." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {payments.map((p) => (
                <div key={p.t} className="flex items-center gap-3 rounded-2xl border border-line bg-cream p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive/12 text-olive-2">
                    <Icon name={p.icon as "card"} size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{p.t}</p>
                    <p className="text-xs text-ink-3">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealWrap>
          <RevealWrap delay={80}>
            <div className="h-full rounded-3xl bg-charcoal p-8 text-cream">
              <p className="eyebrow text-sage">Delivery timeline</p>
              <div className="mt-5 space-y-4">
                {[
                  { t: "Standard items", d: "1–2 working days dispatch" },
                  { t: "Large / bulk items", d: "2–5 working days, slot confirmed" },
                  { t: "Made-to-order", d: "Confirmed at checkout, longer lead time" },
                  { t: "Bulk / pallet", d: "Planned, access checked" },
                ].map((x) => (
                  <div key={x.t} className="flex items-start justify-between gap-4 border-b border-cream/10 pb-3">
                    <span className="font-medium text-cream">{x.t}</span>
                    <span className="text-sm text-cream/60 text-right">{x.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrap>
        </Container>
      </Section>

      {/* Returns */}
      <Section tone="cream" id="returns" className="border-y border-line">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <RevealWrap>
            <SectionHeading eyebrow="Returns" title="Returns that are simple, not stressful" subtitle="Most unused products in original condition can be returned within a set window. A few made-to-order and bulk items are excluded and are clearly flagged at checkout." />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { v: "30", l: "day returns" },
                { v: "Free", l: "from selected items" },
                { v: "Fast", l: "refund processing" },
              ].map((x) => (
                <div key={x.l} className="rounded-2xl border border-line bg-cream p-5 text-center">
                  <div className="font-serif text-2xl text-charcoal">{x.v}</div>
                  <div className="mt-1 text-xs text-ink-3">{x.l}</div>
                </div>
              ))}
            </div>
          </RevealWrap>
          <RevealWrap delay={80}>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-line">
              <Img src={img.peoplePainting} alt="Returning a product" className="h-full w-full" />
            </div>
          </RevealWrap>
        </Container>
      </Section>

      {/* Important info */}
      <Section>
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Good to know" title="Important delivery information" />
            <ul className="mt-6 space-y-3.5">
              {important.map((t) => (
                <li key={t} className="flex items-start gap-3 text-ink-2">
                  <Icon name="info" size={20} className="mt-0.5 shrink-0 text-olive-2" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary" icon="arrowRight">Contact support</Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-cream p-8">
              <p className="eyebrow text-ink-3">Need help with a delivery?</p>
              <p className="mt-3 text-ink-2">Our team is happy to help with delivery queries, access questions and bulk or pallet orders.</p>
              <div className="mt-4 space-y-2 text-sm">
                <a href="mailto:hello@havenwell.eu" className="flex items-center gap-2 text-charcoal hover:text-olive-2"><Icon name="mail" size={16} /> hello@havenwell.eu</a>
                <a href="tel:+35315550184" className="flex items-center gap-2 text-charcoal hover:text-olive-2"><Icon name="phone" size={16} /> +353 1 555 0184</a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="cream" className="border-t border-line">
        <Container className="max-w-3xl">
          <SectionHeading align="center" eyebrow="FAQ" title="Delivery & payments, answered" />
          <div className="mt-8">
            <Accordion items={deliveryFaqs} />
          </div>
        </Container>
      </Section>
    </>
  );
}

function RevealWrap({ children, delay }: { children: React.ReactNode; delay?: number }) {
  return <Reveal delay={delay}>{children}</Reveal>;
}
