
"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onProductClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 sm:gap-x-8 gap-y-8 sm:gap-y-16">
      {products.map((product, idx) => (
        <motion.div 
          key={product.id} 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: idx * 0.1 }}
          className="group relative flex flex-col"
        >
          {/* Image Container */}
          <div 
            className="relative aspect-[3/4] mb-3 sm:mb-6 overflow-hidden rounded-2xl sm:rounded-3xl bg-stone-50 cursor-pointer shadow-sm border border-stone-100 ring-1 ring-stone-950/5 group-hover:shadow-2xl group-hover:shadow-[#B8860B]/10 group-hover:border-[#B8860B]/20 transition-all duration-700"
          >
            <motion.img 
              onClick={() => onProductClick(product)}
              src={product.image} 
              alt={product.name} 
              whileHover={{ scale: 1.1, y: -10 }}
              transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
            />
            
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-700 pointer-events-none" />
            
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-2">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/90 backdrop-blur-md text-[#B8860B] text-[7px] sm:text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm border border-[#B8860B]/10">
                {product.category}
              </span>
            </div>

            <button 
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2.5 bg-white/80 backdrop-blur-md rounded-full text-stone-500 hover:text-rose-500 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 duration-500 active:scale-95"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>

            {/* Quick Actions at Bottom of Image */}
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out">
              <button 
                onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                className="w-8 h-8 sm:w-12 sm:h-12 bg-white flex items-center justify-center rounded-xl sm:rounded-2xl text-stone-950 shadow-xl border border-stone-100 hover:bg-[#B8860B] hover:text-white hover:border-[#B8860B] transition-all duration-300 active:scale-90"
                title="Quick View"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                className="w-8 h-8 sm:w-12 sm:h-12 bg-stone-950 flex items-center justify-center rounded-xl sm:rounded-2xl text-white shadow-xl border border-stone-900 hover:bg-[#B8860B] hover:border-[#B8860B] transition-all duration-300 active:scale-90"
                title="Add to Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
          
          {/* Product Details */}
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-0.5 sm:gap-1 px-1 sm:px-2"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
              <h3 
                onClick={() => onProductClick(product)}
                className="luxury-serif text-[13px] sm:text-xl font-bold text-stone-950 group-hover:text-[#B8860B] transition-colors cursor-pointer leading-tight sm:leading-normal"
              >
                {product.name}
              </h3>
              <p className="text-[12px] sm:text-lg font-medium text-[#B8860B]">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <p className="text-stone-600 text-[10px] sm:text-xs font-light leading-relaxed line-clamp-1 italic mb-1 sm:mb-2">
              {product.description}
            </p>
            
            <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;
