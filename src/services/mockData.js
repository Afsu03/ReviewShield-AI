export const INITIAL_PRODUCTS = [
  {
    id: 'prod-101',
    name: 'AuraSound Max Noise-Canceling Wireless Headphones',
    category: 'Electronics',
    brand: 'AuraTech',
    price: 299.99,
    rating: 4.8,
    totalReviews: 1248,
    fakeCount: 142,
    trustScore: 88,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    description: 'Flagship active noise canceling headphones with high-fidelity spatial audio, 40-hour battery life, and ultra-soft memory foam ear cushions.'
  },
  {
    id: 'prod-102',
    name: 'Vortex G2 Pro Smartwatch & Fitness Tracker',
    category: 'Wearables',
    brand: 'VortexWear',
    price: 189.50,
    rating: 2.1,
    totalReviews: 890,
    fakeCount: 640,
    trustScore: 28,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    description: 'Smartwatch featuring ECG heart monitoring, AMOLED touch display, GPS tracking, and 100+ fitness workout modes.'
  },
  {
    id: 'prod-103',
    name: 'GlowSkin Bio-Cellular Renewal Facial Serum',
    category: 'Beauty & Skincare',
    brand: 'GlowOrganics',
    price: 64.00,
    rating: 4.9,
    totalReviews: 2450,
    fakeCount: 1890,
    trustScore: 23,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60',
    description: 'Anti-aging serum formulated with hyaluronic acid, niacinamide, and botanical peptides for luminous, youthful skin.'
  },
  {
    id: 'prod-104',
    name: 'Ergoflex Pro Ergonomic Mesh Office Chair',
    category: 'Furniture',
    brand: 'ErgoDesign',
    price: 420.00,
    rating: 4.6,
    totalReviews: 512,
    fakeCount: 28,
    trustScore: 95,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&auto=format&fit=crop&q=60',
    description: 'Fully adjustable ergonomic chair with lumbar support, 4D armrests, and breathable mesh backrest for all-day comfort.'
  },
  {
    id: 'prod-105',
    name: 'HyperPulse Mechanical Gaming Keyboard RGB',
    category: 'Gaming Accessories',
    brand: 'HyperPulse',
    price: 129.99,
    rating: 4.4,
    totalReviews: 760,
    fakeCount: 110,
    trustScore: 85,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&auto=format&fit=crop&q=60',
    description: 'Custom hot-swappable mechanical keyboard with PBT keycaps, per-key RGB illumination, and aircraft-grade aluminum frame.'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-001',
    productId: 'prod-101',
    productName: 'AuraSound Max Noise-Canceling Headphones',
    reviewerName: 'Marcus Vance',
    reviewerId: 'usr-8821',
    rating: 5,
    title: 'Mind-blowing active noise cancellation and deep bass!',
    text: 'I travel weekly for work and these headphones are an absolute game changer. ANC blocks out airplane engine hum completely. Battery easily lasts through a trans-atlantic flight. The audio staging is crystal clear.',
    date: '2026-07-28T14:32:00Z',
    verified: true,
    accountAgeDays: 420,
    reviewVelocityCount: 3,
    ipSubnet: '192.168.1.XX',
    isFake: false,
    riskLevel: 'LOW',
    fraudScore: 8,
    confidence: 94,
    sentiment: 'POSITIVE',
    sentimentScore: 0.88,
    status: 'APPROVED',
    reasons: [
      'Natural linguistic flow with specific use-case details (airplane travel)',
      'Verified purchase history matches product dispatch',
      'Consistent account activity velocity'
    ]
  },
  {
    id: 'rev-002',
    productId: 'prod-102',
    productName: 'Vortex G2 Pro Smartwatch',
    reviewerName: 'JohnD_99812',
    reviewerId: 'usr-9912',
    rating: 5,
    title: 'BEST WATCH EVER! BUY NOW FAST SHIPPING HIGHLY RECOMMEND!',
    text: 'BEST WATCH EVER!! BEST PRODUCT BEST QUALITY BUY NOW VERY FAST SHIPPING SELLER IS AMAZING AMAZING AMAZING HIGHLY RECOMMEND TO ALL MY FRIENDS AND FAMILY BUY NOW BEFORE STOCK RUNS OUT!!!',
    date: '2026-07-30T09:12:00Z',
    verified: false,
    accountAgeDays: 1,
    reviewVelocityCount: 45,
    ipSubnet: '45.12.88.XX',
    isFake: true,
    riskLevel: 'HIGH',
    fraudScore: 96,
    confidence: 98,
    sentiment: 'EXTREME_POSITIVE',
    sentimentScore: 0.99,
    status: 'FLAGGED',
    reasons: [
      'High density of promotional spam n-grams ("BUY NOW", "AMAZING", "VERY FAST SHIPPING")',
      'Account created 1 day ago with 45 reviews submitted within 2 hours',
      'Unverified purchaser submitting hyper-enthusiastic text'
    ]
  },
  {
    id: 'rev-003',
    productId: 'prod-103',
    productName: 'GlowSkin Facial Serum',
    reviewerName: 'Sarah Jenkins',
    reviewerId: 'usr-3341',
    rating: 1,
    title: 'Terrible product completely destroyed my skin!!',
    text: 'Worst skin serum on the market. Chemical burn immediately. Do not buy! Instead go buy YouthRenewal Serum by EcoGlow, it is 100x better and cheaper!',
    date: '2026-07-29T18:04:00Z',
    verified: false,
    accountAgeDays: 4,
    reviewVelocityCount: 18,
    ipSubnet: '185.220.101.XX',
    isFake: true,
    riskLevel: 'HIGH',
    fraudScore: 92,
    confidence: 95,
    sentiment: 'NEGATIVE',
    sentimentScore: -0.92,
    status: 'QUARANTINED',
    reasons: [
      'Competitor promotion insertion detected ("buy YouthRenewal Serum by EcoGlow")',
      'Mismatched rating pattern from proxy network IP range',
      'High velocity targeted negative attack'
    ]
  },
  {
    id: 'rev-004',
    productId: 'prod-104',
    productName: 'Ergoflex Pro Ergonomic Mesh Chair',
    reviewerName: 'Elena Rostova',
    reviewerId: 'usr-6712',
    rating: 5,
    title: 'Saved my lower back after 8 hour coding sessions',
    text: 'Assembly took about 20 minutes with clear instructions. The mesh stays cool during hot summer days. The lumbar adjustment dial allows firm support right where I needed it.',
    date: '2026-07-25T11:45:00Z',
    verified: true,
    accountAgeDays: 610,
    reviewVelocityCount: 2,
    ipSubnet: '72.14.192.XX',
    isFake: false,
    riskLevel: 'LOW',
    fraudScore: 4,
    confidence: 96,
    sentiment: 'POSITIVE',
    sentimentScore: 0.74,
    status: 'APPROVED',
    reasons: [
      'Specific functional details regarding assembly and dial controls',
      'Established user account with organic purchase history'
    ]
  },
  {
    id: 'rev-005',
    productId: 'prod-102',
    productName: 'Vortex G2 Pro Smartwatch',
    reviewerName: 'Alex_Tech_Bot',
    reviewerId: 'usr-9915',
    rating: 5,
    title: 'Good watch item very nice fast dispatch',
    text: 'Good watch item very nice fast dispatch. Excellent quality item seller recommended 100%. Five stars product working great.',
    date: '2026-07-31T02:15:00Z',
    verified: false,
    accountAgeDays: 2,
    reviewVelocityCount: 32,
    ipSubnet: '45.12.88.XX',
    isFake: true,
    riskLevel: 'HIGH',
    fraudScore: 89,
    confidence: 92,
    sentiment: 'POSITIVE',
    sentimentScore: 0.85,
    status: 'FLAGGED',
    reasons: [
      'Cloned syntax template matching cluster of 12 other watch reviews',
      'Same IP Subnet (45.12.88.XX) as flagged botnet cluster',
      'Generic non-specific phrases ("good watch item very nice")'
    ]
  }
];

export const SYSTEM_STATS = {
  totalReviewsAnalyzed: 148290,
  fakeReviewsDetected: 24510,
  genuineReviews: 123780,
  overallPlatformTrustScore: 83.5,
  aiModelPrecision: 98.4,
  aiModelRecall: 96.8,
  aiModelF1Score: 97.6,
  fraudAlerts24h: 38,
  activeMonitoredProducts: 4250,
  monitoredSellers: 680
};

export const RECENT_ALERTS = [
  {
    id: 'alt-001',
    severity: 'HIGH',
    title: 'Botnet Review Velocity Spike Detected',
    target: 'Vortex G2 Pro Smartwatch',
    time: '12 mins ago',
    message: 'Detected 45 automated reviews submitted within 30 minutes from IP subnet 45.12.88.XX.'
  },
  {
    id: 'alt-002',
    severity: 'MEDIUM',
    title: 'Competitor Negative Review Infiltration',
    target: 'GlowSkin Bio-Cellular Serum',
    time: '2 hours ago',
    message: '3 unverified 1-star reviews flagged containing promotional text for competing brand EcoGlow.'
  },
  {
    id: 'alt-003',
    severity: 'LOW',
    title: 'Unusual Reviewer Account Velocity',
    target: 'HyperPulse Mechanical Keyboard',
    time: '5 hours ago',
    message: 'Account usr-1029 posted 8 reviews across different electronics in under 10 minutes.'
  }
];
