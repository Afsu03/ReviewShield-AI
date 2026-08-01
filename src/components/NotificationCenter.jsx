import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, ShieldAlert, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NotificationCenter() {
  const { alerts, isNotificationOpen, setIsNotificationOpen, setNotificationCount } = useApp();

  const handleClose = () => {
    setIsNotificationOpen(false);
    setNotificationCount(0);
  };

  return (
    <AnimatePresence>
      {isNotificationOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-20 right-6 w-96 max-w-[calc(100vw-3rem)] glass-panel-glow rounded-2xl p-5 z-50 shadow-2xl border border-neon-blue/30"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-neon-blue animate-bounce" />
              <h3 className="font-bold text-white text-base">Real-Time Fraud Alerts</h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1 rounded-lg hover:bg-dark-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3.5 rounded-xl bg-dark-800/80 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    alert.severity === 'HIGH' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    alert.severity === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {alert.severity} RISK
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{alert.time}</span>
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-slate-100 mt-2">{alert.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{alert.message}</p>
                <div className="mt-2.5 text-xs text-neon-cyan font-mono font-medium">
                  Target: {alert.target}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleClose}
            className="w-full mt-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-xl text-xs font-semibold text-slate-300 transition"
          >
            Mark All Read & Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
