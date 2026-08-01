import React from 'react';
import { useApp } from '../../context/AppContext';
import { Scene3D } from '../3d/Scene3D';
import { GlassCard } from '../ui/GlassCard';
import { StatCard } from '../ui/StatCard';
import { Badge } from '../ui/Badge';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Lock, 
  Zap, 
  Store, 
  UserCheck, 
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export function LandingPage() {
  const { navigateTo, stats } = useApp();

  const trustStats = [
    { label: 'Platform Trust Index', value: '98.4%', subtitle: 'AI Detection Precision' },
    { label: 'Reviews Screened', value: '148,290+', subtitle: 'Real-time NLP analysis' },
    { label: 'Fake Reviews Blocked', value: '24,510', subtitle: 'Automated fraud defense' },
    { label: 'API Response Latency', value: '14ms', subtitle: 'Enterprise throughput' },
  ];

  const sellerBenefits = [
    {
      title: 'Protect Brand Reputation',
      description: 'Stop fake 1-star competitor attacks and automated bot campaigns from tanking your product ratings.',
      icon: ShieldCheck
    },
    {
      title: 'Explainable AI Transparency',
      description: 'Understand every automated flag with SHAP-style feature attribution waterfalls—no black boxes.',
      icon: Cpu
    },
    {
      title: 'Automated Review Moderation',
      description: 'Streamline catalog moderation with 1-click approvals, quarantines, and velocity limiters.',
      icon: Store
    },
    {
      title: 'Actionable Fraud Analytics',
      description: 'Identify review burst spikes, sentiment anomalies, and cloned user account subnets.',
      icon: BarChart3
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Clean SaaS Hero Section */}
      <section className="pt-12 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Enterprise-Grade E-Commerce Fraud Defense</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Detect Fake Reviews <br />
              with <span className="text-blue-600">Explainable AI.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              ReviewShield AI helps e-commerce platforms and merchants uncover fraudulent reviews, calculate authentic trust metrics, and automate moderation with complete NLP transparency.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigateTo('review-analysis')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition flex items-center gap-2"
              >
                <span>Start Review Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('xai-dashboard')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm transition"
              >
                Learn More
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> TF-IDF N-Gram Vectorizer
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sentiment Discrepancy Matrix
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Random Forest Ensemble
              </span>
            </div>

          </div>

          {/* Hero 3D Security Shield Right */}
          <div className="lg:col-span-5 h-[400px] bg-gradient-to-b from-blue-50/50 to-slate-100/50 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex items-center justify-center">
            <Scene3D />
          </div>

        </div>
      </section>

      {/* Trust Statistics Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustStats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle text-center sm:text-left space-y-1">
              <span className="text-3xl font-black text-slate-900 font-sans tracking-tight">{stat.value}</span>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{stat.label}</h4>
              <p className="text-[11px] text-slate-500">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer & Seller Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Why E-Commerce Platforms Choose ReviewShield AI</h2>
          <p className="text-sm text-slate-600">Built for merchants, marketplaces, and fraud analysts needing trustworthy product metrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellerBenefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle space-y-3 hover:border-slate-300 transition">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{benefit.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to secure your product reviews?</h2>
            <p className="text-sm text-blue-100 max-w-xl">Test our explainable AI analyzer instantly or connect your e-commerce platform via API.</p>
          </div>
          <button
            onClick={() => navigateTo('review-analysis')}
            className="px-6 py-3 rounded-xl bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition shadow-sm whitespace-nowrap"
          >
            Launch Review Tester
          </button>
        </div>
      </section>

    </div>
  );
}
