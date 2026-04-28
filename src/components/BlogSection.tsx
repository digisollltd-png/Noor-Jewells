
'use client'

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '../constants/blog';

export default function BlogSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="luxury-serif text-5xl md:text-6xl font-bold text-stone-950 mb-6"
            >
              The Royal <br/><span className="italic font-light text-stone-500">Chronicles</span>
            </motion.h2>
            <p className="text-stone-600 font-light text-lg italic">
              Delve into the stories, craft, and heritage of Indian artistry.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/blog"
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-stone-950 hover:text-[#B8860B] transition-colors"
            >
              Enter the Library <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BLOG_POSTS.slice(0, 3).map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/10] mb-8 overflow-hidden rounded-3xl bg-stone-50 border border-stone-100">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[#B8860B] text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm border border-[#B8860B]/10">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-6 text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="luxury-serif text-2xl font-bold text-stone-950 group-hover:text-[#B8860B] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-stone-600 text-sm font-light leading-relaxed line-clamp-2 italic">
                    {post.excerpt}
                  </p>
                  <div className="pt-4">
                    <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#B8860B]">
                      Read Story <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
