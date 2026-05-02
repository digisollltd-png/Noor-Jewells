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
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Fixed Header with Close Button */}
        <div className="absolute top-4 right-4 z-[60]">
          <button 
            onClick={onClose}
            className="p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-950 hover:bg-stone-100 transition-all shadow-md active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TOP: Fixed Product Image */}
        <div className="flex-shrink-0 bg-stone-50 relative aspect-square w-full">
          <Image 
            src={activeImage} 
            alt={product.name} 
            fill
            className="object-contain p-8"
            referrerPolicy="no-referrer"
            priority
          />
          
          {/* Minimal Gallery Thumbnails */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {gallery.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-stone-900 scale-110' : 'border-white/50 opacity-70'}`}
              >
                <Image src={img} fill className="object-cover" alt="thumb" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* MIDDLE: Scrollable Details */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              {product.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              {product.name}
            </h2>
            <p className="text-2xl font-semibold text-stone-900 italic">
              ৳{product.price.toLocaleString()}
            </p>
          </div>

          <div className="prose prose-stone">
            <p className="text-stone-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 text-stone-500 text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Authentic Quality Guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-stone-500 text-xs">
              <Truck className="w-4 h-4" />
              <span>Standard Delivery within 3-5 days</span>
            </div>
          </div>
        </div>

        {/* BOTTOM: Fixed Add to Cart Button */}
        <div className="flex-shrink-0 p-4 sm:p-6 bg-white border-t border-stone-100">
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full py-4 bg-stone-950 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
