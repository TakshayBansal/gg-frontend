import { useState } from 'react';
import { Send, Building2, Globe, FileText } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', business_type: '', website: '', requirements: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const inputClass = "w-full px-4 py-2.5 rounded-[5px] text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#F8FAFC] border-none focus:outline-none focus:ring-2 focus:ring-[#5B6EFF]/20 transition-all";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, rgba(91,110,255,0.08) 0%, rgba(91,110,255,0.04) 40%, rgba(255,255,255,1) 70%)',
        }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <AnimatedSection>
              <p className="text-[13px] font-bold text-[#5B6EFF] tracking-widest uppercase mb-4">GET IN TOUCH</p>
              <h1 className="text-[42px] md:text-[52px] font-extrabold tracking-[-0.035em] text-[#0F172A] mb-5 leading-[1.1]">
                Need a custom AI&nbsp;assistant?
              </h1>
              <p className="text-base text-[#475569] mb-12 leading-relaxed max-w-md">
                Share your requirements and our team will design a tailored AI solution for your store.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Building2, title: 'Custom Solutions', desc: 'AI assistants built for your industry and catalog.' },
                  { icon: Globe, title: 'Any Platform', desc: 'Works with Shopify, WooCommerce, custom sites, and more.' },
                  { icon: FileText, title: 'Free Consultation', desc: 'We\'ll analyze your store and recommend the best strategy.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-[4px] bg-[#5B6EFF]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-[#5B6EFF]" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0F172A] mb-0.5">{item.title}</h4>
                      <p className="text-[13px] text-[#475569]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <div className="bg-white border border-gray-200 rounded-[5px] shadow-sm p-6 sm:p-8">
                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="w-12 h-12 rounded-[5px] bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">Request Sent</h3>
                    <p className="text-sm text-[#475569]">We'll review your requirements and get back within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-[13px] font-semibold text-[#0F172A] mb-1.5 block">Name</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-[#0F172A] mb-1.5 block">Business Type</label>
                      <input type="text" required value={form.business_type} onChange={(e) => setForm({ ...form, business_type: e.target.value })} className={inputClass} placeholder="e.g., Electronics, Robotics, DIY" />
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-[#0F172A] mb-1.5 block">Website</label>
                      <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputClass} placeholder="https://yourstore.com" />
                    </div>
                    <div>
                      <label className="text-[13px] font-semibold text-[#0F172A] mb-1.5 block">Requirements</label>
                      <textarea rows={4} required value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className={`${inputClass} resize-none`} placeholder="Describe what you want your AI assistant to do..." />
                    </div>
                    <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-[#5B6EFF] hover:bg-[#3F51D1] rounded-[5px] transition-all hover:shadow-lg hover:shadow-[#5B6EFF]/15 inline-flex items-center gap-2">
                      <Send className="w-4 h-4" /> Submit Request
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
