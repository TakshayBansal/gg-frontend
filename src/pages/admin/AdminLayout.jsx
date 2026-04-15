import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Shield, LayoutDashboard, Building2, BarChart3,
  AlertTriangle, LogOut, ChevronRight
} from 'lucide-react';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/businesses', icon: Building2, label: 'Businesses' },
  { path: '/admin/usage', icon: BarChart3, label: 'Usage Logs' },
  { path: '/admin/errors', icon: AlertTriangle, label: 'Errors' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('admin_token'); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-surface-950 flex">
      <aside className="w-64 bg-surface-900 border-r border-surface-800 flex flex-col">
        <div className="p-6 border-b border-surface-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h1 className="font-bold text-white leading-tight">Admin Panel</h1>
            <img src="/assets/name.svg" alt="GenuineGig" className="h-2.5 mt-0.5 brightness-0 invert opacity-50" />
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ path, icon: Icon, label, exact }) => (
            <NavLink
              key={path}
              to={path}
              end={exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                ${isActive
                  ? 'bg-red-500/10 text-red-400 border border-red-500/15'
                  : 'text-surface-400 hover:text-white hover:bg-surface-800 border border-transparent'}`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-surface-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-surface-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
