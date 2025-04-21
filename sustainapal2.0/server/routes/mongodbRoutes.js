const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

// Endpoint to start MongoDB
router.post('/start', (req, res) => {
  // Check if we're on macOS
  const isMac = process.platform === 'darwin';

  // Command to check if MongoDB is already running
  const checkCmd = 'pgrep mongod || echo "not running"';

  exec(checkCmd, (checkErr, checkStdout) => {
    if (checkErr && checkErr.code !== 1) {
      return res.status(500).json({
        success: false,
        message: `Error checking MongoDB status: ${checkErr.message}`
      });
    }

    // If MongoDB is already running
    if (checkStdout.trim() !== 'not running') {
      return res.json({
        success: true,
        message: 'MongoDB is already running'
      });
    }

    // Try to start MongoDB
    // First, try using Homebrew service on macOS
    if (isMac) {
      exec('brew services start mongodb-community', (err, stdout, stderr) => {
        if (!err) {
          return res.json({
            success: true,
            message: 'MongoDB started successfully via Homebrew'
          });
        }

        // If Homebrew service failed, try Docker
        exec('docker ps -a | grep mongo', (dockerCheckErr, dockerCheckStdout) => {
          if (dockerCheckStdout && dockerCheckStdout.includes('mongo')) {
            // Docker container exists, try to start it
            exec('docker start $(docker ps -a | grep mongo | awk \'{print $1}\')', (dockerErr, dockerStdout) => {
              if (!dockerErr) {
                return res.json({
                  success: true,
                  message: 'MongoDB Docker container started successfully'
                });
              }

              return res.status(500).json({
                success: false,
                message: `Failed to start MongoDB Docker container: ${dockerErr?.message || stderr}`
              });
            });
          } else {
            // No Docker container, suggest creating one
            return res.status(500).json({
              success: false,
              message: 'No MongoDB installation found. Please install MongoDB or use Docker.'
            });
          }
        });
      });
    } else {
      // For non-macOS, just try Docker
      exec('docker ps -a | grep mongo', (dockerCheckErr, dockerCheckStdout) => {
        if (dockerCheckStdout && dockerCheckStdout.includes('mongo')) {
          // Docker container exists, try to start it
          exec('docker start $(docker ps -a | grep mongo | awk \'{print $1}\')', (dockerErr, dockerStdout) => {
            if (!dockerErr) {
              return res.json({
                success: true,
                message: 'MongoDB Docker container started successfully'
              });
            }

            return res.status(500).json({
              success: false,
              message: `Failed to start MongoDB Docker container: ${dockerErr?.message}`
            });
          });
        } else {
          // No Docker container, suggest creating one
          return res.status(500).json({
            success: false,
            message: 'No MongoDB installation found. Please install MongoDB or use Docker.'
          });
        }
      });
    }
  });
});

module.exports = router;