import React from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../ui/GlassCard';
import { StatCard } from '../ui/StatCard';
import { Cpu, ShieldCheck, Activity, Users, Server, Database, Terminal, CheckCircle2 } from 'lucide-react';

export function AdminDashboard() {
  const { stats } = useApp();

  const auditLogs = [
    { time: '11:20:14', action: 'ML Model Inference Execution', user: 'SYSTEM_BOT', status: 'SUCCESS (14ms)' },
    { time: '11:18:02', action: 'Quarantined Review Cluster #882', user: 'alex.vance@reviewshield.ai', status: 'ACTION_LOGGED' },
    { time: '11:05:45', action: 'API Key RS_LIVE_994 Generated', user: 'ADMIN_SUPER', status: 'SECRET_ISSUED' },
    { time: '10:42:10', action: 'Botnet Burst Rate Limit Triggered', user: '45.12.88.XX', status: 'BLOCKED_IP' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-black text-white">System Administrator Console</h1>
        <p className="text-xs text-slate-400">Platform-wide AI telemetry, ML model precision metrics, audit logs, and infrastructure status.</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="AI Precision Rate" value={`${stats.aiModelPrecision}%`} icon={Cpu} trend="up" trendValue="+0.4%" subtitle="Random Forest NLP Model" glowColor="blue" />
        <StatCard title="AI Model Recall" value={`${stats.aiModelRecall}%`} icon={ShieldCheck} trend="up" trendValue="+0.8%" subtitle="Bot Pattern Classifier" glowColor="purple" />
        <StatCard title="F1 Classification Score" value={`${stats.aiModelF1Score}%`} icon={Activity} trend="up" trendValue="Optimal" subtitle="Harmonic Mean" glowColor="blue" />
        <StatCard title="Active Monitored Products" value={stats.activeMonitoredProducts.toLocaleString()} icon={Server} trend="up" trendValue="+120 Today" subtitle="680 Registered Sellers" glowColor="purple" />
      </div>

      {/* Infrastructure & Model Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Machine Learning Model Diagnostics */}
        <div className="lg:col-span-6 space-y-6">
          <GlassCard glowColor="blue" className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-neon-blue" />
              <span>Python Scikit-Learn / Flask API Diagnostics</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Vectorizer Pipeline</span>
                <span className="text-neon-cyan font-bold">TF-IDF N-Gram (Unigram + Bigram)</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Primary Classifier</span>
                <span className="text-slate-200 font-bold">Random Forest (n_estimators=200)</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Sentiment Engine</span>
                <span className="text-slate-200 font-bold">VADER + Discrepancy Matrix</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Explainability Module</span>
                <span className="text-neon-purple font-bold">SHAP Feature Attribution</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* System Audit Logs */}
        <div className="lg:col-span-6 space-y-6">
          <GlassCard glowColor="purple" className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neon-purple" />
              <span>Real-Time Audit & Security Logs</span>
            </h3>

            <div className="space-y-2.5 font-mono text-xs">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-dark-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">{log.time}</span>
                    <span className="text-neon-cyan">{log.status}</span>
                  </div>
                  <div className="text-slate-200 font-bold">{log.action}</div>
                  <div className="text-slate-400 text-[10px]">Actor: {log.user}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
}
