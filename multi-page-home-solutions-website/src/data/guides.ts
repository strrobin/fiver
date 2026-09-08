import type { Guide } from "@/lib/types";
import { img } from "@/lib/images";

export const guides: Guide[] = [
  {
    slug: "preparing-your-home-for-winter",
    title: "How to prepare your home for winter",
    category: "Seasonal",
    categorySlug: "seasonal",
    excerpt:
      "A calm, unhurried checklist to get your home warm, dry and ready for the colder months — without the last-minute scramble.",
    image: img.livingSnow,
    author: "Elena Marsh",
    authorRole: "Head of Seasonal Living",
    date: "2025-11-04",
    readTime: "7 min",
    featured: true,
    popular: true,
    sections: [
      {
        heading: "Start early, stay calm",
        paragraphs: [
          "Winter preparation is a lot easier when it happens in stages, rather than in one panicked weekend. By starting in early autumn, you can work through the essentials calmly and catch small problems before they become expensive ones.",
          "The goal is simple: keep warmth in, keep weather out, and keep your home running safely through the colder months.",
        ],
      },
      {
        heading: "Make warmth work harder",
        paragraphs: [
          "Before you think about new heating, make sure the warmth you generate is staying where it belongs. Draughts around doors and windows are one of the most common ways heat escapes — and one of the cheapest to fix.",
        ],
        list: [
          "Check and seal gaps around exterior doors and window frames.",
          "Add a well-fitted insulating film to older or single-glazed windows.",
          "Consider a draught seal kit to close the small gaps that create cold spots.",
          "Balance your radiators so every room heats evenly.",
        ],
      },
      {
        heading: "Protect your outdoor space",
        paragraphs: [
          "Furniture, equipment and surfaces left exposed through winter wear faster and look worse for it. The right protection now saves cleanup and repair work in spring.",
        ],
        list: [
          "Cover outdoor furniture and equipment with weather-resistant covers.",
          "Clear gutters and drains to prevent water pooling and damage.",
          "Move or cover anything that could be damaged by frost.",
        ],
      },
      {
        heading: "Keep the important systems safe",
        paragraphs: [
          "A little routine attention goes a long way. Check your heating system, know how to shut off your water supply in an emergency, and keep the essentials handy in case of a cold snap.",
        ],
      },
      {
        heading: "Build a routine you can repeat",
        paragraphs: [
          "The best seasonal preparation is a repeatable routine. Write down what you did this year, and follow the same gentle checklist every autumn so your home is always ready before the cold arrives.",
        ],
      },
    ],
    relatedSlugs: ["seasonal-home-maintenance-calendar", "improving-home-energy-efficiency"],
    recommendedProductSlugs: ["nocturna-draught-seal", "autumnal-insulating-film", "hygge-protective-covers"],
    faqs: [
      { q: "When is the best time to start winter prep?", a: "Early autumn is ideal. It gives you time to work through the essentials calmly and catch issues before the coldest weather." },
    ],
  },
  {
    slug: "improving-home-energy-efficiency",
    title: "Improving home energy efficiency: a practical guide",
    category: "Energy",
    categorySlug: "energy",
    excerpt:
      "From simple control upgrades to bigger heating decisions, here's how to improve efficiency in the right order — and save the most.",
    image: img.heatPumpOut,
    author: "Jonas Keller",
    authorRole: "Energy Innovation Lead",
    date: "2025-10-21",
    readTime: "8 min",
    featured: true,
    popular: true,
    sections: [
      {
        heading: "Think in the right order",
        paragraphs: [
          "Energy efficiency isn't about one dramatic change. It's about a series of sensible steps, taken in the right order. Start with the cheapest, highest-impact wins, then progress to bigger investments when the time is right.",
        ],
      },
      {
        heading: "The low-cost wins first",
        paragraphs: [
          "These actions pay for themselves quickly and make a real difference to wellbeing and running costs.",
        ],
        list: [
          "Control heating by room and time with a smart thermostat.",
          "Seal draughts around doors and windows.",
          "Use thermostatic radiator valves to reduce wasted heat.",
          "Measure your usage to see where energy actually goes.",
        ],
      },
      {
        heading: "Insulate and seal",
        paragraphs: [
          "Insulation and sealing are the foundation of efficiency. Heat you generate should stay in the building, not leak out through gaps, windows and poorly insulated walls.",
        ],
      },
      {
        heading: "Think about the heating system",
        paragraphs: [
          "When your current system is nearing the end of its life, an efficient upgrade is worth considering. Heat pumps, in particular, can offer excellent efficiency for well-insulated homes — but they need suitable conditions to perform well.",
        ],
      },
      {
        heading: "Review and tune",
        paragraphs: [
          "Efficiency isn't a one-off. Your home and habits change through the year, so review your settings, spot new waste and make small adjustments to keep things on track.",
        ],
      },
    ],
    relatedSlugs: ["choosing-the-right-heating-solution", "smart-thermostat-guide"],
    recommendedProductSlugs: ["aurea-smart-thermostat", "nocturna-draught-seal", "thermis-eco-valve", "clime-smart-meter"],
    faqs: [
      { q: "What gives the biggest return on investment?", a: "Smart control and sealing are typically the fastest wins. Bigger systems like heat pumps offer efficiency but require suitable conditions and a larger investment." },
    ],
  },
  {
    slug: "choosing-the-right-heating-solution",
    title: "How to choose the right heating solution",
    category: "Buying Guides",
    categorySlug: "buying-guides",
    excerpt:
      "A clear framework for choosing between a smart thermostat, a heat panel and a full heat pump — based on your home and how you live.",
    image: img.radiator,
    author: "Jonas Keller",
    authorRole: "Energy Innovation Lead",
    date: "2025-09-30",
    readTime: "6 min",
    popular: true,
    sections: [
      {
        heading: "Match the solution to the problem",
        paragraphs: [
          "There's no single right heating solution. The right choice depends on your home, your budget and how you actually live. Start by asking what problem you're trying to solve: comfort, cost, efficiency or all three.",
        ],
      },
      {
        heading: "For simple comfort in one room",
        paragraphs: [
          "If a single room is too cold and you want gentle warmth without a full system, a slim heat panel is a sensible choice. It plugs in quietly and warms the space you're using.",
        ],
      },
      {
        heading: "For better everyday control",
        paragraphs: [
          "A smart thermostat works well for improving control of an existing system. It learns your routine, heats only when needed and gives you insight into where energy goes.",
        ],
      },
      {
        heading: "For whole-home, efficient heating",
        paragraphs: [
          "A heat pump is a bigger decision, suited to well-insulated homes with lower-temperature heating. It offers excellent efficiency and can provide comfort, but requires good conditions and professional installation.",
        ],
      },
      {
        heading: "Get advice tailored to you",
        paragraphs: [
          "The best heating decision is an informed one. We're happy to talk through your home, your habits and your budget to help you choose sensibly rather than over-invest.",
        ],
      },
    ],
    relatedSlugs: ["improving-home-energy-efficiency", "smart-thermostat-guide"],
    recommendedProductSlugs: ["ardem-heat-panel", "aurea-smart-thermostat", "volta-heat-pump"],
    faqs: [
      { q: "Should I replace my boiler?", a: "Not necessarily. Often a smart thermostat and better sealing make a strong difference. If your boiler is old and inefficient, an efficient alternative may be worth considering — speak to our team for guidance." },
    ],
  },
  {
    slug: "preparing-your-property-for-spring",
    title: "Preparing your property for spring",
    category: "Property Care",
    categorySlug: "property-care",
    excerpt:
      "After winter, a little attention goes a long way. Here's how to clean, protect and refresh your property for the warmer months.",
    image: img.brickHouseA,
    author: "Owen Barrett",
    authorRole: "Property Care Specialist",
    date: "2025-03-14",
    readTime: "6 min",
    sections: [
      {
        heading: "Assess after winter",
        paragraphs: [
          "Winter can leave marks on a property — algae, weather staining, wear and the build-up of grime. Walk the exterior and note anything that needs attention before it gets worse.",
        ],
      },
      {
        heading: "Clean masonry and hard surfaces",
        paragraphs: [
          "A careful clean lifts the darker staining that builds up through winter. Use a masonry cleaner appropriate to brick, stone or render, and always protect nearby plants.",
        ],
      },
      {
        heading: "Protect for the year ahead",
        paragraphs: [
          "Once clean, a breathable sealant helps repel water and slows the return of algae and staining. It protects the surface while allowing the building to breathe.",
        ],
      },
      {
        heading: "Refresh interiors",
        paragraphs: [
          "A fresh coat of breathable, low-emission paint and a careful tidy of the spaces you use most can make a big difference to how your home feels in spring.",
        ],
      },
    ],
    relatedSlugs: ["seasonal-home-maintenance-calendar", "preparing-your-home-for-winter"],
    recommendedProductSlugs: ["stoneout-masonry-cleaner", "gronn-surface-guard", "terra-eco-wall-paint"],
    faqs: [
      { q: "When should I clean and seal masonry?", a: "Mild, dry weather is ideal — typically in spring or early autumn, avoiding periods of heavy rain or frost." },
    ],
  },
  {
    slug: "understanding-wood-pellet-quality",
    title: "Understanding wood pellet quality",
    category: "Buying Guides",
    categorySlug: "buying-guides",
    excerpt:
      "What certification, calorific value, ash content and moisture really mean — and how they affect the efficiency of a pellet stove.",
    image: img.firewoodPile,
    author: "Elena Marsh",
    authorRole: "Head of Seasonal Living",
    date: "2025-08-19",
    readTime: "7 min",
    sections: [
      {
        heading: "Why quality matters",
        paragraphs: [
          "Wood pellets vary more than you might expect. The quality of the pellet directly affects how cleanly it burns, how much ash it leaves, and how efficiently it produces heat. Buying quality pays for itself over the season.",
        ],
      },
      {
        heading: "Certification and quality marks",
        paragraphs: [
          "A recognised certification such as ENplus is the clearest way to buy pellets with confidence. It guarantees a range of specifications, including consistent calorific value, low ash, proper moisture and a set diameter.",
        ],
        list: [
          "ENplus A1: premium quality for efficient, low-ash burning.",
          "ENplus A2: reliable everyday performance at a slightly lower specification.",
          "Look for the certificate, not just the claim.",
        ],
      },
      {
        heading: "Calorific value",
        paragraphs: [
          "Calorific value tells you how much heat a pellet contains. A higher value means more heat per kilogram — and typically greater efficiency through the season.",
        ],
      },
      {
        heading: "Ash content and moisture",
        paragraphs: [
          "Ash is what's left after burning. Lower ash means less frequent cleaning and fewer dust particles. Moisture matters too — pellets should be dry, as excess moisture reduces the heat you get and the efficiency of the burn.",
        ],
      },
      {
        heading: "Choosing the right pellet for you",
        paragraphs: [
          "For most modern pellet stoves, a premium A1 pellet offers the best balance of cleanliness and efficiency. A dependable A2 pellet is a sensible everyday choice for regular heating. We'll help you match the specification to your stove and usage.",
        ],
      },
    ],
    relatedSlugs: ["how-to-choose-the-right-wood-pellet", "choosing-the-right-heating-solution"],
    recommendedProductSlugs: ["nordpel-premium-pellets", "nordpel-eco-pellets"],
    faqs: [
      { q: "What is ENplus A1?", a: "ENplus A1 is a premium certification that guarantees consistent calorific value, low ash (typically ≤0.5%), low moisture and a set diameter — the strongest signal of pellet quality." },
    ],
  },
  {
    slug: "how-to-choose-the-right-wood-pellet",
    title: "How to choose the right wood pellet",
    category: "Buying Guides",
    categorySlug: "buying-guides",
    excerpt:
      "Diameter, bag weight, certification and delivery — a straightforward guide to choosing the right pellet for your stove and budget.",
    image: img.firewoodWall,
    author: "Elena Marsh",
    authorRole: "Head of Seasonal Living",
    date: "2025-07-08",
    readTime: "6 min",
    sections: [
      {
        heading: "Start with your stove",
        paragraphs: [
          "Different pellet stoves and boilers have their own requirements, so start there. Check the recommended pellet diameter and any quality requirements before you decide.",
        ],
      },
      {
        heading: "Match the specification",
        paragraphs: [
          "Diameters are typically 6mm or 8mm, and most modern stoves run on 6mm pellets. Confirm your stove's requirement first to avoid unusable stock.",
        ],
      },
      {
        heading: "Consider bag and pallet weights",
        paragraphs: [
          "Pellets are sold by the bag and delivered by the pallet. 15kg bags are manageable for storage and refilling, while a standard pallet typically carries 70 bags (around 1,050kg).",
        ],
      },
      {
        heading: "Think about storage and delivery",
        paragraphs: [
          "Pallets need dry, accessible storage and a delivery point a truck can reach. Our delivery page covers the logistics in detail — from tail-lift to access requirements.",
        ],
      },
      {
        heading: "Buy in bulk, seasonally",
        paragraphs: [
          "Pellet users typically buy for the season. Bulk pallet delivery is more efficient, and repeat ordering helps you avoid running out at the coldest time of year.",
        ],
      },
    ],
    relatedSlugs: ["understanding-wood-pellet-quality", "preparing-your-home-for-winter"],
    recommendedProductSlugs: ["nordpel-premium-pellets", "nordpel-certified-a1"],
    faqs: [
      { q: "Are all pellets the same diameter?", a: "No. Common diameters are 6mm and 8mm. Most modern pellet stoves use 6mm, but always confirm your stove's requirement before ordering." },
    ],
  },
  {
    slug: "smart-thermostat-guide",
    title: "A practical guide to smart thermostats",
    category: "Home",
    categorySlug: "home",
    excerpt:
      "What a smart thermostat actually does, whether it's worth it, and how to get the most from it in a modern home.",
    image: img.thermostat,
    author: "Jonas Keller",
    authorRole: "Energy Innovation Lead",
    date: "2025-06-12",
    readTime: "5 min",
    sections: [
      {
        heading: "What a smart thermostat does",
        paragraphs: [
          "A smart thermostat takes the guesswork out of heating. It learns your routine, heats only when you're likely to need it, and lets you control temperature from your phone — making everyday comfort easier and more efficient.",
        ],
      },
      {
        heading: "Is it worth it?",
        paragraphs: [
          "For most homes, yes. The warmest comfort comes from heating the right room at the right time. A smart thermostat does this automatically, reducing waste and often quickly paying for itself.",
        ],
      },
      {
        heading: "Getting the most from it",
        paragraphs: [
          "Pair it with good sealing and consistent, sensible schedules. Use the comfort mode for short bursts and avoid heating empty rooms. Review your energy insights occasionally to spot new waste.",
        ],
      },
      {
        heading: "Compatibility and installation",
        paragraphs: [
          "Most smart thermostats work with standard systems, but it's worth confirming compatibility before buying. For many homes, installation is straightforward; professional installation is available where needed.",
        ],
      },
    ],
    relatedSlugs: ["improving-home-energy-efficiency", "choosing-the-right-heating-solution"],
    recommendedProductSlugs: ["aurea-smart-thermostat", "thermis-eco-valve"],
    faqs: [
      { q: "Will a smart thermostat work with my heating?", a: "Aurea works with the majority of standard heating systems. We help you confirm compatibility before purchase." },
    ],
  },
  {
    slug: "seasonal-home-maintenance-calendar",
    title: "Your seasonal home maintenance calendar",
    category: "Seasonal",
    categorySlug: "seasonal",
    excerpt:
      "A simple, repeatable annual calendar to keep your home comfortable, protected and well-maintained through every season.",
    image: img.autumnTable,
    author: "Owen Barrett",
    authorRole: "Property Care Specialist",
    date: "2025-05-02",
    readTime: "8 min",
    featured: true,
    sections: [
      {
        heading: "Why a calendar helps",
        paragraphs: [
          "Home maintenance is easier when it's planned. A simple seasonal calendar spreads small tasks across the year, preventing expensive surprises and keeping your home in good shape.",
        ],
      },
      {
        heading: "Spring",
        paragraphs: [
          "After winter, check for weather staining and damage. Clean masonry and hard surfaces, protect with a breathable sealant, and refresh interiors with a fresh coat of paint.",
        ],
      },
      {
        heading: "Summer",
        paragraphs: [
          "Focus on outdoor comfort and care. Protect outdoor furniture, check seals and finishes, and keep the exterior tidy before the weather turns.",
        ],
      },
      {
        heading: "Autumn",
        paragraphs: [
          "The busiest season for preparation. Seal draughts, insulate windows, cover outdoor furniture and make sure your heating is ready for the colder months.",
        ],
      },
      {
        heading: "Winter",
        paragraphs: [
          "Keep walkways safe, check your heating system and be ready for cold snaps. It's also a good time to plan any bigger improvement for the year ahead.",
        ],
      },
    ],
    relatedSlugs: ["preparing-your-property-for-spring", "preparing-your-home-for-winter"],
    recommendedProductSlugs: ["hygge-protective-covers", "nocturna-draught-seal", "crisppath-de-icing"],
    faqs: [
      { q: "Can I follow this even if I'm busy?", a: "Yes. The calendar is designed to be gentle — a few small tasks each season that prevent much bigger problems later." },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(categorySlug: string): Guide[] {
  return guides.filter((g) => g.categorySlug === categorySlug);
}

export const featuredGuides = guides.filter((g) => g.featured);
export const popularGuides = guides.filter((g) => g.popular).slice(0, 6);
