import { useState, useEffect } from 'react';
import { inventoryAPI } from '../api';
import { Settings as SettingsIcon, Copy, Check, Key, Bot, Save } from 'lucide-react';

export default function SettingsPage() {
  const [store, setStore] = useState(null);
  const [llmProvider, setLlmProvider] = useState('groq');
  const [storeName, setStoreName] = useState('');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    inventoryAPI.getStore().then(res => {
      setStore(res.data);
      setLlmProvider(res.data.llm_provider);
      setStoreName(res.data.name);
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await inventoryAPI.updateStore({ name: storeName, llm_provider: llmProvider });
      setStore(res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const copyKey = () => {
    navigator.clipboard.writeText(store?.api_key || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!store) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
        <p className="text-surface-400">Configure your store and AI settings</p>
      </div>

      {/* Store Settings */}
      <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-400/15 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-primary-400" />
          </div>
          <h2 className="text-lg font-bold text-white">Store Settings</h2>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-surface-300">Store Name</label>
          <input
            id="settings-store-name"
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-xl text-white focus:border-primary-400 outline-none transition-colors"
          />
        </div>

        {/* API Key */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-surface-300 flex items-center gap-2">
            <Key className="w-4 h-4" /> API Key
          </label>
          <div className="flex items-center gap-3">
            <code className="flex-1 px-4 py-3 bg-surface-900 border border-surface-700 rounded-xl text-surface-300 font-mono text-sm overflow-hidden">
              {store.api_key}
            </code>
            <button
              onClick={copyKey}
              className="p-3 rounded-xl bg-surface-700 hover:bg-surface-600 text-surface-400 hover:text-white transition-all"
            >
              {copied ? <Check className="w-5 h-5 text-primary-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="bg-surface-800 border border-surface-700 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
            <Bot className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-lg font-bold text-white">AI Configuration</h2>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-surface-300">LLM Provider</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'groq', name: 'Groq', model: 'LLaMA 3.3 70B', desc: 'Fast inference, free tier' },
              { id: 'openai', name: 'OpenAI', model: 'GPT-4o Mini', desc: 'High quality responses' },
            ].map(({ id, name, model, desc }) => (
              <button
                key={id}
                onClick={() => setLlmProvider(id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  llmProvider === id
                    ? 'border-primary-400/40 bg-primary-400/10'
                    : 'border-surface-700 bg-surface-900 hover:border-surface-600'
                }`}
              >
                <p className={`font-semibold text-sm ${llmProvider === id ? 'text-primary-400' : 'text-white'}`}>
                  {name}
                </p>
                <p className="text-xs text-surface-400 mt-1">{model}</p>
                <p className="text-xs text-surface-500 mt-0.5">{desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 bg-primary-400 hover:bg-primary-600 disabled:opacity-50 text-white rounded-xl font-medium transition-all shadow-sm"
      >
        {saved ? (
          <>
            <Check className="w-5 h-5" /> Saved!
          </>
        ) : saving ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" /> Save Settings
          </>
        )}
      </button>
    </div>
  );
}
