
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
  onMenuClick: () => void;
  onUserClick: () => void;
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onCartClick, 
  onSearchClick, 
  onMenuClick,
  onUserClick,
  isScrolled 
}) => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-3xl border-b border-stone-100 py-4 shadow-sm' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-12 lg:gap-20">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="luxury-serif text-3xl font-bold tracking-tighter transition-colors duration-500">
                <span className="text-[#B8860B]">Nooré</span> 
                <span className="text-stone-900 font-light ml-1">Jewells</span>
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {[
                { name: 'Necklaces', href: '/#catalog' },
                { name: 'Earrings', href: '/#catalog' },
                { name: 'Bangles', href: '/#catalog' },
                { name: 'Rings', href: '/#catalog' },
                { name: 'Headwear', href: '/#catalog' },
                { name: 'Chronicles', href: '/blog' }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`relative group text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-500 ${
                    isScrolled ? 'text-stone-500 hover:text-[#B8860B]' : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#B8860B] transition-all duration-500 ease-out group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden sm:flex items-center gap-4">
              <button 
                onClick={onSearchClick}
                className="p-2 text-stone-900 hover:text-[#B8860B] transition-all duration-300"
              >
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={onUserClick}
                className="p-2 text-stone-900 hover:text-[#B8860B] transition-all duration-300"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={onCartClick}
              className="relative group flex items-center gap-4 px-6 py-3 bg-stone-950 text-white rounded-full hover:bg-stone-900 transition-all duration-500 shadow-xl overflow-hidden active:scale-95"
            >
              <div className="relative z-10 flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-[#B8860B]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</span>
              </div>
              
              <div className="absolute inset-0 bg-[#B8860B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10" />
            </button>

            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 text-stone-900 hover:bg-stone-100 rounded-full transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
