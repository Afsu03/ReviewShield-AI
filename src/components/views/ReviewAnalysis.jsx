import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { analyzeReviewNLP } from '../../services/nlpLocalEngine';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { ProgressRing } from '../ui/ProgressRing';
import { Cpu, ShieldCheck, AlertTriangle, Sparkles, Terminal, FileText, CheckCircle2, Zap } from 'lucide-react';

export function ReviewAnalysis() {
  const { selectedProduct, submitReview } = useApp();
  
  const [reviewText, setReviewText] = useState("BEST PRODUCT EVER!! BEST QUALITY FAST SHIPPING BUY NOW AMAZING AMAZING SELLER RECOMMENDED 100%!!");
  const [rating, setRating] = useState(5);
  const [verified, setVerified] = useState(false);
  const [accountAgeDays, setAccountAgeDays] = useState(1);
  const [reviewVelocity, setReviewVelocity] = useState(30);

  const [analysisResult, setAnalysisResult] = useState(() => analyzeReviewNLP({
    text: "BEST PRODUCT EVER!! BEST QUALITY FAST SHIPPING BUY NOW AMAZING AMAZING SELLER RECOMMENDED 100%!!",
    rating: 5,
    verified: false,
    accountAgeDays: 1,
    reviewVelocity: 30
  }));

  const handleRunAnalysis = () => {
    const res = analyzeReviewNLP({
      text: reviewText,
      rating,
      verified,
      accountAgeDays: Number(accountAgeDays),
      reviewVelocity: Number(reviewVelocity)
    });
    setAnalysisResult(res);
  };

  const renderHighlightedText = () => {
    if (!analysisResult || !analysisResult.highlightedTokens.length) {
      return <p className="text-sm text-slate-800 font-mono leading-relaxed">{reviewText}</p>;
    }

    let text = reviewText;
    analysisResult.highlightedTokens.forEach((token) => {
      const regex = new RegExp(`(${token.text})`, 'gi');
      text = text.replace(regex, `<mark class="bg-rose-100 text-rose-800 border-b-2 border-rose-500 font-bold px-1 rounded">$1</mark>`);
    });

    return (
      <div 
        className="text-sm text-slate-800 font-mono leading-relaxed"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>ReviewShield NLP & XAI Forensic Tester</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Interactive AI Review Tester</h1>
          <p className="text-xs text-slate-500">Test review text and metadata vectors against our TF-IDF & sentiment discrepancy models.</p>
        </div>

        <button
          onClick={() => {
            submitReview({
              text: reviewText,
              rating,
              verified,
              accountAgeDays: Number(accountAgeDays),
              reviewVelocity: Number(reviewVelocity)
            });
          }}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs shadow-sm transition flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Save Review to Monitoring Stream</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Vector Input */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Input Review Payload</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Review Body Text</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={5}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Star Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Account Age (Days)</label>
                <input
                  type="number"
                  value={accountAgeDays}
                  onChange={(e) => setAccountAgeDays(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Burst Velocity (Reviews/hr)</label>
                <input
                  type="number"
                  value={reviewVelocity}
                  onChange={(e) => setReviewVelocity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono"
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verified}
                    onChange={(e) => setVerified(e.target.checked)}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span className="text-xs text-slate-700 font-semibold">Verified Purchaser</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleRunAnalysis}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs shadow-sm transition"
            >
              Execute TF-IDF & XAI Prediction
            </button>
          </GlassCard>
        </div>

        {/* Right Column: Diagnostics Output */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GlassCard className="p-5 flex items-center gap-4">
              <ProgressRing percentage={analysisResult.fraudScore} size={70} strokeWidth={6} label="" color={analysisResult.isFake ? 'rose' : 'emerald'} />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Fraud Risk</span>
                <h4 className={`text-xl font-black font-mono ${analysisResult.isFake ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {analysisResult.fraudScore}%
                </h4>
                <Badge type={analysisResult.riskLevel} />
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex items-center gap-4">
              <ProgressRing percentage={analysisResult.confidence} size={70} strokeWidth={6} label="" color="cyan" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">AI Confidence</span>
                <h4 className="text-xl font-black font-mono text-blue-600">
                  {analysisResult.confidence}%
                </h4>
                <span className="text-[10px] text-slate-500">Random Forest Ensemble</span>
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex flex-col justify-center">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Text Sentiment</span>
              <h4 className="text-lg font-bold text-slate-900 mt-1">{analysisResult.sentiment}</h4>
              <span className="text-xs font-mono text-slate-500">Score: {analysisResult.sentimentScore}</span>
            </GlassCard>
          </div>

          {/* Highlighted TF-IDF Token View */}
          <GlassCard className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <span>TF-IDF Token Heatmap Highlight</span>
              </h3>
              <span className="text-[11px] text-rose-600 font-mono font-semibold">
                {analysisResult.highlightedTokens.length} Flagged Spam Tokens
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              {renderHighlightedText()}
            </div>
          </GlassCard>

          {/* Explainable AI (XAI) Waterfall Graph */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Explainable AI (XAI) Feature Attribution Waterfall
            </h3>

            <div className="space-y-3">
              {analysisResult.xaiAttributions.map((attr, idx) => {
                const isPositiveRisk = attr.type === 'POSITIVE_RISK';
                return (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{attr.feature}</span>
                      <span className={`font-mono font-bold ${isPositiveRisk ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {attr.weight > 0 ? `+${attr.weight}% Fraud Risk` : `${attr.weight}% Risk Reduction`}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isPositiveRisk ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.abs(attr.weight)}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500">{attr.description}</p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

        </div>

      </div>

    </div>
  );
}
