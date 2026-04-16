import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';
import DashboardLayout from './pages/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import InventoryPage from './pages/InventoryPage';
import ChatLogsPage from './pages/ChatLogsPage';
import SettingsPage from './pages/SettingsPage';
import ProductsPage from './pages/products/ProductsPage';
import ElectronicsAgentPage from './pages/products/ElectronicsAgentPage';
import IntegrationPage from './pages/IntegrationPage';
import IntegrationGuide from './pages/IntegrationGuide';

// Admin pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import BusinessList from './pages/admin/BusinessList';
import UsageLogs from './pages/admin/UsageLogs';
import ErrorLogs from './pages/admin/ErrorLogs';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function PublicOnlyRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : children;
}

function AdminPrivateRoute({ children }) {
  const token = localStorage.getItem('admin_token');
  return token ? children : <Navigate to="/admin/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/electronics-ai-agent" element={<ElectronicsAgentPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="integrations" element={<IntegrationPage />} />
          <Route path="integration-guide" element={<IntegrationGuide />} />
          <Route path="chats" element={<ChatLogsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="businesses" element={<BusinessList />} />
          <Route path="usage" element={<UsageLogs />} />
          <Route path="errors" element={<ErrorLogs />} />
        </Route>

        {/* Redirects */}
        <Route path="/products" element={<Navigate to="/product" />} />
        <Route path="/products/*" element={<Navigate to="/product" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
