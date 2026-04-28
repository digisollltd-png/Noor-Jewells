
"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, ShieldCheck, Truck, Star, Ruler, Search, Sparkles, Gem, Eye } from 'lucide-react';
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
  const [activeImage, setActiveImage] = useState(product.image);
  const [showSpecs, setShowSpecs] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock alternate views
  const gallery = [
    product.image,
    "https://images.unsplash.com/photo-1611085583191-a3b1a308c1f1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop"
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    
    setCursorPos({ x, y });
    setMagnifierPos({ x: xPercent, y: yPercent });
  };

  const magnifierSize = 250;
  const zoomLevel = 2.5;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden">
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
        className="relative w-full max-w-7xl bg-[#FFFEFB] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[95vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-white/90 backdrop-blur-md rounded-full text-stone-950 hover:bg-[#B8860B] hover:text-white transition-all shadow-xl active:scale-90 border border-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Section */}
        <div className="lg:w-3/5 bg-stone-50 flex flex-col h-[500px] lg:h-auto">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            className="flex-1 relative overflow-hidden group"
          >
            <div className="w-full h-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image 
                    src={activeImage} 
                    alt={product.name} 
                    fill
                    className="object-cover select-none pointer-events-none opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {showMagnifier && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                  style={{
                    position: 'absolute',
                    left: cursorPos.x - magnifierSize / 2,
                    top: cursorPos.y - magnifierSize / 2,
                    width: magnifierSize,
                    height: magnifierSize,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    border: '3px solid #B8860B',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
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

            <div className="absolute top-6 left-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#B8860B]/20"
              >
                <div className="flex items-center gap-2 text-[#B8860B]">
                  <Search className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest italic">
                    Magnify Craftsmanship
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="p-6 bg-stone-100/50 border-t border-stone-200 flex justify-center gap-4">
            {gallery.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 relative ${activeImage === img ? 'border-[#B8860B] scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <Image src={img} fill className="object-cover" alt={`View ${i + 1}`} referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="relative lg:w-2/5 p-8 md:p-12 overflow-y-auto bg-white flex flex-col border-l border-stone-100">
          <AnimatePresence mode="wait">
            {!showSpecs ? (
              <motion.div 
                key="main-info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-stone-50 text-[#B8860B] text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-stone-100 italic">
                      {product.category}
                    </span>
                    <span className="text-emerald-600 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Available for Dispatch
                    </span>
                  </div>
                  <h2 className="luxury-serif text-3xl md:text-4xl font-bold text-stone-950 leading-tight">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-1 text-[#B8860B]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    <span className="text-stone-400 text-xs ml-2 font-medium tracking-wide">Elite Royal Curation</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-4">
                  <p className="luxury-serif text-4xl font-bold text-stone-950">
                    ${product.price.toFixed(2)}
                  </p>
                  <span className="text-stone-300 line-through text-lg font-light italic">${(product.price * 1.5).toFixed(0)}</span>
                </div>

                <div className="space-y-6 bg-stone-50/50 p-6 rounded-3xl border border-stone-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8860B]">The Nooré Standard</span>
                    <div className="flex items-center gap-1">
                      <Gem className="w-3 h-3 text-[#B8860B]" />
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest italic">Certified QC</span>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm font-light leading-relaxed italic">
                     &ldquo;Our pieces are meticulously crafted to mirror the depth of real gold and precious stones. Each jewel is a testament to timeless beauty.&rdquo;
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 italic">The Artisan&apos;s Note</h4>
                    <button 
                      onClick={() => setShowSpecs(true)}
                      className="text-[#B8860B] text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-2 bg-stone-50 px-3 py-1 rounded-full border border-stone-100"
                    >
                      <Eye className="w-3 h-3" /> Quick View Specs
                    </button>
                  </div>
                  <p className="text-stone-600 text-base font-light leading-relaxed">
                    {product.description}
                    <br/><br/>
                    Designed for durability and lasting shine. Skin-friendly alloys meet premium gold plating for an unmatched experience.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 py-8 border-y border-stone-100">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-stone-600">Anti-Tarnish</span>
                    </div>
                    <p className="text-[10px] text-stone-400 leading-relaxed italic">Advanced coating for lasting finish.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#B8860B]" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-stone-600">Royal Parcel</span>
                    </div>
                    <p className="text-[10px] text-stone-400 leading-relaxed italic">Gift-ready premium packaging.</p>
                  </div>
                </div>

                <div className="pt-4 pb-8 space-y-4">
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="group w-full py-5 bg-stone-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#B8860B] transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add to Your Collection
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-stone-300">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Heritage Piece No. {product.id}0{Math.floor(Math.random() * 100)}</span>
                    <Sparkles className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="specs-info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-12"
              >
                <div className="flex items-center justify-between">
                  <h3 className="luxury-serif text-3xl font-bold text-stone-950 italic">Quick View Specs</h3>
                  <button 
                    onClick={() => setShowSpecs(false)}
                    className="text-stone-400 hover:text-stone-950 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B8860B]">Material Composition</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Plating", val: "22k Micron Gold" },
                        { label: "Stone Type", val: "AAA Grade Zircon / Kundan" },
                        { label: "Base Metal", val: "High Grade Brass Alloy" },
                        { label: "Coating", val: "E-Ceramic Anti-Tarnish" }
                      ].map((spec, si) => (
                        <div key={si} className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">{spec.label}</p>
                          <p className="text-xs font-bold text-stone-950">{spec.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B8860B]">Dimensions & Weight</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 border-b border-stone-100">
                        <span className="text-sm font-medium text-stone-500">Gross Weight</span>
                        <span className="text-sm font-bold text-stone-950">42.5 Grams</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-stone-100">
                        <span className="text-sm font-medium text-stone-500">Adjustable Height</span>
                        <span className="text-sm font-bold text-stone-950">Yes (Dori included)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-[#B8860B]/5 rounded-3xl border border-[#B8860B]/10">
                    <div className="flex gap-4">
                      <ShieldCheck className="w-6 h-6 text-[#B8860B] flex-shrink-0" />
                      <div>
                        <h5 className="text-xs font-bold text-stone-950 mb-1 uppercase tracking-tight">Authenticity Card Included</h5>
                        <p className="text-[11px] text-stone-500 font-light leading-relaxed italic">
                          Every Nooré piece comes with a digital certificate of quality and a unique curation number.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowSpecs(false)}
                  className="w-full py-5 border-2 border-stone-950 text-stone-950 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-stone-50 transition-all active:scale-[0.98]"
                >
                  Return to Collection Details
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
