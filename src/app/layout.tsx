
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  weight: ['400', '700'] 
});

export const metadata: Metadata = {
  title: {
    default: "Nooré Jewells | Exquisite Royal Imitation Jewelry",
    template: "%s | Nooré Jewells"
  },
  description: "Discover timeless elegance with Nooré Jewells. We specialize in premium women's imitation jewelry, Kundan sets, Polki heritage pieces, and contemporary bridal collections inspired by royal Indian craftsmanship.",
  keywords: ["Imitation Jewelry", "Kundan Jewelry", "Bridal Jewelry", "Polki Jewelry", "Indian Heritage Jewelry", "Nooré", "Luxury Fashion Accessories"],
  authors: [{ name: "Nooré Jewells Team" }],
  creator: "Nooré Jewells",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://noorejewells.com",
    title: "Nooré Jewells | Exquisite Royal Imitation Jewelry",
    description: "Premium handcrafted imitation jewelry for the modern queen. Heritage craftsmanship meets contemporary elegance.",
    siteName: "Nooré Jewells",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nooré Jewells | Exquisite Royal Imitation Jewelry",
    description: "Experience the allure of royal Indian craftsmanship. Shop our exclusive curation of necklaces, earrings, and bridal sets.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased selection:bg-[#B8860B] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
