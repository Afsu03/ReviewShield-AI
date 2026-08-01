import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { ProgressRing } from '../ui/ProgressRing';
import { Star, ShieldCheck, AlertTriangle, PlusCircle, CheckCircle2 } from 'lucide-react';

export function ProductDetails() {
  const { products, selectedProduct, setSelectedProduct, reviews, submitReview } = useApp();
  
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productReviews = reviews.filter(r => r.productId === selectedProduct.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitReview({
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        rating: newRating,
        title: newTitle || 'Product Feedback',
        text: newText,
        verified: isVerified
      });
      setNewText('');
      setNewTitle('');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      
      {/* Product Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {products.map((prod) => (
          <button
            key={prod.id}
            onClick={() => setSelectedProduct(prod)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              selectedProduct.id === prod.id
                ? 'bg-blue-50 text-blue-700 border-blue-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {prod.name}
          </button>
        ))}
      </div>

      {/* Product Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-subtle">
        
        {/* Product Image Showcase */}
        <div className="lg:col-span-5 h-[300px] rounded-xl bg-slate-50 relative overflow-hidden flex items-center justify-center border border-slate-200">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl border border-slate-200">
            <ProgressRing percentage={selectedProduct.trustScore} size={70} strokeWidth={6} label="" color={selectedProduct.trustScore > 70 ? 'cyan' : 'rose'} />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedProduct.category} • {selectedProduct.brand}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 leading-tight">{selectedProduct.name}</h1>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{selectedProduct.description}</p>
          </div>

          <div className="flex items-center gap-8 py-4 border-y border-slate-100">
            <div>
              <span className="text-xs text-slate-500 block">Retail Price</span>
              <span className="text-2xl font-bold text-slate-900 font-sans">${selectedProduct.price}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Average Rating</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-lg font-bold text-slate-900">{selectedProduct.rating}</span>
                <span className="text-xs text-slate-500">({selectedProduct.totalReviews} reviews)</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Fake Reviews Filtered</span>
              <span className="text-lg font-bold text-rose-600">{selectedProduct.fakeCount}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Review Submission & Reviews List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Submit New Review */}
        <div className="lg:col-span-5">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-600" />
              <span>Post Product Review</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className={`p-2 rounded-xl transition ${
                        newRating >= star ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Excellent build quality and design"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Review Content</label>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  rows={4}
                  placeholder="Share authentic usage feedback..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="verifiedCheck"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <label htmlFor="verifiedCheck" className="text-xs text-slate-700 font-semibold">Verified Purchaser</label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs shadow-sm transition"
              >
                {isSubmitting ? 'Screening via ReviewShield AI...' : 'Submit & Analyze Review'}
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Right Column: Screened Reviews */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Screened Product Reviews ({productReviews.length})</h3>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {productReviews.map((rev) => (
              <div key={rev.id} className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{rev.reviewerName}</span>
                      {rev.verified && <Badge type="VERIFIED" />}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      ))}
                      <span className="text-xs font-semibold text-slate-800 ml-2">{rev.title}</span>
                    </div>
                  </div>
                  <Badge type={rev.riskLevel} />
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{rev.text}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-mono">Fraud Risk: <strong className={rev.isFake ? 'text-rose-600' : 'text-emerald-600'}>{rev.fraudScore}%</strong></span>
                  <span className="text-slate-500 font-mono">AI Confidence: <strong className="text-blue-600">{rev.confidence}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
