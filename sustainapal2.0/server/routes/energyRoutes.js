const express = require('express');
const router = express.Router();
const energyService = require('../services/energyService');
const auth = require('./middleware/auth');

// Get current energy usage
router.get('/current', auth, async (req, res) => {
  try {
    const data = await energyService.getCurrentEnergyUsage(req.user.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bill forecast
router.get('/forecast', auth, async (req, res) => {
  try {
    const data = await energyService.getBillForecast(req.user.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get saving tips
router.get('/tips', auth, async (req, res) => {
  try {
    const data = await energyService.getSavingTips();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const data = await energyService.getLeaderboard(req.user.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get savings
router.get('/savings', auth, async (req, res) => {
  try {
    const data = await energyService.getSavings(req.user.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update savings percentage
router.post('/savings', auth, async (req, res) => {
  try {
    const { percentage } = req.body;
    const data = await energyService.updateSavingsPercentage(req.user.id, percentage);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Set budget
router.post('/budget', auth, async (req, res) => {
  try {
    const { budget } = req.body;
    const data = await energyService.setBudget(req.user.id, budget);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get badges
router.get('/badges', auth, async (req, res) => {
  try {
    const data = await energyService.getBadges(req.user.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;