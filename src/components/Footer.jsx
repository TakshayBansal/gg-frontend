import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Product', path: '/product' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
  { label: 'Dashboard', path: '/login' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="max-w-xs">
            <Link to="/" className="inline-block mb-4">
              <img src="/assets/full.svg" alt="GenuineGig" className="h-6 w-auto" />
            </Link>
            <p className="text-sm text-[#475569] leading-relaxed">
              AI-powered assistants that help customers find exactly the right products.
            </p>
          </div>

          <div className="flex gap-14">
            <div>
              <h4 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-widest mb-4">Product</h4>
              <div className="space-y-2.5">
                {footerLinks.map(({ label, path }) => (
                  <Link key={path} to={path} className="block text-sm text-[#475569] hover:text-[#0F172A] transition-colors">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-widest mb-4">Company</h4>
              <div className="space-y-2.5">
                <a href="#" className="block text-sm text-[#475569] hover:text-[#0F172A] transition-colors">Privacy</a>
                <a href="#" className="block text-sm text-[#475569] hover:text-[#0F172A] transition-colors">Terms</a>
                <a href="mailto:hello@genuinegig.com" className="block text-sm text-[#475569] hover:text-[#0F172A] transition-colors">hello@genuinegig.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-gray-100">
          <p className="text-xs text-[#94A3B8]">© 2026 GenuineGig. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
