
'use client'

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, Share2, ChevronRight, Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import CartDrawer from '../../../components/CartDrawer';
import { BLOG_POSTS } from '../../../constants/blog';
import { Coupon } from '../../../types';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFEFB]">
        <div className="text-center">
          <h1 className="luxury-serif text-4xl mb-6">Story Lost in Time</h1>
          <Link href="/blog" className="text-[#B8860B] font-bold uppercase tracking-widest text-[10px]">Return to Chronicles</Link>
        </div>
      </div>
    );
  }

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
        {/* Progress Bar (Visual Only) */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="fixed top-0 left-0 w-full h-1 bg-[#B8860B] origin-left z-50 pointer-events-none"
        />

        <article className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <motion.nav 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-10 justify-center"
            >
              <Link href="/" className="hover:text-stone-950 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-stone-950 transition-colors">Chronicles</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-stone-950 truncate max-w-[100px] md:max-w-none">{post.title}</span>
            </motion.nav>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="luxury-serif text-5xl md:text-7xl lg:text-8xl font-bold text-stone-950 mb-12 leading-[1.05]"
            >
              {post.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em]"
            >
              <span className="flex items-center gap-3"><User className="w-4 h-4 text-[#B8860B]" /> Written by {post.author}</span>
              <span className="flex items-center gap-3"><Calendar className="w-4 h-4 text-[#B8860B]" /> {post.date}</span>
              <span className="flex items-center gap-3"><Clock className="w-4 h-4 text-[#B8860B]" /> {post.readTime}</span>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="aspect-[21/9] w-full rounded-[3rem] overflow-hidden mb-24 shadow-2xl border border-stone-100"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </motion.div>

          {/* Content Layout */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-16">
              <div className="sticky top-40 space-y-16">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-950 mb-6 italic">The Author</h4>
                  <div className="flex items-center gap-4 p-6 bg-stone-50 rounded-[2rem] border border-stone-100">
                    <div className="w-12 h-12 rounded-full bg-stone-200 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-stone-950">{post.author}</p>
                      <p className="text-[10px] font-medium text-stone-400 italic">Curatorial Elite</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-950 mb-6 italic">Share Story</h4>
                  <div className="flex gap-4">
                    {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                      <button key={idx} className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-50 hover:bg-[#B8860B] hover:text-white transition-all border border-stone-100 group">
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                   <Link href="/blog" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#B8860B] border-b border-[#B8860B]/20 pb-2 hover:border-[#B8860B] transition-all">
                    <ArrowLeft className="w-4 h-4" /> Back to Chronicles
                   </Link>
                </div>
              </div>
            </aside>

            {/* Article Body */}
            <div className="lg:col-span-9">
              <div 
                className="prose prose-stone prose-lg max-w-none 
                  prose-headings:luxury-serif prose-headings:font-bold prose-headings:text-stone-950
                  prose-p:text-stone-700 prose-p:font-light prose-p:leading-relaxed prose-p:italic
                  prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
                  prose-neutral"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-20 pt-12 border-t border-stone-100">
                 <div className="flex gap-3">
                   {['Heritage', 'Gold', 'Culture', 'Craftsmanship'].map((tag, idx) => (
                     <span key={idx} className="px-6 py-2 bg-stone-50 text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 border border-stone-100 rounded-full italic">
                       #{tag}
                     </span>
                   ))}
                 </div>
              </div>

              {/* Related Posts Visual Hint */}
              <div className="mt-32 p-12 bg-stone-50 rounded-[3rem] border border-stone-100 text-center">
                 <h3 className="luxury-serif text-3xl font-bold text-stone-950 mb-6">Continue the Journey</h3>
                 <p className="text-stone-500 font-light text-sm italic mb-10 max-w-md mx-auto">Discover more untold stories from our heritage curation library.</p>
                 <Link href="/blog" className="px-12 py-5 bg-stone-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#B8860B] transition-all shadow-xl">
                   Explore Chronicles
                 </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer (Simplified) */}
      <footer className="py-24 bg-stone-50 border-t border-stone-100 mt-24">
         <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
            <div>
               <h4 className="luxury-serif text-4xl font-bold text-[#B8860B] mb-4">Nooré</h4>
               <p className="text-stone-400 text-xs font-light tracking-widest uppercase italic">The House of Eternal Elegance</p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 italic">
               <Link href="/" className="hover:text-stone-950 transition-colors">Boutique</Link>
               <Link href="/blog" className="hover:text-stone-950 transition-colors">Chronicles</Link>
               <Link href="#" className="hover:text-stone-950 transition-colors">Curation</Link>
               <Link href="#" className="hover:text-stone-950 transition-colors">Vault</Link>
            </div>
         </div>
      </footer>
    </div>
  );
}
