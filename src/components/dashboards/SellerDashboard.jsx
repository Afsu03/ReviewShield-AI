import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../ui/GlassCard';
import { StatCard } from '../ui/StatCard';
import { Badge } from '../ui/Badge';
import { ShoppingBag, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Eye, Filter, RefreshCw } from 'lucide-react';

export function SellerDashboard() {
  const { products, reviews, updateReviewStatus, setSelectedProduct, setActiveTab } = useApp();
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredReviews = statusFilter === 'ALL'
    ? reviews
    : reviews.filter(r => r.status === statusFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-black text-white">Merchant Seller Desk</h1>
          <p className="text-xs text-slate-400">Monitor store product trust scores and perform real-time review moderation.</p>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'FLAGGED', 'QUARANTINED', 'APPROVED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === status
                  ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue'
                  : 'bg-dark-800 text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Product Trust Overview */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider">Monitored Product Catalog Trust Scores</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <GlassCard key={prod.id} glowColor={prod.trustScore > 70 ? 'blue' : 'purple'} className="p-5 space-y-4">
              <div className="flex items-start gap-4">
                <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
                <div>
                  <h4 className="font-bold text-sm text-slate-100 line-clamp-1">{prod.name}</h4>
                  <span className="text-xs text-slate-400 font-mono">${prod.price}</span>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-slate-400">Trust Index:</span>
                    <span className={`text-sm font-extrabold font-mono ${prod.trustScore > 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {prod.trustScore}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                <span className="text-slate-400 font-mono">{prod.totalReviews} Total • <strong className="text-rose-400">{prod.fakeCount} Fake</strong></span>
                <button
                  onClick={() => {
                    setSelectedProduct(prod);
                    setActiveTab('product-details');
                  }}
                  className="text-neon-cyan font-bold hover:underline"
                >
                  Inspect Details →
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Real-time Review Moderation Table */}
      <GlassCard glowColor="purple" className="p-6 space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider">Live Review Moderation Feed</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-dark-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Reviewer</th>
                <th className="p-3">Review Content</th>
                <th className="p-3">Fraud Score</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3">Current Status</th>
                <th className="p-3 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredReviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-dark-800/50 transition">
                  <td className="p-3 font-semibold text-slate-100 max-w-[150px] truncate">{rev.productName}</td>
                  <td className="p-3 font-mono text-slate-300">{rev.reviewerName}</td>
                  <td className="p-3 max-w-[280px] truncate text-slate-300">{rev.text}</td>
                  <td className="p-3 font-mono font-bold">
                    <span className={rev.isFake ? 'text-rose-400' : 'text-emerald-400'}>{rev.fraudScore}%</span>
                  </td>
                  <td className="p-3"><Badge type={rev.riskLevel} /></td>
                  <td className="p-3"><Badge type={rev.status} /></td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => updateReviewStatus(rev.id, 'APPROVED')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-[11px] font-bold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateReviewStatus(rev.id, 'QUARANTINED')}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 text-[11px] font-bold"
                    >
                      Quarantine
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

    </div>
  );
}
