import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, ArrowRight } from 'lucide-react';
import { adminAPI } from '../../api';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@demo.com', password: 'admin123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminAPI.login(form.email, form.password);
      localStorage.setItem('admin_token', res.data.access_token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/[0.04] rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/15 mb-5">
            <Shield className="w-7 h-7 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-surface-400 mt-2 text-sm flex items-center justify-center gap-1.5">
            <img src="/assets/name.svg" alt="GenuineGig" className="h-[11px] brightness-0 invert opacity-60" /> Platform Administration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-900 border border-surface-800 rounded-2xl p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-surface-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-surface-800 border border-surface-700 rounded-xl text-white text-sm placeholder-surface-500 focus:border-red-500/30 focus:ring-2 focus:ring-red-500/10 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-surface-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-surface-800 border border-surface-700 rounded-xl text-white text-sm placeholder-surface-500 focus:border-red-500/30 focus:ring-2 focus:ring-red-500/10 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-500 text-white font-bold rounded-xl transition-all hover:brightness-110 disabled:opacity-50 shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
          >
            {loading ? 'Signing in...' : <>Access Admin Panel <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
