"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, ShieldCheck, Truck, Star, Search, Sparkles, Gem, Heart } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isZoomLocked, setIsZoomLocked] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock alternate views for the gallery
  const gallery = [
    product.image,
    "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop"
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    if (x < 0 || x > width || y < 0 || y > height) {
      if (!isZoomLocked) setShowMagnifier(false);
      return;
    }

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    
    setCursorPos({ x, y });
    setMagnifierPos({ x: xPercent, y: yPercent });
  };

  const magnifierSize = 250;
  const zoomLevel = 2.5; 

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-6 lg:p-12 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-stone-950/90 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl bg-[#FFFEFB] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[95vh] md:max-h-[90vh]"
      >
        {/* Fixed Header with Close Button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60]">
          <button 
            onClick={onClose}
            className="p-3 bg-white/95 backdrop-blur-md rounded-full text-stone-950 hover:bg-[#B8860B] hover:text-white transition-all shadow-xl active:scale-90 border border-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area - Scrollable but contains fixed Top Image */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
          {/* Gallery / Image Section - Prominent at the top */}
          <div className="bg-stone-50 flex flex-col relative overflow-hidden aspect-square sm:aspect-[16/10] md:aspect-video lg:aspect-[16/10]">
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleMouseMove}
              onMouseEnter={() => setShowMagnifier(true)}
              onMouseLeave={() => !isZoomLocked && setShowMagnifier(false)}
              onClick={() => {
                setIsZoomLocked(!isZoomLocked);
                setShowMagnifier(!isZoomLocked);
              }}
              className="flex-1 relative overflow-hidden group bg-stone-50 cursor-crosshair transition-colors duration-500"
            >
              <div className="w-full h-full relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full relative p-6 sm:p-10"
                  >
                    <Image 
                      src={activeImage} 
                      alt={product.name} 
                      fill
                      className="object-contain select-none pointer-events-none transition-opacity duration-700"
                      referrerPolicy="no-referrer"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Magnifier - Desktop Only */}
              <AnimatePresence>
                {showMagnifier && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    className="hidden md:block"
                    style={{
                      position: 'absolute',
                      left: cursorPos.x - magnifierSize / 2,
                      top: cursorPos.y - magnifierSize / 2,
                      width: magnifierSize,
                      height: magnifierSize,
                      borderRadius: '50%',
                      pointerEvents: 'none',
                      border: '3px solid #B8860B',
                      boxShadow: '0 25px 80px -12px rgba(184,134,11,0.4), inset 0 0 60px rgba(255,255,255,0.6)',
                      backgroundColor: '#fff',
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: `${100 * zoomLevel}% ${100 * zoomLevel}%`,
                      backgroundPosition: `${magnifierPos.x}% ${magnifierPos.y}%`,
                      zIndex: 50
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Status Indicator */}
              <div className="absolute top-6 left-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-[#B8860B]/10"
                >
                  <div className="flex items-center gap-3 text-[#B8860B]">
                    <Search className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">
                      High Resolution View
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Gallery Thumbnails Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-2 bg-white/30 backdrop-blur-xl rounded-2xl border border-white/50 z-20">
              {gallery.map((img, i) => (
                <button 
                  key={i} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(img);
                  }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-500 relative flex-shrink-0 ${activeImage === img ? 'border-[#B8860B] scale-110 shadow-xl' : 'border-white/50 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-105'}`}
                >
                  <Image src={img} fill className="object-cover" alt={`View ${i + 1}`} referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section - Middle part, scrollable area continues */}
          <div className="p-8 sm:p-12 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-stone-50 text-[#B8860B] text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-stone-100 italic">
                    {product.category}
                  </span>
                  <span className="text-emerald-600 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Dispatch Ready
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#B8860B]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-stone-950 text-sm font-bold">4.9</span>
                  <span className="text-stone-400 text-[10px] font-medium tracking-wide">(Royal Elite)</span>
                </div>
              </div>

              <h2 className="luxury-serif text-3xl sm:text-5xl font-bold text-stone-950 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-4">
                <p className="luxury-serif text-4xl font-bold text-stone-950">
                  ৳{product.price.toLocaleString()}
                </p>
                <span className="text-stone-300 line-through text-lg font-light italic">৳{(product.price * 1.5).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-6 bg-stone-50/50 p-6 sm:p-8 rounded-[2rem] border border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8860B]">The Nooré Standard</span>
                <Gem className="w-4 h-4 text-[#B8860B]" />
              </div>
              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed italic">
                 &ldquo;{product.description}&rdquo;
              </p>
              <div className="pt-4 border-t border-stone-200/50 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-stone-500">22k Micron Gold Plated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-stone-500">Premium Packaging</span>
                </div>
              </div>
            </div>

            {/* Technical Detail Rows */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 italic mb-6">Physical Attributes</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Base Metal", val: "High Grade Brass Alloy" },
                  { label: "Stone Type", val: "Premium AAA Zircon" },
                  { label: "Standard", val: "Skin-Friendly / Lead Free" },
                  { label: "Durability", val: "E-Ceramic Coating" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 px-6 bg-white border border-stone-100 rounded-2xl">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{item.label}</span>
                    <span className="text-xs font-bold text-stone-950">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom CTA Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 bg-white/95 backdrop-blur-xl border-t border-stone-100 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
            <div className="hidden sm:flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Final Investment</span>
              <span className="text-2xl font-bold text-stone-950">৳{product.price.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={() => onAddToCart(product)}
              className="group flex-1 w-full py-6 bg-stone-950 text-white rounded-2xl sm:rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#B8860B] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add to Your Collection
            </button>
            
            <button className="sm:hidden text-stone-400 hover:text-rose-500 transition-colors flex items-center gap-2 bg-stone-50 px-6 py-4 rounded-2xl border border-stone-100">
               <Heart className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-3 text-stone-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] italic">Handcrafted for Modern Royalty</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
