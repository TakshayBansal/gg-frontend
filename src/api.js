import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem('token');
      localStorage.removeItem('store_id');
      localStorage.removeItem('api_key');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth API ──────────────────────────────────────────

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// ─── Inventory API ─────────────────────────────────────

export const inventoryAPI = {
  list: (category) => api.get('/inventory/', { params: { category } }),
  add: (data) => api.post('/inventory/', data),
  update: (id, data) => api.put(`/inventory/${id}`, data),
  delete: (id) => api.delete(`/inventory/${id}`),
  upload: (file, replace = false) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/inventory/upload?replace=${replace}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getStore: () => api.get('/inventory/store'),
  updateStore: (data) => api.put('/inventory/store', data),
};

// ─── Chat API ──────────────────────────────────────────

export const chatAPI = {
  send: (message, apiKey, sessionId) =>
    api.post('/chat/', { message, api_key: apiKey, session_id: sessionId }),
  getLogs: (sessionId) => api.get('/chat/logs', { params: { session_id: sessionId } }),
  getSessions: () => api.get('/chat/sessions'),
};

// ─── Subscription API ──────────────────────────────────

export const subscriptionAPI = {
  getMine: () => api.get('/subscriptions/me'),
  updatePlan: (planName) => api.put('/subscriptions/me', { plan_name: planName }),
};

// ─── Integration API ───────────────────────────────────

export const integrationAPI = {
  list: () => api.get('/integrations/'),
  connect: (platform, credentials = {}, config = {}) =>
    api.post('/integrations/connect', { platform, credentials, config }),
  sync: (integrationId) => api.post(`/integrations/sync/${integrationId}`),
  addToCart: (componentId, quantity = 1) =>
    api.post('/integrations/cart/add', { component_id: componentId, quantity }),
  addAllToCart: (componentIds, quantities = {}) =>
    api.post('/integrations/cart/add-all', { component_ids: componentIds, quantities }),
  csvPreview: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/integrations/csv/preview', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  csvImport: (file, mapping = null, enrich = false) => {
    const formData = new FormData();
    formData.append('file', file);
    if (mapping) formData.append('column_mapping', JSON.stringify(mapping));
    return api.post(`/integrations/csv/import?enrich=${enrich}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// ─── Compatibility API ─────────────────────────────────

export const compatibilityAPI = {
  analyze: (componentIds) => api.post('/compatibility/analyze', componentIds),
  analyzeByNames: (names) => api.post('/compatibility/analyze-by-names', names),
  analyzeAll: () => api.get('/compatibility/analyze-all'),
};

// ─── Admin API ─────────────────────────────────────────

const adminApi = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminAPI = {
  login: (email, password) =>
    adminApi.post(`/admin/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`),
  stats: () => adminApi.get('/admin/stats'),
  businesses: (skip = 0, limit = 50) =>
    adminApi.get('/admin/businesses', { params: { skip, limit } }),
  usage: (storeId, days = 7) =>
    adminApi.get('/admin/usage', { params: { store_id: storeId, days } }),
  errors: (days = 7) => adminApi.get('/admin/errors', { params: { days } }),
};

export default api;
