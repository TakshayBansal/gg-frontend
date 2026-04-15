import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';

const plans = [
  {
    name: 'Starter',
    desc: 'For small stores getting started.',
    price: '$0',
    priceSuffix: 'forever',
    features: ['25 AI queries / month', 'Single store integration', 'Basic analytics', 'Community support', 'Widget embedding'],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Growth',
    desc: 'For growing businesses that need scale.',
    price: '$29',
    priceSuffix: '/mo',
    features: ['Unlimited AI queries', 'Priority response speed', 'Advanced analytics', 'Custom branding', 'API access', 'Priority support', 'Multiple stores'],
    cta: 'Upgrade to Growth',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    desc: 'Custom solutions for large operations.',
    price: 'Custom',
    priceSuffix: '',
    features: ['Everything in Growth', 'Dedicated account manager', 'Custom AI training', 'SLA guarantees', 'On-premise deployment', 'White-label solution', 'Custom integrations'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-32 pb-4 md:pt-44 md:pb-8 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, rgba(91,110,255,0.08) 0%, rgba(91,110,255,0.04) 40%, rgba(255,255,255,1) 70%)',
        }} />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-[13px] font-bold text-[#5B6EFF] tracking-widest uppercase mb-4">PRICING</p>
            <h1 className="text-[42px] md:text-[56px] font-extrabold tracking-[-0.035em] text-[#0F172A] mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-base text-[#475569] max-w-lg mx-auto leading-relaxed">
              Start free, scale when you're ready. No hidden fees.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-0 md:border md:border-gray-200 md:rounded-[6px] overflow-hidden">
            {plans.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 0.08}>
                <div className={`relative p-8 h-full flex flex-col ${
                  plan.highlighted ? 'bg-[#0F172A] text-white' : 'bg-white'
                } ${i < plans.length - 1 ? 'md:border-r md:border-gray-200' : ''} ${
                  i > 0 ? 'border-t md:border-t-0 border-gray-100' : ''
                }`}>
                  {plan.highlighted && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-[3px] text-[10px] font-bold bg-[#5B6EFF] text-white tracking-wider">POPULAR</span>
                  )}

                  <h3 className={`text-lg font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-[#0F172A]'}`}>{plan.name}</h3>
                  <p className={`text-[13px] mb-6 ${plan.highlighted ? 'text-gray-400' : 'text-[#475569]'}`}>{plan.desc}</p>

                  <div className="mb-8">
                    <span className={`text-[42px] font-extrabold tracking-tight ${plan.highlighted ? 'text-white' : 'text-[#0F172A]'}`}>{plan.price}</span>
                    {plan.priceSuffix && <span className={`text-sm ml-1 ${plan.highlighted ? 'text-gray-400' : 'text-[#94A3B8]'}`}>{plan.priceSuffix}</span>}
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2.5 text-[13px] ${plan.highlighted ? 'text-gray-300' : 'text-[#475569]'}`}>
                        <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-[#5B6EFF]' : 'text-[#5B6EFF]'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link to={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                    <button className={`w-full px-5 py-2.5 text-sm font-semibold rounded-[5px] transition-all flex items-center justify-center gap-2 ${
                      plan.highlighted ? 'text-[#0F172A] bg-white hover:bg-gray-100' : 'text-[#5B6EFF] border border-gray-200 hover:border-[#5B6EFF]/30 bg-transparent'
                    }`}>
                      {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#5B6EFF]/[0.02]">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-[28px] font-bold tracking-[-0.02em] text-[#0F172A]">Compare plans</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white border border-gray-200 rounded-[5px] shadow-sm p-6 sm:p-8 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 pr-4 font-semibold text-[#94A3B8] text-[13px] whitespace-nowrap">Feature</th>
                      <th className="text-center py-3 px-3 font-semibold text-[#94A3B8] text-[13px] whitespace-nowrap">Starter</th>
                      <th className="text-center py-3 px-3 font-bold text-[#0F172A] text-[13px] whitespace-nowrap">Growth</th>
                      <th className="text-center py-3 px-3 font-semibold text-[#94A3B8] text-[13px] whitespace-nowrap">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['AI Queries', '25/mo', 'Unlimited', 'Unlimited'],
                      ['Stores', '1', 'Multiple', 'Unlimited'],
                      ['Analytics', 'Basic', 'Advanced', 'Custom'],
                      ['Widget Branding', '—', '✓', '✓'],
                      ['API Access', '—', '✓', '✓'],
                      ['Custom Training', '—', '—', '✓'],
                      ['Support', 'Community', 'Priority', 'Dedicated'],
                    ].map(([feature, ...values]) => (
                      <tr key={feature} className="border-b whitespace-nowrap border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 text-[#334155] font-medium text-[13px]">{feature}</td>
                        {values.map((val, j) => (
                          <td key={j} className="py-3 px-3 text-center text-[#475569] text-[13px]">
                            {val === '✓' ? <Check className="w-4 h-4 text-[#5B6EFF] mx-auto" /> : val === '—' ? <span className="text-[#CBD5E1]">—</span> : val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
