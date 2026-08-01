import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Cpu, Lock, Sparkles, Terminal, Activity, Layers } from 'lucide-react';

export function XAIDashboard() {
  const topFeatures = [
    { feature: 'Promotional Spam N-Grams ("BUY NOW")', weight: 45.2, category: 'TF-IDF Vector' },
    { feature: '5-Star Rating / Neg Text Discrepancy', weight: 35.0, category: 'Sentiment Matrix' },
    { feature: 'Burst Velocity (>25 reviews/hr)', weight: 30.0, category: 'Account Velocity' },
    { feature: 'Account Creation < 24 Hours', weight: 25.0, category: 'Identity Anomaly' },
    { feature: 'Competitor Mention Insertion', weight: 40.0, category: 'Entity Extraction' },
    { feature: 'Verified Buyer Badge', weight: -25.0, category: 'Transaction Log' },
    { feature: 'Organic Usage Terms ("Assembly")', weight: -30.0, category: 'TF-IDF Vector' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-semibold">
          <Lock className="w-3.5 h-3.5 text-neon-pink" />
          <span>Explainable AI (XAI) Mathematical Interpretability</span>
        </div>
        <h1 className="text-3xl font-black text-white mt-2">XAI Model Explanation Engine</h1>
        <p className="text-xs text-slate-400">SHAP feature values, TF-IDF n-gram importance weights, and decision attribution waterfalls.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SHAP Feature Importance Table */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard glowColor="purple" className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-neon-purple" />
              <span>Global SHAP Feature Weight Spectrum</span>
            </h3>

            <div className="space-y-4">
              {topFeatures.map((item, idx) => {
                const isRisk = item.weight > 0;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-100">{item.feature}</span>
                        <span className="text-[10px] text-slate-500 font-mono block">{item.category}</span>
                      </div>
                      <span className={`font-mono font-bold ${isRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {isRisk ? `+${item.weight}%` : `${item.weight}%`}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-dark-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isRisk ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.abs(item.weight)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Explainability Documentation */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard glowColor="blue" className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">How XAI Works</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ReviewShield AI replaces opaque black-box machine learning models with linear feature attribution scoring based on SHAP values.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-dark-800 border border-slate-800">
                <strong className="text-neon-cyan block mb-1">1. TF-IDF Tokenization</strong>
                <span className="text-slate-400">Extracts unigrams and bigrams, comparing term frequencies against spam corpora.</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-800 border border-slate-800">
                <strong className="text-neon-purple block mb-1">2. Sentiment Mismatch</strong>
                <span className="text-slate-400">Cross-references text sentiment polarity with numerical star ratings.</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-800 border border-slate-800">
                <strong className="text-emerald-400 block mb-1">3. Cosine Duplicate Check</strong>
                <span className="text-slate-400">Measures vector distance against previously quarantined bot review clusters.</span>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
}
