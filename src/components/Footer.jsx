import React from 'react';
import { Shield, Lock, Cpu, Terminal, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-slate-800/80 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-blue to-neon-purple p-0.5">
                <div className="w-full h-full bg-dark-900 rounded-[6px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-neon-blue" />
                </div>
              </div>
              <span className="font-extrabold text-white text-base">ReviewShield AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enterprise AI & NLP infrastructure powering fake review detection, trust score metrics, and automated fraud prevention for e-commerce platforms.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Flask ML Engine: Connected (v2.4.0)</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-3">Core Modules</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-neon-cyan cursor-pointer transition">TF-IDF Spam Vectorizer</li>
              <li className="hover:text-neon-cyan cursor-pointer transition">Sentiment Discrepancy Matrix</li>
              <li className="hover:text-neon-cyan cursor-pointer transition">XAI SHAP Feature Attributions</li>
              <li className="hover:text-neon-cyan cursor-pointer transition">Botnet Burst Velocity Monitor</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-3">API & Documentation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-neon-cyan cursor-pointer transition">RESTful API Specs (Swagger)</li>
              <li className="hover:text-neon-cyan cursor-pointer transition">Python Flask Integration</li>
              <li className="hover:text-neon-cyan cursor-pointer transition">JWT Security Standard</li>
              <li className="hover:text-neon-cyan cursor-pointer transition">Webhook Alerts Config</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200 mb-3">Platform Status</h4>
            <div className="p-3 rounded-xl bg-dark-800 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Precision / F1 Score</span>
                <span className="font-mono text-neon-blue font-bold">98.4%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">API Response Latency</span>
                <span className="font-mono text-emerald-400 font-bold">14ms</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Reviews Analyzed Today</span>
                <span className="font-mono text-purple-400 font-bold">24,510</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 ReviewShield AI Inc. All rights reserved. Production-Ready Portfolio Architecture.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
