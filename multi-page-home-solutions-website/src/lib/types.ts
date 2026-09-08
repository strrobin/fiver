// Core domain types used across the site.
// All display content lives in src/data/*; transactional data lives in the DB.
import type { IconName } from "@/components/icon";

export interface SpecItem {
  label: string;
  value: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export type Availability = "in-stock" | "low-stock" | "made-to-order" | "preorder";

export interface Product {
  slug: string;
  name: string;
  brand: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: "EUR";
  priceUnit?: string; // e.g. "per pallet", "per 15kg bag"
  categorySlug: string;
  categoryName: string;
  images: string[];
  specs: SpecItem[];
  benefits: string[];
  faqs: FaqItem[];
  rating: number;
  reviewCount: number;
  availability: Availability;
  badge?: string;
  featured?: boolean;
  isNew?: boolean;
  tags?: string[];
  // Future wood-pellet-specific technical metadata (kept generic for now).
  technical?: Record<string, string>;
}

export interface Subcategory {
  slug: string;
  name: string;
  description: string;
}

export interface Category {
  slug: string;
  name: string;
  navLabel: string;
  tagline: string;
  description: string;
  heroImage: string;
  image: string;
  breadcrumb: string;
  featured: boolean;
  future?: boolean; // wood pellets
  parentSlug?: string;
  subcategories: Subcategory[];
  faqs: FaqItem[];
  relatedCategories: string[];
  solutionSlugs: string[];
  guideSlugs: string[];
  educationalNote?: string;
}

export interface Solution {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  problem: string;
  approach: string;
  icon: IconName;
  benefits: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  recommendedProductSlugs: string[];
  faqs: FaqItem[];
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured?: boolean;
  popular?: boolean;
  sections: GuideSection[];
  relatedSlugs: string[];
  recommendedProductSlugs: string[];
  faqs: FaqItem[];
}

export interface Faq {
  category: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  product?: string;
}

export interface CartLine {
  productSlug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  unit?: string;
  categoryName?: string;
}
