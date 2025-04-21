# SustainaPal 2.0

An energy-monitoring & savings app for college students.

## Features

- Real-time energy usage monitoring
- Cost forecasting with ML predictions
- Personalized energy-saving tips
- Campus leaderboard for energy savings
- Savings tracking and bill payment integration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (optional - the app will use mock data if MongoDB is not available)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sustainapal.git
   cd sustainapal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up MongoDB (optional):
   ```
   node scripts/setup-mongodb.js
   ```
   This script will guide you through setting up MongoDB using Docker, a local installation, or MongoDB Atlas.

4. Start the application:
   ```
   npm run start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Running Options

- **Development mode**: `npm run start` (runs both client and server)
- **Client only**: `npm run client`
- **Server only**: `npm run server`

## Database Information

The application can run in two modes:

1. **Connected to MongoDB**: Full functionality with persistent data storage
2. **Mock Data Mode**: Uses pre-defined mock data when MongoDB is not available

When running with mock data, you'll see a notification in the app interface.

## Environment Variables

Create a `.env` file in the root directory with the following variables: