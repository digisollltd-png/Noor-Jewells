
import { Product, Coupon } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Royal Kundan Choker Set",
    description: "Exquisite hand-crafted Kundan choker set with emerald drops. Perfect for bridal and luxury festive wear.",
    price: 185.00,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2070&auto=format&fit=crop",
    category: "Necklaces"
  },
  {
    id: 2,
    name: "Antique Gold Temple Earrings",
    description: "Traditionally inspired temple jewelry earrings featuring intricate goddess motifs and ruby accents.",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=2070&auto=format&fit=crop",
    category: "Earrings"
  },
  {
    id: 3,
    name: "Emerald Empress Maang Tikka",
    description: "A statement maang tikka with deep emerald stones and pearl clusters. For the modern queen.",
    price: 90.00,
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=2070&auto=format&fit=crop",
    category: "Headwear"
  },
  {
    id: 4,
    name: "Dazzling Polki Heritage Bangle",
    description: "Classic Polki bangle with 22k gold plating finish. A timeless piece that bridges tradition and modernity.",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
    category: "Bangles"
  },
  {
    id: 5,
    name: "Victorian Silver Pearl Jhumkas",
    description: "Oxidized silver finish jhumkas adorned with freshwater pearls. Effortless vintage charm.",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop",
    category: "Earrings"
  },
  {
    id: 6,
    name: "Celestial Moonstone Pendant",
    description: "A ethereal moonstone set in a minimalist gold-plated frame. Capture the magic of the night sky.",
    price: 55.00,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    category: "Necklaces"
  },
  {
    id: 7,
    name: "Rose Gold Eternity Band",
    description: "Sparkling zircon stones set in a delicate rose gold eternity band. The ultimate symbol of grace.",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
    category: "Rings"
  },
  {
    id: 8,
    name: "Navratna Heritage Necklace",
    description: "Authentic-looking Navratna (nine-gem) necklace set. A vibrant celebration of heritage.",
    price: 210.00,
    image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=2070&auto=format&fit=crop",
    category: "Necklaces"
  }
];

export const MOCK_COUPONS: Coupon[] = [
  { code: 'NOORE10', discount_type: 'percentage', value: 10, min_spend: 50 },
  { code: 'ROYAL25', discount_type: 'fixed', value: 25, min_spend: 150 },
];
