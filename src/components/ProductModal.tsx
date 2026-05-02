"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, ShieldCheck, Truck } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [activeImage, setActiveImage] = useState(product.image);

  // Mock thumbnails
  const gallery = [
    product.image,
    "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop"
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[85vh] sm:h-auto sm:max-h-[90vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-[70] p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. TOP: Fixed Product Image Section */}
        <div className="flex-shrink-0 bg-stone-50 relative aspect-[4/3] w-full border-b border-stone-100">
          <Image 
            src={activeImage} 
            alt={product.name} 
            fill
            className="object-contain p-4"
            referrerPolicy="no-referrer"
            priority
          />
          
          {/* Minimal Thumbnails */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 px-2">
            {gallery.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === img ? 'border-primary scale-105' : 'border-white/50 opacity-60'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image src={img} fill className="object-cover" alt="thumb" referrerPolicy="no-referrer" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. MIDDLE: Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-white">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B]">
              {product.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
              {product.name}
            </h2>
            <div className="flex items-center gap-3 pt-1">
              <p className="text-xl font-bold text-stone-950">
                ৳{product.price.toLocaleString()}
              </p>
              <span className="text-stone-400 line-through text-sm font-light">
                ৳{(product.price * 1.5).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="prose prose-stone">
              <p className="text-stone-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-stone-500 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Authentic Quality</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500 text-[10px] font-bold uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM: Fixed Add to Cart Button */}
        <div className="flex-shrink-0 p-4 bg-white border-t border-stone-100">
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full py-4 bg-stone-950 text-white rounded-xl font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#B8860B] transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg shadow-black/10"
          >
            <Plus className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
