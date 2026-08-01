import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Key, Bell, Shield, Sliders, Copy, Check, Webhook } from 'lucide-react';

export function SettingsPage() {
  const [apiKey, setApiKey] = useState('rs_live_9941a882f002b11e774c0a');
  const [copied, setCopied] = useState(false);
  const [sensitivity, setSensitivity] = useState(75);
  const [autoQuarantine, setAutoQuarantine] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('https://api.yourstore.com/webhooks/review-fraud');

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateKey = () => {
    setApiKey(`rs_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 10)}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-black text-white">System Settings & API Configuration</h1>
        <p className="text-xs text-slate-400">Configure ReviewShield AI fraud thresholds, API keys, and automated webhook notifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* API Keys & Webhooks */}
        <GlassCard glowColor="blue" className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-neon-blue" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">REST API Access Key</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Production API Key</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="w-full p-3 rounded-xl bg-dark-900 border border-slate-700 text-neon-blue font-mono text-xs focus:outline-none"
              />
              <button
                onClick={copyApiKey}
                className="p-3 rounded-xl bg-dark-700 hover:bg-dark-600 text-slate-200"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={regenerateKey}
              className="text-[11px] text-neon-cyan hover:underline mt-2 font-mono font-semibold"
            >
              Regenerate API Secret Key
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <Webhook className="w-4 h-4 text-neon-purple" />
              <h4 className="text-xs font-bold text-white">Webhook Alert URL</h4>
            </div>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full p-3 rounded-xl bg-dark-900 border border-slate-700 text-slate-200 text-xs font-mono"
            />
          </div>
        </GlassCard>

        {/* AI Fraud Threshold Control */}
        <GlassCard glowColor="purple" className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-neon-purple" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Fraud Detection Sensitivity</h3>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-semibold">Fraud Risk Threshold:</span>
              <span className="font-mono font-extrabold text-neon-purple">{sensitivity}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={sensitivity}
              onChange={(e) => setSensitivity(e.target.value)}
              className="w-full accent-neon-purple bg-dark-800 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 mt-2">
              Reviews scoring above {sensitivity}% fraud probability will be automatically flagged for merchant review.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-slate-300">Auto-Quarantine High Risk Reviews</span>
              <input
                type="checkbox"
                checked={autoQuarantine}
                onChange={(e) => setAutoQuarantine(e.target.checked)}
                className="w-4 h-4 rounded accent-neon-purple"
              />
            </label>
          </div>

          <button className="w-full py-3 rounded-xl bg-neon-glow font-bold text-white text-xs shadow-neon-purple hover:opacity-90 transition">
            Save Engine Preferences
          </button>
        </GlassCard>

      </div>

    </div>
  );
}
