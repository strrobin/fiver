/* eslint-disable @next/next/no-img-element */
import type { ReactNode, CSSProperties } from "react";
import Link from "next/link";
import { Icon, type IconName } from "./icon";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
}) {
  return <Tag className={cn("container-x", className)}>{children}</Tag>;
}

export function Section({
  children,
  className,
  id,
  tone = "ivory",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "ivory" | "cream" | "charcoal" | "stone";
}) {
  const tones: Record<string, string> = {
    ivory: "bg-ivory",
    cream: "bg-cream",
    stone: "bg-stone",
    charcoal: "bg-charcoal text-cream",
  };
  return (
    <section id={id} className={cn("py-14 sm:py-20", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow text-olive", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <Eyebrow className={tone === "dark" ? "text-sage" : undefined}>{eyebrow}</Eyebrow>
      ) : null}
      <Tag className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.08] text-charcoal">
        {title}
      </Tag>
      {subtitle ? (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-cream/70" : "text-ink-2")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "light" | "link";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-olive";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-olive text-cream hover:bg-olive-2 active:bg-olive-2 shadow-sm",
  secondary: "bg-charcoal text-cream hover:bg-ink active:bg-ink",
  outline: "border border-ink/20 bg-transparent text-charcoal hover:border-ink/45 hover:bg-cream",
  ghost: "text-charcoal hover:bg-ink/5",
  light: "bg-cream text-charcoal hover:bg-white shadow-sm",
  link: "text-olive-2 underline underline-offset-4 hover:text-olive",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm rounded-full",
  md: "h-11 px-6 text-sm rounded-full",
  lg: "h-13 px-8 text-base rounded-full",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  /** set true when children is a custom node */
  withIcon,
  type = "button",
  ariaLabel,
  target,
  disabled,
}: {
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
  icon?: IconName;
  withIcon?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
  target?: string;
  disabled?: boolean;
}) {
  const classes = cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
  const inner = (
    <>
      {icon ? <Icon name={icon} size={size === "lg" ? 20 : 18} className="shrink-0" /> : null}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {inner}
    </button>
  );
}

export function Badge({
  children,
  tone = "olive",
  className,
}: {
  children: ReactNode;
  tone?: "olive" | "clay" | "charcoal" | "sage" | "outline";
  className?: string;
}) {
  const tones: Record<string, string> = {
    olive: "bg-olive/12 text-olive-2",
    clay: "bg-clay/12 text-clay-2",
    charcoal: "bg-charcoal text-cream",
    sage: "bg-sage text-charcoal",
    outline: "border border-ink/15 text-ink-2",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide", tones[tone], className)}>
      {children}
    </span>
  );
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-1.5 text-sm text-ink-3", className)}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.href && !last ? (
              <Link href={item.href} className="transition-colors hover:text-olive-2">
                {item.label}
              </Link>
            ) : (
              <span className={cn(last ? "text-charcoal font-medium" : "")}>{item.label}</span>
            )}
            {!last ? <Icon name="chevronRight" size={14} className="text-ink-3/60" /> : null}
          </span>
        );
      })}
    </nav>
  );
}

export function Stars({ rating, className, size = 15 }: { rating: number; className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-clay", className)} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon key={n} name={n <= Math.round(rating) ? "starFilled" : "star"} size={size} />
      ))}
    </span>
  );
}

export function Img({
  src,
  alt,
  className,
  style,
  loading = "lazy",
  sizes,
  ...rest
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  sizes?: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "className" | "style" | "loading" | "sizes">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading={loading} sizes={sizes} className={cn("object-cover", className)} style={style} {...rest} />
  );
}

export function Stat({ value, label, className }: { value: string; label: string; className?: string }) {
  return (
    <div className={cn("text-center sm:text-left", className)}>
      <div className="font-serif text-4xl font-medium text-charcoal sm:text-5xl">{value}</div>
      <div className="mt-2 text-sm text-ink-2">{label}</div>
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("hairline border-t", className)} />;
}

// ---------- Form primitives (uncontrolled / controlled-free) ----------

export function Label({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-charcoal">
      {children}
    </label>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-ink-3">{hint}</p> : null}
    </div>
  );
}

export const inputClass =
  "w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base text-charcoal placeholder:text-ink-3 transition-colors focus:border-olive focus:outline-none focus:ring-2 focus:ring-olive/20";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClass, "min-h-32 resize-y", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(inputClass, "appearance-none bg-no-repeat pr-10", props.className)}>
      {props.children}
    </select>
  );
}
