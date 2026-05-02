"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const INSTA_POSTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a308c1f1?q=80&w=2070&auto=format&fit=crop",
    likes: "1.2k",
    comments: "42"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop",
    likes: "850",
    comments: "18"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=2070&auto=format&fit=crop",
    likes: "2.4k",
    comments: "56"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2069&auto=format&fit=crop",
    likes: "1.1k",
    comments: "29"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    likes: "3.1k",
    comments: "88"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop",
    likes: "920",
    comments: "24"
  }
];

export default function InstagramFeed() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 py-16 border-t border-stone-100">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div className="max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-[#B8860B] mb-4"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Join the Nooré Circle</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="luxury-serif text-4xl md:text-5xl font-bold text-stone-950 leading-tight mb-6"
          >
            Worn by the <span className="italic font-light text-stone-500">Radiant</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-600 font-light text-lg italic"
          >
            Tag @NooréCuration to be featured in our heritage gallery.
          </motion.p>
        </div>
        
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group flex items-center gap-4 bg-stone-50 hover:bg-stone-950 hover:text-white px-8 py-4 rounded-2xl transition-all duration-500 border border-stone-200"
        >
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">Follow @noorejewelry</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {INSTA_POSTS.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
          >
            <Image 
              src={post.image} 
              alt={`Instagram post ${post.id}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white backdrop-blur-[2px]">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-white" />
                <span className="text-xs font-bold">{post.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 fill-white" />
                <span className="text-xs font-bold">{post.comments}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
