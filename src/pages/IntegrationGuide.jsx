import { useState } from 'react';
import {
  BookOpen, ShoppingBag, Globe, Code2, FileSpreadsheet,
  ChevronRight, Copy, Check, Terminal
} from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import GradientText from '../components/ui/GradientText';

const guides = [
  {
    id: 'shopify',
    name: 'Shopify',
    icon: ShoppingBag,
    steps: [
      'Go to Shopify Admin -> Settings -> Apps and sales channels',
      'Click Develop apps and create an app for GenuineGigs',
      'Enable Admin API scopes: read_products and read_inventory',
      'Install app and copy Admin API access token (shpat_...)',
      'Optional but recommended: create Storefront token for cart API checkout links',
      'In Dashboard -> Integrations, enter shop_url, access_token, and storefront_access_token',
      'Connect and run Sync Now',
    ],
    inventoryApi: `# Shopify Product Pull (official Admin API)
GET https://{shop}.myshopify.com/admin/api/2024-01/products.json?limit=250
Headers:
  X-Shopify-Access-Token: shpat_xxxxx

# Data mapped into AI inventory
- product.id -> external_id
- variants[0].price -> price
- variants[0].inventory_quantity -> stock
- handle -> product_url (https://{shop}.myshopify.com/products/{handle})
- variants[0].id -> variant_id (used by cart)

# Trigger sync in this app
POST /api/integrations/sync/{integration_id}`,
    cartApi: `# Shopify Storefront Cart API
POST https://{shop}.myshopify.com/api/2024-01/graphql.json
Headers:
  X-Shopify-Storefront-Access-Token: <storefront_token>
  Content-Type: application/json

mutation CartCreate($lines: [CartLineInput!]) {
  cartCreate(input: { lines: $lines }) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}

# Endpoints used by Electronics AI Agent
POST /api/integrations/cart/add
POST /api/integrations/cart/add-all

# Fallback used when storefront token is missing
https://{shop}.myshopify.com/cart/{variant_id}:{qty}`,
    scriptTag: `<script
  src="https://your-backend-domain/static/widget.js"
  data-api-key="YOUR_STORE_API_KEY">
</script>

Paste before </body> in your Shopify theme layout file (theme.liquid).`,
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    icon: Globe,
    steps: [
      'Go to WooCommerce -> Settings -> Advanced -> REST API',
      'Create a new key with Read permission',
      'Copy consumer_key and consumer_secret',
      'In Dashboard -> Integrations, enter store_url, consumer_key, and consumer_secret',
      'Connect and run Sync Now',
    ],
    inventoryApi: `# WooCommerce Products (official REST API)
GET https://yourstore.com/wp-json/wc/v3/products?per_page=100&page=1
Query params:
  consumer_key=ck_xxxxx
  consumer_secret=cs_xxxxx

# Data mapped into AI inventory
- id -> external_id
- name -> product name
- regular_price / price -> price
- stock_quantity / stock_status -> stock
- permalink -> product_url

# Trigger sync in this app
POST /api/integrations/sync/{integration_id}`,
    cartApi: `# WooCommerce Store API (attempted by backend)
POST https://yourstore.com/wp-json/wc/store/v1/cart/add-item?id={product_id}&quantity=1

# Browser-safe redirect used by agent buttons
https://yourstore.com/?add-to-cart={product_id}&quantity=1

# Endpoints used by Electronics AI Agent
POST /api/integrations/cart/add
POST /api/integrations/cart/add-all`,
    scriptTag: `<script
  src="https://your-backend-domain/static/widget.js"
  data-api-key="YOUR_STORE_API_KEY">
</script>

Place before </body> in footer.php or your theme footer template.`,
  },
  {
    id: 'custom_api',
    name: 'Custom API',
    icon: Code2,
    steps: [
      'Option A: provide a products API endpoint (GET)',
      'Option B: push products to our webhook endpoint (POST)',
      'Optional: configure cart_api_url for one-click cart actions',
      'Optional: configure cart_redirect_url for fallback redirects',
      'Add script tag with your API key on your website',
    ],
    inventoryApi: `# Option A: Pull from your products endpoint
GET https://api.yoursite.com/products
Headers (optional):
  Authorization: Bearer <api_key>

# Accepted response wrappers
{ "products": [...] }
{ "items": [...] }
{ "data": [...] }
# or raw array
[ ... ]

# Product example
{
  "id": "sku_esp32",
  "name": "ESP32 DevKit V1",
  "category": "microcontroller",
  "price": 12.99,
  "stock": 50,
  "product_url": "https://yourstore.com/products/esp32-devkit",
  "image_url": "https://yourstore.com/images/esp32.jpg",
  "specs": {
    "voltage": 3.3,
    "current": 0.24,
    "interface": "i2c/spi/uart"
  }
}

# Option B: Push via webhook to this app
POST /api/integrations/webhook
Headers:
  Content-Type: application/json
Body:
{
  "api_key": "YOUR_STORE_API_KEY",
  "products": [ ... ]
}`,
    cartApi: `# Recommended custom cart API config
cart_api_url: https://api.yoursite.com/cart/add
cart_method: POST
cart_api_key: <optional>

# Payload sent by this app
{
  "items": [
    {
      "id": "sku_esp32",
      "name": "ESP32 DevKit V1",
      "quantity": 1,
      "price": 12.99,
      "product_url": "https://yourstore.com/products/esp32-devkit"
    }
  ]
}

# Accepted response keys
{ "checkout_url": "https://yourstore.com/checkout?cart=abc" }
{ "cart_url": "https://yourstore.com/cart" }
{ "redirect_url": "https://yourstore.com/cart" }

# Endpoints used by Electronics AI Agent
POST /api/integrations/cart/add
POST /api/integrations/cart/add-all`,
    scriptTag: `<!-- AI assistant widget -->
<script
  src="https://your-backend-domain/static/widget.js"
  data-api-key="YOUR_STORE_API_KEY">
</script>

<!-- Optional push sync helper -->
<script>
fetch('https://your-backend-domain/api/integrations/webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    api_key: 'YOUR_STORE_API_KEY',
    products: window.YOUR_PRODUCTS_ARRAY
  })
});
</script>`,
    fieldMapping: `// Optional field mapping
{
  "name": "title",
  "stock": "inventory.qty",
  "price": "pricing.unit_price",
  "voltage": "specs.voltage",
  "current": "specs.current",
  "product_url": "links.product"
}`,
  },
  {
    id: 'csv',
    name: 'CSV Upload',
    icon: FileSpreadsheet,
    steps: [
      'Prepare CSV with at least name, category, and price',
      'Add optional stock/spec columns for better recommendations',
      'Upload in Integrations -> CSV Upload',
      'Preview AI mapping and confirm import',
      'Verify imported products in Inventory page',
    ],
    inventoryApi: `# CSV helper endpoints
POST /api/integrations/csv/preview
POST /api/integrations/csv/import?enrich=true

# Example CSV
name,category,price,stock,voltage,current,interface
ESP32 DevKit,microcontroller,12.99,50,3.3,0.24,i2c/spi/uart`,
    cartApi: `CSV/manual items do not have native external cart IDs by default.
To enable one-click cart actions, connect Shopify, WooCommerce, or Custom API with cart settings.`,
    scriptTag: `<script
  src="https://your-backend-domain/static/widget.js"
  data-api-key="YOUR_STORE_API_KEY">
</script>`,
  },
];

export default function IntegrationGuide() {
  const [activeGuide, setActiveGuide] = useState('shopify');
  const [copiedKey, setCopiedKey] = useState('');

  const guide = guides.find((g) => g.id === activeGuide);

  const copyCode = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const copyLabel = (key) => (copiedKey === key ? 'Copied!' : 'Copy');

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="brand" className="mb-3"><BookOpen className="w-3 h-3" /> Guides</Badge>
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Integration <GradientText>Guides</GradientText>
        </h1>
        <p className="text-surface-400 text-sm">
          Step-by-step setup for inventory sync, product links, cart APIs, and script integration.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        <div className="space-y-2">
          {guides.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGuide(g.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeGuide === g.id
                  ? 'bg-accent/10 text-accent border border-accent/15'
                  : 'text-surface-400 hover:text-white hover:bg-surface-800/60 border border-transparent'
              }`}
            >
              <g.icon className="w-5 h-5" />
              <span className="font-medium">{g.name}</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-5">
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-6">
                {guide && <guide.icon className="w-6 h-6 text-accent" />}
                <h2 className="text-lg font-bold">{guide?.name} Integration</h2>
              </div>

              <div className="space-y-4 mb-6">
                {guide?.steps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">{i + 1}</span>
                    </div>
                    <p className="text-sm text-surface-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              {guide?.inventoryApi && (
                <div className="relative mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-surface-400">
                      <Terminal className="w-3.5 h-3.5" /> Inventory / Products API
                    </div>
                    <button
                      onClick={() => copyCode(`${guide.id}-inventory`, guide.inventoryApi)}
                      className="flex items-center gap-1 text-xs text-surface-400 hover:text-accent transition-colors"
                    >
                      {copiedKey === `${guide.id}-inventory` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copyLabel(`${guide.id}-inventory`)}
                    </button>
                  </div>
                  <pre className="p-5 rounded-xl bg-surface-900/70 border border-surface-700/30 text-xs text-surface-300 overflow-x-auto whitespace-pre font-mono leading-relaxed">
                    {guide.inventoryApi}
                  </pre>
                </div>
              )}

              {guide?.cartApi && (
                <div className="relative mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-surface-400">
                      <Terminal className="w-3.5 h-3.5" /> Cart API
                    </div>
                    <button
                      onClick={() => copyCode(`${guide.id}-cart`, guide.cartApi)}
                      className="flex items-center gap-1 text-xs text-surface-400 hover:text-accent transition-colors"
                    >
                      {copiedKey === `${guide.id}-cart` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copyLabel(`${guide.id}-cart`)}
                    </button>
                  </div>
                  <pre className="p-5 rounded-xl bg-surface-900/70 border border-surface-700/30 text-xs text-surface-300 overflow-x-auto whitespace-pre font-mono leading-relaxed">
                    {guide.cartApi}
                  </pre>
                </div>
              )}

              {guide?.scriptTag && (
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-surface-400">
                      <Terminal className="w-3.5 h-3.5" /> Script Tag Integration
                    </div>
                    <button
                      onClick={() => copyCode(`${guide.id}-script`, guide.scriptTag)}
                      className="flex items-center gap-1 text-xs text-surface-400 hover:text-accent transition-colors"
                    >
                      {copiedKey === `${guide.id}-script` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copyLabel(`${guide.id}-script`)}
                    </button>
                  </div>
                  <pre className="p-5 rounded-xl bg-surface-900/70 border border-surface-700/30 text-xs text-surface-300 overflow-x-auto whitespace-pre font-mono leading-relaxed">
                    {guide.scriptTag}
                  </pre>
                </div>
              )}

              {guide?.fieldMapping && (
                <div className="mt-5">
                  <div className="flex items-center gap-2 text-xs text-surface-400 mb-2">
                    <Terminal className="w-3.5 h-3.5" /> Field Mapping
                  </div>
                  <pre className="p-5 rounded-xl bg-surface-900/70 border border-surface-700/30 text-xs text-accent overflow-x-auto whitespace-pre font-mono leading-relaxed">
                    {guide.fieldMapping}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
