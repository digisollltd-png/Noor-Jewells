"use client";

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  // Prevent background scrolling
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        className="relative w-full max-w-md bg-white sm:rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] flex flex-col h-full sm:h-auto sm:max-h-[90vh] overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[210] p-2 bg-white/80 hover:bg-white text-black rounded-full shadow-lg transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. TOP: Fixed Product Image Section */}
        <div className="flex-shrink-0 bg-stone-50 relative aspect-square w-full">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill
            className="object-contain p-8"
            referrerPolicy="no-referrer"
            priority
          />
        </div>

        {/* 2. MIDDLE: Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              {product.name}
            </h2>
            <p className="text-2xl font-bold text-stone-900">
              ৳{product.price.toLocaleString()}
            </p>
            <div className="h-px bg-stone-100 w-full" />
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* 3. BOTTOM: Fixed Add to Cart Button */}
        <div className="flex-shrink-0 p-4 sm:p-6 bg-white border-t border-stone-100 mb-0">
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" /> Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
