// API Service for ReviewShield AI Backend Integration

const API_BASE_URL = '/api';

export const apiService = {
  // Check backend server health status
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[apiService] Health check failed, operating with local fallback', err.message);
      return null;
    }
  },

  // Authenticate user via JWT
  async login(email, password, role = 'ADMIN') {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      if (!res.ok) throw new Error(`Login failed with HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[apiService] Login API unreachable, fallback to local authentication', err.message);
      return null;
    }
  },

  // Fetch product catalog from backend
  async getProducts() {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[apiService] Products API offline, using local fallback', err.message);
      return null;
    }
  },

  // Fetch reviews from backend
  async getReviews(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const url = query ? `${API_BASE_URL}/reviews?${query}` : `${API_BASE_URL}/reviews`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[apiService] Reviews API offline, using local fallback', err.message);
      return null;
    }
  },

  // Post review payload for NLP analysis and persistence
  async analyzeReview(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[apiService] Analyze review API offline, using local engine fallback', err.message);
      return null;
    }
  },

  // Update moderation status of a review
  async updateReviewStatus(reviewId, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[apiService] Status update API offline, using local fallback', err.message);
      return null;
    }
  },

  // Fetch analytics telemetry summary
  async getAnalyticsSummary() {
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/summary`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[apiService] Analytics API offline, using local fallback', err.message);
      return null;
    }
  }
};
