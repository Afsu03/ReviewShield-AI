import React from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../ui/GlassCard';
import { StatCard } from '../ui/StatCard';
import { BarChart3, Download, TrendingUp, ShieldAlert, Cpu, CheckCircle2, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function AnalyticsPage() {
  const { stats, reviews } = useApp();

  const timelineData = [
    { time: '00:00', fake: 12, genuine: 84 },
    { time: '04:00', fake: 8, genuine: 45 },
    { time: '08:00', fake: 28, genuine: 190 },
    { time: '12:00', fake: 65, genuine: 320 },
    { time: '16:00', fake: 45, genuine: 280 },
    { time: '20:00', fake: 32, genuine: 210 },
    { time: '23:59', fake: 18, genuine: 110 },
  ];

  const sentimentPieData = [
    { name: 'Extreme Positive (Spam)', value: 42, color: '#ef4444' },
    { name: 'Organic Positive', value: 38, color: '#2563eb' },
    { name: 'Neutral', value: 12, color: '#64748b' },
    { name: 'Targeted Negative', value: 8, color: '#f59e0b' },
  ];

  const exportCSVReport = () => {
    const csvRows = [
      ['Review ID', 'Product', 'Rating', 'Risk Level', 'Fraud Score %', 'Status'],
      ...reviews.map(r => [r.id, `"${r.productName}"`, r.rating, r.riskLevel, r.fraudScore, r.status])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ReviewShield_Fraud_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header & Export Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Fraud Analytics & Platform Telemetry</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time metrics on review volume, fake review bursts, and sentiment anomalies.</p>
        </div>

        <button
          onClick={exportCSVReport}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs shadow-sm transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Fraud Audit Report</span>
        </button>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Reviews Screened" value={stats.totalReviewsAnalyzed.toLocaleString()} icon={BarChart3} trend="up" trendValue="+14.2%" subtitle="All catalog items" />
        <StatCard title="Fake Reviews Blocked" value={stats.fakeReviewsDetected.toLocaleString()} icon={ShieldAlert} trend="up" trendValue="+28.4%" subtitle="24h bot detection" />
        <StatCard title="Platform Trust Index" value={`${stats.overallPlatformTrustScore}%`} icon={CheckCircle2} trend="up" trendValue="+3.1%" subtitle="Verified merchant score" />
        <StatCard title="AI Precision Score" value={`${stats.aiModelPrecision}%`} icon={Cpu} trend="up" trendValue="F1: 97.6%" subtitle="Random Forest Model" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Timeline Chart */}
        <div className="lg:col-span-8">
          <GlassCard className="p-6 space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">24-Hour Review Detection Velocity</h3>
              <p className="text-xs text-slate-500">Comparing authentic customer reviews vs automated bot bursts.</p>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorGenuine" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFake" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="genuine" stroke="#2563eb" fillOpacity={1} fill="url(#colorGenuine)" name="Genuine Reviews" />
                  <Area type="monotone" dataKey="fake" stroke="#ef4444" fillOpacity={1} fill="url(#colorFake)" name="Fake Reviews" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Sentiment Pie Chart */}
        <div className="lg:col-span-4">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Sentiment Anomaly Spectrum</h3>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sentimentPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {sentimentPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              {sentimentPieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 font-medium">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
}
