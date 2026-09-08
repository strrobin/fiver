import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container, Section, SectionHeading, Button } from "@/components/ui";
import { ContactForm } from "@/components/interactive";
import { Icon } from "@/components/icon";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with our team — we're here to help with products, orders, delivery and guidance.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="We'd love to hear from you"
        subtitle="Questions about a product, an order or a delivery? Our team is here to help — and we reply within one business day."
        image={undefined}
      />

      <Section>
        <Container className="grid gap-10 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Send a message" title="How can we help?" />
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl border border-line bg-cream p-7">
              <h3 className="font-serif text-xl text-charcoal">Contact details</h3>
              <ul className="mt-5 space-y-4">
                <ContactRow icon="mail" label="Email" value={site.email} href={`mailto:${site.email}`} />
                <ContactRow icon="phone" label="Phone" value={site.phone} href={site.phoneHref} />
                <ContactRow icon="clock" label="Business hours" value={site.hours} />
                <ContactRow icon="location" label="Address" value={`${site.address.line1}, ${site.address.line2}`} />
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="relative overflow-hidden rounded-3xl border border-line bg-stone">
              <div className="grid aspect-[4/3] place-items-center bg-[radial-gradient(circle_at_30%_30%,#f1eadd,#e4dbc6)] opacity-90">
                <div className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-olive text-cream">
                    <Icon name="location" size={22} />
                  </span>
                  <p className="mt-3 text-sm font-medium text-charcoal">{site.address.line1}</p>
                  <p className="text-xs text-ink-2">{site.address.line2}</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=14+Rosewood+Avenue+Dublin"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-xs font-medium text-cream hover:bg-ink"
              >
                Open map <Icon name="arrowRight" size={14} />
              </a>
            </div>

            <div className="rounded-3xl bg-charcoal p-7 text-cream">
              <p className="eyebrow text-sage">Looking for answers?</p>
              <h3 className="mt-3 font-serif text-xl">Check the FAQ</h3>
              <p className="mt-2 text-sm text-cream/70">Many common questions are answered there — from delivery to returns.</p>
              <Button href="/faq" variant="light" size="sm" className="mt-5" icon="arrowRight">
                Browse FAQs
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream" className="border-t border-line">
        <Container className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: "truck", t: "Order support", d: "Questions about a current order? We'll help." },
            { icon: "faq", t: "Product advice", d: "Not sure what's right for your home? Ask us." },
            { icon: "box", t: "Bulk & delivery", d: "Bulk orders, pallets and access queries." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-line bg-cream p-6">
              <Icon name={x.icon as "truck"} size={22} className="text-olive-2" />
              <p className="mt-3 font-serif text-lg text-charcoal">{x.t}</p>
              <p className="mt-1 text-sm text-ink-2">{x.d}</p>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: "mail" | "phone" | "clock" | "location";
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-olive/12 text-olive-2">
        <Icon name={icon} size={17} />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-ink-3">{label}</p>
        <p className="mt-0.5 text-sm text-charcoal">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {inner}
    </a>
  ) : (
    <li>{inner}</li>
  );
}
