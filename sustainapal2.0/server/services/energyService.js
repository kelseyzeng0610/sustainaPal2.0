const mongoose = require('mongoose');
const Energy = require('../models/Energy');
const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');

const getCurrentEnergyUsage = async (userId) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // Try to get actual data from database
      const energy = await Energy.findOne({ userId });
      
      if (energy) {
        return {
          currentUsage: energy.currentUsage,
          dailyGoal: energy.dailyGoal,
          costSoFar: energy.costSoFar,
          predictedBill: energy.predictedBill,
          budget: energy.budget
        };
      }
    }
    
    // Fall back to mock data if DB is not connected or no data found
    return {
      currentUsage: 12.4,
      dailyGoal: 15,
      costSoFar: 5.75,
      predictedBill: 42.30,
      budget: 50.00
    };
  } catch (error) {
    console.error('Error getting energy usage:', error);
    // Fall back to mock data on error
    return {
      currentUsage: 12.4,
      dailyGoal: 15,
      costSoFar: 5.75,
      predictedBill: 42.30,
      budget: 50.00
    };
  }
};

const getBillForecast = async (userId) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // In a real app, you'd calculate this based on historical data
      const energy = await Energy.findOne({ userId });
      
      if (energy) {
        // This is a simplified version - in a real app, you'd have a more complex calculation
        return {
          forecast: energy.predictedBill,
          history: [
            { month: 'Jan', amount: energy.predictedBill + 5.95 },
            { month: 'Feb', amount: energy.predictedBill + 2.80 },
            { month: 'Mar', amount: energy.predictedBill + 1.45 },
            { month: 'Apr', amount: energy.predictedBill }
          ],
          budget: energy.budget
        };
      }
    }
    
    // Fall back to mock data
    return {
      forecast: 42.30,
      history: [
        { month: 'Jan', amount: 48.25 },
        { month: 'Feb', amount: 45.10 },
        { month: 'Mar', amount: 43.75 },
        { month: 'Apr', amount: 42.30 }
      ],
      budget: 50.00
    };
  } catch (error) {
    console.error('Error getting bill forecast:', error);
    // Fall back to mock data on error
    return {
      forecast: 42.30,
      history: [
        { month: 'Jan', amount: 48.25 },
        { month: 'Feb', amount: 45.10 },
        { month: 'Mar', amount: 43.75 },
        { month: 'Apr', amount: 42.30 }
      ],
      budget: 50.00
    };
  }
};

const getSavingTips = async () => {
  // These are more static, so we'll just use mock data for now
  return {
    tips: [
      {
        id: '1',
        title: 'Turn off your desk lamp when away',
        savings: 5,
        icon: 'lightbulb'
      },
      {
        id: '2',
        title: 'Unplug chargers when not in use',
        savings: 3,
        icon: 'plug'
      },
      {
        id: '3',
        title: 'Lower thermostat by 2°F',
        savings: 8,
        icon: 'thermometer'
      },
      {
        id: '4',
        title: 'Use natural light during daytime',
        savings: 4,
        icon: 'sun'
      },
      {
        id: '5',
        title: 'Switch to LED bulbs',
        savings: 7,
        icon: 'bulb'
      }
    ],
    dailyChallenge: {
      title: 'Reduce usage by 5% today',
      progress: 60,
      reward: 2.5
    }
  };
};

const getLeaderboard = async (userId) => {
  // This would typically be calculated from user data in the database
  // But for simplicity, we'll use mock data
  return {
    leaderboard: [
      { id: '1', name: 'Emma S.', avatar: '/avatars/1.png', savings: 12.50 },
      { id: '2', name: 'Liam T.', avatar: '/avatars/2.png', savings: 10.75 },
      { id: '3', name: 'Olivia M.', avatar: '/avatars/3.png', savings: 9.30 },
      { id: '4', name: 'Noah K.', avatar: '/avatars/4.png', savings: 8.45 },
      { id: '5', name: 'Ava P.', avatar: '/avatars/5.png', savings: 7.80 },
      { id: 'current', name: 'You', avatar: '/avatars/user.png', savings: 9.30 }
    ],
    currentUser: {
      id: 'current',
      position: 3
    }
  };
};

const getSavings = async (userId) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const energy = await Energy.findOne({ userId });
      
      if (energy) {
        return {
          totalSaved: energy.totalSaved,
          savingsPercentage: energy.savingsPercentage
        };
      }
    }
    
    // Fall back to mock data
    return {
      totalSaved: 37.50,
      savingsPercentage: 25
    };
  } catch (error) {
    console.error('Error getting savings:', error);
    // Fall back to mock data on error
    return {
      totalSaved: 37.50,
      savingsPercentage: 25
    };
  }
};

const updateSavingsPercentage = async (userId, percentage) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const energy = await Energy.findOne({ userId });
      
      if (energy) {
        energy.savingsPercentage = percentage;
        energy.updatedAt = Date.now();
        await energy.save();
      } else {
        // Create new energy record if one doesn't exist
        await Energy.create({
          userId,
          savingsPercentage: percentage
        });
      }
    }
    
    // Return success regardless (we're using mock data if DB isn't connected)
    return {
      success: true,
      message: 'Savings percentage updated successfully'
    };
  } catch (error) {
    console.error('Error updating savings percentage:', error);
    throw new Error('Failed to update savings percentage');
  }
};

const setBudget = async (userId, budget) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const energy = await Energy.findOne({ userId });
      
      if (energy) {
        energy.budget = budget;
        energy.updatedAt = Date.now();
        await energy.save();
      } else {
        // Create new energy record if one doesn't exist
        await Energy.create({
          userId,
          budget
        });
      }
    }
    
    // Return success with the new budget
    return {
      success: true,
      message: 'Budget set successfully',
      budget
    };
  } catch (error) {
    console.error('Error setting budget:', error);
    throw new Error('Failed to set budget');
  }
};

const getBadges = async (userId) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      // In a real app, you'd query user badges from the database
      // For now, we'll use mock data
    }
    
    // Fall back to mock data
    return {
      badges: [
        { id: '1', name: 'First Week Saver', icon: 'award', unlocked: true },
        { id: '2', name: 'Eco-Champion', icon: 'leaf', unlocked: true },
        { id: '3', name: 'Power Saver', icon: 'zap', unlocked: false, progress: 70 },
        { id: '4', name: 'Conservation Master', icon: 'droplet', unlocked: false, progress: 30 },
        { id: '5', name: 'Green Guru', icon: 'tree', unlocked: false, progress: 10 },
        { id: '6', name: 'Energy Wizard', icon: 'sparkles', unlocked: false, progress: 5 }
      ],
      nextBadge: {
        id: '3',
        name: 'Power Saver',
        icon: 'zap',
        progress: 70
      }
    };
  } catch (error) {
    console.error('Error getting badges:', error);
    // Fall back to mock data on error
    return {
      badges: [
        { id: '1', name: 'First Week Saver', icon: 'award', unlocked: true },
        { id: '2', name: 'Eco-Champion', icon: 'leaf', unlocked: true },
        { id: '3', name: 'Power Saver', icon: 'zap', unlocked: false, progress: 70 },
        { id: '4', name: 'Conservation Master', icon: 'droplet', unlocked: false, progress: 30 },
        { id: '5', name: 'Green Guru', icon: 'tree', unlocked: false, progress: 10 },
        { id: '6', name: 'Energy Wizard', icon: 'sparkles', unlocked: false, progress: 5 }
      ],
      nextBadge: {
        id: '3',
        name: 'Power Saver',
        icon: 'zap',
        progress: 70
      }
    };
  }
};

module.exports = {
  getCurrentEnergyUsage,
  getBillForecast,
  getSavingTips,
  getLeaderboard,
  getSavings,
  updateSavingsPercentage,
  setBudget,
  getBadges
};