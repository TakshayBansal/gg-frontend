import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, CircuitBoard, Home, Plug, Settings, Rocket } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';

const useCases = [
  {
    icon: Wrench,
    title: 'Robotics & Automation',
    desc: 'Users describe a project, and AI recommends compatible components — motors, sensors, controllers.',
    example: '"I want to build a line following robot"',
  },
  {
    icon: CircuitBoard,
    title: 'DIY Electronics',
    desc: 'From Arduino starter kits to signal generators, get accurate part lists for any project.',
    example: '"I need parts for an LED matrix display"',
  },
  {
    icon: Home,
    title: 'Smart Home Kits',
    desc: 'Build automation setups with compatible sensors, relays, and connectivity modules.',
    example: '"I want to automate my garden watering"',
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-32 pb-8 md:pt-44 md:pb-12 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, rgba(91,110,255,0.08) 0%, rgba(91,110,255,0.04) 40%, rgba(255,255,255,1) 70%)',
        }} />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-[13px] font-bold text-[#5B6EFF] tracking-widest uppercase mb-4">PRODUCT</p>
            <h1 className="text-[42px] md:text-[56px] font-extrabold tracking-[-0.035em] text-[#0F172A] mb-4">
              AI that knows your inventory
            </h1>
            <p className="text-base text-[#475569] max-w-lg mx-auto leading-relaxed">
              GenuineGigs suggests the right components for any project — and lets customers add each one individually.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 md:gap-10">
            {useCases.map((uc, i) => (
              <AnimatedSection key={uc.title} delay={i * 0.06}>
                <div className="bg-white border border-gray-100 rounded-[4px] p-7 h-full hover:border-gray-200 hover:shadow-sm transition-all flex flex-col">
                  <div className="w-10 h-10 rounded-[4px] bg-[#5B6EFF]/8 flex items-center justify-center mb-5">
                    <uc.icon className="w-5 h-5 text-[#5B6EFF]" />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0F172A] mb-2">{uc.title}</h3>
                  <p className="text-[13px] text-[#475569] leading-relaxed mb-3">{uc.desc}</p>
                  <p className="text-[12px] text-[#94A3B8] italic mb-5">{uc.example}</p>
                  <Link to="/register" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#5B6EFF] hover:text-[#3F51D1] transition-colors mt-auto">
                    Try Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#5B6EFF]/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[13px] font-bold text-[#5B6EFF] tracking-widest uppercase mb-4">HOW IT WORKS</p>
            <h2 className="text-[34px] md:text-[44px] font-bold tracking-[-0.025em] text-[#0F172A]">
              Get started in three steps
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-16 md:gap-10 max-w-4xl mx-auto">
            {[
              { n: '01', icon: Plug, title: 'Connect', desc: 'Add a single script tag to your store. Works with any platform.' },
              { n: '02', icon: Settings, title: 'Configure', desc: 'Upload inventory and customize the AI assistant widget.' },
              { n: '03', icon: Rocket, title: 'Launch', desc: 'Go live and let AI help customers find the right products.' },
            ].map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.08}>
                <div className="bg-white border border-gray-100 rounded-[4px] p-7 h-full hover:border-gray-200 hover:shadow-sm transition-all text-center">
                  <div className="w-10 h-10 rounded-[4px] bg-[#5B6EFF]/8 flex items-center justify-center mx-auto mb-5">
                    <s.icon className="w-5 h-5 text-[#5B6EFF]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#5B6EFF] tracking-widest bg-[#5B6EFF]/[0.06] px-2 py-0.5 rounded-[2px]">{s.n}</span>
                  <h3 className="text-[16px] font-bold text-[#0F172A] mt-3 mb-2">{s.title}</h3>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.25}>
            <div className="text-center mt-16">
              <Link to="/register">
                <button className="px-6 py-2.5 text-sm font-semibold text-white bg-[#5B6EFF] hover:bg-[#3F51D1] rounded-[5px] transition-all hover:shadow-lg hover:shadow-[#5B6EFF]/15 inline-flex items-center gap-2">
                  Start Building <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
