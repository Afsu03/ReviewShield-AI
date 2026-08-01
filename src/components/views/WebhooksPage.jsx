import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { Webhook, Plus, CheckCircle2, RefreshCw, Copy, Check } from 'lucide-react';

export function WebhooksPage() {
  const [copiedId, setCopiedId] = useState(null);

  const webhooksList = [
    {
      id: 'wh-001',
      url: 'https://api.yourstore.com/webhooks/fraud-alerts',
      event: 'review.flagged',
      status: 'ACTIVE',
      lastTriggered: '12 mins ago',
      secret: 'whsec_9941a882f002b11e77'
    },
    {
      id: 'wh-002',
      url: 'https://api.yourstore.com/webhooks/trust-updates',
      event: 'product.trust_score_changed',
      status: 'ACTIVE',
      lastTriggered: '2 hours ago',
      secret: 'whsec_3341c992a11b002e11'
    }
  ];

  const handleCopy = (id, secret) => {
    navigator.clipboard.writeText(secret);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Webhook Integration Endpoints</h1>
          <p className="text-xs text-slate-500 mt-1">Receive real-time HTTP payloads whenever reviews are flagged, quarantined, or analyzed.</p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition">
          <Plus className="w-4 h-4" />
          <span>Add Webhook Endpoint</span>
        </button>
      </div>

      {/* Webhooks List */}
      <div className="space-y-4">
        {webhooksList.map((wh) => (
          <GlassCard key={wh.id} className="p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                  <Webhook className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-mono">{wh.url}</h3>
                  <span className="text-xs text-slate-500 font-mono">Event: <strong className="text-blue-600">{wh.event}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge type="APPROVED" text="ACTIVE" />
                <span className="text-xs text-slate-400 font-mono">{wh.lastTriggered}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono">Signing Secret: <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">{wh.secret}</code></span>
              <button
                onClick={() => handleCopy(wh.id, wh.secret)}
                className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                {copiedId === wh.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === wh.id ? 'Copied' : 'Copy Secret'}</span>
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  );
}
