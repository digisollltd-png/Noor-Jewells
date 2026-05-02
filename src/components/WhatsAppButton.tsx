'use client'

import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801700000000';
  const message = encodeURIComponent("Hello Noore! I'm interested in your royal collection.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 z-[90] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-[0_20px_50px_rgba(37,211,102,0.3)] transition-all duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <div className="absolute -top-12 right-0 bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden lg:block">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-900">Query our Curator</p>
      </div>
      <MessageCircle className="w-7 h-7 fill-current" />
      
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </motion.a>
  );
}
