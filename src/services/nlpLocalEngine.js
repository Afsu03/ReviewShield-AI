// ReviewShield AI - Modern Client-Side NLP Engine & XAI Attributor

// Suspicious bot & promotional keywords dictionary with risk weights
const SPAM_KEYWORDS = {
  'buy now': 0.45,
  'fast shipping': 0.35,
  'best quality': 0.30,
  'highly recommend': 0.25,
  '100%': 0.20,
  'amazing amazing': 0.50,
  'seller recommended': 0.35,
  'cheaper': 0.25,
  'do not buy': 0.30,
  'chemical burn': 0.40,
  'destroy': 0.30,
  'go buy': 0.45,
  'best product': 0.25,
  'discount': 0.20,
  'free sample': 0.40,
  'click link': 0.55,
  'promo code': 0.50,
  'whatsapp': 0.60,
  'telegram': 0.60,
  'five stars': 0.25,
};

const GENUINE_INDICATORS = {
  'assembly': -0.30,
  'instructions': -0.25,
  'battery life': -0.25,
  'noise cancellation': -0.30,
  'weeks of testing': -0.35,
  'after 2 months': -0.40,
  'packaging was': -0.20,
  'pros and cons': -0.35,
  'comfort': -0.15,
  'durable': -0.20,
  'fits well': -0.20,
  'firm support': -0.25,
};

// Calculate Sentiment Score (-1.0 to +1.0)
export function calculateSentiment(text) {
  const lowerText = text.toLowerCase();
  const posWords = ['excellent', 'amazing', 'great', 'love', 'best', 'good', 'fantastic', 'superb', 'perfect', 'awesome', 'recommend', 'mind-blowing'];
  const negWords = ['worst', 'terrible', 'horrible', 'waste', 'bad', 'broken', 'poor', 'defective', 'junk', 'rubbish', 'cheap', 'useless', 'chemical burn'];
  
  let posCount = 0;
  let negCount = 0;
  
  posWords.forEach(w => {
    const matches = lowerText.match(new RegExp(`\\b${w}\\b`, 'g'));
    if (matches) posCount += matches.length;
  });
  
  negWords.forEach(w => {
    const matches = lowerText.match(new RegExp(`\\b${w}\\b`, 'g'));
    if (matches) negCount += matches.length;
  });

  const total = posCount + negCount;
  if (total === 0) return { score: 0.1, label: 'NEUTRAL' };
  
  const score = (posCount - negCount) / (total + 1);
  let label = 'NEUTRAL';
  if (score > 0.6) label = 'EXTREME_POSITIVE';
  else if (score > 0.25) label = 'POSITIVE';
  else if (score < -0.4) label = 'NEGATIVE';

  return { score: parseFloat(score.toFixed(2)), label };
}

// Calculate TF-IDF style feature importance and XAI breakdown
export function analyzeReviewNLP({ text, rating, verified = false, accountAgeDays = 30, reviewVelocity = 1 }) {
  const lowerText = text.toLowerCase();
  const sentimentObj = calculateSentiment(text);
  
  let baseFraudScore = 0.15; // Base probability 15%
  const xaiAttributions = [];
  const highlightedTokens = [];

  // 1. TF-IDF Spam Keyword Check
  let spamWeight = 0;
  Object.entries(SPAM_KEYWORDS).forEach(([phrase, weight]) => {
    if (lowerText.includes(phrase)) {
      spamWeight += weight;
      highlightedTokens.push({ text: phrase, severity: weight > 0.4 ? 'HIGH' : 'MEDIUM' });
    }
  });

  if (spamWeight > 0) {
    const impact = Math.min(0.45, spamWeight);
    baseFraudScore += impact;
    xaiAttributions.push({
      feature: 'TF-IDF Promotional / Spam N-Grams',
      weight: parseFloat((impact * 100).toFixed(1)),
      type: 'POSITIVE_RISK',
      description: `Detected repetitive spam patterns or promotional n-grams in text.`
    });
  }

  // 2. Genuine Keywords Check
  let genuineWeight = 0;
  Object.entries(GENUINE_INDICATORS).forEach(([phrase, weight]) => {
    if (lowerText.includes(phrase)) {
      genuineWeight += weight;
    }
  });

  if (genuineWeight < 0) {
    const impact = Math.max(-0.35, genuineWeight);
    baseFraudScore += impact; // negative value reduces score
    xaiAttributions.push({
      feature: 'Organic Product Usage Details',
      weight: parseFloat((impact * 100).toFixed(1)),
      type: 'NEGATIVE_RISK',
      description: `Contains authentic usage details (e.g. assembly, testing duration).`
    });
  }

  // 3. Sentiment vs Rating Discrepancy
  const isHighRating = rating >= 4;
  const isLowRating = rating <= 2;
  
  if (isHighRating && sentimentObj.score < -0.3) {
    baseFraudScore += 0.35;
    xaiAttributions.push({
      feature: 'Rating-Sentiment Mismatch (5-Star / Neg Text)',
      weight: 35.0,
      type: 'POSITIVE_RISK',
      description: `Rating is ${rating}-stars but text sentiment is overwhelmingly negative.`
    });
  } else if (isLowRating && sentimentObj.score > 0.6) {
    baseFraudScore += 0.35;
    xaiAttributions.push({
      feature: 'Rating-Sentiment Mismatch (1-Star / Pos Text)',
      weight: 35.0,
      type: 'POSITIVE_RISK',
      description: `Rating is ${rating}-stars but text sentiment is hyper-positive.`
    });
  }

  // 4. Verification & Account Metrics
  if (!verified) {
    baseFraudScore += 0.20;
    xaiAttributions.push({
      feature: 'Unverified Purchase Status',
      weight: 20.0,
      type: 'POSITIVE_RISK',
      description: 'Reviewer has no verified purchase log on the platform.'
    });
  } else {
    baseFraudScore -= 0.25;
    xaiAttributions.push({
      feature: 'Verified Buyer Badge',
      weight: -25.0,
      type: 'NEGATIVE_RISK',
      description: 'Reviewer purchase transaction confirmed by platform.'
    });
  }

  // 5. Account Age & Review Velocity
  if (accountAgeDays <= 3) {
    baseFraudScore += 0.25;
    xaiAttributions.push({
      feature: 'New Account Creation (< 3 Days)',
      weight: 25.0,
      type: 'POSITIVE_RISK',
      description: `Account was created ${accountAgeDays} days ago.`
    });
  }

  if (reviewVelocity > 10) {
    baseFraudScore += 0.30;
    xaiAttributions.push({
      feature: 'High Burst Velocity (> 10 reviews/hr)',
      weight: 30.0,
      type: 'POSITIVE_RISK',
      description: `User posted ${reviewVelocity} reviews in a short time frame.`
    });
  }

  // Cap final score between 0.02 and 0.99
  const finalFraudScore = Math.min(0.99, Math.max(0.02, baseFraudScore));
  const fraudPercentage = Math.round(finalFraudScore * 100);
  const confidencePercentage = Math.min(99, Math.max(82, Math.round(85 + (xaiAttributions.length * 3.2))));

  let riskLevel = 'LOW';
  let isFake = false;
  if (fraudPercentage >= 70) {
    riskLevel = 'HIGH';
    isFake = true;
  } else if (fraudPercentage >= 40) {
    riskLevel = 'MEDIUM';
    isFake = true;
  }

  return {
    fraudScore: fraudPercentage,
    confidence: confidencePercentage,
    isFake,
    riskLevel,
    sentiment: sentimentObj.label,
    sentimentScore: sentimentObj.score,
    highlightedTokens,
    xaiAttributions,
    reasons: xaiAttributions.map(a => `${a.feature}: ${a.description}`)
  };
}
