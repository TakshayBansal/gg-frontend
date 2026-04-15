import { useState, useEffect, useRef } from 'react';
import { inventoryAPI } from '../api';
import {
  Package, Upload, Plus, Trash2, Edit3, Search,
  X, Check, AlertCircle, FileSpreadsheet
} from 'lucide-react';

export default function InventoryPage() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInput = useRef(null);

  const [newComp, setNewComp] = useState({
    name: '', category: '', price: '', voltage: '', current: '', interface: '', stock: '', description: ''
  });

  useEffect(() => { fetchInventory(); }, []);

  const fetchInventory = async () => {
    try {
      const res = await inventoryAPI.list();
      setComponents(res.data);
    } catch (err) {
      console.error('Failed to load inventory', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadResult(null);
    try {
      const res = await inventoryAPI.upload(file, false);
      setUploadResult({ type: 'success', message: res.data.message });
      fetchInventory();
    } catch (err) {
      setUploadResult({ type: 'error', message: err.response?.data?.detail || 'Upload failed' });
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const handleAdd = async () => {
    try {
      await inventoryAPI.add({
        ...newComp,
        price: parseFloat(newComp.price) || 0,
        voltage: newComp.voltage ? parseFloat(newComp.voltage) : null,
        current: newComp.current ? parseFloat(newComp.current) : null,
        stock: parseInt(newComp.stock) || 0,
      });
      setShowAddForm(false);
      setNewComp({ name: '', category: '', price: '', voltage: '', current: '', interface: '', stock: '', description: '' });
      fetchInventory();
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to add component');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this component?')) return;
    try {
      await inventoryAPI.delete(id);
      fetchInventory();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const filtered = components.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(components.map(c => c.category))].sort();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Inventory</h1>
          <p className="text-surface-200/50">{components.length} components across {categories.length} categories</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-all glow-brand-sm text-sm"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
          <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all cursor-pointer text-sm">
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'CSV Upload'}
            <input ref={fileInput} type="file" accept=".csv" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      </div>

      {/* Upload result */}
      {uploadResult && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm animate-slide-down ${
          uploadResult.type === 'success'
            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
        }`}>
          {uploadResult.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {uploadResult.message}
          <button onClick={() => setUploadResult(null)} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-200/30" />
        <input
          id="inventory-search"
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-surface-800/50 border border-white/5 rounded-xl text-white placeholder-surface-200/30 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all outline-none"
        />
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="glass-strong rounded-2xl p-6 animate-slide-down">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Add Component</h3>
            <button onClick={() => setShowAddForm(false)} className="text-surface-200/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { key: 'name', label: 'Name', type: 'text', required: true },
              { key: 'category', label: 'Category', type: 'text', required: true },
              { key: 'price', label: 'Price ($)', type: 'number', required: true },
              { key: 'stock', label: 'Stock', type: 'number' },
              { key: 'voltage', label: 'Voltage (V)', type: 'number' },
              { key: 'current', label: 'Current (A)', type: 'number' },
              { key: 'interface', label: 'Interface', type: 'text' },
              { key: 'description', label: 'Description', type: 'text' },
            ].map(({ key, label, type, required }) => (
              <div key={key}>
                <label className="text-xs font-medium text-surface-200/60 mb-1 block">{label}{required && ' *'}</label>
                <input
                  type={type}
                  step={type === 'number' ? 'any' : undefined}
                  value={newComp[key]}
                  onChange={(e) => setNewComp({ ...newComp, [key]: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-900/50 border border-white/10 rounded-lg text-white text-sm focus:border-brand-500 outline-none transition-colors"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleAdd}
            disabled={!newComp.name || !newComp.category || !newComp.price}
            className="mt-4 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white rounded-xl font-medium text-sm transition-all"
          >
            Add Component
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <FileSpreadsheet className="w-12 h-12 text-surface-200/20 mx-auto mb-4" />
          <p className="text-surface-200/50 font-medium mb-2">No components found</p>
          <p className="text-surface-200/30 text-sm">Upload a CSV or add components manually</p>
        </div>
      ) : (
        <div className="glass-strong rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Name', 'Category', 'Voltage', 'Current', 'Interface', 'Stock', 'Price', ''].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-surface-200/40 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((comp) => (
                  <tr key={comp.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-4">
                      <span className="font-medium text-white text-sm">{comp.name}</span>
                      {comp.description && (
                        <p className="text-xs text-surface-200/30 mt-0.5 max-w-xs truncate">{comp.description}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-lg bg-brand-600/10 text-brand-400 border border-brand-500/20">
                        {comp.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-surface-200/60">{comp.voltage ? `${comp.voltage}V` : '—'}</td>
                    <td className="px-5 py-4 text-sm text-surface-200/60">{comp.current ? `${(comp.current * 1000).toFixed(0)}mA` : '—'}</td>
                    <td className="px-5 py-4 text-sm text-surface-200/60">{comp.interface || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-medium ${comp.stock > 10 ? 'text-green-400' : comp.stock > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                        {comp.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-white">${comp.price?.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(comp.id)}
                        className="p-2 rounded-lg text-surface-200/20 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
