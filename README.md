# ReviewShield AI – Fake Review Monitoring System for E-Commerce Platforms

> **Production-Ready Enterprise AI & Fraud Defense Suite**  
> Protect e-commerce platforms with real-time NLP fake review detection, TF-IDF feature attributions, 3D WebGL trust visualizers, and Explainable AI (XAI) dashboards.

---

## Key Highlights & Features

- **Immersive 3D Experience**: Interactive Three.js/WebGL WebGL scene featuring a 3D Floating Security Shield with rotating energy rings, neural network particle graph, and interactive product package models.
- **Explainable AI (XAI) Engine**: SHAP-style feature attribution waterfall graph detailing exact mathematical reasons behind every fraud flag (`+35% Sentiment Mismatch`, `+45% Promotional N-Gram`, `-25% Verified Buyer`).
- **TF-IDF Keyword Heatmap**: Real-time token highlighting in review text pointing out bot phrases and promotional spam.
- **10 Integrated SaaS Views**: Overview Landing Page, JWT Authentication, User Review History, Product Details & 3D Packaging, AI Review Tester Sandbox, Merchant Seller Desk, System Admin Portal, XAI Interpretability Engine, Analytics Telemetry, and Settings.
- **Full-Stack Architecture**: React + Vite + Tailwind CSS frontend coupled with Express.js REST APIs and a standalone Python Flask ML engine (`flask_ai_api.py`).
- **Batch CSV & Report Exporter**: Download 1-click audit reports in CSV format.

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Three.js, React Three Fiber, Framer Motion, Lucide Icons, Recharts
- **Backend**: Node.js, Express.js, JWT Authentication, CORS, Dotenv
- **Machine Learning**: Python 3, Flask, Scikit-Learn (TF-IDF Vectorizer + Random Forest)
- **Design System**: Dark Mode SaaS Aesthetic, Glassmorphism, Neon Blue (`#00f0ff`) and Neon Purple (`#7000ff`) accents

---

## Getting Started

### 1. Install Frontend & Node Backend Dependencies
```bash
cd reviewshield-ai
npm install
```

### 2. Run React Frontend (Dev Server)
```bash
npm run dev
```
The application will launch on **http://localhost:3000** (or `http://localhost:5173`).

### 3. Run Node Express Server
```bash
npm run server
```
Runs on **http://localhost:5000**.

### 4. (Optional) Run Python Flask ML API
```bash
pip install flask flask-cors scikit-learn
npm run flask
```
Runs on **http://localhost:5001**.

---

## System Architecture

```
Client UI (React + Three.js) ──► Express.js API Server (port 5000)
                                   ├── Client-Side NLP Core (Fallback Engine)
                                   └── Python Flask ML Engine (port 5001)
```

---

## License & Portfolio Notice
Designed for high-impact software engineering portfolios and production enterprise demonstrations.
