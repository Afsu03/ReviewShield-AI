import React from 'react';
import { GlassCard } from './GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatCard({ title, value, icon: Icon, trend, trendValue, subtitle }) {
  const isPositiveTrend = trend === 'up';

  return (
    <GlassCard className="relative bg-white border border-slate-200 shadow-subtle p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{title}</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
        {trendValue && (
          <div className={`flex items-center gap-1 font-semibold ${isPositiveTrend ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositiveTrend ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{trendValue}</span>
          </div>
        )}
        {subtitle && <span className="text-slate-500 ml-auto">{subtitle}</span>}
      </div>
    </GlassCard>
  );
}
