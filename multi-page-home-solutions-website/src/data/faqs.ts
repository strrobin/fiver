import type { Faq } from "@/lib/types";

export const faqs: Faq[] = [
  // Orders
  {
    category: "Orders",
    question: "How do I place an order?",
    answer: "Browse the shop, add the products you'd like to your cart, then proceed to checkout. You'll enter your details, choose a delivery and payment method, and confirm your order.",
  },
  {
    category: "Orders",
    question: "Can I change or cancel my order?",
    answer: "Yes — you can change or cancel an order before it's dispatched. Contact us as soon as possible with your order number and we'll make the change.",
  },
  {
    category: "Orders",
    question: "How do I track my order?",
    answer: "Once your order is dispatched you'll receive a confirmation email with tracking details, where available. You can also view order status in your account.",
  },
  {
    category: "Orders",
    question: "How quickly do you confirm orders?",
    answer: "We confirm orders by email shortly after checkout. Larger or made-to-order items may include a note about a longer lead time.",
  },

  // Products
  {
    category: "Products",
    question: "Are your products suitable for DIY installation?",
    answer: "Yes. We prioritise products that a competent DIYer can install and use. Each product page includes clear guidance, and our team is happy to help with specific questions.",
  },
  {
    category: "Products",
    question: "How do I know a product will suit my needs?",
    answer: "Each product page lists specifications, dimensions and practical guidance. For larger decisions, like heating, start with the relevant solution page or contact our team.",
  },
  {
    category: "Products",
    question: "Do you test the products you sell?",
    answer: "We review and assess the products we offer for quality, safety and performance. We only list products we're confident serve our customers well.",
  },

  // Delivery
  {
    category: "Delivery",
    question: "Where do you deliver?",
    answer: "We deliver to the island of Ireland and mainland Europe. Delivery options are confirmed at checkout based on your address.",
  },
  {
    category: "Delivery",
    question: "How much does delivery cost?",
    answer: "Standard delivery for most products is calculated at checkout and shown clearly before you pay. Large and bulk items are quoted separately.",
  },
  {
    category: "Delivery",
    question: "How do large or bulk items get delivered?",
    answer: "Large and bulk products, including pallets, are delivered by courier with tail-lift or crane, depending on the order. We'll confirm access requirements with you before dispatch.",
  },
  {
    category: "Delivery",
    question: "Can I choose a delivery date?",
    answer: "Where available, you can choose a preferred delivery slot at checkout. We'll confirm the slot with you after placing your order.",
  },

  // Payments
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer: "We accept major debit and credit cards, and secure online payment services. All payments are processed over an encrypted connection.",
  },
  {
    category: "Payments",
    question: "Is payment secure?",
    answer: "Yes. Payments are processed over encrypted, secure connections and we never store your full card details on our servers.",
  },
  {
    category: "Payments",
    question: "Do you offer instalments?",
    answer: "For larger purchases, such as heating systems, we can discuss instalment or financing options. Contact our team for details.",
  },

  // Returns
  {
    category: "Returns",
    question: "What is your returns policy?",
    answer: "You can return most unused products in their original condition within a set period of your purchase. Some made-to-order, personalised and bulk items are excluded — these are clearly noted at checkout.",
  },
  {
    category: "Returns",
    question: "How do I start a return?",
    answer: "Contact us with your order number and the reason for return. We'll provide instructions and, where eligible, arrange collection or a return label.",
  },
  {
    category: "Returns",
    question: "When will I receive my refund?",
    answer: "Once we receive and inspect your returned item, refunds are issued to the original payment method, usually within a few working days.",
  },

  // Account
  {
    category: "Account",
    question: "How do I create an account?",
    answer: "You can create an account at checkout or from the account page. It lets you view orders, save addresses and build a wishlist.",
  },
  {
    category: "Account",
    question: "Can I reorder past items easily?",
    answer: "Yes. Your order history lets you view past purchases and reorder quickly — useful for seasonal items you buy year after year.",
  },
  {
    category: "Account",
    question: "I've forgotten my password. What should I do?",
    answer: "Use the password reset link on the account page to receive an email to reset your password.",
  },

  // Wood Pellets (future)
  {
    category: "Wood Pellets",
    question: "When will wood pellets be available?",
    answer: "We're finalising our supplier and quality process. The category page outlines the full specification and delivery model we intend to offer. Join the newsletter to be notified when the range launches.",
  },
  {
    category: "Wood Pellets",
    question: "What quality marks can I expect?",
    answer: "We expect to offer pellets certified to recognised standards such as ENplus A1. Certification guarantees consistent calorific value, low ash, proper moisture and a set diameter.",
  },
  {
    category: "Wood Pellets",
    question: "How is bulk pellet delivery managed?",
    answer: "Pellets are delivered on pallets. We'll confirm access, unloading and storage requirements with you before dispatch. The delivery page explains the process in detail.",
  },
  {
    category: "Wood Pellets",
    question: "Can I order pellets seasonally or in bulk?",
    answer: "Yes. Bulk pallet quantities and seasonal reordering are supported. As the range launches, we'll make repeat ordering straightforward for the heating season.",
  },
];

export const faqCategories = [...new Set(faqs.map((f) => f.category))];
