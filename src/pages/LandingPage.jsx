import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Bot, Code2, BarChart3, ArrowRight, Check,
  Cpu, Sparkles, Globe, Shield, ChevronRight,
  MessageSquare, Package, Layers, TrendingUp,
  Clock, DollarSign, Users, Target, ShieldCheck
} from 'lucide-react';
import Button from '../components/ui/Button';
import GradientText from '../components/ui/GradientText';
import AnimatedSection from '../components/ui/AnimatedSection';
import Badge from '../components/ui/Badge';

/* ── Service cards (matches Figma "AI Solutions for Every Business") ── */
const services = [
  {
    icon: Bot,
    title: 'AI Automation',
    desc: 'Streamline your workflows with intelligent automation that handles repetitive tasks, freeing your team to focus on strategic growth.',
    bullets: ['Process Automation', 'Smart Workflows', 'Error Reduction'],
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    desc: 'Provide 24/7 customer support with intelligent chatbots that understand context and deliver personalized responses.',
    bullets: ['24/7 Support', 'Multi-language', 'Lead Qualification'],
  },
  {
    icon: BarChart3,
    title: 'Predictive Analytics',
    desc: 'Make data-driven decisions with AI-powered analytics that predict trends and identify growth opportunities.',
    bullets: ['Sales Forecasting', 'Market Analysis', 'Risk Assessment'],
  },
  {
    icon: Users,
    title: 'Customer Intelligence',
    desc: 'Understand your customers better with AI that analyzes behavior patterns and predicts preferences.',
    bullets: ['Behavior Analysis', 'Churn Prediction', 'Segmentation'],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    desc: 'Optimize your business performance with AI that continuously monitors and improves your operations.',
    bullets: ['Real-time Monitoring', 'Auto-scaling', 'Cost Optimization'],
  },
  {
    icon: Shield,
    title: 'AI Security',
    desc: 'Protect your business with AI-powered security solutions that detect and prevent threats in real-time.',
    bullets: ['Threat Detection', 'Data Protection', 'Compliance'],
  },
];

/* ── "Why Choose" benefits (matches Figma grid) ── */
const benefits = [
  { icon: TrendingUp, title: 'Exponential Growth', desc: 'Scale your business operations without proportionally increasing costs or complexity.', stat: '300% Average ROI' },
  { icon: Clock, title: 'Time Savings', desc: 'Automate repetitive tasks and free up your team to focus on strategic initiatives.', stat: '40+ Hours/Week Saved' },
  { icon: DollarSign, title: 'Cost Reduction', desc: 'Reduce operational costs while improving efficiency and output quality.', stat: '60% Cost Reduction' },
  { icon: Users, title: 'Better Customer Experience', desc: 'Provide personalized, 24/7 customer service that delights and retains customers.', stat: '95% Satisfaction Rate' },
  { icon: Target, title: 'Data-Driven Decisions', desc: 'Make informed decisions based on AI-powered insights and predictive analytics.', stat: '85% Accuracy Improvement' },
  { icon: ShieldCheck, title: 'Competitive Advantage', desc: 'Stay ahead of the competition with cutting-edge AI technology and innovation.', stat: '2x Faster Implementation' },
];

/* ── Pricing (matches Figma "Choose Your AI Journey") ── */
const plans = [
  {
    badge: '🖥 Perfect Start',
    name: 'AI Strategy Consultation',
    desc: 'Expert guidance to discover and plan your AI transformation journey',
    price: '$0',
    priceSuffix: 'forever',
    features: [
      '25 AI queries / month',
      'Single store integration',
      'Basic analytics dashboard',
      'Community support',
      'Widget embedding',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    badge: '🚀 Full Solution',
    name: 'Complete AI Automation',
    desc: 'Full-scale AI implementation to automate and scale your business operations',
    price: '$29',
    priceSuffix: '/month',
    features: [
      'Unlimited AI queries',
      'Priority response speed',
      'Advanced analytics & insights',
      'Custom widget branding',
      'API access',
      'Priority support',
      'Multiple store support',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white overflow-x-hidden">

      {/* ══════════════════════════════════════════
          NAVIGATION — clean dark bar, teal CTA
          ══════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-surface-600/30 bg-surface-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-accent" />
            </div>
            <span className="font-bold text-lg tracking-tight text-accent">ElectroAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-surface-400 font-medium">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO — matches Figma "jade cobra" hero
          ══════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28">
        {/* Bg glow — green radial */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-accent/[0.06] blur-[150px]" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-600/[0.04] blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="brand" className="mb-8">
              <Bot className="w-3 h-3" /> AI-Powered Business Transformation
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          >
            Transform Your Business with
            <br />
            <GradientText>Intelligent AI</GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From strategic AI consultation to complete automation implementation.
            Unlock exponential growth with cutting-edge AI solutions designed for
            everyday businesses ready to scale intelligently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/register">
              <Button size="lg">
                Book AI Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#services">
              <Button variant="secondary" size="lg">
                <MessageSquare className="w-4 h-4" /> Try AI Chat
              </Button>
            </a>
          </motion.div>

          {/* ── Stats row (from Figma) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-12 md:gap-20"
          >
            {[
              { icon: TrendingUp, value: '300%', label: 'Average ROI Increase' },
              { icon: Zap, value: '40+', label: 'Hours Saved Weekly' },
              { icon: Bot, value: '24/7', label: 'AI Operations' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <stat.icon className="w-4 h-4 text-accent/70" />
                  <span className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</span>
                </div>
                <span className="text-xs text-surface-400 font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES — matches Figma "AI Solutions for Every Business"
          3×2 grid, dark cards, icon + title + desc + bullet list
          ══════════════════════════════════════════ */}
      <section id="services" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-[42px] font-bold tracking-tight mb-5 leading-tight">
              AI Solutions for <GradientText>Every Business</GradientText>
            </h2>
            <p className="text-surface-400 max-w-2xl mx-auto leading-relaxed">
              Discover our comprehensive suite of AI-powered tools designed to transform
              your business operations and accelerate growth.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.06}>
                <div className="group p-7 rounded-2xl bg-surface-800/60 border border-surface-600/30 hover:border-accent/15 hover:bg-surface-800/80 transition-all duration-300 h-full">
                  {/* Icon container — teal bg like Figma */}
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
                    <s.icon className="w-5 h-5 text-accent" />
                  </div>

                  <h3 className="font-bold text-white text-lg mb-2.5">{s.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed mb-5">{s.desc}</p>

                  {/* Bullet list — matches Figma dot list */}
                  <ul className="space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-surface-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE — matches Figma "Why Choose AI Scale"
          3×2 grid, centered icon + title + desc + stat badge
          ══════════════════════════════════════════ */}
      <section id="benefits" className="py-20 md:py-28 border-t border-surface-700/40">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-[42px] font-bold tracking-tight mb-5 leading-tight">
              Why Choose <GradientText>ElectroAI</GradientText>
            </h2>
            <p className="text-surface-400 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses that have transformed their operations and achieved
              remarkable growth with our AI solutions.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.06}>
                <div className="flex flex-col items-center text-center">
                  {/* Icon — large rounded circle, teal bg */}
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-5">
                    <b.icon className="w-6 h-6 text-accent" />
                  </div>

                  <h3 className="font-bold text-white text-lg mb-2.5">{b.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed mb-4 max-w-xs">{b.desc}</p>

                  {/* Stat badge — green bg like Figma */}
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-wide">
                    {b.stat}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCT SHOWCASE — Electronics AI Agent
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-t border-surface-700/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <Badge variant="brand" className="mb-5">
                <Bot className="w-3 h-3" /> Featured Product
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                Electronics AI Agent
              </h2>
              <p className="text-surface-400 mb-8 leading-relaxed">
                An intelligent assistant that lives on your website. It understands electronics projects,
                maps requirements to your inventory, and checks component compatibility — all automatically.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Understands natural language project descriptions',
                  'Maps generic needs to your exact inventory',
                  'Real-time voltage & interface compatibility',
                  'Shadow DOM — works on any website',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm text-surface-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/register">
                <Button>
                  Try Electronics Agent <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </AnimatedSection>

            {/* Chat widget preview */}
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl border border-surface-600/40 bg-surface-800/60 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Project Assistant</h4>
                      <p className="text-xs text-accent flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Online
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="flex justify-end">
                    <div className="bg-accent/15 text-accent-50 px-4 py-2.5 rounded-2xl rounded-br-sm text-sm max-w-xs border border-accent/10">
                      I need a weather monitoring station
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-surface-700/70 border border-surface-600/40 px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-surface-200 max-w-xs">
                      I'd recommend these components for your weather station:
                    </div>
                  </div>
                </div>
                {/* Fake component cards */}
                <div className="space-y-2">
                  {[
                    { name: 'BME280 Sensor', cat: 'Sensor', price: '$8.50', stock: '45' },
                    { name: 'ESP32 DevKit', cat: 'Microcontroller', price: '$12.00', stock: '23' },
                    { name: 'OLED Display 0.96"', cat: 'Display', price: '$6.75', stock: '31' },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-900/60 border border-surface-600/30">
                      <div>
                        <div className="text-xs font-semibold text-white">{c.name}</div>
                        <div className="text-[10px] text-surface-400">{c.cat}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-accent">{c.price}</div>
                        <div className="text-[10px] text-surface-500">{c.stock} in stock</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRICING — matches Figma "Choose Your AI Journey"
          Large teal price numbers, structured cards
          ══════════════════════════════════════════ */}
      <section id="pricing" className="py-20 md:py-28 border-t border-surface-700/40">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-4">
            <Badge variant="brand" className="mb-5">
              <Sparkles className="w-3 h-3" /> AI-Powered Solutions
            </Badge>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-[42px] font-bold tracking-tight mb-5 leading-tight">
              Choose Your <GradientText>AI Journey</GradientText>
            </h2>
            <p className="text-surface-400 max-w-2xl mx-auto leading-relaxed">
              Whether you need strategic guidance or full AI implementation, we have the perfect
              solution to transform your business with intelligent automation.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <div
                  className={`relative p-8 rounded-2xl border h-full flex flex-col ${
                    plan.popular
                      ? 'border-accent/25 bg-surface-800/80 shadow-[0_0_40px_rgba(0,217,166,0.06)]'
                      : 'border-surface-600/40 bg-surface-800/50'
                  }`}
                >
                  {/* Badge */}
                  <div className="mb-6">
                    <Badge variant={plan.popular ? 'brand' : 'neutral'}>{plan.badge}</Badge>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-5">
                    {plan.popular ? (
                      <Bot className="w-5 h-5 text-accent" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-accent" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-surface-400 mb-6 leading-relaxed">{plan.desc}</p>

                  {/* Large price — teal like Figma */}
                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-extrabold text-accent">{plan.price}</span>
                    <span className="text-surface-400 text-sm ml-2">{plan.priceSuffix}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-surface-300">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link to="/register">
                    <Button
                      variant={plan.popular ? 'primary' : 'secondary'}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
          ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="relative rounded-3xl border border-surface-600/30 bg-surface-800/50 p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-accent/[0.06] blur-[120px]" />
              </div>
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to scale intelligently?
                </h2>
                <p className="text-surface-400 mb-8 max-w-md mx-auto">
                  Join electronics stores already using AI to help customers find the right components.
                </p>
                <Link to="/register">
                  <Button size="lg">
                    Get Started Free <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════ */}
      <footer className="border-t border-surface-700/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-accent" />
              </div>
              <span className="font-bold text-sm text-accent">ElectroAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-surface-400">
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <Link to="/login" className="hover:text-white transition-colors">Dashboard</Link>
            </div>
            <p className="text-xs text-surface-500">
              © 2026 ElectroAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
