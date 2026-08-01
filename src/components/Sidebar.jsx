import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  ShoppingBag, 
  Store, 
  Cpu, 
  BarChart3, 
  Settings, 
  Webhook, 
  FileText, 
  X, 
  Shield, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Sidebar() {
  const { isSidebarOpen, closeSidebar, activeTab, navigateTo } = useApp();

  const sidebarNavItems = [
    { id: 'user-dashboard', label: 'User Dashboard', icon: User, description: 'Personal review tracking & trust reputation' },
    { id: 'product-details', label: 'Product Hub', icon: ShoppingBag, description: 'Catalog trust scores & review breakdown' },
    { id: 'seller-dashboard', label: 'Seller Dashboard', icon: Store, description: 'Merchant desk & review moderation' },
    { id: 'xai-dashboard', label: 'Explainable AI (XAI)', icon: Cpu, description: 'SHAP feature attribution & decision logic' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Fake review velocity & trend charts' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Fraud threshold preferences & API keys' },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook, description: 'Real-time HTTP event notification endpoints' },
    { id: 'reports', label: 'Reports', icon: FileText, description: 'Exportable CSV & PDF fraud audit logs' },
  ];

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Collapsible Left Slide-In Sidebar */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white border-r border-slate-200 z-50 shadow-elevated flex flex-col justify-between"
          >
            {/* Sidebar Top Header */}
            <div>
              <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900">ReviewShield</span>
                    <span className="text-[10px] text-slate-500 block font-medium">Navigation Drawer</span>
                  </div>
                </div>

                <button
                  onClick={closeSidebar}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                  aria-label="Close Sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Menu Items List */}
              <div className="p-4 space-y-1.5 max-h-[calc(100vh-140px)] overflow-y-auto">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Platform Services
                </div>

                {sidebarNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-150 flex items-start gap-3 group ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200/80 font-bold shadow-subtle'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                      }`}
                    >
                      <div className={`p-2 rounded-lg mt-0.5 ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{item.label}</span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-400'}`} />
                        </div>
                        <p className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Bottom Footer Info */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>API Status:</span>
                <span className="font-mono text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Operational
                </span>
              </div>
            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
