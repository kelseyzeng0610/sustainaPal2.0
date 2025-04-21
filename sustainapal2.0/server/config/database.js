const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use environment variable for MongoDB URI with fallback
    const mongoURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/sustainapal';

    // Options to handle deprecation warnings
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of default 30
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    // Connect to MongoDB
    await mongoose.connect(mongoURI, options);

    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Provide more helpful error message based on error type
    if (error.name === 'MongoNetworkError' || error.message.includes('ECONNREFUSED')) {
      console.log('Could not connect to MongoDB. Please make sure MongoDB is running.');
      console.log('You can start it with: mongod --dbpath ~/data/db');
      console.log('Or with Docker: docker run --name sustainapal-mongodb -p 27017:27017 -d mongo:latest');
    }
    
    console.log('Continuing with mock data instead of database connection');
    return false;
    // Don't exit the process immediately, allow for retry or graceful handling
    // process.exit(1);
  }
};

module.exports = { connectDB };