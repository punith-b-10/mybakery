/**
 * ============================================================
 * PRODUCTS.JS — Menu Management System
 * ============================================================
 * This is the ONLY file you need to edit to manage your menu.
 *
 * HOW TO USE:
 * - Set available: false  → product disappears from site
 * - Set available: true   → product shows on site
 * - Set bestSeller: true  → appears in Best Sellers section
 * - Add a new product object → auto-appears everywhere
 * - Change price/desc/image → updates instantly everywhere
 *
 * IMAGE TIPS:
 * - Use your own photos: put them in /images/ folder
 * - Or use Unsplash URLs (free, no account needed)
 * ============================================================
 */

const PRODUCTS = [
  {
    id: "tiramisu-classic",
    name: "Classic Tiramisu",
    category: "tiramisu",
    description: "Layers of espresso-soaked ladyfingers, silky mascarpone cream, and a dusting of premium cocoa. Our most beloved creation — made fresh only after your order.",
    shortDesc: "Espresso · Mascarpone · Cocoa",
    price: 349,
    priceUnit: "per serving",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
    bestSeller: true,
    available: true,
    newArrival: false,
    tags: ["italian", "coffee", "no-bake", "bestseller"],
    whatsappMessage: "Hi! I would like to order Classic Tiramisu. Could you please share more details about pricing and availability?",
    badge: "Most Loved"
  },
  {
    id: "tiramisu-rose",
    name: "Rose & Raspberry Tiramisu",
    category: "tiramisu",
    description: "A romantic twist on the classic — rose-infused cream with a tart raspberry compote between each layer. Perfect for anniversaries and gifting.",
    shortDesc: "Rose · Raspberry · Mascarpone",
    price: 399,
    priceUnit: "per serving",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80",
    bestSeller: false,
    available: true,
    newArrival: true,
    tags: ["rose", "berry", "gifting", "new"],
    whatsappMessage: "Hi! I would like to order Rose & Raspberry Tiramisu. Could you please share more details?",
    badge: "New"
  },
  {
    id: "bomboloni-nutella",
    name: "Nutella Bomboloni",
    category: "bomboloni",
    description: "Pillowy Italian-style doughnuts, fried golden and filled to the brim with velvety Nutella, then dusted with vanilla sugar. Warm, indulgent, irresistible.",
    shortDesc: "Nutella · Vanilla Sugar · Fluffy",
    price: 79,
    priceUnit: "per piece",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
    bestSeller: true,
    available: true,
    newArrival: false,
    tags: ["fried", "nutella", "italian", "bestseller"],
    whatsappMessage: "Hi! I would like to order Nutella Bomboloni. Could you please share more details?",
    badge: "Fan Favourite"
  },
  {
    id: "bomboloni-custard",
    name: "Vanilla Custard Bomboloni",
    category: "bomboloni",
    description: "Soft, cloud-like doughnuts generously filled with house-made vanilla bean custard. A classic comfort, elevated.",
    shortDesc: "Vanilla Bean · Custard · Pillowy",
    price: 69,
    priceUnit: "per piece",
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=600&q=80",
    bestSeller: false,
    available: true,
    newArrival: false,
    tags: ["custard", "vanilla", "classic"],
    whatsappMessage: "Hi! I would like to order Vanilla Custard Bomboloni. Could you please share more details?",
    badge: null
  },
  {
    id: "cheesecake-new-york",
    name: "New York Baked Cheesecake",
    category: "cheesecake",
    description: "Dense, creamy, and perfectly balanced — our signature baked cheesecake on a buttery graham cracker crust. The gold standard, made with full-fat cream cheese.",
    shortDesc: "Cream Cheese · Graham Crust · Baked",
    price: 449,
    priceUnit: "per serving",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80",
    bestSeller: true,
    available: true,
    newArrival: false,
    tags: ["baked", "classic", "cream-cheese", "bestseller"],
    whatsappMessage: "Hi! I would like to order New York Baked Cheesecake. Could you please share more details?",
    badge: "Signature"
  },
  {
    id: "cheesecake-strawberry",
    name: "Strawberry Swirl Cheesecake",
    category: "cheesecake",
    description: "Velvety no-bake cheesecake swirled with fresh strawberry coulis. Chilled to perfection, bright, refreshing, and absolutely stunning to look at.",
    shortDesc: "Strawberry · No-Bake · Fresh",
    price: 479,
    priceUnit: "per serving",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
    bestSeller: false,
    available: true,
    newArrival: true,
    tags: ["strawberry", "no-bake", "fruity", "new"],
    whatsappMessage: "Hi! I would like to order Strawberry Swirl Cheesecake. Could you please share more details?",
    badge: "New"
  },
  {
    id: "cookies-double-choco",
    name: "Double Chocolate Cookies",
    category: "cookies",
    description: "Thick, fudgy, bakery-style cookies loaded with two kinds of chocolate chips. Crisp on the edges, gooey in the centre — the way a perfect cookie should be.",
    shortDesc: "Dark & Milk Chocolate · Chewy",
    price: 59,
    priceUnit: "per piece",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80",
    bestSeller: true,
    available: true,
    newArrival: false,
    tags: ["chocolate", "chewy", "bestseller"],
    whatsappMessage: "Hi! I would like to order Double Chocolate Cookies. Could you please share more details?",
    badge: "Most Loved"
  },
  {
    id: "cookies-brown-butter",
    name: "Brown Butter Salted Caramel",
    category: "cookies",
    description: "Nutty browned butter cookies with ribbons of house-made salted caramel throughout. Finished with a pinch of Maldon sea salt — complex, sophisticated, addictive.",
    shortDesc: "Brown Butter · Caramel · Sea Salt",
    price: 69,
    priceUnit: "per piece",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80",
    bestSeller: false,
    available: true,
    newArrival: true,
    tags: ["caramel", "salted", "gourmet", "new"],
    whatsappMessage: "Hi! I would like to order Brown Butter Salted Caramel Cookies. Could you please share more details?",
    badge: "Chef's Special"
  },
  {
    id: "brownies-fudge",
    name: "Fudge Brownies",
    category: "brownies",
    description: "Ultra-rich, dense fudge brownies made with premium dark chocolate. No cakey texture here — just pure, glossy, intensely chocolatey squares of joy.",
    shortDesc: "Dark Chocolate · Dense · Fudgy",
    price: 89,
    priceUnit: "per piece",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80",
    bestSeller: true,
    available: true,
    newArrival: false,
    tags: ["chocolate", "fudge", "bestseller"],
    whatsappMessage: "Hi! I would like to order Fudge Brownies. Could you please share more details?",
    badge: "Bestseller"
  },
  {
    id: "brownies-walnut",
    name: "Walnut Espresso Brownies",
    category: "brownies",
    description: "Fudgy brownies spiked with a shot of espresso and studded with toasted walnuts. The coffee intensifies the chocolate for a deeply grown-up flavour.",
    shortDesc: "Espresso · Walnut · Intense",
    price: 99,
    priceUnit: "per piece",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=80",
    bestSeller: false,
    available: true,
    newArrival: false,
    tags: ["espresso", "walnut", "gourmet"],
    whatsappMessage: "Hi! I would like to order Walnut Espresso Brownies. Could you please share more details?",
    badge: null
  },
  {
    id: "peanut-butter-classic",
    name: "Classic Homemade Peanut Butter",
    category: "peanut-butter",
    description: "Stone-ground roasted peanuts, a pinch of salt, a touch of honey — and nothing else. No palm oil, no stabilisers, no compromise. Just pure, nutty perfection.",
    shortDesc: "Stone-Ground · Honey · All Natural",
    price: 299,
    priceUnit: "per 250g jar",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&q=80",
    bestSeller: false,
    available: true,
    newArrival: false,
    tags: ["natural", "no-preservatives", "gifting"],
    whatsappMessage: "Hi! I would like to order Classic Homemade Peanut Butter. Could you please share more details?",
    badge: null
  },
  {
    id: "peanut-butter-choco",
    name: "Chocolate Swirl Peanut Butter",
    category: "peanut-butter",
    description: "Our classic peanut butter swirled with rich Belgian dark chocolate. The ultimate spread — on toast, with fruit, or straight from the jar at midnight.",
    shortDesc: "Belgian Chocolate · Swirled · Indulgent",
    price: 349,
    priceUnit: "per 250g jar",
    image: "https://images.unsplash.com/photo-1559181567-c3190bfa4945?w=600&q=80",
    bestSeller: true,
    available: true,
    newArrival: false,
    tags: ["chocolate", "peanut", "gifting", "bestseller"],
    whatsappMessage: "Hi! I would like to order Chocolate Swirl Peanut Butter. Could you please share more details?",
    badge: "Fan Favourite"
  },
  {
    id: "chocolates-assorted",
    name: "Artisan Chocolate Box",
    category: "chocolates",
    description: "A curated collection of handcrafted chocolates — ganaches, pralines, and truffles — made with single-origin chocolate. Each piece is a small, perfect world.",
    shortDesc: "Ganache · Pralines · Truffles",
    price: 599,
    priceUnit: "per box of 9",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80",
    bestSeller: true,
    available: true,
    newArrival: false,
    tags: ["gifting", "premium", "artisan", "bestseller"],
    whatsappMessage: "Hi! I would like to order an Artisan Chocolate Box. Could you please share more details about customization options?",
    badge: "Gift Worthy"
  },
  {
    id: "chocolates-custom",
    name: "Custom Name Chocolates",
    category: "chocolates",
    description: "Bespoke chocolates personalised with names, messages, or designs — perfect for weddings, corporate gifting, and celebrations. Minimum order applies.",
    shortDesc: "Personalised · Handcrafted · Premium",
    price: 799,
    priceUnit: "per box (custom)",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80",
    bestSeller: false,
    available: true,
    newArrival: true,
    tags: ["custom", "wedding", "corporate", "gifting", "new"],
    whatsappMessage: "Hi! I'm interested in Custom Name Chocolates. Could you please share more details about customization, minimum order, and pricing?",
    badge: "Personalised"
  }
];

// ============================================================
// CATEGORY DEFINITIONS
// Add new categories here if needed
// ============================================================
const CATEGORIES = [
  { id: "all", label: "All", icon: "✦" },
  { id: "tiramisu", label: "Tiramisu", icon: "☕" },
  { id: "bomboloni", label: "Bomboloni", icon: "🍩" },
  { id: "cheesecake", label: "Cheesecake", icon: "🍰" },
  { id: "cookies", label: "Cookies", icon: "🍪" },
  { id: "brownies", label: "Brownies", icon: "🍫" },
  { id: "peanut-butter", label: "Peanut Butter", icon: "🥜" },
  { id: "chocolates", label: "Chocolates", icon: "🎁" }
];

// ============================================================
// BRAND CONFIG
// Edit business details here
// ============================================================
const BRAND = {
  name: "Two Brothers Home Bakery",
  tagline: "Handcrafted with love, baked fresh for your home and celebrations.",
  whatsapp: "917019051231",
  instagram: "@twobrothershomebakery",
  email: "hello@twobrothershomebakery.com",
  hours: "Orders accepted: Mon–Sat, 9AM–7PM",
  location: "Bangalore, Karnataka",
  defaultWhatsappMessage: "Hi! I'd love to place an order. Could you please share your menu and availability?"
};
