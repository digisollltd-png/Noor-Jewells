
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Star, 
  Gem, 
  Sparkles, 
  ChevronRight,
  Info,
  Calendar
} from 'lucide-react';
import Image from 'next/image';
import { PRODUCTS } from '../../../constants';
import { useShop } from '../../../context/ShopContext';
import ScrollToTop from '../../../components/ScrollToTop';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useShop();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const product = useMemo(() => {
    return PRODUCTS.find(p => p.id === Number(params.id));
  }, [params.id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFEFB]">
        <div className="text-center">
          <h1 className="luxury-serif text-4xl mb-6">Product Not Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="text-[#B8860B] font-bold uppercase tracking-widest border-b border-[#B8860B] pb-1"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: product.category, href: '/' },
    { name: product.name }
  ];

  return (
    <div className="min-h-screen bg-[#FFFEFB] pt-24">
      <ScrollToTop />
      
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-6 py-8">
        <ol className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">
          {breadcrumbs.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              {item.href ? (
                <button onClick={() => router.push(item.href!)} className="hover:text-[#B8860B] transition-colors">
                  {item.name}
                </button>
              ) : (
                <span className="text-stone-900">{item.name}</span>
              )}
              {idx < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3" />}
            </li>
          ))}
        </ol>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          
          {/* Gallery Section - Sticky on Desktop */}
          <div className="lg:sticky lg:top-32 h-fit space-y-8">
            <div 
              className="relative aspect-[4/5] bg-stone-50 rounded-[3rem] overflow-hidden cursor-zoom-in shadow-sm border border-stone-100 group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
            >
              <motion.div
                className="w-full h-full relative"
                animate={{
                  scale: isZooming ? 2 : 1,
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                }}
                transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.5 }}
              >
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  className="object-contain p-8 sm:p-12"
                  priority
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              {/* Minimal Zoom Indicator */}
              <div className={`absolute bottom-8 right-8 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}>
                Hover to focus
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-[#B8860B]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-stone-900 text-sm font-bold">4.9 / 5.0</span>
                </div>
              </div>

              <h1 className="luxury-serif text-5xl md:text-6xl font-bold text-stone-950 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-6 pb-6 border-b border-stone-100">
                <p className="luxury-serif text-5xl font-bold text-stone-950">
                  ৳{product.price.toLocaleString()}
                </p>
                <div className="flex flex-col">
                  <span className="text-stone-300 line-through text-xl font-light">৳{(product.price * 1.5).toLocaleString()}</span>
                  <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Saved ৳{(product.price * 0.5).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-[2rem] border border-stone-100">
                <Info className="w-5 h-5 text-[#B8860B] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Description</h4>
                  <p className="text-stone-600 font-light leading-relaxed">
                    &ldquo;{product.description}&rdquo;
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center group-hover:border-[#B8860B] transition-colors">
                    <ShieldCheck className="w-5 h-5 text-[#B8860B]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">Warranty</span>
                    <span className="text-xs font-bold text-stone-950">Plating Warranty</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center group-hover:border-[#B8860B] transition-colors">
                    <Truck className="w-5 h-5 text-[#B8860B]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">Shipping</span>
                    <span className="text-xs font-bold text-stone-950">Nationwide Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attributes Grid */}
            <div className="space-y-4 mb-12">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-6">Specifications</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Base Metal", val: "High Grade Brass Alloy" },
                  { label: "Stone Type", val: "AAA Zircon / Polki" },
                  { label: "Standard", val: "22k Gold Micron Plating" },
                  { label: "Finish", val: "Hand-Painted Meenakari" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 px-6 bg-stone-50/50 border border-stone-100 rounded-2xl">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{item.label}</span>
                    <span className="text-[11px] font-bold text-stone-950">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Estimator */}
             <div className="mb-12 p-6 border border-stone-100 rounded-[2rem] bg-stone-50/30">
                <div className="flex items-center gap-4 mb-4">
                   <Calendar className="w-5 h-5 text-[#B8860B]" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Delivery Estimates</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                   <span className="text-stone-500 font-medium">Dhaka Region:</span>
                   <span className="text-stone-950">24-48 Hours</span>
                </div>
                <div className="flex justify-between text-xs font-bold mt-2">
                   <span className="text-stone-500 font-medium">Outside Dhaka:</span>
                   <span className="text-stone-950">3-5 Working Days</span>
                </div>
             </div>

            {/* Actions */}
            <div className="flex gap-4 mt-auto">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 py-6 bg-stone-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#B8860B] transition-all flex items-center justify-center gap-4 group active:scale-[0.98] shadow-2xl shadow-stone-950/10"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" /> Add to Bag
              </button>
            </div>

            {/* Heritage Story Section */}
            <div className="mt-16 pt-16 border-t border-stone-100">
               <h3 className="luxury-serif text-3xl font-bold mb-8">Product Details</h3>
               <div className="space-y-6 text-stone-600 font-light leading-relaxed">
                  <p>
                    Every piece in the Nooré collection is born from a legacy that spans over three decades. This {product.name} is not merely an accessory; it is a meticulously crafted artifact that whispers stories of royal Indian courts and Mughal grandeur.
                  </p>
                  <p>
                    Our artisans, many of whom are 4th generation goldsmiths, use traditional techniques combined with modern precision to ensure that each micron of gold and every stone setting meets the highest degree of excellence.
                  </p>
                  <div className="flex items-center gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                    <Sparkles className="w-5 h-5 text-[#B8860B]" />
                    <p className="text-[10px] font-bold uppercase tracking-widest leading-loose">
                      Hand-finished in our artisan workshop. Each piece is unique and carries its own character.
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Similar Items or Story Section? */}
        <section className="mt-40">
           <div className="text-center mb-16">
              <h2 className="luxury-serif text-4xl font-bold mb-4 text-stone-950">You May Also Like</h2>
              <p className="text-stone-500 font-light text-lg">Explore more pieces in this category</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map((p) => (
                <motion.div 
                  key={p.id}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/products/${p.id}`)}
                >
                  <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-stone-50 border border-stone-100 group-hover:shadow-xl transition-all">
                    <Image src={p.image} fill className="object-cover" alt={p.name} referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="luxury-serif text-xl text-stone-950 group-hover:text-[#B8860B] transition-colors">{p.name}</h3>
                  <p className="text-[#B8860B] font-bold text-sm mt-1">৳{p.price.toLocaleString()}</p>
                </motion.div>
              ))}
           </div>
        </section>
      </main>
    </div>
  );
}
