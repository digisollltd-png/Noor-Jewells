
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, CartItem, Coupon } from '../types';
import ProductList from '../components/ProductList';
import ScrollToTop from '../components/ScrollToTop';
import { PRODUCTS } from '../constants';

import { useShop } from '../context/ShopContext';

export default function Home() {
  const { 
    addToCart, 
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [activeCategory, setActiveCategory] = useState('All');
  const [heroIndex, setHeroIndex] = useState(0);
  
  const heroProducts = useMemo(() => PRODUCTS.slice(0, 4), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    result.sort((a, b) => b.id - a.id);

    return result;
  }, [activeCategory, searchQuery]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))], []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-[#FFFEFB]">
      <main className="pb-24">
        {/* Simplified Product Focus Hero */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative h-[90vh] overflow-hidden bg-white"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={heroProducts[heroIndex].image} 
                fill
                className="object-cover"
                alt="Product Showcase"
                referrerPolicy="no-referrer"
                priority
              />
              {/* Subtle Overlay to ensure visibility if needed, but keeping it minimal */}
              <div className="absolute inset-0 bg-stone-900/5" />
            </motion.div>
          </AnimatePresence>

          {/* Minimal Navigation Overlay */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
            {heroProducts.map((_, i) => (
              <button 
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${heroIndex === i ? 'bg-stone-950 scale-125' : 'bg-stone-300 hover:bg-stone-400'}`}
              />
            ))}
          </div>

          <div className="absolute bottom-12 right-12 z-30">
             <button 
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                className="p-6 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all group"
             >
                <ArrowRight className="w-6 h-6 text-stone-900 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </motion.section>

        {/* Simplified Product Catalog */}
        <div id="catalog" className="max-w-[1440px] mx-auto px-4 sm:px-6 py-24 scroll-mt-24">
          <div className="flex flex-wrap justify-center gap-4 mb-20">
             {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                    activeCategory === cat 
                      ? 'bg-stone-950 text-white border-stone-950 shadow-md' 
                      : 'bg-white text-stone-400 border-stone-100 hover:border-stone-950 hover:text-stone-950'
                  }`}
                >
                  {cat}
                </button>
              ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <h3 className="text-xl text-stone-400 font-light">No products found</h3>
            </div>
          ) : (
            <ProductList 
              products={filteredProducts} 
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      </main>

      <ScrollToTop />

      {/* Footer */}
      <footer className="bg-stone-50 py-24 border-t border-stone-100">
        <div className="max-w-[1440px] mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24">
          <div className="col-span-1 md:col-span-1">
            <h3 className="luxury-serif text-3xl font-bold text-[#B8860B] mb-8">Nooré</h3>
            <p className="text-stone-500 text-sm font-light leading-relaxed italic">
              Crafting timeless beauty for the modern queen. Rooted in heritage, designed for eternity.
            </p>
            <div className="flex gap-4 mt-8">
              <Link href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-[#B8860B] hover:border-[#B8860B] transition-all duration-300 group">
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-[#B8860B] hover:border-[#B8860B] transition-all duration-300 group">
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-[#B8860B] hover:border-[#B8860B] transition-all duration-300 group">
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div>
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-950 mb-8 italic">The Curation</h4>
             <ul className="space-y-4 text-sm font-medium text-stone-500">
               <li 
                 onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                 className="hover:text-[#B8860B] transition-colors cursor-pointer capitalize italic"
               >
                 New Arrivals
               </li>
               <li 
                 onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                 className="hover:text-[#B8860B] transition-colors cursor-pointer capitalize italic"
               >
                 Best Sellers
               </li>
               <li 
                 onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                 className="hover:text-[#B8860B] transition-colors cursor-pointer capitalize italic"
               >
                 Bridal Vault
               </li>
               <li className="hover:text-[#B8860B] transition-colors cursor-pointer italic">
                 <Link href="/blog">Chronicles (Blog)</Link>
               </li>
             </ul>
          </div>

          <div>
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-950 mb-8 italic">Assistance</h4>
             <ul className="space-y-4 text-sm font-medium text-stone-500">
               <li className="hover:text-[#B8860B] transition-colors cursor-pointer capitalize italic">Track Order</li>
               <li className="hover:text-[#B8860B] transition-colors cursor-pointer capitalize italic">Shipping Policy</li>
               <li className="hover:text-[#B8860B] transition-colors cursor-pointer capitalize">Returns Policy</li>
               <li className="hover:text-[#B8860B] transition-colors cursor-pointer capitalize italic">Jewelry Care</li>
             </ul>
          </div>

          <div>
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-950 mb-8">Contact</h4>
             <p className="text-stone-500 text-sm font-light leading-relaxed mb-2">Email: hello@noorejewells.com</p>
             <p className="text-stone-500 text-sm font-light leading-relaxed">WhatsApp: +880 1303 607085</p>
          </div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-12 pt-24 mt-24 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">© 2026 NOORÉ JEWELLS. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-12 text-[10px] font-bold text-stone-500 uppercase tracking-widest italic">
             <span className="hover:text-stone-950 cursor-pointer">Privacy Policy</span>
             <span className="hover:text-stone-950 cursor-pointer">Terms of Service</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
