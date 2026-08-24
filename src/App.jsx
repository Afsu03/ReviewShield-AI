import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotificationCenter } from './components/NotificationCenter';

// Page Views
import { LandingPage } from './components/views/LandingPage';
import { AuthPage } from './components/views/AuthPage';
import { ProductDetails } from './components/views/ProductDetails';
import { ReviewAnalysis } from './components/views/ReviewAnalysis';
import { AnalyticsPage } from './components/views/AnalyticsPage';
import { SettingsPage } from './components/views/SettingsPage';
import { WebhooksPage } from './components/views/WebhooksPage';
import { ReportsPage } from './components/views/ReportsPage';

// Dashboard Views
import { UserDashboard } from './components/dashboards/UserDashboard';
import { SellerDashboard } from './components/dashboards/SellerDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { XAIDashboard } from './components/dashboards/XAIDashboard';

export function App() {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'auth':
        return <AuthPage />;
      case 'product-details':
        return <ProductDetails />;
      case 'review-analysis':
        return <ReviewAnalysis />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'webhooks':
        return <WebhooksPage />;
      case 'reports':
        return <ReportsPage />;
      case 'user-dashboard':
        return <UserDashboard />;
      case 'seller-dashboard':
        return <SellerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'xai-dashboard':
        return <XAIDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 font-sans selection:bg-neon-purple selection:text-white relative">
      <Navbar />
      <NotificationCenter />

      <main className="pt-20">
        {renderActiveView()}
      </main>

      <Footer />
    </div>
  );
}

