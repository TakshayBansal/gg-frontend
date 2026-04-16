import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';
import { Mail, Lock, User, Store, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', full_name: '', store_name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authAPI.register(form);
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('store_id', res.data.store_id);
      localStorage.setItem('api_key', res.data.api_key);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border-none rounded-[5px] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#5B6EFF]/20 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(91,110,255,0.15) 0%, rgba(91,110,255,0.08) 40%, rgba(255,255,255,1) 70%)',
      }} />
      <div className="w-full max-w-sm animate-fade-in relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src="/assets/full.svg" alt="GenuineGig" className="h-6 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Create your account</h1>
          <p className="text-[#475569] mt-1 text-sm">Set up your store in seconds</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-[5px] shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 px-4 py-2.5 rounded-[5px] text-[13px] font-medium">{error}</div>}

          <div>
            <label className="text-[13px] font-semibold text-[#0F172A] mb-1.5 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input id="register-name" type="text" value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className={inputClass} placeholder="John Doe" />
            </div>
          </div>

          <div>
            <label className="text-[13px] font-semibold text-[#0F172A] mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input id="register-email" type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass} placeholder="your@email.com" />
            </div>
          </div>

          <div>
            <label className="text-[13px] font-semibold text-[#0F172A] mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input id="register-password" type={showPass ? 'text' : 'password'} required value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`${inputClass} !pr-10`} placeholder="Min 6 characters" minLength={6} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[13px] font-semibold text-[#0F172A] mb-1.5 block">Store Name</label>
            <div className="relative">
              <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input id="register-store" type="text" required value={form.store_name}
                onChange={(e) => setForm({ ...form, store_name: e.target.value })}
                className={inputClass} placeholder="My Awesome Store" />
            </div>
          </div>

          <button id="register-submit" type="submit" disabled={loading}
            className="w-full py-2.5 bg-[#5B6EFF] text-white font-semibold rounded-[5px] transition-all hover:bg-[#3F51D1] hover:shadow-lg hover:shadow-[#5B6EFF]/15 disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
            {loading ? 'Creating account...' : <>Create Account <ArrowRight className="w-3.5 h-3.5" /></>}
          </button>

          <div className="mt-6 text-center">
          <p className="text-sm text-[#475569]">
            Already have an account? <Link to="/login" className="text-[#5B6EFF] hover:text-[#3F51D1] font-semibold">Sign in</Link>
          </p>
        </div>
      </form>
      </div>
    </div>
  </div>
  );
}
