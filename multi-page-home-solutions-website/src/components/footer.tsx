import Link from "next/link";
import { site, footerNav } from "@/data/site";
import { NewsletterForm } from "./interactive";
import { Icon } from "./icon";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-olive text-cream">
                <Icon name="home" size={20} />
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight text-cream">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-cream/60">
              {site.description}
            </p>
            <div className="mt-6">
              <p className="font-serif text-lg text-cream">Stay in the loop</p>
              <p className="mt-1 text-sm text-cream/60">New products, seasonal guides and practical home advice.</p>
              <div className="mt-4">
                <NewsletterForm dark />
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            {footerNav.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-sage">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-14 grid gap-6 rounded-2xl border border-cream/10 bg-cream/5 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <FooterContact icon="mail" label="Email" value={site.email} href={`mailto:${site.email}`} />
          <FooterContact icon="phone" label="Phone" value={site.phone} href={site.phoneHref} />
          <FooterContact icon="clock" label="Hours" value={site.hours} />
          <FooterContact icon="location" label="Address" value={`${site.address.line1}, ${site.address.line2}`} />
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} {site.legalName} All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-cream/50">
              <Icon name="lock" size={14} />
              <span className="text-xs">Secure checkout</span>
            </div>
            <div className="flex items-center gap-1.5">
              {["Visa", "MC", "PayPal", "Klarna", "Apple Pay"].map((p) => (
                <span key={p} className="rounded-md border border-cream/15 px-2 py-1 text-[10px] font-semibold text-cream/60">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterContact({
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
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cream/10 text-sage">
        <Icon name={icon} size={17} />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-cream/50">{label}</p>
        <p className="mt-0.5 text-sm text-cream">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="transition-opacity hover:opacity-80">
      {inner}
    </a>
  ) : (
    inner
  );
}
