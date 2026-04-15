import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Package, MessageSquare, Zap } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { adminAPI } from '../../api';

export default function BusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.businesses()
      .then(res => setBusinesses(res.data.businesses || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const planColors = { free: 'neutral', pro: 'brand' };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold mb-1">Registered Businesses</h1>
        <p className="text-surface-400 text-sm">{businesses.length} businesses registered</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-surface-800/40 animate-pulse" />
          ))}
        </div>
      ) : businesses.length === 0 ? (
        <Card className="p-12 text-center">
          <Building2 className="w-12 h-12 text-surface-500 mx-auto mb-4" />
          <p className="text-surface-400">No businesses registered yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {businesses.map((biz, i) => (
            <motion.div
              key={biz.store_id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="p-6 hover:border-accent/15 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{biz.store_name}</h3>
                      <p className="text-sm text-surface-400">{biz.owner_email}</p>
                      {biz.owner_name && (
                        <p className="text-xs text-surface-500">{biz.owner_name}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant={planColors[biz.plan] || 'neutral'}>
                      {biz.plan === 'pro' ? '⚡ Pro' : 'Free'}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-surface-400">
                      <Package className="w-3.5 h-3.5" />
                      {biz.component_count} components
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-surface-400">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {biz.chat_session_count} chats
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-surface-400">
                      <Zap className="w-3.5 h-3.5" />
                      {biz.queries_used}/{biz.queries_limit === -1 ? '∞' : biz.queries_limit} queries
                    </div>
                  </div>
                </div>

                {/* Integrations */}
                {biz.integrations?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-surface-700/30 flex flex-wrap gap-2">
                    {biz.integrations.map((intg, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/50 border border-surface-700/30 text-xs"
                      >
                        <Globe className="w-3 h-3 text-surface-400" />
                        <span className="text-surface-300 capitalize">{intg.platform}</span>
                        <Badge variant={intg.status === 'active' ? 'green' : intg.status === 'error' ? 'red' : 'neutral'}>
                          {intg.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
