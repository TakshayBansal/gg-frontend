import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Globe, ShoppingBag, Database, FileSpreadsheet,
  Code2, Check, AlertCircle, RefreshCw, Upload, ArrowRight,
  Zap, Link2, ChevronDown, BookOpen
} from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import GradientText from '../components/ui/GradientText';
import { integrationAPI } from '../api';

const platforms = [
  {
    id: 'shopify',
    name: 'Shopify',
    icon: ShoppingBag,
    desc: 'Connect your Shopify store to sync products automatically.',
    fields: [
      { key: 'shop_url', label: 'Shop URL', placeholder: 'my-store.myshopify.com' },
      { key: 'access_token', label: 'Access Token', placeholder: 'shpat_xxxxx', type: 'password' },
      {
        key: 'storefront_access_token',
        label: 'Storefront Token (for direct checkout links)',
        placeholder: 'shpat_or_storefront_xxxxx',
        type: 'password',
      },
    ],
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    icon: Globe,
    desc: 'Connect via WooCommerce REST API keys.',
    fields: [
      { key: 'store_url', label: 'Store URL', placeholder: 'https://mystore.com' },
      { key: 'consumer_key', label: 'Consumer Key', placeholder: 'ck_xxxxx' },
      { key: 'consumer_secret', label: 'Consumer Secret', placeholder: 'cs_xxxxx', type: 'password' },
    ],
  },
  {
    id: 'custom_api',
    name: 'Custom API',
    icon: Code2,
    desc: 'Connect any REST API or use JS injection / webhooks.',
    fields: [
      { key: 'api_url', label: 'API Endpoint', placeholder: 'https://api.yoursite.com/products' },
      { key: 'api_key', label: 'API Key (optional)', placeholder: 'Bearer token', type: 'password' },
      {
        key: 'cart_api_url',
        label: 'Cart API Endpoint (optional)',
        placeholder: 'https://api.yoursite.com/cart/add',
        scope: 'config',
      },
      {
        key: 'cart_method',
        label: 'Cart API Method',
        placeholder: 'POST',
        scope: 'config',
      },
      {
        key: 'cart_redirect_url',
        label: 'Cart Redirect URL (fallback)',
        placeholder: 'https://yoursite.com/cart',
        scope: 'config',
      },
    ],
  },
  {
    id: 'csv',
    name: 'CSV Upload',
    icon: FileSpreadsheet,
    desc: 'Upload any CSV file — AI will map columns automatically.',
    fields: [],
  },
];

export default function IntegrationPage() {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState(null);

  useEffect(() => {
    integrationAPI.list()
      .then(res => setIntegrations(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleConnect = async (platform) => {
    setConnecting(platform.id);
    setMessage(null);
    try {
      const credentials = {};
      const config = {};

      platform.fields.forEach((field) => {
        const value = formData[field.key];
        if (value === undefined || value === null || value === '') return;
        if (field.scope === 'config') {
          config[field.key] = value;
        } else {
          credentials[field.key] = value;
        }
      });

      const res = await integrationAPI.connect(platform.id, credentials, config);
      setMessage({
        type: res.data.status === 'active' ? 'success' : 'error',
        text: res.data.status === 'active'
          ? `✅ Connected to ${platform.name} successfully!`
          : `❌ Connection failed: ${res.data.error}`,
      });
      // Refresh integrations
      const updated = await integrationAPI.list();
      setIntegrations(updated.data || []);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'Connection failed' });
    } finally {
      setConnecting(null);
    }
  };

  const handleSync = async (integrationId) => {
    setMessage(null);
    try {
      const res = await integrationAPI.sync(integrationId);
      setMessage({
        type: 'success',
        text: `✅ Synced ${res.data.synced} products (${res.data.created} new, ${res.data.updated} updated)`,
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'Sync failed' });
    }
  };

  const handleCsvPreview = async () => {
    if (!csvFile) return;
    try {
      const res = await integrationAPI.csvPreview(csvFile);
      setCsvPreview(res.data);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'CSV parse failed' });
    }
  };

  const handleCsvImport = async () => {
    if (!csvFile) return;
    try {
      const mapping = csvPreview?.suggested_mapping || null;
      const res = await integrationAPI.csvImport(csvFile, mapping, true);
      setMessage({ type: 'success', text: `✅ Imported ${res.data.imported} components` });
      setCsvPreview(null);
      setCsvFile(null);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'Import failed' });
    }
  };

  const getIntegration = (platformId) => 
    integrations.find(i => i.platform === platformId);

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="brand" className="mb-3"><Link2 className="w-3 h-3" /> Integrations</Badge>
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Connect Your <GradientText>Inventory</GradientText>
        </h1>
        <p className="text-surface-400 text-sm">How do you manage your inventory?</p>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl text-sm ${
            message.type === 'success'
              ? 'bg-accent/10 border border-accent/20 text-accent'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Active Integrations */}
      {integrations.filter(i => i.status === 'active').length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-surface-300">Active Connections</h2>
          {integrations.filter(i => i.status === 'active').map((intg) => (
            <Card key={intg.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                    <Check className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm capitalize">{intg.platform}</h3>
                    <p className="text-xs text-surface-400">
                      {intg.last_sync ? `Last sync: ${new Date(intg.last_sync).toLocaleDateString()}` : 'Never synced'}
                      {intg.sync_count > 0 && ` • ${intg.sync_count} syncs`}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="secondary" onClick={() => handleSync(intg.id)}>
                  <RefreshCw className="w-3.5 h-3.5" /> Sync Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Platform Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {platforms.map((platform) => {
          const existing = getIntegration(platform.id);
          const isActive = activeTab === platform.id;

          return (
            <Card key={platform.id} hover className={isActive ? 'border-accent/20' : ''}>
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                    <platform.icon className="w-6 h-6 text-accent" />
                  </div>
                  {existing && (
                    <Badge variant={existing.status === 'active' ? 'green' : 'red'}>
                      {existing.status}
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold text-lg mb-1">{platform.name}</h3>
                <p className="text-sm text-surface-400 mb-4">{platform.desc}</p>

                {platform.id === 'csv' ? (
                  <div>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => setCsvFile(e.target.files[0])}
                      className="block w-full text-sm text-surface-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent/10 file:text-accent file:font-semibold file:text-xs hover:file:bg-accent/20 mb-3"
                    />
                    {csvFile && !csvPreview && (
                      <Button size="sm" onClick={handleCsvPreview} className="w-full">
                        <Upload className="w-3.5 h-3.5" /> Preview & Map Columns
                      </Button>
                    )}
                    {csvPreview && (
                      <div className="mt-3 space-y-3">
                        <div className="p-3 rounded-lg bg-surface-900/50 border border-surface-700/30">
                          <p className="text-xs text-surface-300 mb-2 font-semibold">
                            AI Column Mapping ({csvPreview.total_rows} rows):
                          </p>
                          {Object.entries(csvPreview.suggested_mapping).map(([field, col]) => (
                            <div key={field} className="flex justify-between text-xs py-1">
                              <span className="text-accent">{field}</span>
                              <span className="text-surface-400">← {col}</span>
                            </div>
                          ))}
                        </div>
                        <Button size="sm" onClick={handleCsvImport} className="w-full">
                          <Check className="w-3.5 h-3.5" /> Import {csvPreview.total_rows} Products
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => setActiveTab(isActive ? null : platform.id)}
                      className="text-sm text-accent font-semibold flex items-center gap-1 hover:text-accent/80 transition-colors"
                    >
                      {existing?.status === 'active' ? 'Reconfigure' : 'Connect'}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-180' : ''}`} />
                    </button>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-3"
                      >
                        {platform.fields.map((field) => (
                          <div key={field.key} className="space-y-1">
                            <label className="text-xs font-medium text-surface-300">{field.label}</label>
                            <input
                              type={field.type || 'text'}
                              placeholder={field.placeholder}
                              value={formData[field.key] || ''}
                              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                              className="w-full px-3 py-2.5 bg-surface-800/60 border border-surface-600/40 rounded-xl text-white text-sm placeholder-surface-500 focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all outline-none"
                            />
                          </div>
                        ))}
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleConnect(platform)}
                          disabled={connecting === platform.id}
                        >
                          {connecting === platform.id ? 'Connecting...' : (
                            <>Connect <ArrowRight className="w-3.5 h-3.5" /></>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
