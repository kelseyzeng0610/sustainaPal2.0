const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Energy = require('../models/Energy');
const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const bcrypt = require('bcrypt');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/sustainapal');
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Seed badges
const seedBadges = async () => {
  const badges = [
    {
      name: 'First Week Saver',
      icon: 'award',
      description: 'Completed your first week of energy savings'
    },
    {
      name: 'Eco-Champion',
      icon: 'leaf',
      description: 'Reduced energy consumption by 10% for a month'
    },
    {
      name: 'Power Saver',
      icon: 'zap',
      description: 'Saved $20 in a single month'
    },
    {
      name: 'Conservation Master',
      icon: 'droplet',
      description: 'Kept usage below budget for 3 consecutive months'
    },
    {
      name: 'Green Guru',
      icon: 'tree',
      description: 'Applied 10 energy-saving tips'
    },
    {
      name: 'Energy Wizard',
      icon: 'sparkles',
      description: 'Reached the top of the leaderboard'
    }
  ];

  await Badge.deleteMany({});
  await Badge.insertMany(badges);
  console.log('Badges seeded successfully');
};

// Seed users
const seedUsers = async () => {
  // Delete existing users
  await User.deleteMany({});
  
  // Create test user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);
  
  const user = new User({
    email: 'test@example.com',
    password: hashedPassword
  });
  
  const savedUser = await user.save();
  console.log('User seeded successfully');
  
  return savedUser;
};

// Seed energy data
const seedEnergyData = async (userId) => {
  // Delete existing energy data
  await Energy.deleteMany({});
  
  // Create energy data for user
  const energy = new Energy({
    userId: userId,
    currentUsage: 12.4,
    dailyGoal: 15,
    costSoFar: 5.75,
    predictedBill: 42.30,
    budget: 50.00,
    savingsPercentage: 25,
    totalSaved: 37.50
  });
  
  await energy.save();
  console.log('Energy data seeded successfully');
};

// Seed user badges
const seedUserBadges = async (userId) => {
  // Delete existing user badges
  await UserBadge.deleteMany({});
  
  // Get all badges
  const badges = await Badge.find({});
  
  // Assign first two badges as unlocked, rest as in progress
  const userBadges = badges.map((badge, index) => ({
    userId: userId,
    badgeId: badge._id,
    unlocked: index < 2,
    progress: index < 2 ? 100 : (70 / Math.pow(2, index - 2)) // Decreasing progress
  }));
  
  await UserBadge.insertMany(userBadges);
  console.log('User badges seeded successfully');
};

// Main function
const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Seed badges first
    await seedBadges();
    
    // Seed users and get the user ID
    const user = await seedUsers();
    
    // Seed energy data for the user
    await seedEnergyData(user._id);
    
    // Seed user badges
    await seedUserBadges(user._id);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();