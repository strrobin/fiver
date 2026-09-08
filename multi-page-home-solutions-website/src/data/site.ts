export const site = {
  name: "Havenwell",
  legalName: "Havenwell Home Solutions Ltd.",
  tagline: "Better Solutions for a Better Home.",
  description:
    "Thoughtful products and considered solutions for home comfort, efficiency, property care and seasonal living — built around the way people actually live.",
  email: "hello@havenwell.eu",
  phone: "+353 1 555 0184",
  phoneHref: "tel:+35315550184",
  address: {
    line1: "14 Rosewood Avenue",
    line2: "Dublin 4, Ireland",
  },
  hours: "Mon–Fri 8:00–18:00 · Sat 9:00–14:00",
  currency: "EUR" as const,
};

export interface TopNavItem {
  label: string;
  href: string;
  mega?: "products" | "solutions" | "guides";
}

export const topNav: TopNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", mega: "products" },
  { label: "Solutions", href: "/solutions", mega: "solutions" },
  { label: "About", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "Guides", href: "/guides", mega: "guides" },
  { label: "Contact", href: "/contact" },
];

export const guideCategories = [
  { slug: "home", label: "Home" },
  { slug: "energy", label: "Energy" },
  { slug: "seasonal", label: "Seasonal" },
  { slug: "property-care", label: "Property Care" },
  { slug: "buying-guides", label: "Buying Guides" },
];

// Numbers are illustrative placeholders until the client supplies real figures.
export const stats = [
  { value: "4.8", label: "Average customer rating" },
  { value: "12k+", label: "Orders delivered" },
  { value: "3", label: "Countries served" },
  { value: "9", label: "Years in home solutions" },
];

export const footerNav = [
  {
    title: "Explore",
    links: [
      { label: "Products", href: "/products" },
      { label: "Solutions", href: "/solutions" },
      { label: "Why Choose Us", href: "/why-us" },
      { label: "About Us", href: "/about" },
      { label: "Gift Cards", href: "/products" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Delivery & Payment", href: "/delivery" },
      { label: "FAQ", href: "/faq" },
      { label: "Returns", href: "/delivery#returns" },
      { label: "Contact", href: "/contact" },
      { label: "My Account", href: "/account" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "All Guides", href: "/guides" },
      { label: "Buying Guides", href: "/guides?category=buying-guides" },
      { label: "Energy", href: "/guides?category=energy" },
      { label: "Seasonal", href: "/guides?category=seasonal" },
    ],
  },
];
