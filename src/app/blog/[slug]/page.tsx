'use client'

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, User, Calendar, Clock, Share2, Facebook, Twitter, Link as LinkIcon, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import ScrollToTop from '../../../components/ScrollToTop';
import { BLOG_POSTS } from '../../../constants/blog';
import { useShop } from '../../../context/ShopContext';

// In a real production app, this would be a Server Component for SEO.
// Since we are in a client-heavy environment, I'll keep it as a client component 
// but structured for readability and SEO-friendly metadata if it were rendered server-side.

export default function BlogPostDetail() {
  const params = useParams();
  const router = useRouter();
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  const { setShowSearch, setIsCartOpen } = useShop();
  const [copied, setCopied] = React.useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || '')}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h1 className="luxury-serif text-4xl mb-8 italic">The story remains untold...</h1>
          <Link href="/blog" className="text-[#B8860B] font-bold uppercase tracking-widest border-b border-[#B8860B]">Return to Library</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="bg-white min-h-screen">
      <ScrollToTop />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#B8860B] z-50 origin-left"
        initial={{ scaleX: 0 }}
        style={{ scaleX: 0 }} // This would normally use useScroll from framer-motion
      />

      {/* Article Header */}
      <header className="pt-32 pb-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              href="/blog"
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#B8860B] hover:gap-5 transition-all w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Chronicles
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-white border border-stone-200 text-[#B8860B] text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
                {post.category}
              </span>
              <span className="w-8 h-[1px] bg-stone-300"></span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{post.readTime}</span>
            </div>

            <h1 className="luxury-serif text-5xl md:text-7xl font-bold text-stone-950 leading-[1.1] tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-stone-200">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden border-2 border-white shadow-md relative">
                   <Image 
                     src={`https://ui-avatars.com/api/?name=${post.author}&background=f5f5f4&color=78716c`} 
                     alt={post.author} 
                     fill
                     className="object-cover" 
                     referrerPolicy="no-referrer"
                   />
                 </div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-stone-950 mb-0.5">{post.author}</p>
                   <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest italic leading-none">{post.date}</p>
                 </div>
               </div>

               <div className="flex items-center gap-4 relative">
                 <button 
                   onClick={shareOnFacebook}
                   className="p-2 text-stone-400 hover:text-[#B8860B] transition-colors"
                 >
                   <Facebook className="w-4 h-4" />
                 </button>
                 <button 
                   onClick={shareOnTwitter}
                   className="p-2 text-stone-400 hover:text-[#B8860B] transition-colors"
                 >
                   <Twitter className="w-4 h-4" />
                 </button>
                 <button 
                   onClick={copyToClipboard}
                   className="p-2 text-stone-400 hover:text-[#B8860B] transition-colors"
                 >
                   <LinkIcon className="w-4 h-4" />
                 </button>
                 <div className="w-[1px] h-4 bg-stone-200 mx-2"></div>
                 <button 
                   onClick={() => {
                     if (navigator.share) {
                       navigator.share({
                         title: post.title,
                         url: shareUrl
                       }).catch(console.error);
                     } else {
                       copyToClipboard();
                     }
                   }}
                   className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-950"
                 >
                   <Share2 className="w-3 h-3" /> Share Story
                 </button>

                 <AnimatePresence>
                   {copied && (
                     <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 10 }}
                       className="absolute -top-12 right-0 bg-stone-900 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap"
                     >
                       Link Copied to Clipboard
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Image */}
      <section className="relative -mt-10 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl bg-stone-100 relative"
          >
            <Image 
              src={post.image} 
              alt={post.title} 
              fill
              className="object-cover" 
              referrerPolicy="no-referrer"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="py-24 max-w-3xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="luxury-article"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags Section */}
        <div className="mt-20 pt-10 border-t border-stone-100">
           <div className="flex flex-wrap gap-4">
             {post.tags?.map((tag) => (
                <span key={tag} className="text-[9px] font-bold text-stone-400 uppercase tracking-widest px-4 py-2 bg-stone-50 rounded-full border border-stone-100 hover:border-[#B8860B] hover:text-[#B8860B] transition-all cursor-pointer">
                  #{tag}
                </span>
             ))}
           </div>
        </div>

        {/* Author Box */}
        <div className="mt-20 p-12 bg-stone-50 rounded-[2.5rem] border border-stone-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
           <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-xl border-4 border-white flex-shrink-0 relative">
             <Image 
               src={`https://ui-avatars.com/api/?name=${post.author}&background=f5f5f4&color=78716c`} 
               alt={post.author} 
               fill
               className="object-cover" 
               referrerPolicy="no-referrer"
             />
           </div>
           <div>
              <h4 className="luxury-serif text-2xl font-bold mb-2">Written by <span className="italic font-light text-stone-500">{post.author}</span></h4>
              <p className="text-stone-600 text-sm font-light italic leading-relaxed">
                A connoisseur of vintage aesthetics and a specialist in Indian heritage craft. Ayesha has spent a decade exploring the relationship between traditional artistry and modern lifestyles.
              </p>
           </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-16 px-4">
            <h2 className="luxury-serif text-4xl font-bold">Further <span className="italic font-light text-stone-500">Readings</span></h2>
            <Link href="/blog" className="text-[10px] font-black uppercase tracking-widest text-[#B8860B] flex items-center gap-2 group">
              View All Chronicles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {relatedPosts.map((rp) => (
               <Link key={rp.id} href={`/blog/${rp.slug}`} className="group bg-white rounded-[2.5rem] p-4 flex flex-col sm:flex-row gap-8 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="w-full sm:w-48 aspect-square rounded-[1.5rem] overflow-hidden flex-shrink-0 relative">
                    <Image 
                      src={rp.image} 
                      alt={rp.title} 
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 py-4 pr-4 flex flex-col justify-between">
                     <div>
                       <span className="text-[9px] font-black tracking-widest uppercase text-[#B8860B] mb-2 block">{rp.category}</span>
                       <h4 className="luxury-serif text-xl font-bold text-stone-950 group-hover:text-[#B8860B] transition-colors leading-snug">{rp.title}</h4>
                     </div>
                     <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-4">Continue Story <ArrowRight className="inline w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" /></p>
                  </div>
               </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest border-t border-stone-100 bg-white italic">
        © 2026 NOORÉ ROYAL CURATIONS. ALL RIGHTS RESERVED.
      </footer>

      {/* Global CSS for the article content */}
      <style jsx global>{`
        .luxury-article h2 {
          font-family: var(--font-serif);
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: #1c1917;
        }
        .luxury-article p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #44403c;
          font-weight: 300;
          margin-bottom: 2rem;
          font-style: italic;
        }
        .luxury-article ul, .luxury-article ol {
           margin-bottom: 2rem;
           padding-left: 1.5rem;
        }
        .luxury-article li {
           font-size: 1.125rem;
           margin-bottom: 1rem;
           color: #57534e;
           font-weight: 300;
           font-style: italic;
           position: relative;
        }
        .luxury-article li:before {
           content: '—';
           position: absolute;
           left: -1.5rem;
           color: #B8860B;
        }
        .luxury-article blockquote {
           padding: 2rem;
           background: #f5f5f4;
           border-left: 4px solid #B8860B;
           font-size: 1.25rem;
           color: #1c1917;
           font-family: var(--font-serif);
           margin: 3rem 0;
           border-radius: 0 1.5rem 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
