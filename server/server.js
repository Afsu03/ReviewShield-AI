import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { analyzeReviewNLP } from '../src/services/nlpLocalEngine.js';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, SYSTEM_STATS } from '../src/services/mockData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'reviewshield-super-secret-key-2026';

app.use(cors());
app.use(express.json());

// In-Memory Database Store
let productsDB = [...INITIAL_PRODUCTS];
let reviewsDB = [...INITIAL_REVIEWS];
let statsDB = { ...SYSTEM_STATS };

// Middleware: API Request Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Route: Health Check & Swagger API Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'ReviewShield AI Monitoring Server',
    version: '1.0.0',
    pythonMLBridge: 'ENABLED',
    timestamp: new Date().toISOString()
  });
});

// Route: JWT Authentication Login
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const token = jwt.sign({ email, role: role || 'ADMIN' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({
    token,
    user: {
      id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
      email,
      role: role || 'ADMIN',
      name: email.split('@')[0].toUpperCase(),
      trustReputation: 98
    }
  });
});

// Route: Get All Products
app.get('/api/products', (req, res) => {
  res.json(productsDB);
});

// Route: Get All Reviews
app.get('/api/reviews', (req, res) => {
  const { status, riskLevel } = req.query;
  let filtered = reviewsDB;
  if (status) filtered = filtered.filter(r => r.status === status);
  if (riskLevel) filtered = filtered.filter(r => r.riskLevel === riskLevel);
  res.json(filtered);
});

// Route: Deep Analyze Review (TF-IDF + Sentiment + XAI)
app.post('/api/reviews/analyze', (req, res) => {
  const { text, rating = 5, verified = false, accountAgeDays = 30, reviewVelocity = 1, productId } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Review text is required for analysis' });
  }

  const analysis = analyzeReviewNLP({ text, rating, verified, accountAgeDays, reviewVelocity });

  const newReviewRecord = {
    id: `rev-${Date.now()}`,
    productId: productId || productsDB[0].id,
    productName: productsDB.find(p => p.id === productId)?.name || productsDB[0].name,
    reviewerName: 'API Submitter',
    text,
    rating,
    verified,
    accountAgeDays,
    reviewVelocityCount: reviewVelocity,
    date: new Date().toISOString(),
    ...analysis,
    status: analysis.isFake ? 'FLAGGED' : 'APPROVED'
  };

  reviewsDB.unshift(newReviewRecord);
  
  if (analysis.isFake) {
    statsDB.fakeReviewsDetected += 1;
    statsDB.fraudAlerts24h += 1;
  } else {
    statsDB.genuineReviews += 1;
  }
  statsDB.totalReviewsAnalyzed += 1;

  res.json({
    success: true,
    review: newReviewRecord
  });
});

// Route: Update Moderation Status
app.patch('/api/reviews/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const target = reviewsDB.find(r => r.id === id);
  if (!target) {
    return res.status(404).json({ error: 'Review not found' });
  }

  target.status = status;
  res.json({ success: true, review: target });
});

// Route: Analytics Telemetry Summary
app.get('/api/analytics/summary', (req, res) => {
  res.json(statsDB);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER_ERROR]', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`[ReviewShield AI] Express Server running on http://localhost:${PORT}`);
});
