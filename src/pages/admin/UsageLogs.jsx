import { useState, useEffect } from 'react';
import { BarChart3, Clock } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { adminAPI } from '../../api';

export default function UsageLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.usage(null, 30)
      .then(res => setLogs(res.data.logs || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const actionColors = {
    chat_query: 'brand',
    inventory_sync: 'green',
    csv_upload: 'yellow',
    webhook_push: 'neutral',
    integration_connect: 'brand',
    api_call: 'neutral',
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold mb-1">Usage Logs</h1>
        <p className="text-surface-400 text-sm">Platform activity over the last 30 days</p>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 rounded-xl bg-surface-800/40 animate-pulse" />
              ))}
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-surface-500 mx-auto mb-4" />
              <p className="text-surface-400">No usage logs yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-800/50 border border-surface-700/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-700/50 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-surface-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge variant={actionColors[log.action] || 'neutral'}>
                        {log.action.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-surface-500 truncate">
                      Store: {log.store_id?.slice(0, 8)}...
                      {log.details && ` • ${JSON.stringify(log.details)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-surface-500">
                    <Clock className="w-3 h-3" />
                    {new Date(log.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
