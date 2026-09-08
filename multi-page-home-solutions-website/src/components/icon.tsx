import type { SVGProps } from "react";

export type IconName =
  | "home"
  | "sun"
  | "bolt"
  | "shield"
  | "leaf"
  | "snow"
  | "droplet"
  | "thermometer"
  | "spark"
  | "truck"
  | "box"
  | "heart"
  | "heartFilled"
  | "star"
  | "starFilled"
  | "cart"
  | "search"
  | "user"
  | "menu"
  | "close"
  | "chevronDown"
  | "chevronRight"
  | "arrowRight"
  | "plus"
  | "minus"
  | "check"
  | "checkCircle"
  | "faq"
  | "globe"
  | "phone"
  | "mail"
  | "location"
  | "clock"
  | "package"
  | "refresh"
  | "card"
  | "lock"
  | "filter"
  | "grid"
  | "list"
  | "settings"
  | "logout"
  | "wallet"
  | "info"
  | "tag"
  | "quote";

const stroke = ({ fill = "none", strokeWidth = 1.5 }: { fill?: string; strokeWidth?: number }) => ({
  fill,
  stroke: "currentColor" as const,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function Icon({
  name,
  className,
  size = 20,
  ...props
}: { name: IconName; className?: string; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const common = "font-[" + size + "px]";
  void common;

  let body: React.ReactNode = null;

  switch (name) {
    case "home":
      body = <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" {...stroke({})} />;
      break;
    case "sun":
      body = (
        <>
          <circle cx="12" cy="12" r="4" {...stroke({})} />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" {...stroke({})} />
        </>
      );
      break;
    case "bolt":
      body = <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" {...stroke({})} />;
      break;
    case "shield":
      body = <path d="M12 3 5 6v6c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Z" {...stroke({})} />;
      break;
    case "leaf":
      body = <path d="M4 20C4 11 11 4 20 4c0 9-7 16-16 16Zm0 0c0-5 3-9 8-11" {...stroke({})} />;
      break;
    case "snow":
      body = <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" {...stroke({})} />;
      break;
    case "droplet":
      body = <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" {...stroke({})} />;
      break;
    case "thermometer":
      body = <path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z" {...stroke({})} />;
      break;
    case "spark":
      body = <path d="M12 3v4M12 17v4M3 12h4M17 12h4" {...stroke({})} />;
      break;
    case "truck":
      body = (
        <>
          <path d="M2 6h11v9H2zM13 9h4l4 3v3h-8" {...stroke({})} />
          <circle cx="6.5" cy="18" r="1.5" {...stroke({})} />
          <circle cx="17.5" cy="18" r="1.5" {...stroke({})} />
        </>
      );
      break;
    case "box":
      body = <path d="M21 8 12 3 3 8v8l9 5 9-5V8Zm-9 5 9-5M12 13 3 8M12 13v8" {...stroke({})} />;
      break;
    case "heart":
    case "heartFilled":
      body = (
        <path
          d="M12 20s-7-4.35-9.5-8.5C.9 8.3 3 4.5 6.5 4.5 9 4.5 10.5 6 12 7.5c1.5-1.5 3-3 5.5-3 3.5 0 5.6 3.8 4 7C19 15.65 12 20 12 20Z"
          {...stroke({ fill: name === "heartFilled" ? "currentColor" : "none" })}
        />
      );
      break;
    case "star":
      body = <path d="m12 3 2.6 5.4 6 .9-4.3 4.1 1 5.9-5.3-2.8-5.3 2.8 1-5.9L3.4 9.3l6-.9L12 3Z" {...stroke({})} />;
      break;
    case "starFilled":
      body = <path d="m12 3 2.6 5.4 6 .9-4.3 4.1 1 5.9-5.3-2.8-5.3 2.8 1-5.9L3.4 9.3l6-.9L12 3Z" {...stroke({ fill: "currentColor" })} />;
      break;
    case "cart":
      body = (
        <>
          <path d="M3 3h2l2.4 12.2a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.8L20 7H6" {...stroke({})} />
          <circle cx="9.5" cy="20" r="1.4" {...stroke({})} />
          <circle cx="17.5" cy="20" r="1.4" {...stroke({})} />
        </>
      );
      break;
    case "search":
      body = (
        <>
          <circle cx="11" cy="11" r="7" {...stroke({})} />
          <path d="m20 20-3.5-3.5" {...stroke({})} />
        </>
      );
      break;
    case "user":
      body = (
        <>
          <circle cx="12" cy="8" r="4" {...stroke({})} />
          <path d="M5 20a7 7 0 0 1 14 0" {...stroke({})} />
        </>
      );
      break;
    case "menu":
      body = <path d="M3 6h18M3 12h18M3 18h18" {...stroke({})} />;
      break;
    case "close":
      body = <path d="M6 6l12 12M18 6 6 18" {...stroke({})} />;
      break;
    case "chevronDown":
      body = <path d="m6 9 6 6 6-6" {...stroke({})} />;
      break;
    case "chevronRight":
      body = <path d="m9 6 6 6-6 6" {...stroke({})} />;
      break;
    case "arrowRight":
      body = <path d="M4 12h16m-6-6 6 6-6 6" {...stroke({})} />;
      break;
    case "plus":
      body = <path d="M12 5v14M5 12h14" {...stroke({})} />;
      break;
    case "minus":
      body = <path d="M5 12h14" {...stroke({})} />;
      break;
    case "check":
      body = <path d="m5 12 5 5 9-10" {...stroke({})} />;
      break;
    case "checkCircle":
      body = (
        <>
          <circle cx="12" cy="12" r="9" {...stroke({})} />
          <path d="m8.5 12.5 2.5 2.5 5-6" {...stroke({})} />
        </>
      );
      break;
    case "faq":
      body = (
        <>
          <circle cx="12" cy="12" r="9" {...stroke({})} />
          <path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3M12 17h.01" {...stroke({})} />
        </>
      );
      break;
    case "globe":
      body = (
        <>
          <circle cx="12" cy="12" r="9" {...stroke({})} />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" {...stroke({})} />
        </>
      );
      break;
    case "phone":
      body = <path d="M5 4h3l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-1.5L20 16v3a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1Z" {...stroke({})} />;
      break;
    case "mail":
      body = <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2 7 6 7-6" {...stroke({})} />;
      break;
    case "location":
      body = (
        <>
          <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" {...stroke({})} />
          <circle cx="12" cy="10" r="2.5" {...stroke({})} />
        </>
      );
      break;
    case "clock":
      body = (
        <>
          <circle cx="12" cy="12" r="9" {...stroke({})} />
          <path d="M12 7v5l3 2" {...stroke({})} />
        </>
      );
      break;
    case "package":
      body = <path d="M12 2 2 7v10l10 5 10-5V7l-10-5Zm0 4 7 3.5M12 6 5 9.5m7 12.5v-8m10-4.5v8" {...stroke({})} />;
      break;
    case "refresh":
      body = <path d="M4 12a8 8 0 0 1 14-5l2 2m0-4v4h-4M20 12a8 8 0 0 1-14 5l-2-2m0 4v-4h4" {...stroke({})} />;
      break;
    case "card":
      body = <path d="M2 5h20v14H2zM2 10h20" {...stroke({})} />;
      break;
    case "lock":
      body = (
        <>
          <rect x="5" y="10" width="14" height="10" rx="1.5" {...stroke({})} />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" {...stroke({})} />
        </>
      );
      break;
    case "filter":
      body = <path d="M3 5h18M6 12h12M10 19h4" {...stroke({})} />;
      break;
    case "grid":
      body = <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" {...stroke({})} />;
      break;
    case "list":
      body = <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" {...stroke({})} />;
      break;
    case "settings":
      body = (
        <>
          <circle cx="12" cy="12" r="3" {...stroke({})} />
          <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 2.5a7 7 0 0 0-1.7 1L5.1 6l-2 3.5L5 11a7 7 0 0 0 0 2l-1.9 1.5 2 3.5 2.4-1a7 7 0 0 0 1.7 1l.3 2.5h5l.3-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.5L18.9 13a7 7 0 0 0 .1-1Z" {...stroke({})} />
        </>
      );
      break;
    case "logout":
      body = <path d="M14 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8M16 8l4 4-4 4M20 12H9" {...stroke({})} />;
      break;
    case "wallet":
      body = <path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Zm16 4h-2a2 2 0 0 0 0 4h2" {...stroke({})} />;
      break;
    case "info":
      body = (
        <>
          <circle cx="12" cy="12" r="9" {...stroke({})} />
          <path d="M12 11v5M12 8h.01" {...stroke({})} />
        </>
      );
      break;
    case "tag":
      body = <path d="M3 11 11 3l10 10-8 8L3 11Zm5-2a1.5 1.5 0 1 0 .01 0" {...stroke({})} />;
      break;
    case "quote":
      body = <path d="M9 7H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v2a3 3 0 0 1-3 3M20 7h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v2a3 3 0 0 1-3 3" {...stroke({})} />;
      break;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {body}
    </svg>
  );
}
