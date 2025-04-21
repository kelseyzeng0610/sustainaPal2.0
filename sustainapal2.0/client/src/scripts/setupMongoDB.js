const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to check if Docker is installed
const checkDocker = () => {
  return new Promise((resolve) => {
    exec('docker --version', (error) => {
      resolve(!error);
    });
  });
};

// Function to check if MongoDB is running locally
const checkLocalMongoDB = () => {
  return new Promise((resolve) => {
    exec('mongod --version', (error) => {
      resolve(!error);
    });
  });
};

// Function to update .env file
const updateEnvFile = (connectionString) => {
  const envPath = path.join(__dirname, '../../../.env');
  const serverEnvPath = path.join(__dirname, '../../../server/.env');
  
  // Update main .env file if it exists
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(/DATABASE_URL=.*$/m, `DATABASE_URL=${connectionString}`);
    fs.writeFileSync(envPath, envContent);
  }
  
  // Update server .env file
  if (fs.existsSync(serverEnvPath)) {
    let serverEnvContent = fs.readFileSync(serverEnvPath, 'utf8');
    serverEnvContent = serverEnvContent.replace(/DATABASE_URL=.*$/m, `DATABASE_URL=${connectionString}`);
    fs.writeFileSync(serverEnvPath, serverEnvContent);
  } else {
    // Create server .env file if it doesn't exist
    const defaultEnv = `DATABASE_URL=${connectionString}
PORT=3000
JWT_SECRET=sustainapal_secret_key
JWT_REFRESH_SECRET=sustainapal_refresh_secret_key`;
    fs.writeFileSync(serverEnvPath, defaultEnv);
  }
};

// Function to start MongoDB with Docker
const startMongoDBDocker = () => {
  return new Promise((resolve, reject) => {
    console.log('Starting MongoDB with Docker...');
    exec('docker run --name sustainapal-mongodb -p 27017:27017 -d mongo:latest', (error, stdout) => {
      if (error) {
        console.log('Error starting MongoDB container. If it already exists, try:');
        console.log('docker start sustainapal-mongodb');
        reject(error);
      } else {
        console.log('MongoDB container started successfully!');
        resolve();
      }
    });
  });
};

// Main function
const setupMongoDB = async () => {
  console.log('SustainaPal MongoDB Setup');
  console.log('========================');
  
  const hasDocker = await checkDocker();
  const hasLocalMongoDB = await checkLocalMongoDB();
  
  console.log('\nHow would you like to set up MongoDB?');
  console.log('1. Use Docker ' + (hasDocker ? '(installed)' : '(not installed)'));
  console.log('2. Use local MongoDB installation ' + (hasLocalMongoDB ? '(installed)' : '(not installed)'));
  console.log('3. Use MongoDB Atlas (cloud)');
  
  rl.question('\nEnter your choice (1-3): ', async (choice) => {
    try {
      if (choice === '1') {
        if (!hasDocker) {
          console.log('Docker is not installed. Please install Docker first.');
          rl.close();
          return;
        }
        
        await startMongoDBDocker();
        updateEnvFile('mongodb://localhost:27017/sustainapal');
        console.log('\nMongoDB connection configured successfully!');
        
      } else if (choice === '2') {
        if (!hasLocalMongoDB) {
          console.log('MongoDB is not installed locally. Please install MongoDB first.');
          rl.close();
          return;
        }
        
        updateEnvFile('mongodb://localhost:27017/sustainapal');
        console.log('\nMongoDB connection configured successfully!');
        console.log('Make sure your local MongoDB server is running.');
        
      } else if (choice === '3') {
        rl.question('\nEnter your MongoDB Atlas connection string: ', (connectionString) => {
          updateEnvFile(connectionString);
          console.log('\nMongoDB Atlas connection configured successfully!');
          rl.close();
        });
        return;
      } else {
        console.log('Invalid choice. Please run the script again.');
      }
    } catch (error) {
      console.error('Error during setup:', error.message);
    }
    
    if (choice !== '3') {
      rl.close();
    }
  });
};

setupMongoDB();