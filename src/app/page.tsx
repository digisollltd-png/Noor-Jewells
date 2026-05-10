
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowRight, Search, X, Sparkles, Gem, Star, ShieldCheck, SlidersHorizontal, ChevronDown, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, CartItem, Coupon } from '../types';
import ProductList from '../components/ProductList';
import ProductModal from '../components/ProductModal';
import InstagramFeed from '../components/InstagramFeed';
import BlogSection from '../components/BlogSection';
import ScrollToTop from '../components/ScrollToTop';
import { PRODUCTS } from '../constants';

import { useShop } from '../context/ShopContext';

export default function Home() {
  const router = useRouter();
  const { 
    addToCart, 
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [activeCategory, setActiveCategory] = useState('All');
  const [heroIndex, setHeroIndex] = useState(0);
  
  // New States for Filter/Sort
  const maxPriceLimit = useMemo(() => Math.ceil(Math.max(...PRODUCTS.map(p => p.price))), []);
  const [priceRange, setPriceRange] = useState(maxPriceLimit);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

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
      const matchesPrice = p.price <= priceRange;
      return matchesCategory && matchesSearch && matchesPrice;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, searchQuery, priceRange, sortBy]);

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

        {/* Product Catalog */}
        <div id="catalog" className="max-w-[1440px] mx-auto px-4 sm:px-6 py-32 mb-20 scroll-mt-32">
          <div className="flex flex-col mb-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
              <div className="max-w-xl">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="luxury-serif text-5xl md:text-6xl font-bold text-stone-950 mb-6"
                >
                  Our <span className="italic font-light text-stone-500">Collection</span>
                </motion.h2>
                <p className="text-stone-600 font-light text-lg">Explore our range of premium imitation jewelry, blending tradition with modern elegance.</p>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    showFilters ? 'bg-stone-950 text-white border-stone-950 shadow-xl' : 'bg-white text-stone-950 border-stone-200 hover:border-stone-950'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {showFilters ? 'Hide Filters' : 'Filter & Sort'}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100 shadow-inner">
                    {/* Category Selection */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 italic">By Collection</h4>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${
                              activeCategory === cat 
                                ? 'bg-[#B8860B] text-white shadow-lg' 
                                : 'bg-white text-stone-600 border border-stone-100 hover:border-[#B8860B]'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Slider */}
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 italic">Price Ceiling</h4>
                        <span className="text-sm font-bold text-[#B8860B]">৳{priceRange.toLocaleString()}</span>
                      </div>
                      <div className="relative pt-2">
                        <input 
                          type="range" 
                          min="0" 
                          max={maxPriceLimit} 
                          value={priceRange}
                          onChange={(e) => setPriceRange(Number(e.target.value))}
                          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#B8860B]"
                        />
                        <div className="flex justify-between mt-4 text-[9px] font-bold text-stone-400 uppercase tracking-tighter">
                          <span>৳0</span>
                          <span>Maximum: ৳{maxPriceLimit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sort By Dropdown */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 italic">Arrange By</h4>
                      <div className="relative group">
                        <select 
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full appearance-none bg-white border border-stone-100 rounded-xl px-6 py-4 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/20 cursor-pointer pr-12"
                        >
                          <option value="newest">Newest Arrivals</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="name">Alphabetical (A-Z)</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none group-hover:text-[#B8860B] transition-colors" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {!showFilters && (
              <div className="flex flex-wrap gap-3 mb-8">
                 {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
                        activeCategory === cat 
                          ? 'bg-stone-950 text-white shadow-md' 
                          : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <h3 className="luxury-serif text-3xl text-stone-400 mb-4 italic">No treasures matched your quest</h3>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); setPriceRange(maxPriceLimit); setSortBy('newest'); }}
                className="text-[#B8860B] font-bold uppercase tracking-widest border-b border-[#B8860B] pb-1"
              >
                Reset Selection
              </button>
            </div>
          ) : (
            <ProductList 
              products={filteredProducts} 
              onAddToCart={handleAddToCart}
            />
          )}

          {/* Featured Collections Teaser */}
          <section className="mt-48 grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "The Bridal Edit", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop", dark: true },
              { title: "Daily Radiance", img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop", dark: false }
            ].map((collection, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="relative h-[600px] rounded-[3rem] overflow-hidden group cursor-pointer"
              >
                <Image 
                  src={collection.img} 
                  fill
                  className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" 
                  alt={collection.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
                  <h3 className="luxury-serif text-5xl font-bold mb-6 italic">{collection.title}</h3>
                  <p className="text-white/80 max-w-xs mb-10 font-light text-lg">Curated stories told through silver, gold, and stone.</p>
                  <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] border-b border-white pb-2 hover:gap-6 transition-all">
                    Explore Stories <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </section>
        </div>

        <BlogSection />
        
        <InstagramFeed />

        {/* Newsletter Section */}
        <section className="max-w-4xl mx-auto px-6 py-40 text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="space-y-12"
           >
              <h2 className="luxury-serif text-5xl md:text-6xl font-bold text-stone-950 leading-tight">
                Stay <span className="text-[#B8860B] italic">Updated</span>
              </h2>
              <p className="text-stone-500 font-light text-xl max-w-xl mx-auto leading-relaxed">Subscribe to receive updates on our latest collections and exclusive offers.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="flex-1 px-8 py-5 bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B8860B]/20"
                />
                <button className="px-10 py-5 bg-stone-950 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#B8860B] transition-all shadow-xl">
                  Subscribe
                </button>
              </div>
           </motion.div>
        </section>
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
