import type { ReactNode } from "react";
import { Container, Breadcrumbs, Img } from "./ui";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  image,
  compact,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  image?: string;
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-cream">
      {image ? (
        <>
          <Img src={image} alt="" className="absolute inset-0 h-full w-full opacity-15" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/80 to-cream" />
        </>
      ) : null}
      <Container className={cn("relative z-10", compact ? "py-10 sm:py-14" : "py-14 sm:py-20")}>
        {breadcrumbs && breadcrumbs.length > 0 ? <Breadcrumbs items={breadcrumbs} className="mb-6" /> : null}
        {eyebrow ? <p className="eyebrow text-olive">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] text-charcoal">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{subtitle}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
