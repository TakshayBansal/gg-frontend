import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShoppingCart, Star, Sparkles,
  Cpu, Radio, Cog, BatteryCharging, CircuitBoard,
  Zap, TrendingUp, Clock, Users, Plug, Shield,
  ChevronLeft, ChevronRight, MessageSquare
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';

/* ── Slideshow states ── */
const slideshowStates = [
  {
    id: 'widget',
    label: 'Widget on your site',
    content: (
      <div className="p-6 md:p-10">
        {/* Fake storefront */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-[4px] bg-[#0F172A] flex items-center justify-center">
            <span className="text-white text-[11px] font-bold">TB</span>
          </div>
          <span className="text-[15px] font-bold text-[#0F172A]">TechBazaar</span>
          <div className="ml-auto flex gap-4 text-[12px] text-[#94A3B8]">
            <span>Products</span><span>Categories</span><span>Cart (0)</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {['Arduino Uno', 'Raspberry Pi 4', 'ESP32 DevKit'].map((item) => (
            <div key={item} className="bg-[#F8FAFC] rounded-[3px] p-4 text-center">
              <div className="w-full h-16 bg-[#E2E8F0] rounded-[2px] mb-3" />
              <p className="text-[11px] font-semibold text-[#0F172A]">{item}</p>
            </div>
          ))}
        </div>
        {/* Floating widget */}
        <div className="flex justify-end">
          <div className="w-12 h-12 rounded-[4px] bg-[#5B6EFF] flex items-center justify-center shadow-lg shadow-[#5B6EFF]/25 cursor-pointer">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'query',
    label: 'User asks a question',
    content: (
      <div className="p-6 md:p-10">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-7 h-7 rounded-[4px] bg-[#5B6EFF]/10 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-[#5B6EFF]" />
          </div>
          <span className="text-[13px] font-bold text-[#0F172A] flex items-center gap-1.5">
            <img src="/assets/name.svg" alt="GenuineGig" className="h-3 min-w-[70px]" /> Assistant
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
          </span>
        </div>
        <div className="flex justify-end mb-5">
          <div className="bg-[#5B6EFF] text-white px-4 py-2.5 rounded-[5px] rounded-br-[2px] text-[13px] font-medium max-w-[260px]">
            I want to build a line following robot
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-[3px] bg-[#5B6EFF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-3 h-3 text-[#5B6EFF]" />
          </div>
          <div>
            <div className="flex gap-1 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5B6EFF] animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#5B6EFF] animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#5B6EFF] animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-[13px] text-[#475569]">Analyzing your project requirements...</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'components',
    label: 'AI suggests components',
    content: (
      <div className="p-6 md:p-10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded-[4px] bg-[#5B6EFF]/10 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-[#5B6EFF]" />
          </div>
          <span className="text-[13px] font-bold text-[#0F172A] flex items-center gap-1.5">
            <img src="/assets/name.svg" alt="GenuineGig" className="h-3 min-w-[70px]" /> Assistant
          </span>
        </div>
        <p className="text-[13px] text-[#475569] mb-4">
          Here are the components for your line following robot:
        </p>
        <div className="space-y-0">
          {[
            { name: 'Arduino Uno R3', desc: 'Microcontroller board', price: '₹549', icon: CircuitBoard },
            { name: 'IR Sensor Module (×2)', desc: 'Line detection sensors', price: '₹120', icon: Radio },
            { name: 'DC Geared Motors (×2)', desc: '200 RPM with gearbox', price: '₹180', icon: Cog },
            { name: 'L298N Motor Driver', desc: 'Dual H-bridge driver', price: '₹210', icon: Cpu },
            { name: '9V Battery Pack', desc: 'Rechargeable supply', price: '₹95', icon: BatteryCharging },
          ].map((part, i, arr) => (
            <div key={part.name} className={`flex items-center justify-between py-3.5 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-[3px] bg-[#F8FAFC] flex items-center justify-center flex-shrink-0">
                  <part.icon className="w-3.5 h-3.5 text-[#5B6EFF]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-bold text-[#0F172A]">{part.name}</div>
                  <div className="text-[10px] text-[#94A3B8]">{part.desc}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 flex-shrink-0 ml-3">
                <span className="text-[12px] font-bold text-[#0F172A]">{part.price}</span>
                <button className="px-2.5 py-1 text-[10px] font-semibold text-[#5B6EFF] border border-[#5B6EFF]/20 hover:bg-[#5B6EFF]/5 rounded-[3px] transition-colors flex items-center gap-1">
                  <ShoppingCart className="w-2.5 h-2.5" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

/* ── Business cards ── */
const businessCards = [
  {
    icon: TrendingUp,
    title: 'Revenue Growth',
    desc: 'AI recommendations increase average order value by surfacing complementary products customers actually need.',
    highlight: '+40% AOV',
  },
  {
    icon: Zap,
    title: 'Higher Conversions',
    desc: 'Guided product discovery reduces choice paralysis and turns browsers into buyers.',
    highlight: '3× conversion',
  },
  {
    icon: Clock,
    title: 'Time Saved',
    desc: 'Customers find what they need in seconds, not minutes. Support tickets drop dramatically.',
    highlight: '-60% tickets',
  },
  {
    icon: Users,
    title: 'Better Experience',
    desc: 'Natural language interface makes your store feel intelligent. Customers return because it works.',
    highlight: '92% satisfaction',
  },
  {
    icon: Plug,
    title: 'Easy Integration',
    desc: 'One script tag. Works with Shopify, WooCommerce, and custom storefronts. Live in under 10 minutes.',
    highlight: '<10 min setup',
  },
  {
    icon: Shield,
    title: 'Competitive Edge',
    desc: 'Most stores still use basic search. AI-powered assistance sets you apart from every competitor.',
    highlight: 'First-mover',
  },
];

/* ── Testimonials ── */
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Founder, FreshBasket',
    quote: 'Our average cart size went up 40%. Customers describe what they need and the AI handles the rest.',
  },
  {
    name: 'Rahul Mehra',
    role: 'CTO, StyleStreet',
    quote: 'Integration took under 10 minutes. The component suggestions are incredibly accurate.',
  },
  {
    name: 'Ankit Patel',
    role: 'CEO, TechBazaar',
    quote: 'Support tickets dropped 60%. Customers get instant recommendations instead of waiting.',
  },
];

export default function LandingPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slideshowStates.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slideshowStates.length) % slideshowStates.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative pt-28 pb-10 md:pt-36 md:pb-16 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, rgba(91,110,255,0.15) 0%, rgba(91,110,255,0.08) 40%, rgba(255,255,255,1) 70%)',
        }} />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-[13px] font-bold text-[#5B6EFF] tracking-widest uppercase mb-5"
          >
            AI-Powered Product Assistant
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-[46px] md:text-[60px] lg:text-[68px] font-extrabold tracking-[-0.04em] leading-[1.05] text-[#0F172A] mb-6 max-w-3xl mx-auto"
          >
            Build what you need, smarter with&nbsp;AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[17px] text-[#475569] max-w-xl mx-auto mb-10 leading-[1.7]"
          >
            Describe your project. Get the exact components. Add what you need — one item at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center justify-center gap-3"
          >
            <Link to="/register">
              <button className="h-10 px-6 text-[14px] font-semibold text-white bg-[#5B6EFF] hover:bg-[#3F51D1] rounded-[5px] transition-all hover:shadow-lg hover:shadow-[#5B6EFF]/15 flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a href="#demo">
              <button className="h-10 px-6 text-[14px] font-semibold text-[#475569] hover:text-[#0F172A] border border-gray-200 hover:border-gray-300 rounded-[5px] transition-all">
                See Demo
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ PRODUCT DEMO — Slideshow ════════════════ */}
      <section id="demo" className="pb-12 md:pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="border border-gray-200 rounded-[5px] overflow-hidden bg-white shadow-sm">
              {/* Slide tabs */}
              <div className="flex border-b border-gray-100">
                {slideshowStates.map((state, i) => (
                  <button
                    key={state.id}
                    onClick={() => setActiveSlide(i)}
                    className={`flex-1 py-3 text-[12px] font-semibold transition-colors ${activeSlide === i
                      ? 'text-[#5B6EFF] border-b-2 border-[#5B6EFF] bg-[#5B6EFF]/[0.03]'
                      : 'text-[#94A3B8] hover:text-[#475569]'
                      }`}
                  >
                    {state.label}
                  </button>
                ))}
              </div>

              {/* Slide content */}
              <div className="min-h-[340px] relative">
                {slideshowStates[activeSlide].content}
              </div>

              {/* Navigation dots + arrows */}
              <div className="flex items-center justify-between px-6 py-3 bg-[#F8FAFC]">
                <button onClick={prevSlide} className="w-7 h-7 rounded-[3px] flex items-center justify-center text-[#94A3B8] hover:text-[#0F172A] hover:bg-white transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1.5">
                  {slideshowStates.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${activeSlide === i ? 'w-5 bg-[#5B6EFF]' : 'w-1.5 bg-[#CBD5E1]'
                        }`}
                    />
                  ))}
                </div>
                <button onClick={nextSlide} className="w-7 h-7 rounded-[3px] flex items-center justify-center text-[#94A3B8] hover:text-[#0F172A] hover:bg-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ HOW IT WORKS ════════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[13px] font-bold text-[#5B6EFF] tracking-widest uppercase mb-4">HOW IT WORKS</p>
            <h2 className="text-[36px] md:text-[46px] font-bold tracking-[-0.025em] text-[#0F172A]">
              Three steps to your next build
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-16 md:gap-10 max-w-4xl mx-auto">
            {[
              { n: '01', title: 'Describe your need', desc: 'Tell the AI what you want to build — a robot, a smart home kit, or anything else.' },
              { n: '02', title: 'AI suggests components', desc: 'Get an instant, curated list of exactly the parts you need with descriptions and prices.' },
              { n: '03', title: 'Add items to your cart', desc: "Review each suggestion and add the ones you want. You're always in control." },
            ].map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.08}>
                <div className="bg-white border border-gray-100 rounded-[4px] p-7 h-full hover:border-gray-200 hover:shadow-sm transition-all">
                  <span className="text-[11px] font-bold text-[#5B6EFF] tracking-widest bg-[#5B6EFF]/[0.06] px-2 py-0.5 rounded-[2px]">{s.n}</span>
                  <h3 className="text-[16px] font-bold text-[#0F172A] mt-4 mb-2">{s.title}</h3>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ HOW IT HELPS YOUR BUSINESS ════════════════ */}
      <section className="py-16 md:py-24 bg-[#5B6EFF]/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[13px] font-bold text-[#5B6EFF] tracking-widest uppercase mb-4">
              BUILT FOR ECOMMERCE GROWTH
            </p>
            <h2 className="text-[36px] md:text-[46px] font-bold tracking-[-0.025em] text-[#0F172A]">
              How it helps your business
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {businessCards.map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.05}>
                <div className="bg-white border border-gray-100 rounded-[4px] p-7 h-full hover:border-gray-200 hover:shadow-sm transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-9 h-9 rounded-[3px] bg-[#5B6EFF]/[0.07] flex items-center justify-center">
                      <card.icon className="w-4 h-4 text-[#5B6EFF]" />
                    </div>
                    <span className="text-[11px] font-bold text-[#5B6EFF] tracking-wide bg-[#5B6EFF]/[0.06] px-2 py-0.5 rounded-[2px]">
                      {card.highlight}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0F172A] mb-2">{card.title}</h3>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{card.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ TESTIMONIALS ════════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[13px] font-bold text-[#5B6EFF] tracking-widest uppercase mb-4">TESTIMONIALS</p>
            <h2 className="text-[36px] md:text-[46px] font-bold tracking-[-0.025em] text-[#0F172A]">
              Trusted by ecommerce leaders
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.06}>
                <div className="bg-white border border-gray-100 rounded-[4px] p-7 h-full hover:border-gray-200 hover:shadow-sm transition-all">
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[14px] text-[#334155] leading-[1.75] mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-[13px] font-bold text-[#0F172A]">{t.name}</p>
                    <p className="text-[12px] text-[#94A3B8]">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CUSTOM AI ════════════════ */}
      <section className="py-16 md:py-24 bg-[#5B6EFF]/[0.02]">
        <div className="max-w-xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-[13px] font-bold text-[#5B6EFF] tracking-widest uppercase mb-4">CUSTOM SOLUTIONS</p>
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.025em] text-[#0F172A] mb-4">
              Need a custom AI for your&nbsp;store?
            </h2>
            <p className="text-[#475569] mb-8 text-[15px] leading-relaxed">
              Every business is different. Tell us what you need and we&rsquo;ll build a tailored assistant for your catalog.
            </p>
            <Link to="/contact">
              <button className="h-10 px-6 text-[14px] font-semibold text-[#475569] hover:text-[#0F172A] border border-gray-200 hover:border-gray-300 rounded-[5px] transition-all inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Request Custom AI
              </button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
