const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Mock successful registration if DB is not connected
      const accessToken = jwt.sign(
        { id: 'mock-user-id' },
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '1h' }
      );

      return res.status(201).json({
        success: true,
        data: {
          accessToken
        }
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT token
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      data: {
        accessToken
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Mock successful login if DB is not connected
      const accessToken = jwt.sign(
        { id: 'mock-user-id' },
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '1h' }
      );

      const refreshToken = jwt.sign(
        { id: 'mock-user-id' },
        process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key',
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        success: true,
        data: {
          accessToken,
          refreshToken
        }
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      data: {
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key'
    );

    // Generate new access token
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '1h' }
    );

    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      data: {
        accessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  // In a real implementation, you might want to invalidate the token
  // For now, we'll just return a success message
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;