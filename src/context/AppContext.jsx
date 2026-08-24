import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, RECENT_ALERTS, SYSTEM_STATS } from '../services/mockData';
import { analyzeReviewNLP } from '../services/nlpLocalEngine';
import { apiService } from '../services/apiService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('landing'); // landing, admin-dashboard, review-analysis, user-dashboard, product-details, seller-dashboard, xai-dashboard, analytics, settings, webhooks, reports
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [alerts, setAlerts] = useState(RECENT_ALERTS);
  const [stats, setStats] = useState(SYSTEM_STATS);
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS[0]);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Load live data from Express backend on mount
  useEffect(() => {
    async function loadBackendData() {
      const [fetchedProducts, fetchedReviews, fetchedStats] = await Promise.all([
        apiService.getProducts(),
        apiService.getReviews(),
        apiService.getAnalyticsSummary()
      ]);

      if (fetchedProducts && fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
        setSelectedProduct(fetchedProducts[0]);
      }
      if (fetchedReviews && fetchedReviews.length > 0) {
        setReviews(fetchedReviews);
      }
      if (fetchedStats) {
        setStats(fetchedStats);
      }
    }
    loadBackendData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navigateTo = (tabId) => {
    setActiveTab(tabId);
    // Auto collapse sidebar on selection
    setIsSidebarOpen(false);
  };

  // Submit new review and analyze automatically via backend API
  const submitReview = async (reviewData) => {
    const payload = {
      text: reviewData.text,
      rating: reviewData.rating,
      verified: reviewData.verified,
      accountAgeDays: reviewData.accountAgeDays || 30,
      reviewVelocity: reviewData.reviewVelocity || 1,
      productId: reviewData.productId || selectedProduct.id
    };

    const apiResponse = await apiService.analyzeReview(payload);

    let newRev;
    if (apiResponse && apiResponse.success && apiResponse.review) {
      newRev = apiResponse.review;
      setReviews(prev => [newRev, ...prev]);

      const updatedStats = await apiService.getAnalyticsSummary();
      if (updatedStats) {
        setStats(updatedStats);
      }
    } else {
      // Local fallback if API server is offline
      const analysis = analyzeReviewNLP({
        text: reviewData.text,
        rating: reviewData.rating,
        verified: reviewData.verified,
        accountAgeDays: reviewData.accountAgeDays || 30,
        reviewVelocity: reviewData.reviewVelocity || 1
      });

      newRev = {
        id: `rev-${Date.now()}`,
        productId: reviewData.productId || selectedProduct.id,
        productName: reviewData.productName || selectedProduct.name,
        reviewerName: reviewData.reviewerName || 'Anonymous Buyer',
        reviewerId: reviewData.reviewerId || 'usr-temp',
        rating: reviewData.rating,
        title: reviewData.title || 'Product Review',
        text: reviewData.text,
        date: new Date().toISOString(),
        verified: reviewData.verified,
        accountAgeDays: reviewData.accountAgeDays || 30,
        reviewVelocityCount: reviewData.reviewVelocity || 1,
        ipSubnet: '192.168.1.XX',
        ...analysis,
        status: analysis.isFake ? 'FLAGGED' : 'APPROVED'
      };

      setReviews(prev => [newRev, ...prev]);

      if (analysis.isFake) {
        setStats(prev => ({
          ...prev,
          totalReviewsAnalyzed: prev.totalReviewsAnalyzed + 1,
          fakeReviewsDetected: prev.fakeReviewsDetected + 1,
          fraudAlerts24h: prev.fraudAlerts24h + 1
        }));
      } else {
        setStats(prev => ({
          ...prev,
          totalReviewsAnalyzed: prev.totalReviewsAnalyzed + 1,
          genuineReviews: prev.genuineReviews + 1
        }));
      }
    }

    return newRev;
  };

  const updateReviewStatus = async (reviewId, newStatus) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
    await apiService.updateReviewStatus(reviewId, newStatus);
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      navigateTo,
      isSidebarOpen,
      setIsSidebarOpen,
      toggleSidebar,
      closeSidebar,
      products,
      setProducts,
      reviews,
      setReviews,
      alerts,
      stats,
      selectedProduct,
      setSelectedProduct,
      submitReview,
      updateReviewStatus,
      notificationCount,
      setNotificationCount,
      isNotificationOpen,
      setIsNotificationOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

