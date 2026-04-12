import { useState, useEffect } from 'react';
import { AlertTriangle, Globe, Clock } from 'lucide-react';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { adminAPI } from '../../api';

export default function ErrorLogs() {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.errors(30)
      .then(res => setErrors(res.data.errors || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold mb-1">Error Logs</h1>
        <p className="text-surface-400 text-sm">Integration errors across the platform</p>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-surface-800/40 animate-pulse" />
              ))}
            </div>
          ) : errors.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-accent" />
              </div>
              <p className="text-accent font-semibold mb-1">All Clear! ✓</p>
              <p className="text-surface-400 text-sm">No integration errors in the last 30 days.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {errors.map((err, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-red-500/5 border border-red-500/15"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <Badge variant="red">{err.platform}</Badge>
                    <span className="text-xs text-surface-500 ml-auto">
                      Store: {err.store_id?.slice(0, 8)}...
                    </span>
                  </div>
                  <p className="text-sm text-red-300">{err.error}</p>
                  {err.updated_at && (
                    <p className="text-xs text-surface-500 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(err.updated_at).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
