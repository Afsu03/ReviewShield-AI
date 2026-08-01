import React from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../ui/GlassCard';
import { FileText, Download, CheckCircle2, Calendar } from 'lucide-react';

export function ReportsPage() {
  const { reviews } = useApp();

  const exportCSV = () => {
    const csvRows = [
      ['Review ID', 'Product', 'Rating', 'Risk Level', 'Fraud Score %', 'Status'],
      ...reviews.map(r => [r.id, `"${r.productName}"`, r.rating, r.riskLevel, r.fraudScore, r.status])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ReviewShield_Audit_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sampleReports = [
    { title: 'Monthly Fake Review Audit Summary', date: 'July 2026', size: '2.4 MB', count: '14,820 records' },
    { title: 'Botnet Burst Attack Incident Log', date: 'July 30, 2026', size: '850 KB', count: '640 records' },
    { title: 'Seller Catalog Trust Ratings Export', date: 'July 28, 2026', size: '1.2 MB', count: '4,250 products' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Fraud Audit Reports & Exports</h1>
          <p className="text-xs text-slate-500 mt-1">Download CSV and PDF reports detailing fake review activity, trust scores, and incident logs.</p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition"
        >
          <Download className="w-4 h-4" />
          <span>Export Live CSV Data</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleReports.map((report, idx) => (
          <GlassCard key={idx} className="p-6 space-y-4">
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600 w-10 h-10 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900">{report.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{report.count} • {report.size}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {report.date}
              </span>
              <button
                onClick={exportCSV}
                className="text-blue-600 font-bold hover:underline"
              >
                Download CSV →
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  );
}
