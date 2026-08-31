const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  source: {
    type: String,
    enum: ['amazon', 'ebay', 'walmart', 'custom'],
    default: 'custom',
  },
  isFake: {
    type: Boolean,
    default: false,
  },
  confidence: {
    type: Number,
    min: 0,
    max: 1,
    default: 0,
  },
  analysis: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
