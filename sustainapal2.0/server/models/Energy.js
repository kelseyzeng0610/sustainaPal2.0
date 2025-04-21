const mongoose = require('mongoose');

const EnergySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currentUsage: {
    type: Number,
    required: true,
    default: 0
  },
  dailyGoal: {
    type: Number,
    required: true,
    default: 15
  },
  costSoFar: {
    type: Number,
    required: true,
    default: 0
  },
  predictedBill: {
    type: Number,
    required: true,
    default: 0
  },
  budget: {
    type: Number,
    required: true,
    default: 50
  },
  savingsPercentage: {
    type: Number,
    required: true,
    default: 25
  },
  totalSaved: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Energy', EnergySchema);