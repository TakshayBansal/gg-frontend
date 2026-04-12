import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Building2, Package, MessageSquare, CreditCard,
  TrendingUp, Zap, Activity, Globe
} from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { adminAPI } from '../../api';

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.stats()
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats ? [
    { label: 'Total Users', value: stats.total_users, icon: Users, color: 'text-accent', bg: 'bg-accent/10 border-accent/15' },
    { label: 'Total Stores', value: stats.total_stores, icon: Building2, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/15' },
    { label: 'Components', value: stats.total_components, icon: Package, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/15' },
    { label: 'Chat Sessions', value: stats.total_chat_sessions, icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/15' },
    { label: 'Active Subs', value: stats.active_subscriptions, icon: CreditCard, color: 'text-accent', bg: 'bg-accent/10 border-accent/15' },
    { label: 'Pro Plans', value: stats.pro_subscriptions, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/15' },
    { label: 'Integrations', value: stats.total_integrations, icon: Globe, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/15' },
    { label: 'Queries (7d)', value: stats.recent_queries_7d, icon: Activity, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/15' },
  ] : [];

  return (
    <div className="space-y-8 max-w-7xl">
      <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold mb-1">Platform Overview</h1>
        <p className="text-surface-400 text-sm">GenuineGigs admin dashboard</p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-surface-800/40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.04 }}>
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} border flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs text-surface-400 mt-1">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {stats && (
        <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Recent Activity
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-800/50 border border-surface-700/30">
                  <p className="text-xs text-surface-400 mb-1">New signups (7d)</p>
                  <p className="text-xl font-bold text-accent">{stats.recent_signups_7d}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-800/50 border border-surface-700/30">
                  <p className="text-xs text-surface-400 mb-1">AI queries (7d)</p>
                  <p className="text-xl font-bold text-amber-400">{stats.recent_queries_7d}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
