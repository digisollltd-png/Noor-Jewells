
import { Product, Coupon } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Heritage Kundan Bridal Set",
    description: "A majestic hand-crafted Kundan necklace set with semi-precious emerald drops and matching jhumkas. The pinnacle of royal elegance.",
    price: 12500,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2070&auto=format&fit=crop",
    category: "Necklaces"
  },
  {
    id: 2,
    name: "Antique Temple Motif Earrings",
    description: "22k Gold plated earrings featuring intricate temple architecture motifs and ruby-pink stone accents. Traditionally divine.",
    price: 1850,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=2070&auto=format&fit=crop",
    category: "Earrings"
  },
  {
    id: 3,
    name: "Zirconia Statement Matha Patti",
    description: "Exquisite bridal headgear adorned with high-grade AAA zirconia and delicate pearl hangings for a royal silhouette.",
    price: 3800,
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=2070&auto=format&fit=crop",
    category: "Headwear"
  },
  {
    id: 4,
    name: "Matte Finish Polki Chur Bangles",
    description: "Elegant pair of broad bangles with a matte-gold finish and uncut stone setting. A fusion of vintage and modern aesthetics.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
    category: "Bangles"
  },
  {
    id: 5,
    name: "Hand-Painted Meenakari Jhumkas",
    description: "Vibrant blue and gold Meenakari art combined with traditional Jhumka design and fresh water pearls.",
    price: 2200,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop",
    category: "Earrings"
  },
  {
    id: 6,
    name: "Pearl Infused Rani Haar",
    description: "A long, multi-layered pearl necklace featuring a large kundan pendant. Inspired by the jewels of the Mughal courts.",
    price: 8500,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    category: "Necklaces"
  },
  {
    id: 7,
    name: "Gilded Floral Eternity Ring",
    description: "Intricately carved floral patterns in high-quality alloy, finished with micron gold plating and centered stone.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
    category: "Rings"
  },
  {
    id: 8,
    name: "Navratna Multistone Choker",
    description: "Classic choker featuring the nine sacred gemstones, representing celestial grace and timeless heritage.",
    price: 9500,
    image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=2070&auto=format&fit=crop",
    category: "Necklaces"
  },
  {
    id: 9,
    name: "Royal Peacock Kada",
    description: "Statement cuff bangle with enamel work peacock motifs and sparkling zircon eyes. A masterpiece of craftsmanship.",
    price: 4200,
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?q=80&w=2070&auto=format&fit=crop",
    category: "Bangles"
  },
  {
    id: 10,
    name: "Ethereal Pearl Nose Nath",
    description: "A delicate clip-on nose pin featuring a single pristine pearl and tiny gold-plated petals. Minimalist luxury.",
    price: 850,
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=2070&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: 11,
    name: "Royal Heritage Anklets (Payal)",
    description: "Traditional silver-plated anklets with rhythmic ghungroo bells and delicate floral engravings. Pure auditory and visual grace.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=2070&auto=format&fit=crop",
    category: "Anklets"
  },
  {
    id: 12,
    name: "Golden Filigree Finger Ring",
    description: "A statement ring with intricate gold filigree work and a central emerald-cut ruby stone. Adjustable for any finger.",
    price: 1550,
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop",
    category: "Rings"
  }
];

export const MOCK_COUPONS: Coupon[] = [
  { code: 'NOORE10', discount_type: 'percentage', value: 10, min_spend: 2000 },
  { code: 'ROYAL25', discount_type: 'fixed', value: 500, min_spend: 5000 },
];
