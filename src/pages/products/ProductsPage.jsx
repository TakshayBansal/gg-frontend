import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Sparkles, Globe, BarChart3 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AnimatedSection from '../../components/ui/AnimatedSection';

const products = [
  {
    id: 'electronics-ai-agent',
    name: 'Electronics AI Agent',
    description:
      'An intelligent chat widget that helps your website visitors find the right electronics components for their projects.',
    icon: Bot,
    badge: 'Popular',
    features: ['Natural language understanding', 'Inventory matching', 'Compatibility checks', 'Shadow DOM widget'],
    status: 'available',
  },
  {
    id: null,
    name: 'Smart Inventory Optimizer',
    description:
      'AI-powered inventory management that predicts demand and suggests optimal stock levels.',
    icon: BarChart3,
    badge: 'Coming Soon',
    features: ['Demand prediction', 'Auto-reorder alerts', 'Trend analysis'],
    status: 'coming_soon',
  },
  {
    id: null,
    name: 'Multi-Store Agent Hub',
    description:
      'Deploy and manage AI agents across multiple storefronts from a single dashboard.',
    icon: Globe,
    badge: 'Coming Soon',
    features: ['Multi-tenant', 'Centralized analytics', 'Brand customization'],
    status: 'coming_soon',
  },
];

export default function ProductsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Badge variant="brand" className="mb-3">
          <Sparkles className="w-3 h-3" /> AI Products
        </Badge>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
          AI Products Marketplace
        </h1>
        <p className="text-surface-400 max-w-lg text-sm">
          Browse our suite of AI tools built specifically for ecommerce businesses.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product, i) => (
          <AnimatedSection key={product.name} delay={i * 0.05}>
            <div
              className={`group relative p-7 rounded-2xl border h-full flex flex-col ${
                product.status === 'available'
                  ? 'border-primary-400/20 bg-surface-800 hover:bg-surface-700 hover:border-primary-400/30'
                  : 'border-surface-700 bg-surface-800/60 opacity-70'
              } transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary-400/10 border border-primary-400/20 flex items-center justify-center group-hover:bg-primary-400/15 transition-colors">
                  <product.icon className="w-6 h-6 text-primary-400" />
                </div>
                <Badge variant={product.status === 'available' ? 'green' : 'neutral'}>
                  {product.badge}
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
              <p className="text-sm text-surface-400 mb-5 leading-relaxed flex-1">
                {product.description}
              </p>

              <ul className="space-y-2 mb-6">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-xs text-surface-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {product.status === 'available' ? (
                <Link to={`/dashboard/products/${product.id}`}>
                  <Button className="w-full">
                    Use Product <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              ) : (
                <Button variant="secondary" disabled className="w-full">
                  Coming Soon
                </Button>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
