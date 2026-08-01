import React from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Shield, Menu, Bell, User, Cpu, BarChart3, Search, ArrowRight } from 'lucide-react';

export function Navbar() {
  const { activeTab, navigateTo, toggleSidebar, notificationCount, setIsNotificationOpen } = useApp();
  const { user, isAuthenticated, switchRole } = useAuth();

  // Primary top navigation items ONLY: Overview, Admin, Review Tester
  const primaryNavItems = [
    { id: 'landing', label: 'Overview' },
    { id: 'admin-dashboard', label: 'Admin' },
    { id: 'review-analysis', label: 'Review Tester' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Section: Hamburger Menu & Brand Logo */}
        <div className="flex items-center gap-3">
          
          {/* Hamburger Menu Icon Button */}
          <button
            onClick={toggleSidebar}
            aria-label="Toggle Navigation Sidebar"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 tracking-tight flex items-center gap-1">
                ReviewShield <span className="text-blue-600 font-semibold text-xs">AI</span>
              </span>
              <span className="text-[10px] text-slate-500 block -mt-1 font-medium">Enterprise Fraud Prevention</span>
            </div>
          </div>

        </div>

        {/* Center: Simplified Primary Navigation (Overview, Admin, Review Tester) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
          {primaryNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Section: Notification Bell & Auth Profile / Role Selector */}
        <div className="flex items-center gap-3">
          
          {/* Real-Time Fraud Notification Bell */}
          <button
            onClick={() => setIsNotificationOpen(prev => !prev)}
            aria-label="Notifications"
            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 relative transition"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Quick Role Selector */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-500 text-[11px]">Role:</span>
            <select
              value={user?.role || 'ADMIN'}
              onChange={(e) => switchRole(e.target.value)}
              className="bg-transparent text-blue-600 font-bold focus:outline-none cursor-pointer"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="SELLER">Seller / Merchant</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* User Sign In / Profile */}
          {isAuthenticated ? (
            <button
              onClick={() => navigateTo('auth')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition"
            >
              <img src={user?.avatar} alt={user?.name} className="w-5 h-5 rounded-full object-cover" />
              <span className="hidden sm:inline">{user?.name}</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo('auth')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
