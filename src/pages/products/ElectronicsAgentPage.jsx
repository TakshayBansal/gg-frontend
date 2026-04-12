import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Bot, User, Copy, Check, ExternalLink, Code2,
  Zap, ShoppingCart, Package, Sparkles, ChevronDown, ChevronUp
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card, { CardContent } from '../../components/ui/Card';
import { chatAPI, integrationAPI } from '../../api';

export default function ElectronicsAgentPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [expandedTechnical, setExpandedTechnical] = useState({});
  const [cartLoadingId, setCartLoadingId] = useState(null);
  const [bulkCartLoading, setBulkCartLoading] = useState(false);
  const [cartNotice, setCartNotice] = useState(null);
  const messagesEnd = useRef(null);
  const apiKey = localStorage.getItem('api_key') || '';

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleTechnical = (index) => {
    setExpandedTechnical((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await chatAPI.send(text, apiKey, sessionId);
      const data = res.data;
      setSessionId(data.session_id);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.message,
          available: data.available || [],
          missing: data.missing || [],
          compatibility_analysis: data.compatibility_analysis || null,
          customer_view: data.compatibility_analysis?.customer_view || null,
          internal_analysis: data.compatibility_analysis?.internal_analysis || null,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.', error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const embedSnippet = `<script src="${window.location.origin}/static/widget.js" data-api-key="${apiKey}"></script>`;

  const copySnippet = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showCartNotice = (type, text) => {
    setCartNotice({ type, text });
    setTimeout(() => setCartNotice(null), 3500);
  };

  const openRedirect = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const addSingleToCart = async (component) => {
    if (!component?.id) {
      showCartNotice('error', 'This item is missing a cart ID. Sync products again and retry.');
      return;
    }

    setCartLoadingId(component.id);
    try {
      const res = await integrationAPI.addToCart(component.id, 1);
      const data = res.data || {};
      if (!data.success) {
        showCartNotice('error', data.message || 'Unable to add this item to cart.');
        return;
      }

      showCartNotice('success', `${component.name} added to cart.`);
      openRedirect(data.redirect_url);
    } catch (err) {
      showCartNotice('error', err.response?.data?.detail || 'Add-to-cart request failed.');
    } finally {
      setCartLoadingId(null);
    }
  };

  const addAllToCart = async () => {
    const ids = allComponents.map((item) => item.id).filter(Boolean);
    if (ids.length === 0) {
      showCartNotice('error', 'No cart-ready components found in recommendations.');
      return;
    }

    setBulkCartLoading(true);
    try {
      const res = await integrationAPI.addAllToCart(ids);
      const data = res.data || {};
      const successfulResults = (data.results || []).filter((result) => result.success);

      if (successfulResults.length === 0) {
        showCartNotice('error', 'Could not add recommended components to cart.');
        return;
      }

      const redirectUrl = successfulResults.find((result) => result.redirect_url)?.redirect_url;
      showCartNotice('success', 'Recommended components added to cart flow.');
      openRedirect(redirectUrl);
    } catch (err) {
      showCartNotice('error', err.response?.data?.detail || 'Bulk add-to-cart failed.');
    } finally {
      setBulkCartLoading(false);
    }
  };

  const allComponents = messages
    .filter((m) => m.role === 'assistant' && m.available?.length > 0)
    .flatMap((m) => m.available)
    .reduce((acc, comp) => {
      const key = comp.id || `${comp.name}-${comp.category}`;
      if (!acc.map.has(key)) {
        acc.map.set(key, true);
        acc.items.push(comp);
      }
      return acc;
    }, { items: [], map: new Map() }).items;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="green" className="mb-2">
            <Bot className="w-3 h-3" /> Live
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight">Electronics AI Agent</h1>
          <p className="text-sm text-surface-400 mt-1">
            Describe a project and get component recommendations from your inventory.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {cartNotice && (
          <div className="lg:col-span-5">
            <div
              className={`px-4 py-3 rounded-xl text-sm border ${
                cartNotice.type === 'success'
                  ? 'bg-accent/10 border-accent/25 text-accent'
                  : 'bg-red-500/10 border-red-500/25 text-red-300'
              }`}
            >
              {cartNotice.text}
            </div>
          </div>
        )}

        {/* Chat Panel */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col h-[600px]">
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 border-b border-surface-600/30">
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Project Assistant</h3>
                <p className="text-xs text-accent flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7 text-accent" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">What are you building?</h4>
                  <p className="text-sm text-surface-400 max-w-xs mb-6">
                    Describe your electronics project and I'll recommend compatible components.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Bluetooth robot car', 'Weather station', 'Smart home system'].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => sendMessage(`I want to build a ${chip.toLowerCase()}`)}
                        className="px-3.5 py-2 rounded-xl bg-surface-800/60 border border-surface-600/30 text-xs text-surface-300 hover:bg-accent/10 hover:border-accent/20 hover:text-accent transition-all"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center bg-surface-700/50 border border-surface-600/30 mt-0.5">
                      {msg.role === 'user' ? (
                        <User className="w-3.5 h-3.5 text-surface-400" />
                      ) : (
                        <Zap className="w-3.5 h-3.5 text-accent" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-accent/15 text-white border border-accent/10 rounded-2xl rounded-br-sm'
                          : 'bg-surface-700/50 border border-surface-600/30 text-surface-200 rounded-2xl rounded-bl-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>

                      {msg.available?.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">✅ Available</p>
                          {msg.available.map((c, j) => (
                            <div key={j} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-900/50 border border-surface-600/20">
                              <div>
                                <div className="text-xs font-semibold text-white">{c.name}</div>
                                <div className="text-[10px] text-surface-400">{c.category}</div>
                              </div>
                              <div className="text-right">
                                {c.price && <div className="text-xs font-bold text-accent">${c.price.toFixed(2)}</div>}
                                {c.stock && <div className="text-[10px] text-surface-500">{c.stock} in stock</div>}
                                <div className="mt-1.5 flex items-center justify-end gap-1.5">
                                  {c.product_url && (
                                    <a
                                      href={c.product_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 rounded-md border border-surface-500/30 px-2 py-1 text-[10px] text-surface-300 hover:text-white hover:border-surface-400/40"
                                    >
                                      <ExternalLink className="w-3 h-3" /> View
                                    </a>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => addSingleToCart(c)}
                                    disabled={!c.id || cartLoadingId === c.id}
                                    className="inline-flex items-center gap-1 rounded-md border border-accent/30 px-2 py-1 text-[10px] text-accent hover:bg-accent/10 disabled:opacity-50"
                                  >
                                    <ShoppingCart className="w-3 h-3" />
                                    {cartLoadingId === c.id ? 'Adding...' : 'Add'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.missing?.length > 0 && (
                        <div className="mt-3 p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/10">
                          <p className="text-xs text-amber-400">
                            <Package className="w-3 h-3 inline mr-1" />
                            Not in stock: {msg.missing.join(', ')}
                          </p>
                        </div>
                      )}

                      {msg.customer_view && (
                        <div className="mt-3 space-y-3">
                          <div className="p-3 rounded-xl border border-accent/20 bg-accent/10">
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <h4 className="text-xs font-bold text-accent">{msg.customer_view.title || 'Recommended Setup'}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-surface-300">
                                  {msg.customer_view.status || 'READY_TO_BUILD'}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent">
                                  {msg.customer_view.confidence || 'HIGH'} confidence
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-surface-200 mb-2">
                              {msg.customer_view.summary || 'This setup is ready to build.'}
                            </p>
                            {msg.customer_view.confidence_message && (
                              <p className="text-[11px] text-accent mb-1">{msg.customer_view.confidence_message}</p>
                            )}
                            {msg.customer_view.explanation_message && (
                              <p className="text-[11px] text-surface-300">{msg.customer_view.explanation_message}</p>
                            )}

                            {msg.customer_view.included_solutions?.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-white/10 space-y-1.5">
                                <p className="text-[10px] uppercase tracking-wider text-surface-400">Included solutions</p>
                                {msg.customer_view.included_solutions.map((item, idx) => (
                                  <div key={idx} className="text-xs text-surface-200 flex items-start gap-1.5">
                                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-accent flex-shrink-0" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {msg.customer_view.setup_options?.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Configuration choices</p>
                              {msg.customer_view.setup_options.map((opt, o_i) => (
                                <div
                                  key={o_i}
                                  className={`p-3 rounded-xl border ${
                                    opt.title === 'Recommended Setup'
                                      ? 'bg-accent/10 border-accent/20'
                                      : opt.title === 'Advanced Setup'
                                        ? 'bg-blue-500/10 border-blue-500/20'
                                        : 'bg-surface-800/40 border-surface-600/30'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-xs font-bold text-white">{opt.title}</h4>
                                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-surface-300">{opt.label}</span>
                                  </div>
                                  <p className="text-xs text-surface-300 mb-2">{opt.explanation}</p>
                                  {opt.score !== undefined && (
                                    <p className="text-[10px] text-surface-500">Technical score: {opt.score}</p>
                                  )}
                                  {opt.trade_offs?.length > 0 && (
                                    <p className="text-[10px] text-surface-400 mt-1">Trade-offs: {opt.trade_offs.slice(0, 2).join(' | ')}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {msg.customer_view.optional_upgrades?.length > 0 && (
                            <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/10">
                              <p className="text-[10px] uppercase tracking-wider text-blue-300 mb-2">Smart notes</p>
                              <div className="space-y-1.5">
                                {msg.customer_view.optional_upgrades.map((upgrade, u_i) => (
                                  <div key={u_i} className="text-xs text-blue-100 flex items-start gap-1.5">
                                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                                    <span>{upgrade}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {msg.internal_analysis && (
                            <div className="rounded-xl border border-surface-600/30 bg-surface-800/40 overflow-hidden">
                              <button
                                type="button"
                                onClick={() => toggleTechnical(i)}
                                className="w-full px-3 py-2.5 text-xs font-semibold text-surface-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                              >
                                <span>View Technical Details</span>
                                {expandedTechnical[i] ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                )}
                              </button>

                              {expandedTechnical[i] && (
                                <div className="px-3 pb-3 pt-1 space-y-2 text-xs text-surface-300 border-t border-surface-600/20">
                                  {msg.internal_analysis.summary && (
                                    <p className="text-surface-400">{msg.internal_analysis.summary}</p>
                                  )}
                                  {(msg.internal_analysis.filtered_constraints || []).length === 0 ? (
                                    <p className="text-accent">No critical technical blockers detected.</p>
                                  ) : (
                                    <div className="space-y-1.5">
                                      {(msg.internal_analysis.filtered_constraints || []).map((item, idx) => (
                                        <div key={idx} className="p-2 rounded-lg bg-surface-900/50 border border-surface-600/20">
                                          <p className="text-white text-[11px]">{item.type}</p>
                                          <p className="text-surface-400 text-[11px]">{item.description}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface-700/50 border border-surface-600/30">
                    <Zap className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-surface-700/50 border border-surface-600/30">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEnd} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-surface-600/30">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2 bg-surface-800/60 border border-surface-600/30 rounded-xl p-1 focus-within:border-accent/30 focus-within:ring-2 focus-within:ring-accent/5 transition-all"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your project..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-surface-500 px-3 py-2.5"
                  disabled={loading}
                />
                <Button size="sm" disabled={loading || !input.trim()} type="submit" className="!rounded-lg">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-accent" />
                  Recommended Components
                </h3>
                <div className="flex items-center gap-2">
                  {allComponents.length > 0 && (
                    <Badge variant="brand">{allComponents.length}</Badge>
                  )}
                  {allComponents.length > 0 && (
                    <Button
                      size="sm"
                      onClick={addAllToCart}
                      disabled={bulkCartLoading}
                      className="!py-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {bulkCartLoading ? 'Adding...' : 'Add All'}
                    </Button>
                  )}
                </div>
              </div>
              {allComponents.length === 0 ? (
                <p className="text-xs text-surface-500 text-center py-8">
                  Start a conversation to see recommendations here.
                </p>
              ) : (
                <div className="space-y-2 max-h-[320px] overflow-y-auto">
                  {allComponents.map((c, i) => (
                    <div key={i} className="p-3 rounded-xl bg-surface-900/50 border border-surface-600/20 hover:border-accent/15 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">{c.name}</div>
                          <div className="text-xs text-surface-400">{c.category}</div>
                        </div>
                        <div className="text-right">
                          {c.price && <div className="text-sm font-bold text-accent">${c.price.toFixed(2)}</div>}
                          {c.stock && <div className="text-[10px] text-surface-500">{c.stock} in stock</div>}
                        </div>
                      </div>

                      <div className="mt-2.5 flex items-center gap-2">
                        {c.product_url && (
                          <a
                            href={c.product_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-surface-300 px-2.5 py-1.5 rounded-lg border border-surface-600/40 hover:text-white hover:border-surface-500/60"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> View Product
                          </a>
                        )}

                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => addSingleToCart(c)}
                          disabled={!c.id || cartLoadingId === c.id}
                          className="!py-1.5"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {cartLoadingId === c.id ? 'Adding...' : 'Add to Cart'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-sm">Embed on Your Website</h3>
              </div>
              <p className="text-xs text-surface-400 mb-4">
                Copy this script tag and paste it before the closing <code className="text-accent">&lt;/body&gt;</code> tag.
              </p>
              <div className="relative">
                <pre className="p-4 rounded-xl bg-surface-900/70 border border-surface-700/30 text-xs text-accent overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed">
                  {embedSnippet}
                </pre>
                <button
                  onClick={copySnippet}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-surface-700/40 hover:bg-surface-700/60 transition-colors"
                  title="Copy snippet"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-surface-400" />
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
