
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, Ticket, ArrowRight, CheckCircle2, AlertCircle, ShoppingBag, CreditCard, Sparkles, Banknote, User, Phone, Mail, MapPin, ChevronLeft, Building } from 'lucide-react';
import Image from 'next/image';
import { CartItem, Coupon } from '../types';
import { MOCK_COUPONS } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
  activeCoupon: Coupon | null;
  setActiveCoupon: (c: Coupon | null) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, onClose, cart, onUpdateQuantity, onRemove, onClear, activeCoupon, setActiveCoupon 
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [showCouponSuccess, setShowCouponSuccess] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'processing' | 'complete'>('cart');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: ''
  });
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = activeCoupon 
    ? (activeCoupon.discount_type === 'percentage' 
        ? subtotal * (activeCoupon.value / 100) 
        : activeCoupon.value)
    : 0;
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = async () => {
    setIsApplying(true);
    setCouponError('');
    // Clear error immediately to allow re-triggering animation if same error occurs
    await new Promise(resolve => setTimeout(resolve, 800));
    const found = MOCK_COUPONS.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
    if (found) {
      if (subtotal < found.min_spend) {
        setCouponError(`Minimum purchase for this code is $${found.min_spend}`);
      } else {
        setActiveCoupon(found);
        setCouponCode('');
        setShowCouponSuccess(true);
        setTimeout(() => setShowCouponSuccess(false), 3000);
      }
    } else {
      setCouponError('Invalid coupon code');
    }
    setIsApplying(false);
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  const confettiParticles = Array.from({ length: 20 });

  const handleCheckout = async () => {
    setCheckoutStep('processing');
    setIsCheckingOut(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsCheckingOut(false);
    setCheckoutStep('complete');
    setTimeout(() => {
      onClear();
      setCheckoutStep('cart');
      onClose();
    }, 4000);
  };

  const handleNextStep = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('details');
    } else if (checkoutStep === 'details') {
      if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
        setCouponError('Please fill all required fields');
        return;
      }
      setCouponError('');
      handleCheckout();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm transition-opacity" 
            onClick={onClose} 
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 right-0 max-w-lg w-full bg-[#FFFEFB] shadow-2xl flex flex-col border-l border-stone-200"
          >
            {checkoutStep === 'complete' ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-stone-950 text-white overflow-hidden relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-[#B8860B] rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(184,134,11,0.4)]"
                >
                  <CheckCircle2 className="w-12 h-12" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="luxury-serif text-4xl font-bold mb-4 italic">
                    {paymentMethod === 'cod' ? 'Order Reserved!' : 'Majestic Choice!'}
                  </h2>
                  <p className="text-stone-400 text-lg font-light max-w-sm mx-auto">
                    {paymentMethod === 'cod' 
                      ? `Your royal treasures are reserved for Cash on Delivery. We'll deliver to ${customerDetails.address}. Please keep the exact amount ready.`
                      : 'Your royal treasures are being carefully inspected and packed. We will notify you once your elegance is in transit.'}
                  </p>
                </motion.div>
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-full h-full opacity-5" />
                </motion.div>
              </div>
            ) : checkoutStep === 'processing' ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FFFEFB]">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border border-[#B8860B]/20 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border border-[#B8860B]/40 rounded-full border-t-[#B8860B]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#B8860B]" />
                  </div>
                </div>
                <h3 className="luxury-serif text-2xl font-bold text-stone-950 mt-12 mb-4 italic">Securing Your Elegance</h3>
                <p className="text-stone-400 text-sm font-light tracking-wide">Authenticating with the royal vault...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-8 border-b border-stone-100">
                  <div className="flex items-center gap-4">
                    {checkoutStep === 'details' && (
                      <button 
                        onClick={() => setCheckoutStep('cart')}
                        className="w-10 h-10 flex items-center justify-center bg-stone-50 text-stone-400 hover:text-stone-950 rounded-full transition-all border border-stone-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}
                    <div>
                      <h2 className="luxury-serif text-3xl font-bold text-stone-950">
                        {checkoutStep === 'cart' ? 'Your Curation' : 'Delivery Details'}
                      </h2>
                      <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 italic text-[#B8860B]">
                        {checkoutStep === 'cart' ? 'Exclusive Collection' : 'Personal Information'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose} 
                    className="w-12 h-12 flex items-center justify-center bg-stone-50 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all border border-stone-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 scroll-smooth">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20">
                      <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-200 border border-stone-100">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                      <h3 className="luxury-serif text-2xl text-stone-900 mb-2">No treasures here yet</h3>
                      <p className="text-stone-400 max-w-xs mx-auto mb-8 font-light italic">Discover our timeless pieces designed for the modern queen.</p>
                      <button onClick={onClose} className="px-10 py-4 bg-stone-950 text-white rounded-full font-bold hover:bg-stone-900 transition-all active:scale-95 shadow-xl">
                        Shop the Collection
                      </button>
                    </div>
                  ) : checkoutStep === 'cart' ? (
                    <>
                      <div className="space-y-8">
                        {/* Items list ... */}
                        <AnimatePresence initial={false} mode="popLayout">
                          {cart.map((item, idx) => (
                            <motion.div 
                              key={item.id} 
                              layout
                              initial={{ opacity: 0, y: 30, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ 
                                opacity: 0, 
                                scale: 0.8, 
                                x: -30,
                                filter: 'blur(8px)',
                                transition: { duration: 0.3, ease: "easeIn" } 
                              }}
                              transition={{ 
                                type: "spring",
                                stiffness: 350,
                                damping: 30,
                                opacity: { duration: 0.2 }
                              }}
                              className="flex gap-6 group"
                            >
                              <div className="w-24 h-32 rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 flex-shrink-0 relative">
                                <Image 
                                  src={item.image} 
                                  alt={item.name} 
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="luxury-serif font-bold text-stone-950 text-base mb-1 hover:text-[#B8860B] transition-colors cursor-pointer">{item.name}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8860B]">{item.category}</p>
                                  </div>
                                  <span className="font-bold text-stone-950 text-base">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center bg-stone-50 rounded-full px-2 py-1 border border-stone-100">
                                    <button 
                                      onClick={() => onUpdateQuantity(item.id, -1)}
                                      className="w-8 h-8 flex items-center justify-center hover:bg-white hover:border-stone-200 rounded-full transition-all text-stone-400 hover:text-stone-900"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <motion.span 
                                      key={item.quantity}
                                      initial={{ scale: 1.4, y: -4, opacity: 0 }}
                                      animate={{ scale: 1, y: 0, opacity: 1 }}
                                      transition={{ type: "spring", stiffness: 600, damping: 20 }}
                                      className="w-10 text-center text-sm font-black text-stone-950 block"
                                    >
                                      {item.quantity}
                                    </motion.span>
                                    <button 
                                      onClick={() => onUpdateQuantity(item.id, 1)}
                                      className="w-8 h-8 flex items-center justify-center hover:bg-white hover:border-stone-200 rounded-full transition-all text-stone-400 hover:text-stone-900"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <button 
                                    onClick={() => onRemove(item.id)}
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:text-rose-500 transition-all"
                                  >
                                    <Trash2 className="w-4 h-4" /> Remove
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Coupon and Summary inside Scrollable area */}
                      <div className="pt-10 border-t border-stone-100 space-y-8">
                        {!activeCoupon ? (
                          <div className="space-y-4">
                            <AnimatePresence>
                              {showCouponSuccess && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                  className="relative p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 border border-emerald-100 shadow-lg overflow-hidden"
                                >
                                  <motion.div
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                  >
                                    <Sparkles className="w-5 h-5 text-emerald-500" />
                                  </motion.div>
                                  Royal Privilege Unlocked!
                                  
                                  {/* Celebration Particles */}
                                  {confettiParticles.map((_, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ scale: 0, x: 0, y: 0 }}
                                      animate={{ 
                                        scale: [0, 1, 0],
                                        x: (Math.random() - 0.5) * 400,
                                        y: (Math.random() - 0.5) * 200,
                                        rotate: Math.random() * 360
                                      }}
                                      transition={{ duration: 1.5, ease: "easeOut" }}
                                      className="absolute w-1.5 h-1.5 rounded-full bg-[#B8860B] opacity-40"
                                      style={{ left: '50%', top: '50%' }}
                                    />
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Privilege Codes</h5>
                            <div className="flex gap-2">
                              <motion.div 
                                className="relative flex-1 group"
                                animate={couponError ? "shake" : ""}
                                variants={shakeVariants}
                              >
                                <input 
                                  type="text" 
                                  placeholder="Enter Code"
                                  value={couponCode}
                                  onChange={(e) => setCouponCode(e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                                  className={`w-full pl-10 pr-4 py-3 bg-stone-50 border ${couponError ? 'border-red-300 bg-red-50' : 'border-stone-100'} rounded-2xl text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#B8860B]/10 transition-all`}
                                />
                                <Ticket className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${couponError ? 'text-red-400' : 'text-stone-300'}`} />
                              </motion.div>
                              <button 
                                onClick={handleApplyCoupon}
                                disabled={!couponCode || isApplying}
                                className="px-6 bg-stone-950 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-stone-900 disabled:bg-stone-200 transition-all"
                              >
                                {isApplying ? "..." : "Redeem"}
                              </button>
                            </div>
                            <AnimatePresence>
                              {couponError && (
                                <motion.p 
                                  initial={{ opacity: 0, height: 0, y: -5 }}
                                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                                  exit={{ opacity: 0, height: 0, y: -5 }}
                                  className="text-red-500 text-[10px] font-black uppercase tracking-tight flex items-center gap-1.5 px-1"
                                >
                                  <AlertCircle className="w-3.5 h-3.5" /> {couponError}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center justify-between p-5 bg-[#B8860B] text-white rounded-2xl shadow-lg"
                          >
                            <div className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5" />
                              <div>
                                <p className="text-[9px] font-black tracking-widest uppercase text-white/70 mb-0.5">Discount Applied</p>
                                <p className="text-xs font-bold">{activeCoupon.code}</p>
                              </div>
                            </div>
                            <button onClick={() => setActiveCoupon(null)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        )}

                        <div className="space-y-4">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Order Summary</h5>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-stone-500 font-medium">Subtotal</span>
                              <span className="font-bold text-stone-950">${subtotal.toFixed(2)}</span>
                            </div>
                            {activeCoupon && (
                              <div className="flex justify-between text-sm font-bold text-[#B8860B]">
                                <span>Privilege Discount</span>
                                <span>-${discount.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm">
                              <span className="text-stone-500 font-medium">Shipping</span>
                              <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest">Complimentary</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Payment Selection</h5>
                          <div className="grid grid-cols-2 gap-3">
                            <button 
                              onClick={() => setPaymentMethod('card')}
                              className={`p-4 rounded-2xl border text-left transition-all ${paymentMethod === 'card' ? 'border-[#B8860B] bg-[#B8860B]/5' : 'border-stone-100 bg-stone-50'}`}
                            >
                              <CreditCard className={`w-5 h-5 mb-2 ${paymentMethod === 'card' ? 'text-[#B8860B]' : 'text-stone-400'}`} />
                              <p className="text-[10px] font-black uppercase tracking-widest text-stone-950">Elite Card</p>
                            </button>
                            <button 
                              onClick={() => setPaymentMethod('cod')}
                              className={`p-4 rounded-2xl border text-left transition-all ${paymentMethod === 'cod' ? 'border-[#B8860B] bg-[#B8860B]/5' : 'border-stone-100 bg-stone-50'}`}
                            >
                              <Banknote className={`w-5 h-5 mb-2 ${paymentMethod === 'cod' ? 'text-[#B8860B]' : 'text-stone-400'}`} />
                              <p className="text-[10px] font-black uppercase tracking-widest text-stone-950">Cash On Delivery</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : checkoutStep === 'details' ? (
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <section className="space-y-4">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8860B]">Identity</h5>
                          <div className="space-y-4">
                            <div className="relative group">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#B8860B] transition-colors" />
                              <input 
                                type="text" 
                                placeholder="Full Name"
                                value={customerDetails.name}
                                onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#B8860B]/10 transition-all"
                              />
                            </div>
                            <div className="relative group">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#B8860B] transition-colors" />
                              <input 
                                type="tel" 
                                placeholder="Phone Number"
                                value={customerDetails.phone}
                                onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#B8860B]/10 transition-all"
                              />
                            </div>
                            <div className="relative group">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#B8860B] transition-colors" />
                              <input 
                                type="email" 
                                placeholder="Email Address (Optional)"
                                value={customerDetails.email}
                                onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#B8860B]/10 transition-all"
                              />
                            </div>
                          </div>
                        </section>

                        <section className="space-y-4">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B8860B]">Shipping Sanctuary</h5>
                          <div className="space-y-4">
                            <div className="relative group">
                              <MapPin className="absolute left-4 top-4 w-4 h-4 text-stone-300 group-focus-within:text-[#B8860B] transition-colors" />
                              <textarea 
                                placeholder="Delivery Address"
                                value={customerDetails.address}
                                onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#B8860B]/10 transition-all min-h-[100px] resize-none"
                              />
                            </div>
                            <div className="relative group">
                              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-[#B8860B] transition-colors" />
                              <input 
                                type="text" 
                                placeholder="City"
                                value={customerDetails.city}
                                onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#B8860B]/10 transition-all"
                              />
                            </div>
                          </div>
                        </section>

                        {couponError && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-[10px] font-black uppercase tracking-tight flex items-center gap-1.5 px-1"
                          >
                            <AlertCircle className="w-3.5 h-3.5" /> {couponError}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20">
                      {/* This branch should technically not be reached with the current steps but handles unexpected states */}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-8 bg-white border-t border-stone-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#B8860B] mb-1">Total Investment</p>
                        <motion.span 
                          key={total}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-4xl font-bold text-stone-950 tracking-tighter block"
                        >
                          ${total.toFixed(2)}
                        </motion.span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-1 opacity-20">
                          {[1,2,3].map(i => <div key={i} className="w-7 h-4 bg-stone-900 rounded-[2px]" />)}
                        </div>
                        <span className="text-[8px] font-black text-stone-400 uppercase tracking-widest">Encrypted SSL</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleNextStep}
                      disabled={isCheckingOut}
                      className="group w-full py-5 bg-stone-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#B8860B] transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98] disabled:bg-stone-800"
                    >
                      {isCheckingOut ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          {checkoutStep === 'cart' ? (
                            <>Proceed to Checkout</>
                          ) : paymentMethod === 'card' ? (
                            <><CreditCard className="w-4 h-4 text-[#B8860B]" /> Complete Acquisition</>
                          ) : (
                            <><Banknote className="w-4 h-4 text-[#B8860B]" /> Reserve for Delivery</>
                          )}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
