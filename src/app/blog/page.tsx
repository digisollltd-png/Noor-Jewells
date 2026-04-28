'use client'

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollToTop from '../../components/ScrollToTop';
import { BLOG_POSTS } from '../../constants/blog';
import { useShop } from '../../context/ShopContext';

export default function BlogListingPage() {
  const { setShowSearch, setIsCartOpen } = useShop();

  return (
    <div className="bg-white min-h-screen">
      <ScrollToTop />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-stone-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="text-[#B8860B] font-bold uppercase tracking-[0.4em] text-[10px] italic">Nooré Editorial</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="luxury-serif text-6xl md:text-8xl font-bold text-stone-950 mb-8 tracking-tight"
          >
            The Royal <span className="italic font-light text-stone-400 text-5xl md:text-7xl">Digest</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-600 text-lg md:text-xl font-light italic max-w-2xl mx-auto leading-relaxed"
          >
            A collection of stories, styling guides, and explorations into the timeless heritage of Indian jewelry artistry.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Featured Post */}
          <div className="mb-24">
            <Link href={`/blog/${BLOG_POSTS[0].slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[16/10] md:aspect-square overflow-hidden rounded-[3rem] bg-stone-100 shadow-2xl"
              >
                <Image 
                  src={BLOG_POSTS[0].image} 
                  alt={BLOG_POSTS[0].title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
                  referrerPolicy="no-referrer"
                  priority
                />
                <div className="absolute top-8 left-8">
                  <span className="px-6 py-2 bg-stone-950/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    Featured Story
                  </span>
                </div>
              </motion.div>
              
              <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="space-y-8"
              >
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#B8860B] italic">
                  <span>{BLOG_POSTS[0].category}</span>
                  <span className="w-12 h-[1px] bg-stone-200"></span>
                  <span>{BLOG_POSTS[0].readTime}</span>
                </div>
                <h2 className="luxury-serif text-4xl md:text-6xl font-bold text-stone-950 group-hover:text-[#B8860B] transition-colors leading-tight">
                  {BLOG_POSTS[0].title}
                </h2>
                <p className="text-stone-600 text-xl font-light leading-relaxed italic">
                  {BLOG_POSTS[0].excerpt}
                </p>
                <div className="pt-4 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-stone-950 group-hover:gap-6 transition-all underline underline-offset-8">
                  Read Full Chronicle <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="w-full h-[1px] bg-stone-100 mb-24"></div>

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {BLOG_POSTS.slice(1).map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-3xl bg-stone-50 border border-stone-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-widest italic">{post.category}</span>
                    <h3 className="luxury-serif text-2xl font-bold text-stone-950 group-hover:text-[#B8860B] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-stone-600 text-sm font-light leading-relaxed line-clamp-2 italic">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-50 mt-4">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{post.date}</span>
                      <span className="group-hover:translate-x-2 transition-transform">
                        <ChevronRight className="w-4 h-4 text-[#B8860B]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-stone-950 text-white overflow-hidden relative">
         <div className="absolute -right-20 top-0 text-[20rem] font-black text-white/5 luxury-serif italic pointer-events-none">N</div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="luxury-serif text-4xl md:text-5xl font-bold mb-8">Join the inner <span className="italic font-light text-stone-500">Circle</span></h2>
            <p className="text-stone-400 text-lg font-light mb-12 italic max-w-xl mx-auto">
              Receive our monthly editorial digest, early access to collections, and invitations to private viewings.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
               <input 
                type="email" 
                placeholder="yours@luxury.com" 
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 transition-all font-light italic"
               />
               <button className="px-12 py-4 bg-[#B8860B] text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                 Subscribe
               </button>
            </form>
         </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="py-20 border-t border-stone-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="luxury-serif text-3xl font-black italic tracking-tighter">nooré</Link>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
            <Link href="/catalog" className="hover:text-stone-950 transition-colors">The Vault</Link>
            <Link href="/blog" className="hover:text-stone-950 transition-colors text-stone-950">Chronicles</Link>
            <Link href="/bespoke" className="hover:text-stone-950 transition-colors">Bespoke</Link>
            <Link href="/heritage" className="hover:text-stone-950 transition-colors">Our Legacy</Link>
          </div>
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest italic tracking-tighter">
            © 2026 NOORÉ ROYAL CURATIONS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
