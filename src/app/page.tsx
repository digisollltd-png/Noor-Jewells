
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Search, X, Sparkles, Gem, Star, ShieldCheck, SlidersHorizontal, ChevronDown } from 'lucide-react';
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
  const { 
    addToCart, 
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFEFB]">
      <main className="pt-24 pb-24">
        {/* Luxury Jewelry Hero */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 mb-8">
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative h-[70vh] md:h-[85vh] min-h-[500px] md:min-h-[700px] overflow-hidden rounded-2xl md:rounded-[4rem] bg-stone-950 shadow-2xl"
          >
            {/* Split Hero Layout with Slideshow */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={heroIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex flex-col md:flex-row"
              >
                <div className="w-full md:w-1/2 h-full relative overflow-hidden">
                  <Image 
                    src={heroProducts[heroIndex].image} 
                    fill
                    className="object-cover scale-105 animate-subtle-zoom opacity-60"
                    alt={heroProducts[heroIndex].name}
                    referrerPolicy="no-referrer"
                    priority
                  />
                </div>
                <div className="hidden md:block w-1/2 h-full relative overflow-hidden border-l border-white/5">
                  <Image 
                    src={heroProducts[(heroIndex + 1) % heroProducts.length].image} 
                    fill
                    className="object-cover scale-105 opacity-50 transition-all duration-1000"
                    alt="Jewelry Detail"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/60 to-transparent z-10" />

            <div className="relative z-20 h-full flex items-center px-6 md:px-24 xl:px-32">
              <div className="max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`hero-content-${heroIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      <span className="w-12 md:w-16 h-[2px] bg-[#B8860B]"></span>
                      <span className="text-[#B8860B] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-[9px] md:text-[10px] italic transition-all uppercase">ESTD 1992 | {heroProducts[heroIndex].category}</span>
                    </div>
                    
                    <h1 className="luxury-serif text-4xl md:text-8xl font-bold text-white mb-6 md:mb-10 tracking-tight leading-[1.1] md:leading-[0.95]">
                      {heroProducts[heroIndex].name.split(' ').slice(0, -1).join(' ')} <br/>
                      <span className="italic font-light text-stone-400">{heroProducts[heroIndex].name.split(' ').slice(-1)}</span>
                    </h1>

                    <p className="text-stone-300 md:text-stone-400 text-base md:text-xl mb-8 md:mb-14 font-light leading-relaxed max-w-sm md:max-w-lg italic">
                      {heroProducts[heroIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="flex flex-col sm:flex-row gap-4 md:gap-8"
                >
                  <button 
                    onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative px-8 md:px-12 py-4 md:py-5 bg-[#B8860B] text-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all hover:scale-105 hover:shadow-[0_20px_50px_rgba(184,134,11,0.3)] flex items-center justify-center gap-3 md:gap-4 overflow-hidden"
                  >
                    <span className="relative z-10">Discover Collection</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-white group-hover:translate-y-0 translate-y-full transition-transform duration-500 opacity-10" />
                  </button>
                  
                  <button className="px-8 md:px-12 py-4 md:py-5 border border-white/20 text-white rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white hover:text-stone-950 transition-all text-center">
                    Virtual Styling
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Floating Brand Elements */}
            <div className="absolute bottom-12 right-24 hidden xl:block z-20">
              <div className="flex items-center gap-8 text-white/40">
                <div className="flex flex-col items-center gap-3">
                  <Star className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Global Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Gem className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Handcrafted</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Anti-Tarnish</span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Product Catalog */}
        <div id="catalog" className="max-w-[1440px] mx-auto px-4 sm:px-6 mb-20 scroll-mt-32">
          <div className="flex flex-col mb-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
              <div className="max-w-xl">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="luxury-serif text-5xl md:text-6xl font-bold text-stone-950 mb-6"
                >
                  The Artisan&apos;s <br/><span className="italic font-light text-stone-500">Vault</span>
                </motion.h2>
                <p className="text-stone-600 font-light text-lg italic">Explore our meticulously curated selection of imitation jewelry, where every piece is a tribute to royal Indian heritage.</p>
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
                        <span className="text-sm font-bold text-[#B8860B]">${priceRange}</span>
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
                          <span>$0</span>
                          <span>Maximum: ${maxPriceLimit}</span>
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
              onProductClick={(p) => setSelectedProduct(p)}
            />
          )}

          {/* Featured Collections Teaser */}
          <section className="mt-48 grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "The Bridal Edit", img: "https://images.unsplash.com/photo-1598560943122-5873d9ed2c2d?q=80&w=2070&auto=format&fit=crop", dark: true },
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

        {/* Newsletter / Club */}
        <section className="max-w-4xl mx-auto px-6 py-40 text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="space-y-12"
           >
              <h2 className="luxury-serif text-5xl md:text-6xl font-bold text-stone-950 leading-tight">
                Join the <span className="text-[#B8860B] italic">Nooré Elite</span>
              </h2>
              <p className="text-stone-500 font-light text-xl max-w-xl mx-auto leading-relaxed italic">Receive invitations to private collection launches and heritage stories from our master artisans.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your Royal Address (Email)" 
                  className="flex-1 px-8 py-5 bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B8860B]/20 italic"
                />
                <button className="px-10 py-5 bg-stone-950 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#B8860B] transition-all shadow-xl">
                  Enlist Now
                </button>
              </div>
              <p className="text-[10px] font-bold text-stone-300 uppercase tracking-widest italic">Respecting your privacy with the utmost dignity</p>
           </motion.div>
        </section>
      </main>

      <BlogSection />
      <InstagramFeed />
      <ScrollToTop />

      {/* Footer */}
      <footer className="bg-stone-50 py-24 border-t border-stone-100">
        <div className="max-w-[1440px] mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24">
          <div className="col-span-1 md:col-span-1">
            <h3 className="luxury-serif text-3xl font-bold text-[#B8860B] mb-8">Nooré</h3>
            <p className="text-stone-500 text-sm font-light leading-relaxed italic">
              Crafting timeless beauty for the modern queen. Rooted in heritage, designed for eternity.
            </p>
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
               <li className="hover:text-[#B8860B] transition-colors cursor-pointer capitalize italic">Royal Returns</li>
               <li className="hover:text-[#B8860B] transition-colors cursor-pointer capitalize italic">Jewelry Care</li>
             </ul>
          </div>

          <div>
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-950 mb-8 italic">Contact</h4>
             <p className="text-stone-500 text-sm font-light leading-relaxed italic mb-2">Concierge: hello@noorejewells.com</p>
             <p className="text-stone-500 text-sm font-light leading-relaxed italic">WhatsApp: +91 999 000 1111</p>
          </div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-12 pt-24 mt-24 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest italic">© 2026 NOORÉ JEWELLS. ALL ROYAL RIGHTS RESERVED.</p>
           <div className="flex gap-12 text-[10px] font-bold text-stone-500 uppercase tracking-widest italic">
             <span className="hover:text-stone-950 cursor-pointer">Privacy Palace</span>
             <span className="hover:text-stone-950 cursor-pointer">Terms of Majesty</span>
           </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
