/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Download, 
  MessageCircle, 
  Star, 
  ChevronDown, 
  ShieldCheck, 
  Zap, 
  Play, 
  Users, 
  Instagram, 
  Youtube, 
  Facebook,
  Award,
  Video,
  TrendingUp,
  Gift,
  ArrowRight,
  Menu,
  X,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Data ---

const BRAND_NAME = "WebifyBoost";
const PAYMENT_LINK = "https://rzp.io/rzp/roRge6R6";
const WHATSAPP_LINK = "https://wa.me/918881386529";
const EMAIL = "growth@webifyboost.in";
const PHONE = "+91 8881386529";

const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    content: "We respect your privacy. This policy describes how we collect, use, and protect your personal information. When you make a purchase, we collect your name and email to deliver the product via Google Drive and for customer support. We do not sell your data to third parties. Your payment information is handled securely by Razorpay."
  },
  disclaimer: {
    title: "Disclaimer",
    content: "The viral reels provided are for creative and educational purposes. While we provide high-quality assets, growth and engagement results vary based on platform algorithms and individual strategy. 'WebifyBoost' does not guarantee specific follower counts or income levels. Use the content in compliance with platform guidelines."
  },
  refund: {
    title: "Refund Policy",
    content: "This is a digital product delivered instantly. Due to the digital nature of the content (Google Drive Access), once the link is shared or access is provided, we cannot offer refunds. Please ensure you have read the bundle details before purchasing."
  },
  about: {
    title: "About Us",
    content: "WebifyBoost is a premium digital asset provider dedicated to helping content creators scale their presence. Founded by experts with 7+ years of industry experience, we curate viral bundles that save time and maximize reach. Our mission is to democratize high-quality video content for creators worldwide."
  }
};

const BUNDLES = [
  { title: "1000+ 2D Animation Reels", category: "Animation" },
  { title: "Anime Reels Bundle", category: "Animation" },
  { title: "AI Miniature Reels", category: "AI Content" },
  { title: "AI Animals Reels", category: "AI Content" },
  { title: "4K Ultra HD Reels", category: "Premium" },
  { title: "Mad Scientist Voice Reels", category: "AI Content" },
  { title: "Money Motivation Bundle", category: "Success" },
  { title: "1400+ Motivational Reels", category: "Success" },
  { title: "1300+ Motivational Reels", category: "Success" },
  { title: "1000+ Motivational Reels", category: "Success" },
  { title: "10000+ Luxury Reels", category: "Luxury" },
  { title: "500+ Luxury Reels", category: "Luxury" },
  { title: "1000+ Wood Work Reels", category: "Niche" },
  { title: "2000+ Tools Reels", category: "Niche" },
  { title: "1000+ Tips & Tricks Reels", category: "Utility" },
  { title: "1000+ Satisfying Reels", category: "Visuals" },
  { title: "1400+ Funny Reels", category: "Comedy" },
  { title: "1000+ Comedy Reels", category: "Comedy" },
  { title: "3500+ Shark Tank Reels", category: "Business" },
  { title: "500+ Omegle Reels", category: "Social" },
  { title: "3000+ Useful Gadgets Reels", category: "Tech" },
  { title: "1000+ Emotional Reels", category: "Niche" },
  { title: "1500+ AI Doctor Reels", category: "AI Content" },
  { title: "2000+ Gym Reels", category: "Fitness" },
  { title: "500+ AI Business Reels", category: "AI Content" },
  { title: "Cars Reels", category: "Luxury" },
  { title: "Shayari Reels", category: "Niche" },
  { title: "AI Hindi Kahani Bundle", category: "Storytelling" },
  { title: "Study Reels Bundle", category: "Education" },
  { title: "Superhero Reels", category: "Entertainment" },
  { title: "Lofi Emotional Songs Reels", category: "Music" },
];

const BONUSES = [
  { title: "Social Media Planner", desc: "Organize your content like a pro" },
  { title: "Faceless Instagram Marketing Ebook", desc: "Build an empire without showing your face" },
  { title: "Canva Crash Course Ebook", desc: "Design viral thumbnails & posts" },
  { title: "50 Tips of Using ChatGPT Ebook", desc: "Master AI for scriptwriting" },
  { title: "500+ Free Bonus Assets", desc: "SFX, Overlays, and music" },
  { title: "500+ Cartoon Reels", desc: "Engage the younger audience" },
];

const TESTIMONIALS = [
  { name: "Rahul S.", role: "Content Creator", text: "Best investment I've made for my page. The quality is insane and growth has been consistent.", rating: 5 },
  { name: "Priya M.", role: "Fitness Influencer", text: "Saved me hours of editing. The gym reels are high quality and trending.", rating: 5 },
  { name: "Siddharth K.", role: "Digital Marketer", text: "Simple, easy to use, and excellent delivery. Instant access as promised.", rating: 4 },
  { name: "Anjali P.", role: "Theme Page Owner", text: "Finally found a luxury bundle that doesn't look pixelated. Highly recommended!", rating: 5 },
];

const FAQs = [
  { q: "How will I get access?", a: "After a successful payment, you will be automatically redirected to a Google Drive link. You will also receive an email with the access link." },
  { q: "Is it instant?", a: "Yes, delivery is 100% instant and automated." },
  { q: "Can I use for Instagram/YouTube?", a: "Absolutely! These reels are specifically designed for Instagram Reels, YouTube Shorts, and TikTok/Facebook." },
  { q: "Is this beginner-friendly?", a: "Yes, you just need to download and upload. We even provide bonuses on how to market them." },
  { q: "Do I get lifetime access?", a: "Yes, once you have the link, it's yours forever." },
];

// --- Helper Components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-1.5 md:gap-3">
      {[minutes, seconds].map((val, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center glass-card rounded-xl text-primary font-black text-xl md:text-2xl border-primary/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            {String(val).padStart(2, '0')}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">{i === 0 ? 'Min' : 'Sec'}</span>
        </div>
      ))}
    </div>
  );
};

const AnimatedCounter = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span className="vibrant-gradient bg-clip-text text-transparent">{count.toLocaleString()}</span>;
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-16 px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-black mb-4 leading-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-24 h-1.5 vibrant-gradient mx-auto mt-6 rounded-full" />
  </div>
);

const LegalModal = ({ content, isOpen, onClose }: { content: { title: string, content: string } | null, isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && content && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-bg-dark/95 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative glass-card max-w-2xl w-full p-8 md:p-12 rounded-[2.5rem] border-white/20 shadow-2xl overflow-y-auto max-h-[80vh]"
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-gray-400 group">
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>
          <h2 className="text-3xl font-black mb-6 premium-gradient-text">{content.title}</h2>
          <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
            {content.content}
          </div>
          <div className="mt-10 pt-8 border-t border-white/10 flex justify-end">
            <button onClick={onClose} className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-2xl font-bold transition-all">Close</button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- Main App Component ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [legalModal, setLegalModal] = useState<{ title: string, content: string } | null>(null);

  const PROOF_CARDS = [
    { title: "20 Million+ Reach", icon: TrendingUp, color: "from-blue-500 to-cyan-500", desc: "Average organic reach achieved across client channels." },
    { title: "100k+ Followers/Month", icon: Users, color: "from-purple-500 to-pink-500", desc: "Consistent subscriber growth using AI storytelling niche." },
    { title: "70% Engagement Increase", icon: Zap, color: "from-orange-500 to-red-500", desc: "Boost in watch time and shares using trending transitions." },
    { title: "Global Viral Hits", icon: Play, color: "from-green-500 to-emerald-500", desc: "Successful launches in US, UK, and India markets." },
    { title: "Creator Verification", icon: Award, color: "from-yellow-500 to-orange-500", desc: "Helped 50+ creators secure verified badges." },
    { title: "Monetization Success", icon: ShieldCheck, color: "from-indigo-500 to-blue-500", desc: "Accounts successfully approved for ads and rewards." }
  ];

  return (
    <div className="min-h-screen font-sans bg-bg-dark glow-mesh">
      
      <LegalModal 
        isOpen={!!legalModal} 
        content={legalModal} 
        onClose={() => setLegalModal(null)} 
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Zap className="text-white w-5 h-5 fill-white" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
            WEBIFY<span className="text-primary">BOOST</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#proof" className="hover:text-white transition-colors">Proof</a>
          <a href="#what-you-get" className="hover:text-white transition-colors">Product</a>
          <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
          <a href="#bonuses" className="hover:text-white transition-colors">Bonuses</a>
          <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">Contact</a>
          <a href={PAYMENT_LINK} className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full font-bold transition-all cta-shadow">
            Get Started
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg-dark pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-bold text-center">
              <a href="#proof" onClick={() => setIsMenuOpen(false)}>Real Proof</a>
              <a href="#what-you-get" onClick={() => setIsMenuOpen(false)}>The Bundle</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)}>Creator Stories</a>
              <a href="#bonuses" onClick={() => setIsMenuOpen(false)}>Free Bonuses</a>
              <a href={`mailto:${EMAIL}`} onClick={() => setIsMenuOpen(false)}>Support</a>
              <a href={PAYMENT_LINK} className="text-primary">Unlock Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-primary/10 pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 text-sm font-semibold text-primary/90"
          >
            <TrendingUp className="w-4 h-4" />
            Join 85,000+ Students Today
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight max-w-5xl mx-auto"
          >
            <span className="premium-gradient-text">2.5 Lakh+</span> Viral Reels Bundle <br /> for Content Creators
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12"
          >
            High-quality ready-to-use reels across trending niches to help creators publish consistently and grow their presence fast.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
              <a 
                href={PAYMENT_LINK}
                className="group inline-flex items-center justify-center gap-2 premium-gradient text-white text-lg md:text-xl font-bold px-10 py-5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] cta-shadow whitespace-nowrap"
              >
                Get Instant Access
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={PAYMENT_LINK}
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-lg md:text-xl font-bold px-10 py-5 rounded-2xl transition-all whitespace-nowrap"
              >
                Secure Payment via Razorpay
              </a>
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-black">Offer expires in:</span>
              <CountdownTimer />
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs md:text-sm font-bold uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4" /> Instant Access
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs md:text-sm font-bold uppercase tracking-wide">
                <Video className="w-4 h-4" /> Digital Delivery
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="py-12 bg-bg-card border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">
                <AnimatedCounter end={85000} />+
              </div>
              <div className="text-gray-500 text-xs font-black uppercase tracking-[0.2em]">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">
                <AnimatedCounter end={700} />+
              </div>
              <div className="text-gray-500 text-xs font-black uppercase tracking-[0.2em]">Creators Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">
                2.5L+
              </div>
              <div className="text-gray-500 text-xs font-black uppercase tracking-[0.2em]">Viral Reels Bundle</div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Proof Section */}
      <section id="proof" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Verified results and impact analytics from creators who scaled with our assets.">
            The Evidence of <span className="premium-gradient-text">Success</span>
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROOF_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 rounded-[2.5rem] group hover:bg-white/[0.04] transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <card.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  Live Case Study
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section id="what-you-get" className="py-24 md:py-32 px-6 bg-bg-card">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Our massive library is organized into profitable niches for easy access and use.">
            The Complete <span className="premium-gradient-text">Collection</span>
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUNDLES.map((bundle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 md:p-8 rounded-[2rem] hover:bg-white/[0.05] transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                    <Video className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-primary transition-colors">{bundle.title}</h3>
                    <p className="text-[10px] font-black tracking-widest uppercase text-gray-500">{bundle.category}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> High Quality</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Viral Ready</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Box Section */}
      <section id="bonuses" className="py-24 md:py-32 px-6 relative">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-bg-card to-bg-dark border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden ring-1 ring-white/10">
            <div className="absolute top-0 right-0 py-8 px-12 premium-gradient text-white font-black uppercase tracking-widest text-xs rotate-45 translate-x-[30%] -translate-y-[20%]">
              Limited
            </div>
            
            <div className="mb-12 text-center md:text-left">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">Free Bonus Included</span>
              <h2 className="text-3xl md:text-5xl font-black text-white">Exclusive Extra <span className="premium-gradient-text">Value</span></h2>
              <p className="text-gray-400 mt-4 text-lg">Master the tools and strategies to scale your revenue with our curated guides.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BONUSES.map((bonus, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                  <div className="shrink-0 bg-secondary/10 w-10 h-10 rounded-xl flex items-center justify-center">
                    <Gift className="text-secondary w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{bonus.title}</p>
                    <p className="text-gray-500 text-sm mt-1">{bonus.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 md:py-32 px-6 bg-bg-card">
        <div className="max-w-5xl mx-auto">
          <SectionHeading subtitle="Transition from struggling for consistency to having a professional content engine.">
            Content <span className="premium-gradient-text">Evolution</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-10 rounded-[2.5rem] border-white/5">
              <span className="inline-block px-3 py-1 rounded-lg bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest mb-8">The Struggle</span>
              <div className="space-y-6">
                {[
                  "Struggling for content ideas",
                  "Low posting consistency",
                  "Slow engagement growth",
                  "Spending hours on editing",
                  "Inconsistent quality"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 text-gray-400 font-medium">
                    <X className="w-5 h-5 text-red-500/50" /> {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-10 rounded-[2.5rem] bg-primary text-white overflow-hidden cta-shadow">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-secondary opacity-50 -z-10" />
              <span className="inline-block px-3 py-1 rounded-lg bg-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-8">The Solution</span>
                <div className="space-y-6">
                {[
                  "Unlimited ready-to-post reels",
                  "Post multiple times daily",
                  "Rapid organic reach expansion",
                  "Professional-grade aesthetics",
                  "Zero time editing - just growth!"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-white" /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Creator */}
      <section id="creator" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto glass-card rounded-[3.5rem] p-8 md:p-20 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 blur-[120px]" />
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-primary via-secondary to-accent p-1.5 shadow-2xl relative group">
                <div className="w-full h-full bg-bg-card rounded-[2.8rem] flex flex-col items-center justify-center p-8 text-center">
                  <Users className="w-16 h-16 text-primary mb-6" />
                  <p className="text-white font-black text-2xl">Suraj Pratap Singh</p>
                  <p className="text-primary text-sm font-bold uppercase tracking-widest mt-2">Master Curator</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6">Expertise & Experience</span>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Driven by <span className="premium-gradient-text">Proven Results</span></h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
                With <span className="text-white font-black underline decoration-primary decoration-4 underline-offset-4">7+ years of expertise</span> in viral marketing and audience growth, Suraj Pratap Singh has architected growth for over <span className="text-white font-black">700+ channels</span> and mentored <span className="text-white font-black">85,000+ students</span> globally.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Exp.", val: "7+ Yrs" },
                  { label: "Clients", val: "700+" },
                  { label: "Community", val: "85k+" }
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-4 rounded-2xl flex flex-col items-center md:items-start">
                    <span className="text-primary font-black text-xl">{stat.val}</span>
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Don't just take our word for it—hear from the community of creators using our bundle.">
            Creator <span className="premium-gradient-text">Success Stories</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-[2rem] hover:translate-y-[-5px] transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starI) => (
                    <Star 
                      key={starI} 
                      className={`w-4 h-4 ${starI < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{testimonial.name}</p>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 md:py-32 px-6 bg-bg-card">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Commonly Asked <span className="premium-gradient-text">Questions</span></SectionHeading>
          <div className="space-y-4">
            {FAQs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden border-white/5">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/[0.04] transition-colors"
                >
                  <span className="font-extrabold text-lg md:text-xl pr-4">{faq.q}</span>
                  <ChevronDown className={`shrink-0 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5"
                    >
                      <div className="p-6 text-gray-400 text-lg leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto glass-card p-12 rounded-[3rem] border-white/5">
          <SectionHeading subtitle="Need help or have questions? Our support team is here.">Contact <span className="premium-gradient-text">Support</span></SectionHeading>
          <div className="flex flex-col gap-6 mt-8">
            <a href={`mailto:${EMAIL}`} className="flex items-center justify-center gap-3 text-xl font-bold hover:text-primary transition-colors">
              <Mail className="w-6 h-6 text-primary" /> {EMAIL}
            </a>
            <a href={`tel:${PHONE}`} className="flex items-center justify-center gap-3 text-xl font-bold hover:text-primary transition-colors">
              <Phone className="w-6 h-6 text-primary" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto relative group overflow-hidden rounded-[3rem] p-12 md:p-24 text-center">
          <div className="absolute inset-0 premium-gradient transition-transform duration-700 group-hover:scale-105 -z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Start Creating <br className="hidden md:block" /> Better Content Today</h2>
            <p className="text-white/80 text-xl font-medium mb-12 max-w-2xl mx-auto italic">
              "The secret to getting ahead is getting started." Unlock 2.5 Lakh+ opportunities now.
            </p>
            <a 
              href={PAYMENT_LINK}
              className="inline-flex items-center gap-3 bg-white text-primary text-xl md:text-2xl font-black px-12 py-6 rounded-2xl transition-all hover:scale-[1.05] active:scale-[0.98] shadow-2xl"
            >
              Unlock Instant Access
              <ArrowRight className="w-6 h-6" />
            </a>
            <div className="mt-8 flex justify-center items-center gap-4 text-white/60 text-xs font-bold uppercase tracking-widest">
              <span>Razorpay Secured</span>
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <span>Full Bundle Included</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 bg-bg-card/50 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 blur-[150px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-8">
                <Zap className="text-primary w-8 h-8 fill-primary" />
                <span className="text-2xl font-black tracking-tighter text-white">
                  WEBIFY<span className="text-primary">BOOST</span>
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">Empowering 85,000+ creators with high-octane digital assets to dominate social media.</p>
              <div className="flex gap-4">
                <a href={WHATSAPP_LINK} className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:bg-white/10 transition-colors"><MessageCircle className="w-6 h-6" /></a>
                <a href={`mailto:${EMAIL}`} className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:bg-white/10 transition-colors"><Mail className="w-6 h-6" /></a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 gap-12 md:gap-24">
              <div>
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Quick Links</h4>
                <ul className="space-y-4 text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                  <li><a href="#proof" className="hover:text-primary transition-colors">Success Proof</a></li>
                  <li><a href="#what-you-get" className="hover:text-primary transition-colors">Bundle Specs</a></li>
                  <li><a href="#faq" className="hover:text-primary transition-colors">Help Center</a></li>
                  <li><button onClick={() => setLegalModal(LEGAL_CONTENT.about)} className="hover:text-primary transition-colors text-left uppercase">About Us</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Legal & Support</h4>
                <ul className="space-y-4 text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                  <li><button onClick={() => setLegalModal(LEGAL_CONTENT.privacy)} className="hover:text-primary transition-colors text-left uppercase">Privacy Policy</button></li>
                  <li><button onClick={() => setLegalModal(LEGAL_CONTENT.disclaimer)} className="hover:text-primary transition-colors text-left uppercase">Legal Disclaimer</button></li>
                  <li><button onClick={() => setLegalModal(LEGAL_CONTENT.refund)} className="hover:text-primary transition-colors text-left uppercase">Refund Policy</button></li>
                  <li><a href={WHATSAPP_LINK} className="text-primary font-black">Contact Support</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
            <span>© {new Date().getFullYear()} {BRAND_NAME}. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              SECURED BY RAZORPAY & STRIPE
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] bg-green-500 hover:bg-green-600 text-white p-4 rounded-full md:rounded-2xl shadow-2xl transition-all hover:scale-110 active:scale-95 group"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-bg-dark px-4 py-2 rounded-xl text-sm font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block shadow-2xl">
          Support via WhatsApp
        </span>
      </a>

    </div>
  );
}
