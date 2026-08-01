import React from 'react';
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export function Badge({ type = 'LOW', text }) {
  const badgeConfig = {
    LOW: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: ShieldCheck,
      label: 'Genuine / Low Risk'
    },
    MEDIUM: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: AlertTriangle,
      label: 'Suspicious / Medium Risk'
    },
    HIGH: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: ShieldAlert,
      label: 'Fraudulent / High Risk'
    },
    APPROVED: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
      label: 'Approved'
    },
    FLAGGED: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: AlertTriangle,
      label: 'Flagged for Review'
    },
    QUARANTINED: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: XCircle,
      label: 'Quarantined'
    },
    VERIFIED: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: ShieldCheck,
      label: 'Verified Purchaser'
    }
  };

  const current = badgeConfig[type] || badgeConfig.LOW;
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      {text || current.label}
    </span>
  );
}
