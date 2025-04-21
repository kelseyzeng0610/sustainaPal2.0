const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Root path response
router.get("/", (req, res) => {
  res.status(200).send("Welcome to Your Website!");
});

router.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// MongoDB status endpoint
router.get("/api/status", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    mongodb: {
      connected: isConnected,
      status: isConnected ? "connected" : "disconnected"
    }
  });
});

module.exports = router;