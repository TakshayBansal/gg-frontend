import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Product', path: '/product' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo — icon + name separately sized */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
          <img
            src="/assets/logo.svg"
            alt="GenuineGig"
            className="h-8 w-auto"
          />
          <img
            src="/assets/name.svg"
            alt="GenuineGig"
            className="h-[25px] w-auto mt-1"
          />
        </Link>

        {/* Right side — nav links + CTA grouped together */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`text-[14px] font-semibold transition-colors ${location.pathname === path
                ? 'text-[#0F172A]'
                : 'text-[#0F172A]/70 hover:text-[#0F172A]/45'
                }`}
            >
              {label}
            </Link>
          ))}

          <Link
            to="/login"
            className={`text-[14px] font-semibold transition-colors ${location.pathname === '/login'
              ? 'text-[#0F172A]'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]/45'
              }`}
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-[14px] font-semibold text-white bg-[#5B6EFF] hover:bg-[#3F51D1] rounded-[5px] transition-all hover:shadow-lg hover:shadow-[#5B6EFF]/15"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#0F172A]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white px-6 py-5 space-y-1 border-t border-gray-50 animate-slide-down">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 text-[15px] font-semibold ${location.pathname === path
                ? 'text-[#0F172A]'
                : 'text-[#0F172A]/60'
                }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-gray-50 space-y-2">
            <Link to="/login" onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-[15px] font-semibold text-[#0F172A]/60">
              Log in
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 rounded-[5px] text-[15px] font-semibold text-center text-white bg-[#5B6EFF]">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
