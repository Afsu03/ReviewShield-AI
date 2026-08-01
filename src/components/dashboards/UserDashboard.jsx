import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../ui/GlassCard';
import { StatCard } from '../ui/StatCard';
import { Badge } from '../ui/Badge';
import { User, ShieldCheck, Star, Clock, CheckCircle2 } from 'lucide-react';

export function UserDashboard() {
  const { user } = useAuth();
  const { reviews } = useApp();

  const userReviews = reviews.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Profile Banner */}
      <GlassCard glowColor="purple" className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-neon-blue to-neon-purple shadow-neon-blue">
            <img src={user?.avatar} alt={user?.name} className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">{user?.name}</h1>
              <Badge type="VERIFIED" />
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-xs text-slate-400 block">Trust Reputation</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">{user?.trustReputation}%</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-slate-400 block font-sans">Reviews Authored</span>
            <span className="text-2xl font-black text-white font-mono">{userReviews.length}</span>
          </div>
        </div>
      </GlassCard>

      {/* User Reviews Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Your Submitted Review History</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userReviews.map((rev) => (
            <GlassCard key={rev.id} glowColor="blue" className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{rev.productName}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                    ))}
                  </div>
                </div>
                <Badge type={rev.riskLevel} />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">{rev.text}</p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Status: <strong className="text-emerald-400">{rev.status}</strong></span>
                <span>Fraud Probability: {rev.fraudScore}%</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

    </div>
  );
}
