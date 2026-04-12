import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, MessageSquare, Package, Bot, ArrowRight,
  TrendingUp, Zap, Sparkles, Copy, Check, Activity
} from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { inventoryAPI, chatAPI, subscriptionAPI } from '../api';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function OverviewPage() {
  const [stats, setStats] = useState({
    components: 0,
    sessions: 0,
    plan: 'free',
    queriesUsed: 0,
    queriesLimit: 25,
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const apiKey = localStorage.getItem('api_key') || '';

  useEffect(() => {
    Promise.allSettled([
      inventoryAPI.list(),
      chatAPI.getSessions(),
      subscriptionAPI.getMine(),
    ]).then(([inv, sess, sub]) => {
      setStats({
        components: inv.status === 'fulfilled' ? inv.value.data.length : 0,
        sessions: sess.status === 'fulfilled' ? sess.value.data.length : 0,
        plan: sub.status === 'fulfilled' ? sub.value.data.plan_name : 'free',
        queriesUsed: sub.status === 'fulfilled' ? sub.value.data.ai_queries_used : 0,
        queriesLimit: sub.status === 'fulfilled' ? sub.value.data.ai_queries_limit : 25,
      });
      setLoading(false);
    });
  }, []);

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statCards = [
    {
      label: 'Components',
      value: stats.components,
      icon: Package,
      accent: 'text-accent',
      accentBg: 'bg-accent/10 border-accent/15',
      status: 'normal',
      change: '+5.2%',
    },
    {
      label: 'Chat Sessions',
      value: stats.sessions,
      icon: MessageSquare,
      accent: 'text-amber-400',
      accentBg: 'bg-amber-500/10 border-amber-500/15',
      status: 'high',
      change: '+12.8%',
    },
    {
      label: 'AI Queries Used',
      value: stats.queriesLimit === -1 ? stats.queriesUsed : `${stats.queriesUsed}/${stats.queriesLimit}`,
      icon: Zap,
      accent: 'text-red-400',
      accentBg: 'bg-red-500/10 border-red-500/15',
      status: stats.queriesLimit !== -1 && stats.queriesUsed > stats.queriesLimit * 0.8 ? 'high' : 'normal',
      change: null,
    },
    {
      label: 'Current Plan',
      value: stats.plan.charAt(0).toUpperCase() + stats.plan.slice(1),
      icon: Sparkles,
      accent: 'text-blue-400',
      accentBg: 'bg-blue-500/10 border-blue-500/15',
      status: 'optimal',
      change: null,
    },
  ];

  const statusColors = {
    normal: 'bg-accent/15 text-accent',
    high: 'bg-amber-500/15 text-amber-400',
    optimal: 'bg-blue-500/15 text-blue-400',
  };

  const quickActions = [
    {
      title: 'Try AI Agent',
      desc: 'Test the assistant with your inventory',
      icon: Bot,
      link: '/dashboard/products/electronics-ai-agent',
      accent: 'text-accent',
    },
    {
      title: 'Manage Inventory',
      desc: 'Add or update your component catalog',
      icon: Package,
      link: '/dashboard/inventory',
      accent: 'text-emerald-400',
    },
    {
      title: 'View Chat Logs',
      desc: 'See what customers are asking',
      icon: MessageSquare,
      link: '/dashboard/chats',
      accent: 'text-amber-400',
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header — matches Figma dashboard greeting */}
      <motion.div {...fadeUp} transition={{ duration: 0.4 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
            Hello, Welcome! 👋
          </h1>
          <p className="text-surface-400 text-sm">
            What are you looking for today?
          </p>
        </div>
        <Badge variant="brand">
          <Activity className="w-3 h-3" /> Real-time monitoring active
        </Badge>
      </motion.div>

      {/* ── Stats Grid — matches Figma energy dashboard KPI cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className="p-5 relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.accentBg} border flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.accent}`} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColors[stat.status]}`}>
                  {stat.status}
                </span>
              </div>

              <p className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                {loading ? (
                  <span className="inline-block w-12 h-7 rounded bg-surface-700/50 animate-pulse" />
                ) : (
                  stat.value
                )}
              </p>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-surface-400 font-medium">{stat.label}</p>
                {stat.change && (
                  <div className="flex items-center gap-1 text-xs text-accent font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Quick Actions */}
        <motion.div
          className="lg:col-span-3"
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardContent>
              <h3 className="font-bold text-white mb-5 flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-accent" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.title}
                    to={action.link}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/50 border border-surface-700/30 hover:bg-surface-700/50 hover:border-accent/15 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/8 border border-surface-600/30 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <action.icon className={`w-5 h-5 ${action.accent}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white">{action.title}</h4>
                      <p className="text-xs text-surface-400">{action.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Key + Subscription panel */}
        <motion.div
          className="lg:col-span-2 space-y-5"
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <Card>
            <CardContent>
              <h3 className="font-bold text-white mb-3 text-sm">Your API Key</h3>
              <div className="relative">
                <div className="px-4 py-3 rounded-xl bg-surface-900/70 border border-surface-700/30 text-xs text-accent font-mono break-all pr-10">
                  {apiKey || 'No API key found'}
                </div>
                <button
                  onClick={copyApiKey}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-surface-700/40 hover:bg-surface-700/60 transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-surface-400" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-surface-500 mt-2">
                Use this key to authenticate the widget on your website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                Subscription
              </h3>
              <div className="flex items-center justify-between mb-4">
                <Badge variant={stats.plan === 'pro' ? 'brand' : 'neutral'}>
                  {stats.plan === 'pro' ? '⚡ Pro' : 'Free'}
                </Badge>
                {stats.plan !== 'pro' && (
                  <Link
                    to="/dashboard/settings"
                    className="text-xs text-accent hover:text-accent/80 transition-colors font-semibold"
                  >
                    Upgrade →
                  </Link>
                )}
              </div>
              {stats.queriesLimit !== -1 && (
                <div>
                  <div className="flex justify-between text-xs text-surface-400 mb-2">
                    <span>AI Queries</span>
                    <span className="text-white font-semibold">{stats.queriesUsed} / {stats.queriesLimit}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-700/60 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-emerald-400 transition-all duration-500"
                      style={{ width: `${Math.min((stats.queriesUsed / stats.queriesLimit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {stats.queriesLimit === -1 && (
                <p className="text-xs text-accent font-semibold">Unlimited AI queries ✓</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
