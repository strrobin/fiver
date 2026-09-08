import type { Solution } from "@/lib/types";
import { img } from "@/lib/images";

export const solutions: Solution[] = [
  {
    slug: "home-comfort",
    name: "Home Comfort",
    title: "Home Comfort",
    tagline: "Warmth, calm and ease — designed for the rooms you live in.",
    description:
      "Home comfort is more than the temperature on the thermostat. It's the soft light of a lamp, the weight of a warm throw, the quiet warmth of a room that's ready for you. We curate the products and simple upgrades that make daily life feel genuinely comfortable.",
    image: img.livingWood,
    icon: "home",
    problem:
      "Many homes are technically fine but don't feel comfortable. Rooms are too warm or too cold, lighting is harsh, and small gaps and draughts create cold spots. The result is a home that works — but doesn't quite feel like yours.",
    approach:
      "We take a layered approach to comfort: gentle heating and control, soft and warm textiles, and considered lighting. Rather than one big change, we look for the small, well-made products that combine to make a room feel calm and inviting.",
    benefits: [
      { title: "Consistent warmth", description: "Even, gentle heat with precise control where you need it." },
      { title: "Softer, warmer spaces", description: "Textiles and light that make rooms feel calm and lived-in." },
      { title: "No cold spots", description: "Seal gaps and draughts to keep warmth exactly where you want it." },
      { title: "Effortless to maintain", description: "Durable, low-friction products that quietly do their job." },
    ],
    steps: [
      { title: "Assess your rooms", description: "Notice where rooms feel cold, harsh or unwelcoming, and where you spend the most time." },
      { title: "Warm the space", description: "Use gentle heat and control to keep an even temperature without waste." },
      { title: "Soften the details", description: "Add warm textiles and considered lighting to bring the room together." },
      { title: "Seal and stabilise", description: "Close gaps and draughts so the effort you make isn't lost." },
    ],
    recommendedProductSlugs: ["ardem-heat-panel", "sable-wool-throw", "lume-ceramic-lamp", "aurea-smart-thermostat"],
    faqs: [
      { q: "Where do I start with improving home comfort?", a: "Start with the space you use most. Look at temperature control first, then layer in warmth and light. Our guides take you through each step." },
      { q: "Do I need to replace my heating system?", a: "Not necessarily. Often a smarter thermostat, a supplementary heat panel and better sealing make a noticeable difference without a full replacement." },
    ],
  },
  {
    slug: "energy-efficiency",
    name: "Energy & Efficiency",
    title: "Energy & Efficiency",
    tagline: "Lower bills. Warm rooms. Smart decisions.",
    description:
      "Energy efficiency is about using less to get more. With the right control, smarter heating and simple sealing, you can keep your home warm while reducing waste, lowering bills and cutting the energy your household actually needs.",
    image: img.heatPumpOut,
    icon: "bolt",
    problem:
      "A lot of home energy goes to waste — heating empty rooms, losing warmth through gaps and windows, and running systems without insight. That waste costs money and comfort, month after month.",
    approach:
      "Our approach to efficiency is progressive, not prescriptive. Start with simple wins like improved control and sealing, then move to bigger systems when the time is right. We help you understand your home before you invest.",
    benefits: [
      { title: "Lower running costs", description: "Heat the rooms you use, only when you need them." },
      { title: "Better insight", description: "Understand where energy is used and spot waste quickly." },
      { title: "Future-ready upgrades", description: "Progress from small wins to efficient renewable heating." },
      { title: "Healthier, warmer homes", description: "Sealed, controlled spaces that feel consistently comfortable." },
    ],
    steps: [
      { title: "Understand usage", description: "Measure how and where energy is used in your home." },
      { title: "Take the simple wins", description: "Add smart control, seal gaps and insulate the easy spots." },
      { title: "Upgrade heating", description: "Move to more efficient systems when the time is right." },
      { title: "Revisit and tune", description: "Make small adjustments as the seasons and your home change." },
    ],
    recommendedProductSlugs: ["aurea-smart-thermostat", "clime-smart-meter", "nocturna-draught-seal", "volta-heat-pump"],
    faqs: [
      { q: "What is the quickest way to reduce energy waste?", a: "Smart temperature control and sealing are the fastest, lowest-cost wins. A smart thermostat and a draught-seal kit can make a noticeable difference quickly." },
      { q: "When should I consider a heat pump?", a: "Heat pumps suit well-insulated homes with lower-temperature heating. We can help you assess suitability before making a larger investment." },
    ],
  },
  {
    slug: "property-care",
    name: "Property Care",
    title: "Property Care",
    tagline: "Protect and maintain the home you own.",
    description:
      "A well-maintained property is more comfortable to live in, costs less to look after and holds its value. Property care is about small, consistent actions — cleaning, protecting and repairing — that keep your home in excellent shape year-round.",
    image: img.brickHouseA,
    icon: "shield",
    problem:
      "Homes deteriorate slowly and quietly. Weather staining, algae, wear and small maintenance issues build up until they become expensive. Left unchecked, small problems damage both comfort and value.",
    approach:
      "We take an ongoing, seasonal approach to property care. By protecting and maintaining surfaces and completing small tasks at the right time, you prevent bigger problems and keep your property looking and working its best.",
    benefits: [
      { title: "Protect value", description: "Consistent care prevents expensive, longer-term damage." },
      { title: "Better appearance", description: "Clean, protected surfaces that look well looked-after." },
      { title: "Lower lifetime cost", description: "Small effective tasks cost far less than major repairs." },
      { title: "Year-round confidence", description: "A simple, seasonal routine you can follow with ease." },
    ],
    steps: [
      { title: "Inspect", description: "Walk your property and note any signs of wear or staining." },
      { title: "Clean", description: "Lift grime and staining from masonry and hard surfaces." },
      { title: "Protect", description: "Apply breathable sealants and finishes to slow future damage." },
      { title: "Maintain", description: "Keep a simple seasonal routine to stay on top of small tasks." },
    ],
    recommendedProductSlugs: ["terra-eco-wall-paint", "stoneout-masonry-cleaner", "gronn-surface-guard", "shiftout-property-kit"],
    faqs: [
      { q: "How often should I maintain my property?", a: "For most homes, a light seasonal routine works well — cleaning and inspecting key areas a couple of times a year, with protective treatments applied as needed." },
      { q: "Are these products suitable for older properties?", a: "Yes, we prioritise breathable, gentle products that are kind to traditional and older masonry." },
    ],
  },
  {
    slug: "seasonal-living",
    name: "Seasonal Living",
    title: "Seasonal Living",
    tagline: "Be ready for every season, every time.",
    description:
      "Seasons shape how we live at home. Being ready for winter, welcoming the warmth of autumn and preparing for summer makes the changing year something to enjoy rather than endure. Seasonal living is about timing, preparation and the right essentials.",
    image: img.autumnTable,
    icon: "snow",
    problem:
      "The changing seasons often catch us out. We scramble to close gaps, protect outdoor spaces and keep warm at the last minute. That last-minute approach is stressful, expensive and often less effective than a little early preparation.",
    approach:
      "We help you prepare early and simply. By the season, we identify the essentials that make the year easier — protection, warmth and comfort — and help you build a small, repeatable routine you can follow each year.",
    benefits: [
      { title: "Less seasonal stress", description: "Be ready early instead of scrambling at the last minute." },
      { title: "Warmer, cosier winters", description: "The right essentials for proper winter readiness." },
      { title: "Protected outdoor spaces", description: "Keep furniture and equipment safe between seasons." },
      { title: "A repeatable routine", description: "A simple calendar you can follow with ease each year." },
    ],
    steps: [
      { title: "Plan ahead", description: "Identify what each season needs before it arrives." },
      { title: "Protect your space", description: "Cover and protect outdoor furniture and surfaces." },
      { title: "Keep warm", description: "Add insulation, warmth and comfort for cooler months." },
      { title: "Reset for the new season", description: "Tidy, restock and prepare for what's next." },
    ],
    recommendedProductSlugs: ["hygge-protective-covers", "ember-fireplace-set", "autumnal-insulating-film", "crisppath-de-icing"],
    faqs: [
      { q: "When should I start preparing for winter?", a: "We recommend starting in early autumn. Our seasonal guides and journal provide a simple, timely checklist so nothing is left to the last minute." },
      { q: "Can I build a seasonal routine?", a: "Yes. Our seasonal guides help you create a repeatable annual routine that keeps your home comfortable and protected all year." },
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
