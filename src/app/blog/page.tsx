
'use client'

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import CartDrawer from '../../components/CartDrawer';
import { BLOG_POSTS } from '../../constants/blog';
import { Coupon } from '../../types';

export default function BlogPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFEFB]">
      <Navbar 
        cartCount={0} 
        onCartClick={() => setIsCartOpen(true)} 
        onSearchClick={() => {}} 
        isScrolled={true} 
      />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={[]} 
        onRemove={() => {}} 
        onUpdateQuantity={() => {}} 
        onClear={() => {}} 
        activeCoupon={activeCoupon}
        setActiveCoupon={setActiveCoupon}
      />

      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center gap-12"
          >
            <div className="max-w-2xl text-center md:text-left">
              <nav className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6 justify-center md:justify-start">
                <Link href="/" className="hover:text-stone-950 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-stone-950">Chronicles</span>
              </nav>
              <h1 className="luxury-serif text-6xl md:text-8xl font-bold text-stone-950 mb-8 leading-[0.9]">
                The Royal <br/><span className="italic font-light text-stone-500">Chronicles</span>
              </h1>
              <p className="text-stone-600 font-light text-xl italic max-w-lg">
                Discover the deep traditions, artisan secrets, and styling guides that define the Nooré aesthetic.
              </p>
            </div>

            <div className="w-full md:w-96">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-[#B8860B] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full pl-14 pr-6 py-6 bg-white border border-stone-100 rounded-3xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#B8860B]/10 transition-all shadow-sm italic"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Categories Bar */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max pb-4 border-b border-stone-100">
            {['All Stories', 'Heritage', 'Guides', 'Trends', 'Events'].map((cat, idx) => (
              <button 
                key={idx}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  idx === 0 ? 'bg-stone-950 text-white shadow-xl' : 'text-stone-400 hover:text-stone-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
            {filteredPosts.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-[2rem] bg-stone-50 border border-stone-100 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2.5s] ease-out opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-8 left-8">
                      <span className="px-5 py-2 bg-white/95 backdrop-blur-md text-[#B8860B] text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg border border-[#B8860B]/10">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-8 text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                      <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                    </div>
                    <h2 className="luxury-serif text-3xl font-bold text-stone-950 group-hover:text-[#B8860B] transition-colors leading-[1.1]">
                      {post.title}
                    </h2>
                    <p className="text-stone-600 text-base font-light font-serif leading-relaxed line-clamp-3 italic">
                      {post.excerpt}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#B8860B] border-b border-[#B8860B]/20 pb-1 group-hover:border-[#B8860B] transition-all">
                        Read Story <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="py-32 bg-stone-950 text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="luxury-serif text-5xl md:text-6xl font-bold mb-8 italic">Join the Inner Vault</h2>
            <p className="text-stone-400 text-lg font-light mb-12 italic">
              Subscribe to receive heritage stories, exclusive early access to new curations, and royal styling guides directly in your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your royal email" 
                className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#B8860B] transition-all text-sm font-medium italic"
              />
              <button className="px-12 py-5 bg-[#B8860B] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#8B6508] transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-stone-100 bg-[#FFFEFB]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest italic">© 2026 NOORÉ JEWELLS. STORIES OF ETERNITY.</p>
           <div className="flex gap-12 text-[10px] font-bold text-stone-500 uppercase tracking-widest italic">
             <Link href="/" className="hover:text-stone-950 transition-colors">Return to Boutique</Link>
             <span className="hover:text-stone-950 cursor-pointer">Instagram</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
