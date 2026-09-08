import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container, Section, Button } from "@/components/ui";
import { FAQExplorer } from "@/components/faq-explorer";
import { faqs, faqCategories } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about orders, products, delivery, payments, returns, account and wood pellets.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        eyebrow="Help centre"
        title="Frequently asked questions"
        subtitle="Clear answers to the things people ask us most — from ordering and delivery to returns and wood pellets."
      />

      <Section>
        <Container>
          <FAQExplorer faqs={faqs} categories={faqCategories} />
        </Container>
      </Section>

      <Section tone="cream" className="border-t border-line">
        <Container className="flex flex-col items-center text-center">
          <h2 className="font-serif text-2xl text-charcoal">Still have a question?</h2>
          <p className="mt-3 max-w-lg text-ink-2">
            Our team is happy to help. Reach out and we'll get back to you within one business day.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary" icon="arrowRight">Contact us</Button>
            <Button href="/delivery" variant="outline">Delivery &amp; payment</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
