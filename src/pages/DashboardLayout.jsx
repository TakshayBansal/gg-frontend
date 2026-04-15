import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import {
  LayoutDashboard, Package, MessageSquare, Settings,
  LogOut, Menu, X, ChevronRight, Bot, Layers, Link2, BookOpen
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Overview', exact: true },
  { path: '/dashboard/products', icon: Layers, label: 'AI Products' },
  { path: '/dashboard/products/electronics-ai-agent', icon: Bot, label: 'My Agent' },
  { path: '/dashboard/inventory', icon: Package, label: 'Inventory' },
  { path: '/dashboard/integrations', icon: Link2, label: 'Integrations' },
  { path: '/dashboard/integration-guide', icon: BookOpen, label: 'Setup Guide' },
  { path: '/dashboard/chats', icon: MessageSquare, label: 'Chat Logs' },
  { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    authAPI.getMe().then(res => setUser(res.data)).catch(() => {});
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-surface-900 backdrop-blur-xl border-r border-surface-800 
          transform transition-transform duration-300 lg:translate-x-0 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-surface-800">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.svg" alt="GenuineGig Logo" className="h-8 w-auto brightness-150" />
              <div>
                <h1 className="font-bold text-white text-lg leading-tight flex items-center">
                  <img src="/assets/name.svg" alt="GenuineGig" className="h-[15px] brightness-0 invert" />
                </h1>
                <p className="text-xs text-surface-400">AI Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(({ path, icon: Icon, label, exact }) => (
              <NavLink
                key={path}
                to={path}
                end={exact}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                  ${isActive
                    ? 'bg-primary-400/15 text-primary-300 border border-primary-400/20'
                    : 'text-surface-400 hover:text-white hover:bg-surface-800 border border-transparent'}`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-surface-800">
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-800 border border-surface-700 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary-400/20 flex items-center justify-center text-primary-300 font-bold text-sm">
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.full_name || user.email}</p>
                  <p className="text-xs text-surface-500 truncate">{user.email}</p>
                </div>
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-surface-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-surface-800 bg-surface-900">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-surface-800 text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/assets/logo.svg" alt="GenuineGig" className="h-6 w-auto brightness-150" />
            <span className="font-bold text-white">Dashboard</span>
          </div>
          <div className="w-10" />
        </header>

        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
