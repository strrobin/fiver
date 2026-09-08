import type { Category } from "@/lib/types";
import { img } from "@/lib/images";

export const categories: Category[] = [
  {
    slug: "home-comfort",
    name: "Home Comfort",
    navLabel: "Home Comfort",
    tagline: "Make every room feel like home.",
    description:
      "Thoughtfully curated products that bring warmth, calm and everyday ease to the rooms you spend the most time in. Comfort is built from the details — light, texture, warmth and the small comforts that turn a house into a home.",
    heroImage: img.livingWood,
    image: img.livingRustic,
    breadcrumb: "Home Comfort",
    featured: true,
    subcategories: [
      { slug: "heating-ambience", name: "Heating & Ambience", description: "Gentle warmth and the glow of a well-lit room." },
      { slug: "living-lounge", name: "Living & Lounge", description: "The textiles and details that soften a room." },
      { slug: "light-comforts", name: "Light & Small Comforts", description: "Small, considered objects for everyday ease." },
    ],
    faqs: [
      { q: "How do I know a product will suit my space?", a: "Every product page lists dimensions, materials and practical guidance. For unsure purchases, our team is happy to help you choose the right option for your room." },
      { q: "Are your comfort products safe for family homes?", a: "Yes. We prioritise low-emission, family-friendly materials and clearly flag any special care instructions on the product specification." },
    ],
    relatedCategories: ["energy-efficiency", "seasonal-essentials"],
    solutionSlugs: ["home-comfort"],
    guideSlugs: ["smart-thermostat-guide", "preparing-your-home-for-winter"],
    educationalNote: "Comfort is personal. We look for products that work quietly in the background — warming, softening and making daily life easier without demanding your attention.",
  },
  {
    slug: "energy-efficiency",
    name: "Energy & Efficiency",
    navLabel: "Energy & Efficiency",
    tagline: "Lower bills. Warm rooms. Smart decisions.",
    description:
      "Efficient heating, intelligent control and simple upgrades that turn wasted energy into everyday comfort. Whether you're modernising a single room or the whole home, we help you make clearer, better-considered energy choices.",
    heroImage: img.heatPumpOut,
    image: img.thermostat,
    breadcrumb: "Energy & Efficiency",
    featured: true,
    subcategories: [
      { slug: "smart-heating", name: "Smart Heating & Control", description: "Precise, connected control over your home's warmth." },
      { slug: "insulation-sealing", name: "Insulation & Sealing", description: "Keep warmth in and draughts out with simple upgrades." },
      { slug: "heat-pumps", name: "Heat Pumps & Renewables", description: "Efficient renewable heating for whole-home comfort." },
      { slug: "wood-pellets", name: "Wood Pellets", description: "Premium renewable heating fuel — coming soon." },
    ],
    faqs: [
      { q: "Will these products actually lower my energy bills?", a: "The biggest savings come from controlling heat where and when you need it. Smart thermostats, good seals and efficient heating should reduce waste — we explain expected impact on each product page." },
      { q: "Do you help me choose a heating solution?", a: "Yes. Start with the Energy & Efficiency solution page, or contact our team for guidance tailored to your home, usage and budget." },
    ],
    relatedCategories: ["home-comfort", "property-care", "wood-pellets"],
    solutionSlugs: ["energy-efficiency", "seasonal-living"],
    guideSlugs: ["improving-home-energy-efficiency", "choosing-the-right-heating-solution", "understanding-wood-pellet-quality"],
    educationalNote: "Efficiency starts with control. Our range is built around products that help you heat less wasteful, seal better and understand where your energy actually goes.",
  },
  {
    slug: "property-care",
    name: "Property Care",
    navLabel: "Property Care",
    tagline: "Protect and maintain the home you own.",
    description:
      "Practical products for maintenance, repair and protection that keep your property in excellent shape, year after year. Good property care protects value and prevents small problems from becoming expensive ones.",
    heroImage: img.brickHouseA,
    image: img.paintRoller,
    breadcrumb: "Property Care",
    featured: true,
    subcategories: [
      { slug: "decorating", name: "Decorating & Refreshing", description: "Warm, breathable paints and finishes for interiors and exteriors." },
      { slug: "sealing-protection", name: "Sealing & Protection", description: "Protect surfaces and masonry from weather and wear." },
      { slug: "maintenance-tools", name: "Maintenance & Tools", description: "The right tools to plan and complete a home project." },
    ],
    faqs: [
      { q: "Are your products suitable for DIY use?", a: "Yes. We prioritise products that are straightforward for a competent DIYer. Each product includes clear application guidance, and our team is available for advice." },
      { q: "What should I do before decorating or sealing?", a: "Prepare the surface properly — clean, dry and, where needed, treat any existing damage. Our guides walk you through preparation for common projects." },
    ],
    relatedCategories: ["seasonal-essentials", "energy-efficiency"],
    solutionSlugs: ["property-care"],
    guideSlugs: ["preparing-your-property-for-spring", "seasonal-home-maintenance-calendar"],
    educationalNote: "A well-maintained property is a more comfortable place to live. We focus on products that make maintenance simpler, more effective and longer-lasting.",
  },
  {
    slug: "seasonal-essentials",
    name: "Seasonal Essentials",
    navLabel: "Seasonal Essentials",
    tagline: "Be ready for every season, every time.",
    description:
      "Smart seasonal essentials that take the stress out of the changing year — from preparing for winter to welcoming the warmth of autumn. The right preparation makes every season more comfortable and more manageable.",
    heroImage: img.autumnTable,
    image: img.firewoodBaskets,
    breadcrumb: "Seasonal Essentials",
    featured: true,
    subcategories: [
      { slug: "winter-readiness", name: "Winter Readiness", description: "Protection and warmth for the colder months." },
      { slug: "autumn-warmth", name: "Autumn Warmth", description: "Candlelight, fireplaces and cosy seasonal touches." },
      { slug: "summer-care", name: "Summer & Outdoor Care", description: "Keep outdoor spaces comfortable and protected." },
    ],
    faqs: [
      { q: "When should I start preparing for a season?", a: "We recommend planning ahead. For winter, start in early autumn. Our seasonal guides and the journal help you build a simple, timely routine." },
      { q: "Do you have seasonal bundles?", a: "Themed collections are available within each category. As we grow, we'll expand into curated seasonal bundles — join the newsletter for updates." },
    ],
    relatedCategories: ["home-comfort", "property-care", "wood-pellets"],
    solutionSlugs: ["seasonal-living", "home-comfort"],
    guideSlugs: ["preparing-your-home-for-winter", "seasonal-home-maintenance-calendar", "preparing-your-property-for-spring"],
    educationalNote: "Seasonal living is about being ready early and acting simply. The right products at the right time make preparation feel effortless rather than stressful.",
  },
  {
    slug: "wood-pellets",
    name: "Wood Pellets",
    navLabel: "Wood Pellets",
    tagline: "Premium renewable heating fuel — coming soon.",
    description:
      "We're building a dedicated wood pellet range around quality, certification and honest specification. This category captures the architecture we'll launch — certification, diameter, bag and pallet weight, calorific value, ash content, moisture, availability and bulk delivery.",
    heroImage: img.firewoodPile,
    image: img.firewoodPile,
    breadcrumb: "Wood Pellets",
    featured: false,
    future: true,
    parentSlug: "energy-efficiency",
    subcategories: [
      { slug: "premium-pellets", name: "Premium Pellets", description: "A1-certified premium softwood pellets for efficient burning." },
      { slug: "eco-pellets", name: "Eco Pellets", description: "Reliable everyday pellets for seasonal heating." },
      { slug: "certification", name: "Certification & Quality", description: "What quality marks like ENplus A1 actually mean for you." },
    ],
    faqs: [
      { q: "What does the quality mark mean?", a: "A recognised certification such as ENplus A1 guarantees consistent calorific value, low ash content, proper moisture and a specific diameter. Quality marks are the clearest way to buy wood pellets with confidence." },
      { q: "How are wood pellets delivered?", a: "Pellets are a bulk product delivered on pallets. Our future delivery page explains pallet delivery, unloading logistics and access requirements in detail. You'll be asked about access before you order." },
      { q: "When will wood pellets be available?", a: "We're finalising our supplier and quality process. The full specification and delivery model are outlined on this page. Join the newsletter to be notified when the range launches." },
    ],
    relatedCategories: ["energy-efficiency", "home-comfort", "seasonal-essentials"],
    solutionSlugs: ["energy-efficiency", "seasonal-living"],
    guideSlugs: ["understanding-wood-pellet-quality", "how-to-choose-the-right-wood-pellet"],
    educationalNote: "When it launches, this category will let you filter pellets by brand, certification, diameter, bag and pallet weight, calorific value, ash content, moisture and availability — with bulk ordering and full heating guides.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const featuredCategories = categories.filter((c) => c.featured);
export const parentCategories = categories.filter((c) => !c.future);
