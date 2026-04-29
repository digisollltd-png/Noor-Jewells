'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import WhatsAppButton from './WhatsAppButton';
import { useShop } from '../context/ShopContext';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const { 
    cart, 
    cartCount, 
    isCartOpen, 
    setIsCartOpen,
    isMenuOpen,
    setIsMenuOpen,
    showSearch, 
    setShowSearch, 
    searchQuery, 
    setSearchQuery,
    removeFromCart,
    updateQuantity,
    clearCart,
    activeCoupon,
    setActiveCoupon
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isCartOpen || isMenuOpen || showSearch) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, isMenuOpen, showSearch]);

  return (
    <>
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onSearchClick={() => setShowSearch(true)}
        onMenuClick={() => setIsMenuOpen(true)}
        onUserClick={() => alert('Account feature coming soon!')}
        isScrolled={isScrolled}
      />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white lg:hidden"
          >
            <div className="p-6 flex justify-between items-center border-b border-stone-100">
              <div className="luxury-serif text-2xl font-bold">
                <span className="text-[#B8860B]">Nooré</span> 
                <span className="text-stone-900 font-light ml-1">Jewells</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-stone-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-stone-400" />
              </button>
            </div>
            
            <nav className="p-8 space-y-6">
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
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-2xl luxury-serif text-stone-800 hover:text-[#B8860B] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="absolute bottom-12 left-0 right-0 px-8">
              <div className="border-t border-stone-100 pt-8 flex gap-6">
                <button className="flex-1 py-4 bg-stone-950 text-white rounded-full text-sm font-bold tracking-widest uppercase">
                  Login
                </button>
                <button className="flex-1 py-4 border border-stone-200 rounded-full text-sm font-bold tracking-widest uppercase">
                  Support
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSearch && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-0 z-[100] bg-white p-8 shadow-2xl border-b border-stone-100"
          >
            <div className="max-w-4xl mx-auto flex items-center gap-6">
              <Search className="w-8 h-8 text-[#B8860B]" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search for your next heirloom..." 
                className="flex-1 text-3xl font-light focus:outline-none placeholder:text-stone-400 italic luxury-serif"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={() => setShowSearch(false)} 
                className="p-3 hover:bg-stone-50 rounded-full transition-colors border border-stone-100"
              >
                <X className="w-6 h-6 text-stone-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1">
        {children}
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        activeCoupon={activeCoupon}
        setActiveCoupon={setActiveCoupon}
      />

      <WhatsAppButton />
    </>
  );
}
